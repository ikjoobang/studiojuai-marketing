// ==========================================
// 데이터베이스 연동 (RESTful Table API)
// ==========================================

class DatabaseManager {
    constructor() {
        this.baseUrl = '/tables'; // RESTful Table API 엔드포인트
        console.log('📊 데이터베이스 관리자 초기화');
    }

    // ==========================================
    // 매장 관리
    // ==========================================
    
    async saveStore(storeData) {
        try {
            console.log('💾 매장 저장:', storeData.name);
            
            // ID가 없으면 생성
            if (!storeData.id) {
                storeData.id = Date.now().toString();
            }
            
            // 기존 매장 확인
            const existing = await this.getStore(storeData.id);
            
            if (existing) {
                // 업데이트
                const response = await fetch(`${this.baseUrl}/stores/${storeData.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(storeData)
                });
                
                if (!response.ok) throw new Error('매장 업데이트 실패');
                console.log('✅ 매장 업데이트 완료:', storeData.name);
                return await response.json();
            } else {
                // 새로 생성
                const response = await fetch(`${this.baseUrl}/stores`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(storeData)
                });
                
                if (!response.ok) throw new Error('매장 생성 실패');
                console.log('✅ 매장 생성 완료:', storeData.name);
                return await response.json();
            }
        } catch (error) {
            console.error('❌ 매장 저장 실패:', error);
            // 폴백: LocalStorage에 저장
            localStorage.setItem(`store_${storeData.id}`, JSON.stringify(storeData));
            return storeData;
        }
    }
    
    async getStore(storeId) {
        try {
            const response = await fetch(`${this.baseUrl}/stores/${storeId}`);
            if (!response.ok) {
                if (response.status === 404) return null;
                throw new Error('매장 조회 실패');
            }
            return await response.json();
        } catch (error) {
            console.warn('⚠️ 매장 조회 실패, LocalStorage 사용:', error);
            const stored = localStorage.getItem(`store_${storeId}`);
            return stored ? JSON.parse(stored) : null;
        }
    }
    
    async getAllStores(page = 1, limit = 100) {
        try {
            const response = await fetch(`${this.baseUrl}/stores?page=${page}&limit=${limit}`);
            if (!response.ok) throw new Error('매장 목록 조회 실패');
            
            const result = await response.json();
            console.log(`✅ 매장 목록 조회: ${result.data.length}개`);
            return result.data;
        } catch (error) {
            console.warn('⚠️ 매장 목록 조회 실패, LocalStorage 사용:', error);
            // 폴백: LocalStorage에서 조회
            const stores = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith('store_')) {
                    stores.push(JSON.parse(localStorage.getItem(key)));
                }
            }
            return stores;
        }
    }
    
    async deleteStore(storeId) {
        try {
            const response = await fetch(`${this.baseUrl}/stores/${storeId}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('매장 삭제 실패');
            console.log('✅ 매장 삭제 완료:', storeId);
            return true;
        } catch (error) {
            console.error('❌ 매장 삭제 실패:', error);
            localStorage.removeItem(`store_${storeId}`);
            return false;
        }
    }
    
    // ==========================================
    // 봇 실행 기록 관리
    // ==========================================
    
    async saveBotExecution(executionData) {
        try {
            console.log('💾 봇 실행 기록 저장:', executionData.botName);
            
            if (!executionData.id) {
                executionData.id = Date.now().toString();
            }
            
            const response = await fetch(`${this.baseUrl}/bot_executions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...executionData,
                    result: JSON.stringify(executionData.result) // JSON을 문자열로 변환
                })
            });
            
            if (!response.ok) throw new Error('봇 실행 기록 저장 실패');
            console.log('✅ 봇 실행 기록 저장 완료');
            return await response.json();
        } catch (error) {
            console.error('❌ 봇 실행 기록 저장 실패:', error);
            // 폴백: LocalStorage에 저장
            const executions = JSON.parse(localStorage.getItem('botExecutions') || '[]');
            executions.push(executionData);
            localStorage.setItem('botExecutions', JSON.stringify(executions));
            return executionData;
        }
    }
    
    async getBotExecutions(storeId = null, page = 1, limit = 100) {
        try {
            let url = `${this.baseUrl}/bot_executions?page=${page}&limit=${limit}`;
            if (storeId) {
                url += `&search=${storeId}`;
            }
            
            const response = await fetch(url);
            if (!response.ok) throw new Error('봇 실행 기록 조회 실패');
            
            const result = await response.json();
            console.log(`✅ 봇 실행 기록 조회: ${result.data.length}개`);
            
            // result 필드를 다시 JSON으로 파싱
            return result.data.map(exec => ({
                ...exec,
                result: typeof exec.result === 'string' ? JSON.parse(exec.result) : exec.result
            }));
        } catch (error) {
            console.warn('⚠️ 봇 실행 기록 조회 실패, LocalStorage 사용:', error);
            const executions = JSON.parse(localStorage.getItem('botExecutions') || '[]');
            if (storeId) {
                return executions.filter(e => e.storeId === storeId);
            }
            return executions;
        }
    }
    
    // ==========================================
    // API 설정 관리 (선택사항 - 보안 문제로 권장하지 않음)
    // ==========================================
    
    async saveApiSettings(settings) {
        // ⚠️ 보안 경고: API 키를 서버에 저장하는 것은 권장하지 않습니다
        // 현재는 LocalStorage + 암호화 방식 사용 권장
        console.warn('⚠️ API 키는 LocalStorage에 암호화하여 저장하는 것을 권장합니다');
        return false;
    }
    
    // ==========================================
    // 유틸리티
    // ==========================================
    
    async clearAllData() {
        try {
            console.log('🗑️ 모든 데이터 삭제 중...');
            
            // 서버 데이터 삭제는 수동으로 해야 함 (안전)
            console.warn('⚠️ 서버 데이터는 수동으로 삭제해야 합니다');
            
            // LocalStorage 삭제
            localStorage.clear();
            
            console.log('✅ LocalStorage 데이터 삭제 완료');
            return true;
        } catch (error) {
            console.error('❌ 데이터 삭제 실패:', error);
            return false;
        }
    }
    
    // ==========================================
    // 데이터 마이그레이션 (LocalStorage → Database)
    // ==========================================
    
    async migrateLocalStorageToDatabase() {
        try {
            console.log('🔄 LocalStorage 데이터를 데이터베이스로 마이그레이션 중...');
            
            let migratedCount = 0;
            
            // 매장 데이터 마이그레이션
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                
                if (key.startsWith('store_')) {
                    const storeData = JSON.parse(localStorage.getItem(key));
                    await this.saveStore(storeData);
                    migratedCount++;
                }
            }
            
            // 봇 실행 기록 마이그레이션
            const executions = JSON.parse(localStorage.getItem('botExecutions') || '[]');
            for (const exec of executions) {
                await this.saveBotExecution(exec);
                migratedCount++;
            }
            
            console.log(`✅ 마이그레이션 완료: ${migratedCount}개 항목`);
            return migratedCount;
        } catch (error) {
            console.error('❌ 마이그레이션 실패:', error);
            return 0;
        }
    }
}

// 전역 인스턴스 생성
const databaseManager = new DatabaseManager();

console.log('✅ database.js 로드 완료');
