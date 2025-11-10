/**
 * 보안 모듈 (Security Module)
 * AI 마케팅 자동화 플랫폼 보안 기능 구현
 */

// ============================================
// 1. API 키 암호화 및 안전한 저장
// ============================================

class SecureStorage {
    constructor() {
        this.encryptionKey = this.generateKey();
    }

    // 간단한 암호화 키 생성 (실제 운영환경에서는 더 강력한 방법 사용)
    generateKey() {
        const stored = localStorage.getItem('_sk');
        if (stored) return stored;
        
        const key = this.randomString(32);
        localStorage.setItem('_sk', key);
        return key;
    }

    randomString(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    // XOR 기반 간단한 암호화 (브라우저 환경에서 사용 가능)
    encrypt(text) {
        if (!text) return '';
        
        let encrypted = '';
        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i) ^ this.encryptionKey.charCodeAt(i % this.encryptionKey.length);
            encrypted += String.fromCharCode(charCode);
        }
        return btoa(encrypted); // Base64 인코딩
    }

    // 복호화
    decrypt(encryptedText) {
        if (!encryptedText) return '';
        
        try {
            const decoded = atob(encryptedText); // Base64 디코딩
            let decrypted = '';
            for (let i = 0; i < decoded.length; i++) {
                const charCode = decoded.charCodeAt(i) ^ this.encryptionKey.charCodeAt(i % this.encryptionKey.length);
                decrypted += String.fromCharCode(charCode);
            }
            return decrypted;
        } catch (e) {
            console.error('복호화 실패:', e);
            return '';
        }
    }

    // API 키 안전하게 저장 (alias)
    setApiKey(keyName, apiKey) {
        return this.saveApiKey(keyName, apiKey);
    }

    // API 키 안전하게 저장
    saveApiKey(keyName, apiKey) {
        const encrypted = this.encrypt(apiKey);
        localStorage.setItem(`api_${keyName}`, encrypted);
        console.log(`✅ ${keyName} API 키가 암호화되어 저장되었습니다`);
    }

    // API 키 안전하게 불러오기
    getApiKey(keyName) {
        const encrypted = localStorage.getItem(`api_${keyName}`);
        if (!encrypted) return null;
        return this.decrypt(encrypted);
    }

    // API 키 삭제
    removeApiKey(keyName) {
        localStorage.removeItem(`api_${keyName}`);
        console.log(`🗑️ ${keyName} API 키가 삭제되었습니다`);
    }
}

// ============================================
// 2. Rate Limiting (API 호출 제한)
// ============================================

class RateLimiter {
    constructor() {
        this.limits = {
            gpt: { max: 10, window: 60000 }, // 1분에 10회
            naver: { max: 25, window: 60000 }, // 1분에 25회
            bot: { max: 30, window: 300000 } // 5분에 30회
        };
        this.records = {};
    }

    // Rate limit 체크
    checkLimit(type) {
        const now = Date.now();
        const limit = this.limits[type];
        
        if (!limit) {
            console.warn(`⚠️ 알 수 없는 Rate Limit 타입: ${type}`);
            return true;
        }

        // 기록 초기화
        if (!this.records[type]) {
            this.records[type] = [];
        }

        // 시간 윈도우 밖의 기록 제거
        this.records[type] = this.records[type].filter(
            timestamp => now - timestamp < limit.window
        );

        // 제한 확인
        if (this.records[type].length >= limit.max) {
            const oldestRecord = Math.min(...this.records[type]);
            const waitTime = Math.ceil((limit.window - (now - oldestRecord)) / 1000);
            
            console.warn(`⚠️ Rate Limit 초과: ${type} (${waitTime}초 후 재시도)`);
            return false;
        }

        // 새 기록 추가
        this.records[type].push(now);
        return true;
    }

    // 남은 호출 횟수 확인
    getRemainingCalls(type) {
        const now = Date.now();
        const limit = this.limits[type];
        
        if (!limit || !this.records[type]) return limit?.max || 0;

        // 유효한 기록만 필터링
        const validRecords = this.records[type].filter(
            timestamp => now - timestamp < limit.window
        );

        return Math.max(0, limit.max - validRecords.length);
    }

    // 다음 사용 가능 시간
    getNextAvailableTime(type) {
        const now = Date.now();
        const limit = this.limits[type];
        
        if (!limit || !this.records[type] || this.records[type].length < limit.max) {
            return 0; // 지금 사용 가능
        }

        const oldestRecord = Math.min(...this.records[type]);
        return Math.max(0, limit.window - (now - oldestRecord));
    }
}

// ============================================
// 3. 입력값 검증 및 XSS 방지
// ============================================

class InputValidator {
    // HTML 특수문자 이스케이프 (XSS 방지)
    static sanitizeHTML(input) {
        if (typeof input !== 'string') return input;
        
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '/': '&#x2F;'
        };
        
        return input.replace(/[&<>"'/]/g, char => map[char]);
    }

    // SQL Injection 방지를 위한 특수문자 제거
    static sanitizeSQL(input) {
        if (typeof input !== 'string') return input;
        
        // 위험한 SQL 키워드 및 문자 제거
        const dangerous = [
            'DROP', 'DELETE', 'INSERT', 'UPDATE', 'SELECT',
            '--', ';', '/*', '*/', 'xp_', 'sp_'
        ];
        
        let sanitized = input;
        dangerous.forEach(keyword => {
            const regex = new RegExp(keyword, 'gi');
            sanitized = sanitized.replace(regex, '');
        });
        
        return sanitized;
    }

    // 이메일 검증
    static validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // URL 검증
    static validateURL(url) {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    }

    // 전화번호 검증 (한국)
    static validatePhone(phone) {
        const regex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
        return regex.test(phone);
    }

    // 숫자만 허용
    static sanitizeNumber(input) {
        return String(input).replace(/[^0-9.-]/g, '');
    }

    // 한글, 영문, 숫자만 허용
    static sanitizeText(input) {
        return String(input).replace(/[^가-힣a-zA-Z0-9\s]/g, '');
    }

    // 길이 검증
    static validateLength(input, min = 0, max = Infinity) {
        const length = String(input).length;
        return length >= min && length <= max;
    }

    // 매장명 검증
    static validateStoreName(name) {
        const sanitized = this.sanitizeHTML(name);
        return this.validateLength(sanitized, 2, 50) ? sanitized : null;
    }

    // 지역명 검증
    static validateLocation(location) {
        const sanitized = this.sanitizeHTML(location);
        return this.validateLength(sanitized, 2, 30) ? sanitized : null;
    }

    // API 키 검증
    static validateApiKey(key, keyType) {
        if (!key || typeof key !== 'string') return false;
        
        // 키 타입별 검증
        if (keyType === 'gpt') {
            return key.startsWith('sk-') && key.length > 20;
        } else if (keyType === 'naver') {
            return key.length >= 10;
        }
        
        return key.length >= 10;
    }
}

// ============================================
// 4. CSRF 토큰 생성 및 검증
// ============================================

class CSRFProtection {
    constructor() {
        this.tokenKey = '_csrf_token';
        this.initToken();
    }

    // CSRF 토큰 초기화
    initToken() {
        if (!sessionStorage.getItem(this.tokenKey)) {
            this.regenerateToken();
        }
    }

    // 새 토큰 생성
    regenerateToken() {
        const token = this.generateRandomToken();
        sessionStorage.setItem(this.tokenKey, token);
        return token;
    }

    // 랜덤 토큰 생성
    generateRandomToken() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }

    // 현재 토큰 가져오기
    getToken() {
        return sessionStorage.getItem(this.tokenKey);
    }

    // 토큰 검증
    validateToken(token) {
        const storedToken = this.getToken();
        return token === storedToken;
    }

    // 폼에 토큰 추가
    addTokenToForm(formElement) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = '_csrf';
        input.value = this.getToken();
        formElement.appendChild(input);
    }
}

// ============================================
// 5. 로깅 및 감사 추적
// ============================================

class SecurityLogger {
    constructor() {
        this.logKey = 'security_logs';
        this.maxLogs = 100;
    }

    // 보안 이벤트 로깅
    log(eventType, details) {
        const logs = this.getLogs();
        
        const logEntry = {
            timestamp: new Date().toISOString(),
            type: eventType,
            details: details,
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        logs.unshift(logEntry);
        
        // 최대 로그 수 제한
        if (logs.length > this.maxLogs) {
            logs.splice(this.maxLogs);
        }

        localStorage.setItem(this.logKey, JSON.stringify(logs));
        
        // 콘솔에도 출력
        console.log(`🔒 [Security] ${eventType}:`, details);
    }

    // 로그 조회
    getLogs() {
        try {
            const logs = localStorage.getItem(this.logKey);
            return logs ? JSON.parse(logs) : [];
        } catch (e) {
            return [];
        }
    }

    // 의심스러운 활동 감지
    logSuspiciousActivity(activity) {
        this.log('SUSPICIOUS_ACTIVITY', activity);
        console.warn('⚠️ 의심스러운 활동 감지:', activity);
    }

    // API 호출 로깅
    logApiCall(apiType, success, details) {
        this.log('API_CALL', {
            api: apiType,
            success: success,
            details: details
        });
    }

    // 로그 내보내기
    exportLogs() {
        const logs = this.getLogs();
        const dataStr = JSON.stringify(logs, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `security_logs_${new Date().toISOString()}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
    }
}

// ============================================
// 6. 통합 보안 매니저
// ============================================

class SecurityManager {
    constructor() {
        this.storage = new SecureStorage();
        this.rateLimiter = new RateLimiter();
        this.csrf = new CSRFProtection();
        this.logger = new SecurityLogger();
        
        console.log('🔒 보안 시스템 초기화 완료');
        this.logger.log('SYSTEM_INIT', { message: '보안 시스템 시작' });
    }

    // API 키 저장 (암호화)
    saveApiKey(keyType, apiKey) {
        // 검증
        if (!InputValidator.validateApiKey(apiKey, keyType)) {
            console.error('❌ 유효하지 않은 API 키 형식');
            this.logger.log('API_KEY_VALIDATION_FAILED', { keyType });
            return false;
        }

        // 암호화 저장
        this.storage.saveApiKey(keyType, apiKey);
        this.logger.log('API_KEY_SAVED', { keyType });
        return true;
    }

    // API 키 불러오기 (복호화)
    getApiKey(keyType) {
        return this.storage.getApiKey(keyType);
    }

    // API 호출 전 체크
    checkApiCall(apiType) {
        // Rate limit 체크
        if (!this.rateLimiter.checkLimit(apiType)) {
            const waitTime = Math.ceil(this.rateLimiter.getNextAvailableTime(apiType) / 1000);
            this.logger.logSuspiciousActivity({
                type: 'RATE_LIMIT_EXCEEDED',
                api: apiType,
                waitTime: waitTime
            });
            return {
                allowed: false,
                reason: `Rate limit 초과. ${waitTime}초 후 재시도하세요.`
            };
        }

        const remaining = this.rateLimiter.getRemainingCalls(apiType);
        console.log(`✅ ${apiType} API 호출 가능 (남은 횟수: ${remaining})`);
        
        return { allowed: true, remaining };
    }

    // 입력값 검증 및 정제
    validateInput(type, value) {
        let sanitized;
        let isValid = true;

        switch(type) {
            case 'storeName':
                sanitized = InputValidator.validateStoreName(value);
                isValid = sanitized !== null;
                break;
            case 'location':
                sanitized = InputValidator.validateLocation(value);
                isValid = sanitized !== null;
                break;
            case 'email':
                sanitized = InputValidator.sanitizeHTML(value);
                isValid = InputValidator.validateEmail(value);
                break;
            case 'phone':
                sanitized = InputValidator.sanitizeNumber(value);
                isValid = InputValidator.validatePhone(sanitized);
                break;
            case 'url':
                sanitized = value;
                isValid = InputValidator.validateURL(value);
                break;
            case 'number':
                sanitized = InputValidator.sanitizeNumber(value);
                isValid = !isNaN(parseFloat(sanitized));
                break;
            case 'text':
                sanitized = InputValidator.sanitizeHTML(value);
                isValid = InputValidator.validateLength(sanitized, 1, 1000);
                break;
            default:
                sanitized = InputValidator.sanitizeHTML(value);
                isValid = true;
        }

        if (!isValid) {
            this.logger.log('INPUT_VALIDATION_FAILED', { type, value: value?.substring(0, 50) });
        }

        return { isValid, sanitized };
    }

    // CSRF 토큰 가져오기
    getCsrfToken() {
        return this.csrf.getToken();
    }

    // CSRF 토큰 검증
    validateCsrfToken(token) {
        return this.csrf.validateToken(token);
    }

    // 보안 로그 조회
    getSecurityLogs() {
        return this.logger.getLogs();
    }

    // 보안 로그 내보내기
    exportSecurityLogs() {
        this.logger.exportLogs();
    }
}

// ============================================
// 전역 인스턴스 생성
// ============================================

const securityManager = new SecurityManager();

// 전역으로 export
if (typeof window !== 'undefined') {
    window.securityManager = securityManager;
    window.InputValidator = InputValidator;
}

console.log('✅ security.js 로드 완료');
