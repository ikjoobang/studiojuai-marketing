/**
 * ========================================
 * 업종별 샘플 데이터 생성기
 * Studiojuai 마케팅 최적화 플랫폼
 * ========================================
 */

const SAMPLE_STORES = {
    cafe: {
        id: 'sample_cafe_001',
        name: '달콤한 하루 카페',
        industry: 'cafe',
        location: '강남구 역삼동',
        targetAge: '20-30대 직장인',
        avgPrice: '5,000-8,000원',
        competitors: 15,
        naverUrl: 'https://map.naver.com/sample',
        createdAt: new Date().toISOString()
    },
    
    chicken: {
        id: 'sample_chicken_001',
        name: '황금통닭',
        industry: 'chicken',
        location: '송파구 잠실동',
        targetAge: '10-40대 가족단위',
        avgPrice: '18,000-25,000원',
        competitors: 12,
        naverUrl: 'https://map.naver.com/sample',
        createdAt: new Date().toISOString()
    },
    
    korean: {
        id: 'sample_korean_001',
        name: '정성가득 한정식',
        industry: 'korean',
        location: '종로구 인사동',
        targetAge: '30-50대 직장인/단체',
        avgPrice: '12,000-20,000원',
        competitors: 20,
        naverUrl: 'https://map.naver.com/sample',
        createdAt: new Date().toISOString()
    },
    
    beauty: {
        id: 'sample_beauty_001',
        name: '스타일리쉬 헤어살롱',
        industry: 'beauty',
        location: '마포구 홍대입구',
        targetAge: '20-40대 여성',
        avgPrice: '커트 30,000원, 펌 80,000원',
        competitors: 25,
        naverUrl: 'https://map.naver.com/sample',
        createdAt: new Date().toISOString()
    },
    
    pizza: {
        id: 'sample_pizza_001',
        name: '맘마미아 피자',
        industry: 'pizza',
        location: '서초구 서초동',
        targetAge: '10-30대 가족/친구',
        avgPrice: '15,000-25,000원',
        competitors: 10,
        naverUrl: 'https://map.naver.com/sample',
        createdAt: new Date().toISOString()
    },
    
    dessert: {
        id: 'sample_dessert_001',
        name: '달콤공방 디저트카페',
        industry: 'dessert',
        location: '강남구 청담동',
        targetAge: '20-30대 여성',
        avgPrice: '7,000-12,000원',
        competitors: 18,
        naverUrl: 'https://map.naver.com/sample',
        createdAt: new Date().toISOString()
    }
};

// 업종별 실제 네이버 검색 결과 샘플 (환각 방지)
const NAVER_SEARCH_SAMPLES = {
    cafe: {
        title: '달콤한 하루 카페',
        category: '음식점>카페,디저트>카페',
        address: '서울특별시 강남구 역삼동 123-45',
        roadAddress: '서울특별시 강남구 테헤란로 456',
        telephone: '02-1234-5678',
        competitors: [
            { name: '커피빈 역삼점', category: '카페', address: '강남구 역삼동 234-56' },
            { name: '스타벅스 강남점', category: '카페', address: '강남구 역삼동 345-67' },
            { name: '투썸플레이스 역삼점', category: '카페', address: '강남구 역삼동 456-78' },
            { name: '이디야커피 역삼점', category: '카페', address: '강남구 역삼동 567-89' },
            { name: '할리스커피 역삼점', category: '카페', address: '강남구 역삼동 678-90' }
        ]
    },
    
    chicken: {
        title: '황금통닭',
        category: '음식점>치킨,닭강정',
        address: '서울특별시 송파구 잠실동 789-12',
        roadAddress: '서울특별시 송파구 올림픽로 890',
        telephone: '02-2345-6789',
        competitors: [
            { name: 'BBQ치킨 잠실점', category: '치킨', address: '송파구 잠실동 890-23' },
            { name: '교촌치킨 잠실점', category: '치킨', address: '송파구 잠실동 901-34' },
            { name: '네네치킨 잠실점', category: '치킨', address: '송파구 잠실동 012-45' },
            { name: 'BHC치킨 잠실점', category: '치킨', address: '송파구 잠실동 123-56' },
            { name: '굽네치킨 잠실점', category: '치킨', address: '송파구 잠실동 234-67' }
        ]
    },
    
    korean: {
        title: '정성가득 한정식',
        category: '음식점>한식>한정식',
        address: '서울특별시 종로구 인사동 345-67',
        roadAddress: '서울특별시 종로구 인사동길 123',
        telephone: '02-3456-7890',
        competitors: [
            { name: '한옥마을 한정식', category: '한정식', address: '종로구 인사동 456-78' },
            { name: '서울한정식', category: '한정식', address: '종로구 인사동 567-89' },
            { name: '궁중한정식', category: '한정식', address: '종로구 인사동 678-90' },
            { name: '전통한정식', category: '한정식', address: '종로구 인사동 789-01' },
            { name: '고궁한정식', category: '한정식', address: '종로구 인사동 890-12' }
        ]
    },
    
    beauty: {
        title: '스타일리쉬 헤어살롱',
        category: '생활,편의>미용,네일>미용실',
        address: '서울특별시 마포구 홍대입구역 901-23',
        roadAddress: '서울특별시 마포구 양화로 234',
        telephone: '02-4567-8901',
        competitors: [
            { name: '준오헤어 홍대점', category: '미용실', address: '마포구 홍대입구역 012-34' },
            { name: '이철헤어커커 홍대점', category: '미용실', address: '마포구 홍대입구역 123-45' },
            { name: '박승철헤어스투디오 홍대점', category: '미용실', address: '마포구 홍대입구역 234-56' },
            { name: '엠포미용실 홍대점', category: '미용실', address: '마포구 홍대입구역 345-67' },
            { name: '르씨엘 홍대점', category: '미용실', address: '마포구 홍대입구역 456-78' }
        ]
    },
    
    pizza: {
        title: '맘마미아 피자',
        category: '음식점>양식>피자',
        address: '서울특별시 서초구 서초동 567-89',
        roadAddress: '서울특별시 서초구 강남대로 345',
        telephone: '02-5678-9012',
        competitors: [
            { name: '도미노피자 서초점', category: '피자', address: '서초구 서초동 678-90' },
            { name: '피자헛 서초점', category: '피자', address: '서초구 서초동 789-01' },
            { name: '파파존스 서초점', category: '피자', address: '서초구 서초동 890-12' },
            { name: '미스터피자 서초점', category: '피자', address: '서초구 서초동 901-23' },
            { name: '청년피자 서초점', category: '피자', address: '서초구 서초동 012-34' }
        ]
    },
    
    dessert: {
        title: '달콤공방 디저트카페',
        category: '음식점>카페,디저트>디저트카페',
        address: '서울특별시 강남구 청담동 123-45',
        roadAddress: '서울특별시 강남구 도산대로 567',
        telephone: '02-6789-0123',
        competitors: [
            { name: '설빙 청담점', category: '디저트카페', address: '강남구 청담동 234-56' },
            { name: '파리바게뜨 청담점', category: '베이커리', address: '강남구 청담동 345-67' },
            { name: '뚜레쥬르 청담점', category: '베이커리', address: '강남구 청담동 456-78' },
            { name: '던킨도너츠 청담점', category: '디저트카페', address: '강남구 청담동 567-89' },
            { name: '배스킨라빈스 청담점', category: '아이스크림', address: '강남구 청담동 678-90' }
        ]
    }
};

// 봇 실행 결과 샘플 (업종별 맞춤)
const BOT_RESULTS_TEMPLATES = {
    cafe: {
        bot1: `❶ 매장 정보 분석 결과

■ 매장명: {storeName}
■ 위치: {location}
■ 업종: 카페
■ 타겟층: {targetAge}
■ 객단가: {avgPrice}

[네이버 플레이스 실제 데이터]
- 카테고리: {category}
- 주소: {address}
- 전화번호: {telephone}

[핵심 분석]
✔️ 직장인 밀집 지역에 위치하여 평일 오전/점심 매출 강세 예상
✔️ 객단가는 지역 평균 수준으로 경쟁력 있음
✔️ 테이크아웃 고객 비중 높을 것으로 예상`,

        bot2: `❷ 경쟁사 벤치마킹 분석

[반경 500m 내 주요 경쟁사 5개 (실제 네이버 검색 결과)]

1. {competitor1_name}
   - 위치: {competitor1_address}
   - 특징: 프랜차이즈 브랜드, 높은 인지도
   
2. {competitor2_name}
   - 위치: {competitor2_address}
   - 특징: 글로벌 체인, 안정적 품질

3. {competitor3_name}
   - 위치: {competitor3_address}
   - 특징: 국내 대형 프랜차이즈

4. {competitor4_name}
   - 위치: {competitor4_address}
   - 특징: 합리적 가격대

5. {competitor5_name}
   - 위치: {competitor5_address}
   - 특징: 프리미엄 커피 전문점

[차별화 전략]
✔️ 독립 카페로서 개성 있는 인테리어와 시그니처 메뉴 개발
✔️ 프랜차이즈 대비 유연한 프로모션 운영
✔️ 지역 주민 대상 멤버십 프로그램 운영`,

        bot5: `❺ SEO/AEO/GEO/C-RANK 최적화 전략

[네이버 플레이스 검색 최적화]

■ 키워드 전략
- 주요 키워드: "역삼동 카페", "강남 카페", "역삼역 디저트"
- 롱테일 키워드: "역삼동 조용한 카페", "강남 작업하기 좋은 카페"

■ C-RANK (지도 검색 순위) 개선 방안
✔️ 매장 사진 20장 이상 등록 (메뉴, 인테리어, 외관)
✔️ 정확한 영업시간 및 휴무일 정보 입력
✔️ 메뉴 정보 상세 등록 (가격, 사진, 설명)
✔️ 리뷰 적극 관리 (답변율 95% 이상 유지)
✔️ 블로그 체험단 운영 (월 4회 이상)

■ GEO (지역 검색) 최적화
- 주소 정보 정확성 100% 유지
- 지역명 포함 키워드 전략
- 주변 랜드마크 정보 활용`
    },
    
    chicken: {
        bot1: `❶ 매장 정보 분석 결과

■ 매장명: {storeName}
■ 위치: {location}
■ 업종: 치킨
■ 타겟층: {targetAge}
■ 객단가: {avgPrice}

[네이버 플레이스 실제 데이터]
- 카테고리: {category}
- 주소: {address}
- 전화번호: {telephone}

[핵심 분석]
✔️ 주거 밀집 지역으로 배달 수요 높음
✔️ 가족 단위 고객 비중 높아 세트 메뉴 전략 유효
✔️ 저녁 시간대 집중 매출 예상`,

        bot2: `❷ 경쟁사 벤치마킹 분석

[반경 1km 내 주요 경쟁사 5개 (실제 네이버 검색 결과)]

1. {competitor1_name}
   - 위치: {competitor1_address}
   - 특징: 대형 프랜차이즈, 높은 브랜드 인지도
   
2. {competitor2_name}
   - 위치: {competitor2_address}
   - 특징: 국내 1위 치킨 브랜드

3. {competitor3_name}
   - 위치: {competitor3_address}
   - 특징: 빠른 배달 시스템

4. {competitor4_name}
   - 위치: {competitor4_address}
   - 특징: 프리미엄 치킨 전문

5. {competitor5_name}
   - 위치: {competitor5_address}
   - 특징: 건강한 치킨 컨셉

[차별화 전략]
✔️ 신선한 국내산 닭고기 사용 강조
✔️ 특제 소스 개발로 맛의 차별화
✔️ 빠른 배달 시간 (30분 이내) 보장
✔️ 리뷰 이벤트를 통한 입소문 마케팅`,

        bot5: `❺ SEO/AEO/GEO/C-RANK 최적화 전략

[네이버 플레이스 & 배달앱 최적화]

■ 키워드 전략
- 주요 키워드: "잠실동 치킨", "송파구 치킨배달", "잠실역 치킨"
- 롱테일 키워드: "잠실 맛있는 치킨", "송파 신선한 치킨"

■ C-RANK (지도 검색 순위) 개선 방안
✔️ 치킨 완성 사진 30장 이상 등록
✔️ 정확한 배달 가능 지역 설정
✔️ 메뉴별 상세 정보 (칼로리, 맛, 양)
✔️ 빠른 리뷰 응답 (1시간 이내)
✔️ 배달앱 동시 운영 (배민, 요기요, 쿠팡이츠)

■ 배달앱 최적화
- 할인 쿠폰 정기 발행
- 리뷰 이벤트 상시 운영
- 주문 후 조리 시작으로 신선도 강조`
    },
    
    korean: {
        bot1: `❶ 매장 정보 분석 결과

■ 매장명: {storeName}
■ 위치: {location}
■ 업종: 한식 (한정식)
■ 타겟층: {targetAge}
■ 객단가: {avgPrice}

[네이버 플레이스 실제 데이터]
- 카테고리: {category}
- 주소: {address}
- 전화번호: {telephone}

[핵심 분석]
✔️ 관광지 인접으로 외국인 고객 유치 가능
✔️ 단체 예약 수요 높음 (기업 회식, 모임)
✔️ 점심 특선 메뉴로 직장인 고객 확보 전략 유효`,

        bot2: `❷ 경쟁사 벤치마킹 분석

[인사동 일대 주요 경쟁사 5개 (실제 네이버 검색 결과)]

1. {competitor1_name}
   - 위치: {competitor1_address}
   - 특징: 한옥 인테리어, 전통 한정식
   
2. {competitor2_name}
   - 위치: {competitor2_address}
   - 특징: 관광객 특화 메뉴

3. {competitor3_name}
   - 위치: {competitor3_address}
   - 특징: 고급 한정식 전문

4. {competitor4_name}
   - 위치: {competitor4_address}
   - 특징: 전통 궁중 한정식

5. {competitor5_name}
   - 위치: {competitor5_address}
   - 특징: 합리적 가격대 한정식

[차별화 전략]
✔️ 계절 별미 코스 운영 (봄나물, 여름 보양식 등)
✔️ 영어/중국어 메뉴판 제공
✔️ 한복 입고 방문 시 할인 이벤트
✔️ 전통 문화 체험 프로그램 연계`,

        bot5: `❺ SEO/AEO/GEO/C-RANK 최적화 전략

[관광 특화 검색 최적화]

■ 키워드 전략
- 주요 키워드: "인사동 한정식", "종로 맛집", "인사동 전통음식"
- 외국어 키워드: "Insadong Korean Restaurant", "Seoul Traditional Food"

■ C-RANK (지도 검색 순위) 개선 방안
✔️ 음식 사진 전문 촬영 (30장 이상)
✔️ 영어/중국어/일본어 상세 설명
✔️ 외국인 리뷰 적극 관리
✔️ 구글 맵 등록 및 최적화
✔️ 여행 블로거 협업 (월 2회)

■ 다국어 SEO
- Google My Business 등록
- TripAdvisor 적극 활용
- 외국어 블로그 콘텐츠 제작`
    },
    
    beauty: {
        bot1: `❶ 매장 정보 분석 결과

■ 매장명: {storeName}
■ 위치: {location}
■ 업종: 미용실
■ 타겟층: {targetAge}
■ 객단가: {avgPrice}

[네이버 플레이스 실제 데이터]
- 카테고리: {category}
- 주소: {address}
- 전화번호: {telephone}

[핵심 분석]
✔️ 홍대 상권으로 유동인구 많고 트렌디한 고객층
✔️ 20-30대 여성 타겟으로 SNS 마케팅 효과 높음
✔️ 디자이너 개인 브랜딩이 중요한 업종`,

        bot2: `❷ 경쟁사 벤치마킹 분석

[홍대 일대 주요 경쟁사 5개 (실제 네이버 검색 결과)]

1. {competitor1_name}
   - 위치: {competitor1_address}
   - 특징: 대형 프랜차이즈, 안정적 기술력
   
2. {competitor2_name}
   - 위치: {competitor2_address}
   - 특징: 프리미엄 헤어 전문

3. {competitor3_name}
   - 위치: {competitor3_address}
   - 특징: 유명 디자이너 다수

4. {competitor4_name}
   - 위치: {competitor4_address}
   - 특징: 합리적 가격대

5. {competitor5_name}
   - 위치: {competitor5_address}
   - 특징: 감각적 인테리어

[차별화 전략]
✔️ 디자이너 개인 SNS 활성화 (인스타그램 필수)
✔️ 시술 전후 사진 포트폴리오 강화
✔️ 헤어 케어 제품 판매 (추가 수익원)
✔️ 단골 고객 전용 멤버십 프로그램`,

        bot5: `❺ SEO/AEO/GEO/C-RANK 최적화 전략

[미용실 특화 검색 최적화]

■ 키워드 전략
- 주요 키워드: "홍대 미용실", "홍대입구역 헤어샵", "마포 미용실"
- 롱테일 키워드: "홍대 여자 커트 잘하는 곳", "홍대 펌 추천"

■ C-RANK (지도 검색 순위) 개선 방안
✔️ 시술 전후 비교 사진 50장 이상
✔️ 디자이너별 스타일 소개
✔️ 정확한 가격표 공개
✔️ 예약 가능 시간 실시간 업데이트
✔️ 고객 리뷰 적극 유도 (사진 리뷰 포인트 제공)

■ SNS 마케팅
- 인스타그램 릴스 활용 (헤어 스타일링 팁)
- 네이버 블로그 체험단 운영
- 유튜브 헤어 튜토리얼 제작`
    },
    
    pizza: {
        bot1: `❶ 매장 정보 분석 결과

■ 매장명: {storeName}
■ 위치: {location}
■ 업종: 피자
■ 타겟층: {targetAge}
■ 객단가: {avgPrice}

[네이버 플레이스 실제 데이터]
- 카테고리: {category}
- 주소: {address}
- 전화번호: {telephone}

[핵심 분석]
✔️ 강남 오피스 밀집 지역으로 점심/저녁 배달 수요 높음
✔️ 프리미엄 수제 피자 컨셉 차별화 가능
✔️ 파티/단체 주문 수요 공략 전략 유효`,

        bot2: `❷ 경쟁사 벤치마킹 분석

[서초동 일대 주요 경쟁사 5개 (실제 네이버 검색 결과)]

1. {competitor1_name}
   - 위치: {competitor1_address}
   - 특징: 글로벌 프랜차이즈, 빠른 배달
   
2. {competitor2_name}
   - 위치: {competitor2_address}
   - 특징: 국내 대형 체인

3. {competitor3_name}
   - 위치: {competitor3_address}
   - 특징: 프리미엄 피자 전문

4. {competitor4_name}
   - 위치: {competitor4_address}
   - 특징: 합리적 가격대

5. {competitor5_name}
   - 위치: {competitor5_address}
   - 특징: 신개념 수제 피자

[차별화 전략]
✔️ 수제 도우 매일 직접 제작 강조
✔️ 프리미엄 토핑 (이탈리아산 치즈, 유기농 채소)
✔️ 30분 내 배달 보장 또는 할인
✔️ 파티 패키지 상품 개발`,

        bot5: `❺ SEO/AEO/GEO/C-RANK 최적화 전략

[배달 중심 검색 최적화]

■ 키워드 전략
- 주요 키워드: "서초동 피자", "강남 피자배달", "서초역 피자"
- 롱테일 키워드: "서초동 맛있는 피자", "강남 수제 피자"

■ C-RANK (지도 검색 순위) 개선 방안
✔️ 피자 완성 사진 40장 이상 (각 메뉴별)
✔️ 도우 만드는 과정 영상 등록
✔️ 정확한 배달 가능 지역 및 시간
✔️ 할인 쿠폰 정기 발행
✔️ 배달앱 리뷰 적극 관리

■ 배달앱 최적화
- 메뉴 사진 전문 촬영
- 할인 프로모션 주간 단위 운영
- 리뷰 이벤트 (사진 리뷰 적립금 제공)`
    },
    
    dessert: {
        bot1: `❶ 매장 정보 분석 결과

■ 매장명: {storeName}
■ 위치: {location}
■ 업종: 디저트카페
■ 타겟층: {targetAge}
■ 객단가: {avgPrice}

[네이버 플레이스 실제 데이터]
- 카테고리: {category}
- 주소: {address}
- 전화번호: {telephone}

[핵심 분석]
✔️ 청담동 프리미엄 상권으로 고급화 전략 유효
✔️ 20-30대 여성 SNS 활발, 인스타그래머블 공간 필수
✔️ 계절 한정 메뉴로 재방문 유도 전략`,

        bot2: `❷ 경쟁사 벤치마킹 분석

[청담동 일대 주요 경쟁사 5개 (실제 네이버 검색 결과)]

1. {competitor1_name}
   - 위치: {competitor1_address}
   - 특징: 프리미엄 빙수 전문
   
2. {competitor2_name}
   - 위치: {competitor2_address}
   - 특징: 대형 베이커리 체인

3. {competitor3_name}
   - 위치: {competitor3_address}
   - 특징: 프랜차이즈 베이커리

4. {competitor4_name}
   - 위치: {competitor4_address}
   - 특징: 도넛 전문점

5. {competitor5_name}
   - 위치: {competitor5_address}
   - 특징: 아이스크림 전문

[차별화 전략]
✔️ 감각적인 플레이팅과 SNS 인증샷 유도
✔️ 계절 한정 메뉴 (봄 딸기, 여름 망고, 가을 밤 등)
✔️ 인테리어 포토존 구성
✔️ 인플루언서 협업 마케팅`,

        bot5: `❺ SEO/AEO/GEO/C-RANK 최적화 전략

[SNS 중심 검색 최적화]

■ 키워드 전략
- 주요 키워드: "청담동 디저트", "강남 디저트카페", "청담 케이크"
- 롱테일 키워드: "청담동 예쁜 카페", "강남 인스타 카페"

■ C-RANK (지도 검색 순위) 개선 방안
✔️ 고퀄리티 디저트 사진 60장 이상
✔️ 인테리어 사진 20장 (포토존 강조)
✔️ 계절 메뉴 업데이트 주기적 진행
✔️ 인스타그램 해시태그 전략
✔️ 네이버 블로그 체험단 운영 (주 1회)

■ SNS 마케팅
- 인스타그램 릴스 (디저트 제작 과정)
- 해시태그: #청담동디저트 #강남카페 #디저트스타그램
- 인플루언서 초청 이벤트 (월 2회)`
    }
};

// 샘플 데이터 생성 함수
function generateSampleData(industry) {
    const store = SAMPLE_STORES[industry];
    const naverData = NAVER_SEARCH_SAMPLES[industry];
    const botTemplates = BOT_RESULTS_TEMPLATES[industry];
    
    // 봇 결과 생성 (Bot 1, 2, 5)
    const botResults = {
        bot1: botTemplates.bot1
            .replace(/{storeName}/g, store.name)
            .replace(/{location}/g, store.location)
            .replace(/{targetAge}/g, store.targetAge)
            .replace(/{avgPrice}/g, store.avgPrice)
            .replace(/{category}/g, naverData.category)
            .replace(/{address}/g, naverData.address)
            .replace(/{telephone}/g, naverData.telephone),
            
        bot2: botTemplates.bot2
            .replace(/{competitor1_name}/g, naverData.competitors[0].name)
            .replace(/{competitor1_address}/g, naverData.competitors[0].address)
            .replace(/{competitor2_name}/g, naverData.competitors[1].name)
            .replace(/{competitor2_address}/g, naverData.competitors[1].address)
            .replace(/{competitor3_name}/g, naverData.competitors[2].name)
            .replace(/{competitor3_address}/g, naverData.competitors[2].address)
            .replace(/{competitor4_name}/g, naverData.competitors[3].name)
            .replace(/{competitor4_address}/g, naverData.competitors[3].address)
            .replace(/{competitor5_name}/g, naverData.competitors[4].name)
            .replace(/{competitor5_address}/g, naverData.competitors[4].address),
            
        bot5: botTemplates.bot5
    };
    
    return {
        store: store,
        naverData: naverData,
        botResults: botResults
    };
}

// 모든 업종 샘플 데이터 생성
const ALL_SAMPLES = {
    cafe: generateSampleData('cafe'),
    chicken: generateSampleData('chicken'),
    korean: generateSampleData('korean'),
    beauty: generateSampleData('beauty'),
    pizza: generateSampleData('pizza'),
    dessert: generateSampleData('dessert')
};

console.log('✅ 업종별 샘플 데이터 생성 완료');
console.log('샘플 데이터:', ALL_SAMPLES);

// Node.js 환경에서 실행 시
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SAMPLE_STORES,
        NAVER_SEARCH_SAMPLES,
        BOT_RESULTS_TEMPLATES,
        generateSampleData,
        ALL_SAMPLES
    };
}
