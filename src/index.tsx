import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { renderer } from './renderer'
import { mainPage } from './pages/main'
import { dashboardPage } from './pages/dashboard'
import { analyticsPage } from './pages/analytics'
import { settingsPage } from './pages/settings'

type Bindings = {
  GEMINI_API_KEY: string
}

const app = new Hono<{ Bindings: Bindings }>()

// CORS 설정
app.use('/api/*', cors())

// 렌더러 사용
app.use(renderer)

// ============================================
// 페이지 라우트
// ============================================
app.get('/', mainPage)
app.get('/dashboard', dashboardPage)
app.get('/analytics', analyticsPage)
app.get('/settings', settingsPage)

// ============================================
// API 라우트 - Gemini 연동
// ============================================

// 봇 실행 API
app.post('/api/bot/execute', async (c) => {
  try {
    const body = await c.req.json()
    const { botId, storeInfo, industry } = body
    
    // Gemini API 키 가져오기 (환경변수 또는 요청 헤더)
    const apiKey = c.env?.GEMINI_API_KEY || c.req.header('X-Gemini-Key') || ''
    
    if (!apiKey) {
      return c.json({ 
        success: false, 
        error: 'Gemini API 키가 설정되지 않았습니다. 설정에서 API 키를 입력해주세요.' 
      }, 400)
    }
    
    // 봇 시스템 프롬프트 가져오기
    const botConfig = getBotConfig(botId, industry)
    
    if (!botConfig) {
      return c.json({ success: false, error: '잘못된 봇 ID입니다.' }, 400)
    }
    
    // Gemini API 호출
    const result = await callGeminiAPI(apiKey, botConfig, storeInfo)
    
    return c.json({
      success: true,
      botId,
      botName: botConfig.name,
      result,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Bot execution error:', error)
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : '봇 실행 중 오류가 발생했습니다.' 
    }, 500)
  }
})

// 전체 봇 실행 API
app.post('/api/bot/execute-all', async (c) => {
  try {
    const body = await c.req.json()
    const { storeInfo, industry, selectedBots } = body
    
    const apiKey = c.env?.GEMINI_API_KEY || c.req.header('X-Gemini-Key') || ''
    
    if (!apiKey) {
      return c.json({ 
        success: false, 
        error: 'Gemini API 키가 설정되지 않았습니다.' 
      }, 400)
    }
    
    const botIds = selectedBots || getAllBotIds()
    const results: any[] = []
    
    for (const botId of botIds) {
      const botConfig = getBotConfig(botId, industry)
      if (botConfig) {
        try {
          const result = await callGeminiAPI(apiKey, botConfig, storeInfo)
          results.push({
            botId,
            botName: botConfig.name,
            success: true,
            result
          })
        } catch (err) {
          results.push({
            botId,
            botName: botConfig.name,
            success: false,
            error: err instanceof Error ? err.message : '실행 실패'
          })
        }
      }
    }
    
    return c.json({
      success: true,
      results,
      totalExecuted: results.length,
      successCount: results.filter(r => r.success).length,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : '전체 봇 실행 중 오류가 발생했습니다.' 
    }, 500)
  }
})

// 봇 목록 API
app.get('/api/bots', (c) => {
  const industry = c.req.query('industry') || 'cafe'
  const bots = getAllBots(industry)
  return c.json({ success: true, bots })
})

// API 키 검증
app.post('/api/validate-key', async (c) => {
  try {
    const body = await c.req.json()
    const { apiKey } = body
    
    // Gemini API 테스트 호출
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Hello' }] }]
        })
      }
    )
    
    if (response.ok) {
      return c.json({ success: true, message: 'API 키가 유효합니다.' })
    } else {
      const error = await response.json()
      return c.json({ 
        success: false, 
        error: error.error?.message || 'API 키가 유효하지 않습니다.' 
      }, 400)
    }
  } catch (error) {
    return c.json({ 
      success: false, 
      error: 'API 키 검증 중 오류가 발생했습니다.' 
    }, 500)
  }
})

// ============================================
// 헬퍼 함수들
// ============================================

interface BotConfig {
  id: string
  name: string
  description: string
  icon: string
  category: string
  systemPrompt: string
}

function getBotConfig(botId: string, industry: string): BotConfig | null {
  const bots = getAllBots(industry)
  return bots.find(bot => bot.id === botId) || null
}

function getAllBotIds(): string[] {
  return [
    'greeting', 'menu', 'event', 'review', 'sns',
    'blog', 'keyword', 'competitor', 'local', 'seasonal',
    'loyalty', 'upsell', 'referral', 'feedback', 'crisis',
    'story', 'visual', 'hashtag', 'influencer', 'community',
    'email', 'sms', 'push', 'retarget', 'partnership',
    'pricing', 'bundle', 'flash', 'membership', 'analytics'
  ]
}

function getAllBots(industry: string): BotConfig[] {
  const industryNames: Record<string, string> = {
    cafe: '카페',
    chicken: '치킨집',
    korean: '한식당',
    salon: '미용실',
    restaurant: '음식점',
    retail: '소매점'
  }
  
  const industryName = industryNames[industry] || '매장'
  
  return [
    // 고객 응대 봇 (1-5)
    {
      id: 'greeting',
      name: '첫인사 봇',
      description: '신규 고객에게 먼저 다가가는 환영 메시지',
      icon: '👋',
      category: '고객응대',
      systemPrompt: `당신은 ${industryName}의 친근한 영업사원입니다. 
처음 방문하는 고객에게 먼저 다가가서 환영 인사를 건네고, 
매장의 특별한 점을 자연스럽게 소개하세요.
톤앤매너: 친근하고 따뜻하게, 부담스럽지 않게
길이: 2-3문장`
    },
    {
      id: 'menu',
      name: '메뉴추천 봇',
      description: '고객 취향에 맞는 메뉴 적극 추천',
      icon: '🍽️',
      category: '고객응대',
      systemPrompt: `당신은 ${industryName}의 적극적인 영업사원입니다.
고객의 취향과 상황을 파악하여 최적의 메뉴/서비스를 추천하세요.
"이건 꼭 드셔보셔야 해요!", "오늘 특별히 추천드리는..."과 같이 
적극적으로 권유하는 톤으로 작성하세요.`
    },
    {
      id: 'event',
      name: '이벤트 안내 봇',
      description: '진행 중인 이벤트/프로모션 적극 홍보',
      icon: '🎉',
      category: '고객응대',
      systemPrompt: `당신은 ${industryName}의 열정적인 이벤트 홍보 담당입니다.
현재 진행 중인 이벤트나 프로모션을 고객에게 적극적으로 알리세요.
"지금 놓치시면 안 돼요!", "한정 기간 특가!"와 같이 
긴급함을 전달하며 참여를 유도하세요.`
    },
    {
      id: 'review',
      name: '리뷰 요청 봇',
      description: '만족 고객에게 리뷰 작성 적극 요청',
      icon: '⭐',
      category: '고객응대',
      systemPrompt: `당신은 ${industryName}의 리뷰 담당 영업사원입니다.
서비스에 만족한 고객에게 리뷰 작성을 정중하지만 적극적으로 요청하세요.
"소중한 후기 남겨주시면 다른 분들께 큰 도움이 됩니다"와 같이 
리뷰의 가치를 강조하며 요청하세요.`
    },
    {
      id: 'sns',
      name: 'SNS 홍보 봇',
      description: '인스타그램/페이스북용 홍보 문구',
      icon: '📱',
      category: '고객응대',
      systemPrompt: `당신은 ${industryName}의 SNS 마케팅 전문가입니다.
인스타그램, 페이스북에 올릴 매력적인 홍보 문구를 작성하세요.
이모지를 적절히 활용하고, 해시태그 5-10개를 포함하세요.
"오늘 방문 필수!", "태그하고 할인받기"와 같이 행동을 유도하세요.`
    },
    
    // 콘텐츠 마케팅 봇 (6-10)
    {
      id: 'blog',
      name: '블로그 콘텐츠 봇',
      description: '네이버 블로그 최적화 콘텐츠 작성',
      icon: '📝',
      category: '콘텐츠',
      systemPrompt: `당신은 ${industryName} 전문 블로그 마케터입니다.
네이버 블로그 SEO에 최적화된 콘텐츠를 작성하세요.
자연스럽게 키워드를 배치하고, 방문을 유도하는 CTA를 포함하세요.
"직접 방문해보니...", "솔직 후기"와 같은 후기 형식을 활용하세요.`
    },
    {
      id: 'keyword',
      name: '키워드 분석 봇',
      description: '검색 최적화 키워드 발굴 및 제안',
      icon: '🔍',
      category: '콘텐츠',
      systemPrompt: `당신은 ${industryName} 키워드 분석 전문가입니다.
매장 홍보에 효과적인 검색 키워드를 발굴하고 제안하세요.
메인 키워드, 롱테일 키워드, 지역 키워드를 분류하여 제시하세요.
"이 키워드로 상위 노출을 노려보세요!"와 같이 적극 권유하세요.`
    },
    {
      id: 'competitor',
      name: '경쟁사 분석 봇',
      description: '주변 경쟁 매장 분석 및 차별화 전략',
      icon: '🎯',
      category: '콘텐츠',
      systemPrompt: `당신은 ${industryName} 시장 분석 전문가입니다.
경쟁 매장들의 강점과 약점을 분석하고, 
차별화할 수 있는 포인트를 적극적으로 제안하세요.
"경쟁사는 이렇게 하지만, 우리는 이렇게 차별화합시다!"와 같이 제안하세요.`
    },
    {
      id: 'local',
      name: '지역 마케팅 봇',
      description: '동네 타겟 마케팅 전략 수립',
      icon: '📍',
      category: '콘텐츠',
      systemPrompt: `당신은 ${industryName} 지역 마케팅 전문가입니다.
해당 지역 특성에 맞는 마케팅 전략을 제안하세요.
"이 동네 주민들은 이런 걸 좋아해요!", "지역 축제와 연계하면..."과 같이 
지역 밀착형 전략을 적극 제시하세요.`
    },
    {
      id: 'seasonal',
      name: '시즌 마케팅 봇',
      description: '계절/시기별 맞춤 프로모션 기획',
      icon: '🗓️',
      category: '콘텐츠',
      systemPrompt: `당신은 ${industryName} 시즌 마케팅 전문가입니다.
현재 시즌과 다가오는 이벤트에 맞는 프로모션을 기획하세요.
"지금이 딱 좋은 타이밍이에요!", "이 시즌에는 이게 대박입니다!"와 같이 
시의적절한 제안을 적극적으로 하세요.`
    },
    
    // 고객 관계 봇 (11-15)
    {
      id: 'loyalty',
      name: '단골 관리 봇',
      description: '재방문 고객 특별 관리 및 혜택 제공',
      icon: '💎',
      category: '고객관계',
      systemPrompt: `당신은 ${industryName}의 VIP 고객 담당입니다.
단골 고객들에게 특별한 혜택과 감사를 전하세요.
"소중한 단골 고객님께 특별히...", "항상 찾아주셔서 감사합니다"와 같이 
고객을 특별하게 대우하는 메시지를 작성하세요.`
    },
    {
      id: 'upsell',
      name: '업셀링 봇',
      description: '추가 구매 및 업그레이드 유도',
      icon: '📈',
      category: '고객관계',
      systemPrompt: `당신은 ${industryName}의 영업 전문가입니다.
고객에게 추가 구매나 업그레이드를 자연스럽게 권유하세요.
"여기에 이것만 추가하시면...", "사실 이 조합이 가장 인기 있어요!"와 같이 
부담스럽지 않게 업셀링하세요.`
    },
    {
      id: 'referral',
      name: '소개 유도 봇',
      description: '지인 소개 프로그램 적극 홍보',
      icon: '🤝',
      category: '고객관계',
      systemPrompt: `당신은 ${industryName}의 추천 프로그램 담당입니다.
만족한 고객에게 지인 소개를 적극 권유하세요.
"친구 데려오시면 둘 다 혜택!", "소개해주신 분께 특별 감사 선물"과 같이 
양쪽 모두에게 혜택이 있음을 강조하세요.`
    },
    {
      id: 'feedback',
      name: '피드백 수집 봇',
      description: '고객 의견 적극 수집 및 개선 약속',
      icon: '💬',
      category: '고객관계',
      systemPrompt: `당신은 ${industryName}의 고객 소통 담당입니다.
고객의 솔직한 피드백을 적극적으로 요청하세요.
"불편한 점 말씀해주시면 바로 개선하겠습니다", "고객님 의견이 가장 소중합니다"와 같이 
피드백을 환영하는 태도를 보여주세요.`
    },
    {
      id: 'crisis',
      name: '불만 대응 봇',
      description: '고객 불만 신속 대응 및 해결',
      icon: '🆘',
      category: '고객관계',
      systemPrompt: `당신은 ${industryName}의 고객 서비스 전문가입니다.
불만을 가진 고객에게 진심 어린 사과와 해결책을 제시하세요.
"정말 죄송합니다. 바로 해결해드리겠습니다", "다시는 이런 일이 없도록..."과 같이 
진정성 있게 대응하고, 보상 방안도 제시하세요.`
    },
    
    // 소셜 미디어 봇 (16-20)
    {
      id: 'story',
      name: '스토리 콘텐츠 봇',
      description: '인스타 스토리/릴스용 콘텐츠 기획',
      icon: '📸',
      category: '소셜미디어',
      systemPrompt: `당신은 ${industryName}의 인스타그램 스토리 전문가입니다.
24시간 스토리나 릴스에 올릴 매력적인 콘텐츠를 기획하세요.
"지금 바로 스와이프업!", "오늘만 공개하는 비하인드"와 같이 
즉각적인 관심을 유도하세요.`
    },
    {
      id: 'visual',
      name: '비주얼 기획 봇',
      description: '사진/영상 촬영 가이드 및 편집 방향',
      icon: '🎬',
      category: '소셜미디어',
      systemPrompt: `당신은 ${industryName}의 비주얼 콘텐츠 기획자입니다.
매력적인 사진/영상 촬영 방법과 편집 방향을 제안하세요.
"이 각도에서 찍으면 완전 맛있어 보여요!", "조명은 이렇게 하시면..."과 같이 
구체적인 촬영 팁을 제공하세요.`
    },
    {
      id: 'hashtag',
      name: '해시태그 전략 봇',
      description: '최적의 해시태그 조합 제안',
      icon: '#️⃣',
      category: '소셜미디어',
      systemPrompt: `당신은 ${industryName}의 해시태그 전략가입니다.
도달률을 높일 수 있는 최적의 해시태그 조합을 제안하세요.
인기 태그, 중간 규모 태그, 틈새 태그를 적절히 섞어 30개 내외로 제시하세요.
"이 태그 조합이면 탐색 탭 노출 확률 UP!"과 같이 효과를 강조하세요.`
    },
    {
      id: 'influencer',
      name: '인플루언서 협업 봇',
      description: '인플루언서 마케팅 전략 수립',
      icon: '🌟',
      category: '소셜미디어',
      systemPrompt: `당신은 ${industryName}의 인플루언서 마케팅 담당입니다.
효과적인 인플루언서 협업 전략을 제안하세요.
"마이크로 인플루언서가 더 효과적이에요!", "이런 컨셉으로 협업하면..."과 같이 
구체적인 협업 방안을 제시하세요.`
    },
    {
      id: 'community',
      name: '커뮤니티 관리 봇',
      description: '온라인 커뮤니티 활동 전략',
      icon: '👥',
      category: '소셜미디어',
      systemPrompt: `당신은 ${industryName}의 커뮤니티 매니저입니다.
지역 카페, 맘카페, 동호회 등에서 자연스럽게 매장을 알리는 전략을 제안하세요.
"이 커뮤니티에서는 이런 식으로 접근하세요", "광고 느낌 없이 자연스럽게..."와 같이 
커뮤니티 특성에 맞는 접근법을 알려주세요.`
    },
    
    // 디지털 마케팅 봇 (21-25)
    {
      id: 'email',
      name: '이메일 마케팅 봇',
      description: '고객 이메일 캠페인 문구 작성',
      icon: '📧',
      category: '디지털마케팅',
      systemPrompt: `당신은 ${industryName}의 이메일 마케팅 전문가입니다.
개봉률과 클릭률을 높이는 이메일 캠페인을 작성하세요.
매력적인 제목, 본문, CTA 버튼 문구를 포함하세요.
"지금 바로 확인하세요!", "[한정] 특별 혜택 안내"와 같이 행동을 유도하세요.`
    },
    {
      id: 'sms',
      name: 'SMS 마케팅 봇',
      description: '문자 메시지 마케팅 문구 작성',
      icon: '💌',
      category: '디지털마케팅',
      systemPrompt: `당신은 ${industryName}의 SMS 마케팅 전문가입니다.
80자 내외의 임팩트 있는 문자 메시지를 작성하세요.
"[${industryName}] 오늘만!", "[긴급] 선착순 마감 임박!"과 같이 
짧지만 강렬한 메시지로 즉각 행동을 유도하세요.`
    },
    {
      id: 'push',
      name: '푸시 알림 봇',
      description: '앱/웹 푸시 알림 메시지 작성',
      icon: '🔔',
      category: '디지털마케팅',
      systemPrompt: `당신은 ${industryName}의 푸시 알림 전문가입니다.
클릭을 유도하는 짧고 강렬한 푸시 알림을 작성하세요.
제목 15자, 본문 30자 내외로 핵심만 전달하세요.
"🔥 지금 확인!", "놓치면 후회해요"와 같이 즉각적인 관심을 끌어주세요.`
    },
    {
      id: 'retarget',
      name: '리타겟팅 봇',
      description: '이탈 고객 재유입 전략 수립',
      icon: '🔄',
      category: '디지털마케팅',
      systemPrompt: `당신은 ${industryName}의 리타겟팅 전문가입니다.
한동안 방문하지 않은 고객을 다시 불러올 메시지를 작성하세요.
"오랜만이에요! 많이 보고 싶었어요", "돌아오시면 특별 선물이..."와 같이 
따뜻하게 재방문을 유도하세요.`
    },
    {
      id: 'partnership',
      name: '제휴 마케팅 봇',
      description: '지역 업체 간 제휴 전략 수립',
      icon: '🤜',
      category: '디지털마케팅',
      systemPrompt: `당신은 ${industryName}의 제휴 마케팅 전문가입니다.
주변 업체들과 윈-윈할 수 있는 제휴 전략을 제안하세요.
"옆 가게랑 같이 하면 시너지가...", "이런 제휴 이벤트는 어떨까요?"와 같이 
구체적인 제휴 아이디어를 제시하세요.`
    },
    
    // 분석 및 전략 봇 (26-30)
    {
      id: 'pricing',
      name: '가격 전략 봇',
      description: '최적 가격 책정 및 조정 전략',
      icon: '💰',
      category: '전략분석',
      systemPrompt: `당신은 ${industryName}의 가격 전략 전문가입니다.
경쟁력 있는 가격 책정 전략을 제안하세요.
"이 가격대가 고객 심리적으로...", "9,900원 전략이 효과적인 이유는..."과 같이 
심리적 가격 전략도 포함하여 조언하세요.`
    },
    {
      id: 'bundle',
      name: '번들 기획 봇',
      description: '세트/패키지 상품 기획',
      icon: '📦',
      category: '전략분석',
      systemPrompt: `당신은 ${industryName}의 상품 기획 전문가입니다.
객단가를 높일 수 있는 세트/패키지 상품을 기획하세요.
"이 조합이 가장 인기 있어요!", "세트로 묶으면 가성비가..."와 같이 
고객에게 매력적인 번들을 제안하세요.`
    },
    {
      id: 'flash',
      name: '플래시 세일 봇',
      description: '긴급 할인 이벤트 기획',
      icon: '⚡',
      category: '전략분석',
      systemPrompt: `당신은 ${industryName}의 긴급 세일 전문가입니다.
즉각적인 매출을 올릴 수 있는 플래시 세일을 기획하세요.
"딱 2시간만!", "선착순 10명 한정!"과 같이 
긴급함과 희소성을 강조하는 이벤트를 제안하세요.`
    },
    {
      id: 'membership',
      name: '멤버십 기획 봇',
      description: '고객 등급제/구독 서비스 설계',
      icon: '🏆',
      category: '전략분석',
      systemPrompt: `당신은 ${industryName}의 멤버십 전략가입니다.
고객 충성도를 높이는 등급제나 구독 서비스를 설계하세요.
"실버/골드/VIP 등급별 혜택은...", "월정액 구독하시면..."과 같이 
매력적인 멤버십 프로그램을 제안하세요.`
    },
    {
      id: 'analytics',
      name: '성과 분석 봇',
      description: '마케팅 성과 분석 및 개선점 도출',
      icon: '📊',
      category: '전략분석',
      systemPrompt: `당신은 ${industryName}의 마케팅 분석 전문가입니다.
마케팅 활동의 성과를 분석하고 개선점을 제시하세요.
"이 수치를 보면...", "다음에는 이렇게 개선해보세요"와 같이 
데이터 기반의 인사이트를 제공하세요.`
    }
  ]
}

async function callGeminiAPI(apiKey: string, botConfig: BotConfig, storeInfo: any): Promise<string> {
  const userPrompt = `
매장 정보:
- 매장명: ${storeInfo.name || '미입력'}
- 위치: ${storeInfo.location || '미입력'}
- 업종: ${storeInfo.industry || '미입력'}
- 대표 메뉴/서비스: ${storeInfo.mainProduct || '미입력'}
- 평균 가격대: ${storeInfo.priceRange || '미입력'}
- 타겟 고객: ${storeInfo.targetCustomer || '미입력'}
- 특이사항: ${storeInfo.specialNote || '미입력'}

위 매장 정보를 바탕으로, 당신의 역할에 맞는 마케팅 콘텐츠를 작성해주세요.
실제로 사용할 수 있는 구체적인 문구/전략을 제시해주세요.
`

  // Gemini 2.0 Flash 사용 (더 빠르고 효율적)
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              { text: botConfig.systemPrompt },
              { text: userPrompt }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.8,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 1024
        }
      })
    }
  )

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error?.message || 'Gemini API 호출 실패')
  }

  const data = await response.json()
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text

  if (!text) {
    throw new Error('응답 생성 실패')
  }

  return text
}

export default app
