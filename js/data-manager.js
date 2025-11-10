// ========================================
// AI 마케팅 자동화 플랫폼 - 데이터 관리 시스템
// ========================================

// ========================================
// 데이터베이스 스키마 정의
// ========================================

// 매장 정보 테이블 스키마
const storesSchema = {
    tableName: 'stores',
    fields: [
        { name: 'id', type: 'text', description: '매장 고유 ID' },
        { name: 'name', type: 'text', description: '매장명' },
        { name: 'industry', type: 'text', description: '업종' },
        { name: 'location', type: 'text', description: '지역' },
        { name: 'targetAge', type: 'text', description: '타겟 연령대' },
        { name: 'avgPrice', type: 'text', description: '평균 객단가' },
        { name: 'competitors', type: 'number', description: '경쟁사 수' },
        { name: 'naverUrl', type: 'text', description: '네이버 플레이스 URL' },
        { name: 'createdAt', type: 'datetime', description: '생성일시' },
        { name: 'updatedAt', type: 'datetime', description: '수정일시' }
    ]
};

// 봇 실행 기록 테이블 스키마
const botExecutionsSchema = {
    tableName: 'bot_executions',
    fields: [
        { name: 'id', type: 'text', description: '실행 ID' },
        { name: 'storeId', type: 'text', description: '매장 ID' },
        { name: 'storeName', type: 'text', description: '매장명' },
        { name: 'botId', type: 'number', description: '봇 ID (1-30)' },
        { name: 'botName', type: 'text', description: '봇 이름' },
        { name: 'industry', type: 'text', description: '업종' },
        { name: 'status', type: 'text', description: '실행 상태' },
        { name: 'executionTime', type: 'number', description: '실행 시간 (ms)' },
        { name: 'result', type: 'rich_text', description: '실행 결과 (JSON)' },
        { name: 'createdAt', type: 'datetime', description: '실행일시' }
    ]
};

// 분석 데이터 테이블 스키마
const analyticsSchema = {
    tableName: 'analytics',
    fields: [
        { name: 'id', type: 'text', description: '분석 ID' },
        { name: 'storeId', type: 'text', description: '매장 ID' },
        { name: 'date', type: 'datetime', description: '분석 날짜' },
        { name: 'traffic', type: 'number', description: '방문자 수' },
        { name: 'revenue', type: 'number', description: '매출' },
        { name: 'conversionRate', type: 'number', description: '전환율 (%)' },
        { name: 'keywordRank', type: 'rich_text', description: '키워드 순위 (JSON)' },
        { name: 'competitorScore', type: 'number', description: '경쟁사 대비 점수' },
        { name: 'createdAt', type: 'datetime', description: '생성일시' }
    ]
};

// ========================================
// 로컬스토리지 데이터 관리
// ========================================

class DataManager {
    constructor() {
        this.init();
    }
    
    // 초기화
    init() {
        console.log('📊 데이터 관리 시스템 초기화');
        this.ensureDataStructure();
    }
    
    // 데이터 구조 확인 및 생성
    ensureDataStructure() {
        const keys = ['stores', 'botExecutions', 'analytics', 'settings'];
        keys.forEach(key => {
            if (!localStorage.getItem(key)) {
                localStorage.setItem(key, JSON.stringify([]));
            }
        });
    }
    
    // ========================================
    // 매장 관리
    // ========================================
    
    // 매장 저장
    saveStore(store) {
        try {
            // 🔒 보안: 입력값 검증
            const validation = {
                name: securityManager.validateInput('storeName', store.name),
                location: securityManager.validateInput('location', store.location),
                naverUrl: store.naverUrl ? securityManager.validateInput('url', store.naverUrl) : { isValid: true, sanitized: '' }
            };

            // 검증 실패 시
            if (!validation.name.isValid) {
                console.error('❌ 유효하지 않은 매장명');
                alert('매장명은 2-50자 이내로 입력해주세요.');
                return false;
            }
            if (!validation.location.isValid) {
                console.error('❌ 유효하지 않은 지역명');
                alert('지역명은 2-30자 이내로 입력해주세요.');
                return false;
            }
            if (!validation.naverUrl.isValid && store.naverUrl) {
                console.error('❌ 유효하지 않은 URL');
                alert('올바른 URL 형식을 입력해주세요.');
                return false;
            }

            // 정제된 값 사용
            store.name = validation.name.sanitized;
            store.location = validation.location.sanitized;
            store.naverUrl = validation.naverUrl.sanitized;

            const stores = this.getStores();
            
            // 중복 체크 (같은 이름과 위치)
            const existingIndex = stores.findIndex(s => 
                s.name === store.name && s.location === store.location
            );
            
            if (existingIndex >= 0) {
                // 업데이트
                store.updatedAt = new Date().toISOString();
                stores[existingIndex] = { ...stores[existingIndex], ...store };
            } else {
                // 신규 추가
                store.id = store.id || Date.now().toString();
                store.createdAt = new Date().toISOString();
                store.updatedAt = new Date().toISOString();
                stores.push(store);
            }
            
            localStorage.setItem('stores', JSON.stringify(stores));
            console.log('✅ 매장 저장 완료:', store.name);
            return store;
            
        } catch (error) {
            console.error('❌ 매장 저장 실패:', error);
            throw error;
        }
    }
    
    // 모든 매장 가져오기
    getStores() {
        try {
            return JSON.parse(localStorage.getItem('stores') || '[]');
        } catch (error) {
            console.error('❌ 매장 불러오기 실패:', error);
            return [];
        }
    }
    
    // 특정 매장 가져오기
    getStoreById(storeId) {
        const stores = this.getStores();
        return stores.find(s => s.id === storeId);
    }
    
    // 업종별 매장 가져오기
    getStoresByIndustry(industry) {
        const stores = this.getStores();
        return stores.filter(s => s.industry === industry);
    }
    
    // 매장 삭제
    deleteStore(storeId) {
        try {
            let stores = this.getStores();
            stores = stores.filter(s => s.id !== storeId);
            localStorage.setItem('stores', JSON.stringify(stores));
            console.log('✅ 매장 삭제 완료:', storeId);
            return true;
        } catch (error) {
            console.error('❌ 매장 삭제 실패:', error);
            return false;
        }
    }
    
    // ========================================
    // 봇 실행 기록 관리
    // ========================================
    
    // 봇 실행 기록 저장
    saveBotExecution(execution) {
        try {
            const executions = this.getBotExecutions();
            
            execution.id = execution.id || Date.now().toString();
            execution.createdAt = execution.createdAt || new Date().toISOString();
            
            executions.push(execution);
            
            // 최근 1000개만 유지
            if (executions.length > 1000) {
                executions.splice(0, executions.length - 1000);
            }
            
            localStorage.setItem('botExecutions', JSON.stringify(executions));
            console.log('✅ 봇 실행 기록 저장:', execution.botName);
            return execution;
            
        } catch (error) {
            console.error('❌ 봇 실행 기록 저장 실패:', error);
            throw error;
        }
    }
    
    // 모든 봇 실행 기록 가져오기
    getBotExecutions() {
        try {
            return JSON.parse(localStorage.getItem('botExecutions') || '[]');
        } catch (error) {
            console.error('❌ 봇 실행 기록 불러오기 실패:', error);
            return [];
        }
    }
    
    // 특정 매장의 봇 실행 기록
    getBotExecutionsByStore(storeId) {
        const executions = this.getBotExecutions();
        return executions.filter(e => e.storeId === storeId);
    }
    
    // 특정 봇의 실행 기록
    getBotExecutionsByBotId(botId) {
        const executions = this.getBotExecutions();
        return executions.filter(e => e.botId === botId);
    }
    
    // 최근 실행 기록 가져오기
    getRecentExecutions(limit = 10) {
        const executions = this.getBotExecutions();
        return executions.slice(-limit).reverse();
    }
    
    // ========================================
    // 분석 데이터 관리
    // ========================================
    
    // 분석 데이터 저장
    saveAnalytics(analytics) {
        try {
            const allAnalytics = this.getAnalytics();
            
            analytics.id = analytics.id || Date.now().toString();
            analytics.createdAt = analytics.createdAt || new Date().toISOString();
            
            allAnalytics.push(analytics);
            
            // 최근 500개만 유지
            if (allAnalytics.length > 500) {
                allAnalytics.splice(0, allAnalytics.length - 500);
            }
            
            localStorage.setItem('analytics', JSON.stringify(allAnalytics));
            console.log('✅ 분석 데이터 저장 완료');
            return analytics;
            
        } catch (error) {
            console.error('❌ 분석 데이터 저장 실패:', error);
            throw error;
        }
    }
    
    // 모든 분석 데이터 가져오기
    getAnalytics() {
        try {
            return JSON.parse(localStorage.getItem('analytics') || '[]');
        } catch (error) {
            console.error('❌ 분석 데이터 불러오기 실패:', error);
            return [];
        }
    }
    
    // 특정 매장의 분석 데이터
    getAnalyticsByStore(storeId) {
        const analytics = this.getAnalytics();
        return analytics.filter(a => a.storeId === storeId);
    }
    
    // 기간별 분석 데이터
    getAnalyticsByDateRange(storeId, startDate, endDate) {
        const analytics = this.getAnalyticsByStore(storeId);
        return analytics.filter(a => {
            const date = new Date(a.date);
            return date >= startDate && date <= endDate;
        });
    }
    
    // ========================================
    // 통계 및 인사이트
    // ========================================
    
    // 매장 통계
    getStoreStatistics(storeId) {
        const executions = this.getBotExecutionsByStore(storeId);
        const analytics = this.getAnalyticsByStore(storeId);
        
        return {
            totalExecutions: executions.length,
            completedExecutions: executions.filter(e => e.status === 'completed').length,
            failedExecutions: executions.filter(e => e.status === 'error').length,
            averageExecutionTime: this.calculateAverageExecutionTime(executions),
            latestAnalytics: analytics[analytics.length - 1] || null,
            totalAnalytics: analytics.length
        };
    }
    
    // 평균 실행 시간 계산
    calculateAverageExecutionTime(executions) {
        if (executions.length === 0) return 0;
        
        const times = executions
            .filter(e => e.executionTime)
            .map(e => e.executionTime);
        
        if (times.length === 0) return 0;
        
        const sum = times.reduce((a, b) => a + b, 0);
        return Math.round(sum / times.length);
    }
    
    // 업종별 통계
    getIndustryStatistics() {
        const stores = this.getStores();
        const statistics = {};
        
        stores.forEach(store => {
            const industry = store.industry;
            if (!statistics[industry]) {
                statistics[industry] = {
                    count: 0,
                    stores: []
                };
            }
            statistics[industry].count++;
            statistics[industry].stores.push(store);
        });
        
        return statistics;
    }
    
    // 인기 봇 순위
    getPopularBots(limit = 10) {
        const executions = this.getBotExecutions();
        const botCounts = {};
        
        executions.forEach(e => {
            const key = `${e.botId}-${e.botName}`;
            if (!botCounts[key]) {
                botCounts[key] = {
                    botId: e.botId,
                    botName: e.botName,
                    count: 0
                };
            }
            botCounts[key].count++;
        });
        
        return Object.values(botCounts)
            .sort((a, b) => b.count - a.count)
            .slice(0, limit);
    }
    
    // ========================================
    // 데이터 내보내기/가져오기
    // ========================================
    
    // 전체 데이터 내보내기
    exportAllData() {
        try {
            const data = {
                stores: this.getStores(),
                botExecutions: this.getBotExecutions(),
                analytics: this.getAnalytics(),
                exportDate: new Date().toISOString(),
                version: '1.0.0'
            };
            
            const dataStr = JSON.stringify(data, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `ai_marketing_data_${Date.now()}.json`;
            link.click();
            
            URL.revokeObjectURL(url);
            console.log('✅ 데이터 내보내기 완료');
            return true;
            
        } catch (error) {
            console.error('❌ 데이터 내보내기 실패:', error);
            return false;
        }
    }
    
    // 데이터 가져오기
    importData(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            
            if (data.stores) {
                localStorage.setItem('stores', JSON.stringify(data.stores));
            }
            if (data.botExecutions) {
                localStorage.setItem('botExecutions', JSON.stringify(data.botExecutions));
            }
            if (data.analytics) {
                localStorage.setItem('analytics', JSON.stringify(data.analytics));
            }
            
            console.log('✅ 데이터 가져오기 완료');
            return true;
            
        } catch (error) {
            console.error('❌ 데이터 가져오기 실패:', error);
            return false;
        }
    }
    
    // ========================================
    // 데이터 초기화
    // ========================================
    
    // 전체 데이터 삭제
    clearAllData() {
        if (confirm('정말로 모든 데이터를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
            localStorage.removeItem('stores');
            localStorage.removeItem('botExecutions');
            localStorage.removeItem('analytics');
            localStorage.removeItem('currentStore');
            this.ensureDataStructure();
            console.log('✅ 모든 데이터 삭제 완료');
            return true;
        }
        return false;
    }
    
    // 특정 타입 데이터만 삭제
    clearDataByType(type) {
        try {
            localStorage.removeItem(type);
            this.ensureDataStructure();
            console.log(`✅ ${type} 데이터 삭제 완료`);
            return true;
        } catch (error) {
            console.error(`❌ ${type} 데이터 삭제 실패:`, error);
            return false;
        }
    }
}

// ========================================
// 전역 인스턴스 생성
// ========================================
const dataManager = new DataManager();

// 전역 함수로 노출
window.dataManager = dataManager;

// ========================================
// API 통합 함수 (네이버 API + GPT API)
// ========================================

class APIManager {
    constructor() {
        this.naverClientId = 'fUhHJ1HWyF6fFw_aBfkg';
        this.naverClientSecret = 'gA4jUFDYK0';
        this.gptApiKey = null; // 사용자가 설정에서 입력
    }
    
    // GPT API 키 설정
    setGPTApiKey(apiKey) {
        // 🔒 보안: API 키 검증 및 암호화 저장
        if (!securityManager.saveApiKey('gpt', apiKey)) {
            console.error('❌ API 키 저장 실패');
            return false;
        }
        this.gptApiKey = apiKey;
        console.log('✅ GPT API 키가 암호화되어 저장되었습니다');
        return true;
    }
    
    // GPT API 호출
    async callGPT(prompt, options = {}) {
        // 🔒 보안: Rate Limiting 체크
        const rateLimitCheck = securityManager.checkApiCall('gpt');
        if (!rateLimitCheck.allowed) {
            throw new Error(rateLimitCheck.reason);
        }

        // 암호화된 API 키 불러오기
        if (!this.gptApiKey) {
            this.gptApiKey = securityManager.getApiKey('gpt');
        }
        
        if (!this.gptApiKey) {
            throw new Error('GPT API 키가 설정되지 않았습니다. 설정에서 API 키를 입력해주세요.');
        }

        // 🔒 보안: 프롬프트 입력값 검증
        const validation = securityManager.validateInput('text', prompt);
        if (!validation.isValid) {
            throw new Error('유효하지 않은 프롬프트입니다.');
        }
        
        try {
            // API 호출 로깅
            securityManager.logger.logApiCall('gpt', true, { 
                promptLength: prompt.length,
                model: options.model || 'gpt-4',
                remaining: rateLimitCheck.remaining - 1
            });
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.gptApiKey}`
                },
                body: JSON.stringify({
                    model: options.model || 'gpt-4',
                    messages: [
                        {
                            role: 'system',
                            content: options.systemPrompt || 'You are a professional marketing AI assistant.'
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    temperature: options.temperature || 0.7,
                    max_tokens: options.maxTokens || 2000
                })
            });
            
            if (!response.ok) {
                securityManager.logger.logApiCall('gpt', false, { 
                    status: response.status,
                    statusText: response.statusText
                });
                throw new Error(`GPT API 오류: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // 성공 로깅
            securityManager.logger.logApiCall('gpt', true, {
                tokensUsed: data.usage?.total_tokens || 0,
                model: data.model
            });
            
            return data.choices[0].message.content;
            
        } catch (error) {
            securityManager.logger.logApiCall('gpt', false, { error: error.message });
            console.error('❌ GPT API 호출 실패:', error);
            throw error;
        }
    }
    
    // 네이버 검색 API 호출
    async searchNaver(query, options = {}) {
        // 🔒 보안: Rate Limiting 체크
        const rateLimitCheck = securityManager.checkApiCall('naver');
        if (!rateLimitCheck.allowed) {
            throw new Error(rateLimitCheck.reason);
        }

        // 🔒 보안: 검색어 입력값 검증
        const validation = securityManager.validateInput('text', query);
        if (!validation.isValid) {
            throw new Error('유효하지 않은 검색어입니다.');
        }

        try {
            const searchType = options.type || 'local'; // local, blog, news, etc.
            const display = Math.min(options.display || 10, 100); // 최대 100개 제한
            const start = Math.max(options.start || 1, 1); // 최소 1
            
            // API 호출 로깅
            securityManager.logger.logApiCall('naver', true, {
                query: validation.sanitized.substring(0, 50),
                type: searchType,
                remaining: rateLimitCheck.remaining - 1
            });

            console.log(`🔍 네이버 API 검색 (실제 호출): ${validation.sanitized}`);
            
            // ✅ Cloudflare Pages Function을 통해 실제 네이버 API 호출
            const apiUrl = `/api/naver-search?query=${encodeURIComponent(validation.sanitized)}&type=${searchType}&display=${display}&start=${start}`;
            
            const response = await fetch(apiUrl);
            const result = await response.json();
            
            if (!result.success) {
                console.error('❌ 네이버 API 오류:', result.error);
                throw new Error(result.error);
            }
            
            console.log(`✅ 네이버 API 성공: ${result.data.total}개 결과`);
            
            // 실제 네이버 API 응답 반환
            return result.data;
            
        } catch (error) {
            // API 호출 실패 로깅
            securityManager.logger.logApiCall('naver', false, { error: error.message });
            console.error('❌ 네이버 API 호출 실패:', error);
            throw error;
        }
    }
}

// 전역 인스턴스
const apiManager = new APIManager();
window.apiManager = apiManager;

console.log('✅ data-manager.js 로드 완료');
