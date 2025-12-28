import type { Context } from 'hono'

export const mainPage = (c: Context) => {
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
              <a href="/" class="text-primary-600 dark:text-primary-400 font-medium">홈</a>
              <a href="/dashboard" class="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">대시보드</a>
              <a href="/analytics" class="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">분석</a>
              <a href="/settings" class="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">설정</a>
            </nav>
            
            <div class="flex items-center space-x-3">
              <button onclick="toggleDarkMode()" class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-card transition-colors">
                <i class="fas fa-moon dark:hidden text-slate-600"></i>
                <i class="fas fa-sun hidden dark:block text-yellow-400"></i>
              </button>
              <button onclick="openApiKeyModal()" class="hidden sm:flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors">
                <i class="fas fa-key"></i>
                <span>API 설정</span>
              </button>
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
          </nav>
        </div>
      </header>
      
      {/* 히어로 섹션 */}
      <section class="pt-24 pb-16 sm:pt-32 sm:pb-24 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-blue-50 dark:from-dark-bg dark:via-slate-900 dark:to-slate-800"></div>
        <div class="absolute top-20 left-10 w-72 h-72 bg-primary-300/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
        
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <div class="inline-flex items-center space-x-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-6">
              <span class="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
              <span class="text-sm font-medium text-primary-700 dark:text-primary-300">상권분석 기반 AI 마케팅</span>
            </div>
            
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              <span class="bg-gradient-to-r from-primary-600 via-primary-500 to-emerald-400 bg-clip-text text-transparent">
                상권분석
              </span>부터<br class="sm:hidden" />
              마케팅 실행까지
            </h1>
            
            <p class="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              반경 2/3/5km 상권을 분석하고,<br />
              타겟에 맞는 30개 AI 봇이 마케팅을 자동화합니다.
            </p>
            
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onclick="scrollToForm()" class="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-xl transition-all transform hover:-translate-y-1">
                <i class="fas fa-map-marked-alt mr-2"></i>
                상권분석 시작하기
              </button>
              <a href="/dashboard" class="w-full sm:w-auto px-8 py-4 bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                <i class="fas fa-th-large mr-2"></i>
                대시보드 보기
              </a>
            </div>
          </div>
          
          {/* 플로우 다이어그램 */}
          <div class="mt-16 bg-white dark:bg-dark-card rounded-2xl p-6 shadow-xl border border-slate-100 dark:border-dark-border">
            <h3 class="text-center text-lg font-semibold text-slate-700 dark:text-slate-300 mb-6">실행 순서</h3>
            <div class="flex flex-col md:flex-row items-center justify-center gap-4">
              <div class="flex items-center space-x-3 px-6 py-4 bg-red-50 dark:bg-red-900/20 rounded-xl border-2 border-red-200 dark:border-red-800">
                <div class="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center"><i class="fas fa-map-marked-alt text-white"></i></div>
                <div>
                  <div class="font-bold text-red-700 dark:text-red-400">1. 상권분석</div>
                  <div class="text-sm text-red-600 dark:text-red-300">반경 설정 - 경쟁사/타겟 분석</div>
                </div>
              </div>
              <i class="fas fa-arrow-right text-slate-400 hidden md:block"></i>
              <i class="fas fa-arrow-down text-slate-400 md:hidden"></i>
              <div class="flex items-center space-x-3 px-6 py-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border-2 border-amber-200 dark:border-amber-800">
                <div class="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center"><i class="fas fa-crosshairs text-white"></i></div>
                <div>
                  <div class="font-bold text-amber-700 dark:text-amber-400">2. 타겟 도출</div>
                  <div class="text-sm text-amber-600 dark:text-amber-300">상권 기반 핵심 고객층</div>
                </div>
              </div>
              <i class="fas fa-arrow-right text-slate-400 hidden md:block"></i>
              <i class="fas fa-arrow-down text-slate-400 md:hidden"></i>
              <div class="flex items-center space-x-3 px-6 py-4 bg-green-50 dark:bg-green-900/20 rounded-xl border-2 border-green-200 dark:border-green-800">
                <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center"><i class="fas fa-robot text-white"></i></div>
                <div>
                  <div class="font-bold text-green-700 dark:text-green-400">3. 봇 실행</div>
                  <div class="text-sm text-green-600 dark:text-green-300">25개 봇 맞춤 콘텐츠 생성</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 매장 정보 + 상권분석 섹션 */}
      <section id="store-form-section" class="py-16 bg-slate-50 dark:bg-dark-bg">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-white dark:bg-dark-card rounded-3xl shadow-xl border border-slate-100 dark:border-dark-border overflow-hidden">
            {/* 폼 헤더 */}
            <div class="bg-gradient-to-r from-primary-500 to-primary-600 p-6 sm:p-8">
              <h2 class="text-2xl sm:text-3xl font-bold text-white mb-2">
                <i class="fas fa-store mr-3"></i>
                매장 정보 & 상권분석
              </h2>
              <p class="text-primary-100">
                매장 정보를 입력하고 상권을 분석하세요
              </p>
            </div>
            
            {/* 폼 본문 */}
            <form id="store-form" class="p-6 sm:p-8 space-y-6">
              {/* 업종 선택 */}
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  <i class="fas fa-tags text-primary-500 mr-2"></i>업종 선택 *
                </label>
                
                {/* 업종 대분류 탭 */}
                <div class="flex flex-wrap gap-2 mb-4" id="industry-category-tabs">
                  <button type="button" onclick="showIndustryCategory('food')" class="industry-tab px-4 py-2 rounded-lg bg-primary-500 text-white text-sm font-medium transition-all" data-category="food">
                    <i class="fas fa-utensils mr-1"></i>음식/요식업
                  </button>
                  <button type="button" onclick="showIndustryCategory('beauty')" class="industry-tab px-4 py-2 rounded-lg bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-200 transition-all" data-category="beauty">
                    <i class="fas fa-spa mr-1"></i>미용/뷰티
                  </button>
                  <button type="button" onclick="showIndustryCategory('retail')" class="industry-tab px-4 py-2 rounded-lg bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-200 transition-all" data-category="retail">
                    <i class="fas fa-shopping-bag mr-1"></i>소매/판매
                  </button>
                  <button type="button" onclick="showIndustryCategory('service')" class="industry-tab px-4 py-2 rounded-lg bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-200 transition-all" data-category="service">
                    <i class="fas fa-concierge-bell mr-1"></i>서비스업
                  </button>
                  <button type="button" onclick="showIndustryCategory('health')" class="industry-tab px-4 py-2 rounded-lg bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-200 transition-all" data-category="health">
                    <i class="fas fa-heartbeat mr-1"></i>의료/건강
                  </button>
                  <button type="button" onclick="showIndustryCategory('auto')" class="industry-tab px-4 py-2 rounded-lg bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-200 transition-all" data-category="auto">
                    <i class="fas fa-car mr-1"></i>자동차
                  </button>
                  <button type="button" onclick="showIndustryCategory('lodging')" class="industry-tab px-4 py-2 rounded-lg bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-200 transition-all" data-category="lodging">
                    <i class="fas fa-bed mr-1"></i>숙박/임대
                  </button>
                </div>
                
                {/* 업종 세부 선택 */}
                <div class="bg-slate-50 dark:bg-dark-bg rounded-xl p-4 border border-slate-200 dark:border-dark-border">
                  {/* 음식/요식업 */}
                  <div id="industry-food" class="industry-category grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
                    <button type="button" onclick="selectIndustry('cafe')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="cafe">
                      <i class="fas fa-mug-hot text-amber-600 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">카페</div>
                    </button>
                    <button type="button" onclick="selectIndustry('chicken')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="chicken">
                      <i class="fas fa-drumstick-bite text-orange-500 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">치킨집</div>
                    </button>
                    <button type="button" onclick="selectIndustry('korean')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="korean">
                      <i class="fas fa-bowl-rice text-green-600 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">한식당</div>
                    </button>
                    <button type="button" onclick="selectIndustry('chinese')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="chinese">
                      <i class="fas fa-bowl-food text-red-600 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">중식당</div>
                    </button>
                    <button type="button" onclick="selectIndustry('japanese')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="japanese">
                      <i class="fas fa-fish text-blue-500 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">일식당</div>
                    </button>
                    <button type="button" onclick="selectIndustry('western')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="western">
                      <i class="fas fa-burger text-yellow-600 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">양식당</div>
                    </button>
                    <button type="button" onclick="selectIndustry('fastfood')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="fastfood">
                      <i class="fas fa-hotdog text-red-500 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">패스트푸드</div>
                    </button>
                    <button type="button" onclick="selectIndustry('pizza')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="pizza">
                      <i class="fas fa-pizza-slice text-orange-600 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">피자집</div>
                    </button>
                    <button type="button" onclick="selectIndustry('bakery')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="bakery">
                      <i class="fas fa-bread-slice text-amber-500 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">베이커리</div>
                    </button>
                    <button type="button" onclick="selectIndustry('dessert')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="dessert">
                      <i class="fas fa-ice-cream text-pink-400 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">디저트</div>
                    </button>
                    <button type="button" onclick="selectIndustry('bar')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="bar">
                      <i class="fas fa-beer-mug-empty text-amber-700 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">주점/술집</div>
                    </button>
                    <button type="button" onclick="selectIndustry('bbq')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="bbq">
                      <i class="fas fa-fire text-red-600 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">고깃집</div>
                    </button>
                    <button type="button" onclick="selectIndustry('seafood')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="seafood">
                      <i class="fas fa-shrimp text-cyan-600 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">해산물/횟집</div>
                    </button>
                    <button type="button" onclick="selectIndustry('noodle')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="noodle">
                      <i class="fas fa-wheat-awn text-yellow-700 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">면요리</div>
                    </button>
                    <button type="button" onclick="selectIndustry('lunch')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="lunch">
                      <i class="fas fa-box text-green-500 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">도시락/분식</div>
                    </button>
                    <button type="button" onclick="selectIndustry('buffet')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="buffet">
                      <i class="fas fa-plate-wheat text-purple-500 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">뷔페</div>
                    </button>
                  </div>
                  
                  {/* 미용/뷰티 */}
                  <div id="industry-beauty" class="industry-category hidden grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
                    <button type="button" onclick="selectIndustry('salon')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="salon">
                      <i class="fas fa-scissors text-pink-500 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">미용실</div>
                    </button>
                    <button type="button" onclick="selectIndustry('barbershop')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="barbershop">
                      <i class="fas fa-user text-slate-600 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">이발소</div>
                    </button>
                    <button type="button" onclick="selectIndustry('nail')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="nail">
                      <i class="fas fa-hand-sparkles text-rose-400 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">네일샵</div>
                    </button>
                    <button type="button" onclick="selectIndustry('skin')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="skin">
                      <i class="fas fa-face-smile text-amber-400 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">피부관리</div>
                    </button>
                    <button type="button" onclick="selectIndustry('spa')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="spa">
                      <i class="fas fa-spa text-teal-500 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">스파/마사지</div>
                    </button>
                    <button type="button" onclick="selectIndustry('makeup')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="makeup">
                      <i class="fas fa-paintbrush text-purple-500 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">메이크업</div>
                    </button>
                    <button type="button" onclick="selectIndustry('waxing')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="waxing">
                      <i class="fas fa-leaf text-green-500 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">왁싱샵</div>
                    </button>
                  </div>
                  
                  {/* 소매/판매 */}
                  <div id="industry-retail" class="industry-category hidden grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
                    <button type="button" onclick="selectIndustry('retail')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="retail">
                      <i class="fas fa-cart-shopping text-blue-500 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">소매점</div>
                    </button>
                    <button type="button" onclick="selectIndustry('convenience')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="convenience">
                      <i class="fas fa-store text-green-500 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">편의점</div>
                    </button>
                    <button type="button" onclick="selectIndustry('supermarket')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="supermarket">
                      <i class="fas fa-basket-shopping text-orange-500 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">슈퍼마켓</div>
                    </button>
                    <button type="button" onclick="selectIndustry('clothing')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="clothing">
                      <i class="fas fa-shirt text-indigo-500 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">의류매장</div>
                    </button>
                    <button type="button" onclick="selectIndustry('shoes')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="shoes">
                      <i class="fas fa-shoe-prints text-amber-700 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">신발매장</div>
                    </button>
                    <button type="button" onclick="selectIndustry('accessory')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="accessory">
                      <i class="fas fa-gem text-cyan-500 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">악세서리</div>
                    </button>
                    <button type="button" onclick="selectIndustry('cosmetic')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="cosmetic">
                      <i class="fas fa-pump-soap text-pink-500 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">화장품</div>
                    </button>
                    <button type="button" onclick="selectIndustry('phone')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="phone">
                      <i class="fas fa-mobile-screen text-slate-600 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">휴대폰</div>
                    </button>
                    <button type="button" onclick="selectIndustry('electronics')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="electronics">
                      <i class="fas fa-tv text-blue-600 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">전자제품</div>
                    </button>
                    <button type="button" onclick="selectIndustry('furniture')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="furniture">
                      <i class="fas fa-couch text-amber-600 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">가구매장</div>
                    </button>
                    <button type="button" onclick="selectIndustry('interior')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="interior">
                      <i class="fas fa-house text-teal-600 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">인테리어</div>
                    </button>
                    <button type="button" onclick="selectIndustry('flower')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="flower">
                      <i class="fas fa-seedling text-green-500 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">꽃집</div>
                    </button>
                    <button type="button" onclick="selectIndustry('pet')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="pet">
                      <i class="fas fa-paw text-orange-400 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">반려동물</div>
                    </button>
                    <button type="button" onclick="selectIndustry('book')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="book">
                      <i class="fas fa-book text-emerald-600 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">서점</div>
                    </button>
                    <button type="button" onclick="selectIndustry('stationery')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="stationery">
                      <i class="fas fa-pencil text-yellow-500 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">문구점</div>
                    </button>
                    <button type="button" onclick="selectIndustry('pharmacy')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="pharmacy">
                      <i class="fas fa-prescription-bottle-medical text-green-600 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">약국</div>
                    </button>
                    <button type="button" onclick="selectIndustry('optical')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="optical">
                      <i class="fas fa-glasses text-slate-600 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">안경점</div>
                    </button>
                  </div>
                  
                  {/* 서비스업 */}
                  <div id="industry-service" class="industry-category hidden grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
                    <button type="button" onclick="selectIndustry('laundry')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="laundry">
                      <i class="fas fa-soap text-blue-400 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">세탁소</div>
                    </button>
                    <button type="button" onclick="selectIndustry('repair')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="repair">
                      <i class="fas fa-wrench text-slate-600 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">수선/수리</div>
                    </button>
                    <button type="button" onclick="selectIndustry('printing')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="printing">
                      <i class="fas fa-print text-slate-700 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">인쇄/복사</div>
                    </button>
                    <button type="button" onclick="selectIndustry('studio')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="studio">
                      <i class="fas fa-camera text-purple-500 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">사진스튜디오</div>
                    </button>
                    <button type="button" onclick="selectIndustry('travel')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="travel">
                      <i class="fas fa-plane text-sky-500 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">여행사</div>
                    </button>
                    <button type="button" onclick="selectIndustry('realtor')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="realtor">
                      <i class="fas fa-building text-amber-600 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">부동산</div>
                    </button>
                    <button type="button" onclick="selectIndustry('insurance')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="insurance">
                      <i class="fas fa-umbrella text-blue-600 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">보험</div>
                    </button>
                    <button type="button" onclick="selectIndustry('academy')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="academy">
                      <i class="fas fa-graduation-cap text-indigo-500 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">학원</div>
                    </button>
                    <button type="button" onclick="selectIndustry('gym')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="gym">
                      <i class="fas fa-dumbbell text-red-500 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">헬스장</div>
                    </button>
                    <button type="button" onclick="selectIndustry('yoga')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="yoga">
                      <i class="fas fa-person-walking text-purple-400 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">요가/필라테스</div>
                    </button>
                    <button type="button" onclick="selectIndustry('taekwondo')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="taekwondo">
                      <i class="fas fa-hand-fist text-red-600 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">태권도</div>
                    </button>
                    <button type="button" onclick="selectIndustry('pc')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="pc">
                      <i class="fas fa-desktop text-slate-600 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">PC방</div>
                    </button>
                    <button type="button" onclick="selectIndustry('karaoke')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="karaoke">
                      <i class="fas fa-microphone text-pink-500 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">노래방</div>
                    </button>
                    <button type="button" onclick="selectIndustry('billiard')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="billiard">
                      <i class="fas fa-circle text-green-600 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">당구장</div>
                    </button>
                    <button type="button" onclick="selectIndustry('golf')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="golf">
                      <i class="fas fa-golf-ball-tee text-green-500 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">골프연습장</div>
                    </button>
                  </div>
                  
                  {/* 의료/건강 */}
                  <div id="industry-health" class="industry-category hidden grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
                    <button type="button" onclick="selectIndustry('clinic')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="clinic">
                      <i class="fas fa-hospital text-red-500 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">병원/의원</div>
                    </button>
                    <button type="button" onclick="selectIndustry('dental')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="dental">
                      <i class="fas fa-tooth text-sky-500 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">치과</div>
                    </button>
                    <button type="button" onclick="selectIndustry('oriental')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="oriental">
                      <i class="fas fa-yin-yang text-emerald-600 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">한의원</div>
                    </button>
                    <button type="button" onclick="selectIndustry('veterinary')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="veterinary">
                      <i class="fas fa-dog text-amber-500 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">동물병원</div>
                    </button>
                  </div>
                  
                  {/* 자동차 */}
                  <div id="industry-auto" class="industry-category hidden grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
                    <button type="button" onclick="selectIndustry('carwash')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="carwash">
                      <i class="fas fa-car-side text-blue-500 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">세차장</div>
                    </button>
                    <button type="button" onclick="selectIndustry('carmaintenance')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="carmaintenance">
                      <i class="fas fa-screwdriver-wrench text-slate-600 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">정비소</div>
                    </button>
                    <button type="button" onclick="selectIndustry('carparts')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="carparts">
                      <i class="fas fa-car-battery text-red-500 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">자동차용품</div>
                    </button>
                    <button type="button" onclick="selectIndustry('gasstation')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="gasstation">
                      <i class="fas fa-gas-pump text-orange-500 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">주유소</div>
                    </button>
                  </div>
                  
                  {/* 숙박/임대 */}
                  <div id="industry-lodging" class="industry-category hidden grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
                    <button type="button" onclick="selectIndustry('motel')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="motel">
                      <i class="fas fa-hotel text-purple-500 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">모텔/호텔</div>
                    </button>
                    <button type="button" onclick="selectIndustry('guesthouse')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="guesthouse">
                      <i class="fas fa-house-chimney text-amber-500 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">펜션</div>
                    </button>
                    <button type="button" onclick="selectIndustry('rental')" class="industry-btn p-2 bg-white dark:bg-dark-card rounded-lg border-2 border-transparent hover:border-primary-500 transition-all text-center" data-industry="rental">
                      <i class="fas fa-handshake text-blue-500 text-lg"></i>
                      <div class="text-xs mt-1 text-slate-700 dark:text-slate-300">렌탈샵</div>
                    </button>
                  </div>
                </div>
                
                {/* 선택된 업종 표시 */}
                <div class="mt-3 flex items-center space-x-2">
                  <span class="text-sm text-slate-500">선택된 업종:</span>
                  <span id="selected-industry-display" class="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-full">카페</span>
                </div>
                
                <input type="hidden" id="store-industry" name="industry" value="cafe" />
              </div>
              
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
                    <i class="fas fa-map-marker-alt text-primary-500 mr-2"></i>위치 (상권분석 기준) *
                  </label>
                  <input type="text" id="store-location" name="location" required
                    class="w-full px-4 py-3 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="예: 서울 강남구 역삼동" />
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
              </div>
              
              {/* 특이사항 */}
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <i class="fas fa-info-circle text-primary-500 mr-2"></i>특이사항/강점
                </label>
                <textarea id="store-note" name="specialNote" rows={2}
                  class="w-full px-4 py-3 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                  placeholder="예: 넓은 주차장 완비, 애견 동반 가능"></textarea>
              </div>
              
              {/* 상권분석 반경 선택 */}
              <div class="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-red-200 dark:border-red-800">
                <label class="block text-sm font-medium text-red-700 dark:text-red-400 mb-4">
                  <i class="fas fa-map-marked-alt mr-2"></i>상권분석 반경 선택 *
                </label>
                <div class="grid grid-cols-3 gap-4">
                  <button type="button" onclick="selectRadius(2)" class="radius-btn p-4 bg-white dark:bg-dark-card rounded-xl border-2 border-slate-200 dark:border-dark-border hover:border-red-500 transition-all text-center" data-radius="2">
                    <div class="text-3xl font-bold text-red-600 dark:text-red-400">2km</div>
                    <div class="text-xs text-slate-600 dark:text-slate-400 mt-1">도보권</div>
                  </button>
                  <button type="button" onclick="selectRadius(3)" class="radius-btn p-4 bg-white dark:bg-dark-card rounded-xl border-2 border-red-500 transition-all text-center" data-radius="3">
                    <div class="text-3xl font-bold text-red-600 dark:text-red-400">3km</div>
                    <div class="text-xs text-slate-600 dark:text-slate-400 mt-1">생활권 (추천)</div>
                  </button>
                  <button type="button" onclick="selectRadius(5)" class="radius-btn p-4 bg-white dark:bg-dark-card rounded-xl border-2 border-slate-200 dark:border-dark-border hover:border-red-500 transition-all text-center" data-radius="5">
                    <div class="text-3xl font-bold text-red-600 dark:text-red-400">5km</div>
                    <div class="text-xs text-slate-600 dark:text-slate-400 mt-1">광역권</div>
                  </button>
                </div>
                <input type="hidden" id="analysis-radius" value="3" />
              </div>
              
              {/* 버튼들 */}
              <div class="space-y-4 pt-4">
                {/* 1단계: 상권분석 실행 */}
                <button type="button" onclick="executeTradeAreaAnalysis()"
                  class="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-red-500/30 hover:shadow-xl transition-all flex items-center justify-center space-x-2">
                  <i class="fas fa-search-location text-xl"></i>
                  <span>1단계: 상권분석 실행 (5개 봇)</span>
                </button>
                
                {/* 상권분석 결과 표시 영역 */}
                <div id="trade-area-result" class="hidden bg-slate-50 dark:bg-dark-bg rounded-xl p-4 border border-slate-200 dark:border-dark-border">
                  <div class="flex items-center justify-between mb-3">
                    <h4 class="font-semibold text-slate-700 dark:text-slate-300">
                      <i class="fas fa-check-circle text-green-500 mr-2"></i>
                      상권분석 완료
                    </h4>
                    <span id="competitor-count" class="text-sm text-slate-600 dark:text-slate-400"></span>
                  </div>
                  <div id="trade-area-summary" class="text-sm text-slate-600 dark:text-slate-400"></div>
                </div>
                
                {/* 2단계: 나머지 봇 실행 */}
                <button type="button" onclick="executeAllBots()" id="execute-all-btn" disabled
                  class="w-full px-6 py-4 bg-gradient-to-r from-slate-300 to-slate-400 text-white font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 cursor-not-allowed">
                  <i class="fas fa-bolt text-xl"></i>
                  <span>2단계: 마케팅 봇 실행 (25개 봇)</span>
                </button>
                <p id="execute-all-hint" class="text-center text-sm text-slate-500">
                  * 상권분석을 먼저 실행해주세요
                </p>
                
                {/* 저장 버튼 */}
                <button type="submit"
                  class="w-full px-6 py-3 bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 font-medium rounded-xl border border-slate-200 dark:border-dark-border hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                  <i class="fas fa-save mr-2"></i>
                  매장 정보만 저장
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      {/* 봇 카테고리 소개 섹션 */}
      <section class="py-16 bg-white dark:bg-dark-card">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              30개 AI 봇 (6개 카테고리)
            </h2>
            <p class="text-slate-600 dark:text-slate-400">
              상권분석 → 타겟 도출 → 맞춤 마케팅 자동화
            </p>
          </div>
          
          {/* 카테고리 카드 */}
          <div class="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 상권분석 */}
            <div class="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-red-200 dark:border-red-800">
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                  <i class="fas fa-map-marked-alt text-white text-xl"></i>
                </div>
                <div>
                  <h3 class="font-bold text-red-700 dark:text-red-400">상권분석</h3>
                  <p class="text-sm text-red-600 dark:text-red-300">5개 봇 - 가장 먼저 실행</p>
                </div>
              </div>
              <ul class="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li><i class="fas fa-check text-red-400 mr-2"></i>상권 종합분석</li>
                <li><i class="fas fa-check text-red-400 mr-2"></i>경쟁사 분석</li>
                <li><i class="fas fa-check text-red-400 mr-2"></i>타겟고객 분석</li>
                <li><i class="fas fa-check text-red-400 mr-2"></i>입지 평가</li>
                <li><i class="fas fa-check text-red-400 mr-2"></i>상권 트렌드</li>
              </ul>
            </div>
            
            {/* 고객응대 */}
            <div class="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <i class="fas fa-hand-wave text-white text-xl"></i>
                </div>
                <div>
                  <h3 class="font-bold text-blue-700 dark:text-blue-400">고객응대</h3>
                  <p class="text-sm text-blue-600 dark:text-blue-300">5개 봇</p>
                </div>
              </div>
              <ul class="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li><i class="fas fa-check text-blue-400 mr-2"></i>첫인사</li>
                <li><i class="fas fa-check text-blue-400 mr-2"></i>메뉴추천</li>
                <li><i class="fas fa-check text-blue-400 mr-2"></i>이벤트 안내</li>
                <li><i class="fas fa-check text-blue-400 mr-2"></i>리뷰 요청</li>
                <li><i class="fas fa-check text-blue-400 mr-2"></i>SNS 홍보</li>
              </ul>
            </div>
            
            {/* 콘텐츠 */}
            <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                  <i class="fas fa-pen-fancy text-white text-xl"></i>
                </div>
                <div>
                  <h3 class="font-bold text-purple-700 dark:text-purple-400">콘텐츠</h3>
                  <p class="text-sm text-purple-600 dark:text-purple-300">5개 봇</p>
                </div>
              </div>
              <ul class="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li><i class="fas fa-check text-purple-400 mr-2"></i>블로그 콘텐츠</li>
                <li><i class="fas fa-check text-purple-400 mr-2"></i>키워드 전략</li>
                <li><i class="fas fa-check text-purple-400 mr-2"></i>지역 마케팅</li>
                <li><i class="fas fa-check text-purple-400 mr-2"></i>시즌 마케팅</li>
                <li><i class="fas fa-check text-purple-400 mr-2"></i>비주얼 기획</li>
              </ul>
            </div>
            
            {/* 고객관계 */}
            <div class="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-800">
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                  <i class="fas fa-gem text-white text-xl"></i>
                </div>
                <div>
                  <h3 class="font-bold text-emerald-700 dark:text-emerald-400">고객관계</h3>
                  <p class="text-sm text-emerald-600 dark:text-emerald-300">5개 봇</p>
                </div>
              </div>
              <ul class="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li><i class="fas fa-check text-emerald-400 mr-2"></i>단골 관리</li>
                <li><i class="fas fa-check text-emerald-400 mr-2"></i>업셀링</li>
                <li><i class="fas fa-check text-emerald-400 mr-2"></i>소개 유도</li>
                <li><i class="fas fa-check text-emerald-400 mr-2"></i>피드백 수집</li>
                <li><i class="fas fa-check text-emerald-400 mr-2"></i>불만 대응</li>
              </ul>
            </div>
            
            {/* 소셜미디어 */}
            <div class="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-2xl p-6 border border-pink-200 dark:border-pink-800">
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center">
                  <i class="fas fa-share-nodes text-white text-xl"></i>
                </div>
                <div>
                  <h3 class="font-bold text-pink-700 dark:text-pink-400">소셜미디어</h3>
                  <p class="text-sm text-pink-600 dark:text-pink-300">5개 봇</p>
                </div>
              </div>
              <ul class="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li><i class="fas fa-check text-pink-400 mr-2"></i>스토리 콘텐츠</li>
                <li><i class="fas fa-check text-pink-400 mr-2"></i>해시태그 전략</li>
                <li><i class="fas fa-check text-pink-400 mr-2"></i>인플루언서 협업</li>
                <li><i class="fas fa-check text-pink-400 mr-2"></i>커뮤니티 관리</li>
                <li><i class="fas fa-check text-pink-400 mr-2"></i>릴스/숏폼</li>
              </ul>
            </div>
            
            {/* 디지털마케팅 + 전략분석 */}
            <div class="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                  <i class="fas fa-chart-line text-white text-xl"></i>
                </div>
                <div>
                  <h3 class="font-bold text-amber-700 dark:text-amber-400">디지털마케팅 & 전략</h3>
                  <p class="text-sm text-amber-600 dark:text-amber-300">5개 봇</p>
                </div>
              </div>
              <ul class="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li><i class="fas fa-check text-amber-400 mr-2"></i>이메일 마케팅</li>
                <li><i class="fas fa-check text-amber-400 mr-2"></i>SMS 마케팅</li>
                <li><i class="fas fa-check text-amber-400 mr-2"></i>리타겟팅</li>
                <li><i class="fas fa-check text-amber-400 mr-2"></i>가격 전략</li>
                <li><i class="fas fa-check text-amber-400 mr-2"></i>성과 분석</li>
              </ul>
            </div>
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
              © 2024 STUDIOJUAI. 상권분석 기반 AI 마케팅 자동화 플랫폼
            </p>
          </div>
        </div>
      </footer>
      
      {/* API 키 모달 */}
      <div id="api-key-modal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white dark:bg-dark-card rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div class="p-6 border-b border-slate-200 dark:border-dark-border">
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-bold text-slate-900 dark:text-white">
                <i class="fas fa-key text-primary-500 mr-2"></i>
                API 키 설정
              </h3>
              <button onclick="closeApiKeyModal()" class="p-2 hover:bg-slate-100 dark:hover:bg-dark-bg rounded-lg transition-colors">
                <i class="fas fa-times text-slate-500"></i>
              </button>
            </div>
          </div>
          <div class="p-6 space-y-6">
            {/* Gemini API */}
            <div class="space-y-3">
              <h4 class="font-semibold text-slate-700 dark:text-slate-300">
                <i class="fas fa-brain text-blue-500 mr-2"></i>
                Gemini API (Google AI)
              </h4>
              <p class="text-sm text-slate-600 dark:text-slate-400">
                AI 봇 실행에 필요합니다.
                <a href="https://aistudio.google.com/app/apikey" target="_blank" class="text-primary-500 hover:underline ml-1">
                  발급받기 →
                </a>
              </p>
              <input type="password" id="gemini-api-key"
                class="w-full px-4 py-3 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-xl"
                placeholder="AIza..." />
              <div class="flex gap-2">
                <button onclick="validateGeminiKey()" class="flex-1 px-3 py-2 bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 text-sm rounded-lg hover:bg-slate-200 transition-colors">
                  검증
                </button>
                <button onclick="saveGeminiKey()" class="flex-1 px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors">
                  저장
                </button>
              </div>
              <p id="gemini-key-status" class="text-sm text-center hidden"></p>
            </div>
            
            {/* 네이버 API */}
            <div class="space-y-3 pt-4 border-t border-slate-200 dark:border-dark-border">
              <h4 class="font-semibold text-slate-700 dark:text-slate-300">
                <i class="fas fa-map text-green-500 mr-2"></i>
                네이버 API (상권분석)
              </h4>
              <p class="text-sm text-slate-600 dark:text-slate-400">
                상권분석에 필요합니다.
                <a href="https://developers.naver.com/apps/" target="_blank" class="text-primary-500 hover:underline ml-1">
                  발급받기 →
                </a>
              </p>
              <input type="text" id="naver-client-id"
                class="w-full px-4 py-3 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-xl"
                placeholder="Client ID" />
              <input type="password" id="naver-client-secret"
                class="w-full px-4 py-3 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-xl"
                placeholder="Client Secret" />
              <div class="flex gap-2">
                <button onclick="validateNaverKey()" class="flex-1 px-3 py-2 bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 text-sm rounded-lg hover:bg-slate-200 transition-colors">
                  검증
                </button>
                <button onclick="saveNaverKey()" class="flex-1 px-3 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors">
                  저장
                </button>
              </div>
              <p id="naver-key-status" class="text-sm text-center hidden"></p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 로딩 오버레이 */}
      <div id="loading-overlay" class="hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
        <div class="bg-white dark:bg-dark-card rounded-2xl p-8 max-w-md w-full mx-4 text-center">
          <div class="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 id="loading-title" class="text-xl font-bold text-slate-900 dark:text-white mb-2">분석 중...</h3>
          <p id="loading-message" class="text-slate-600 dark:text-slate-400">잠시만 기다려주세요</p>
          <div class="mt-4">
            <div class="w-full bg-slate-200 dark:bg-dark-bg rounded-full h-2">
              <div id="loading-progress" class="bg-primary-500 h-2 rounded-full transition-all" style="width: 0%"></div>
            </div>
            <p id="loading-status" class="text-sm text-slate-500 mt-2"></p>
          </div>
        </div>
      </div>
      
      {/* 페이지 스크립트 */}
      <script dangerouslySetInnerHTML={{
        __html: `
          let selectedIndustry = 'cafe';
          let selectedRadius = 3;
          let tradeAreaData = null;
          let currentIndustryCategory = 'food';
          
          // 업종명 매핑
          const industryNames = {
            // 음식/요식업
            cafe: '카페', chicken: '치킨집', korean: '한식당', chinese: '중식당',
            japanese: '일식당', western: '양식당', fastfood: '패스트푸드점', pizza: '피자집',
            bakery: '베이커리', dessert: '디저트카페', bar: '주점/술집', bbq: '고깃집',
            seafood: '해산물/횟집', noodle: '면요리전문점', lunch: '도시락/분식점', buffet: '뷔페/식당',
            // 미용/뷰티
            salon: '미용실', barbershop: '이발소', nail: '네일샵', skin: '피부관리샵',
            spa: '스파/마사지', makeup: '메이크업샵', waxing: '왁싱샵',
            // 소매/판매
            retail: '소매점', convenience: '편의점', supermarket: '슈퍼마켓', clothing: '의류매장',
            shoes: '신발매장', accessory: '악세서리샵', cosmetic: '화장품매장', phone: '휴대폰판매점',
            electronics: '전자제품매장', furniture: '가구매장', interior: '인테리어소품샵', flower: '꽃집',
            pet: '반려동물용품점', book: '서점', stationery: '문구점', pharmacy: '약국', optical: '안경점',
            // 서비스업
            laundry: '세탁소', repair: '수선/수리점', printing: '인쇄/복사점', studio: '사진스튜디오',
            travel: '여행사', realtor: '부동산중개', insurance: '보험대리점', academy: '학원/교습소',
            gym: '헬스장/피트니스', yoga: '요가/필라테스', taekwondo: '태권도/무술학원',
            pc: 'PC방', karaoke: '노래방', billiard: '당구장', golf: '골프연습장',
            // 의료/건강
            clinic: '병원/의원', dental: '치과', oriental: '한의원', veterinary: '동물병원',
            // 자동차
            carwash: '세차장', carmaintenance: '자동차정비소', carparts: '자동차용품점', gasstation: '주유소',
            // 숙박/임대
            motel: '모텔/호텔', guesthouse: '게스트하우스/펜션', rental: '렌탈샵'
          };
          
          // 페이지 로드 시 초기화
          document.addEventListener('DOMContentLoaded', function() {
            loadSavedData();
            checkApiKeys();
            showIndustryCategory('food');
          });
          
          // 업종 카테고리 전환
          function showIndustryCategory(category) {
            currentIndustryCategory = category;
            
            // 탭 스타일 업데이트
            document.querySelectorAll('.industry-tab').forEach(tab => {
              if (tab.dataset.category === category) {
                tab.className = 'industry-tab px-4 py-2 rounded-lg bg-primary-500 text-white text-sm font-medium transition-all';
              } else {
                tab.className = 'industry-tab px-4 py-2 rounded-lg bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-200 transition-all';
              }
            });
            
            // 카테고리 컨텐츠 전환
            document.querySelectorAll('.industry-category').forEach(cat => {
              cat.classList.add('hidden');
            });
            
            const categoryEl = document.getElementById('industry-' + category);
            if (categoryEl) {
              categoryEl.classList.remove('hidden');
            }
          }
          
          // 업종 선택
          function selectIndustry(industry) {
            selectedIndustry = industry;
            document.getElementById('store-industry').value = industry;
            
            // 선택된 업종 표시 업데이트
            const displayEl = document.getElementById('selected-industry-display');
            if (displayEl) {
              displayEl.textContent = industryNames[industry] || industry;
            }
            
            document.querySelectorAll('.industry-btn').forEach(btn => {
              if (btn.dataset.industry === industry) {
                btn.classList.add('border-primary-500', 'bg-primary-50', 'dark:bg-primary-900/20');
              } else {
                btn.classList.remove('border-primary-500', 'bg-primary-50', 'dark:bg-primary-900/20');
              }
            });
          }
          
          // 반경 선택
          function selectRadius(radius) {
            selectedRadius = radius;
            document.getElementById('analysis-radius').value = radius;
            
            document.querySelectorAll('.radius-btn').forEach(btn => {
              if (parseInt(btn.dataset.radius) === radius) {
                btn.classList.add('border-red-500');
                btn.classList.remove('border-slate-200', 'dark:border-dark-border');
              } else {
                btn.classList.remove('border-red-500');
                btn.classList.add('border-slate-200', 'dark:border-dark-border');
              }
            });
          }
          
          // 폼으로 스크롤
          function scrollToForm() {
            document.getElementById('store-form-section').scrollIntoView({ behavior: 'smooth' });
          }
          
          // 모바일 메뉴 토글
          function toggleMobileMenu() {
            document.getElementById('mobile-menu').classList.toggle('hidden');
          }
          
          // API 키 모달
          function openApiKeyModal() {
            document.getElementById('api-key-modal').classList.remove('hidden');
            
            // 저장된 키 로드
            const geminiKey = localStorage.getItem('gemini_api_key') || '';
            const naverClientId = localStorage.getItem('naver_client_id') || '';
            const naverClientSecret = localStorage.getItem('naver_client_secret') || '';
            
            document.getElementById('gemini-api-key').value = geminiKey;
            document.getElementById('naver-client-id').value = naverClientId;
            document.getElementById('naver-client-secret').value = naverClientSecret;
          }
          
          function closeApiKeyModal() {
            document.getElementById('api-key-modal').classList.add('hidden');
          }
          
          // Gemini API 키 검증
          async function validateGeminiKey() {
            const apiKey = document.getElementById('gemini-api-key').value.trim();
            const statusEl = document.getElementById('gemini-key-status');
            
            if (!apiKey) {
              statusEl.textContent = 'API 키를 입력해주세요';
              statusEl.className = 'text-sm text-center text-red-500';
              statusEl.classList.remove('hidden');
              return;
            }
            
            statusEl.textContent = '검증 중...';
            statusEl.className = 'text-sm text-center text-slate-500';
            statusEl.classList.remove('hidden');
            
            try {
              const response = await fetch('/api/validate-key', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ apiKey, type: 'gemini' })
              });
              
              const result = await response.json();
              
              if (result.success) {
                statusEl.textContent = '✅ 유효한 API 키입니다';
                statusEl.className = 'text-sm text-center text-green-500';
              } else {
                statusEl.textContent = '❌ ' + (result.error || '유효하지 않은 키');
                statusEl.className = 'text-sm text-center text-red-500';
              }
            } catch (error) {
              statusEl.textContent = '❌ 검증 실패';
              statusEl.className = 'text-sm text-center text-red-500';
            }
          }
          
          // Gemini API 키 저장
          function saveGeminiKey() {
            const apiKey = document.getElementById('gemini-api-key').value.trim();
            if (apiKey) {
              localStorage.setItem('gemini_api_key', apiKey);
              showToast('Gemini API 키가 저장되었습니다', 'success');
            }
          }
          
          // 네이버 API 키 검증
          async function validateNaverKey() {
            const clientId = document.getElementById('naver-client-id').value.trim();
            const clientSecret = document.getElementById('naver-client-secret').value.trim();
            const statusEl = document.getElementById('naver-key-status');
            
            if (!clientId || !clientSecret) {
              statusEl.textContent = 'Client ID와 Secret을 모두 입력해주세요';
              statusEl.className = 'text-sm text-center text-red-500';
              statusEl.classList.remove('hidden');
              return;
            }
            
            statusEl.textContent = '검증 중...';
            statusEl.className = 'text-sm text-center text-slate-500';
            statusEl.classList.remove('hidden');
            
            try {
              const response = await fetch('/api/validate-key', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'naver', clientId, clientSecret })
              });
              
              const result = await response.json();
              
              if (result.success) {
                statusEl.textContent = '✅ 유효한 API 키입니다';
                statusEl.className = 'text-sm text-center text-green-500';
              } else {
                statusEl.textContent = '❌ ' + (result.error || '유효하지 않은 키');
                statusEl.className = 'text-sm text-center text-red-500';
              }
            } catch (error) {
              statusEl.textContent = '❌ 검증 실패';
              statusEl.className = 'text-sm text-center text-red-500';
            }
          }
          
          // 네이버 API 키 저장
          function saveNaverKey() {
            const clientId = document.getElementById('naver-client-id').value.trim();
            const clientSecret = document.getElementById('naver-client-secret').value.trim();
            if (clientId && clientSecret) {
              localStorage.setItem('naver_client_id', clientId);
              localStorage.setItem('naver_client_secret', clientSecret);
              showToast('네이버 API 키가 저장되었습니다', 'success');
            }
          }
          
          // API 키 확인
          function checkApiKeys() {
            const geminiKey = localStorage.getItem('gemini_api_key');
            const naverClientId = localStorage.getItem('naver_client_id');
            
            if (!geminiKey || !naverClientId) {
              setTimeout(() => {
                showToast('API 키를 설정해주세요 (우측 상단 API 설정)', 'warning');
              }, 2000);
            }
          }
          
          // 저장된 데이터 로드
          function loadSavedData() {
            const saved = localStorage.getItem('store_info');
            if (saved) {
              try {
                const data = JSON.parse(saved);
                document.getElementById('store-name').value = data.name || '';
                document.getElementById('store-location').value = data.location || '';
                document.getElementById('store-main-product').value = data.mainProduct || '';
                document.getElementById('store-price-range').value = data.priceRange || '';
                document.getElementById('store-note').value = data.specialNote || '';
                
                if (data.industry) {
                  selectIndustry(data.industry);
                }
              } catch (e) {}
            }
            
            // 저장된 상권분석 데이터 확인
            const savedTradeArea = localStorage.getItem('trade_area_data');
            if (savedTradeArea) {
              try {
                tradeAreaData = JSON.parse(savedTradeArea);
                showTradeAreaResult(tradeAreaData);
                enableExecuteAllBtn();
              } catch (e) {}
            }
          }
          
          // 매장 정보 가져오기
          function getStoreInfo() {
            return {
              name: document.getElementById('store-name').value.trim(),
              location: document.getElementById('store-location').value.trim(),
              industry: selectedIndustry,
              mainProduct: document.getElementById('store-main-product').value.trim(),
              priceRange: document.getElementById('store-price-range').value.trim(),
              specialNote: document.getElementById('store-note').value.trim()
            };
          }
          
          // 폼 제출 (저장만)
          document.getElementById('store-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const storeInfo = getStoreInfo();
            localStorage.setItem('store_info', JSON.stringify(storeInfo));
            showToast('매장 정보가 저장되었습니다', 'success');
          });
          
          // 1단계: 상권분석 실행
          async function executeTradeAreaAnalysis() {
            const storeInfo = getStoreInfo();
            
            if (!storeInfo.name || !storeInfo.location) {
              showToast('매장명과 위치를 입력해주세요', 'error');
              return;
            }
            
            const geminiKey = localStorage.getItem('gemini_api_key');
            const naverClientId = localStorage.getItem('naver_client_id');
            const naverClientSecret = localStorage.getItem('naver_client_secret');
            
            if (!geminiKey) {
              showToast('Gemini API 키를 설정해주세요', 'error');
              openApiKeyModal();
              return;
            }
            
            if (!naverClientId || !naverClientSecret) {
              showToast('네이버 API 키를 설정해주세요', 'error');
              openApiKeyModal();
              return;
            }
            
            // 로딩 표시
            showLoading('상권분석 중...', '네이버 API로 주변 경쟁사를 검색하고 있습니다');
            
            try {
              const response = await fetch('/api/bot/execute-trade-area', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'X-Gemini-Key': geminiKey,
                  'X-Naver-Client-Id': naverClientId,
                  'X-Naver-Client-Secret': naverClientSecret
                },
                body: JSON.stringify({
                  storeInfo,
                  industry: selectedIndustry,
                  radius: selectedRadius
                })
              });
              
              const result = await response.json();
              
              hideLoading();
              
              if (result.success) {
                tradeAreaData = {
                  ...result.tradeAreaAnalysis,
                  botResults: result.results
                };
                
                // 로컬 저장
                localStorage.setItem('store_info', JSON.stringify(storeInfo));
                localStorage.setItem('trade_area_data', JSON.stringify(tradeAreaData));
                
                // 결과 표시
                showTradeAreaResult(tradeAreaData);
                enableExecuteAllBtn();
                
                showToast('상권분석 완료! (' + result.successCount + '/5개 봇 성공)', 'success');
                
                // 대시보드로 이동 제안
                if (confirm('상권분석이 완료되었습니다. 대시보드에서 결과를 확인하시겠습니까?')) {
                  window.location.href = '/dashboard';
                }
              } else {
                showToast(result.error || '상권분석 실패', 'error');
              }
            } catch (error) {
              hideLoading();
              showToast('상권분석 중 오류가 발생했습니다', 'error');
              console.error(error);
            }
          }
          
          // 상권분석 결과 표시
          function showTradeAreaResult(data) {
            const resultEl = document.getElementById('trade-area-result');
            const countEl = document.getElementById('competitor-count');
            const summaryEl = document.getElementById('trade-area-summary');
            
            resultEl.classList.remove('hidden');
            countEl.textContent = '경쟁사 ' + (data.totalCompetitors || 0) + '개 발견';
            
            let summaryHtml = '<div class="space-y-2">';
            summaryHtml += '<p>📍 분석 위치: ' + (data.location || '-') + '</p>';
            summaryHtml += '<p>📐 분석 반경: ' + (data.radius || 3) + 'km</p>';
            
            if (data.botResults && data.botResults.length > 0) {
              summaryHtml += '<p class="mt-2 font-medium">실행된 봇:</p>';
              summaryHtml += '<ul class="list-disc list-inside">';
              data.botResults.forEach(bot => {
                const icon = bot.success ? '✅' : '❌';
                summaryHtml += '<li>' + icon + ' ' + bot.botName + '</li>';
              });
              summaryHtml += '</ul>';
            }
            
            summaryHtml += '</div>';
            summaryEl.innerHTML = summaryHtml;
          }
          
          // 2단계 버튼 활성화
          function enableExecuteAllBtn() {
            const btn = document.getElementById('execute-all-btn');
            const hint = document.getElementById('execute-all-hint');
            
            btn.disabled = false;
            btn.className = 'w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-xl transition-all flex items-center justify-center space-x-2 cursor-pointer';
            hint.textContent = '* 상권분석 데이터를 기반으로 25개 봇이 실행됩니다';
          }
          
          // 2단계: 전체 봇 실행
          async function executeAllBots() {
            if (!tradeAreaData) {
              showToast('먼저 상권분석을 실행해주세요', 'error');
              return;
            }
            
            const storeInfo = getStoreInfo();
            const geminiKey = localStorage.getItem('gemini_api_key');
            
            if (!geminiKey) {
              showToast('Gemini API 키를 설정해주세요', 'error');
              openApiKeyModal();
              return;
            }
            
            showLoading('마케팅 봇 실행 중...', '25개 봇이 상권분석 결과를 기반으로 콘텐츠를 생성합니다');
            
            try {
              const response = await fetch('/api/bot/execute-all', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'X-Gemini-Key': geminiKey
                },
                body: JSON.stringify({
                  storeInfo,
                  industry: selectedIndustry,
                  radius: selectedRadius,
                  tradeAreaData
                })
              });
              
              const result = await response.json();
              
              hideLoading();
              
              if (result.success) {
                // 결과 저장
                localStorage.setItem('bot_results', JSON.stringify(result.results));
                
                showToast('봇 실행 완료! (' + result.successCount + '/' + result.totalExecuted + '개 성공)', 'success');
                
                // 대시보드로 이동
                window.location.href = '/dashboard';
              } else {
                showToast(result.error || '봇 실행 실패', 'error');
              }
            } catch (error) {
              hideLoading();
              showToast('봇 실행 중 오류가 발생했습니다', 'error');
              console.error(error);
            }
          }
          
          // 로딩 표시
          function showLoading(title, message) {
            document.getElementById('loading-title').textContent = title;
            document.getElementById('loading-message').textContent = message;
            document.getElementById('loading-progress').style.width = '0%';
            document.getElementById('loading-status').textContent = '';
            document.getElementById('loading-overlay').classList.remove('hidden');
            
            // 프로그레스 애니메이션
            let progress = 0;
            const interval = setInterval(() => {
              progress += Math.random() * 15;
              if (progress > 90) progress = 90;
              document.getElementById('loading-progress').style.width = progress + '%';
            }, 500);
            
            window.loadingInterval = interval;
          }
          
          function hideLoading() {
            if (window.loadingInterval) {
              clearInterval(window.loadingInterval);
            }
            document.getElementById('loading-progress').style.width = '100%';
            setTimeout(() => {
              document.getElementById('loading-overlay').classList.add('hidden');
            }, 300);
          }
        `
      }} />
    </>
  )
}
