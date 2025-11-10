/**
 * ========================================
 * API 클라이언트 - 백엔드 통신
 * ========================================
 */

class APIClient {
    constructor() {
        // 데모 모드 활성화
        this.demoMode = true;
        console.log(`🎭 데모 모드 활성화 (백엔드 없이 시뮬레이션)`);
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
        // 데모 모드: localStorage에 저장
        if (this.demoMode) {
            const storeId = Date.now().toString();
            const store = {
                id: storeId,
                ...storeData,
                createdAt: new Date().toISOString()
            };
            localStorage.setItem('currentStore', JSON.stringify(store));
            return {
                success: true,
                storeId: storeId,
                message: '매장이 생성되었습니다 (데모 모드)'
            };
        }
        
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
        // 데모 모드: 시뮬레이션된 응답 반환
        if (this.demoMode) {
            await this.sleep(300); // 실제처럼 지연
            return {
                success: true,
                botId: botId,
                botName: `AI 봇 #${botId}`,
                result: this.generateDemoResult(botId, storeId)
            };
        }
        
        return this.request('/api/bots/execute', {
            method: 'POST',
            body: JSON.stringify({ botId, storeId })
        });
    }
    
    /**
     * 데모 결과 생성
     */
    generateDemoResult(botId, storeId) {
        const botCategories = {
            1: '매장 정보 분석',
            2: '경쟁사 벤치마킹',
            3: '키워드 최적화',
            4: '고객 리뷰 분석',
            5: '가격 전략 제안'
        };
        
        const category = botCategories[botId] || `마케팅 전략 ${botId}`;
        
        return `✅ ${category} 완료!\n\n` +
               `📊 분석 결과:\n` +
               `- 현재 상태: 양호\n` +
               `- 개선 포인트: 3가지 발견\n` +
               `- 추천 액션: 즉시 실행 가능\n\n` +
               `💡 주요 인사이트:\n` +
               `1. 타겟 고객층 확대 가능\n` +
               `2. 가격 경쟁력 강화 필요\n` +
               `3. 온라인 마케팅 강화 권장\n\n` +
               `🎯 다음 단계:\n` +
               `- 상세 분석 리포트 확인\n` +
               `- 실행 계획 수립\n` +
               `- ROI 측정 및 모니터링`;
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
