// ========================================
// AI 마케팅 자동화 플랫폼 - 봇 시스템
// 30개 AI 봇 정의 및 관리
// ========================================

// ========================================
// 시장 분석 봇 (8개)
// ========================================
const marketBots = [
    {
        id: 1,
        name: '매장 정보 분석 봇',
        category: 'market',
        icon: 'fa-store',
        color: 'bg-blue-500',
        description: '네이버 플레이스 데이터를 자동으로 수집하고 분석합니다.',
        prompt: '이 매장의 네이버 플레이스 정보를 분석하여 개선점을 찾아주세요. 업종 특성을 반영한 최적화 방안을 제시해주세요.',
        features: [
            '플레이스 정보 자동 수집',
            '리뷰 데이터 분석',
            '사진/영상 품질 평가',
            '정보 완성도 체크'
        ]
    },
    {
        id: 2,
        name: '경쟁사 벤치마킹 봇',
        category: 'market',
        icon: 'fa-users',
        color: 'bg-blue-500',
        description: '상권 내 경쟁사를 자동 발굴하고 상세 비교 분석합니다.',
        prompt: '같은 상권의 경쟁 업체들을 분석하고, 우리 매장과 비교하여 차별화 포인트와 개선 사항을 제안해주세요.',
        features: [
            '경쟁사 자동 발굴',
            '가격/메뉴 비교',
            '리뷰 트렌드 분석',
            '차별화 전략 수립'
        ]
    },
    {
        id: 3,
        name: '상권 분석 봇',
        category: 'market',
        icon: 'fa-map-marked-alt',
        color: 'bg-blue-500',
        description: '지역별 유동인구, 소비패턴, 임대료 등을 종합 분석합니다.',
        prompt: '이 지역의 상권을 분석하여 타겟 고객층, 유동인구 패턴, 최적 영업시간 등을 제안해주세요.',
        features: [
            '유동인구 분석',
            '소비패턴 파악',
            '임대료 정보',
            '입지 평가'
        ]
    },
    {
        id: 4,
        name: '고객 분석 봇',
        category: 'market',
        icon: 'fa-user-friends',
        color: 'bg-blue-500',
        description: '타겟 고객층을 프로파일링하고 행동 패턴을 분석합니다.',
        prompt: '이 업종과 지역의 주요 고객층을 분석하고, 그들의 선호도와 구매 패턴을 파악해주세요.',
        features: [
            '고객 세분화',
            '구매 패턴 분석',
            '선호도 조사',
            '페르소나 생성'
        ]
    },
    {
        id: 5,
        name: '키워드 분석 봇',
        category: 'market',
        icon: 'fa-search',
        color: 'bg-blue-500',
        description: 'SEO 최적화를 위한 핵심 키워드를 발굴합니다.',
        prompt: '이 업종과 지역에 최적화된 검색 키워드를 찾고, 네이버 플레이스 상위 노출 전략을 제시해주세요.',
        features: [
            '검색량 분석',
            '경쟁도 평가',
            '롱테일 키워드 발굴',
            'SEO 전략 수립'
        ]
    },
    {
        id: 6,
        name: '트렌드 분석 봇',
        category: 'market',
        icon: 'fa-chart-line',
        color: 'bg-blue-500',
        description: '업종별 최신 트렌드와 계절성을 분석합니다.',
        prompt: '이 업종의 최신 트렌드, 계절별 변화, 유행하는 메뉴/서비스를 분석하고 적용 방안을 제시해주세요.',
        features: [
            '트렌드 모니터링',
            '계절성 분석',
            '유행 메뉴 파악',
            '혁신 아이디어'
        ]
    },
    {
        id: 7,
        name: '가격 전략 봇',
        category: 'market',
        icon: 'fa-dollar-sign',
        color: 'bg-blue-500',
        description: '업종별 가격 경쟁력을 분석하고 최적 가격을 제안합니다.',
        prompt: '경쟁사 대비 가격 경쟁력을 분석하고, 최적의 가격 전략과 프로모션 방안을 제시해주세요.',
        features: [
            '가격 비교 분석',
            '원가 최적화',
            '프로모션 기획',
            '수익성 분석'
        ]
    },
    {
        id: 8,
        name: '매출 예측 봇',
        category: 'market',
        icon: 'fa-chart-pie',
        color: 'bg-blue-500',
        description: '데이터 기반으로 미래 매출을 예측합니다.',
        prompt: '과거 데이터와 시장 트렌드를 바탕으로 향후 3개월 매출을 예측하고, 목표 달성 전략을 제시해주세요.',
        features: [
            '매출 예측 모델',
            '성장률 분석',
            '목표 설정',
            '실행 계획'
        ]
    }
];

// ========================================
// 콘텐츠 자동화 봇 (8개)
// ========================================
const contentBots = [
    {
        id: 9,
        name: '제안서 생성 봇',
        category: 'content',
        icon: 'fa-file-alt',
        color: 'bg-green-500',
        description: '업종별 맞춤 마케팅 제안서를 자동으로 작성합니다.',
        prompt: '이 매장을 위한 종합 마케팅 제안서를 작성해주세요. 현황 분석, 전략, 실행 계획, 예상 효과를 포함해주세요.',
        features: [
            '현황 분석',
            '전략 수립',
            '실행 계획',
            'ROI 예측'
        ]
    },
    {
        id: 10,
        name: '견적서 계산 봇',
        category: 'content',
        icon: 'fa-calculator',
        color: 'bg-green-500',
        description: '서비스/메뉴별 자동 견적 시스템을 제공합니다.',
        prompt: '이 업종의 서비스/메뉴에 대한 상세 견적서를 작성하고, 패키지 구성을 제안해주세요.',
        features: [
            '자동 견적 계산',
            '패키지 구성',
            '할인 정책',
            '비교 견적'
        ]
    },
    {
        id: 11,
        name: '브랜드 스토리 봇',
        category: 'content',
        icon: 'fa-book-open',
        color: 'bg-green-500',
        description: '업종 특성을 반영한 매력적인 브랜드 스토리를 생성합니다.',
        prompt: '이 매장만의 독특한 브랜드 스토리를 만들어주세요. 창업 스토리, 철학, 차별점을 감동적으로 표현해주세요.',
        features: [
            '브랜드 스토리텔링',
            '미션/비전 정립',
            '가치 제안',
            '감성 메시지'
        ]
    },
    {
        id: 12,
        name: '메뉴 최적화 봇',
        category: 'content',
        icon: 'fa-utensils',
        color: 'bg-green-500',
        description: '업종별 메뉴 구성과 네이밍을 최적화합니다.',
        prompt: '메뉴 구성을 분석하고, 더 매력적인 메뉴명과 설명을 제안해주세요. 판매를 높일 수 있는 메뉴 전략도 포함해주세요.',
        features: [
            '메뉴 구성 최적화',
            '네이밍 전략',
            '가격 배치',
            '시그니처 메뉴'
        ]
    },
    {
        id: 13,
        name: '시즌 마케팅 봇',
        category: 'content',
        icon: 'fa-calendar-alt',
        color: 'bg-green-500',
        description: '업종별 계절 마케팅 캠페인을 자동으로 기획합니다.',
        prompt: '현재 시즌에 맞는 마케팅 캠페인을 기획해주세요. 이벤트, 프로모션, 콘텐츠 아이디어를 제시해주세요.',
        features: [
            '계절별 캠페인',
            '이벤트 기획',
            '프로모션 전략',
            '콘텐츠 달력'
        ]
    },
    {
        id: 14,
        name: 'SNS 콘텐츠 봇',
        category: 'content',
        icon: 'fa-share-alt',
        color: 'bg-green-500',
        description: '업종별 소셜미디어 콘텐츠를 자동 생성합니다.',
        prompt: '인스타그램과 페이스북용 게시물을 작성해주세요. 매력적인 문구, 해시태그, 게시 전략을 포함해주세요.',
        features: [
            '게시물 작성',
            '해시태그 생성',
            '게시 일정',
            '인게이지먼트 전략'
        ]
    },
    {
        id: 15,
        name: '광고 카피 봇',
        category: 'content',
        icon: 'fa-ad',
        color: 'bg-green-500',
        description: '업종 특화 마케팅 문구와 슬로건을 생성합니다.',
        prompt: '이 매장을 위한 강력한 광고 카피와 슬로건을 작성해주세요. 짧고 임팩트 있는 문구들을 여러 버전으로 제안해주세요.',
        features: [
            '헤드라인 작성',
            '슬로건 생성',
            'CTA 문구',
            'A/B 테스트용'
        ]
    },
    {
        id: 16,
        name: '이벤트 기획 봇',
        category: 'content',
        icon: 'fa-gift',
        color: 'bg-green-500',
        description: '업종별 맞춤 프로모션 이벤트를 자동으로 기획합니다.',
        prompt: '고객 유입을 늘릴 수 있는 창의적인 이벤트를 기획해주세요. 쿠폰, 할인, 경품 등 다양한 프로모션 아이디어를 제시해주세요.',
        features: [
            '이벤트 아이디어',
            '프로모션 설계',
            '쿠폰 전략',
            '경품 구성'
        ]
    }
];

// ========================================
// 크리에이티브 봇 (6개)
// ========================================
const creativeBots = [
    {
        id: 17,
        name: 'AI 이미지 생성 봇',
        category: 'creative',
        icon: 'fa-image',
        color: 'bg-purple-500',
        description: '업종별 마케팅 이미지를 AI로 자동 제작합니다.',
        prompt: '이 매장을 위한 마케팅 이미지 콘셉트를 제안하고, 이미지 생성 프롬프트를 작성해주세요.',
        features: [
            'AI 이미지 생성',
            '콘셉트 제안',
            '스타일 가이드',
            '다양한 버전'
        ]
    },
    {
        id: 18,
        name: '로고 디자인 봇',
        category: 'creative',
        icon: 'fa-paint-brush',
        color: 'bg-purple-500',
        description: '업종 특성을 반영한 브랜드 로고를 디자인합니다.',
        prompt: '이 매장의 브랜드 아이덴티티를 담은 로고 디자인 콘셉트를 제안하고, 컬러/폰트/형태를 상세히 설명해주세요.',
        features: [
            '로고 콘셉트',
            '컬러 팔레트',
            '폰트 선택',
            '브랜드 가이드'
        ]
    },
    {
        id: 19,
        name: '포스터 제작 봇',
        category: 'creative',
        icon: 'fa-file-image',
        color: 'bg-purple-500',
        description: '업종별 프로모션 포스터를 자동으로 디자인합니다.',
        prompt: '프로모션 포스터의 레이아웃, 문구 배치, 디자인 요소를 상세히 설계해주세요.',
        features: [
            '포스터 레이아웃',
            '문구 배치',
            '디자인 요소',
            '인쇄 사양'
        ]
    },
    {
        id: 20,
        name: '메뉴판 디자인 봇',
        category: 'creative',
        icon: 'fa-clipboard-list',
        color: 'bg-purple-500',
        description: '업종별 최적화된 메뉴판 레이아웃을 설계합니다.',
        prompt: '매력적이고 판매를 높이는 메뉴판 디자인을 제안해주세요. 레이아웃, 카테고리 구성, 비주얼 요소를 포함해주세요.',
        features: [
            '레이아웃 설계',
            '카테고리 구성',
            '시각적 위계',
            '판매 심리학 적용'
        ]
    },
    {
        id: 21,
        name: '영상 기획 봇',
        category: 'creative',
        icon: 'fa-video',
        color: 'bg-purple-500',
        description: '업종별 마케팅 영상 콘셉트를 기획합니다.',
        prompt: '매장 홍보 영상의 스토리보드, 촬영 가이드, 편집 방향을 상세히 기획해주세요.',
        features: [
            '영상 콘셉트',
            '스토리보드',
            '촬영 가이드',
            '편집 방향'
        ]
    },
    {
        id: 22,
        name: '패키지 디자인 봇',
        category: 'creative',
        icon: 'fa-box',
        color: 'bg-purple-500',
        description: '업종별 포장 및 굿즈 디자인을 제안합니다.',
        prompt: '브랜드 아이덴티티를 담은 포장 디자인과 굿즈 아이디어를 제안해주세요.',
        features: [
            '포장 디자인',
            '굿즈 아이디어',
            '브랜드 일관성',
            '실용성 고려'
        ]
    }
];

// ========================================
// 운영 자동화 봇 (8개)
// ========================================
const operationsBots = [
    {
        id: 23,
        name: '네이버 플레이스 최적화 봇',
        category: 'operations',
        icon: 'fa-map-marker-alt',
        color: 'bg-orange-500',
        description: '업종별 플레이스 정보를 자동으로 최적화합니다.',
        prompt: '네이버 플레이스의 모든 항목(홈, 메뉴, 정보, 리뷰)을 최적화할 구체적인 내용을 작성해주세요.',
        features: [
            '홈 화면 최적화',
            '메뉴 정보 작성',
            '매장 정보 보완',
            '사진 최적화'
        ]
    },
    {
        id: 24,
        name: '리뷰 관리 봇',
        category: 'operations',
        icon: 'fa-comments',
        color: 'bg-orange-500',
        description: '업종별 맞춤 고객 리뷰에 자동으로 응답합니다.',
        prompt: '고객 리뷰에 대한 친절하고 전문적인 답변을 작성해주세요. 긍정/부정 리뷰별로 다르게 응대해주세요.',
        features: [
            '리뷰 모니터링',
            '자동 응답',
            '감정 분석',
            '개선사항 도출'
        ]
    },
    {
        id: 25,
        name: '예약 시스템 봇',
        category: 'operations',
        icon: 'fa-calendar-check',
        color: 'bg-orange-500',
        description: '업종별 예약/주문 시스템을 최적화합니다.',
        prompt: '예약 시스템을 효율적으로 운영할 수 있는 방안과 고객 안내 문구를 작성해주세요.',
        features: [
            '예약 프로세스',
            '시간 관리',
            '알림 설정',
            '노쇼 방지'
        ]
    },
    {
        id: 26,
        name: '고객 상담 봇',
        category: 'operations',
        icon: 'fa-headset',
        color: 'bg-orange-500',
        description: '업종별 FAQ와 상담을 자동화합니다.',
        prompt: '자주 묻는 질문(FAQ)을 정리하고, 고객 상담 시나리오별 응대 방법을 작성해주세요.',
        features: [
            'FAQ 작성',
            '상담 시나리오',
            '챗봇 스크립트',
            '에스컬레이션'
        ]
    },
    {
        id: 27,
        name: '재고 관리 봇',
        category: 'operations',
        icon: 'fa-boxes',
        color: 'bg-orange-500',
        description: '업종별 재고/원자재를 효율적으로 관리합니다.',
        prompt: '재고 관리 시스템을 제안하고, 발주 타이밍과 수량을 최적화하는 방법을 알려주세요.',
        features: [
            '재고 추적',
            '발주 최적화',
            '원가 관리',
            '폐기 최소화'
        ]
    },
    {
        id: 28,
        name: '배달 최적화 봇',
        category: 'operations',
        icon: 'fa-motorcycle',
        color: 'bg-orange-500',
        description: '배달 가능 업종의 배송을 효율화합니다.',
        prompt: '배달 서비스를 최적화할 수 있는 방안을 제시해주세요. 배달 반경, 시간, 포장 등을 고려해주세요.',
        features: [
            '배달 반경 설정',
            '시간 최적화',
            '포장 전략',
            '배달비 정책'
        ]
    },
    {
        id: 29,
        name: '성과 측정 봇',
        category: 'operations',
        icon: 'fa-chart-bar',
        color: 'bg-orange-500',
        description: '핵심 지표 설정 및 투자 대비 효과를 측정합니다.',
        prompt: '마케팅 성과를 측정할 수 있는 KPI를 설정하고, ROI를 계산하는 방법을 제시해주세요.',
        features: [
            'KPI 설정',
            'ROI 계산',
            '성과 리포트',
            '개선 방안'
        ]
    },
    {
        id: 30,
        name: '종합 대시보드 봇',
        category: 'operations',
        icon: 'fa-tachometer-alt',
        color: 'bg-orange-500',
        description: '모든 데이터를 통합하여 실시간으로 관리합니다.',
        prompt: '매장 운영의 모든 지표를 한눈에 볼 수 있는 대시보드 구성을 제안해주세요.',
        features: [
            '통합 대시보드',
            '실시간 모니터링',
            '알림 시스템',
            '인사이트 도출'
        ]
    }
];

// ========================================
// 봇 카드 생성
// ========================================
function generateBotCards() {
    // 시장 분석 봇
    const marketBotsContainer = document.getElementById('marketBots');
    marketBots.forEach(bot => {
        marketBotsContainer.appendChild(createBotCard(bot));
    });
    
    // 콘텐츠 자동화 봇
    const contentBotsContainer = document.getElementById('contentBots');
    contentBots.forEach(bot => {
        contentBotsContainer.appendChild(createBotCard(bot));
    });
    
    // 크리에이티브 봇
    const creativeBotsContainer = document.getElementById('creativeBots');
    creativeBots.forEach(bot => {
        creativeBotsContainer.appendChild(createBotCard(bot));
    });
    
    // 운영 자동화 봇
    const operationsBotsContainer = document.getElementById('operationsBots');
    operationsBots.forEach(bot => {
        operationsBotsContainer.appendChild(createBotCard(bot));
    });
}

// ========================================
// 봇 카드 생성 함수
// ========================================
function createBotCard(bot) {
    const card = document.createElement('div');
    card.className = `bot-card glass-effect rounded-xl p-4 text-white`;
    card.id = `bot-${bot.id}`;
    
    card.innerHTML = `
        <div class="flex items-start justify-between mb-3">
            <div class="flex items-center">
                <div class="${bot.color} w-12 h-12 rounded-lg flex items-center justify-center mr-3">
                    <i class="fas ${bot.icon} text-xl"></i>
                </div>
                <div>
                    <h4 class="font-bold text-sm">${bot.name}</h4>
                    <span class="text-xs opacity-70">#${bot.id}</span>
                </div>
            </div>
            <span class="bot-status text-xs px-2 py-1 rounded bg-gray-500">대기</span>
        </div>
        <p class="text-xs opacity-80 mb-3">${bot.description}</p>
        <button onclick="runSingleBot(${bot.id})" class="w-full ${bot.color} hover:opacity-80 py-2 rounded-lg text-sm font-bold transition">
            <i class="fas fa-play mr-2"></i>실행
        </button>
    `;
    
    return card;
}

// ========================================
// 개별 봇 실행
// ========================================
async function runSingleBot(botId) {
    if (!currentStore) {
        showNotification('먼저 매장 정보를 저장해주세요!', 'error');
        return;
    }
    
    const bot = findBotById(botId);
    if (!bot) {
        showNotification('봇을 찾을 수 없습니다.', 'error');
        return;
    }
    
    updateBotCard(botId, 'running');
    showNotification(`${bot.name} 실행 중...`, 'info');
    
    try {
        const result = await executeBot(botId, currentStore);
        updateBotCard(botId, 'completed');
        showNotification(`${bot.name} 완료!`, 'success');
        
        // 결과 표시
        showBotResult(result);
        
    } catch (error) {
        updateBotCard(botId, 'error');
        showNotification(`${bot.name} 실행 실패`, 'error');
        console.error(error);
    }
}

// ========================================
// 봇 카드 상태 업데이트
// ========================================
function updateBotCard(botId, status) {
    const card = document.getElementById(`bot-${botId}`);
    if (!card) return;
    
    const statusElement = card.querySelector('.bot-status');
    if (!statusElement) return;
    
    const statusConfig = {
        'waiting': { text: '대기', class: 'bg-gray-500' },
        'running': { text: '실행중', class: 'bg-yellow-500 pulse-animation' },
        'completed': { text: '완료', class: 'bg-green-500' },
        'error': { text: '오류', class: 'bg-red-500' }
    };
    
    const config = statusConfig[status] || statusConfig['waiting'];
    statusElement.textContent = config.text;
    statusElement.className = `bot-status text-xs px-2 py-1 rounded ${config.class}`;
}

// ========================================
// 봇 검색
// ========================================
function findBotById(botId) {
    const allBots = [...marketBots, ...contentBots, ...creativeBots, ...operationsBots];
    return allBots.find(bot => bot.id === botId);
}

// ========================================
// 업종별 봇 업데이트
// ========================================
function updateBotsForIndustry(industry) {
    console.log(`🔄 업종 변경에 따른 봇 시스템 재설정: ${industry}`);
    
    // 모든 봇 카드 리셋
    const allBotCards = document.querySelectorAll('.bot-card');
    allBotCards.forEach(card => {
        const statusElement = card.querySelector('.bot-status');
        if (statusElement) {
            statusElement.textContent = '대기';
            statusElement.className = 'bot-status text-xs px-2 py-1 rounded bg-gray-500';
        }
    });
}

// ========================================
// 봇 결과 표시
// ========================================
function showBotResult(result) {
    // 백엔드 API 응답 형식에 맞게 조정
    const botName = result.botName || '알 수 없음';
    const resultContent = result.result || result.data || result;
    const timestamp = result.createdAt || new Date().toISOString();
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-2xl font-bold text-purple-700">${botName} 실행 결과</h3>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-2xl"></i>
                </button>
            </div>
            <div class="text-gray-700">
                <p class="mb-2"><strong>매장:</strong> ${currentStore?.name || 'N/A'}</p>
                <p class="mb-2"><strong>업종:</strong> ${getIndustryName(currentStore?.industry || 'other')}</p>
                <p class="mb-2"><strong>실행 시간:</strong> ${new Date(timestamp).toLocaleString('ko-KR')}</p>
                <div class="mt-4 p-4 bg-gray-100 rounded-lg">
                    <h4 class="font-bold mb-2">분석 결과:</h4>
                    <div class="whitespace-pre-wrap text-sm">${
                        typeof resultContent === 'string' 
                            ? resultContent 
                            : JSON.stringify(resultContent, null, 2)
                    }</div>
                </div>
            </div>
            <div class="mt-6 flex gap-3">
                <button onclick="downloadBotResult('${botName}', ${JSON.stringify(resultContent)})" class="flex-1 bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700">
                    <i class="fas fa-download mr-2"></i>다운로드
                </button>
                <button onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-400">
                    닫기
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// 봇 결과 다운로드 헬퍼
function downloadBotResult(botName, result) {
    const dataStr = JSON.stringify({ botName, result, timestamp: new Date().toISOString() }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${botName}_${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    showNotification('결과가 다운로드되었습니다!', 'success');
}

// ========================================
// 결과 다운로드
// ========================================
function downloadResult(result) {
    const dataStr = JSON.stringify(result, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `bot_result_${result.botId}_${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    showNotification('결과가 다운로드되었습니다!', 'success');
}

console.log('✅ bot-system.js 로드 완료 (30개 봇)');
