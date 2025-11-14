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
        }
        
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
        
        prompt += `[분석 요청]\n${bot.prompt}`;
        
        // GPT 분석
        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: `당신은 ${store.industry} 업종 전문 마케팅 AI입니다.` },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.7,
                max_tokens: 1500
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
