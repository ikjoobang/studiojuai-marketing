# STUDIOJUAI - AI 마케팅 자동화 플랫폼

## 프로젝트 개요
- **Name**: STUDIOJUAI
- **Goal**: 30개 전문 AI 봇을 활용한 자영업자 마케팅 자동화
- **Features**: 먼저 다가가는 영업사원처럼, 고객 응대부터 SNS 마케팅까지 AI가 대신합니다.

---

## 🌐 Production URLs

### ■ 프론트엔드
| 페이지 | URL |
|--------|-----|
| **메인** | https://studiojuai.pages.dev |
| **대시보드** | https://studiojuai.pages.dev/dashboard |
| **분석** | https://studiojuai.pages.dev/analytics |
| **설정 (어드민)** | https://studiojuai.pages.dev/settings |

### ■ 백엔드 API
| 엔드포인트 | URL |
|------------|-----|
| **API 서버** | https://studiojuai.pages.dev/api |
| **봇 목록** | https://studiojuai.pages.dev/api/bots |
| **봇 실행** | https://studiojuai.pages.dev/api/bot/execute |
| **전체 봇 실행** | https://studiojuai.pages.dev/api/bot/execute-all |
| **API 키 검증** | https://studiojuai.pages.dev/api/validate-key |
| **Health Check** | https://studiojuai.pages.dev/api/bots?industry=cafe |

### ■ GitHub 저장소
| 저장소 | URL |
|--------|-----|
| **Backend/Frontend** | https://github.com/ikjoobang/studiojuai-marketing |

---

## ✅ 테스트 결과

| 테스트 항목 | 상태 | 설명 |
|-------------|------|------|
| 프론트엔드 메인 | ✅ 200 OK | 페이지 정상 로드 |
| 프론트엔드 대시보드 | ✅ 200 OK | 페이지 정상 로드 |
| 프론트엔드 분석 | ✅ 200 OK | 페이지 정상 로드 |
| 프론트엔드 설정 | ✅ 200 OK | 페이지 정상 로드 |
| API 봇 목록 | ✅ 200 OK | 30개 봇 반환 |
| API 키 검증 | ✅ 작동 | 에러 핸들링 정상 |
| CORS 미들웨어 | ✅ 작동 | access-control-allow-origin: * |
| Static CSS | ✅ 200 OK | 파일 정상 서빙 |
| TXT 내보내기 | ✅ 작동 | Markdown 다운로드 |
| JSON 내보내기 | ✅ 작동 | 설정 백업 |

---

## 🤖 30개 AI 봇 목록

### 고객응대 (5)
- 👋 첫인사 봇 - 신규 고객 환영 메시지
- 🍽️ 메뉴추천 봇 - 맞춤 메뉴 추천
- 🎉 이벤트 안내 봇 - 프로모션 홍보
- ⭐ 리뷰 요청 봇 - 리뷰 작성 유도
- 📱 SNS 홍보 봇 - SNS 홍보 문구

### 콘텐츠 (5)
- 📝 블로그 콘텐츠 봇 - 블로그 글 작성
- 🔍 키워드 분석 봇 - 검색 키워드 발굴
- 🎯 경쟁사 분석 봇 - 경쟁 분석
- 📍 지역 마케팅 봇 - 지역 타겟 전략
- 🗓️ 시즌 마케팅 봇 - 시즌별 프로모션

### 고객관계 (5)
- 💎 단골 관리 봇 - VIP 고객 관리
- 📈 업셀링 봇 - 추가 구매 유도
- 🤝 소개 유도 봇 - 지인 소개 프로그램
- 💬 피드백 수집 봇 - 고객 의견 수집
- 🆘 불만 대응 봇 - 불만 고객 응대

### 소셜미디어 (5)
- 📸 스토리 콘텐츠 봇 - 인스타 스토리 기획
- 🎬 비주얼 기획 봇 - 사진/영상 가이드
- #️⃣ 해시태그 전략 봇 - 해시태그 조합
- 🌟 인플루언서 협업 봇 - 인플루언서 전략
- 👥 커뮤니티 관리 봇 - 커뮤니티 활동

### 디지털마케팅 (5)
- 📧 이메일 마케팅 봇 - 이메일 캠페인
- 💌 SMS 마케팅 봇 - 문자 메시지
- 🔔 푸시 알림 봇 - 푸시 알림 작성
- 🔄 리타겟팅 봇 - 이탈 고객 재유입
- 🤜 제휴 마케팅 봇 - 업체 간 제휴

### 전략분석 (5)
- 💰 가격 전략 봇 - 가격 책정 전략
- 📦 번들 기획 봇 - 세트 상품 기획
- ⚡ 플래시 세일 봇 - 긴급 할인 이벤트
- 🏆 멤버십 기획 봇 - 고객 등급제 설계
- 📊 성과 분석 봇 - 마케팅 성과 분석

---

## 🛠️ 기술 스택

- **Frontend**: Hono JSX + TailwindCSS CDN + FontAwesome
- **Backend**: Hono (Cloudflare Workers)
- **AI**: Google Gemini 2.0 Flash API
- **Build**: Vite + @hono/vite-cloudflare-pages
- **Deploy**: Cloudflare Pages
- **Version Control**: GitHub

---

## 📖 사용 가이드

### 1. API 키 설정
- 설정 페이지 또는 상단 'API 설정' 버튼 클릭
- [Google AI Studio](https://aistudio.google.com/app/apikey)에서 Gemini API 키 발급
- 키 입력 후 '검증' → '저장'

### 2. 매장 정보 입력
- 메인 페이지에서 업종 선택 (카페, 치킨집, 한식당 등)
- 매장명, 위치, 대표 메뉴, 타겟 고객 등 입력

### 3. 봇 실행
- **개별 실행**: 봇 카드 클릭 또는 대시보드에서 '실행' 버튼
- **전체 실행**: '전체 봇 실행' 버튼 (순차 실행)

### 4. 결과 확인 및 내보내기
- 대시보드에서 결과 확인
- '내보내기' 버튼으로 Markdown/JSON 다운로드

---

## 🔧 개발 환경

```bash
# 의존성 설치
npm install

# 빌드
npm run build

# 로컬 개발 서버 (PM2)
pm2 start ecosystem.config.cjs

# Cloudflare Pages 배포
CLOUDFLARE_API_TOKEN="your-token" npm run deploy:prod
```

---

## 📝 업데이트 내역

### 2024-12-23
- Cloudflare Pages 프로덕션 배포 완료
- GitHub 저장소 연동 완료
- 전체 테스트 통과

### 2024-12-11
- settings.tsx 페이지 생성
- style.css 반응형 스타일 완성
- PM2 ecosystem.config.cjs 설정

---

## 📄 라이선스
MIT License

## 👨‍💻 개발자
STUDIOJUAI Team
