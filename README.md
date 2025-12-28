# STUDIOJUAI - AI 마케팅 자동화 플랫폼

## 프로젝트 개요
- **Name**: STUDIOJUAI
- **Goal**: 30개 전문 AI 봇을 활용한 자영업자 마케팅 자동화
- **Features**: 상권분석부터 마케팅 실행까지, 먼저 다가가는 영업사원처럼 AI가 대신합니다.

---

## 🌐 Production URLs

### ■ 프론트엔드
| 페이지 | URL | 설명 |
|--------|-----|------|
| **메인** | https://studiojuai.pages.dev | 매장 정보 입력 및 상권분석 |
| **대시보드** | https://studiojuai.pages.dev/dashboard | 봇 실행 및 결과 관리 |
| **분석** | https://studiojuai.pages.dev/analytics | 마케팅 성과 분석 |
| **설정** | https://studiojuai.pages.dev/settings | API 키 및 시스템 설정 |
| **어드민** | https://studiojuai.pages.dev/admin | 관리자 전용 페이지 |

### ■ 백엔드 API
| 엔드포인트 | URL | 메서드 |
|------------|-----|--------|
| **Health Check** | https://studiojuai.pages.dev/api/health | GET |
| **봇 목록** | https://studiojuai.pages.dev/api/bots?industry={업종} | GET |
| **봇 실행** | https://studiojuai.pages.dev/api/bot/execute | POST |
| **상권분석 봇** | https://studiojuai.pages.dev/api/bot/execute-trade-area | POST |
| **전체 봇 실행** | https://studiojuai.pages.dev/api/bot/execute-all | POST |
| **상권 분석** | https://studiojuai.pages.dev/api/trade-area/analyze | POST |
| **API 키 검증** | https://studiojuai.pages.dev/api/validate-key | POST |
| **휴대폰 인증** | https://studiojuai.pages.dev/api/auth/verify-phone | POST |
| **사용량 확인** | https://studiojuai.pages.dev/api/auth/check-usage | POST |
| **프리미엄 상태** | https://studiojuai.pages.dev/api/auth/premium-status | GET |
| **TXT 내보내기** | https://studiojuai.pages.dev/api/export/txt | POST |
| **Markdown 내보내기** | https://studiojuai.pages.dev/api/export/markdown | POST |
| **JSON 내보내기** | https://studiojuai.pages.dev/api/export/json | POST |

### ■ GitHub 저장소
| 저장소 | URL |
|--------|-----|
| **Backend/Frontend** | https://github.com/ikjoobang/studiojuai-marketing |

---

## ✅ 완료된 기능

### 보안 기능
| 기능 | 상태 | 설명 |
|------|------|------|
| 복사/캡처 방지 | ✅ | 결과물 복사 및 화면 캡처 차단 |
| API 키 암호화 | ✅ | localStorage 암호화 저장 |
| 개발자 도구 감지 | ✅ | F12/우클릭 차단 및 감지 |
| CORS 설정 | ✅ | /api/* 엔드포인트 CORS 허용 |
| 관리자 인증 | ✅ | 어드민 페이지 로그인 필수 |

### 요금제 분리 (무료/유료)
| 기능 | 무료 | 프리미엄 |
|------|------|----------|
| 상권분석 | 1회 | 무제한 |
| 상권분석 봇 (5개) | ✅ | ✅ |
| 마케팅 봇 (25개) | ❌ | ✅ |
| TXT/PDF 다운로드 | ❌ | ✅ |
| 우선 지원 | ❌ | ✅ |

### 상권분석 → 봇 연동
| 기능 | 상태 | 설명 |
|------|------|------|
| 상권 특성 분석 | ✅ | 역세권/학교/주거지/오피스 자동 분류 |
| 타겟 고객 추정 | ✅ | 상권 유형별 주요 고객층 도출 |
| 피크 시간 분석 | ✅ | 상권별 최적 마케팅 시간 제안 |
| 경쟁 강도 평가 | ✅ | 경쟁사 수 기반 경쟁 수준 분석 |
| 봇 프롬프트 주입 | ✅ | 상권 맥락이 모든 봇 결과에 반영 |

---

## ✅ 테스트 결과

### 페이지 접근 테스트
| 테스트 항목 | 상태 | HTTP 코드 |
|-------------|------|-----------|
| 메인 (/) | ✅ | 200 OK |
| 대시보드 (/dashboard) | ✅ | 200 OK |
| 분석 (/analytics) | ✅ | 200 OK |
| 설정 (/settings) | ✅ | 200 OK |
| 어드민 (/admin) | ✅ | 200 OK |

### API 테스트
| 테스트 항목 | 상태 | 설명 |
|-------------|------|------|
| Health Check | ✅ | 서비스 상태 정상 |
| 봇 목록 | ✅ | 30개 봇 반환 |
| 프리미엄 상태 | ✅ | 무료/유료 구분 정상 |
| 휴대폰 인증 | ✅ | 인증코드 발급 정상 |
| 사용량 확인 | ✅ | 제한 횟수 확인 정상 |
| TXT 내보내기 | ✅ | 리포트 다운로드 정상 |

---

## 🤖 30개 AI 봇 목록 (KSIC 대분류 기반)

### 🗺️ 상권분석 (5개) - 1단계
| ID | 봇 이름 | 설명 |
|----|---------|------|
| trade-area-overview | 상권 종합분석 봇 | 돈이 벌리는 구조 관점의 상권 분석 |
| competitor-analysis | 경쟁사 분석 봇 | 경쟁사 약점을 우리 기회로 |
| target-customer | 타겟고객 분석 봇 | 눈에 그려지는 페르소나 도출 |
| location-evaluation | 입지 평가 봇 | 약점 보완책까지 제시하는 입지 분석 |
| trend-analysis | 상권 트렌드 봇 | 돈의 흐름에 집중한 트렌드 분석 |

### 👋 고객응대 (5개)
| ID | 봇 이름 | 설명 |
|----|---------|------|
| greeting | 첫인사 봇 | 지역/타겟별 맞춤 환영 메시지 |
| menu-recommend | 메뉴추천 봇 | 스토리가 있는 메뉴 추천 |
| event-announce | 이벤트 안내 봇 | 마진 지키면서 효과적인 이벤트 |
| review-request | 리뷰 요청 봇 | 거절 못하게 만드는 리뷰 요청 |
| sns-content | SNS 홍보 봇 | 촬영 팁까지 포함된 SNS 콘텐츠 |

### 📝 콘텐츠 (5개)
| ID | 봇 이름 | 설명 |
|----|---------|------|
| blog-content | 블로그 콘텐츠 봇 | 검색 상위 노출되는 정보성 후기 |
| keyword-strategy | 키워드 전략 봇 | 돈 안 들이고 잡는 틈새 키워드 |
| local-marketing | 지역 마케팅 봇 | 당근마켓/지역 커뮤니티 공략법 |
| seasonal-marketing | 시즌 마케팅 봇 | 2주 앞서 준비하는 시즌 전략 |
| visual-planning | 비주얼 기획 봇 | 초보도 따라하는 사진/영상 촬영법 |

### 💎 고객관계 (5개)
| ID | 봇 이름 | 설명 |
|----|---------|------|
| loyalty-program | 단골 관리 봇 | 비용 최소로 재방문 유도하기 |
| upselling | 업셀링 봇 | 자연스럽게 2-3천원 더 받기 |
| referral-program | 소개 유도 봇 | 친구 데려오면 양쪽 모두 혜택 |
| feedback-collection | 피드백 수집 봇 | 10초 만에 솔직한 의견 받기 |
| crisis-response | 불만 대응 봇 | 공감+사과+보상 3단계 대응법 |

### 📸 소셜미디어 (5개)
| ID | 봇 이름 | 설명 |
|----|---------|------|
| story-content | 스토리 콘텐츠 봇 | 바쁜 일상 속 찍기 쉬운 스토리 |
| hashtag-strategy | 해시태그 전략 봇 | 동네 해시태그 우선 공략 |
| influencer-collab | 인플루언서 협업 봇 | 동네 블로거/인스타그래머 섭외 |
| community-manage | 커뮤니티 관리 봇 | 맘카페/당근 이웃 말투로 소통 |
| reels-content | 릴스/숏폼 봇 | 15초 안에 매력 터지는 영상 |

### 📧 디지털마케팅 (3개)
| ID | 봇 이름 | 설명 |
|----|---------|------|
| email-marketing | 카카오톡/문자 소식지 봇 | 광고 같지 않은 친근한 메시지 |
| sms-marketing | SMS 마케팅 봇 | 80자 안에 매력 터뜨리기 |
| retargeting | 리타겟팅 봇 | 안 오는 단골 다시 부르기 |

### 💰 전략분석 (2개)
| ID | 봇 이름 | 설명 |
|----|---------|------|
| pricing-strategy | 가격 전략 봇 | 심리적 가격 포인트 잡기 |
| performance-analysis | 성과 분석 봇 | 매출/고객수/객단가 한눈에 파악 |

---

## 🏭 지원 업종 (KSIC 대분류 기반)

### 음식/요식업 (17개)
카페, 치킨집, 한식당, 중식당, 일식당, 양식당, 패스트푸드, 피자집, 베이커리, 디저트카페, 주점/술집, 고깃집, 해산물/횟집, 면요리전문점, 도시락/분식점, 뷔페/식당, 음식점

### 미용/뷰티 (7개)
미용실, 이발소, 네일샵, 피부관리샵, 스파/마사지, 메이크업샵, 왁싱샵

### 소매/판매 (17개)
소매점, 편의점, 슈퍼마켓, 의류매장, 신발매장, 악세서리샵, 화장품매장, 휴대폰판매점, 전자제품매장, 가구매장, 인테리어소품샵, 꽃집, 반려동물용품점, 서점, 문구점, 약국, 안경점

### 서비스업 (15개)
세탁소, 수선/수리점, 인쇄/복사점, 사진스튜디오, 여행사, 부동산중개, 보험대리점, 학원/교습소, 헬스장/피트니스, 요가/필라테스, 태권도/무술학원, PC방, 노래방, 당구장, 골프연습장

### 의료/건강 (4개)
병원/의원, 치과, 한의원, 동물병원

### 자동차 (4개)
세차장, 자동차정비소, 자동차용품점, 주유소

### 숙박/임대 (3개)
모텔/호텔, 게스트하우스/펜션, 렌탈샵

---

## 🛠️ 기술 스택

- **Frontend**: Hono JSX + TailwindCSS CDN + FontAwesome
- **Backend**: Hono (Cloudflare Workers)
- **AI**: Google Gemini 2.0 Flash API
- **Search**: Naver Local Search API
- **Build**: Vite + @hono/vite-cloudflare-pages
- **Deploy**: Cloudflare Pages
- **Version Control**: GitHub

---

## 📖 사용 가이드

### 1. API 키 설정
- 설정 페이지 또는 상단 'API 설정' 버튼 클릭
- [Google AI Studio](https://aistudio.google.com/app/apikey)에서 Gemini API 키 발급
- [Naver Developers](https://developers.naver.com)에서 검색 API 키 발급
- 키 입력 후 '검증' → '저장'

### 2. 매장 정보 입력
- 메인 페이지에서 업종 선택 (67개 업종 지원)
- 매장명, 위치, 대표 메뉴, 타겟 고객 등 입력

### 3. 상권분석 실행 (1단계)
- 분석 반경 선택 (2km / 3km / 5km)
- '상권분석 시작하기' 버튼 클릭
- 5개 상권분석 봇 자동 실행

### 4. 마케팅 봇 실행 (2단계)
- 상권분석 결과를 기반으로 25개 마케팅 봇 실행
- 대시보드에서 개별/전체 실행

### 5. 결과 확인 및 내보내기
- 대시보드에서 결과 확인
- '내보내기' 버튼으로 TXT/Markdown/JSON 다운로드

---

## 🔐 어드민 페이지

**URL**: https://studiojuai.pages.dev/admin

**기능**:
- 사용자 관리
- 보안 설정 (복사/캡처 방지, API 키 암호화, 개발자 도구 감지)
- API 설정 (서버 키 관리)
- 요금제 설정
- 접근 로그 확인

**로그인 정보** (개발용):
- ID: studiojuai
- PW: admin2024!

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

### 2024-12-28
- 어드민 페이지 추가 (/admin)
- 보안 기능 강화 (복사/캡처 방지, 개발자 도구 감지)
- 무료/유료 분리 로직 구현 (휴대폰 인증, 상권분석 1회 제한)
- 내보내기 API 추가 (TXT, Markdown, JSON)
- 상권분석 → 봇 연동 강화 (고객 특성 반영)
- 헬스체크 API 추가

### 2024-12-27
- 전체 30개 봇 프롬프트 고도화 완료
- 실행 중심 가이드로 전면 개편
- KSIC 대분류 기반 67개 업종 지원

### 2024-12-23
- Cloudflare Pages 프로덕션 배포 완료
- GitHub 저장소 연동 완료
- 전체 테스트 통과

---

## 📄 라이선스
MIT License

## 👨‍💻 개발자
STUDIOJUAI Team
