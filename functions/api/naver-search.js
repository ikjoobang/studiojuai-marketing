/**
 * Cloudflare Pages Function - 네이버 검색 API 프록시
 * 경로: /api/naver-search
 */

export async function onRequest(context) {
    const { request, env } = context;

    // CORS 헤더 설정
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    // OPTIONS 요청 처리 (CORS preflight)
    if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        // GET 요청에서 파라미터 추출
        const url = new URL(request.url);
        const query = url.searchParams.get('query');
        const type = url.searchParams.get('type') || 'local';
        const display = Math.min(parseInt(url.searchParams.get('display')) || 5, 100);
        const start = Math.max(parseInt(url.searchParams.get('start')) || 1, 1);

        if (!query) {
            return new Response(JSON.stringify({
                success: false,
                error: '검색어(query)가 필요합니다.'
            }), {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        // 네이버 API 키 (환경변수 또는 하드코딩)
        const NAVER_CLIENT_ID = env.NAVER_CLIENT_ID || 'fUhHJ1HWyF6fFw_aBfkg';
        const NAVER_CLIENT_SECRET = env.NAVER_CLIENT_SECRET || 'gA4jUFDYK0';

        // 네이버 검색 API 엔드포인트
        const searchTypeMap = {
            'local': 'local',
            'blog': 'blog',
            'news': 'news',
            'webkr': 'webkr'
        };
        const searchApi = searchTypeMap[type] || 'local';
        const naverApiUrl = `https://openapi.naver.com/v1/search/${searchApi}.json?query=${encodeURIComponent(query)}&display=${display}&start=${start}`;

        console.log(`🔍 네이버 API 호출: ${naverApiUrl}`);

        // 네이버 API 호출
        const naverResponse = await fetch(naverApiUrl, {
            method: 'GET',
            headers: {
                'X-Naver-Client-Id': NAVER_CLIENT_ID,
                'X-Naver-Client-Secret': NAVER_CLIENT_SECRET
            }
        });

        if (!naverResponse.ok) {
            const errorText = await naverResponse.text();
            console.error('❌ 네이버 API 오류:', errorText);
            return new Response(JSON.stringify({
                success: false,
                error: '네이버 API 호출 실패',
                details: errorText
            }), {
                status: naverResponse.status,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        const data = await naverResponse.json();
        console.log(`✅ 네이버 API 성공: ${data.total}개 결과`);

        // 성공 응답
        return new Response(JSON.stringify({
            success: true,
            data: data
        }), {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('❌ 서버 오류:', error);
        return new Response(JSON.stringify({
            success: false,
            error: '서버 오류',
            message: error.message
        }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
}
