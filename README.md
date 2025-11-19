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
- ✅ **GPT-4o-mini** 기반 분석 (카테고리별 Temperature 0.3/0.5/0.7)

### ❸ 40+페이지 PPT 자동 생성 (매출 상승 가이드 포함!)
- 📊 표지, 목차, 요약, 핵심 지표
- 📊 30개 봇 실행 결과
- 📊 경쟁사 분석, 액션 플랜
- 💰 **매출 상승 효과 분석** (Before/After)
- 📱 **네이버 플레이스 실행 가이드** (4단계 상세 설명)
- ✅ **즉시 실행 체크리스트** (30분 안에 실행 가능)
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
- OpenAI GPT-4o-mini (카테고리별 Temperature)
- Naver Local Search API
- RAG System (선행 봇 결과 참조)

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

**Production**: https://014a4381.studiojuai-platform.pages.dev

**사용자 가이드**: https://014a4381.studiojuai-platform.pages.dev/guide

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
- ✅ **3종 System Prompt** (Analytical/Strategic/Creative)
- ✅ 카테고리별 Temperature (Analytical: 0.3, Strategic: 0.5, Creative: 0.7)
- ✅ 구체적 매출액 예측 금지 (KPI 중심 제시)

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

### 2025-11-17 (최신) - 🚀 GPT-4o-mini 업그레이드 및 RAG 시스템 적용!
- ✅ **GPT-4o-mini 적용**: 기존 gpt-3.5-turbo에서 성능 향상
- ✅ **카테고리별 Temperature 설정**:
  - Analytical (시장/운영 봇): 0.3 (정확성 최우선)
  - Strategic (콘텐츠 봇): 0.5 (균형)
  - Creative (크리에이티브 봇): 0.7 (창의성)
- ✅ **3종 System Prompt 템플릿**:
  - Analytical Prompt: 데이터 기반 분석, 단계별 실행 가이드
  - Strategic Prompt: 전략 수립, 즉시 사용 가능한 콘텐츠
  - Creative Prompt: 디자인 가이드, 구체적 시각 요소
- ✅ **RAG 시스템 구현**: 선행 봇 결과를 후속 봇에 제공 (Context 강화)
- ✅ **봇 #8 변경**: "매출 예측 봇" → "목표 설정 및 잠재력 분석 봇"
  - 구체적 매출액 예측 제거 (법적/윤리적 이슈 방지)
  - KPI 중심 목표 설정 (방문객 수, 객단가, 재방문율)
- ✅ **30개 봇 프롬프트 전면 개선**:
  - 모든 봇에 expertise 필드 추가
  - 봇 #1, #2, #8: 사용자 문서 기반 상세 프롬프트 적용
  - 봇 #3-7, 9-30: 구조화된 프롬프트 및 전문성 정의
- ✅ **Cache Busting 적용**: 모든 JS 파일에 버전 파라미터 (v=2.0.1)
- ✅ **배포 완료**: https://014a4381.studiojuai-platform.pages.dev

**💡 핵심 변경**: AI 성능 대폭 향상, 할루시네이션 방지 강화, 봇 간 Context 공유로 더 정교한 분석 제공!

### 2025-11-16 - 🎯 PPT 실행 가이드 추가!
- ✅ **PPT에 네이버 플레이스 실행 가이드 추가**: 4단계 상세 가이드 (접속 → 정보 수정 → 사진 업로드 → 리뷰 관리)
- ✅ **PPT에 매출 상승 효과 슬라이드 추가**: Before/After 비교, 예상 매출 증가율 명시
- ✅ **PPT에 즉시 실행 체크리스트 추가**: 오늘 바로 실행할 수 있는 6가지 작업 (소요시간 30분)
- ✅ **사용자 가이드 페이지 추가**: 웹에서도 가이드 확인 가능 (guide.html)
- ✅ **매출 중심 GPT 프롬프트**: 실행 가능한 단계별 가이드 포함
- ✅ **배포 완료**: https://75631336.studiojuai-platform.pages.dev

**💡 핵심 변경**: 이제 PPT만 다운로드해도 네이버 플레이스에서 **정확히 어디를 클릭**하고 **무엇을 수정**해야 하는지 알 수 있습니다!

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

**Last Updated**: 2025-11-17 12:50 UTC
