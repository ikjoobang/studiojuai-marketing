/**
 * ========================================
 * 📊 PPT 자동 생성 시스템
 * Studiojuai 마케팅 최적화 플랫폼
 * ========================================
 * 
 * PptxGenJS 라이브러리를 사용한 전문 보고서 생성
 * - 37페이지 완성형 보고서
 * - Studiojuai 브랜딩 적용
 * - 차트, 표, 이미지 자동 생성
 */

class PPTGenerator {
    constructor() {
        this.pptx = null;
        this.theme = this.initTheme();
        this.reportData = null;
    }

    /**
     * Studiojuai 디자인 테마
     */
    initTheme() {
        return {
            colors: {
                primary: '667eea',      // 브랜드 컬러
                dark: '000000',         // 다크 배경
                light: 'F8F9FB',        // 라이트 배경
                white: 'FFFFFF',
                gray: 'B0B0B0',
                success: '10B981',
                warning: 'F59E0B',
                danger: 'EF4444'
            },
            fonts: {
                title: { 
                    face: 'Malgun Gothic', 
                    size: 36, 
                    bold: true,
                    color: 'FFFFFF'
                },
                subtitle: { 
                    face: 'Malgun Gothic', 
                    size: 24, 
                    bold: true,
                    color: 'FFFFFF'
                },
                body: { 
                    face: 'Malgun Gothic', 
                    size: 16,
                    color: 'FFFFFF'
                },
                small: { 
                    face: 'Malgun Gothic', 
                    size: 12,
                    color: 'CCCCCC'
                }
            },
            layout: {
                margin: 0.5,
                titleY: 0.5,
                contentY: 1.5,
                spacing: 0.3
            }
        };
    }

    /**
     * PPT 보고서 생성 메인 함수
     * @param {string} storeId - 매장 ID
     */
    async generateReport(storeId) {
        console.log('🚀 PPT 보고서 생성 시작...');
        
        try {
            // 1. 데이터 수집
            this.reportData = await window.reportDataCollector.collectFullReport(storeId);
            
            // 2. PPT 인스턴스 생성
            this.pptx = new PptxGenJS();
            this.pptx.author = 'Studiojuai';
            this.pptx.company = 'Studiojuai';
            this.pptx.subject = `${this.reportData.store.name} 마케팅 분석 보고서`;
            this.pptx.title = this.pptx.subject;
            
            // 3. 슬라이드 생성
            this.addCoverSlide();                    // 표지
            this.addTableOfContents();               // 목차
            this.addExecutiveSummary();              // 요약
            this.addKPIDashboard();                  // 핵심 지표
            this.addAnalyticsSlides();               // 분석 데이터 (3-4장)
            this.addBotResultsSlides();              // AI 봇 결과 (30장)
            this.addCompetitorAnalysis();            // 경쟁사 분석
            this.addActionPlanSlides();              // 액션 플랜 (2-3장)
            this.addRevenueImpactSlides();           // ✨ 매출 상승 효과 (NEW)
            this.addNaverPlaceGuideSlides();         // ✨ 네이버 플레이스 실행 가이드 (NEW)
            this.addActionChecklistSlide();          // ✨ 즉시 실행 체크리스트 (NEW)
            this.addContactSlide();                  // 문의하기
            
            // 4. 파일 다운로드
            const fileName = `Studiojuai_${this.reportData.store.name}_${this.getDateString()}.pptx`;
            await this.pptx.writeFile({ fileName: fileName });
            
            console.log(`✅ PPT 생성 완료: ${fileName}`);
            return { success: true, fileName: fileName };
            
        } catch (error) {
            console.error('❌ PPT 생성 실패:', error);
            throw error;
        }
    }

    // ==================== 슬라이드 생성 함수들 ====================

    /**
     * 1. 표지 슬라이드
     */
    addCoverSlide() {
        const slide = this.pptx.addSlide();
        slide.background = { color: this.theme.colors.dark };
        
        // 제목
        slide.addText('Studiojuai', {
            x: 0.5, y: 2.0, w: 9, h: 0.8,
            fontSize: 54,
            bold: true,
            color: this.theme.colors.primary,
            align: 'center'
        });
        
        slide.addText('마케팅 분석 보고서', {
            x: 0.5, y: 2.9, w: 9, h: 0.6,
            fontSize: 36,
            color: this.theme.colors.white,
            align: 'center'
        });
        
        // 매장명
        slide.addText(this.reportData.store.name, {
            x: 0.5, y: 3.8, w: 9, h: 0.5,
            fontSize: 28,
            color: this.theme.colors.primary,
            align: 'center',
            bold: true
        });
        
        // 업종
        slide.addText(`${this.reportData.store.industryName} | ${this.reportData.store.location}`, {
            x: 0.5, y: 4.4, w: 9, h: 0.3,
            fontSize: 16,
            color: this.theme.colors.gray,
            align: 'center'
        });
        
        // 보고 기간
        slide.addText(this.reportData.metadata.reportPeriod.label, {
            x: 0.5, y: 5.0, w: 9, h: 0.3,
            fontSize: 18,
            color: this.theme.colors.white,
            align: 'center'
        });
        
        // 하단 이메일
        slide.addText('@studiojuai.com', {
            x: 0.5, y: 7.0, w: 9, h: 0.2,
            fontSize: 12,
            color: this.theme.colors.gray,
            align: 'center'
        });
    }

    /**
     * 2. 목차
     */
    addTableOfContents() {
        const slide = this.pptx.addSlide();
        slide.background = { color: this.theme.colors.dark };
        
        slide.addText('목차', {
            x: 0.5, y: 0.5, w: 9, h: 0.6,
            ...this.theme.fonts.title
        });
        
        const contents = [
            { num: '01', title: '핵심 지표 요약', page: '3' },
            { num: '02', title: 'AI 마케팅 자동화 결과', page: '4-33' },
            { num: '03', title: '경쟁사 분석', page: '34' },
            { num: '04', title: '고객 분석', page: '35' },
            { num: '05', title: '다음 달 액션 플랜', page: '36' },
            { num: '06', title: '문의하기', page: '37' }
        ];
        
        let yPos = 1.8;
        contents.forEach(item => {
            // 번호
            slide.addText(item.num, {
                x: 1.0, y: yPos, w: 1.0, h: 0.4,
                fontSize: 24,
                bold: true,
                color: this.theme.colors.primary
            });
            
            // 제목
            slide.addText(item.title, {
                x: 2.2, y: yPos, w: 5.5, h: 0.4,
                fontSize: 18,
                color: this.theme.colors.white
            });
            
            // 페이지
            slide.addText(item.page, {
                x: 8.0, y: yPos, w: 1.0, h: 0.4,
                fontSize: 16,
                color: this.theme.colors.gray,
                align: 'right'
            });
            
            yPos += 0.7;
        });
    }

    /**
     * 3. 요약 (Executive Summary)
     */
    addExecutiveSummary() {
        const slide = this.pptx.addSlide();
        slide.background = { color: this.theme.colors.dark };
        
        slide.addText('핵심 요약', {
            x: 0.5, y: 0.5, w: 9, h: 0.6,
            ...this.theme.fonts.title
        });
        
        const summary = this.reportData.summary;
        
        // 주요 성과
        let yPos = 1.5;
        summary.highlights.forEach((highlight, index) => {
            slide.addText(`✓ ${highlight}`, {
                x: 1.0, y: yPos, w: 8.0, h: 0.4,
                fontSize: 16,
                color: this.theme.colors.white
            });
            yPos += 0.6;
        });
        
        // 성과 카드들
        yPos = 4.0;
        const achievements = summary.topAchievements;
        const cardWidth = 2.8;
        const cardSpacing = 0.2;
        
        achievements.forEach((ach, index) => {
            const xPos = 0.8 + (index * (cardWidth + cardSpacing));
            
            // 카드 배경
            slide.addShape(this.pptx.ShapeType.rect, {
                x: xPos, y: yPos, w: cardWidth, h: 1.8,
                fill: { color: '1a1a1a' },
                line: { color: this.theme.colors.primary, width: 1 }
            });
            
            // 지표명
            slide.addText(ach.metric, {
                x: xPos, y: yPos + 0.3, w: cardWidth, h: 0.3,
                fontSize: 12,
                color: this.theme.colors.gray,
                align: 'center'
            });
            
            // 값
            slide.addText(ach.value, {
                x: xPos, y: yPos + 0.8, w: cardWidth, h: 0.5,
                fontSize: 24,
                bold: true,
                color: this.theme.colors.primary,
                align: 'center'
            });
        });
    }

    /**
     * 4. KPI 대시보드
     */
    addKPIDashboard() {
        const slide = this.pptx.addSlide();
        slide.background = { color: this.theme.colors.dark };
        
        slide.addText('핵심 성과 지표', {
            x: 0.5, y: 0.5, w: 9, h: 0.6,
            ...this.theme.fonts.title
        });
        
        const kpi = this.reportData.analytics.kpi;
        
        // KPI 카드 그리드
        const kpiData = [
            { label: '총 방문자', value: kpi.totalVisitors.toLocaleString(), unit: '명', color: this.theme.colors.primary },
            { label: '총 매출', value: (kpi.totalRevenue / 10000).toFixed(0), unit: '만원', color: this.theme.colors.success },
            { label: '평균 주문가', value: (kpi.avgOrderValue / 1000).toFixed(0), unit: '천원', color: this.theme.colors.warning },
            { label: '고객 유지율', value: kpi.customerRetention, unit: '', color: this.theme.colors.primary },
            { label: '월 성장률', value: kpi.monthlyGrowth, unit: '', color: this.theme.colors.success },
            { label: '전환율', value: this.reportData.analytics.conversionRate.current, unit: '%', color: this.theme.colors.warning }
        ];
        
        let row = 0, col = 0;
        const cardW = 3.0, cardH = 1.6;
        const startX = 0.8, startY = 1.8;
        const gapX = 0.2, gapY = 0.3;
        
        kpiData.forEach((item, index) => {
            row = Math.floor(index / 3);
            col = index % 3;
            
            const x = startX + (col * (cardW + gapX));
            const y = startY + (row * (cardH + gapY));
            
            // 카드 배경
            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: y, w: cardW, h: cardH,
                fill: { color: '1a1a1a' },
                line: { color: item.color, width: 2 }
            });
            
            // 라벨
            slide.addText(item.label, {
                x: x, y: y + 0.3, w: cardW, h: 0.3,
                fontSize: 12,
                color: this.theme.colors.gray,
                align: 'center'
            });
            
            // 값
            slide.addText(`${item.value}${item.unit}`, {
                x: x, y: y + 0.7, w: cardW, h: 0.5,
                fontSize: 28,
                bold: true,
                color: item.color,
                align: 'center'
            });
        });
    }

    /**
     * 5. 분석 데이터 슬라이드들
     */
    addAnalyticsSlides() {
        // 5-1. 방문자 추이 차트
        this.addVisitorTrendChart();
        
        // 5-2. 트래픽 소스
        this.addTrafficSourceChart();
        
        // 5-3. 인기 콘텐츠
        this.addTopContentTable();
    }

    addVisitorTrendChart() {
        const slide = this.pptx.addSlide();
        slide.background = { color: this.theme.colors.dark };
        
        slide.addText('방문자 추이 분석', {
            x: 0.5, y: 0.5, w: 9, h: 0.6,
            ...this.theme.fonts.title
        });
        
        const dailyData = this.reportData.analytics.dailyVisitors;
        const last7Days = dailyData.slice(-7);
        
        const chartData = [{
            name: '일별 방문자',
            labels: last7Days.map(d => d.date.split('-')[2] + '일'),
            values: last7Days.map(d => d.visitors)
        }];
        
        slide.addChart(this.pptx.ChartType.line, chartData, {
            x: 1.0, y: 1.5, w: 8.0, h: 4.5,
            chartColors: [this.theme.colors.primary],
            showLegend: true,
            showTitle: false,
            valAxisMaxVal: Math.max(...last7Days.map(d => d.visitors)) + 20
        });
    }

    addTrafficSourceChart() {
        const slide = this.pptx.addSlide();
        slide.background = { color: this.theme.colors.dark };
        
        slide.addText('트래픽 소스 분석', {
            x: 0.5, y: 0.5, w: 9, h: 0.6,
            ...this.theme.fonts.title
        });
        
        const sources = this.reportData.analytics.trafficSources;
        
        const chartData = [{
            name: '트래픽 소스',
            labels: sources.map(s => s.source),
            values: sources.map(s => s.percentage)
        }];
        
        slide.addChart(this.pptx.ChartType.pie, chartData, {
            x: 1.5, y: 1.5, w: 7.0, h: 4.5,
            chartColors: ['667eea', '10B981', 'F59E0B', 'EF4444', '6B7280'],
            showLegend: true,
            showTitle: false,
            showPercent: true
        });
    }

    addTopContentTable() {
        const slide = this.pptx.addSlide();
        slide.background = { color: this.theme.colors.dark };
        
        slide.addText('인기 콘텐츠 Top 5', {
            x: 0.5, y: 0.5, w: 9, h: 0.6,
            ...this.theme.fonts.title
        });
        
        const content = this.reportData.analytics.topContent;
        
        const tableData = [
            [
                { text: '순위', options: { bold: true, color: this.theme.colors.primary, fill: '1a1a1a' } },
                { text: '콘텐츠', options: { bold: true, color: this.theme.colors.primary, fill: '1a1a1a' } },
                { text: '조회수', options: { bold: true, color: this.theme.colors.primary, fill: '1a1a1a' } },
                { text: '참여도', options: { bold: true, color: this.theme.colors.primary, fill: '1a1a1a' } }
            ]
        ];
        
        content.forEach((item, index) => {
            tableData.push([
                { text: `${index + 1}`, options: { color: 'FFFFFF' } },
                { text: item.title, options: { color: 'FFFFFF' } },
                { text: item.views.toLocaleString(), options: { color: 'FFFFFF' } },
                { text: item.engagement, options: { color: this.getEngagementColor(item.engagement) } }
            ]);
        });
        
        slide.addTable(tableData, {
            x: 1.0, y: 1.8, w: 8.0, h: 4.0,
            colW: [1.0, 3.5, 2.0, 1.5],
            border: { color: '333333', pt: 1 },
            fill: '000000',
            fontSize: 14
        });
    }

    /**
     * 6. AI 봇 결과 슬라이드들 (30개)
     */
    addBotResultsSlides() {
        const botResults = this.reportData.botResults;
        
        // 카테고리별로 그룹화
        const categories = {};
        botResults.forEach(bot => {
            if (!categories[bot.category]) {
                categories[bot.category] = [];
            }
            categories[bot.category].push(bot);
        });
        
        // 카테고리별 섹션 슬라이드 + 봇 슬라이드
        Object.entries(categories).forEach(([category, bots]) => {
            // 카테고리 섹션 슬라이드
            this.addCategorySection(category);
            
            // 각 봇 슬라이드
            bots.forEach(bot => {
                this.addBotResultSlide(bot);
            });
        });
    }

    addCategorySection(category) {
        const slide = this.pptx.addSlide();
        slide.background = { color: this.theme.colors.primary };
        
        const categoryNames = {
            analysis: '분석 및 전략',
            content: '콘텐츠 제작',
            marketing: '마케팅 실행',
            customer: '고객 관리',
            performance: '성과 측정'
        };
        
        slide.addText(categoryNames[category] || category, {
            x: 1.0, y: 3.0, w: 8.0, h: 1.0,
            fontSize: 48,
            bold: true,
            color: 'FFFFFF',
            align: 'center'
        });
    }

    addBotResultSlide(bot) {
        const slide = this.pptx.addSlide();
        slide.background = { color: this.theme.colors.dark };
        
        // 봇 번호와 이름
        slide.addText(`Bot ${bot.id}`, {
            x: 0.5, y: 0.5, w: 2.0, h: 0.4,
            fontSize: 16,
            color: this.theme.colors.primary,
            bold: true
        });
        
        slide.addText(bot.name, {
            x: 0.5, y: 0.9, w: 9.0, h: 0.6,
            fontSize: 28,
            color: this.theme.colors.white,
            bold: true
        });
        
        // 설명
        slide.addText(bot.description, {
            x: 0.5, y: 1.7, w: 9.0, h: 0.4,
            fontSize: 14,
            color: this.theme.colors.gray
        });
        
        // 실행 결과 박스
        slide.addShape(this.pptx.ShapeType.rect, {
            x: 0.8, y: 2.5, w: 8.4, h: 2.5,
            fill: { color: '1a1a1a' },
            line: { color: this.theme.colors.primary, width: 1 }
        });
        
        slide.addText(bot.result, {
            x: 1.2, y: 2.8, w: 7.6, h: 2.0,
            fontSize: 14,
            color: this.theme.colors.white,
            valign: 'top'
        });
        
        // 하단 정보
        const infoY = 5.5;
        
        // 영향도
        slide.addText('영향도:', {
            x: 1.0, y: infoY, w: 1.5, h: 0.3,
            fontSize: 12,
            color: this.theme.colors.gray
        });
        
        slide.addText(bot.impact, {
            x: 2.5, y: infoY, w: 2.0, h: 0.3,
            fontSize: 12,
            bold: true,
            color: this.getImpactColor(bot.impact)
        });
        
        // 다음 액션
        slide.addText('Next Action:', {
            x: 1.0, y: infoY + 0.5, w: 1.5, h: 0.3,
            fontSize: 12,
            color: this.theme.colors.gray
        });
        
        slide.addText(bot.nextAction, {
            x: 2.5, y: infoY + 0.5, w: 6.0, h: 0.3,
            fontSize: 12,
            color: this.theme.colors.white
        });
    }

    /**
     * 7. 경쟁사 분석
     */
    addCompetitorAnalysis() {
        const slide = this.pptx.addSlide();
        slide.background = { color: this.theme.colors.dark };
        
        slide.addText('경쟁사 분석', {
            x: 0.5, y: 0.5, w: 9, h: 0.6,
            ...this.theme.fonts.title
        });
        
        const comp = this.reportData.competitors;
        
        // 현재 순위
        slide.addText(`네이버 플레이스 순위: ${comp.yourStore.rank}위 / ${comp.totalCompetitors}개`, {
            x: 1.0, y: 1.5, w: 8.0, h: 0.4,
            fontSize: 18,
            color: this.theme.colors.white,
            bold: true
        });
        
        // 경쟁사 비교 표
        const tableData = [
            [
                { text: '순위', options: { bold: true, color: this.theme.colors.primary, fill: '1a1a1a' } },
                { text: '매장명', options: { bold: true, color: this.theme.colors.primary, fill: '1a1a1a' } },
                { text: '평점', options: { bold: true, color: this.theme.colors.primary, fill: '1a1a1a' } },
                { text: '리뷰수', options: { bold: true, color: this.theme.colors.primary, fill: '1a1a1a' } }
            ],
            [
                { text: `${comp.yourStore.rank}위`, options: { bold: true, color: this.theme.colors.success } },
                { text: comp.yourStore.name + ' (우리)', options: { bold: true, color: this.theme.colors.success } },
                { text: comp.yourStore.rating.toString(), options: { color: 'FFFFFF' } },
                { text: comp.yourStore.reviews.toString(), options: { color: 'FFFFFF' } }
            ]
        ];
        
        comp.topCompetitors.forEach(c => {
            tableData.push([
                { text: `${c.rank}위`, options: { color: 'FFFFFF' } },
                { text: c.name, options: { color: 'FFFFFF' } },
                { text: c.rating.toString(), options: { color: 'FFFFFF' } },
                { text: c.reviews.toString(), options: { color: 'FFFFFF' } }
            ]);
        });
        
        slide.addTable(tableData, {
            x: 1.0, y: 2.2, w: 8.0, h: 2.5,
            colW: [1.5, 3.5, 1.5, 1.5],
            border: { color: '333333', pt: 1 },
            fill: '000000',
            fontSize: 13
        });
        
        // 강점
        slide.addText('강점', {
            x: 1.0, y: 5.0, w: 3.5, h: 0.4,
            fontSize: 16,
            bold: true,
            color: this.theme.colors.success
        });
        
        let yPos = 5.5;
        comp.strengths.forEach(strength => {
            slide.addText(`✓ ${strength}`, {
                x: 1.0, y: yPos, w: 3.5, h: 0.3,
                fontSize: 11,
                color: this.theme.colors.white
            });
            yPos += 0.35;
        });
        
        // 개선사항
        slide.addText('개선 필요', {
            x: 5.5, y: 5.0, w: 3.5, h: 0.4,
            fontSize: 16,
            bold: true,
            color: this.theme.colors.warning
        });
        
        yPos = 5.5;
        comp.improvements.forEach(improvement => {
            slide.addText(`⚠ ${improvement}`, {
                x: 5.5, y: yPos, w: 3.5, h: 0.3,
                fontSize: 11,
                color: this.theme.colors.white
            });
            yPos += 0.35;
        });
    }

    /**
     * 8. 액션 플랜 슬라이드들
     */
    addActionPlanSlides() {
        const plan = this.reportData.actionPlan;
        
        // 즉시 실행 항목
        this.addActionPlanSlide('즉시 실행 (1-2주)', plan.immediate, this.theme.colors.danger);
        
        // 단기 목표
        this.addActionPlanSlide('단기 목표 (1개월)', plan.shortTerm, this.theme.colors.warning);
        
        // 장기 목표
        this.addActionPlanSlide('장기 목표 (3개월)', plan.longTerm, this.theme.colors.primary);
        
        // 예산 계획
        this.addBudgetSlide(plan.budget);
    }

    addActionPlanSlide(title, actions, color) {
        const slide = this.pptx.addSlide();
        slide.background = { color: this.theme.colors.dark };
        
        slide.addText(title, {
            x: 0.5, y: 0.5, w: 9, h: 0.6,
            fontSize: 28,
            bold: true,
            color: color
        });
        
        let yPos = 1.5;
        actions.forEach((action, index) => {
            // 액션 카드
            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.8, y: yPos, w: 8.4, h: 1.8,
                fill: { color: '1a1a1a' },
                line: { color: color, width: 2 }
            });
            
            // 제목
            slide.addText(`${index + 1}. ${action.title}`, {
                x: 1.2, y: yPos + 0.2, w: 7.6, h: 0.3,
                fontSize: 16,
                bold: true,
                color: color
            });
            
            // 상세 정보
            const details = `우선순위: ${action.priority.toUpperCase()} | 소요기간: ${action.estimatedTime} | 예상 효과: ${action.expectedImpact}`;
            slide.addText(details, {
                x: 1.2, y: yPos + 0.6, w: 7.6, h: 0.25,
                fontSize: 11,
                color: this.theme.colors.gray
            });
            
            // 세부 과제
            const tasks = action.tasks.join(' / ');
            slide.addText(tasks, {
                x: 1.2, y: yPos + 1.0, w: 7.6, h: 0.6,
                fontSize: 12,
                color: this.theme.colors.white
            });
            
            yPos += 2.1;
        });
    }

    addBudgetSlide(budget) {
        const slide = this.pptx.addSlide();
        slide.background = { color: this.theme.colors.dark };
        
        slide.addText('마케팅 예산 계획', {
            x: 0.5, y: 0.5, w: 9, h: 0.6,
            ...this.theme.fonts.title
        });
        
        // 총 예산
        slide.addText(`월 ${(budget.monthly / 10000).toFixed(0)}만원`, {
            x: 1.0, y: 1.5, w: 8.0, h: 0.6,
            fontSize: 32,
            bold: true,
            color: this.theme.colors.primary,
            align: 'center'
        });
        
        // 예산 분배 차트
        const chartData = [{
            name: '예산 분배',
            labels: budget.breakdown.map(b => b.item),
            values: budget.breakdown.map(b => b.amount / 1000)  // 천원 단위
        }];
        
        slide.addChart(this.pptx.ChartType.bar, chartData, {
            x: 1.5, y: 2.8, w: 7.0, h: 3.5,
            chartColors: [this.theme.colors.primary],
            barDir: 'bar',
            showLegend: false,
            showTitle: false,
            valAxisTitle: '금액 (천원)'
        });
    }

    /**
     * 9. 매출 상승 직결 효과 (신규)
     */
    addRevenueImpactSlides() {
        const slide = this.pptx.addSlide();
        slide.background = { color: this.theme.colors.dark };
        
        // 타이틀
        slide.addText('💰 예상 매출 상승 효과', {
            x: 0.5, y: 0.5, w: 9, h: 0.6,
            fontSize: 36,
            bold: true,
            color: '10B981'  // 녹색
        });
        
        // Before (현재 상황)
        slide.addShape(this.pptx.ShapeType.rect, {
            x: 0.8, y: 1.5, w: 4.0, h: 2.0,
            fill: { color: '1a1a1a' },
            line: { color: 'EF4444', width: 2 }
        });
        
        slide.addText('❌ Before (현재)', {
            x: 1.0, y: 1.7, w: 3.6, h: 0.4,
            fontSize: 20,
            bold: true,
            color: 'EF4444'
        });
        
        slide.addText([
            { text: '• 네이버 검색 노출: ', options: { fontSize: 14, color: 'CCCCCC' } },
            { text: '0%', options: { fontSize: 18, bold: true, color: 'EF4444' } },
            { text: '\n• 월 방문자: ', options: { fontSize: 14, color: 'CCCCCC' } },
            { text: '약 50명', options: { fontSize: 18, bold: true, color: 'EF4444' } },
            { text: '\n• 월 예상 매출: ', options: { fontSize: 14, color: 'CCCCCC' } },
            { text: '기존 수준', options: { fontSize: 18, bold: true, color: 'EF4444' } }
        ], {
            x: 1.0, y: 2.3, w: 3.6, h: 1.0
        });
        
        // 화살표
        slide.addText('⇨', {
            x: 4.5, y: 2.4, w: 1.0, h: 0.6,
            fontSize: 48,
            bold: true,
            color: 'FFFFFF',
            align: 'center'
        });
        
        // After (개선 후)
        slide.addShape(this.pptx.ShapeType.rect, {
            x: 5.2, y: 1.5, w: 4.0, h: 2.0,
            fill: { color: '1a1a1a' },
            line: { color: '10B981', width: 2 }
        });
        
        slide.addText('✅ After (개선 후)', {
            x: 5.4, y: 1.7, w: 3.6, h: 0.4,
            fontSize: 20,
            bold: true,
            color: '10B981'
        });
        
        slide.addText([
            { text: '• 네이버 검색 노출: ', options: { fontSize: 14, color: 'CCCCCC' } },
            { text: '1~3페이지', options: { fontSize: 18, bold: true, color: '10B981' } },
            { text: '\n• 월 방문자: ', options: { fontSize: 14, color: 'CCCCCC' } },
            { text: '약 200~300명', options: { fontSize: 18, bold: true, color: '10B981' } },
            { text: '\n• 월 예상 매출: ', options: { fontSize: 14, color: 'CCCCCC' } },
            { text: '+20~30% 증가', options: { fontSize: 18, bold: true, color: '10B981' } }
        ], {
            x: 5.4, y: 2.3, w: 3.6, h: 1.0
        });
        
        // 핵심 메시지
        slide.addShape(this.pptx.ShapeType.rect, {
            x: 1.5, y: 4.0, w: 7.0, h: 2.5,
            fill: { color: '667eea' },
            line: { color: '667eea', width: 0 }
        });
        
        slide.addText('🎯 실행하면 달라지는 것들', {
            x: 1.5, y: 4.3, w: 7.0, h: 0.4,
            fontSize: 22,
            bold: true,
            color: 'FFFFFF',
            align: 'center'
        });
        
        slide.addText([
            { text: '✓ ', options: { fontSize: 16, color: 'FFFFFF' } },
            { text: '네이버 플레이스 상위 노출', options: { fontSize: 16, bold: true, color: 'FFFFFF' } },
            { text: ' → 검색 유입 4배 증가\n', options: { fontSize: 16, color: 'FFFFFF' } },
            { text: '✓ ', options: { fontSize: 16, color: 'FFFFFF' } },
            { text: '리뷰 관리 자동화', options: { fontSize: 16, bold: true, color: 'FFFFFF' } },
            { text: ' → 고객 신뢰도 상승\n', options: { fontSize: 16, color: 'FFFFFF' } },
            { text: '✓ ', options: { fontSize: 16, color: 'FFFFFF' } },
            { text: 'SNS 콘텐츠 업로드', options: { fontSize: 16, bold: true, color: 'FFFFFF' } },
            { text: ' → 방문 예약 2배 증가\n', options: { fontSize: 16, color: 'FFFFFF' } },
            { text: '✓ ', options: { fontSize: 16, color: 'FFFFFF' } },
            { text: '메뉴/서비스 최적화', options: { fontSize: 16, bold: true, color: 'FFFFFF' } },
            { text: ' → 객단가 15% 상승', options: { fontSize: 16, color: 'FFFFFF' } }
        ], {
            x: 2.0, y: 4.9, w: 6.0, h: 1.4,
            valign: 'top'
        });
    }

    /**
     * 10. 네이버 플레이스 실행 가이드 (신규)
     */
    addNaverPlaceGuideSlides() {
        // 가이드 소개 슬라이드
        this.addNaverGuideIntro();
        
        // Step 1: 네이버 플레이스 접속
        this.addNaverGuideStep1();
        
        // Step 2: 정보 수정
        this.addNaverGuideStep2();
        
        // Step 3: 사진 업로드
        this.addNaverGuideStep3();
        
        // Step 4: 리뷰 관리
        this.addNaverGuideStep4();
    }

    addNaverGuideIntro() {
        const slide = this.pptx.addSlide();
        slide.background = { color: this.theme.colors.dark };
        
        slide.addText('📱 네이버 플레이스 실행 가이드', {
            x: 0.5, y: 0.5, w: 9, h: 0.6,
            fontSize: 36,
            bold: true,
            color: '03C75A'  // 네이버 그린
        });
        
        slide.addText('이 보고서의 제안을 네이버 플레이스에서 직접 실행하는 방법', {
            x: 0.5, y: 1.3, w: 9, h: 0.4,
            fontSize: 18,
            color: 'CCCCCC',
            align: 'center'
        });
        
        // 4단계 프로세스
        const steps = [
            { num: '1', title: '플레이스 접속', desc: '스마트플레이스\n관리자 로그인' },
            { num: '2', title: '정보 수정', desc: '영업시간, 메뉴,\n소개글 업데이트' },
            { num: '3', title: '사진 업로드', desc: '매장 사진, 메뉴판\n고화질 이미지 등록' },
            { num: '4', title: '리뷰 관리', desc: '고객 리뷰에\n즉시 답변 작성' }
        ];
        
        steps.forEach((step, index) => {
            const x = 1.0 + (index * 2.1);
            const y = 2.5;
            
            // 스텝 번호
            slide.addShape(this.pptx.ShapeType.ellipse, {
                x: x + 0.4, y: y, w: 1.0, h: 1.0,
                fill: { color: '03C75A' }
            });
            
            slide.addText(step.num, {
                x: x + 0.4, y: y + 0.3, w: 1.0, h: 0.4,
                fontSize: 32,
                bold: true,
                color: 'FFFFFF',
                align: 'center'
            });
            
            // 타이틀
            slide.addText(step.title, {
                x: x, y: y + 1.2, w: 1.8, h: 0.4,
                fontSize: 14,
                bold: true,
                color: 'FFFFFF',
                align: 'center'
            });
            
            // 설명
            slide.addText(step.desc, {
                x: x, y: y + 1.7, w: 1.8, h: 0.8,
                fontSize: 11,
                color: 'CCCCCC',
                align: 'center'
            });
        });
        
        // 하단 메시지
        slide.addShape(this.pptx.ShapeType.rect, {
            x: 1.5, y: 5.5, w: 7.0, h: 1.0,
            fill: { color: '667eea' }
        });
        
        slide.addText('💡 각 단계별 상세 가이드는 다음 슬라이드에서 확인하세요', {
            x: 1.5, y: 5.8, w: 7.0, h: 0.4,
            fontSize: 16,
            bold: true,
            color: 'FFFFFF',
            align: 'center'
        });
    }

    addNaverGuideStep1() {
        const slide = this.pptx.addSlide();
        slide.background = { color: this.theme.colors.dark };
        
        slide.addText('Step 1: 네이버 플레이스 접속', {
            x: 0.5, y: 0.5, w: 9, h: 0.6,
            fontSize: 28,
            bold: true,
            color: '03C75A'
        });
        
        // 접속 방법
        slide.addShape(this.pptx.ShapeType.rect, {
            x: 0.8, y: 1.5, w: 8.4, h: 4.5,
            fill: { color: '1a1a1a' },
            line: { color: '03C75A', width: 2 }
        });
        
        slide.addText([
            { text: '1️⃣ PC에서 접속\n', options: { fontSize: 18, bold: true, color: '03C75A' } },
            { text: '   🔗 ', options: { fontSize: 14, color: 'FFFFFF' } },
            { text: 'https://business.naver.com\n\n', options: { fontSize: 14, color: '667eea', underline: true } },
            
            { text: '2️⃣ 로그인\n', options: { fontSize: 18, bold: true, color: '03C75A' } },
            { text: '   • 네이버 아이디로 로그인\n', options: { fontSize: 14, color: 'FFFFFF' } },
            { text: '   • 사업자 인증 완료 확인\n\n', options: { fontSize: 14, color: 'FFFFFF' } },
            
            { text: '3️⃣ 매장 선택\n', options: { fontSize: 18, bold: true, color: '03C75A' } },
            { text: '   • 좌측 메뉴에서 "내 비즈니스" 클릭\n', options: { fontSize: 14, color: 'FFFFFF' } },
            { text: '   • 관리할 매장 선택\n\n', options: { fontSize: 14, color: 'FFFFFF' } },
            
            { text: '4️⃣ 관리 페이지 진입\n', options: { fontSize: 18, bold: true, color: '03C75A' } },
            { text: '   • "정보 수정" 메뉴 클릭\n', options: { fontSize: 14, color: 'FFFFFF' } },
            { text: '   • 수정 권한 확인', options: { fontSize: 14, color: 'FFFFFF' } }
        ], {
            x: 1.2, y: 1.8, w: 7.6, h: 4.0,
            valign: 'top'
        });
        
        // 하단 팁
        slide.addText('💡 Tip: 모바일에서는 "네이버 스마트플레이스" 앱을 다운로드하세요', {
            x: 0.8, y: 6.3, w: 8.4, h: 0.4,
            fontSize: 14,
            color: 'F59E0B',
            italic: true
        });
    }

    addNaverGuideStep2() {
        const slide = this.pptx.addSlide();
        slide.background = { color: this.theme.colors.dark };
        
        slide.addText('Step 2: 정보 수정 (핵심!)', {
            x: 0.5, y: 0.5, w: 9, h: 0.6,
            fontSize: 28,
            bold: true,
            color: '03C75A'
        });
        
        // 수정할 정보 목록
        const sections = [
            {
                title: '📝 기본 정보',
                items: [
                    '✓ 영업시간: 정확한 시간 입력 (휴무일 포함)',
                    '✓ 전화번호: 고객 문의 전화번호',
                    '✓ 주소: 정확한 도로명 주소'
                ],
                color: '667eea'
            },
            {
                title: '🍽️ 메뉴/서비스',
                items: [
                    '✓ 대표 메뉴 3~5개 등록',
                    '✓ 가격 정보 최신화',
                    '✓ 시즌 메뉴 추가/삭제'
                ],
                color: '10B981'
            },
            {
                title: '✏️ 소개글',
                items: [
                    '✓ 매장 특징 강조 (이 보고서 참고!)',
                    '✓ 키워드 자연스럽게 포함',
                    '✓ 200자 이상 작성'
                ],
                color: 'F59E0B'
            }
        ];
        
        let yPos = 1.5;
        sections.forEach(section => {
            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.8, y: yPos, w: 8.4, h: 1.4,
                fill: { color: '1a1a1a' },
                line: { color: section.color, width: 2 }
            });
            
            slide.addText(section.title, {
                x: 1.0, y: yPos + 0.15, w: 8.0, h: 0.3,
                fontSize: 16,
                bold: true,
                color: section.color
            });
            
            slide.addText(section.items.join('\n'), {
                x: 1.0, y: yPos + 0.5, w: 8.0, h: 0.8,
                fontSize: 13,
                color: 'FFFFFF'
            });
            
            yPos += 1.6;
        });
        
        // 중요 메시지
        slide.addShape(this.pptx.ShapeType.rect, {
            x: 1.5, y: yPos + 0.2, w: 7.0, h: 0.8,
            fill: { color: 'EF4444' }
        });
        
        slide.addText('⚠️ 이 보고서의 "AI 봇 분석 결과"를 참고하여 소개글을 수정하세요!', {
            x: 1.5, y: yPos + 0.4, w: 7.0, h: 0.4,
            fontSize: 15,
            bold: true,
            color: 'FFFFFF',
            align: 'center'
        });
    }

    addNaverGuideStep3() {
        const slide = this.pptx.addSlide();
        slide.background = { color: this.theme.colors.dark };
        
        slide.addText('Step 3: 사진 업로드', {
            x: 0.5, y: 0.5, w: 9, h: 0.6,
            fontSize: 28,
            bold: true,
            color: '03C75A'
        });
        
        // 사진 업로드 가이드
        slide.addShape(this.pptx.ShapeType.rect, {
            x: 0.8, y: 1.5, w: 8.4, h: 5.0,
            fill: { color: '1a1a1a' },
            line: { color: '03C75A', width: 2 }
        });
        
        slide.addText([
            { text: '📸 필수 사진 (최소 10장 이상)\n\n', options: { fontSize: 18, bold: true, color: '03C75A' } },
            
            { text: '1. 매장 외관 (3장)\n', options: { fontSize: 16, bold: true, color: 'FFFFFF' } },
            { text: '   • 낮/밤 전경, 간판 클로즈업\n\n', options: { fontSize: 13, color: 'CCCCCC' } },
            
            { text: '2. 매장 내부 (3장)\n', options: { fontSize: 16, bold: true, color: 'FFFFFF' } },
            { text: '   • 전체 인테리어, 좌석 배치, 분위기샷\n\n', options: { fontSize: 13, color: 'CCCCCC' } },
            
            { text: '3. 대표 메뉴/서비스 (4~6장)\n', options: { fontSize: 16, bold: true, color: 'FFFFFF' } },
            { text: '   • 베스트 메뉴 고화질 사진\n', options: { fontSize: 13, color: 'CCCCCC' } },
            { text: '   • 플레이팅 예쁘게 촬영\n\n', options: { fontSize: 13, color: 'CCCCCC' } },
            
            { text: '💡 사진 촬영 Tip\n', options: { fontSize: 16, bold: true, color: 'F59E0B' } },
            { text: '   ✓ 자연광 활용 (낮 12~2시)\n', options: { fontSize: 13, color: 'FFFFFF' } },
            { text: '   ✓ 스마트폰 세로/가로 모두 촬영\n', options: { fontSize: 13, color: 'FFFFFF' } },
            { text: '   ✓ 필터 사용 자제 (자연스러운 색감)\n', options: { fontSize: 13, color: 'FFFFFF' } },
            { text: '   ✓ 최소 해상도 1920x1080 이상', options: { fontSize: 13, color: 'FFFFFF' } }
        ], {
            x: 1.2, y: 1.8, w: 7.6, h: 4.6,
            valign: 'top'
        });
    }

    addNaverGuideStep4() {
        const slide = this.pptx.addSlide();
        slide.background = { color: this.theme.colors.dark };
        
        slide.addText('Step 4: 리뷰 관리', {
            x: 0.5, y: 0.5, w: 9, h: 0.6,
            fontSize: 28,
            bold: true,
            color: '03C75A'
        });
        
        // 리뷰 관리 전략
        slide.addShape(this.pptx.ShapeType.rect, {
            x: 0.8, y: 1.5, w: 4.0, h: 4.8,
            fill: { color: '1a1a1a' },
            line: { color: '10B981', width: 2 }
        });
        
        slide.addText('✅ 좋은 답변 예시', {
            x: 1.0, y: 1.7, w: 3.6, h: 0.4,
            fontSize: 18,
            bold: true,
            color: '10B981'
        });
        
        slide.addText([
            { text: '긍정 리뷰\n', options: { fontSize: 14, bold: true, color: 'FFFFFF' } },
            { text: '"방문해주셔서 감사합니다!\n', options: { fontSize: 12, color: 'CCCCCC' } },
            { text: '더 나은 서비스로 보답하겠습니다."\n\n', options: { fontSize: 12, color: 'CCCCCC' } },
            
            { text: '부정 리뷰\n', options: { fontSize: 14, bold: true, color: 'FFFFFF' } },
            { text: '"소중한 의견 감사합니다.\n', options: { fontSize: 12, color: 'CCCCCC' } },
            { text: '해당 부분 즉시 개선하겠습니다.\n', options: { fontSize: 12, color: 'CCCCCC' } },
            { text: '다음 방문 시 만족하실 수 있도록\n', options: { fontSize: 12, color: 'CCCCCC' } },
            { text: '최선을 다하겠습니다."', options: { fontSize: 12, color: 'CCCCCC' } }
        ], {
            x: 1.0, y: 2.2, w: 3.6, h: 4.0,
            valign: 'top'
        });
        
        // 나쁜 답변 예시
        slide.addShape(this.pptx.ShapeType.rect, {
            x: 5.2, y: 1.5, w: 4.0, h: 4.8,
            fill: { color: '1a1a1a' },
            line: { color: 'EF4444', width: 2 }
        });
        
        slide.addText('❌ 피해야 할 답변', {
            x: 5.4, y: 1.7, w: 3.6, h: 0.4,
            fontSize: 18,
            bold: true,
            color: 'EF4444'
        });
        
        slide.addText([
            { text: '❌ 무응답 (최악!)\n\n', options: { fontSize: 13, bold: true, color: 'EF4444' } },
            { text: '❌ "감사합니다" 단답\n\n', options: { fontSize: 13, color: 'FFFFFF' } },
            { text: '❌ 복사-붙여넣기 템플릿\n\n', options: { fontSize: 13, color: 'FFFFFF' } },
            { text: '❌ 변명하는 태도\n\n', options: { fontSize: 13, color: 'FFFFFF' } },
            { text: '❌ 고객 비난\n\n', options: { fontSize: 13, color: 'FFFFFF' } },
            { text: '⏰ 24시간 이내 답변 필수!', options: { fontSize: 14, bold: true, color: 'F59E0B' } }
        ], {
            x: 5.4, y: 2.2, w: 3.6, h: 4.0,
            valign: 'top'
        });
    }

    /**
     * 11. 즉시 실행 체크리스트 (신규)
     */
    addActionChecklistSlide() {
        const slide = this.pptx.addSlide();
        slide.background = { color: this.theme.colors.dark };
        
        slide.addText('✅ 오늘 바로 실행할 수 있는 것들', {
            x: 0.5, y: 0.5, w: 9, h: 0.6,
            fontSize: 32,
            bold: true,
            color: '10B981'
        });
        
        slide.addText('이 PPT를 보는 즉시 실행하세요! (소요시간: 약 30분)', {
            x: 0.5, y: 1.2, w: 9, h: 0.4,
            fontSize: 16,
            color: 'F59E0B',
            align: 'center'
        });
        
        // 체크리스트
        const checklist = [
            { time: '5분', task: '네이버 플레이스 로그인', detail: 'business.naver.com 접속' },
            { time: '10분', task: '소개글 수정', detail: '이 보고서의 "AI 봇 분석"을 참고하여 키워드 포함' },
            { time: '5분', task: '영업시간 확인', detail: '정확한 영업시간/휴무일 업데이트' },
            { time: '10분', task: '사진 10장 업로드', detail: '매장 외관, 내부, 대표 메뉴 사진' },
            { time: '5분', task: '미답변 리뷰 확인', detail: '24시간 이내 리뷰에 친절하게 답변' },
            { time: '즉시', task: 'SNS 포스팅', detail: '이 보고서의 "콘텐츠 제안" 활용' }
        ];
        
        let yPos = 2.0;
        checklist.forEach((item, index) => {
            const bgColor = index % 2 === 0 ? '1a1a1a' : '0a0a0a';
            
            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.8, y: yPos, w: 8.4, h: 0.7,
                fill: { color: bgColor },
                line: { color: '333333', width: 1 }
            });
            
            // 체크박스
            slide.addText('☐', {
                x: 1.0, y: yPos + 0.1, w: 0.5, h: 0.5,
                fontSize: 24,
                color: '10B981'
            });
            
            // 소요시간
            slide.addShape(this.pptx.ShapeType.rect, {
                x: 1.7, y: yPos + 0.15, w: 0.8, h: 0.4,
                fill: { color: '667eea' }
            });
            
            slide.addText(item.time, {
                x: 1.7, y: yPos + 0.2, w: 0.8, h: 0.3,
                fontSize: 11,
                bold: true,
                color: 'FFFFFF',
                align: 'center'
            });
            
            // 작업명
            slide.addText(item.task, {
                x: 2.7, y: yPos + 0.1, w: 3.0, h: 0.3,
                fontSize: 15,
                bold: true,
                color: 'FFFFFF'
            });
            
            // 상세 설명
            slide.addText(item.detail, {
                x: 2.7, y: yPos + 0.4, w: 3.0, h: 0.25,
                fontSize: 11,
                color: 'CCCCCC'
            });
            
            yPos += 0.75;
        });
        
        // 하단 강조 메시지
        slide.addShape(this.pptx.ShapeType.rect, {
            x: 1.5, y: yPos + 0.3, w: 7.0, h: 0.8,
            fill: { color: 'EF4444' }
        });
        
        slide.addText('🔥 실행하지 않으면 이 보고서는 의미가 없습니다!', {
            x: 1.5, y: yPos + 0.5, w: 7.0, h: 0.4,
            fontSize: 18,
            bold: true,
            color: 'FFFFFF',
            align: 'center'
        });
    }

    /**
     * 12. 문의하기
     */
    addContactSlide() {
        const slide = this.pptx.addSlide();
        slide.background = { color: this.theme.colors.dark };
        
        slide.addText('문의하기', {
            x: 0.5, y: 2.0, w: 9, h: 0.8,
            fontSize: 42,
            bold: true,
            color: this.theme.colors.white,
            align: 'center'
        });
        
        slide.addText('@studiojuai.com', {
            x: 0.5, y: 3.2, w: 9, h: 0.5,
            fontSize: 28,
            color: this.theme.colors.primary,
            align: 'center'
        });
        
        slide.addText('AI 마케팅 최적화 플랫폼', {
            x: 0.5, y: 4.0, w: 9, h: 0.4,
            fontSize: 18,
            color: this.theme.colors.gray,
            align: 'center'
        });
        
        slide.addText('Powered by Studiojuai', {
            x: 0.5, y: 6.5, w: 9, h: 0.3,
            fontSize: 14,
            color: this.theme.colors.gray,
            align: 'center'
        });
    }

    // ==================== 유틸리티 함수 ====================

    getEngagementColor(engagement) {
        const colors = {
            '높음': this.theme.colors.success,
            '중간': this.theme.colors.warning,
            '낮음': this.theme.colors.danger
        };
        return colors[engagement] || this.theme.colors.white;
    }

    getImpactColor(impact) {
        const colors = {
            '높음': this.theme.colors.success,
            '중간': this.theme.colors.warning,
            '낮음': this.theme.colors.gray
        };
        return colors[impact] || this.theme.colors.white;
    }

    getDateString() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}${month}${day}`;
    }
}

// 전역 인스턴스 생성
window.pptGenerator = new PPTGenerator();
console.log('✅ PPTGenerator 초기화 완료');

// 간편 호출 함수
async function generatePPTReport(storeId) {
    if (!storeId) {
        alert('매장을 선택해주세요.');
        return;
    }
    
    try {
        // 로딩 표시
        const loadingMsg = document.createElement('div');
        loadingMsg.id = 'ppt-loading';
        loadingMsg.className = 'fixed top-4 right-4 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        loadingMsg.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>PPT 생성 중...';
        document.body.appendChild(loadingMsg);
        
        // PPT 생성
        const result = await window.pptGenerator.generateReport(storeId);
        
        // 완료 메시지
        loadingMsg.innerHTML = `<i class="fas fa-check-circle mr-2"></i>생성 완료: ${result.fileName}`;
        loadingMsg.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        
        setTimeout(() => {
            document.body.removeChild(loadingMsg);
        }, 3000);
        
    } catch (error) {
        console.error('PPT 생성 오류:', error);
        alert('PPT 생성에 실패했습니다. 콘솔을 확인해주세요.');
        
        const loadingMsg = document.getElementById('ppt-loading');
        if (loadingMsg) {
            document.body.removeChild(loadingMsg);
        }
    }
}
