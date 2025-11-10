/**
 * ========================================
 * API 클라이언트 - 백엔드 통신
 * ========================================
 */

class APIClient {
    constructor() {
        // API 엔드포인트 설정
        this.baseURL = this.detectAPIEndpoint();
        console.log(`🔗 API 엔드포인트: ${this.baseURL}`);
    }

    /**
     * API 엔드포인트 자동 감지
     */
    detectAPIEndpoint() {
        const hostname = window.location.hostname;
        
        // 로컬 개발 환경
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return 'http://localhost:8787'; // Wrangler dev 기본 포트
        }
        
        // Cloudflare Pages 환경
        // Pages에서는 Worker를 직접 호출
        return ''; // 같은 도메인 사용
    }

    /**
     * HTTP 요청 헬퍼
     */
    async request(endpoint, options = {}) {
        const url = this.baseURL + endpoint;
        
        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || '요청 실패');
            }

            return data;
        } catch (error) {
            console.error(`❌ API 요청 실패 (${endpoint}):`, error);
            throw error;
        }
    }

    // ========================================
    // 매장 관리 API
    // ========================================

    /**
     * 매장 생성
     */
    async createStore(storeData) {
        return this.request('/api/stores', {
            method: 'POST',
            body: JSON.stringify(storeData)
        });
    }

    /**
     * 매장 조회
     */
    async getStore(storeId) {
        return this.request(`/api/stores/${storeId}`);
    }

    // ========================================
    // 네이버 API
    // ========================================

    /**
     * 네이버 로컬 검색
     */
    async searchNaver(query, options = {}) {
        const params = new URLSearchParams({
            query,
            type: options.type || 'local',
            display: options.display || 5
        });

        return this.request(`/api/naver/search?${params}`);
    }

    // ========================================
    // GPT API
    // ========================================

    /**
     * GPT 분석 요청
     */
    async analyzeWithGPT(prompt, systemPrompt, options = {}) {
        return this.request('/api/gpt/analyze', {
            method: 'POST',
            body: JSON.stringify({
                prompt,
                systemPrompt,
                options
            })
        });
    }

    // ========================================
    // 봇 실행 API
    // ========================================

    /**
     * 개별 봇 실행
     */
    async executeBot(botId, storeId) {
        return this.request('/api/bots/execute', {
            method: 'POST',
            body: JSON.stringify({ botId, storeId })
        });
    }

    /**
     * 전체 봇 실행
     */
    async executeAllBots(storeId, onProgress) {
        console.log(`🚀 전체 봇 실행 시작: 매장 ID ${storeId}`);
        
        const results = [];
        const totalBots = 30;

        for (let botId = 1; botId <= totalBots; botId++) {
            try {
                console.log(`🤖 봇 ${botId}/30 실행 중...`);
                
                const result = await this.executeBot(botId, storeId);
                results.push({ botId, success: true, data: result });
                
                // 진행 상황 콜백
                if (onProgress) {
                    onProgress(botId, totalBots, result);
                }
                
                // Rate limiting 방지
                await this.sleep(500);
                
            } catch (error) {
                console.error(`❌ 봇 ${botId} 실행 실패:`, error);
                results.push({ botId, success: false, error: error.message });
            }
        }

        const successCount = results.filter(r => r.success).length;
        console.log(`✅ 전체 봇 실행 완료: ${successCount}/${totalBots} 성공`);

        return {
            totalBots,
            successCount,
            failedCount: totalBots - successCount,
            results
        };
    }

    // ========================================
    // 유틸리티
    // ========================================

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * 헬스체크
     */
    async healthCheck() {
        return this.request('/api/health');
    }
}

// 전역 인스턴스
window.apiClient = new APIClient();
console.log('✅ API 클라이언트 초기화 완료');
