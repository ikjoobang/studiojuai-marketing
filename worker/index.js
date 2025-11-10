/**
 * ========================================
 * Studiojuai 백엔드 API (Cloudflare Workers)
 * ========================================
 * 
 * 아키텍처:
 * - Cloudflare Workers: 서버리스 백엔드
 * - D1 Database: SQLite 기반 데이터베이스
 * - KV Storage: 세션/캐시
 * - OpenAI API: GPT 분석
 * - Naver API: 상권 데이터
 */

import { Router } from 'itty-router';
import { BOT_DEFINITIONS } from './bot-definitions.js';

// 라우터 생성
const router = Router();

// CORS 헤더
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// OPTIONS 요청 처리 (CORS preflight)
router.options('*', () => new Response(null, { headers: corsHeaders }));

// ========================================
// 헬스체크
// ========================================
router.get('/api/health', () => {
    return new Response(JSON.stringify({
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: '2.0.0'
    }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
});

// ========================================
// 매장 관리 API
// ========================================

// 매장 생성
router.post('/api/stores', async (request, env) => {
    try {
        const data = await request.json();
        
        // 유효성 검증
        if (!data.name || !data.industry || !data.location) {
            return jsonResponse({ error: '필수 항목을 입력해주세요.' }, 400);
        }
        
        // D1에 저장
        const result = await env.DB.prepare(`
            INSERT INTO stores (id, name, industry, location, targetAge, avgPrice, competitors, naverUrl, createdAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
            Date.now().toString(),
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
            storeId: result.meta.last_row_id,
            message: '매장이 생성되었습니다.'
        });
        
    } catch (error) {
        return jsonResponse({ error: error.message }, 500);
    }
});

// 매장 조회
router.get('/api/stores/:id', async (request, env) => {
    try {
        const { id } = request.params;
        
        const result = await env.DB.prepare(`
            SELECT * FROM stores WHERE id = ?
        `).bind(id).first();
        
        if (!result) {
            return jsonResponse({ error: '매장을 찾을 수 없습니다.' }, 404);
        }
        
        return jsonResponse({ success: true, data: result });
        
    } catch (error) {
        return jsonResponse({ error: error.message }, 500);
    }
});

// ========================================
// 네이버 API 프록시
// ========================================
router.get('/api/naver/search', async (request, env) => {
    try {
        const url = new URL(request.url);
        const query = url.searchParams.get('query');
        const type = url.searchParams.get('type') || 'local';
        const display = Math.min(parseInt(url.searchParams.get('display')) || 5, 100);
        
        if (!query) {
            return jsonResponse({ error: '검색어가 필요합니다.' }, 400);
        }
        
        // 네이버 API 호출
        const naverUrl = `https://openapi.naver.com/v1/search/${type}.json?query=${encodeURIComponent(query)}&display=${display}`;
        
        const naverResponse = await fetch(naverUrl, {
            headers: {
                'X-Naver-Client-Id': env.NAVER_CLIENT_ID,
                'X-Naver-Client-Secret': env.NAVER_CLIENT_SECRET
            }
        });
        
        if (!naverResponse.ok) {
            const errorText = await naverResponse.text();
            return jsonResponse({ error: '네이버 API 호출 실패', details: errorText }, naverResponse.status);
        }
        
        const data = await naverResponse.json();
        return jsonResponse({ success: true, data });
        
    } catch (error) {
        return jsonResponse({ error: error.message }, 500);
    }
});

// ========================================
// GPT API 프록시
// ========================================
router.post('/api/gpt/analyze', async (request, env) => {
    try {
        const { prompt, systemPrompt, options } = await request.json();
        
        if (!prompt) {
            return jsonResponse({ error: '프롬프트가 필요합니다.' }, 400);
        }
        
        // OpenAI API 호출
        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: options?.model || 'gpt-4',
                messages: [
                    { role: 'system', content: systemPrompt || '당신은 마케팅 전문가입니다.' },
                    { role: 'user', content: prompt }
                ],
                temperature: options?.temperature || 0.7,
                max_tokens: options?.maxTokens || 2000
            })
        });
        
        if (!openaiResponse.ok) {
            const errorText = await openaiResponse.text();
            return jsonResponse({ error: 'OpenAI API 호출 실패', details: errorText }, openaiResponse.status);
        }
        
        const data = await openaiResponse.json();
        return jsonResponse({
            success: true,
            content: data.choices[0].message.content,
            usage: data.usage
        });
        
    } catch (error) {
        return jsonResponse({ error: error.message }, 500);
    }
});

// ========================================
// 봇 실행 API
// ========================================
router.post('/api/bots/execute', async (request, env) => {
    try {
        const { botId, storeId } = await request.json();
        
        // 매장 정보 조회
        const store = await env.DB.prepare(`
            SELECT * FROM stores WHERE id = ?
        `).bind(storeId).first();
        
        if (!store) {
            return jsonResponse({ error: '매장을 찾을 수 없습니다.' }, 404);
        }
        
        // 봇 정의 조회 (하드코딩 또는 DB에서)
        const bot = getBotDefinition(botId);
        if (!bot) {
            return jsonResponse({ error: '봇을 찾을 수 없습니다.' }, 404);
        }
        
        // 1. 네이버 데이터 조회
        let naverData = null;
        if (store.naverUrl) {
            const naverResponse = await fetch(
                `${request.url.split('/api')[0]}/api/naver/search?query=${encodeURIComponent(store.name + ' ' + store.location)}&type=local&display=1`,
                { headers: request.headers }
            );
            if (naverResponse.ok) {
                const result = await naverResponse.json();
                naverData = result.data?.items?.[0];
            }
        }
        
        // 2. 프롬프트 생성
        const prompt = generatePrompt(bot, store, naverData);
        
        // 3. GPT 분석
        const gptResponse = await fetch(
            `${request.url.split('/api')[0]}/api/gpt/analyze`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...request.headers
                },
                body: JSON.stringify({
                    prompt,
                    systemPrompt: `당신은 ${store.industry} 업종 전문 마케팅 AI입니다.`,
                    options: { model: 'gpt-4', temperature: 0.7, maxTokens: 2000 }
                })
            }
        );
        
        if (!gptResponse.ok) {
            throw new Error('GPT 분석 실패');
        }
        
        const gptResult = await gptResponse.json();
        
        // 4. 실행 결과 저장
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
            JSON.stringify(gptResult),
            new Date().toISOString()
        ).run();
        
        return jsonResponse({
            success: true,
            botName: bot.name,
            result: gptResult.content
        });
        
    } catch (error) {
        return jsonResponse({ error: error.message }, 500);
    }
});

// ========================================
// 전체 봇 실행 API
// ========================================
router.post('/api/bots/execute-all', async (request, env) => {
    try {
        const { storeId } = await request.json();
        
        const allBotIds = Array.from({ length: 30 }, (_, i) => i + 1);
        const results = [];
        
        for (const botId of allBotIds) {
            try {
                const botResponse = await fetch(
                    `${request.url.split('/api')[0]}/api/bots/execute`,
                    {
                        method: 'POST',
                        headers: request.headers,
                        body: JSON.stringify({ botId, storeId })
                    }
                );
                
                if (botResponse.ok) {
                    const result = await botResponse.json();
                    results.push({ botId, success: true, result });
                } else {
                    results.push({ botId, success: false, error: 'API 호출 실패' });
                }
            } catch (error) {
                results.push({ botId, success: false, error: error.message });
            }
        }
        
        return jsonResponse({
            success: true,
            totalBots: 30,
            completed: results.filter(r => r.success).length,
            results
        });
        
    } catch (error) {
        return jsonResponse({ error: error.message }, 500);
    }
});

// ========================================
// 유틸리티 함수
// ========================================

function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
}

function getBotDefinition(botId) {
    return BOT_DEFINITIONS[botId] || null;
}

function generatePrompt(bot, store, naverData) {
    let prompt = `[매장 정보]\n`;
    prompt += `매장명: ${store.name}\n`;
    prompt += `업종: ${store.industry}\n`;
    prompt += `위치: ${store.location}\n`;
    prompt += `타겟층: ${store.targetAge}\n`;
    prompt += `객단가: ${store.avgPrice}\n`;
    prompt += `경쟁사 수: ${store.competitors}개\n\n`;
    
    if (naverData) {
        prompt += `[네이버 플레이스 실제 데이터]\n`;
        prompt += `카테고리: ${naverData.category}\n`;
        prompt += `주소: ${naverData.address}\n\n`;
    }
    
    prompt += bot.prompt;
    
    return prompt;
}

// ========================================
// 404 핸들러
// ========================================
router.all('*', () => jsonResponse({ error: 'Not Found' }, 404));

// ========================================
// Workers 메인 핸들러
// ========================================
export default {
    async fetch(request, env, ctx) {
        return router.handle(request, env, ctx);
    }
};
