# Studiojuai_Marketing_Platform

## ✔️ 완료된 핵심 기능

■ **네이버 API 실제 연동**
  → 네이버 로컬 검색 API 실시간 호출
  → 매장 정보 자동 수집 (주소, 전화번호, 좌표, 카테고리)
  → API 엔드포인트: `/api/naver/search`, `/api/naver/place`

■ **반경 내 경쟁사 검색 (1km)**
  → 같은 업종 경쟁사 5개 자동 검색
  → 실제 데이터 제공: 경쟁사 매장명, 카테고리, 주소, 전화번호, 좌표
  → 봇 실행 시 자동으로 경쟁사 데이터 수집 및 GPT 분석

■ **SEO/AEO/GEO/C-RANK 최적화**
  → 실제 키워드 순위 확인 (매장명, 지역+업종, 근처 검색)
  → SEO 점수 자동 계산 (0-100점)
  → C-RANK (카테고리 순위) 분석 및 개선안 제시
  → 최적화 제안: 키워드, 지역 SEO, 리뷰 관리, 사진 등록

■ **AI 봇 시스템 (30개)**
  → GPT-3.5-turbo 기반 실제 분석
  → **할루시네이션 방지**: 실제 네이버 데이터만 사용
  → 데이터 없으면 "데이터 없음" 명시
  → 구체적인 실제 업체명, 주소 인용

## 📡 API 엔드포인트

### 매장 관리
- `POST /api/stores` - 매장 생성
- `GET /api/stores/:id` - 매장 조회

### 봇 실행
- `POST /api/bots/execute` - 봇 실행 (네이버 데이터 자동 수집)
- `GET /api/stores/:id/executions` - 실행 결과 조회

### 네이버 API
- `POST /api/naver/search` - 로컬 검색 (경쟁사 검색)
- `POST /api/naver/place` - 매장 상세 정보

### SEO 분석
- `POST /api/seo/analyze` - SEO/AEO/GEO 최적화 분석

## 🔧 기술 스택

### Backend
- **Cloudflare Workers** - 서버리스 API
- **Cloudflare D1** - SQLite 데이터베이스
- **Hono** - 라우팅 프레임워크
- **OpenAI GPT-3.5-turbo** - AI 분석
- **Naver Local API** - 실시간 매장 데이터

### Frontend
- **HTML/CSS/JavaScript**
- **Tailwind CSS**
- **PptxGenJS** - PPT 생성

## 📊 데이터 흐름

```
1. 사용자 매장 정보 입력
   ↓
2. 봇 실행 버튼 클릭
   ↓
3. 네이버 API 호출
   - 매장 정보 검색
   - 경쟁사 10개 검색
   ↓
4. 실제 데이터 수집
   - 주소, 전화번호, 좌표
   - 카테고리, 도로명주소
   ↓
5. GPT에게 실제 데이터 전달
   ↓
6. AI 분석 결과 생성
   ↓
7. D1 데이터베이스 저장
   ↓
8. 사용자에게 결과 표시
```

## 🚀 배포 정보

- **Production URL**: https://65a873e2.studiojuai-platform.pages.dev/
- **GitHub**: https://github.com/ikjoobang/studiojuai-marketing
- **Database**: Cloudflare D1
- **API Keys**: 
  - OpenAI (GPT-3.5-turbo)
  - Naver Client ID/Secret

## 📝 환경 변수

```.env
OPENAI_API_KEY=sk-...
NAVER_CLIENT_ID=...
NAVER_CLIENT_SECRET=...
```

## 📋 최근 업데이트

❶ **2025-11-15 할루시네이션 제거 및 SEO 최적화**
■ GPT 프롬프트 재작성 - 실제 데이터만 사용하도록 강제
■ SEO/AEO/GEO/C-RANK 최적화 프롬프트 개선
■ 네이버 API 키 갱신 및 정상 작동 확인
■ 봇 응답에서 실제 경쟁사 데이터 인용 확인 (예: 썸띵어바웃커피, 더달달 등)

❷ **2025-11-11 네이버 API 연동**
■ 네이버 로컬 검색 API 실제 연동
■ 반경 내 경쟁사 자동 검색 (5개)
■ SEO/AEO/GEO 최적화 분석 시스템
■ 실제 데이터 기반 GPT 분석

## ⚠️ 주의사항

❶ **API 제한**
■ 네이버 API: 일 25,000회
■ OpenAI API: 사용량 기반 과금

❷ **데이터 정확도**
■ 네이버 API 검색 결과에 의존
■ 실시간 데이터이므로 변동 가능

❸ **비용**
■ GPT-3.5-turbo: 약 $0.002/봇
■ 30개 봇 실행: 약 $0.06

## 📞 문의

- **Email**: ikjoobang@gmail.com
- **Twitter**: @STUDIO_JU_AI
- **Website**: https://www.studiojuai.com
