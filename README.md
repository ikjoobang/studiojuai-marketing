# Studiojuai 마케팅 최적화 플랫폼

> AI 기반 소상공인 마케팅 자동화 플랫폼

## 🎯 프로젝트 개요

**Studiojuai 마케팅 최적화 플랫폼**은 소상공인을 위한 AI 기반 마케팅 자동화 솔루션입니다. 30개의 AI 봇이 네이버 플레이스 실제 데이터를 분석하여 맞춤형 마케팅 전략을 제공합니다.

## ✨ 주요 기능

### ❶ 30개 AI 마케팅 봇
- **시장 분석 봇 (8개)**: 매장 정보, 경쟁사 벤치마킹, 상권 분석, SEO/AEO/GEO/C-RANK 최적화 등
- **콘텐츠 자동화 봇 (8개)**: 제안서 생성, 브랜드 스토리, SNS 콘텐츠, 블로그 포스팅 등
- **크리에이티브 봇 (6개)**: 로고 디자인, 메뉴판 제작, 간판 디자인 등
- **운영 최적화 봇 (8개)**: 예약 시스템, 리뷰 관리, 재고 최적화 등

### ❷ 네이버 API 실시간 데이터 수집
- ✅ **실제 데이터만 사용** (환각 방지)
- ✅ 네이버 로컬 검색 API 연동
- ✅ 경쟁사 분석 (반경 1km 내 실제 업체)
- ✅ GPT-3.5-turbo 기반 분석 (Temperature 0.3)

### ❸ 37페이지 PPT 자동 생성
- 📊 표지, 목차, 요약, 핵심 지표
- 📊 30개 봇 실행 결과
- 📊 경쟁사 분석, 액션 플랜
- 📊 PptxGenJS 라이브러리 사용

### ❹ TXT 다운로드
- 📝 모든 봇 실행 결과를 텍스트로 다운로드
- 📝 업종별 맞춤 구조화

### ❺ 업종별 지원
- ☕ 카페
- 🍗 치킨
- 🍚 한식
- 💇 미용실
- 🍕 피자
- 🍰 디저트

## 🏗️ 기술 스택

### Frontend
- HTML5, CSS3 (TailwindCSS CDN)
- JavaScript (ES6+)
- PptxGenJS (PPT 생성)
- Chart.js (데이터 시각화)

### Backend
- Cloudflare Pages Functions
- Hono Framework
- Cloudflare D1 (SQLite Database)
- OpenAI GPT-3.5-turbo
- Naver Local Search API

### Deployment
- Cloudflare Pages
- PM2 (로컬 개발)
- Git Version Control

## 📊 데이터 구조

### Cloudflare D1 Database

**stores 테이블**
```sql
CREATE TABLE stores (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    industry TEXT NOT NULL,
    location TEXT NOT NULL,
    targetAge TEXT,
    avgPrice TEXT,
    competitors INTEGER,
    naverUrl TEXT,
    createdAt TEXT
);
```

**bot_executions 테이블**
```sql
CREATE TABLE bot_executions (
    id TEXT PRIMARY KEY,
    storeId TEXT NOT NULL,
    storeName TEXT NOT NULL,
    botId INTEGER NOT NULL,
    botName TEXT NOT NULL,
    industry TEXT NOT NULL,
    status TEXT NOT NULL,
    result TEXT,
    createdAt TEXT,
    FOREIGN KEY (storeId) REFERENCES stores(id)
);
```

## 🚀 로컬 실행

### 1. 환경 변수 설정
```bash
# .dev.vars 파일 생성
OPENAI_API_KEY=sk-...
NAVER_CLIENT_ID=your-client-id
NAVER_CLIENT_SECRET=your-client-secret
```

### 2. 의존성 설치
```bash
cd /home/user/webapp
npm install
```

### 3. D1 데이터베이스 마이그레이션
```bash
# 로컬 D1 초기화
npm run db:migrate:local

# 테스트 데이터 삽입 (선택사항)
npm run db:seed
```

### 4. 개발 서버 실행
```bash
# 빌드
npm run build

# PM2로 실행
pm2 start ecosystem.config.cjs

# 서비스 확인
curl http://localhost:3000/api/health
```

## 🌐 프로덕션 URL

**Production**: https://studiojuai-platform.pages.dev

**API Endpoints**:
- `GET /api/health` - Health check
- `GET /api/stores` - 모든 매장 조회
- `POST /api/stores` - 매장 생성
- `GET /api/stores/:id` - 매장 상세 조회
- `POST /api/bots/execute` - 봇 실행
- `GET /api/stores/:id/executions` - 봇 실행 결과 조회

## ✅ 검증 완료 사항

### 환각(Hallucination) 방지
- ✅ 모든 경쟁사 데이터는 네이버 API 실제 검색 결과
- ✅ GPT 시스템 프롬프트에 "실제 데이터만 사용" 명시
- ✅ Temperature 0.3으로 환각 최소화

### 테스트 완료
- ✅ API 정상 동작 (health, stores, executions)
- ✅ D1 데이터베이스 연동 확인
- ✅ 실제 경쟁사 데이터 5개 이상 수집 확인
- ✅ 필드명 수정 (`data.results` → `data.executions`)

## 📁 프로젝트 구조

```
webapp/
├── index.html                 # 메인 페이지
├── js/
│   ├── main.js               # 메인 JavaScript
│   ├── api-client.js         # API 클라이언트
│   ├── bot-system.js         # 봇 시스템
│   ├── ppt-generator.js      # PPT 생성기
│   └── report-data.js        # 보고서 데이터 수집
├── functions/
│   └── api/
│       └── _middleware.js    # Cloudflare Functions API
├── worker/
│   └── bot-definitions.js    # 30개 봇 정의
├── migrations/
│   └── 0001_initial_schema.sql  # D1 마이그레이션
├── sample-data-generator.js  # 업종별 샘플 데이터
├── wrangler.toml             # Cloudflare 설정
├── ecosystem.config.cjs      # PM2 설정
└── package.json              # 의존성
```

## 🔧 주요 개선사항

### 2025-11-15
- ✅ 업종별 샘플 데이터 생성 (카페/치킨/한식/미용실/피자/디저트)
- ✅ PPT 폰트 크기 증가 (가독성 향상)
- ✅ TXT/PPT 다운로드 필드명 수정 (`data.executions`)
- ✅ 환각 방지 검증 완료
- ✅ API 점검 완료

## 📞 문의

- **이메일**: ikjoobang@gmail.com
- **웹사이트**: https://www.studiojuai.com
- **프로젝트**: https://studiojuai-platform.pages.dev

---

**Made with ❤️ for 소상공인**
