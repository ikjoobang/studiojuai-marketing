/**
 * ========================================
 * 30개 AI 봇 정의
 * ========================================
 */

export const BOT_DEFINITIONS = {
    // ========================================
    // 시장 분석 봇 (8개)
    // ========================================
    1: {
        id: 1,
        name: '매장 정보 분석 봇',
        category: 'market',
        icon: 'fa-store',
        prompt: '이 매장의 네이버 플레이스 정보를 분석하여 개선점을 찾아주세요. 업종 특성을 반영한 최적화 방안을 제시해주세요.'
    },
    2: {
        id: 2,
        name: '경쟁사 벤치마킹 봇 (반경 1km)',
        category: 'market',
        icon: 'fa-users',
        prompt: '위에 제공된 반경 내 경쟁사 실제 데이터를 바탕으로, 우리 매장과 비교 분석하세요. 경쟁사의 위치, 카테고리, 전화번호 등 실제 데이터를 활용하여 구체적인 차별화 포인트와 개선 사항을 제안해주세요.'
    },
    3: {
        id: 3,
        name: '상권 분석 봇',
        category: 'market',
        icon: 'fa-map-marked-alt',
        prompt: '이 지역의 상권을 분석하여 타겟 고객층, 유동인구 패턴, 최적 영업시간 등을 제안해주세요.'
    },
    4: {
        id: 4,
        name: '고객 분석 봇',
        category: 'market',
        icon: 'fa-user-friends',
        prompt: '이 업종과 지역의 주요 고객층을 분석하고, 그들의 선호도와 구매 패턴을 파악해주세요.'
    },
    5: {
        id: 5,
        name: 'SEO/AEO/GEO 최적화 봇',
        category: 'market',
        icon: 'fa-search',
        prompt: '네이버 플레이스 실제 데이터를 바탕으로 SEO(검색엔진최적화), AEO(Answer Engine Optimization), GEO(지역검색최적화) 전략을 제시해주세요. 키워드 순위 개선, C-RANK(카테고리 순위) 향상, 리뷰 관리, 사진 최적화 등 구체적이고 실행 가능한 방안을 제안해주세요.'
    },
    6: {
        id: 6,
        name: '트렌드 분석 봇',
        category: 'market',
        icon: 'fa-chart-line',
        prompt: '이 업종의 최신 트렌드, 계절별 변화, 유행하는 메뉴/서비스를 분석하고 적용 방안을 제시해주세요.'
    },
    7: {
        id: 7,
        name: '가격 전략 봇',
        category: 'market',
        icon: 'fa-dollar-sign',
        prompt: '경쟁사 대비 가격 경쟁력을 분석하고, 최적의 가격 전략과 프로모션 방안을 제시해주세요.'
    },
    8: {
        id: 8,
        name: '매출 예측 봇',
        category: 'market',
        icon: 'fa-chart-pie',
        prompt: '과거 데이터와 시장 트렌드를 바탕으로 향후 3개월 매출을 예측하고, 목표 달성 전략을 제시해주세요.'
    },

    // ========================================
    // 콘텐츠 자동화 봇 (8개)
    // ========================================
    9: {
        id: 9,
        name: '제안서 생성 봇',
        category: 'content',
        icon: 'fa-file-alt',
        prompt: '이 매장을 위한 종합 마케팅 제안서를 작성해주세요. 현황 분석, 전략, 실행 계획, 예상 효과를 포함해주세요.'
    },
    10: {
        id: 10,
        name: '견적서 계산 봇',
        category: 'content',
        icon: 'fa-calculator',
        prompt: '이 업종의 서비스/메뉴에 대한 상세 견적서를 작성하고, 패키지 구성을 제안해주세요.'
    },
    11: {
        id: 11,
        name: '브랜드 스토리 봇',
        category: 'content',
        icon: 'fa-book-open',
        prompt: '이 매장만의 독특한 브랜드 스토리를 만들어주세요. 창업 스토리, 철학, 차별점을 감동적으로 표현해주세요.'
    },
    12: {
        id: 12,
        name: '메뉴 최적화 봇',
        category: 'content',
        icon: 'fa-utensils',
        prompt: '메뉴 구성을 분석하고, 더 매력적인 메뉴명과 설명을 제안해주세요. 판매를 높일 수 있는 메뉴 전략도 포함해주세요.'
    },
    13: {
        id: 13,
        name: '시즌 마케팅 봇',
        category: 'content',
        icon: 'fa-calendar-alt',
        prompt: '현재 시즌에 맞는 마케팅 캠페인을 기획해주세요. 이벤트, 프로모션, 콘텐츠 아이디어를 제시해주세요.'
    },
    14: {
        id: 14,
        name: 'SNS 콘텐츠 봇',
        category: 'content',
        icon: 'fa-share-alt',
        prompt: '인스타그램과 페이스북용 게시물을 작성해주세요. 매력적인 문구, 해시태그, 게시 전략을 포함해주세요.'
    },
    15: {
        id: 15,
        name: '광고 카피 봇',
        category: 'content',
        icon: 'fa-ad',
        prompt: '이 매장을 위한 강력한 광고 카피와 슬로건을 작성해주세요. 짧고 임팩트 있는 문구들을 여러 버전으로 제안해주세요.'
    },
    16: {
        id: 16,
        name: '이벤트 기획 봇',
        category: 'content',
        icon: 'fa-gift',
        prompt: '고객 유입을 늘릴 수 있는 창의적인 이벤트를 기획해주세요. 쿠폰, 할인, 경품 등 다양한 프로모션 아이디어를 제시해주세요.'
    },

    // ========================================
    // 크리에이티브 봇 (6개)
    // ========================================
    17: {
        id: 17,
        name: 'AI 이미지 생성 봇',
        category: 'creative',
        icon: 'fa-image',
        prompt: '이 매장을 위한 마케팅 이미지 콘셉트를 제안하고, 이미지 생성 프롬프트를 작성해주세요.'
    },
    18: {
        id: 18,
        name: '로고 디자인 봇',
        category: 'creative',
        icon: 'fa-paint-brush',
        prompt: '이 매장의 브랜드 아이덴티티를 담은 로고 디자인 콘셉트를 제안하고, 컬러/폰트/형태를 상세히 설명해주세요.'
    },
    19: {
        id: 19,
        name: '포스터 제작 봇',
        category: 'creative',
        icon: 'fa-file-image',
        prompt: '프로모션 포스터의 레이아웃, 문구 배치, 디자인 요소를 상세히 설계해주세요.'
    },
    20: {
        id: 20,
        name: '메뉴판 디자인 봇',
        category: 'creative',
        icon: 'fa-clipboard-list',
        prompt: '매력적이고 판매를 높이는 메뉴판 디자인을 제안해주세요. 레이아웃, 카테고리 구성, 비주얼 요소를 포함해주세요.'
    },
    21: {
        id: 21,
        name: '영상 기획 봇',
        category: 'creative',
        icon: 'fa-video',
        prompt: '매장 홍보 영상의 스토리보드, 촬영 가이드, 편집 방향을 상세히 기획해주세요.'
    },
    22: {
        id: 22,
        name: '패키지 디자인 봇',
        category: 'creative',
        icon: 'fa-box',
        prompt: '브랜드 아이덴티티를 담은 포장 디자인과 굿즈 아이디어를 제안해주세요.'
    },

    // ========================================
    // 운영 자동화 봇 (8개)
    // ========================================
    23: {
        id: 23,
        name: '네이버 플레이스 최적화 봇',
        category: 'operations',
        icon: 'fa-map-marker-alt',
        prompt: '네이버 플레이스의 모든 항목(홈, 메뉴, 정보, 리뷰)을 최적화할 구체적인 내용을 작성해주세요.'
    },
    24: {
        id: 24,
        name: '리뷰 관리 봇',
        category: 'operations',
        icon: 'fa-comments',
        prompt: '고객 리뷰에 대한 친절하고 전문적인 답변을 작성해주세요. 긍정/부정 리뷰별로 다르게 응대해주세요.'
    },
    25: {
        id: 25,
        name: '예약 시스템 봇',
        category: 'operations',
        icon: 'fa-calendar-check',
        prompt: '예약 시스템을 효율적으로 운영할 수 있는 방안과 고객 안내 문구를 작성해주세요.'
    },
    26: {
        id: 26,
        name: '고객 상담 봇',
        category: 'operations',
        icon: 'fa-headset',
        prompt: '자주 묻는 질문(FAQ)을 정리하고, 고객 상담 시나리오별 응대 방법을 작성해주세요.'
    },
    27: {
        id: 27,
        name: '재고 관리 봇',
        category: 'operations',
        icon: 'fa-boxes',
        prompt: '재고 관리 시스템을 제안하고, 발주 타이밍과 수량을 최적화하는 방법을 알려주세요.'
    },
    28: {
        id: 28,
        name: '배달 최적화 봇',
        category: 'operations',
        icon: 'fa-motorcycle',
        prompt: '배달 서비스를 최적화할 수 있는 방안을 제시해주세요. 배달 반경, 시간, 포장 등을 고려해주세요.'
    },
    29: {
        id: 29,
        name: '성과 측정 봇',
        category: 'operations',
        icon: 'fa-chart-bar',
        prompt: '마케팅 성과를 측정할 수 있는 KPI를 설정하고, ROI를 계산하는 방법을 제시해주세요.'
    },
    30: {
        id: 30,
        name: '종합 대시보드 봇',
        category: 'operations',
        icon: 'fa-tachometer-alt',
        prompt: '매장 운영의 모든 지표를 한눈에 볼 수 있는 대시보드 구성을 제안해주세요.'
    }
};

export function getBotDefinition(botId) {
    return BOT_DEFINITIONS[botId];
}

export function getAllBots() {
    return Object.values(BOT_DEFINITIONS);
}
