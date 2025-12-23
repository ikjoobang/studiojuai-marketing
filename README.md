# STUDIOJUAI - AI 마케팅 자동화 플랫폼

## 프로젝트 개요
- **Name**: STUDIOJUAI
- **Goal**: 30개 전문 AI 봇을 활용한 자영업자 마케팅 자동화
- **Features**: 먼저 다가가는 영업사원처럼, 고객 응대부터 SNS 마케팅까지 AI가 대신합니다.

## 공개 URL
- **개발 서버**: https://3000-i7jwbakbmjgj46loxkf55-5185f4aa.sandbox.novita.ai
- **Production**: (Cloudflare Pages 배포 후 URL 추가 예정)

## 주요 기능
✅ **완료된 기능**
- 30개 전문 AI 봇 (6개 카테고리)
  - 고객응대 (5): 첫인사, 메뉴추천, 이벤트안내, 리뷰요청, SNS홍보
  - 콘텐츠 (5): 블로그, 키워드분석, 경쟁사분석, 지역마케팅, 시즌마케팅
  - 고객관계 (5): 단골관리, 업셀링, 소개유도, 피드백수집, 불만대응
  - 소셜미디어 (5): 스토리콘텐츠, 비주얼기획, 해시태그전략, 인플루언서협업, 커뮤니티관리
  - 디지털마케팅 (5): 이메일, SMS, 푸시알림, 리타겟팅, 제휴마케팅
  - 전략분석 (5): 가격전략, 번들기획, 플래시세일, 멤버십기획, 성과분석
- Gemini 2.0 Flash API 연동
- 매장 정보 입력 및 저장 (localStorage)
- 개별 봇 실행 및 전체 봇 순차 실행
- 결과 내보내기 (Markdown)
- 다크모드 지원
- 반응형 디자인 (PC/모바일)

## 페이지 구조

| 경로 | 설명 |
|------|------|
| `/` | 메인 페이지 - 업종 선택, 매장 정보 입력, 봇 미리보기 |
| `/dashboard` | 대시보드 - 30개 봇 관리 및 실행 |
| `/analytics` | 분석 페이지 - 실행 현황 및 통계 |
| `/settings` | 설정 페이지 - API 키, 매장 정보, 데이터 관리 |

## API 엔드포인트

| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | `/api/bots?industry=cafe` | 봇 목록 조회 |
| POST | `/api/bot/execute` | 개별 봇 실행 |
| POST | `/api/bot/execute-all` | 전체 봇 실행 |
| POST | `/api/validate-key` | API 키 검증 |

## 기술 스택
- **Frontend**: Hono JSX + TailwindCSS CDN + FontAwesome
- **Backend**: Hono (Cloudflare Workers)
- **AI**: Google Gemini 2.0 Flash API
- **Build**: Vite + @hono/vite-cloudflare-pages
- **Deploy**: Cloudflare Pages

## 데이터 구조

### 매장 정보 (localStorage: `store_info`)
```typescript
interface StoreInfo {
  name: string;        // 매장명
  location: string;    // 위치
  industry: string;    // 업종 (cafe, chicken, korean, salon, restaurant, retail)
  mainProduct: string; // 대표 메뉴/서비스
  priceRange: string;  // 평균 가격대
  targetCustomer: string; // 타겟 고객
  specialNote: string; // 특이사항/강점
}
```

### API 키 (localStorage: `gemini_api_key`)
- 브라우저에 로컬 저장
- 서버로 전송 시 `X-Gemini-Key` 헤더 사용

## 로컬 개발

```bash
# 의존성 설치
npm install

# 빌드
npm run build

# 개발 서버 시작 (PM2)
pm2 start ecosystem.config.cjs

# 또는 직접 실행
npm run dev:sandbox
```

## 배포

```bash
# Cloudflare Pages 배포
npm run deploy:prod
```

## 사용 가이드

1. **API 키 설정**: 설정 페이지 또는 상단 'API 설정' 버튼 클릭
   - [Google AI Studio](https://aistudio.google.com/app/apikey)에서 발급
   
2. **매장 정보 입력**: 메인 페이지에서 업종 선택 후 매장 정보 입력

3. **봇 실행**:
   - 개별 실행: 봇 카드 클릭 또는 대시보드에서 '실행' 버튼
   - 전체 실행: '전체 봇 실행' 버튼 (순차 실행, 약 15-30분 소요)

4. **결과 확인**: 대시보드에서 결과 확인 및 내보내기

## 업데이트 내역

### 2024-12-11
- settings.tsx 페이지 생성
- style.css 반응형 스타일 완성
- PM2 ecosystem.config.cjs 설정
- 로컬 개발 서버 테스트 완료

## 라이선스
MIT License

## 개발자
STUDIOJUAI Team
