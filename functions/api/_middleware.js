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
        
        // 프롬프트 생성
        let prompt = `[매장 정보]\n`;
        prompt += `매장명: ${store.name}\n`;
        prompt += `업종: ${store.industry}\n`;
        prompt += `위치: ${store.location}\n\n`;
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

// Export middleware
export async function onRequest(context) {
    return router.handle(context.request, context.env);
}
