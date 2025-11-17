/**
 * Cloudflare Pages Functions - API Middleware
 */

import { Router } from 'itty-router';
import { BOT_DEFINITIONS } from '../../worker/bot-definitions.js';

const router = Router();

// CORS 헤더
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
}

// OPTIONS 요청 처리
router.options('*', () => new Response(null, { headers: corsHeaders }));

// Health check
router.get('/api/health', () => {
    return jsonResponse({
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: '2.0.0'
    });
});

// 모든 매장 조회
router.get('/api/stores', async (request, env) => {
    try {
        const stores = await env.DB.prepare(`
            SELECT * FROM stores ORDER BY createdAt DESC
        `).all();
        
        return jsonResponse({
            success: true,
            count: stores.results.length,
            stores: stores.results
        });
        
    } catch (error) {
        return jsonResponse({ error: error.message }, 500);
    }
});

// 매장 생성
router.post('/api/stores', async (request, env) => {
    try {
        const data = await request.json();
        
        if (!data.name || !data.industry || !data.location) {
            return jsonResponse({ error: '필수 항목을 입력해주세요.' }, 400);
        }
        
        const storeId = Date.now().toString();
        
        await env.DB.prepare(`
            INSERT INTO stores (id, name, industry, location, targetAge, avgPrice, competitors, naverUrl, createdAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
            storeId,
            data.name,
            data.industry,
            data.location,
            data.targetAge || '',
            data.avgPrice || '',
            data.competitors || 0,
            data.naverUrl || '',
            new Date().toISOString()
        ).run();
        
        return jsonResponse({
            success: true,
            storeId: storeId,
            message: '매장이 생성되었습니다.'
        });
        
    } catch (error) {
        return jsonResponse({ error: error.message }, 500);
    }
});

// 매장 조회
router.get('/api/stores/:id', async (request, env) => {
    try {
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();
        
        const store = await env.DB.prepare(`
            SELECT * FROM stores WHERE id = ?
        `).bind(id).first();
        
        if (!store) {
            return jsonResponse({ error: '매장을 찾을 수 없습니다.' }, 404);
        }
        
        return jsonResponse({ success: true, data: store });
        
    } catch (error) {
        return jsonResponse({ error: error.message }, 500);
    }
});

// 봇 실행
router.post('/api/bots/execute', async (request, env) => {
    try {
        const { botId, storeId } = await request.json();
        
        const store = await env.DB.prepare(`
            SELECT * FROM stores WHERE id = ?
        `).bind(storeId).first();
        
        if (!store) {
            return jsonResponse({ error: '매장을 찾을 수 없습니다.' }, 404);
        }
        
        const bot = BOT_DEFINITIONS[botId];
        if (!bot) {
            return jsonResponse({ error: '봇을 찾을 수 없습니다.' }, 404);
        }
        
        // 네이버 API로 실제 데이터 수집
        let naverData = null;
        let competitorsData = null;
        
        try {
            // 1. 매장 정보 조회
            const placeUrl = `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(store.name + ' ' + store.location)}&display=1`;
            const placeResponse = await fetch(placeUrl, {
                headers: {
                    'X-Naver-Client-Id': env.NAVER_CLIENT_ID,
                    'X-Naver-Client-Secret': env.NAVER_CLIENT_SECRET
                }
            });
            
            if (placeResponse.ok) {
                const placeData = await placeResponse.json();
                if (placeData.items.length > 0) {
                    naverData = placeData.items[0];
                }
            }
            
            // 2. 경쟁사 검색 (같은 업종)
            const competitorQuery = `${store.industry} ${store.location}`;
            const competitorUrl = `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(competitorQuery)}&display=10`;
            const competitorResponse = await fetch(competitorUrl, {
                headers: {
                    'X-Naver-Client-Id': env.NAVER_CLIENT_ID,
                    'X-Naver-Client-Secret': env.NAVER_CLIENT_SECRET
                }
            });
            
            if (competitorResponse.ok) {
                const competitorData = await competitorResponse.json();
                competitorsData = competitorData.items.filter(item => 
                    item.title.replace(/<[^>]*>/g, '') !== store.name
                ).slice(0, 5); // 상위 5개 경쟁사
            }
        } catch (error) {
            console.error('네이버 API 호출 오류:', error);
            // 에러 발생 시에도 계속 진행 (GPT에게 데이터 없음을 알림)
        }
        
        // 디버그: 데이터 수집 상태 로깅
        console.log('=== 데이터 수집 결과 ===');
        console.log('naverData:', naverData ? 'O' : 'X');
        console.log('competitorsData:', competitorsData ? `${competitorsData.length}개` : 'X');
        
        // 프롬프트 생성 (실제 데이터 포함)
        let prompt = `[매장 기본 정보]\n`;
        prompt += `매장명: ${store.name}\n`;
        prompt += `업종: ${store.industry}\n`;
        prompt += `위치: ${store.location}\n`;
        prompt += `타겟 연령대: ${store.targetAge || 'N/A'}\n`;
        prompt += `평균 객단가: ${store.avgPrice || 'N/A'}\n\n`;
        
        // 네이버 플레이스 실제 데이터 추가
        if (naverData) {
            prompt += `[네이버 플레이스 실제 데이터]\n`;
            prompt += `매장명: ${naverData.title.replace(/<[^>]*>/g, '')}\n`;
            prompt += `카테고리: ${naverData.category}\n`;
            prompt += `주소: ${naverData.address}\n`;
            prompt += `도로명주소: ${naverData.roadAddress}\n`;
            prompt += `전화번호: ${naverData.telephone || 'N/A'}\n`;
            prompt += `좌표: (${naverData.mapx}, ${naverData.mapy})\n\n`;
        }
        
        // 경쟁사 실제 데이터 추가
        if (competitorsData && competitorsData.length > 0) {
            prompt += `[반경 내 경쟁사 ${competitorsData.length}개]\n`;
            competitorsData.forEach((comp, idx) => {
                prompt += `${idx + 1}. ${comp.title.replace(/<[^>]*>/g, '')}\n`;
                prompt += `   - 카테고리: ${comp.category}\n`;
                prompt += `   - 주소: ${comp.address}\n`;
                prompt += `   - 전화: ${comp.telephone || 'N/A'}\n`;
            });
            prompt += '\n';
        }
        
        // RAG: 선행 봇 결과 가져오기
        let previousResults = '';
        try {
            const executions = await env.DB.prepare(`
                SELECT botId, botName, result FROM bot_executions 
                WHERE storeId = ? AND status = 'completed'
                ORDER BY createdAt ASC
            `).bind(storeId).all();
            
            if (executions.results.length > 0) {
                previousResults = `[3. 선행 봇 분석 결과 (Previous Analysis)]\n`;
                executions.results.forEach(exec => {
                    // 결과를 요약 (첫 500자만)
                    const summary = exec.result.substring(0, 500) + (exec.result.length > 500 ? '...' : '');
                    previousResults += `■ 봇 #${exec.botId} (${exec.botName}) 요약:\n${summary}\n\n`;
                });
            }
        } catch (error) {
            console.error('선행 봇 결과 조회 오류:', error);
        }
        
        prompt += previousResults;
        prompt += `[분석 요청]\n${bot.prompt}`;
        
        // System Prompt Templates
        function getAnalyticalPrompt(industry, botName) {
            return `당신은 ${industry} 업종 전문 [${botName}] AI입니다.

🎯 최종 목표: 데이터 기반 분석을 통한 매출 상승 전략 도출 및 운영 최적화

❌ 절대 금지 사항:
■ 제공된 데이터([핵심 입력 데이터], [외부 데이터], [선행 봇 분석 결과]) 외의 정보를 상상하거나 생성 금지.
■ 데이터가 없으면 "데이터 부족으로 분석 불가"라고 명시.
■ 추상적인 조언 금지. 모든 제안은 구체적인 실행 방안 포함.
■ **[중요] 절대 구체적인 미래 매출액을 숫자로 예측하지 마세요. (예: "월 매출 1200만원" 같은 표현 금지)**
■ **매출 관련 효과는 반드시 KPI 증가율(%)로만 표현하세요. (예: "방문객 수 20% 증가", "객단가 15% 상승")**

✔️ 필수 준수 사항:
■ 모든 분석은 제공된 데이터에 근거해야 하며, 데이터를 인용하여 근거 제시.
■ 경쟁사 데이터가 제공된 경우, 반드시 비교 분석 및 경쟁 우위 확보 전략 포함.
■ 실행 방법은 "어떻게(How)" 하는지 단계별(Step-by-step)로 상세히 설명. (예: 네이버 접속 → [어디] 클릭 → [무엇] 입력)
■ 예상 효과는 핵심 지표(KPI) 개선 중심으로 제시. (예: CTR 증가, 전환율 개선, 재방문율 향상)
■ 가장 영향력이 큰 항목을 우선순위로 배치.

📋 응답 형식 (필수):
1. **데이터 기반 현황 진단**
2. **핵심 개선 사항 및 전략 제안** (우선순위 순서)
3. **단계별 실행 가이드**
4. **예상 효과 (KPI 중심)**`;
        }
        
        function getStrategicPrompt(industry, botName) {
            return `당신은 ${industry} 업종 전문 [${botName}] AI입니다.

🎯 최종 목표: 즉시 실행 가능한 마케팅 콘텐츠 및 전략 생성

✔️ 필수 준수 사항:
■ 반드시 제공된 [핵심 입력 데이터]와 [선행 봇 분석 결과](타겟 고객, 상권, 경쟁사 분석 등)를 기반으로 전략과 콘텐츠를 생성.
■ 생성된 콘텐츠는 ${industry} 업종의 톤앤매너와 타겟 고객에게 최적화되어야 함.
■ 모든 제안은 구체적이고 바로 사용 가능해야 함. (예: 단순 아이디어가 아닌 완성된 카피, 구체적인 이벤트 실행안)
■ 제안의 근거로 선행 분석 결과를 명시해야 함. (예: "고객 분석 결과에 따라...")

📋 응답 형식 (필수):
1. **전략 목표 및 핵심 컨셉** (선행 분석 기반)
2. **[봇 미션 결과물]** (완성된 형태의 콘텐츠 또는 전략 제안서)
3. **실행 방안 및 활용 가이드**`;
        }
        
        function getCreativePrompt(industry, botName) {
            return `당신은 ${industry} 업종 전문 [${botName}] AI입니다.

🎯 최종 목표: 브랜드 가치를 높이는 시각적 컨셉 및 디자인 가이드 제안

✔️ 필수 준수 사항:
■ 제공된 [핵심 입력 데이터]와 [선행 봇 분석 결과](브랜드 스토리, 타겟 고객 등)를 기반으로 디자인 컨셉을 도출.
■ ${industry} 업종의 디자인 트렌드와 경쟁사 디자인 벤치마킹을 반영.
■ 시각적 요소를 구체적으로 묘사해야 함. (색상 코드(HEX), 폰트 스타일, 레이아웃 구조 등)
■ 디자인 제안의 이유와 전략적 근거를 명확히 설명.
■ 실제 이미지를 생성하는 것이 아니라, 디자인을 위한 '가이드라인' 또는 'AI 프롬프트'를 생성해야 함.

📋 응답 형식 (필수):
1. **디자인 목표 및 핵심 컨셉** (브랜드 아이덴티티 기반)
2. **[봇 미션 결과물]** (구체적인 디자인 시안 제안 및 묘사)
3. **디자인 요소 가이드** (색상, 폰트, 무드보드 등)`;
        }
        
        // 봇 카테고리에 따라 적절한 System Prompt 선택
        let systemPrompt;
        if (bot.category === 'market' || bot.category === 'operations') {
            systemPrompt = getAnalyticalPrompt(store.industry, bot.name);
        } else if (bot.category === 'content') {
            systemPrompt = getStrategicPrompt(store.industry, bot.name);
        } else if (bot.category === 'creative') {
            systemPrompt = getCreativePrompt(store.industry, bot.name);
        } else {
            // Fallback to Analytical
            systemPrompt = `당신은 ${store.industry} 업종 전문 마케팅 AI입니다.

🎯 최종 목표: 소상공인의 매출 상승

❌ 절대 금지 사항:
■ 상상으로 데이터를 만들지 마세요
■ 존재하지 않는 업체명, 주소, 전화번호를 생성하지 마세요
■ 제공된 실제 데이터가 없으면 "데이터 없음"이라고 명시하세요
■ 추상적인 조언 금지 - 반드시 구체적 실행 방법 제시

✔️ 필수 준수 사항:
■ 반드시 제공된 [네이버 플레이스 실제 데이터]와 [반경 내 경쟁사]의 정보만 사용하세요
■ 실제 업체명, 주소, 카테고리, 전화번호를 그대로 인용하세요
■ 모든 제안은 "어떻게(How)" 실행하는지 단계별로 설명하세요
■ 예상 매출 효과를 구체적 수치로 제시하세요 (예: "월 매출 20% 증가 예상")
■ 네이버 플레이스에서 **정확히 어디를 클릭**하고 **무엇을 입력**해야 하는지 명시하세요

📋 응답 형식 (필수):
1. **현재 상황 진단** (실제 데이터 기반)
2. **구체적 실행 방법** (단계별 가이드)
   - 1단계: 네이버 플레이스 접속 → [어디] 클릭
   - 2단계: [무엇]을 [어떻게] 입력
   - 3단계: ...
3. **예상 효과** (매출 증가율, 방문자 수 등 구체적 수치)
4. **체크리스트** (오늘 바로 할 수 있는 3가지)`;
        }

        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: prompt }
                ],
                temperature: bot.temperature || 0.3,  // Use bot-specific temperature
                max_tokens: 2000
            })
        });
        
        if (!openaiResponse.ok) {
            throw new Error('GPT 분석 실패');
        }
        
        const gptResult = await openaiResponse.json();
        const content = gptResult.choices[0].message.content;
        
        // 실행 결과 저장
        await env.DB.prepare(`
            INSERT INTO bot_executions (id, storeId, storeName, botId, botName, industry, status, result, createdAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
            Date.now().toString(),
            storeId,
            store.name,
            botId,
            bot.name,
            store.industry,
            'completed',
            content,
            new Date().toISOString()
        ).run();
        
        return jsonResponse({
            success: true,
            botName: bot.name,
            result: content
        });
        
    } catch (error) {
        return jsonResponse({ error: error.message }, 500);
    }
});

// 매장의 모든 봇 실행 결과 조회
router.get('/api/stores/:id/executions', async (request, env) => {
    try {
        const url = new URL(request.url);
        const storeId = url.pathname.split('/')[3];
        
        const executions = await env.DB.prepare(`
            SELECT * FROM bot_executions WHERE storeId = ? ORDER BY createdAt DESC
        `).bind(storeId).all();
        
        return jsonResponse({
            success: true,
            count: executions.results.length,
            executions: executions.results
        });
        
    } catch (error) {
        return jsonResponse({ error: error.message }, 500);
    }
});

// ========================================
// 네이버 로컬 검색 API (반경 1km 경쟁사 검색)
// ========================================
router.post('/api/naver/search', async (request, env) => {
    try {
        const { query, location, radius } = await request.json();
        
        if (!query) {
            return jsonResponse({ error: '검색어가 필요합니다.' }, 400);
        }
        
        // 네이버 로컬 검색 API 호출
        const searchQuery = location ? `${query} ${location}` : query;
        const naverUrl = `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(searchQuery)}&display=20&sort=random`;
        
        const naverResponse = await fetch(naverUrl, {
            headers: {
                'X-Naver-Client-Id': env.NAVER_CLIENT_ID,
                'X-Naver-Client-Secret': env.NAVER_CLIENT_SECRET
            }
        });
        
        if (!naverResponse.ok) {
            throw new Error('네이버 API 호출 실패');
        }
        
        const data = await naverResponse.json();
        
        // 반경 필터링은 클라이언트에서 처리 (좌표 변환 필요)
        return jsonResponse({
            success: true,
            total: data.total,
            items: data.items,
            query: searchQuery
        });
        
    } catch (error) {
        return jsonResponse({ error: error.message }, 500);
    }
});

// ========================================
// 매장 상세 정보 조회 (네이버 플레이스)
// ========================================
router.post('/api/naver/place', async (request, env) => {
    try {
        const { storeName, location } = await request.json();
        
        if (!storeName || !location) {
            return jsonResponse({ error: '매장명과 위치가 필요합니다.' }, 400);
        }
        
        // 네이버 로컬 검색으로 매장 찾기
        const searchQuery = `${storeName} ${location}`;
        const naverUrl = `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(searchQuery)}&display=5`;
        
        const naverResponse = await fetch(naverUrl, {
            headers: {
                'X-Naver-Client-Id': env.NAVER_CLIENT_ID,
                'X-Naver-Client-Secret': env.NAVER_CLIENT_SECRET
            }
        });
        
        if (!naverResponse.ok) {
            throw new Error('네이버 API 호출 실패');
        }
        
        const data = await naverResponse.json();
        
        if (data.items.length === 0) {
            return jsonResponse({ error: '매장을 찾을 수 없습니다.' }, 404);
        }
        
        // 첫 번째 결과 반환
        const place = data.items[0];
        
        return jsonResponse({
            success: true,
            place: {
                title: place.title.replace(/<[^>]*>/g, ''),
                category: place.category,
                address: place.address,
                roadAddress: place.roadAddress,
                mapx: place.mapx,
                mapy: place.mapy,
                link: place.link,
                telephone: place.telephone
            }
        });
        
    } catch (error) {
        return jsonResponse({ error: error.message }, 500);
    }
});

// ========================================
// SEO/AEO/GEO 최적화 분석
// ========================================
router.post('/api/seo/analyze', async (request, env) => {
    try {
        const { storeId } = await request.json();
        
        const store = await env.DB.prepare(`
            SELECT * FROM stores WHERE id = ?
        `).bind(storeId).first();
        
        if (!store) {
            return jsonResponse({ error: '매장을 찾을 수 없습니다.' }, 404);
        }
        
        // 네이버 검색 키워드 분석
        const keywords = [
            `${store.name}`,
            `${store.location} ${store.industry}`,
            `${store.industry} 추천`,
            `${store.location} 맛집`,
            `근처 ${store.industry}`
        ];
        
        const searchResults = {};
        
        for (const keyword of keywords) {
            const url = `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(keyword)}&display=20`;
            const response = await fetch(url, {
                headers: {
                    'X-Naver-Client-Id': env.NAVER_CLIENT_ID,
                    'X-Naver-Client-Secret': env.NAVER_CLIENT_SECRET
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                const myStoreRank = data.items.findIndex(item => 
                    item.title.replace(/<[^>]*>/g, '').includes(store.name)
                );
                
                searchResults[keyword] = {
                    total: data.total,
                    rank: myStoreRank + 1, // 1-based index
                    found: myStoreRank !== -1,
                    competitors: data.items.length
                };
            }
        }
        
        // SEO 점수 계산
        const avgRank = Object.values(searchResults)
            .filter(r => r.found)
            .reduce((sum, r) => sum + r.rank, 0) / keywords.length;
        
        const seoScore = Math.max(0, 100 - (avgRank * 5)); // 순위가 낮을수록 점수 높음
        
        // 최적화 제안 생성
        const optimizationTips = [];
        
        if (avgRank > 10) {
            optimizationTips.push('키워드 최적화: 매장명에 지역명과 업종을 포함하세요');
        }
        
        if (searchResults[`${store.location} ${store.industry}`].rank > 5) {
            optimizationTips.push('지역 SEO: 네이버 플레이스 상세 정보를 충실히 작성하세요');
        }
        
        optimizationTips.push('리뷰 관리: 최근 리뷰에 빠르게 응답하여 활성도를 높이세요');
        optimizationTips.push('사진 등록: 고품질 매장 사진을 10장 이상 등록하세요');
        optimizationTips.push('영업시간: 정확한 영업시간과 휴무일을 등록하세요');
        
        return jsonResponse({
            success: true,
            seoScore: Math.round(seoScore),
            searchResults,
            keywords,
            optimizationTips,
            analysis: {
                avgRank: Math.round(avgRank),
                totalSearches: Object.values(searchResults).reduce((sum, r) => sum + r.total, 0),
                foundInResults: Object.values(searchResults).filter(r => r.found).length
            }
        });
        
    } catch (error) {
        return jsonResponse({ error: error.message }, 500);
    }
});

// Export middleware
export async function onRequest(context) {
    return router.handle(context.request, context.env);
}
