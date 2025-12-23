import type { Context } from 'hono'

export const mainPage = (c: Context) => {
  return c.render(
    <>
      {/* 헤더 */}
      <header class="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-lg border-b border-slate-200 dark:border-dark-border">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            {/* 로고 */}
            <a href="/" class="flex items-center space-x-2">
              <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                <i class="fas fa-robot text-white text-lg"></i>
              </div>
              <span class="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                STUDIOJUAI
              </span>
            </a>
            
            {/* 네비게이션 */}
            <nav class="hidden md:flex items-center space-x-8">
              <a href="/" class="text-primary-600 dark:text-primary-400 font-medium">홈</a>
              <a href="/dashboard" class="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">대시보드</a>
              <a href="/analytics" class="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">분석</a>
              <a href="/settings" class="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">설정</a>
            </nav>
            
            {/* 우측 버튼들 */}
            <div class="flex items-center space-x-3">
              <button onclick="toggleDarkMode()" class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-card transition-colors">
                <i class="fas fa-moon dark:hidden text-slate-600"></i>
                <i class="fas fa-sun hidden dark:block text-yellow-400"></i>
              </button>
              <button onclick="openApiKeyModal()" class="hidden sm:flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors">
                <i class="fas fa-key"></i>
                <span>API 설정</span>
              </button>
              {/* 모바일 메뉴 버튼 */}
              <button onclick="toggleMobileMenu()" class="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-card">
                <i class="fas fa-bars text-slate-600 dark:text-slate-400"></i>
              </button>
            </div>
          </div>
        </div>
        
        {/* 모바일 메뉴 */}
        <div id="mobile-menu" class="hidden md:hidden border-t border-slate-200 dark:border-dark-border bg-white dark:bg-dark-bg">
          <nav class="px-4 py-3 space-y-2">
            <a href="/" class="block px-4 py-2 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">홈</a>
            <a href="/dashboard" class="block px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-card text-slate-600 dark:text-slate-400">대시보드</a>
            <a href="/analytics" class="block px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-card text-slate-600 dark:text-slate-400">분석</a>
            <a href="/settings" class="block px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-card text-slate-600 dark:text-slate-400">설정</a>
            <button onclick="openApiKeyModal()" class="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg">
              <i class="fas fa-key"></i>
              <span>API 설정</span>
            </button>
          </nav>
        </div>
      </header>
      
      {/* 히어로 섹션 */}
      <section class="pt-24 pb-16 sm:pt-32 sm:pb-24 relative overflow-hidden">
        {/* 배경 그라데이션 */}
        <div class="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-blue-50 dark:from-dark-bg dark:via-slate-900 dark:to-slate-800"></div>
        <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-100/50 to-transparent dark:from-primary-900/20"></div>
        
        {/* 장식 요소 */}
        <div class="absolute top-20 left-10 w-72 h-72 bg-primary-300/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
        
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            {/* 배지 */}
            <div class="inline-flex items-center space-x-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-6 animate-fade-in">
              <span class="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
              <span class="text-sm font-medium text-primary-700 dark:text-primary-300">AI 마케팅 자동화 플랫폼</span>
            </div>
            
            {/* 메인 타이틀 */}
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 animate-slide-up">
              <span class="bg-gradient-to-r from-primary-600 via-primary-500 to-emerald-400 bg-clip-text text-transparent">
                30개 AI 봇
              </span>이<br class="sm:hidden" />
              마케팅을 완전 자동화
            </h1>
            
            <p class="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto animate-slide-up" style="animation-delay: 0.1s">
              먼저 다가가는 영업사원처럼!<br />
              고객 응대부터 SNS 마케팅까지, AI가 대신합니다.
            </p>
            
            {/* CTA 버튼 */}
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style="animation-delay: 0.2s">
              <button onclick="scrollToForm()" class="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all transform hover:-translate-y-1">
                <i class="fas fa-rocket mr-2"></i>
                지금 시작하기
              </button>
              <a href="/dashboard" class="w-full sm:w-auto px-8 py-4 bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                <i class="fas fa-th-large mr-2"></i>
                대시보드 보기
              </a>
            </div>
          </div>
          
          {/* 통계 카드 */}
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 animate-slide-up" style="animation-delay: 0.3s">
            <div class="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-dark-border text-center">
              <div class="text-3xl sm:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">30개</div>
              <div class="text-sm text-slate-600 dark:text-slate-400">전문 AI 봇</div>
            </div>
            <div class="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-dark-border text-center">
              <div class="text-3xl sm:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">1,247</div>
              <div class="text-sm text-slate-600 dark:text-slate-400">등록 매장</div>
            </div>
            <div class="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-dark-border text-center">
              <div class="text-3xl sm:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">52,834</div>
              <div class="text-sm text-slate-600 dark:text-slate-400">봇 실행 횟수</div>
            </div>
            <div class="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-dark-border text-center">
              <div class="text-3xl sm:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">98.5%</div>
              <div class="text-sm text-slate-600 dark:text-slate-400">만족도</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 업종 선택 섹션 */}
      <section class="py-16 bg-white dark:bg-dark-card">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              업종을 선택하세요
            </h2>
            <p class="text-slate-600 dark:text-slate-400">
              업종에 맞는 전문 AI 봇들이 대기하고 있습니다
            </p>
          </div>
          
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4" id="industry-selector">
            <button onclick="selectIndustry('cafe')" class="industry-btn group p-6 bg-slate-50 dark:bg-dark-bg rounded-2xl border-2 border-transparent hover:border-primary-500 transition-all" data-industry="cafe">
              <div class="text-4xl mb-3 group-hover:scale-110 transition-transform">☕</div>
              <div class="font-semibold text-slate-700 dark:text-slate-300">카페</div>
            </button>
            <button onclick="selectIndustry('chicken')" class="industry-btn group p-6 bg-slate-50 dark:bg-dark-bg rounded-2xl border-2 border-transparent hover:border-primary-500 transition-all" data-industry="chicken">
              <div class="text-4xl mb-3 group-hover:scale-110 transition-transform">🍗</div>
              <div class="font-semibold text-slate-700 dark:text-slate-300">치킨집</div>
            </button>
            <button onclick="selectIndustry('korean')" class="industry-btn group p-6 bg-slate-50 dark:bg-dark-bg rounded-2xl border-2 border-transparent hover:border-primary-500 transition-all" data-industry="korean">
              <div class="text-4xl mb-3 group-hover:scale-110 transition-transform">🍚</div>
              <div class="font-semibold text-slate-700 dark:text-slate-300">한식당</div>
            </button>
            <button onclick="selectIndustry('salon')" class="industry-btn group p-6 bg-slate-50 dark:bg-dark-bg rounded-2xl border-2 border-transparent hover:border-primary-500 transition-all" data-industry="salon">
              <div class="text-4xl mb-3 group-hover:scale-110 transition-transform">💇</div>
              <div class="font-semibold text-slate-700 dark:text-slate-300">미용실</div>
            </button>
            <button onclick="selectIndustry('restaurant')" class="industry-btn group p-6 bg-slate-50 dark:bg-dark-bg rounded-2xl border-2 border-transparent hover:border-primary-500 transition-all" data-industry="restaurant">
              <div class="text-4xl mb-3 group-hover:scale-110 transition-transform">🍽️</div>
              <div class="font-semibold text-slate-700 dark:text-slate-300">음식점</div>
            </button>
            <button onclick="selectIndustry('retail')" class="industry-btn group p-6 bg-slate-50 dark:bg-dark-bg rounded-2xl border-2 border-transparent hover:border-primary-500 transition-all" data-industry="retail">
              <div class="text-4xl mb-3 group-hover:scale-110 transition-transform">🛒</div>
              <div class="font-semibold text-slate-700 dark:text-slate-300">소매점</div>
            </button>
          </div>
        </div>
      </section>
      
      {/* 매장 정보 입력 섹션 */}
      <section id="store-form-section" class="py-16 bg-slate-50 dark:bg-dark-bg">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-white dark:bg-dark-card rounded-3xl shadow-xl border border-slate-100 dark:border-dark-border overflow-hidden">
            {/* 폼 헤더 */}
            <div class="bg-gradient-to-r from-primary-500 to-primary-600 p-6 sm:p-8">
              <h2 class="text-2xl sm:text-3xl font-bold text-white mb-2">
                <i class="fas fa-store mr-3"></i>
                매장 정보 입력
              </h2>
              <p class="text-primary-100">
                AI 봇이 맞춤형 마케팅 콘텐츠를 생성할 수 있도록 정보를 입력해주세요
              </p>
            </div>
            
            {/* 폼 본문 */}
            <form id="store-form" class="p-6 sm:p-8 space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* 매장명 */}
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    <i class="fas fa-store text-primary-500 mr-2"></i>매장명 *
                  </label>
                  <input type="text" id="store-name" name="name" required
                    class="w-full px-4 py-3 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="예: 스마일 카페" />
                </div>
                
                {/* 위치 */}
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    <i class="fas fa-map-marker-alt text-primary-500 mr-2"></i>위치 *
                  </label>
                  <input type="text" id="store-location" name="location" required
                    class="w-full px-4 py-3 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="예: 서울 강남구 역삼동" />
                </div>
                
                {/* 업종 (자동 선택됨) */}
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    <i class="fas fa-tags text-primary-500 mr-2"></i>업종
                  </label>
                  <select id="store-industry" name="industry"
                    class="w-full px-4 py-3 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all">
                    <option value="cafe">☕ 카페</option>
                    <option value="chicken">🍗 치킨집</option>
                    <option value="korean">🍚 한식당</option>
                    <option value="salon">💇 미용실</option>
                    <option value="restaurant">🍽️ 음식점</option>
                    <option value="retail">🛒 소매점</option>
                  </select>
                </div>
                
                {/* 대표 메뉴/서비스 */}
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    <i class="fas fa-star text-primary-500 mr-2"></i>대표 메뉴/서비스
                  </label>
                  <input type="text" id="store-main-product" name="mainProduct"
                    class="w-full px-4 py-3 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="예: 시그니처 라떼, 수제 케이크" />
                </div>
                
                {/* 평균 가격대 */}
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    <i class="fas fa-won-sign text-primary-500 mr-2"></i>평균 가격대
                  </label>
                  <input type="text" id="store-price-range" name="priceRange"
                    class="w-full px-4 py-3 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="예: 5,000원~15,000원" />
                </div>
                
                {/* 타겟 고객 */}
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    <i class="fas fa-users text-primary-500 mr-2"></i>타겟 고객
                  </label>
                  <input type="text" id="store-target" name="targetCustomer"
                    class="w-full px-4 py-3 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="예: 20-30대 직장인" />
                </div>
              </div>
              
              {/* 특이사항 */}
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <i class="fas fa-info-circle text-primary-500 mr-2"></i>특이사항/강점
                </label>
                <textarea id="store-note" name="specialNote" rows={3}
                  class="w-full px-4 py-3 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                  placeholder="예: 넓은 주차장 완비, 애견 동반 가능, 프라이빗 룸 보유"></textarea>
              </div>
              
              {/* 제출 버튼 */}
              <div class="flex flex-col sm:flex-row gap-4 pt-4">
                <button type="submit"
                  class="flex-1 px-6 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-xl transition-all">
                  <i class="fas fa-save mr-2"></i>
                  저장 후 대시보드로 이동
                </button>
                <button type="button" onclick="executeAllBots()"
                  class="flex-1 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-xl transition-all">
                  <i class="fas fa-bolt mr-2"></i>
                  전체 봇 실행
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      {/* 봇 미리보기 섹션 */}
      <section class="py-16 bg-white dark:bg-dark-card">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              30개 전문 AI 봇
            </h2>
            <p class="text-slate-600 dark:text-slate-400">
              각 분야 전문가처럼 먼저 다가가는 영업사원 봇들
            </p>
          </div>
          
          {/* 봇 카테고리 탭 */}
          <div class="flex flex-wrap justify-center gap-2 mb-8">
            <button onclick="filterBots('all')" class="bot-filter-btn px-4 py-2 rounded-full bg-primary-500 text-white font-medium transition-all" data-filter="all">
              전체
            </button>
            <button onclick="filterBots('고객응대')" class="bot-filter-btn px-4 py-2 rounded-full bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 font-medium hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-all" data-filter="고객응대">
              고객응대
            </button>
            <button onclick="filterBots('콘텐츠')" class="bot-filter-btn px-4 py-2 rounded-full bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 font-medium hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-all" data-filter="콘텐츠">
              콘텐츠
            </button>
            <button onclick="filterBots('고객관계')" class="bot-filter-btn px-4 py-2 rounded-full bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 font-medium hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-all" data-filter="고객관계">
              고객관계
            </button>
            <button onclick="filterBots('소셜미디어')" class="bot-filter-btn px-4 py-2 rounded-full bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 font-medium hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-all" data-filter="소셜미디어">
              소셜미디어
            </button>
            <button onclick="filterBots('디지털마케팅')" class="bot-filter-btn px-4 py-2 rounded-full bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 font-medium hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-all" data-filter="디지털마케팅">
              디지털마케팅
            </button>
            <button onclick="filterBots('전략분석')" class="bot-filter-btn px-4 py-2 rounded-full bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 font-medium hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-all" data-filter="전략분석">
              전략분석
            </button>
          </div>
          
          {/* 봇 카드 그리드 */}
          <div id="bot-cards" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* 봇 카드들은 JavaScript로 렌더링 */}
          </div>
        </div>
      </section>
      
      {/* 푸터 */}
      <footer class="bg-slate-900 text-slate-400 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row items-center justify-between">
            <div class="flex items-center space-x-2 mb-4 md:mb-0">
              <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <i class="fas fa-robot text-white text-sm"></i>
              </div>
              <span class="text-lg font-bold text-white">STUDIOJUAI</span>
            </div>
            <p class="text-sm">
              © 2024 STUDIOJUAI. AI 마케팅 자동화 플랫폼
            </p>
          </div>
        </div>
      </footer>
      
      {/* API 키 모달 */}
      <div id="api-key-modal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white dark:bg-dark-card rounded-2xl shadow-2xl max-w-md w-full">
          <div class="p-6 border-b border-slate-200 dark:border-dark-border">
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-bold text-slate-900 dark:text-white">
                <i class="fas fa-key text-primary-500 mr-2"></i>
                Gemini API 설정
              </h3>
              <button onclick="closeApiKeyModal()" class="p-2 hover:bg-slate-100 dark:hover:bg-dark-bg rounded-lg transition-colors">
                <i class="fas fa-times text-slate-500"></i>
              </button>
            </div>
          </div>
          <div class="p-6 space-y-4">
            <p class="text-sm text-slate-600 dark:text-slate-400">
              Google AI Studio에서 발급받은 Gemini API 키를 입력하세요.
              <a href="https://aistudio.google.com/app/apikey" target="_blank" class="text-primary-500 hover:underline ml-1">
                API 키 발급받기 →
              </a>
            </p>
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                API Key
              </label>
              <input type="password" id="api-key-input"
                class="w-full px-4 py-3 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="AIza..." />
            </div>
            <div class="flex gap-3">
              <button onclick="validateApiKey()" class="flex-1 px-4 py-3 bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <i class="fas fa-check-circle mr-2"></i>검증
              </button>
              <button onclick="saveApiKey()" class="flex-1 px-4 py-3 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 transition-colors">
                <i class="fas fa-save mr-2"></i>저장
              </button>
            </div>
            <p id="api-key-status" class="text-sm text-center hidden"></p>
          </div>
        </div>
      </div>
      
      {/* 페이지 스크립트 */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // 봇 데이터
          const botsData = [
            { id: 'greeting', name: '첫인사 봇', icon: '👋', category: '고객응대', desc: '신규 고객 환영 메시지' },
            { id: 'menu', name: '메뉴추천 봇', icon: '🍽️', category: '고객응대', desc: '맞춤 메뉴 추천' },
            { id: 'event', name: '이벤트 안내 봇', icon: '🎉', category: '고객응대', desc: '프로모션 홍보' },
            { id: 'review', name: '리뷰 요청 봇', icon: '⭐', category: '고객응대', desc: '리뷰 작성 유도' },
            { id: 'sns', name: 'SNS 홍보 봇', icon: '📱', category: '고객응대', desc: 'SNS 홍보 문구' },
            { id: 'blog', name: '블로그 콘텐츠 봇', icon: '📝', category: '콘텐츠', desc: '블로그 글 작성' },
            { id: 'keyword', name: '키워드 분석 봇', icon: '🔍', category: '콘텐츠', desc: '검색 키워드 발굴' },
            { id: 'competitor', name: '경쟁사 분석 봇', icon: '🎯', category: '콘텐츠', desc: '경쟁 분석' },
            { id: 'local', name: '지역 마케팅 봇', icon: '📍', category: '콘텐츠', desc: '지역 타겟 전략' },
            { id: 'seasonal', name: '시즌 마케팅 봇', icon: '🗓️', category: '콘텐츠', desc: '시즌별 프로모션' },
            { id: 'loyalty', name: '단골 관리 봇', icon: '💎', category: '고객관계', desc: 'VIP 고객 관리' },
            { id: 'upsell', name: '업셀링 봇', icon: '📈', category: '고객관계', desc: '추가 구매 유도' },
            { id: 'referral', name: '소개 유도 봇', icon: '🤝', category: '고객관계', desc: '지인 소개 프로그램' },
            { id: 'feedback', name: '피드백 수집 봇', icon: '💬', category: '고객관계', desc: '고객 의견 수집' },
            { id: 'crisis', name: '불만 대응 봇', icon: '🆘', category: '고객관계', desc: '불만 고객 응대' },
            { id: 'story', name: '스토리 콘텐츠 봇', icon: '📸', category: '소셜미디어', desc: '인스타 스토리 기획' },
            { id: 'visual', name: '비주얼 기획 봇', icon: '🎬', category: '소셜미디어', desc: '사진/영상 가이드' },
            { id: 'hashtag', name: '해시태그 전략 봇', icon: '#️⃣', category: '소셜미디어', desc: '해시태그 조합' },
            { id: 'influencer', name: '인플루언서 협업 봇', icon: '🌟', category: '소셜미디어', desc: '인플루언서 전략' },
            { id: 'community', name: '커뮤니티 관리 봇', icon: '👥', category: '소셜미디어', desc: '커뮤니티 활동' },
            { id: 'email', name: '이메일 마케팅 봇', icon: '📧', category: '디지털마케팅', desc: '이메일 캠페인' },
            { id: 'sms', name: 'SMS 마케팅 봇', icon: '💌', category: '디지털마케팅', desc: '문자 메시지' },
            { id: 'push', name: '푸시 알림 봇', icon: '🔔', category: '디지털마케팅', desc: '푸시 알림 작성' },
            { id: 'retarget', name: '리타겟팅 봇', icon: '🔄', category: '디지털마케팅', desc: '이탈 고객 재유입' },
            { id: 'partnership', name: '제휴 마케팅 봇', icon: '🤜', category: '디지털마케팅', desc: '업체 간 제휴' },
            { id: 'pricing', name: '가격 전략 봇', icon: '💰', category: '전략분석', desc: '가격 책정 전략' },
            { id: 'bundle', name: '번들 기획 봇', icon: '📦', category: '전략분석', desc: '세트 상품 기획' },
            { id: 'flash', name: '플래시 세일 봇', icon: '⚡', category: '전략분석', desc: '긴급 할인 이벤트' },
            { id: 'membership', name: '멤버십 기획 봇', icon: '🏆', category: '전략분석', desc: '고객 등급제 설계' },
            { id: 'analytics', name: '성과 분석 봇', icon: '📊', category: '전략분석', desc: '마케팅 성과 분석' },
          ];
          
          let selectedIndustry = 'cafe';
          let currentFilter = 'all';
          
          // 페이지 로드 시 초기화
          document.addEventListener('DOMContentLoaded', function() {
            renderBotCards();
            loadSavedData();
            
            // API 키 상태 확인
            if (!ApiKeyManager.isSet()) {
              setTimeout(() => {
                showToast('Gemini API 키를 설정해주세요', 'warning');
              }, 2000);
            }
          });
          
          // 봇 카드 렌더링
          function renderBotCards() {
            const container = document.getElementById('bot-cards');
            const filteredBots = currentFilter === 'all' 
              ? botsData 
              : botsData.filter(b => b.category === currentFilter);
            
            container.innerHTML = filteredBots.map(bot => \`
              <div class="bot-card group bg-slate-50 dark:bg-dark-bg rounded-2xl p-4 border border-slate-100 dark:border-dark-border hover:border-primary-500 hover:shadow-lg transition-all cursor-pointer" data-category="\${bot.category}" onclick="quickExecuteBot('\${bot.id}')">
                <div class="text-3xl mb-2 group-hover:scale-110 transition-transform">\${bot.icon}</div>
                <h4 class="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-1">\${bot.name}</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400">\${bot.desc}</p>
              </div>
            \`).join('');
          }
          
          // 봇 필터링
          function filterBots(category) {
            currentFilter = category;
            
            // 버튼 스타일 업데이트
            document.querySelectorAll('.bot-filter-btn').forEach(btn => {
              if (btn.dataset.filter === category) {
                btn.className = 'bot-filter-btn px-4 py-2 rounded-full bg-primary-500 text-white font-medium transition-all';
              } else {
                btn.className = 'bot-filter-btn px-4 py-2 rounded-full bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 font-medium hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-all';
              }
            });
            
            renderBotCards();
          }
          
          // 업종 선택
          function selectIndustry(industry) {
            selectedIndustry = industry;
            
            // 버튼 스타일 업데이트
            document.querySelectorAll('.industry-btn').forEach(btn => {
              if (btn.dataset.industry === industry) {
                btn.classList.add('border-primary-500', 'bg-primary-50', 'dark:bg-primary-900/20');
              } else {
                btn.classList.remove('border-primary-500', 'bg-primary-50', 'dark:bg-primary-900/20');
              }
            });
            
            // 셀렉트 박스 업데이트
            document.getElementById('store-industry').value = industry;
            
            showToast('업종이 선택되었습니다', 'success');
          }
          
          // 폼으로 스크롤
          function scrollToForm() {
            document.getElementById('store-form-section').scrollIntoView({ behavior: 'smooth' });
          }
          
          // 저장된 데이터 로드
          function loadSavedData() {
            const saved = StoreInfoManager.get();
            if (saved) {
              document.getElementById('store-name').value = saved.name || '';
              document.getElementById('store-location').value = saved.location || '';
              document.getElementById('store-industry').value = saved.industry || 'cafe';
              document.getElementById('store-main-product').value = saved.mainProduct || '';
              document.getElementById('store-price-range').value = saved.priceRange || '';
              document.getElementById('store-target').value = saved.targetCustomer || '';
              document.getElementById('store-note').value = saved.specialNote || '';
              
              selectIndustry(saved.industry || 'cafe');
            }
            
            // API 키 로드
            const apiKey = ApiKeyManager.get();
            if (apiKey) {
              document.getElementById('api-key-input').value = apiKey;
            }
          }
          
          // 폼 제출
          document.getElementById('store-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const storeInfo = {
              name: document.getElementById('store-name').value,
              location: document.getElementById('store-location').value,
              industry: document.getElementById('store-industry').value,
              mainProduct: document.getElementById('store-main-product').value,
              priceRange: document.getElementById('store-price-range').value,
              targetCustomer: document.getElementById('store-target').value,
              specialNote: document.getElementById('store-note').value,
            };
            
            StoreInfoManager.set(storeInfo);
            showToast('매장 정보가 저장되었습니다', 'success');
            
            setTimeout(() => {
              window.location.href = '/dashboard';
            }, 1000);
          });
          
          // 빠른 봇 실행
          async function quickExecuteBot(botId) {
            if (!ApiKeyManager.isSet()) {
              showToast('먼저 API 키를 설정해주세요', 'warning');
              openApiKeyModal();
              return;
            }
            
            const storeInfo = getStoreInfo();
            if (!storeInfo.name) {
              showToast('매장 정보를 입력해주세요', 'warning');
              scrollToForm();
              return;
            }
            
            showLoading('봇 실행 중...');
            
            try {
              const response = await fetch('/api/bot/execute', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'X-Gemini-Key': ApiKeyManager.get()
                },
                body: JSON.stringify({
                  botId,
                  storeInfo,
                  industry: selectedIndustry
                })
              });
              
              const data = await response.json();
              hideLoading();
              
              if (data.success) {
                showResultModal(data.botName, data.result);
              } else {
                showToast(data.error || '봇 실행 실패', 'error');
              }
            } catch (error) {
              hideLoading();
              showToast('봇 실행 중 오류가 발생했습니다', 'error');
            }
          }
          
          // 전체 봇 실행
          async function executeAllBots() {
            if (!ApiKeyManager.isSet()) {
              showToast('먼저 API 키를 설정해주세요', 'warning');
              openApiKeyModal();
              return;
            }
            
            const storeInfo = getStoreInfo();
            if (!storeInfo.name) {
              showToast('매장 정보를 입력해주세요', 'warning');
              return;
            }
            
            // 매장 정보 저장
            StoreInfoManager.set(storeInfo);
            
            showToast('대시보드로 이동하여 전체 봇을 실행합니다', 'info');
            setTimeout(() => {
              window.location.href = '/dashboard?executeAll=true';
            }, 1000);
          }
          
          // 매장 정보 가져오기
          function getStoreInfo() {
            return {
              name: document.getElementById('store-name').value,
              location: document.getElementById('store-location').value,
              industry: document.getElementById('store-industry').value,
              mainProduct: document.getElementById('store-main-product').value,
              priceRange: document.getElementById('store-price-range').value,
              targetCustomer: document.getElementById('store-target').value,
              specialNote: document.getElementById('store-note').value,
            };
          }
          
          // 결과 모달 표시
          function showResultModal(botName, result) {
            const modal = document.createElement('div');
            modal.id = 'result-modal';
            modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
            modal.innerHTML = \`
              <div class="bg-white dark:bg-dark-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
                <div class="p-6 border-b border-slate-200 dark:border-dark-border flex items-center justify-between">
                  <h3 class="text-xl font-bold text-slate-900 dark:text-white">\${botName} 결과</h3>
                  <button onclick="document.getElementById('result-modal').remove()" class="p-2 hover:bg-slate-100 dark:hover:bg-dark-bg rounded-lg">
                    <i class="fas fa-times text-slate-500"></i>
                  </button>
                </div>
                <div class="p-6 overflow-y-auto max-h-[60vh]">
                  <div class="prose dark:prose-invert max-w-none whitespace-pre-wrap">\${result}</div>
                </div>
                <div class="p-4 border-t border-slate-200 dark:border-dark-border flex justify-end gap-2">
                  <button onclick="copyResult()" class="px-4 py-2 bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700">
                    <i class="fas fa-copy mr-2"></i>복사
                  </button>
                  <button onclick="document.getElementById('result-modal').remove()" class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
                    확인
                  </button>
                </div>
              </div>
            \`;
            document.body.appendChild(modal);
            
            // 결과 저장 (복사용)
            window.currentResult = result;
          }
          
          // 결과 복사
          function copyResult() {
            if (window.currentResult) {
              navigator.clipboard.writeText(window.currentResult);
              showToast('클립보드에 복사되었습니다', 'success');
            }
          }
          
          // 모바일 메뉴 토글
          function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
          }
          
          // API 키 모달 열기
          function openApiKeyModal() {
            document.getElementById('api-key-modal').classList.remove('hidden');
          }
          
          // API 키 모달 닫기
          function closeApiKeyModal() {
            document.getElementById('api-key-modal').classList.add('hidden');
          }
          
          // API 키 검증
          async function validateApiKey() {
            const apiKey = document.getElementById('api-key-input').value;
            const statusEl = document.getElementById('api-key-status');
            
            if (!apiKey) {
              statusEl.textContent = 'API 키를 입력해주세요';
              statusEl.className = 'text-sm text-center text-red-500';
              statusEl.classList.remove('hidden');
              return;
            }
            
            statusEl.textContent = '검증 중...';
            statusEl.className = 'text-sm text-center text-blue-500';
            statusEl.classList.remove('hidden');
            
            try {
              const response = await fetch('/api/validate-key', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ apiKey })
              });
              
              const data = await response.json();
              
              if (data.success) {
                statusEl.textContent = '✓ API 키가 유효합니다';
                statusEl.className = 'text-sm text-center text-green-500';
              } else {
                statusEl.textContent = '✗ ' + (data.error || 'API 키가 유효하지 않습니다');
                statusEl.className = 'text-sm text-center text-red-500';
              }
            } catch (error) {
              statusEl.textContent = '검증 중 오류가 발생했습니다';
              statusEl.className = 'text-sm text-center text-red-500';
            }
          }
          
          // API 키 저장
          function saveApiKey() {
            const apiKey = document.getElementById('api-key-input').value;
            
            if (!apiKey) {
              showToast('API 키를 입력해주세요', 'warning');
              return;
            }
            
            ApiKeyManager.set(apiKey);
            closeApiKeyModal();
            showToast('API 키가 저장되었습니다', 'success');
          }
        `
      }} />
    </>
  )
}
