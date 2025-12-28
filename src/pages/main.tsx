import type { Context } from 'hono'

export const mainPage = (c: Context) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>STUDIOJUAI - AI 마케팅 자동화</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet" />
      <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" rel="stylesheet" />
      <style>
        /* 기본 타이포그래피 설정 */
        body { 
          font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          color: #333333;
          word-break: keep-all; /* 한글 줄바꿈 최적화 */
          margin: 0;
        }
        
        /* PC 기본 스타일 - 최대 너비 720px 중앙 정렬 */
        .content-wrapper {
          max-width: 720px;
          margin: 0 auto;
          padding: 0 16px;
          font-size: 16px;
          line-height: 1.7;
        }
        
        /* 모바일 스타일 (Mobile First) - 768px 브레이크포인트 */
        @media (max-width: 768px) {
          body {
            font-size: 17px;
            line-height: 1.65;
            letter-spacing: -0.02em;
          }
          .content-wrapper {
            padding: 0 16px;
            font-size: 17px;
          }
          .bot-grid-responsive {
            grid-template-columns: 1fr !important;
          }
          .header-responsive {
            padding: 12px 16px !important;
          }
          .main-section {
            padding: 16px !important;
          }
          .mobile-stack {
            flex-direction: column !important;
            gap: 8px !important;
          }
        }
        
        /* 리스트 공통 스타일 */
        ul.ordered-list, ul.emphasis-list, ul.check-list {
          list-style: none;
          padding-left: 0;
          margin: 12px 0;
        }
        ul.ordered-list li, ul.emphasis-list li, ul.check-list li {
          margin-bottom: 8px;
          position: relative;
          padding-left: 0;
        }
        
        /* 링크 스타일 */
        a.primary-link {
          color: #03C75A;
          text-decoration: none;
          font-weight: 500;
        }
        a.primary-link:hover {
          text-decoration: underline;
        }
        a.secondary-link {
          color: #FF6B35;
        }
        
        /* 핵심 메시지 강조 */
        strong, b {
          font-weight: 700;
          color: #000;
        }
        
        /* 결과물 출력 스타일 */
        .result-content {
          font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.8;
          color: #333;
        }
        .result-content p {
          margin-bottom: 12px;
        }
        
        /* 봇 카드 스타일 */
        .bot-card { transition: all 0.2s; }
        .bot-card:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.15); }
        .bot-card.has-result { border-color: #10B981; background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%); }
        .bot-card.running { opacity: 0.7; pointer-events: none; }
        .result-box { max-height: 400px; overflow-y: auto; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
        .fade-in { animation: fadeIn 0.3s ease-in; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .run-btn { transition: all 0.2s; }
        .run-btn:hover { transform: scale(1.05); }
        .result-panel { display: none; }
        .result-panel.show { display: block; }
        
        /* 푸터 스타일 */
        .footer-link {
          color: #03C75A;
          text-decoration: none;
          font-weight: 700;
        }
        .footer-link:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body class="bg-gray-50 min-h-screen">
      
      <!-- 헤더 -->
      <header class="bg-white shadow-sm sticky top-0 z-50">
        <div class="header-responsive max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center">
              <i class="fas fa-robot text-white"></i>
            </div>
            <span class="text-xl font-bold text-gray-800">STUDIOJUAI</span>
          </div>
          <button onclick="openApiModal()" class="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition">
            <i class="fas fa-key mr-2"></i>API 설정
          </button>
        </div>
      </header>

      <main class="main-section max-w-7xl mx-auto px-4 py-6">
        
        <!-- 안내 메시지 -->
        <div class="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl p-6 mb-6">
          <h1 class="text-2xl font-bold mb-2">🎯 필요한 봇만 개별 실행!</h1>
          <p class="text-emerald-100">매장 정보 입력 → 원하는 봇 클릭 → 결과 확인 → 개별 다운로드 (API 절약!)</p>
        </div>

        <!-- STEP 1: 매장 정보 입력 -->
        <section class="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span class="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
            매장 정보 입력 <span class="text-sm font-normal text-gray-500">(먼저 입력 후 봇 실행)</span>
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">매장명 <span class="text-red-500">*</span></label>
              <input type="text" id="store-name" placeholder="예: 맛있는 카페" 
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">위치 <span class="text-red-500">*</span></label>
              <input type="text" id="store-location" placeholder="예: 서울 강남역 3번출구" 
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">업종 <span class="text-red-500">*</span></label>
              <select id="store-industry" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                <option value="">선택하세요</option>
                <optgroup label="🍽️ 음식/요식업">
                  <option value="cafe">카페</option>
                  <option value="chicken">치킨집</option>
                  <option value="korean">한식당</option>
                  <option value="chinese">중식당</option>
                  <option value="japanese">일식당</option>
                  <option value="western">양식당</option>
                  <option value="bbq">고깃집</option>
                  <option value="bakery">베이커리</option>
                  <option value="bar">술집/호프</option>
                </optgroup>
                <optgroup label="💇 미용/뷰티">
                  <option value="salon">미용실</option>
                  <option value="nail">네일샵</option>
                  <option value="skin">피부관리</option>
                  <option value="spa">스파/마사지</option>
                </optgroup>
                <optgroup label="🛒 소매/판매">
                  <option value="convenience">편의점</option>
                  <option value="clothing">의류매장</option>
                  <option value="pharmacy">약국</option>
                  <option value="flower">꽃집</option>
                </optgroup>
                <optgroup label="🏢 서비스업">
                  <option value="gym">헬스장</option>
                  <option value="academy">학원</option>
                  <option value="laundry">세탁소</option>
                  <option value="realtor">부동산</option>
                </optgroup>
                <optgroup label="🏥 의료/기타">
                  <option value="clinic">병원/의원</option>
                  <option value="dental">치과</option>
                  <option value="veterinary">동물병원</option>
                </optgroup>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">대표 메뉴/서비스</label>
              <input type="text" id="store-product" placeholder="예: 아메리카노, 케이크" 
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">평균 가격대</label>
              <input type="text" id="store-price" placeholder="예: 5,000~15,000원" 
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">타겟 고객</label>
              <input type="text" id="store-target" placeholder="예: 20-30대 직장인" 
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
            </div>
          </div>
          
          <!-- 상권분석 반경 선택 -->
          <div class="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <label class="block text-sm font-medium text-gray-700 mb-3">
              <i class="fas fa-map-marker-alt text-emerald-500 mr-1"></i>
              상권분석 반경 (상권분석 봇 실행 시 사용)
            </label>
            <div class="flex gap-6">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="radius" value="2" class="w-4 h-4 text-emerald-500 focus:ring-emerald-500" />
                <span>2km</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="radius" value="3" checked class="w-4 h-4 text-emerald-500 focus:ring-emerald-500" />
                <span>3km <span class="text-emerald-600 text-xs">(추천)</span></span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="radius" value="5" class="w-4 h-4 text-emerald-500 focus:ring-emerald-500" />
                <span>5km</span>
              </label>
            </div>
          </div>
        </section>

        <!-- STEP 2: 30개 봇 - 개별 실행 -->
        <section class="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span class="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              AI 봇 <span class="text-sm font-normal text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">개별 실행</span>
            </h2>
            <div class="text-sm text-gray-500">
              실행된 봇: <span id="executed-count" class="font-bold text-emerald-600">0</span>개
            </div>
          </div>
          
          <p class="text-sm text-gray-500 mb-4 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <i class="fas fa-lightbulb text-yellow-500 mr-1"></i>
            <strong>팁:</strong> 각 봇의 <span class="text-emerald-600 font-bold">▶ 실행</span> 버튼을 클릭하면 해당 봇만 실행됩니다. API 비용을 절약하세요!
          </p>
          
          <!-- 30개 봇 그리드 - 반응형 -->
          <div id="bot-grid" class="bot-grid-responsive grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- JavaScript로 동적 생성 -->
          </div>
        </section>

        <!-- 실행된 결과 모아보기 -->
        <section id="all-results-section" class="hidden bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
              <i class="fas fa-list-check text-emerald-500"></i>
              실행된 결과 모아보기
            </h2>
            <div class="flex gap-2">
              <button onclick="downloadAllTXT()" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition">
                <i class="fas fa-file-alt mr-1"></i>전체 TXT
              </button>
              <button onclick="downloadAllPDF()" class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition">
                <i class="fas fa-file-pdf mr-1"></i>전체 PDF
              </button>
            </div>
          </div>
          <div id="all-results-list" class="space-y-2 max-h-60 overflow-y-auto">
            <!-- 실행된 결과 목록 -->
          </div>
        </section>

      </main>

      <!-- 푸터 -->
      <footer class="bg-white border-t border-gray-200 mt-12">
        <div class="max-w-7xl mx-auto px-4 py-6 text-center">
          <a href="https://xivix.kr/" target="_blank" class="footer-link text-lg">@XIΛIXㅣ</a>
          <p class="text-sm text-gray-500 mt-2">© 2026. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>

      <!-- API 키 모달 -->
      <div id="api-modal" class="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div class="bg-white rounded-2xl p-6 max-w-md mx-4 w-full shadow-2xl">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold text-gray-800">🔑 API 키 설정</h3>
            <button onclick="closeApiModal()" class="text-gray-400 hover:text-gray-600 transition">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Gemini API Key <span class="text-red-500">*</span></label>
              <input type="password" id="gemini-key" placeholder="AIza..." 
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500" />
              <a href="https://aistudio.google.com/app/apikey" target="_blank" class="text-xs text-blue-500 hover:underline mt-1 inline-block">
                <i class="fas fa-external-link-alt mr-1"></i>Google AI Studio에서 발급받기
              </a>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Naver Client ID <span class="text-gray-400">(선택)</span></label>
              <input type="password" id="naver-id" placeholder="Client ID" 
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Naver Client Secret <span class="text-gray-400">(선택)</span></label>
              <input type="password" id="naver-secret" placeholder="Client Secret" 
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500" />
              <a href="https://developers.naver.com/apps" target="_blank" class="text-xs text-blue-500 hover:underline mt-1 inline-block">
                <i class="fas fa-external-link-alt mr-1"></i>Naver Developers에서 발급받기
              </a>
            </div>
          </div>
          
          <button onclick="saveApiKeys()" class="w-full mt-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition">
            <i class="fas fa-save mr-2"></i>저장하기
          </button>
        </div>
      </div>

      <script>
        // 30개 봇 데이터
        const ALL_BOTS = [
          // 상권분석 (5개)
          { id: 'trade-area-overview', name: '상권 종합분석', icon: '🗺️', category: '상권분석', desc: '상권 등급, 유동인구, 강점/약점' },
          { id: 'competitor-analysis', name: '경쟁사 분석', icon: '🎯', category: '상권분석', desc: '경쟁사 약점 → 우리 기회' },
          { id: 'target-customer', name: '타겟고객 분석', icon: '👥', category: '상권분석', desc: '페르소나, 동선, 마케팅 타이밍' },
          { id: 'location-evaluation', name: '입지 평가', icon: '📍', category: '상권분석', desc: '가시성, 접근성, 개선책' },
          { id: 'trend-analysis', name: '상권 트렌드', icon: '📈', category: '상권분석', desc: '돈 되는 트렌드, 계절 전략' },
          // 고객응대 (5개)
          { id: 'greeting', name: '첫인사 봇', icon: '👋', category: '고객응대', desc: '지역/타겟별 환영 메시지' },
          { id: 'menu-recommend', name: '메뉴추천 봇', icon: '🍽️', category: '고객응대', desc: '스토리 있는 메뉴 추천' },
          { id: 'event-announce', name: '이벤트 안내', icon: '🎉', category: '고객응대', desc: '마진 지키는 이벤트 기획' },
          { id: 'review-request', name: '리뷰 요청', icon: '⭐', category: '고객응대', desc: '거절 못하는 리뷰 요청' },
          { id: 'sns-content', name: 'SNS 홍보', icon: '📱', category: '고객응대', desc: '촬영 팁 포함 SNS 콘텐츠' },
          // 콘텐츠 (5개)
          { id: 'blog-content', name: '블로그 콘텐츠', icon: '📝', category: '콘텐츠', desc: '검색 상위 노출 후기 형식' },
          { id: 'keyword-strategy', name: '키워드 전략', icon: '🔍', category: '콘텐츠', desc: '틈새 키워드 발굴' },
          { id: 'local-marketing', name: '지역 마케팅', icon: '🏘️', category: '콘텐츠', desc: '당근/맘카페 공략법' },
          { id: 'seasonal-marketing', name: '시즌 마케팅', icon: '🗓️', category: '콘텐츠', desc: '2주 앞서 준비하는 전략' },
          { id: 'visual-planning', name: '비주얼 기획', icon: '🎬', category: '콘텐츠', desc: '초보도 따라하는 촬영법' },
          // 고객관계 (5개)
          { id: 'loyalty-program', name: '단골 관리', icon: '💎', category: '고객관계', desc: '비용 최소 재방문 유도' },
          { id: 'upselling', name: '업셀링 봇', icon: '💰', category: '고객관계', desc: '자연스럽게 2-3천원 더' },
          { id: 'referral-program', name: '소개 유도', icon: '🤝', category: '고객관계', desc: '친구 데려오면 양쪽 혜택' },
          { id: 'feedback-collection', name: '피드백 수집', icon: '💬', category: '고객관계', desc: '10초 만에 솔직한 의견' },
          { id: 'crisis-response', name: '불만 대응', icon: '🆘', category: '고객관계', desc: '공감+사과+보상 3단계' },
          // 소셜미디어 (5개)
          { id: 'story-content', name: '스토리 콘텐츠', icon: '📸', category: '소셜미디어', desc: '바쁜 일상 속 쉬운 스토리' },
          { id: 'hashtag-strategy', name: '해시태그 전략', icon: '#️⃣', category: '소셜미디어', desc: '동네 해시태그 우선 공략' },
          { id: 'influencer-collab', name: '인플루언서 협업', icon: '🌟', category: '소셜미디어', desc: '동네 블로거 섭외법' },
          { id: 'community-manage', name: '커뮤니티 관리', icon: '👨‍👩‍👧‍👦', category: '소셜미디어', desc: '맘카페/당근 이웃 말투' },
          { id: 'reels-content', name: '릴스/숏폼', icon: '🎵', category: '소셜미디어', desc: '15초 매력 터지는 영상' },
          // 디지털마케팅 (3개)
          { id: 'email-marketing', name: '카톡/문자 소식지', icon: '📧', category: '디지털마케팅', desc: '광고 같지 않은 메시지' },
          { id: 'sms-marketing', name: 'SMS 마케팅', icon: '💌', category: '디지털마케팅', desc: '80자 안에 매력 터뜨리기' },
          { id: 'retargeting', name: '리타겟팅 봇', icon: '🔄', category: '디지털마케팅', desc: '안 오는 단골 다시 부르기' },
          // 전략분석 (2개)
          { id: 'pricing-strategy', name: '가격 전략', icon: '💵', category: '전략분석', desc: '심리적 가격 포인트' },
          { id: 'performance-analysis', name: '성과 분석', icon: '📊', category: '전략분석', desc: '매출/고객수/객단가 파악' }
        ];

        // 봇 결과 저장소
        let botResults = {};
        let tradeAreaData = null;

        // 카테고리별 색상
        const categoryColors = {
          '상권분석': { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', btnBg: 'bg-red-500 hover:bg-red-600' },
          '고객응대': { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', btnBg: 'bg-blue-500 hover:bg-blue-600' },
          '콘텐츠': { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', btnBg: 'bg-purple-500 hover:bg-purple-600' },
          '고객관계': { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', btnBg: 'bg-yellow-500 hover:bg-yellow-600' },
          '소셜미디어': { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-600', btnBg: 'bg-pink-500 hover:bg-pink-600' },
          '디지털마케팅': { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', btnBg: 'bg-green-500 hover:bg-green-600' },
          '전략분석': { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', btnBg: 'bg-orange-500 hover:bg-orange-600' }
        };

        // 봇 그리드 렌더링
        function renderBotGrid() {
          const grid = document.getElementById('bot-grid');
          grid.innerHTML = ALL_BOTS.map(bot => {
            const colors = categoryColors[bot.category] || { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-600', btnBg: 'bg-gray-500 hover:bg-gray-600' };
            
            return \`
              <div id="bot-\${bot.id}" class="bot-card \${colors.bg} border-2 \${colors.border} rounded-xl p-4">
                <div class="flex items-start justify-between mb-2">
                  <div class="flex items-center gap-2">
                    <span class="text-2xl">\${bot.icon}</span>
                    <div>
                      <div class="font-bold text-gray-800 text-sm">\${bot.name}</div>
                      <div class="text-xs \${colors.text}">\${bot.category}</div>
                    </div>
                  </div>
                  <button onclick="runSingleBot('\${bot.id}')" id="run-btn-\${bot.id}"
                    class="run-btn px-3 py-1 \${colors.btnBg} text-white rounded-lg text-xs font-bold flex items-center gap-1">
                    <i class="fas fa-play text-xs"></i>
                    <span>실행</span>
                  </button>
                </div>
                <p class="text-xs text-gray-500 mb-3">\${bot.desc}</p>
                
                <!-- 결과 패널 (숨김) -->
                <div id="result-panel-\${bot.id}" class="result-panel">
                  <div class="bg-white rounded-lg p-3 border border-gray-200 mt-2">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-xs font-bold text-emerald-600"><i class="fas fa-check-circle mr-1"></i>실행 완료</span>
                      <div class="flex gap-1">
                        <button onclick="copyBotResult('\${bot.id}')" class="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600" title="복사">
                          <i class="fas fa-copy text-xs"></i>
                        </button>
                        <button onclick="downloadBotTXT('\${bot.id}')" class="p-1 hover:bg-gray-100 rounded text-blue-400 hover:text-blue-600" title="TXT 다운로드">
                          <i class="fas fa-file-alt text-xs"></i>
                        </button>
                        <button onclick="downloadBotPDF('\${bot.id}')" class="p-1 hover:bg-gray-100 rounded text-red-400 hover:text-red-600" title="PDF 다운로드">
                          <i class="fas fa-file-pdf text-xs"></i>
                        </button>
                      </div>
                    </div>
                    <div id="result-\${bot.id}" class="result-box result-content text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 rounded p-3 max-h-64 overflow-y-auto" style="line-height: 1.8;"></div>
                  </div>
                </div>
              </div>
            \`;
          }).join('');
        }

        // 매장 정보 가져오기
        function getStoreInfo() {
          return {
            name: document.getElementById('store-name').value.trim(),
            location: document.getElementById('store-location').value.trim(),
            industry: document.getElementById('store-industry').value,
            mainProduct: document.getElementById('store-product').value.trim(),
            priceRange: document.getElementById('store-price').value.trim(),
            targetCustomer: document.getElementById('store-target').value.trim()
          };
        }

        // 입력값 검증
        function validateInputs() {
          const storeInfo = getStoreInfo();
          if (!storeInfo.name || !storeInfo.location || !storeInfo.industry) {
            alert('❌ 매장명, 위치, 업종은 필수 입력입니다!');
            return false;
          }
          
          const geminiKey = localStorage.getItem('gemini_key');
          if (!geminiKey) {
            alert('❌ Gemini API 키를 먼저 설정해주세요!');
            openApiModal();
            return false;
          }
          
          return true;
        }

        // 단일 봇 실행
        async function runSingleBot(botId) {
          if (!validateInputs()) return;
          
          const bot = ALL_BOTS.find(b => b.id === botId);
          if (!bot) return;
          
          const storeInfo = getStoreInfo();
          const geminiKey = localStorage.getItem('gemini_key');
          const radius = document.querySelector('input[name="radius"]:checked').value;
          
          // 버튼 로딩 상태
          const btn = document.getElementById('run-btn-' + botId);
          const card = document.getElementById('bot-' + botId);
          const originalBtnHtml = btn.innerHTML;
          btn.innerHTML = '<i class="fas fa-spinner animate-spin text-xs"></i> <span>실행중...</span>';
          btn.disabled = true;
          card.classList.add('running');
          
          try {
            // 상권분석 봇인 경우 먼저 상권 데이터 수집
            if (bot.category === '상권분석' && !tradeAreaData) {
              const naverClientId = localStorage.getItem('naver_client_id');
              const naverClientSecret = localStorage.getItem('naver_client_secret');
              
              if (naverClientId && naverClientSecret) {
                try {
                  const tradeAreaResponse = await fetch('/api/trade-area/analyze', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'X-Naver-Client-Id': naverClientId,
                      'X-Naver-Client-Secret': naverClientSecret
                    },
                    body: JSON.stringify({ 
                      location: storeInfo.location, 
                      industry: storeInfo.industry, 
                      radius: parseInt(radius) 
                    })
                  });
                  const tradeAreaResult = await tradeAreaResponse.json();
                  if (tradeAreaResult.success && tradeAreaResult.data) {
                    tradeAreaData = tradeAreaResult.data;
                  }
                } catch (e) {
                  console.log('상권분석 API 오류:', e);
                }
              }
            }
            
            // 봇 실행
            const response = await fetch('/api/bot/execute', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Gemini-Key': geminiKey
              },
              body: JSON.stringify({
                botId: bot.id,
                storeInfo: storeInfo,
                industry: storeInfo.industry,
                tradeAreaData: tradeAreaData || { radius: parseInt(radius), competitors: [], totalCompetitors: 0 }
              })
            });

            const result = await response.json();
            
            if (result.success) {
              // 결과 저장
              botResults[botId] = {
                ...bot,
                result: result.result,
                storeInfo: storeInfo,
                timestamp: new Date().toISOString()
              };
              
              // 결과 표시
              document.getElementById('result-' + botId).textContent = result.result;
              document.getElementById('result-panel-' + botId).classList.add('show');
              card.classList.add('has-result');
              
              // 버튼 변경
              btn.innerHTML = '<i class="fas fa-redo text-xs"></i> <span>재실행</span>';
              
              // 실행 카운트 업데이트
              updateExecutedCount();
              updateAllResultsList();
              
            } else {
              alert('❌ 실행 실패: ' + (result.error || '알 수 없는 오류'));
              btn.innerHTML = originalBtnHtml;
            }
            
          } catch (err) {
            alert('❌ 네트워크 오류: ' + err.message);
            btn.innerHTML = originalBtnHtml;
          } finally {
            btn.disabled = false;
            card.classList.remove('running');
          }
        }

        // 실행 카운트 업데이트
        function updateExecutedCount() {
          const count = Object.keys(botResults).length;
          document.getElementById('executed-count').textContent = count;
        }

        // 전체 결과 목록 업데이트
        function updateAllResultsList() {
          const section = document.getElementById('all-results-section');
          const list = document.getElementById('all-results-list');
          
          const results = Object.values(botResults);
          
          if (results.length > 0) {
            section.classList.remove('hidden');
            list.innerHTML = results.map(r => \`
              <div class="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                <div class="flex items-center gap-2">
                  <span>\${r.icon}</span>
                  <span class="text-sm font-medium">\${r.name}</span>
                  <span class="text-xs text-gray-400">\${r.category}</span>
                </div>
                <div class="flex gap-1">
                  <button onclick="scrollToBot('\${r.id}')" class="text-xs text-emerald-600 hover:underline">보기</button>
                </div>
              </div>
            \`).join('');
          } else {
            section.classList.add('hidden');
          }
        }

        // 봇 위치로 스크롤
        function scrollToBot(botId) {
          const el = document.getElementById('bot-' + botId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.style.boxShadow = '0 0 0 3px #10B981';
            setTimeout(() => { el.style.boxShadow = ''; }, 2000);
          }
        }

        // 개별 봇 결과 복사
        function copyBotResult(botId) {
          const result = botResults[botId];
          if (!result) return;
          
          const text = result.icon + ' ' + result.name + ' (' + result.category + ')\\n\\n' + result.result;
          navigator.clipboard.writeText(text).then(() => {
            alert('✅ 복사되었습니다!');
          });
        }

        // 개별 봇 TXT 다운로드
        function downloadBotTXT(botId) {
          const result = botResults[botId];
          if (!result) return;
          
          let content = '═'.repeat(50) + '\\n';
          content += '   STUDIOJUAI - ' + result.name + '\\n';
          content += '═'.repeat(50) + '\\n\\n';
          content += '📅 생성일: ' + new Date().toLocaleString('ko-KR') + '\\n';
          content += '📍 매장: ' + (result.storeInfo?.name || '') + '\\n';
          content += '📌 위치: ' + (result.storeInfo?.location || '') + '\\n';
          content += '🏷️ 업종: ' + (result.storeInfo?.industry || '') + '\\n\\n';
          content += '─'.repeat(50) + '\\n\\n';
          content += result.result + '\\n\\n';
          content += '═'.repeat(50) + '\\n';
          content += '   @XIΛIXㅣ https://xivix.kr/\\n';
          content += '   © 2026. ALL RIGHTS RESERVED.\\n';
          content += '═'.repeat(50);
          
          downloadFile(content, 'STUDIOJUAI_' + result.name.replace(/\\s/g, '_') + '_' + new Date().toISOString().slice(0,10) + '.txt', 'text/plain');
        }

        // 개별 봇 PDF 다운로드
        function downloadBotPDF(botId) {
          const result = botResults[botId];
          if (!result) return;
          
          const html = \`
            <!DOCTYPE html>
            <html lang="ko">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>STUDIOJUAI - \${result.name}</title>
              <style>
                /* 기본 타이포그래피 설정 */
                body { 
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                  color: #333333;
                  word-break: keep-all;
                  margin: 0;
                  padding: 40px;
                  line-height: 1.7;
                }
                .content-wrapper {
                  max-width: 720px;
                  margin: 0 auto;
                }
                /* 모바일 스타일 */
                @media (max-width: 768px) {
                  body {
                    font-size: 17px;
                    line-height: 1.65;
                    letter-spacing: -0.02em;
                    padding: 20px 16px;
                  }
                }
                h1 { color: #10B981; border-bottom: 3px solid #10B981; padding-bottom: 15px; font-size: 24px; }
                .info { background: #f0fdf4; padding: 15px; border-radius: 10px; margin: 20px 0; }
                .info p { margin: 5px 0; }
                /* 리스트 스타일 */
                ul { list-style: none; padding-left: 0; }
                ul li { margin-bottom: 8px; }
                /* 링크 스타일 */
                a { color: #03C75A; text-decoration: none; font-weight: 500; }
                a:hover { text-decoration: underline; }
                strong, b { font-weight: 700; color: #000; }
                .content { background: #f9fafb; padding: 20px; border-radius: 10px; white-space: pre-wrap; line-height: 1.8; }
                .footer { text-align: center; margin-top: 40px; color: #666; border-top: 2px solid #10B981; padding-top: 20px; }
                .footer a { color: #03C75A; font-weight: 700; text-decoration: none; }
                .footer a:hover { text-decoration: underline; }
              </style>
            </head>
            <body>
              <div class="content-wrapper">
                <h1>\${result.icon} \${result.name}</h1>
                <p style="color: #666;">\${result.category} | 생성일: \${new Date().toLocaleString('ko-KR')}</p>
                
                <div class="info">
                  <p><strong>📍 매장명:</strong> \${result.storeInfo?.name || '-'}</p>
                  <p><strong>📌 위치:</strong> \${result.storeInfo?.location || '-'}</p>
                  <p><strong>🏷️ 업종:</strong> \${result.storeInfo?.industry || '-'}</p>
                </div>
                
                <article class="content">\${escapeHtml(result.result)}</article>
                
                <div class="footer">
                  <p><a href="https://xivix.kr/" target="_blank">@XIΛIXㅣ</a></p>
                  <p>© 2026. ALL RIGHTS RESERVED.</p>
                </div>
              </div>
            </body>
            </html>
          \`;
          
          const printWindow = window.open('', '_blank');
          printWindow.document.write(html);
          printWindow.document.close();
          setTimeout(() => printWindow.print(), 500);
        }

        // 전체 TXT 다운로드
        function downloadAllTXT() {
          const results = Object.values(botResults);
          if (results.length === 0) {
            alert('❌ 실행된 봇이 없습니다.');
            return;
          }
          
          let content = '═'.repeat(60) + '\\n';
          content += '           STUDIOJUAI AI 마케팅 분석 리포트\\n';
          content += '═'.repeat(60) + '\\n\\n';
          content += '📅 생성일시: ' + new Date().toLocaleString('ko-KR') + '\\n';
          content += '📊 실행된 봇: ' + results.length + '개\\n\\n';
          
          const storeInfo = results[0]?.storeInfo;
          if (storeInfo) {
            content += '📋 매장 정보\\n';
            content += '─'.repeat(40) + '\\n';
            content += '매장명: ' + (storeInfo.name || '') + '\\n';
            content += '위치: ' + (storeInfo.location || '') + '\\n';
            content += '업종: ' + (storeInfo.industry || '') + '\\n\\n';
          }
          
          results.forEach(r => {
            content += '\\n' + '━'.repeat(50) + '\\n';
            content += r.icon + ' ' + r.name + ' (' + r.category + ')\\n';
            content += '━'.repeat(50) + '\\n\\n';
            content += r.result + '\\n';
          });
          
          content += '\\n' + '═'.repeat(60) + '\\n';
          content += '           @XIΛIXㅣ https://xivix.kr/\\n';
          content += '           © 2026. ALL RIGHTS RESERVED.\\n';
          content += '═'.repeat(60);
          
          downloadFile(content, 'STUDIOJUAI_전체리포트_' + new Date().toISOString().slice(0,10) + '.txt', 'text/plain');
        }

        // 전체 PDF 다운로드
        function downloadAllPDF() {
          const results = Object.values(botResults);
          if (results.length === 0) {
            alert('❌ 실행된 봇이 없습니다.');
            return;
          }
          
          const storeInfo = results[0]?.storeInfo;
          
          let html = \`
            <!DOCTYPE html>
            <html lang="ko">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>STUDIOJUAI 전체 리포트</title>
              <style>
                /* 기본 타이포그래피 설정 */
                body { 
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                  color: #333333;
                  word-break: keep-all;
                  margin: 0;
                  padding: 40px;
                  line-height: 1.7;
                }
                .content-wrapper {
                  max-width: 720px;
                  margin: 0 auto;
                }
                /* 모바일 스타일 */
                @media (max-width: 768px) {
                  body {
                    font-size: 17px;
                    line-height: 1.65;
                    letter-spacing: -0.02em;
                    padding: 20px 16px;
                  }
                }
                h1 { color: #10B981; border-bottom: 3px solid #10B981; padding-bottom: 15px; font-size: 24px; }
                h2 { color: #333; margin-top: 40px; border-left: 4px solid #10B981; padding-left: 15px; background: #f0fdf4; padding: 10px 15px; font-size: 18px; }
                .info { background: #f0fdf4; padding: 15px; border-radius: 10px; margin: 20px 0; }
                .info p { margin: 5px 0; }
                /* 리스트 스타일 */
                ul { list-style: none; padding-left: 0; }
                ul li { margin-bottom: 8px; }
                /* 링크 스타일 */
                a { color: #03C75A; text-decoration: none; font-weight: 500; }
                a:hover { text-decoration: underline; }
                strong, b { font-weight: 700; color: #000; }
                .content { background: #f9fafb; padding: 20px; border-radius: 10px; white-space: pre-wrap; line-height: 1.8; margin-bottom: 30px; page-break-inside: avoid; }
                .footer { text-align: center; margin-top: 40px; color: #666; border-top: 2px solid #10B981; padding-top: 20px; }
                .footer a { color: #03C75A; font-weight: 700; text-decoration: none; }
                .footer a:hover { text-decoration: underline; }
                @media print { .content { page-break-inside: avoid; } }
              </style>
            </head>
            <body>
              <div class="content-wrapper">
                <h1>🤖 STUDIOJUAI AI 마케팅 분석 리포트</h1>
                <p style="color: #666;">생성일: \${new Date().toLocaleString('ko-KR')} | 실행 봇: \${results.length}개</p>
                
                <div class="info">
                  <p><strong>📍 매장명:</strong> \${storeInfo?.name || '-'}</p>
                  <p><strong>📌 위치:</strong> \${storeInfo?.location || '-'}</p>
                  <p><strong>🏷️ 업종:</strong> \${storeInfo?.industry || '-'}</p>
                </div>
          \`;
          
          results.forEach(r => {
            html += \`
              <h2>\${r.icon} \${r.name} <span style="font-size:12px;color:#666;">(\${r.category})</span></h2>
              <article class="content">\${escapeHtml(r.result)}</article>
            \`;
          });
          
          html += \`
                <div class="footer">
                  <p><a href="https://xivix.kr/" target="_blank">@XIΛIXㅣ</a></p>
                  <p>© 2026. ALL RIGHTS RESERVED.</p>
                </div>
              </div>
            </body>
            </html>
          \`;
          
          const printWindow = window.open('', '_blank');
          printWindow.document.write(html);
          printWindow.document.close();
          setTimeout(() => printWindow.print(), 500);
        }

        // 파일 다운로드 헬퍼
        function downloadFile(content, filename, mimeType) {
          const blob = new Blob([content], { type: mimeType + ';charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.click();
          URL.revokeObjectURL(url);
        }

        // HTML 이스케이프
        function escapeHtml(text) {
          if (!text) return '';
          return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
        }

        // API 키 모달
        function openApiModal() {
          document.getElementById('api-modal').classList.remove('hidden');
          document.getElementById('gemini-key').value = localStorage.getItem('gemini_key') || '';
          document.getElementById('naver-id').value = localStorage.getItem('naver_client_id') || '';
          document.getElementById('naver-secret').value = localStorage.getItem('naver_client_secret') || '';
        }

        function closeApiModal() {
          document.getElementById('api-modal').classList.add('hidden');
        }

        function saveApiKeys() {
          const geminiKey = document.getElementById('gemini-key').value.trim();
          const naverId = document.getElementById('naver-id').value.trim();
          const naverSecret = document.getElementById('naver-secret').value.trim();
          
          if (!geminiKey) {
            alert('❌ Gemini API 키는 필수입니다!');
            return;
          }
          
          localStorage.setItem('gemini_key', geminiKey);
          if (naverId) localStorage.setItem('naver_client_id', naverId);
          if (naverSecret) localStorage.setItem('naver_client_secret', naverSecret);
          
          alert('✅ API 키가 저장되었습니다!');
          closeApiModal();
        }

        // 초기화
        document.addEventListener('DOMContentLoaded', function() {
          renderBotGrid();
        });
      </script>

    </body>
    </html>
  `)
}
