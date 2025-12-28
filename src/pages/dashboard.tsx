import type { Context } from 'hono'

export const dashboardPage = (c: Context) => {
  return c.render(
    <>
      {/* 헤더 */}
      <header class="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-lg border-b border-slate-200 dark:border-dark-border">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <a href="/" class="flex items-center space-x-2">
              <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                <i class="fas fa-robot text-white text-lg"></i>
              </div>
              <span class="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                STUDIOJUAI
              </span>
            </a>
            
            <nav class="hidden md:flex items-center space-x-8">
              <a href="/" class="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">홈</a>
              <a href="/dashboard" class="text-primary-600 dark:text-primary-400 font-medium">대시보드</a>
              <a href="/analytics" class="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">분석</a>
              <a href="/settings" class="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">설정</a>
            </nav>
            
            <div class="flex items-center space-x-3">
              <button onclick="toggleDarkMode()" class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-card transition-colors">
                <i class="fas fa-moon dark:hidden text-slate-600"></i>
                <i class="fas fa-sun hidden dark:block text-yellow-400"></i>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* 메인 컨텐츠 */}
      <main class="pt-20 pb-12 min-h-screen bg-slate-50 dark:bg-dark-bg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 페이지 헤더 */}
          <div class="mb-8">
            <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              <i class="fas fa-th-large text-primary-500 mr-3"></i>
              봇 대시보드
            </h1>
            <p class="text-slate-600 dark:text-slate-400">
              상권분석 기반 30개 AI 봇 관리 및 실행
            </p>
          </div>
          
          {/* 매장 정보 + 상권분석 요약 카드 */}
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* 매장 정보 */}
            <div id="store-info-card" class="bg-white dark:bg-dark-card rounded-2xl shadow-lg border border-slate-100 dark:border-dark-border p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-semibold text-slate-900 dark:text-white">
                  <i class="fas fa-store text-primary-500 mr-2"></i>
                  매장 정보
                </h3>
                <a href="/" class="text-sm text-primary-500 hover:underline">수정</a>
              </div>
              <div id="store-info-content">
                <p class="text-slate-500">홈에서 매장 정보를 입력해주세요</p>
              </div>
            </div>
            
            {/* 상권분석 요약 */}
            <div id="trade-area-card" class="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl shadow-lg border border-red-200 dark:border-red-800 p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-semibold text-red-700 dark:text-red-400">
                  <i class="fas fa-map-marked-alt mr-2"></i>
                  상권분석 결과
                </h3>
                <a href="/" class="text-sm text-red-500 hover:underline">재분석</a>
              </div>
              <div id="trade-area-content">
                <p class="text-red-400">홈에서 상권분석을 실행해주세요</p>
              </div>
            </div>
          </div>
          
          {/* 실행 버튼 영역 */}
          <div class="bg-white dark:bg-dark-card rounded-2xl shadow-lg border border-slate-100 dark:border-dark-border p-6 mb-8">
            <div class="flex flex-col sm:flex-row gap-4">
              <button onclick="executeSelectedBots()" class="flex-1 px-6 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2">
                <i class="fas fa-play text-xl"></i>
                <span>선택한 봇 실행 (<span id="selected-count">0</span>개)</span>
              </button>
              <button onclick="selectAllBots()" class="px-6 py-4 bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 font-semibold rounded-xl border border-slate-200 dark:border-dark-border hover:bg-slate-200 transition-all flex items-center justify-center space-x-2">
                <i class="fas fa-check-double"></i>
                <span>전체 선택</span>
              </button>
              <button onclick="deselectAllBots()" class="px-6 py-4 bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 font-semibold rounded-xl border border-slate-200 dark:border-dark-border hover:bg-slate-200 transition-all flex items-center justify-center space-x-2">
                <i class="fas fa-times"></i>
                <span>선택 해제</span>
              </button>
              <button onclick="exportResults()" class="px-6 py-4 bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 font-semibold rounded-xl border border-slate-200 dark:border-dark-border hover:bg-slate-200 transition-all flex items-center justify-center space-x-2">
                <i class="fas fa-download"></i>
                <span>내보내기</span>
              </button>
            </div>
          </div>
          
          {/* 실행 진행 상황 */}
          <div id="execution-progress" class="hidden bg-white dark:bg-dark-card rounded-2xl shadow-lg border border-slate-100 dark:border-dark-border p-6 mb-8">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
                <i class="fas fa-spinner fa-spin text-primary-500 mr-2"></i>
                <span id="progress-title">봇 실행 중...</span>
              </h3>
              <span id="progress-text" class="text-sm text-slate-600 dark:text-slate-400">0/30</span>
            </div>
            <div class="w-full bg-slate-200 dark:bg-dark-bg rounded-full h-3 mb-2">
              <div id="progress-bar" class="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-300" style="width: 0%"></div>
            </div>
            <p id="progress-current" class="text-sm text-slate-500"></p>
          </div>
          
          {/* 카테고리별 봇 섹션 */}
          <div class="space-y-8">
            
            {/* 상권분석 카테고리 */}
            <div class="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 rounded-2xl border border-red-200 dark:border-red-800 overflow-hidden">
              <div class="p-4 bg-red-100 dark:bg-red-900/30 border-b border-red-200 dark:border-red-800 flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
                    <i class="fas fa-map-marked-alt text-white"></i>
                  </div>
                  <div>
                    <h3 class="font-bold text-red-800 dark:text-red-300">상권분석</h3>
                    <p class="text-sm text-red-600 dark:text-red-400">5개 봇 - 가장 먼저 실행 필요</p>
                  </div>
                </div>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" class="category-checkbox w-5 h-5 rounded border-red-300 text-red-500 focus:ring-red-500" data-category="상권분석" onchange="toggleCategoryBots('상권분석')" />
                  <span class="text-sm text-red-700 dark:text-red-400">전체 선택</span>
                </label>
              </div>
              <div class="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3" id="category-상권분석">
                {/* JS에서 렌더링 */}
              </div>
            </div>
            
            {/* 고객응대 카테고리 */}
            <div class="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-2xl border border-blue-200 dark:border-blue-800 overflow-hidden">
              <div class="p-4 bg-blue-100 dark:bg-blue-900/30 border-b border-blue-200 dark:border-blue-800 flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                    <i class="fas fa-hand-wave text-white"></i>
                  </div>
                  <div>
                    <h3 class="font-bold text-blue-800 dark:text-blue-300">고객응대</h3>
                    <p class="text-sm text-blue-600 dark:text-blue-400">5개 봇</p>
                  </div>
                </div>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" class="category-checkbox w-5 h-5 rounded border-blue-300 text-blue-500 focus:ring-blue-500" data-category="고객응대" onchange="toggleCategoryBots('고객응대')" />
                  <span class="text-sm text-blue-700 dark:text-blue-400">전체 선택</span>
                </label>
              </div>
              <div class="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3" id="category-고객응대">
              </div>
            </div>
            
            {/* 콘텐츠 카테고리 */}
            <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-2xl border border-purple-200 dark:border-purple-800 overflow-hidden">
              <div class="p-4 bg-purple-100 dark:bg-purple-900/30 border-b border-purple-200 dark:border-purple-800 flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                    <i class="fas fa-pen-fancy text-white"></i>
                  </div>
                  <div>
                    <h3 class="font-bold text-purple-800 dark:text-purple-300">콘텐츠</h3>
                    <p class="text-sm text-purple-600 dark:text-purple-400">5개 봇</p>
                  </div>
                </div>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" class="category-checkbox w-5 h-5 rounded border-purple-300 text-purple-500 focus:ring-purple-500" data-category="콘텐츠" onchange="toggleCategoryBots('콘텐츠')" />
                  <span class="text-sm text-purple-700 dark:text-purple-400">전체 선택</span>
                </label>
              </div>
              <div class="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3" id="category-콘텐츠">
              </div>
            </div>
            
            {/* 고객관계 카테고리 */}
            <div class="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10 rounded-2xl border border-emerald-200 dark:border-emerald-800 overflow-hidden">
              <div class="p-4 bg-emerald-100 dark:bg-emerald-900/30 border-b border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                    <i class="fas fa-gem text-white"></i>
                  </div>
                  <div>
                    <h3 class="font-bold text-emerald-800 dark:text-emerald-300">고객관계</h3>
                    <p class="text-sm text-emerald-600 dark:text-emerald-400">5개 봇</p>
                  </div>
                </div>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" class="category-checkbox w-5 h-5 rounded border-emerald-300 text-emerald-500 focus:ring-emerald-500" data-category="고객관계" onchange="toggleCategoryBots('고객관계')" />
                  <span class="text-sm text-emerald-700 dark:text-emerald-400">전체 선택</span>
                </label>
              </div>
              <div class="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3" id="category-고객관계">
              </div>
            </div>
            
            {/* 소셜미디어 카테고리 */}
            <div class="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/10 dark:to-rose-900/10 rounded-2xl border border-pink-200 dark:border-pink-800 overflow-hidden">
              <div class="p-4 bg-pink-100 dark:bg-pink-900/30 border-b border-pink-200 dark:border-pink-800 flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center">
                    <i class="fas fa-share-nodes text-white"></i>
                  </div>
                  <div>
                    <h3 class="font-bold text-pink-800 dark:text-pink-300">소셜미디어</h3>
                    <p class="text-sm text-pink-600 dark:text-pink-400">5개 봇</p>
                  </div>
                </div>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" class="category-checkbox w-5 h-5 rounded border-pink-300 text-pink-500 focus:ring-pink-500" data-category="소셜미디어" onchange="toggleCategoryBots('소셜미디어')" />
                  <span class="text-sm text-pink-700 dark:text-pink-400">전체 선택</span>
                </label>
              </div>
              <div class="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3" id="category-소셜미디어">
              </div>
            </div>
            
            {/* 디지털마케팅 카테고리 */}
            <div class="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-900/10 dark:to-violet-900/10 rounded-2xl border border-indigo-200 dark:border-indigo-800 overflow-hidden">
              <div class="p-4 bg-indigo-100 dark:bg-indigo-900/30 border-b border-indigo-200 dark:border-indigo-800 flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center">
                    <i class="fas fa-envelope text-white"></i>
                  </div>
                  <div>
                    <h3 class="font-bold text-indigo-800 dark:text-indigo-300">디지털마케팅</h3>
                    <p class="text-sm text-indigo-600 dark:text-indigo-400">3개 봇</p>
                  </div>
                </div>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" class="category-checkbox w-5 h-5 rounded border-indigo-300 text-indigo-500 focus:ring-indigo-500" data-category="디지털마케팅" onchange="toggleCategoryBots('디지털마케팅')" />
                  <span class="text-sm text-indigo-700 dark:text-indigo-400">전체 선택</span>
                </label>
              </div>
              <div class="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3" id="category-디지털마케팅">
              </div>
            </div>
            
            {/* 전략분석 카테고리 */}
            <div class="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/10 dark:to-yellow-900/10 rounded-2xl border border-amber-200 dark:border-amber-800 overflow-hidden">
              <div class="p-4 bg-amber-100 dark:bg-amber-900/30 border-b border-amber-200 dark:border-amber-800 flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                    <i class="fas fa-chart-line text-white"></i>
                  </div>
                  <div>
                    <h3 class="font-bold text-amber-800 dark:text-amber-300">전략분석</h3>
                    <p class="text-sm text-amber-600 dark:text-amber-400">2개 봇</p>
                  </div>
                </div>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" class="category-checkbox w-5 h-5 rounded border-amber-300 text-amber-500 focus:ring-amber-500" data-category="전략분석" onchange="toggleCategoryBots('전략분석')" />
                  <span class="text-sm text-amber-700 dark:text-amber-400">전체 선택</span>
                </label>
              </div>
              <div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-3" id="category-전략분석">
              </div>
            </div>
            
          </div>
          
        </div>
      </main>
      
      {/* 봇 결과 모달 */}
      <div id="bot-result-modal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white dark:bg-dark-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
          <div class="p-6 border-b border-slate-200 dark:border-dark-border flex items-center justify-between">
            <h3 id="modal-title" class="text-xl font-bold text-slate-900 dark:text-white"></h3>
            <button onclick="closeResultModal()" class="p-2 hover:bg-slate-100 dark:hover:bg-dark-bg rounded-lg transition-colors">
              <i class="fas fa-times text-slate-500"></i>
            </button>
          </div>
          <div id="modal-content" class="p-6 overflow-y-auto flex-1">
          </div>
          <div class="p-4 border-t border-slate-200 dark:border-dark-border flex gap-2">
            <button onclick="copyResult()" class="flex-1 px-4 py-2 bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 transition-colors">
              <i class="fas fa-copy mr-2"></i>복사
            </button>
            <button onclick="closeResultModal()" class="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
              닫기
            </button>
          </div>
        </div>
      </div>
      
      {/* 페이지 스크립트 */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // 봇 데이터 (이모티콘 제거, FontAwesome 아이콘 사용)
          const botsData = [
            // 상권분석 (5개)
            { id: 'trade-area-overview', name: '상권 종합분석', icon: 'fa-globe', category: '상권분석', desc: '반경 내 상권 현황 분석' },
            { id: 'competitor-analysis', name: '경쟁사 분석', icon: 'fa-crosshairs', category: '상권분석', desc: '동종업종 경쟁사 현황' },
            { id: 'target-customer', name: '타겟고객 분석', icon: 'fa-users', category: '상권분석', desc: '핵심 타겟 고객층 도출' },
            { id: 'location-evaluation', name: '입지 평가', icon: 'fa-location-dot', category: '상권분석', desc: '매장 위치 장단점 분석' },
            { id: 'trend-analysis', name: '상권 트렌드', icon: 'fa-arrow-trend-up', category: '상권분석', desc: '지역 소비 트렌드 분석' },
            // 고객응대 (5개)
            { id: 'greeting', name: '첫인사', icon: 'fa-hand', category: '고객응대', desc: '타겟 맞춤 환영 메시지' },
            { id: 'menu-recommend', name: '메뉴추천', icon: 'fa-utensils', category: '고객응대', desc: '타겟 취향 맞춤 추천' },
            { id: 'event-announce', name: '이벤트 안내', icon: 'fa-bullhorn', category: '고객응대', desc: '타겟 맞춤 프로모션' },
            { id: 'review-request', name: '리뷰 요청', icon: 'fa-star', category: '고객응대', desc: '타겟 채널 맞춤 리뷰' },
            { id: 'sns-content', name: 'SNS 홍보', icon: 'fa-mobile-screen', category: '고객응대', desc: '타겟 SNS 맞춤 콘텐츠' },
            // 콘텐츠 (5개)
            { id: 'blog-content', name: '블로그 콘텐츠', icon: 'fa-blog', category: '콘텐츠', desc: '지역 SEO 최적화 글' },
            { id: 'keyword-strategy', name: '키워드 전략', icon: 'fa-magnifying-glass', category: '콘텐츠', desc: '지역 검색 키워드' },
            { id: 'local-marketing', name: '지역 마케팅', icon: 'fa-map-pin', category: '콘텐츠', desc: '상권 특성 마케팅' },
            { id: 'seasonal-marketing', name: '시즌 마케팅', icon: 'fa-calendar', category: '콘텐츠', desc: '시즌 기획' },
            { id: 'visual-planning', name: '비주얼 기획', icon: 'fa-camera', category: '콘텐츠', desc: '타겟 맞춤 비주얼' },
            // 고객관계 (5개)
            { id: 'loyalty-program', name: '단골 관리', icon: 'fa-gem', category: '고객관계', desc: '로열티 프로그램' },
            { id: 'upselling', name: '업셀링', icon: 'fa-chart-line', category: '고객관계', desc: '객단가 상승 전략' },
            { id: 'referral-program', name: '소개 유도', icon: 'fa-handshake', category: '고객관계', desc: '추천 프로그램' },
            { id: 'feedback-collection', name: '피드백 수집', icon: 'fa-comment-dots', category: '고객관계', desc: '피드백 채널' },
            { id: 'crisis-response', name: '불만 대응', icon: 'fa-life-ring', category: '고객관계', desc: 'CS 대응' },
            // 소셜미디어 (5개)
            { id: 'story-content', name: '스토리 콘텐츠', icon: 'fa-image', category: '소셜미디어', desc: '스토리 기획' },
            { id: 'hashtag-strategy', name: '해시태그 전략', icon: 'fa-hashtag', category: '소셜미디어', desc: '최적 해시태그' },
            { id: 'influencer-collab', name: '인플루언서 협업', icon: 'fa-user-star', category: '소셜미디어', desc: '협업 전략' },
            { id: 'community-manage', name: '커뮤니티 관리', icon: 'fa-people-group', category: '소셜미디어', desc: '커뮤니티 침투' },
            { id: 'reels-content', name: '릴스/숏폼', icon: 'fa-film', category: '소셜미디어', desc: '숏폼 기획' },
            // 디지털마케팅 (3개)
            { id: 'email-marketing', name: '이메일 마케팅', icon: 'fa-envelope', category: '디지털마케팅', desc: '이메일 캠페인' },
            { id: 'sms-marketing', name: 'SMS 마케팅', icon: 'fa-message', category: '디지털마케팅', desc: '문자 메시지' },
            { id: 'retargeting', name: '리타겟팅', icon: 'fa-rotate', category: '디지털마케팅', desc: '이탈 고객 재유입' },
            // 전략분석 (2개)
            { id: 'pricing-strategy', name: '가격 전략', icon: 'fa-won-sign', category: '전략분석', desc: '가격 설계' },
            { id: 'performance-analysis', name: '성과 분석', icon: 'fa-chart-pie', category: '전략분석', desc: 'ROI 분석' },
          ];
          
          let selectedBots = new Set();
          let botResults = {};
          let tradeAreaData = null;
          let storeInfo = null;
          
          // 페이지 로드 시 초기화
          document.addEventListener('DOMContentLoaded', function() {
            loadSavedData();
            renderAllBotCards();
            updateSelectedCount();
          });
          
          // 저장된 데이터 로드
          function loadSavedData() {
            const savedStore = localStorage.getItem('store_info');
            if (savedStore) {
              storeInfo = JSON.parse(savedStore);
              updateStoreInfoCard();
            }
            
            const savedTradeArea = localStorage.getItem('trade_area_data');
            if (savedTradeArea) {
              tradeAreaData = JSON.parse(savedTradeArea);
              updateTradeAreaCard();
            }
            
            const savedResults = localStorage.getItem('bot_results');
            if (savedResults) {
              const results = JSON.parse(savedResults);
              results.forEach(r => {
                if (r.success) {
                  botResults[r.botId] = r.result;
                }
              });
            }
            
            if (tradeAreaData && tradeAreaData.botResults) {
              tradeAreaData.botResults.forEach(r => {
                if (r.success) {
                  botResults[r.botId] = r.result;
                }
              });
            }
          }
          
          // 매장 정보 카드 업데이트
          function updateStoreInfoCard() {
            if (!storeInfo) return;
            
            const content = document.getElementById('store-info-content');
            const industryNames = {
              cafe: '카페',
              chicken: '치킨집',
              korean: '한식당',
              salon: '미용실',
              restaurant: '음식점',
              retail: '소매점'
            };
            
            content.innerHTML = 
              '<h4 class="text-lg font-bold text-slate-900 dark:text-white mb-2">' + (storeInfo.name || '미입력') + '</h4>' +
              '<p class="text-sm text-slate-600 dark:text-slate-400"><i class="fas fa-map-marker-alt mr-1"></i> ' + (storeInfo.location || '위치 미입력') + '</p>' +
              '<p class="text-sm text-slate-600 dark:text-slate-400"><i class="fas fa-tags mr-1"></i> ' + (industryNames[storeInfo.industry] || storeInfo.industry) + '</p>' +
              (storeInfo.mainProduct ? '<p class="text-sm text-slate-600 dark:text-slate-400"><i class="fas fa-star mr-1"></i> ' + storeInfo.mainProduct + '</p>' : '');
          }
          
          // 상권분석 카드 업데이트
          function updateTradeAreaCard() {
            if (!tradeAreaData) return;
            
            const content = document.getElementById('trade-area-content');
            content.innerHTML = 
              '<div class="space-y-2">' +
              '<p class="text-sm text-red-700 dark:text-red-300"><i class="fas fa-map-marker-alt mr-1"></i> ' + (tradeAreaData.location || '') + '</p>' +
              '<p class="text-sm text-red-700 dark:text-red-300"><i class="fas fa-circle-notch mr-1"></i> 반경 ' + (tradeAreaData.radius || 3) + 'km 분석</p>' +
              '<p class="text-lg font-bold text-red-600 dark:text-red-400"><i class="fas fa-store mr-1"></i> 경쟁사 ' + (tradeAreaData.totalCompetitors || 0) + '개 발견</p>' +
              '<p class="text-xs text-red-500">분석일: ' + new Date(tradeAreaData.analysisDate).toLocaleDateString('ko-KR') + '</p>' +
              '</div>';
          }
          
          // 모든 봇 카드 렌더링
          function renderAllBotCards() {
            const categories = ['상권분석', '고객응대', '콘텐츠', '고객관계', '소셜미디어', '디지털마케팅', '전략분석'];
            
            categories.forEach(category => {
              const container = document.getElementById('category-' + category);
              if (!container) return;
              
              const categoryBots = botsData.filter(b => b.category === category);
              
              container.innerHTML = categoryBots.map(bot => {
                const hasResult = botResults[bot.id];
                const isSelected = selectedBots.has(bot.id);
                
                return '<div class="bot-card bg-white dark:bg-dark-card rounded-xl p-4 border border-slate-200 dark:border-dark-border shadow-sm hover:shadow-md transition-all" data-id="' + bot.id + '">' +
                  '<div class="flex items-start justify-between mb-2">' +
                    '<label class="flex items-center space-x-2 cursor-pointer">' +
                      '<input type="checkbox" class="bot-checkbox w-4 h-4 rounded border-slate-300 text-primary-500 focus:ring-primary-500" ' +
                        'data-bot-id="' + bot.id + '" data-category="' + bot.category + '" ' +
                        (isSelected ? 'checked' : '') + ' onchange="toggleBot(\'' + bot.id + '\')" />' +
                      '<span class="text-sm font-semibold text-slate-800 dark:text-slate-200">' + bot.name + '</span>' +
                    '</label>' +
                    (hasResult ? '<span class="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs rounded-full">완료</span>' : '') +
                  '</div>' +
                  '<div class="flex items-center space-x-2 mb-2">' +
                    '<i class="fas ' + bot.icon + ' text-slate-400"></i>' +
                    '<span class="text-xs text-slate-500 dark:text-slate-400">' + bot.desc + '</span>' +
                  '</div>' +
                  '<div class="flex gap-2">' +
                    '<button onclick="executeBot(\'' + bot.id + '\')" class="flex-1 px-2 py-1.5 bg-primary-500 hover:bg-primary-600 text-white text-xs font-medium rounded-lg transition-colors">' +
                      '<i class="fas fa-play mr-1"></i>실행' +
                    '</button>' +
                    (hasResult ? '<button onclick="viewResult(\'' + bot.id + '\')" class="px-2 py-1.5 bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 text-xs font-medium rounded-lg hover:bg-slate-200 transition-colors"><i class="fas fa-eye"></i></button>' : '') +
                  '</div>' +
                '</div>';
              }).join('');
            });
          }
          
          // 봇 선택/해제
          function toggleBot(botId) {
            if (selectedBots.has(botId)) {
              selectedBots.delete(botId);
            } else {
              selectedBots.add(botId);
            }
            updateSelectedCount();
            updateCategoryCheckbox(botsData.find(b => b.id === botId)?.category);
          }
          
          // 카테고리 전체 선택/해제
          function toggleCategoryBots(category) {
            const checkbox = document.querySelector('.category-checkbox[data-category="' + category + '"]');
            const categoryBots = botsData.filter(b => b.category === category);
            
            if (checkbox.checked) {
              categoryBots.forEach(bot => selectedBots.add(bot.id));
            } else {
              categoryBots.forEach(bot => selectedBots.delete(bot.id));
            }
            
            // 개별 체크박스 업데이트
            categoryBots.forEach(bot => {
              const botCheckbox = document.querySelector('.bot-checkbox[data-bot-id="' + bot.id + '"]');
              if (botCheckbox) {
                botCheckbox.checked = checkbox.checked;
              }
            });
            
            updateSelectedCount();
          }
          
          // 카테고리 체크박스 상태 업데이트
          function updateCategoryCheckbox(category) {
            if (!category) return;
            
            const categoryBots = botsData.filter(b => b.category === category);
            const selectedInCategory = categoryBots.filter(b => selectedBots.has(b.id)).length;
            const checkbox = document.querySelector('.category-checkbox[data-category="' + category + '"]');
            
            if (checkbox) {
              checkbox.checked = selectedInCategory === categoryBots.length;
              checkbox.indeterminate = selectedInCategory > 0 && selectedInCategory < categoryBots.length;
            }
          }
          
          // 전체 선택
          function selectAllBots() {
            botsData.forEach(bot => selectedBots.add(bot.id));
            document.querySelectorAll('.bot-checkbox').forEach(cb => cb.checked = true);
            document.querySelectorAll('.category-checkbox').forEach(cb => cb.checked = true);
            updateSelectedCount();
          }
          
          // 전체 해제
          function deselectAllBots() {
            selectedBots.clear();
            document.querySelectorAll('.bot-checkbox').forEach(cb => cb.checked = false);
            document.querySelectorAll('.category-checkbox').forEach(cb => { cb.checked = false; cb.indeterminate = false; });
            updateSelectedCount();
          }
          
          // 선택된 봇 수 업데이트
          function updateSelectedCount() {
            document.getElementById('selected-count').textContent = selectedBots.size;
          }
          
          // 개별 봇 실행
          async function executeBot(botId) {
            const bot = botsData.find(b => b.id === botId);
            if (!bot) return;
            
            if (!storeInfo || !storeInfo.name) {
              showToast('먼저 매장 정보를 입력해주세요', 'error');
              return;
            }
            
            const geminiKey = localStorage.getItem('gemini_api_key');
            if (!geminiKey) {
              showToast('Gemini API 키를 설정해주세요', 'error');
              return;
            }
            
            if (bot.category === '상권분석') {
              const naverClientId = localStorage.getItem('naver_client_id');
              const naverClientSecret = localStorage.getItem('naver_client_secret');
              if (!naverClientId || !naverClientSecret) {
                showToast('상권분석에는 네이버 API 키가 필요합니다', 'error');
                return;
              }
            }
            
            if (bot.category !== '상권분석' && !tradeAreaData) {
              showToast('먼저 상권분석을 실행해주세요', 'error');
              return;
            }
            
            showToast(bot.name + ' 실행 중...', 'info');
            
            try {
              const headers = {
                'Content-Type': 'application/json',
                'X-Gemini-Key': geminiKey
              };
              
              if (bot.category === '상권분석') {
                headers['X-Naver-Client-Id'] = localStorage.getItem('naver_client_id');
                headers['X-Naver-Client-Secret'] = localStorage.getItem('naver_client_secret');
              }
              
              const response = await fetch('/api/bot/execute', {
                method: 'POST',
                headers,
                body: JSON.stringify({
                  botId,
                  storeInfo,
                  industry: storeInfo.industry,
                  tradeAreaData
                })
              });
              
              const result = await response.json();
              
              if (result.success) {
                botResults[botId] = result.result;
                renderAllBotCards();
                showToast(bot.name + ' 완료!', 'success');
                viewResult(botId);
              } else {
                showToast(result.error || '실행 실패', 'error');
              }
            } catch (error) {
              showToast('봇 실행 중 오류 발생', 'error');
              console.error(error);
            }
          }
          
          // 선택한 봇 실행
          async function executeSelectedBots() {
            if (selectedBots.size === 0) {
              showToast('실행할 봇을 선택해주세요', 'error');
              return;
            }
            
            if (!storeInfo || !storeInfo.name) {
              showToast('먼저 매장 정보를 입력해주세요', 'error');
              return;
            }
            
            const geminiKey = localStorage.getItem('gemini_api_key');
            if (!geminiKey) {
              showToast('Gemini API 키를 설정해주세요', 'error');
              return;
            }
            
            // 상권분석 봇이 포함되어 있는지 확인
            const selectedList = Array.from(selectedBots);
            const hasTradeAreaBot = selectedList.some(id => {
              const bot = botsData.find(b => b.id === id);
              return bot && bot.category === '상권분석';
            });
            
            // 상권분석 외 봇이 있는데 상권분석 데이터가 없으면
            const hasNonTradeAreaBot = selectedList.some(id => {
              const bot = botsData.find(b => b.id === id);
              return bot && bot.category !== '상권분석';
            });
            
            if (hasNonTradeAreaBot && !tradeAreaData && !hasTradeAreaBot) {
              showToast('상권분석 봇을 먼저 실행하거나 상권분석 봇도 함께 선택해주세요', 'error');
              return;
            }
            
            if (hasTradeAreaBot) {
              const naverClientId = localStorage.getItem('naver_client_id');
              const naverClientSecret = localStorage.getItem('naver_client_secret');
              if (!naverClientId || !naverClientSecret) {
                showToast('상권분석에는 네이버 API 키가 필요합니다', 'error');
                return;
              }
            }
            
            showProgress('선택한 봇 실행 중...', selectedBots.size);
            
            let successCount = 0;
            let currentIndex = 0;
            
            // 상권분석 봇 먼저 실행
            const tradeAreaBotIds = selectedList.filter(id => {
              const bot = botsData.find(b => b.id === id);
              return bot && bot.category === '상권분석';
            });
            
            const otherBotIds = selectedList.filter(id => {
              const bot = botsData.find(b => b.id === id);
              return bot && bot.category !== '상권분석';
            });
            
            const orderedBotIds = [...tradeAreaBotIds, ...otherBotIds];
            
            for (const botId of orderedBotIds) {
              currentIndex++;
              const bot = botsData.find(b => b.id === botId);
              if (!bot) continue;
              
              updateProgress(currentIndex, selectedBots.size, bot.name + ' 실행 중...');
              
              try {
                const headers = {
                  'Content-Type': 'application/json',
                  'X-Gemini-Key': geminiKey
                };
                
                if (bot.category === '상권분석') {
                  headers['X-Naver-Client-Id'] = localStorage.getItem('naver_client_id');
                  headers['X-Naver-Client-Secret'] = localStorage.getItem('naver_client_secret');
                }
                
                const response = await fetch('/api/bot/execute', {
                  method: 'POST',
                  headers,
                  body: JSON.stringify({
                    botId,
                    storeInfo,
                    industry: storeInfo.industry,
                    tradeAreaData
                  })
                });
                
                const result = await response.json();
                
                if (result.success) {
                  botResults[botId] = result.result;
                  successCount++;
                  
                  // 상권분석 봇이면 tradeAreaData 업데이트
                  if (bot.category === '상권분석' && !tradeAreaData) {
                    // 상권분석 데이터 생성
                    tradeAreaData = {
                      location: storeInfo.location,
                      radius: 3,
                      totalCompetitors: 0,
                      analysisDate: new Date().toISOString()
                    };
                    localStorage.setItem('trade_area_data', JSON.stringify(tradeAreaData));
                    updateTradeAreaCard();
                  }
                }
              } catch (error) {
                console.error('Bot execution error:', error);
              }
            }
            
            hideProgress();
            renderAllBotCards();
            localStorage.setItem('bot_results', JSON.stringify(
              Object.entries(botResults).map(([botId, result]) => ({ botId, success: true, result }))
            ));
            
            showToast('봇 실행 완료! (' + successCount + '/' + selectedBots.size + '개 성공)', 'success');
          }
          
          // 결과 보기
          function viewResult(botId) {
            const bot = botsData.find(b => b.id === botId);
            const result = botResults[botId];
            
            if (!bot || !result) return;
            
            document.getElementById('modal-title').innerHTML = '<i class="fas ' + bot.icon + ' mr-2"></i>' + bot.name;
            document.getElementById('modal-content').innerHTML = 
              '<div class="prose dark:prose-invert max-w-none">' +
                '<pre class="whitespace-pre-wrap text-sm bg-slate-50 dark:bg-dark-bg p-4 rounded-xl overflow-auto">' + result + '</pre>' +
              '</div>';
            document.getElementById('bot-result-modal').classList.remove('hidden');
          }
          
          function closeResultModal() {
            document.getElementById('bot-result-modal').classList.add('hidden');
          }
          
          function copyResult() {
            const content = document.getElementById('modal-content').textContent;
            navigator.clipboard.writeText(content);
            showToast('클립보드에 복사되었습니다', 'success');
          }
          
          // 결과 내보내기
          function exportResults() {
            if (Object.keys(botResults).length === 0) {
              showToast('내보낼 결과가 없습니다', 'error');
              return;
            }
            
            const industryNames = {
              cafe: '카페',
              chicken: '치킨집',
              korean: '한식당',
              salon: '미용실',
              restaurant: '음식점',
              retail: '소매점'
            };
            
            let markdown = '# STUDIOJUAI 마케팅 봇 실행 결과\\n\\n';
            markdown += '생성일: ' + new Date().toLocaleString('ko-KR') + '\\n\\n';
            
            if (storeInfo) {
              markdown += '## 매장 정보\\n';
              markdown += '- 매장명: ' + (storeInfo.name || '-') + '\\n';
              markdown += '- 위치: ' + (storeInfo.location || '-') + '\\n';
              markdown += '- 업종: ' + (industryNames[storeInfo.industry] || storeInfo.industry) + '\\n\\n';
            }
            
            if (tradeAreaData) {
              markdown += '## 상권분석 결과\\n';
              markdown += '- 분석 반경: ' + tradeAreaData.radius + 'km\\n';
              markdown += '- 경쟁사 수: ' + tradeAreaData.totalCompetitors + '개\\n\\n';
            }
            
            markdown += '## 봇 실행 결과\\n\\n';
            
            botsData.forEach(bot => {
              if (botResults[bot.id]) {
                markdown += '### ' + bot.name + '\\n';
                markdown += botResults[bot.id] + '\\n\\n';
                markdown += '---\\n\\n';
              }
            });
            
            const blob = new Blob([markdown], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'studiojuai-results-' + new Date().toISOString().split('T')[0] + '.md';
            a.click();
            URL.revokeObjectURL(url);
            
            showToast('결과가 다운로드되었습니다', 'success');
          }
          
          // 진행 상황 표시
          function showProgress(title, total) {
            document.getElementById('progress-title').textContent = title;
            document.getElementById('progress-text').textContent = '0/' + total;
            document.getElementById('progress-bar').style.width = '0%';
            document.getElementById('progress-current').textContent = '';
            document.getElementById('execution-progress').classList.remove('hidden');
          }
          
          function updateProgress(current, total, message) {
            const percent = Math.round((current / total) * 100);
            document.getElementById('progress-text').textContent = current + '/' + total;
            document.getElementById('progress-bar').style.width = percent + '%';
            document.getElementById('progress-current').textContent = message;
          }
          
          function hideProgress() {
            document.getElementById('progress-bar').style.width = '100%';
            setTimeout(() => {
              document.getElementById('execution-progress').classList.add('hidden');
            }, 500);
          }
        `
      }} />
    </>
  )
}
