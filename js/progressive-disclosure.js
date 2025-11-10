/**
 * ========================================
 * 📱 Progressive Disclosure 시스템
 * Studiojuai 마케팅 최적화 플랫폼
 * ========================================
 * 
 * 점진적 정보 공개 패턴:
 * - 핵심 정보 먼저
 * - 세부 정보는 클릭 시 확장
 * - 모바일 최적화
 */

class ProgressiveDisclosure {
    constructor() {
        this.expandedSections = new Set();
        this.init();
    }

    init() {
        console.log('📱 Progressive Disclosure 시스템 초기화');
        this.setupEventListeners();
    }

    /**
     * 이벤트 리스너 설정
     */
    setupEventListeners() {
        // 토글 버튼 클릭
        document.addEventListener('click', (e) => {
            if (e.target.closest('.toggle-disclosure')) {
                this.handleToggle(e);
            }
            
            if (e.target.closest('.show-more-btn')) {
                this.handleShowMore(e);
            }
        });
    }

    /**
     * 섹션 토글
     */
    handleToggle(e) {
        const button = e.target.closest('.toggle-disclosure');
        const targetId = button.dataset.target;
        const targetElement = document.getElementById(targetId);
        
        if (!targetElement) return;
        
        const isExpanded = this.expandedSections.has(targetId);
        
        if (isExpanded) {
            this.collapse(targetId, targetElement, button);
        } else {
            this.expand(targetId, targetElement, button);
        }
    }

    /**
     * 섹션 펼치기
     */
    expand(id, element, button) {
        // 상태 업데이트
        this.expandedSections.add(id);
        
        // 클래스 추가
        element.classList.remove('disclosure-collapsed');
        element.classList.add('disclosure-expanded');
        button.classList.add('active');
        
        // 아이콘 회전
        const icon = button.querySelector('.toggle-icon');
        if (icon) {
            icon.style.transform = 'rotate(180deg)';
        }
        
        // 텍스트 변경
        const label = button.querySelector('.toggle-label');
        if (label && button.dataset.hideText) {
            label.textContent = button.dataset.hideText;
        }
        
        // 애니메이션
        element.style.animation = 'fadeIn 0.4s ease-out';
        
        console.log(`✅ 섹션 펼침: ${id}`);
    }

    /**
     * 섹션 접기
     */
    collapse(id, element, button) {
        // 상태 업데이트
        this.expandedSections.delete(id);
        
        // 클래스 제거
        element.classList.remove('disclosure-expanded');
        element.classList.add('disclosure-collapsed');
        button.classList.remove('active');
        
        // 아이콘 원위치
        const icon = button.querySelector('.toggle-icon');
        if (icon) {
            icon.style.transform = 'rotate(0deg)';
        }
        
        // 텍스트 변경
        const label = button.querySelector('.toggle-label');
        if (label && button.dataset.showText) {
            label.textContent = button.dataset.showText;
        }
        
        console.log(`✅ 섹션 접힘: ${id}`);
    }

    /**
     * "더보기" 버튼 처리
     */
    handleShowMore(e) {
        const button = e.target.closest('.show-more-btn');
        const targetId = button.dataset.target;
        const targetElement = document.getElementById(targetId);
        
        if (!targetElement) return;
        
        // 숨겨진 항목 표시
        const hiddenItems = targetElement.querySelectorAll('.progressive-hidden');
        hiddenItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.remove('progressive-hidden');
                item.classList.add('fade-in');
            }, index * 50); // 순차 애니메이션
        });
        
        // 버튼 숨기기
        button.style.display = 'none';
        
        console.log(`✅ 더보기 확장: ${targetId}`);
    }

    /**
     * 모바일에서만 접기 (초기 상태)
     */
    collapseOnMobile(sectionIds) {
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
            sectionIds.forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    element.classList.add('disclosure-collapsed');
                }
            });
        }
    }

    /**
     * 모두 펼치기
     */
    expandAll(sectionIds) {
        sectionIds.forEach(id => {
            const element = document.getElementById(id);
            const button = document.querySelector(`[data-target="${id}"]`);
            
            if (element && button) {
                this.expand(id, element, button);
            }
        });
    }

    /**
     * 모두 접기
     */
    collapseAll(sectionIds) {
        sectionIds.forEach(id => {
            const element = document.getElementById(id);
            const button = document.querySelector(`[data-target="${id}"]`);
            
            if (element && button) {
                this.collapse(id, element, button);
            }
        });
    }
}

/**
 * ========================================
 * 반응형 유틸리티
 * ========================================
 */
class ResponsiveUtils {
    constructor() {
        this.breakpoints = {
            mobile: 767,
            tablet: 1023,
            desktop: 1024
        };
        
        this.currentBreakpoint = this.getBreakpoint();
        this.init();
    }

    init() {
        // 리사이즈 이벤트
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 200);
        });
        
        console.log(`📱 현재 브레이크포인트: ${this.currentBreakpoint}`);
    }

    /**
     * 현재 브레이크포인트 확인
     */
    getBreakpoint() {
        const width = window.innerWidth;
        
        if (width <= this.breakpoints.mobile) {
            return 'mobile';
        } else if (width <= this.breakpoints.tablet) {
            return 'tablet';
        } else {
            return 'desktop';
        }
    }

    /**
     * 리사이즈 처리
     */
    handleResize() {
        const newBreakpoint = this.getBreakpoint();
        
        if (newBreakpoint !== this.currentBreakpoint) {
            console.log(`📱 브레이크포인트 변경: ${this.currentBreakpoint} → ${newBreakpoint}`);
            this.currentBreakpoint = newBreakpoint;
            
            // 커스텀 이벤트 발생
            window.dispatchEvent(new CustomEvent('breakpointChange', {
                detail: { breakpoint: newBreakpoint }
            }));
        }
    }

    /**
     * 모바일인지 확인
     */
    isMobile() {
        return this.currentBreakpoint === 'mobile';
    }

    /**
     * 태블릿인지 확인
     */
    isTablet() {
        return this.currentBreakpoint === 'tablet';
    }

    /**
     * 데스크톱인지 확인
     */
    isDesktop() {
        return this.currentBreakpoint === 'desktop';
    }

    /**
     * 터치 디바이스인지 확인
     */
    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
}

/**
 * ========================================
 * 모바일 네비게이션
 * ========================================
 */
class MobileNavigation {
    constructor() {
        this.init();
    }

    init() {
        if (!window.responsiveUtils.isMobile()) return;
        
        this.createMobileNav();
    }

    /**
     * 모바일 네비게이션 생성
     */
    createMobileNav() {
        // 기존 모바일 네비 확인
        if (document.querySelector('.mobile-nav')) return;
        
        const nav = document.createElement('nav');
        nav.className = 'mobile-nav';
        nav.innerHTML = `
            <a href="../index.html" class="mobile-nav-item" data-page="home">
                <i class="fas fa-home mobile-nav-icon"></i>
                <span class="mobile-nav-label">홈</span>
            </a>
            <a href="bot-dashboard.html" class="mobile-nav-item" data-page="bots">
                <i class="fas fa-robot mobile-nav-icon"></i>
                <span class="mobile-nav-label">봇</span>
            </a>
            <a href="analytics.html" class="mobile-nav-item" data-page="analytics">
                <i class="fas fa-chart-line mobile-nav-icon"></i>
                <span class="mobile-nav-label">분석</span>
            </a>
            <a href="multi-store.html" class="mobile-nav-item" data-page="stores">
                <i class="fas fa-store mobile-nav-icon"></i>
                <span class="mobile-nav-label">매장</span>
            </a>
        `;
        
        document.body.appendChild(nav);
        this.setActiveNavItem();
        
        console.log('📱 모바일 네비게이션 생성 완료');
    }

    /**
     * 현재 페이지 활성화
     */
    setActiveNavItem() {
        const currentPage = this.getCurrentPage();
        const items = document.querySelectorAll('.mobile-nav-item');
        
        items.forEach(item => {
            if (item.dataset.page === currentPage) {
                item.classList.add('active');
            }
        });
    }

    /**
     * 현재 페이지 확인
     */
    getCurrentPage() {
        const path = window.location.pathname;
        
        if (path.includes('bot-dashboard')) return 'bots';
        if (path.includes('analytics')) return 'analytics';
        if (path.includes('multi-store')) return 'stores';
        return 'home';
    }
}

/**
 * ========================================
 * 글로벌 초기화
 * ========================================
 */

// 인스턴스 생성
window.progressiveDisclosure = new ProgressiveDisclosure();
window.responsiveUtils = new ResponsiveUtils();
window.mobileNavigation = new MobileNavigation();

// 브레이크포인트 변경 이벤트 리스너
window.addEventListener('breakpointChange', (e) => {
    console.log(`📱 브레이크포인트 변경됨: ${e.detail.breakpoint}`);
    
    // 모바일로 변경 시 네비게이션 재생성
    if (e.detail.breakpoint === 'mobile') {
        window.mobileNavigation.init();
    }
});

console.log('✅ Progressive Disclosure 시스템 로드 완료');
