/**
 * ========================================
 * 📊 보고서 데이터 수집 모듈
 * Studiojuai 마케팅 최적화 플랫폼
 * ========================================
 * 
 * PPT 보고서 생성을 위한 모든 데이터 수집
 * - 매장 정보
 * - AI 봇 실행 결과 (30개)
 * - 분석 데이터 (방문자, 매출, 전환율)
 * - 경쟁사 분석
 * - 액션 플랜
 */

class ReportDataCollector {
    constructor() {
        this.dataManager = window.dataManager;
        this.botSystem = window.botSystem;
    }

    /**
     * 전체 보고서 데이터 수집
     * @param {string} storeId - 매장 ID
     * @returns {Promise<Object>} 보고서용 전체 데이터
     */
    async collectFullReport(storeId) {
        console.log(`📊 보고서 데이터 수집 시작: ${storeId}`);
        
        try {
            const store = await this.getStoreInfo(storeId);
            const botResults = await this.getBotResults(storeId);
            const analytics = await this.getAnalyticsData(storeId);
            const competitors = await this.getCompetitorData(store);
            const actionPlan = await this.generateActionPlan(store, analytics);
            
            const report = {
                metadata: {
                    generatedAt: new Date(),
                    generatedBy: 'Studiojuai 마케팅 최적화 플랫폼',
                    reportPeriod: this.getReportPeriod(),
                    version: '1.0'
                },
                store: store,
                summary: this.generateSummary(analytics, botResults),
                botResults: botResults,
                analytics: analytics,
                competitors: competitors,
                actionPlan: actionPlan
            };
            
            console.log('✅ 보고서 데이터 수집 완료', report);
            return report;
            
        } catch (error) {
            console.error('❌ 보고서 데이터 수집 실패:', error);
            throw error;
        }
    }

    /**
     * 매장 정보 조회
     */
    async getStoreInfo(storeId) {
        const stores = this.dataManager.getStores();
        const store = stores.find(s => s.id === storeId);
        
        if (!store) {
            throw new Error(`매장을 찾을 수 없습니다: ${storeId}`);
        }
        
        return {
            id: store.id,
            name: store.name,
            industry: store.industry,
            location: store.location,
            createdAt: store.createdAt,
            industryName: this.getIndustryName(store.industry)
        };
    }

    /**
     * AI 봇 실행 결과 조회 (D1 데이터베이스)
     */
    async getBotResults(storeId) {
        console.log(`🔵 D1에서 실제 봇 실행 결과 조회: ${storeId}`);
        
        try {
            // D1 데이터베이스에서 실제 실행 결과 가져오기
            const response = await fetch(`/api/stores/${storeId}/executions`);
            const data = await response.json();
            
            if (!data.success || !data.executions || data.executions.length === 0) {
                console.warn('⚠️ D1에 실행 결과 없음, 모의 데이터 사용');
                return this.getBotResultsFallback(storeId);
            }
            
            console.log(`✅ D1에서 ${data.executions.length}개 봇 결과 조회 성공`);
            
            // D1 데이터를 PPT 형식으로 변환
            const results = data.executions.map((execution, index) => ({
                id: execution.botId || (index + 1),
                name: execution.botName || `봇 #${index + 1}`,
                description: execution.botName ? `${execution.botName} 실행 결과` : '봇 실행 결과',
                category: this.getBotCategory(execution.botId),
                status: execution.status || 'completed',
                executedAt: new Date(execution.createdAt || Date.now()),
                result: execution.result || '결과 없음',
                impact: this.calculateBotImpact({ id: execution.botId }),
                nextAction: this.suggestNextAction({ id: execution.botId, name: execution.botName }, { name: execution.storeName })
            }));
            
            return results;
            
        } catch (error) {
            console.error('❌ D1 조회 실패, 모의 데이터 사용:', error);
            return this.getBotResultsFallback(storeId);
        }
    }
    
    /**
     * 모의 데이터 생성 (D1 실패 시)
     */
    async getBotResultsFallback(storeId) {
        const allBots = this.botSystem.bots;
        const store = await this.getStoreInfo(storeId);
        
        // 30개 봇 각각의 실행 결과 시뮬레이션
        const results = allBots.map(bot => {
            const adapted = this.botSystem.adaptBotToIndustry(bot, store.industry);
            
            return {
                id: bot.id,
                name: adapted.name,
                description: adapted.description,
                category: bot.category,
                status: 'completed',
                executedAt: new Date(),
                result: this.generateBotResult(bot, store),
                impact: this.calculateBotImpact(bot),
                nextAction: this.suggestNextAction(bot, store)
            };
        });
        
        return results;
    }
    
    /**
     * 봇 ID로 카테고리 추론
     */
    getBotCategory(botId) {
        if (botId <= 10) return 'analysis';
        if (botId <= 20) return 'content';
        if (botId <= 25) return 'marketing';
        if (botId <= 28) return 'customer';
        return 'performance';
    }

    /**
     * 분석 데이터 조회 (Chart.js 데이터 변환)
     */
    async getAnalyticsData(storeId) {
        // 실제 환경에서는 DB에서 조회
        // 현재는 샘플 데이터 생성
        
        const last30Days = this.getLast30Days();
        
        return {
            period: {
                start: last30Days[0],
                end: last30Days[last30Days.length - 1]
            },
            
            // 일별 방문자 데이터
            dailyVisitors: last30Days.map((date, index) => ({
                date: date,
                visitors: Math.floor(50 + Math.random() * 100 + index * 2),
                uniqueVisitors: Math.floor(40 + Math.random() * 80 + index * 1.5)
            })),
            
            // 주간 매출 데이터
            weeklyRevenue: this.getWeeklyData(last30Days, (week) => ({
                week: `${week}주차`,
                revenue: Math.floor(500000 + Math.random() * 1000000),
                orders: Math.floor(20 + Math.random() * 50)
            })),
            
            // 전환율 데이터
            conversionRate: {
                current: (2.5 + Math.random() * 2).toFixed(2),
                previous: (2.0 + Math.random() * 1.5).toFixed(2),
                change: '+15.3%'
            },
            
            // 트래픽 소스
            trafficSources: [
                { source: '네이버 검색', percentage: 35, visitors: 1250 },
                { source: '인스타그램', percentage: 28, visitors: 1000 },
                { source: '직접 방문', percentage: 20, visitors: 715 },
                { source: '블로그', percentage: 12, visitors: 430 },
                { source: '기타', percentage: 5, visitors: 180 }
            ],
            
            // 인기 콘텐츠
            topContent: [
                { title: '메뉴 소개', views: 3250, engagement: '높음' },
                { title: '매장 위치', views: 2890, engagement: '중간' },
                { title: '이벤트 정보', views: 2150, engagement: '높음' },
                { title: '리뷰', views: 1870, engagement: '중간' },
                { title: '예약 안내', views: 1420, engagement: '높음' }
            ],
            
            // 핵심 지표 요약
            kpi: {
                totalVisitors: 3575,
                totalRevenue: 8750000,
                avgOrderValue: 35000,
                customerRetention: '42%',
                monthlyGrowth: '+23.5%'
            }
        };
    }

    /**
     * 경쟁사 분석 데이터
     */
    async getCompetitorData(store) {
        return {
            naverPlaceRank: Math.floor(Math.random() * 10) + 1,
            totalCompetitors: 156,
            
            topCompetitors: [
                {
                    name: '경쟁사 A',
                    rating: 4.7,
                    reviews: 1250,
                    rank: 2
                },
                {
                    name: '경쟁사 B',
                    rating: 4.5,
                    reviews: 980,
                    rank: 3
                },
                {
                    name: '경쟁사 C',
                    rating: 4.3,
                    reviews: 876,
                    rank: 5
                }
            ],
            
            yourStore: {
                name: store.name,
                rating: 4.6,
                reviews: 1100,
                rank: Math.floor(Math.random() * 5) + 1
            },
            
            strengths: [
                '리뷰 평점 상위 20% 유지',
                '최근 1개월 리뷰 증가율 +35%',
                '응답률 95% (업계 평균 60%)'
            ],
            
            improvements: [
                '사진 콘텐츠 강화 필요',
                '주말 영업시간 정보 업데이트',
                '메뉴 설명 상세화'
            ]
        };
    }

    /**
     * 액션 플랜 생성
     */
    async generateActionPlan(store, analytics) {
        const growth = parseFloat(analytics.kpi.monthlyGrowth);
        
        return {
            immediate: [
                {
                    title: '네이버 플레이스 최적화',
                    priority: 'high',
                    estimatedTime: '1주',
                    expectedImpact: '방문자 +20%',
                    tasks: [
                        '매장 사진 10장 이상 업로드',
                        '메뉴 상세 정보 입력',
                        '영업시간 정확히 업데이트'
                    ]
                },
                {
                    title: 'SNS 콘텐츠 강화',
                    priority: 'high',
                    estimatedTime: '2주',
                    expectedImpact: '인스타그램 유입 +30%',
                    tasks: [
                        '일 1회 스토리 업로드',
                        '릴스 콘텐츠 주 2회 제작',
                        '해시태그 전략 재정비'
                    ]
                }
            ],
            
            shortTerm: [
                {
                    title: '고객 리뷰 관리 시스템',
                    priority: 'medium',
                    estimatedTime: '1개월',
                    expectedImpact: '평점 +0.2점',
                    tasks: [
                        '리뷰 응답 템플릿 작성',
                        '부정 리뷰 대응 프로세스',
                        '리뷰 이벤트 기획'
                    ]
                },
                {
                    title: '블로그 콘텐츠 마케팅',
                    priority: 'medium',
                    estimatedTime: '1개월',
                    expectedImpact: '검색 유입 +25%',
                    tasks: [
                        '업종별 키워드 리서치',
                        '월 8개 포스팅 발행',
                        'SEO 최적화 적용'
                    ]
                }
            ],
            
            longTerm: [
                {
                    title: '브랜딩 강화',
                    priority: 'low',
                    estimatedTime: '3개월',
                    expectedImpact: '브랜드 인지도 향상',
                    tasks: [
                        'VI(Visual Identity) 정립',
                        '브랜드 스토리텔링',
                        '차별화 포인트 개발'
                    ]
                }
            ],
            
            budget: {
                monthly: 500000,
                breakdown: [
                    { item: 'SNS 광고', amount: 200000 },
                    { item: '콘텐츠 제작', amount: 150000 },
                    { item: '리뷰 이벤트', amount: 100000 },
                    { item: '기타', amount: 50000 }
                ]
            }
        };
    }

    /**
     * 요약 정보 생성
     */
    generateSummary(analytics, botResults) {
        const completedBots = botResults.filter(b => b.status === 'completed').length;
        
        return {
            title: '이번 달 마케팅 성과',
            highlights: [
                `총 방문자 ${analytics.kpi.totalVisitors.toLocaleString()}명 (${analytics.kpi.monthlyGrowth})`,
                `${completedBots}개 AI 마케팅 봇 자동 실행 완료`,
                `전환율 ${analytics.conversionRate.current}% 달성`,
                `매출 ${(analytics.kpi.totalRevenue / 10000).toFixed(0)}만원 기록`
            ],
            topAchievements: [
                {
                    metric: '방문자 증가율',
                    value: analytics.kpi.monthlyGrowth,
                    status: 'success'
                },
                {
                    metric: 'AI 봇 실행',
                    value: `${completedBots}/30개`,
                    status: 'success'
                },
                {
                    metric: '고객 유지율',
                    value: analytics.kpi.customerRetention,
                    status: 'good'
                }
            ]
        };
    }

    // ==================== 유틸리티 함수 ====================

    getIndustryName(industry) {
        const industries = {
            cafe: '카페',
            chicken: '치킨',
            korean: '한식',
            beauty: '미용실',
            pizza: '피자',
            dessert: '디저트',
            other: '기타'
        };
        return industries[industry] || '기타';
    }

    generateBotResult(bot, store) {
        const templates = {
            1: `${store.name}의 독특한 브랜드 스토리를 분석했습니다. 주요 키워드: 지역밀착형, 품질중심, 고객만족`,
            2: `${store.industryName} 업종 맞춤 경쟁력 분석 완료. 차별화 포인트 3가지 도출`,
            3: `타겟 고객층: 20-30대 여성 (45%), 직장인 (30%), 가족단위 (25%)`,
            4: `지역 기반 마케팅 전략: ${store.location} 상권 특성 반영`,
            5: `네이버 플레이스 최적화 제안 7가지 완성`,
            // ... 나머지 봇들도 유사하게
        };
        
        return templates[bot.id] || `${bot.name} 실행 완료. ${store.industryName} 업종 맞춤 결과 생성됨`;
    }

    calculateBotImpact(bot) {
        const impacts = ['높음', '중간', '낮음'];
        return impacts[Math.floor(Math.random() * impacts.length)];
    }

    suggestNextAction(bot, store) {
        return `제안된 ${bot.name} 전략을 1주일 내 실행 권장`;
    }

    getReportPeriod() {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        
        return {
            year: now.getFullYear(),
            month: now.getMonth() + 1,
            start: start.toISOString().split('T')[0],
            end: end.toISOString().split('T')[0],
            label: `${now.getFullYear()}년 ${now.getMonth() + 1}월`
        };
    }

    getLast30Days() {
        const days = [];
        for (let i = 29; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            days.push(date.toISOString().split('T')[0]);
        }
        return days;
    }

    getWeeklyData(days, generator) {
        const weeks = [];
        for (let i = 0; i < 4; i++) {
            weeks.push(generator(i + 1));
        }
        return weeks;
    }
}

// 전역 인스턴스 생성
window.reportDataCollector = new ReportDataCollector();
console.log('✅ ReportDataCollector 초기화 완료');
