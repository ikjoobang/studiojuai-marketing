-- ========================================
-- Studiojuai D1 Database Schema
-- ========================================

-- 매장 테이블
CREATE TABLE IF NOT EXISTS stores (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    industry TEXT NOT NULL,
    location TEXT NOT NULL,
    targetAge TEXT,
    avgPrice TEXT,
    competitors INTEGER DEFAULT 0,
    naverUrl TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT
);

CREATE INDEX IF NOT EXISTS idx_stores_industry ON stores(industry);
CREATE INDEX IF NOT EXISTS idx_stores_location ON stores(location);

-- 봇 실행 기록 테이블
CREATE TABLE IF NOT EXISTS bot_executions (
    id TEXT PRIMARY KEY,
    storeId TEXT NOT NULL,
    storeName TEXT NOT NULL,
    botId INTEGER NOT NULL,
    botName TEXT NOT NULL,
    industry TEXT NOT NULL,
    status TEXT NOT NULL,
    executionTime INTEGER,
    result TEXT,
    createdAt TEXT NOT NULL,
    FOREIGN KEY (storeId) REFERENCES stores(id)
);

CREATE INDEX IF NOT EXISTS idx_executions_store ON bot_executions(storeId);
CREATE INDEX IF NOT EXISTS idx_executions_bot ON bot_executions(botId);
CREATE INDEX IF NOT EXISTS idx_executions_status ON bot_executions(status);

-- 분석 데이터 테이블
CREATE TABLE IF NOT EXISTS analytics (
    id TEXT PRIMARY KEY,
    storeId TEXT NOT NULL,
    date TEXT NOT NULL,
    traffic INTEGER DEFAULT 0,
    revenue REAL DEFAULT 0,
    conversionRate REAL DEFAULT 0,
    keywordRank TEXT,
    competitorScore INTEGER DEFAULT 0,
    createdAt TEXT NOT NULL,
    FOREIGN KEY (storeId) REFERENCES stores(id)
);

CREATE INDEX IF NOT EXISTS idx_analytics_store ON analytics(storeId);
CREATE INDEX IF NOT EXISTS idx_analytics_date ON analytics(date);

-- API 사용 로그 테이블
CREATE TABLE IF NOT EXISTS api_logs (
    id TEXT PRIMARY KEY,
    apiType TEXT NOT NULL,
    endpoint TEXT NOT NULL,
    requestData TEXT,
    responseStatus INTEGER,
    responseTime INTEGER,
    errorMessage TEXT,
    createdAt TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_logs_api ON api_logs(apiType);
CREATE INDEX IF NOT EXISTS idx_logs_created ON api_logs(createdAt);
