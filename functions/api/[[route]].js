/**
 * Cloudflare Pages Functions - API Router
 * Handles all /api/* routes
 */

import { Router } from 'itty-router';
import { BOT_DEFINITIONS } from '../../worker/bot-definitions.js';

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
    return jsonResponse({
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: '2.0.0'
    });
});

// ========================================
// 매장 관리 API
// ========================================

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
        
        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: options?.model || 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: systemPrompt || '당신은 마케팅 전문가입니다.' },
                    { role: 'user', content: prompt }
                ],
                temperature: options?.temperature || 0.7,
                max_tokens: options?.maxTokens || 1500
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
        
        // 프롬프트 생성
        let prompt = `[매장 정보]\n`;
        prompt += `매장명: ${store.name}\n`;
        prompt += `업종: ${store.industry}\n`;
        prompt += `위치: ${store.location}\n`;
        prompt += `타겟층: ${store.targetAge}\n`;
        prompt += `객단가: ${store.avgPrice}\n`;
        prompt += `경쟁사 수: ${store.competitors}개\n\n`;
        prompt += bot.prompt;
        
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

// ========================================
// 전체 봇 실행 API
// ========================================
router.post('/api/bots/execute-all', async (request, env) => {
    try {
        const { storeId } = await request.json();
        
        const results = [];
        
        for (let botId = 1; botId <= 30; botId++) {
            try {
                const botResponse = await handleBotExecution(botId, storeId, env);
                results.push({ botId, success: true, result: botResponse });
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

async function handleBotExecution(botId, storeId, env) {
    const store = await env.DB.prepare(`
        SELECT * FROM stores WHERE id = ?
    `).bind(storeId).first();
    
    if (!store) {
        throw new Error('매장을 찾을 수 없습니다.');
    }
    
    const bot = BOT_DEFINITIONS[botId];
    if (!bot) {
        throw new Error('봇을 찾을 수 없습니다.');
    }
    
    let prompt = `[매장 정보]\n`;
    prompt += `매장명: ${store.name}\n`;
    prompt += `업종: ${store.industry}\n`;
    prompt += `위치: ${store.location}\n\n`;
    prompt += bot.prompt;
    
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
    
    await env.DB.prepare(`
        INSERT INTO bot_executions (id, storeId, storeName, botId, botName, industry, status, result, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
        Date.now().toString() + '-' + botId,
        storeId,
        store.name,
        botId,
        bot.name,
        store.industry,
        'completed',
        content,
        new Date().toISOString()
    ).run();
    
    return {
        botName: bot.name,
        result: content
    };
}

// ========================================
// Pages Functions Handler
// ========================================
export async function onRequest(context) {
    const { request, env } = context;
    return router.handle(request, env);
}
