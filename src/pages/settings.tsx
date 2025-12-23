import type { Context } from 'hono'

export const settingsPage = (c: Context) => {
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
              <a href="/" class="text-slate-600 dark:text-slate-400 hover:text-primary-600 transition-colors">홈</a>
              <a href="/dashboard" class="text-slate-600 dark:text-slate-400 hover:text-primary-600 transition-colors">대시보드</a>
              <a href="/analytics" class="text-slate-600 dark:text-slate-400 hover:text-primary-600 transition-colors">분석</a>
              <a href="/settings" class="text-primary-600 dark:text-primary-400 font-medium">설정</a>
            </nav>
            
            <div class="flex items-center space-x-3">
              <button onclick="toggleDarkMode()" class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-card transition-colors">
                <i class="fas fa-moon dark:hidden text-slate-600"></i>
                <i class="fas fa-sun hidden dark:block text-yellow-400"></i>
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
            <a href="/" class="block px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-card text-slate-600 dark:text-slate-400">홈</a>
            <a href="/dashboard" class="block px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-card text-slate-600 dark:text-slate-400">대시보드</a>
            <a href="/analytics" class="block px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-card text-slate-600 dark:text-slate-400">분석</a>
            <a href="/settings" class="block px-4 py-2 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">설정</a>
          </nav>
        </div>
      </header>
      
      {/* 메인 컨텐츠 */}
      <main class="pt-20 pb-12 min-h-screen">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 페이지 헤더 */}
          <div class="mb-8">
            <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              <i class="fas fa-cog text-primary-500 mr-3"></i>
              설정
            </h1>
            <p class="text-slate-600 dark:text-slate-400">
              API 키와 매장 정보를 관리하세요
            </p>
          </div>
          
          {/* API 키 설정 */}
          <div class="bg-white dark:bg-dark-card rounded-2xl shadow-lg border border-slate-100 dark:border-dark-border overflow-hidden mb-6">
            <div class="p-6 border-b border-slate-200 dark:border-dark-border">
              <h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                <i class="fas fa-key text-amber-500 mr-3"></i>
                Gemini API 설정
              </h2>
              <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Google AI Studio에서 발급받은 API 키를 입력하세요
              </p>
            </div>
            <div class="p-6 space-y-4">
              <div class="flex items-center gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <i class="fas fa-info-circle text-blue-500"></i>
                <p class="text-sm text-blue-700 dark:text-blue-300">
                  API 키는 브라우저에 로컬 저장되며, 서버로 전송되지 않습니다.
                  <a href="https://aistudio.google.com/app/apikey" target="_blank" class="underline ml-1">
                    API 키 발급받기 →
                  </a>
                </p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Gemini API Key
                </label>
                <div class="relative">
                  <input type="password" id="api-key-input"
                    class="w-full px-4 py-3 pr-24 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="AIza..." />
                  <button onclick="toggleApiKeyVisibility()" class="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                    <i id="eye-icon" class="fas fa-eye"></i>
                  </button>
                </div>
              </div>
              
              <div id="api-key-status" class="hidden p-3 rounded-lg text-sm"></div>
              
              <div class="flex flex-wrap gap-3">
                <button onclick="validateApiKey()" class="px-6 py-3 bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  <i class="fas fa-check-circle mr-2"></i>검증하기
                </button>
                <button onclick="saveApiKey()" class="px-6 py-3 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 transition-colors">
                  <i class="fas fa-save mr-2"></i>저장하기
                </button>
                <button onclick="clearApiKey()" class="px-6 py-3 bg-red-100 text-red-600 font-medium rounded-xl hover:bg-red-200 transition-colors">
                  <i class="fas fa-trash mr-2"></i>삭제
                </button>
              </div>
            </div>
          </div>
          
          {/* 매장 정보 설정 */}
          <div class="bg-white dark:bg-dark-card rounded-2xl shadow-lg border border-slate-100 dark:border-dark-border overflow-hidden mb-6">
            <div class="p-6 border-b border-slate-200 dark:border-dark-border">
              <h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                <i class="fas fa-store text-primary-500 mr-3"></i>
                매장 정보
              </h2>
              <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">
                AI 봇이 맞춤형 콘텐츠를 생성할 수 있도록 매장 정보를 입력하세요
              </p>
            </div>
            <form id="store-form" class="p-6 space-y-6">
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
                
                {/* 업종 */}
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
              
              {/* 버튼들 */}
              <div class="flex flex-wrap gap-3">
                <button type="submit"
                  class="px-6 py-3 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 transition-colors">
                  <i class="fas fa-save mr-2"></i>저장하기
                </button>
                <button type="button" onclick="clearStoreInfo()"
                  class="px-6 py-3 bg-red-100 text-red-600 font-medium rounded-xl hover:bg-red-200 transition-colors">
                  <i class="fas fa-trash mr-2"></i>초기화
                </button>
              </div>
            </form>
          </div>
          
          {/* 테마 설정 */}
          <div class="bg-white dark:bg-dark-card rounded-2xl shadow-lg border border-slate-100 dark:border-dark-border overflow-hidden mb-6">
            <div class="p-6 border-b border-slate-200 dark:border-dark-border">
              <h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                <i class="fas fa-palette text-purple-500 mr-3"></i>
                테마 설정
              </h2>
            </div>
            <div class="p-6">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium text-slate-900 dark:text-white">다크 모드</h3>
                  <p class="text-sm text-slate-600 dark:text-slate-400">어두운 테마를 사용합니다</p>
                </div>
                <button onclick="toggleDarkMode()" id="dark-mode-toggle"
                  class="relative w-14 h-8 bg-slate-200 dark:bg-primary-500 rounded-full transition-colors">
                  <div class="absolute top-1 left-1 dark:left-7 w-6 h-6 bg-white rounded-full shadow-md transition-all"></div>
                </button>
              </div>
            </div>
          </div>
          
          {/* 데이터 관리 */}
          <div class="bg-white dark:bg-dark-card rounded-2xl shadow-lg border border-slate-100 dark:border-dark-border overflow-hidden">
            <div class="p-6 border-b border-slate-200 dark:border-dark-border">
              <h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                <i class="fas fa-database text-blue-500 mr-3"></i>
                데이터 관리
              </h2>
            </div>
            <div class="p-6 space-y-4">
              <div class="flex items-center justify-between p-4 bg-slate-50 dark:bg-dark-bg rounded-xl">
                <div>
                  <h3 class="font-medium text-slate-900 dark:text-white">봇 실행 결과</h3>
                  <p class="text-sm text-slate-600 dark:text-slate-400">저장된 마케팅 콘텐츠 내보내기</p>
                </div>
                <button onclick="exportAllData()" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  <i class="fas fa-download mr-2"></i>내보내기
                </button>
              </div>
              
              <div class="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                <div>
                  <h3 class="font-medium text-red-700 dark:text-red-400">모든 데이터 삭제</h3>
                  <p class="text-sm text-red-600 dark:text-red-300">저장된 모든 설정과 결과를 삭제합니다</p>
                </div>
                <button onclick="clearAllData()" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  <i class="fas fa-trash mr-2"></i>전체 삭제
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* 푸터 */}
      <footer class="bg-slate-900 text-slate-400 py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p class="text-sm">© 2024 STUDIOJUAI. AI 마케팅 자동화 플랫폼</p>
        </div>
      </footer>
      
      {/* 스크립트 */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            loadSettings();
          });
          
          function loadSettings() {
            // API 키 로드
            const apiKey = ApiKeyManager.get();
            if (apiKey) {
              document.getElementById('api-key-input').value = apiKey;
              showApiKeyStatus('API 키가 설정되어 있습니다', 'success');
            }
            
            // 매장 정보 로드
            const storeInfo = StoreInfoManager.get();
            if (storeInfo) {
              document.getElementById('store-name').value = storeInfo.name || '';
              document.getElementById('store-location').value = storeInfo.location || '';
              document.getElementById('store-industry').value = storeInfo.industry || 'cafe';
              document.getElementById('store-main-product').value = storeInfo.mainProduct || '';
              document.getElementById('store-price-range').value = storeInfo.priceRange || '';
              document.getElementById('store-target').value = storeInfo.targetCustomer || '';
              document.getElementById('store-note').value = storeInfo.specialNote || '';
            }
          }
          
          // API 키 표시/숨기기 토글
          function toggleApiKeyVisibility() {
            const input = document.getElementById('api-key-input');
            const icon = document.getElementById('eye-icon');
            
            if (input.type === 'password') {
              input.type = 'text';
              icon.className = 'fas fa-eye-slash';
            } else {
              input.type = 'password';
              icon.className = 'fas fa-eye';
            }
          }
          
          // API 키 상태 표시
          function showApiKeyStatus(message, type) {
            const statusEl = document.getElementById('api-key-status');
            const colors = {
              success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
              error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
              info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
            };
            
            statusEl.className = 'p-3 rounded-lg text-sm ' + colors[type];
            statusEl.innerHTML = '<i class="fas fa-' + (type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : 'info-circle') + ' mr-2"></i>' + message;
            statusEl.classList.remove('hidden');
          }
          
          // API 키 검증
          async function validateApiKey() {
            const apiKey = document.getElementById('api-key-input').value;
            
            if (!apiKey) {
              showApiKeyStatus('API 키를 입력해주세요', 'error');
              return;
            }
            
            showApiKeyStatus('검증 중...', 'info');
            
            try {
              const response = await fetch('/api/validate-key', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ apiKey })
              });
              
              const data = await response.json();
              
              if (data.success) {
                showApiKeyStatus('API 키가 유효합니다! 이제 저장하세요.', 'success');
              } else {
                showApiKeyStatus(data.error || 'API 키가 유효하지 않습니다', 'error');
              }
            } catch (error) {
              showApiKeyStatus('검증 중 오류가 발생했습니다', 'error');
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
            showToast('API 키가 저장되었습니다', 'success');
            showApiKeyStatus('API 키가 저장되었습니다', 'success');
          }
          
          // API 키 삭제
          function clearApiKey() {
            if (confirm('API 키를 삭제하시겠습니까?')) {
              ApiKeyManager.clear();
              document.getElementById('api-key-input').value = '';
              document.getElementById('api-key-status').classList.add('hidden');
              showToast('API 키가 삭제되었습니다', 'info');
            }
          }
          
          // 매장 정보 저장 (폼 제출)
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
          });
          
          // 매장 정보 초기화
          function clearStoreInfo() {
            if (confirm('매장 정보를 초기화하시겠습니까?')) {
              StoreInfoManager.clear();
              document.getElementById('store-form').reset();
              showToast('매장 정보가 초기화되었습니다', 'info');
            }
          }
          
          // 모든 데이터 내보내기
          function exportAllData() {
            const data = {
              storeInfo: StoreInfoManager.get(),
              botStats: JSON.parse(localStorage.getItem('bot_stats') || '{}'),
              exportDate: new Date().toISOString()
            };
            
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'studiojuai-backup-' + Date.now() + '.json';
            a.click();
            URL.revokeObjectURL(url);
            
            showToast('데이터가 다운로드되었습니다', 'success');
          }
          
          // 모든 데이터 삭제
          function clearAllData() {
            if (confirm('정말로 모든 데이터를 삭제하시겠습니까?\\n이 작업은 되돌릴 수 없습니다.')) {
              localStorage.clear();
              showToast('모든 데이터가 삭제되었습니다', 'info');
              setTimeout(() => window.location.reload(), 1000);
            }
          }
          
          // 모바일 메뉴 토글
          function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
          }
        `
      }} />
    </>
  )
}
