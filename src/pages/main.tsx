import type { Context } from 'hono'

export const mainPage = (c: Context) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>STUDIOJUAI - AI 마케팅 자동화</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet" />
      <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" rel="stylesheet" />
      <style>
        body { font-family: 'Pretendard', sans-serif; }
        .bot-card { transition: all 0.2s; cursor: pointer; }
        .bot-card:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.15); }
        .bot-card.selected { border-color: #10B981; background: #ECFDF5; }
        .result-box { max-height: 500px; overflow-y: auto; }
        .loading { animation: pulse 1.5s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
        .fade-in { animation: fadeIn 0.3s ease-in; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      </style>
    </head>
    <body class="bg-gray-50 min-h-screen">
      
      <!-- 헤더 -->
      <header class="bg-white shadow-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center">
              <i class="fas fa-robot text-white"></i>
            </div>
            <span class="text-xl font-bold text-gray-800">STUDIOJUAI</span>
          </div>
          <button onclick="openApiModal()" class="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition">
            <i class="fas fa-key mr-2"></i>API 설정
          </button>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-4 py-6">
        
        <!-- 안내 메시지 -->
        <div class="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl p-6 mb-6">
          <h1 class="text-2xl font-bold mb-2">🚀 홈에서 모든 작업 완료!</h1>
          <p class="text-emerald-100">매장 정보 입력 → 봇 선택 → 실행 → 결과 확인 → PDF/TXT 다운로드</p>
        </div>

        <!-- STEP 1: 매장 정보 입력 -->
        <section class="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span class="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
            매장 정보 입력
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">매장명 <span class="text-red-500">*</span></label>
              <input type="text" id="store-name" placeholder="예: 맛있는 카페" 
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">위치 <span class="text-red-500">*</span></label>
              <input type="text" id="store-location" placeholder="예: 서울 강남역 3번출구" 
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">업종 <span class="text-red-500">*</span></label>
              <select id="store-industry" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                <option value="">선택하세요</option>
                <optgroup label="🍽️ 음식/요식업">
                  <option value="cafe">카페</option>
                  <option value="chicken">치킨집</option>
                  <option value="korean">한식당</option>
                  <option value="chinese">중식당</option>
                  <option value="japanese">일식당</option>
                  <option value="western">양식당</option>
                  <option value="bbq">고깃집</option>
                  <option value="bakery">베이커리</option>
                  <option value="bar">술집/호프</option>
                </optgroup>
                <optgroup label="💇 미용/뷰티">
                  <option value="salon">미용실</option>
                  <option value="nail">네일샵</option>
                  <option value="skin">피부관리</option>
                  <option value="spa">스파/마사지</option>
                </optgroup>
                <optgroup label="🛒 소매/판매">
                  <option value="convenience">편의점</option>
                  <option value="clothing">의류매장</option>
                  <option value="pharmacy">약국</option>
                  <option value="flower">꽃집</option>
                </optgroup>
                <optgroup label="🏢 서비스업">
                  <option value="gym">헬스장</option>
                  <option value="academy">학원</option>
                  <option value="laundry">세탁소</option>
                  <option value="realtor">부동산</option>
                </optgroup>
                <optgroup label="🏥 의료/기타">
                  <option value="clinic">병원/의원</option>
                  <option value="dental">치과</option>
                  <option value="veterinary">동물병원</option>
                </optgroup>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">대표 메뉴/서비스</label>
              <input type="text" id="store-product" placeholder="예: 아메리카노, 케이크" 
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">평균 가격대</label>
              <input type="text" id="store-price" placeholder="예: 5,000~15,000원" 
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">타겟 고객</label>
              <input type="text" id="store-target" placeholder="예: 20-30대 직장인" 
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
            </div>
          </div>
          
          <!-- 상권분석 반경 선택 -->
          <div class="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <label class="block text-sm font-medium text-gray-700 mb-3">
              <i class="fas fa-map-marker-alt text-emerald-500 mr-1"></i>
              상권분석 반경
            </label>
            <div class="flex gap-6">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="radius" value="2" class="w-4 h-4 text-emerald-500 focus:ring-emerald-500" />
                <span>2km</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="radius" value="3" checked class="w-4 h-4 text-emerald-500 focus:ring-emerald-500" />
                <span>3km <span class="text-emerald-600 text-xs">(추천)</span></span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="radius" value="5" class="w-4 h-4 text-emerald-500 focus:ring-emerald-500" />
                <span>5km</span>
              </label>
            </div>
          </div>
        </section>

        <!-- STEP 2: 30개 봇 선택 -->
        <section class="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span class="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              AI 봇 선택 <span class="text-sm font-normal text-gray-500">(클릭해서 선택)</span>
            </h2>
            <div class="flex gap-2">
              <button onclick="selectAllBots()" class="px-3 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg text-sm transition">전체선택</button>
              <button onclick="deselectAllBots()" class="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition">선택해제</button>
            </div>
          </div>
          
          <!-- 30개 봇 그리드 -->
          <div id="bot-grid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
            <!-- JavaScript로 동적 생성 -->
          </div>
          
          <div class="mt-4 text-center">
            <span class="text-sm text-gray-500">선택된 봇: </span>
            <span id="selected-count" class="font-bold text-emerald-600 text-lg">0</span>
            <span class="text-sm text-gray-500">개</span>
          </div>
        </section>

        <!-- STEP 3: 실행 버튼 -->
        <section class="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl shadow-lg p-6 mb-6">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="text-white text-center sm:text-left">
              <h2 class="text-xl font-bold">🎯 준비 완료!</h2>
              <p class="text-emerald-100">매장 정보와 봇을 선택하고 실행하세요</p>
            </div>
            <button onclick="executeAnalysis()" id="execute-btn"
              class="px-8 py-4 bg-white text-emerald-600 font-bold rounded-xl hover:bg-emerald-50 transition shadow-lg flex items-center gap-2 text-lg">
              <i class="fas fa-play"></i>
              <span>상권분석 + 봇 실행</span>
            </button>
          </div>
        </section>

        <!-- STEP 4: 결과 표시 영역 (처음엔 숨김) -->
        <section id="results-section" class="hidden">
          
          <!-- 상권분석 결과 -->
          <div class="bg-white rounded-2xl shadow-lg p-6 mb-6 fade-in">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                <i class="fas fa-map-marked-alt text-red-500 text-2xl"></i>
                상권분석 결과
              </h2>
              <span id="competitor-count" class="px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm font-bold">
                경쟁사 0개
              </span>
            </div>
            <div id="trade-area-result" class="result-box bg-gray-50 rounded-xl p-4 whitespace-pre-wrap text-sm font-mono leading-relaxed">
              분석 결과가 여기에 표시됩니다...
            </div>
          </div>

          <!-- 봇 결과들 -->
          <div id="bot-results" class="space-y-4">
            <!-- JavaScript로 동적 생성 -->
          </div>

          <!-- 다운로드 버튼 -->
          <div class="bg-white rounded-2xl shadow-lg p-6 mt-6 fade-in">
            <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i class="fas fa-download text-blue-500"></i>
              결과 다운로드
            </h2>
            <div class="flex flex-wrap gap-4">
              <button onclick="downloadTXT()" class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium flex items-center gap-2 transition shadow">
                <i class="fas fa-file-alt"></i>
                TXT 다운로드
              </button>
              <button onclick="downloadPDF()" class="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium flex items-center gap-2 transition shadow">
                <i class="fas fa-file-pdf"></i>
                PDF 다운로드
              </button>
              <button onclick="copyAllResults()" class="px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-lg font-medium flex items-center gap-2 transition shadow">
                <i class="fas fa-copy"></i>
                전체 복사
              </button>
            </div>
          </div>
        </section>

        <!-- 로딩 오버레이 -->
        <div id="loading-overlay" class="hidden fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div class="bg-white rounded-2xl p-8 text-center max-w-md mx-4 shadow-2xl">
            <div class="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">AI가 분석 중입니다...</h3>
            <p id="loading-status" class="text-gray-500 mb-4">상권 데이터를 수집하고 있습니다</p>
            <div class="bg-gray-200 rounded-full h-3 overflow-hidden">
              <div id="progress-bar" class="bg-emerald-500 h-3 rounded-full transition-all duration-300" style="width: 0%"></div>
            </div>
            <p class="text-xs text-gray-400 mt-2">잠시만 기다려주세요...</p>
          </div>
        </div>

      </main>

      <!-- API 키 모달 -->
      <div id="api-modal" class="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div class="bg-white rounded-2xl p-6 max-w-md mx-4 w-full shadow-2xl">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold text-gray-800">🔑 API 키 설정</h3>
            <button onclick="closeApiModal()" class="text-gray-400 hover:text-gray-600 transition">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Gemini API Key <span class="text-red-500">*</span></label>
              <input type="password" id="gemini-key" placeholder="AIza..." 
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500" />
              <a href="https://aistudio.google.com/app/apikey" target="_blank" class="text-xs text-blue-500 hover:underline mt-1 inline-block">
                <i class="fas fa-external-link-alt mr-1"></i>Google AI Studio에서 발급받기
              </a>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Naver Client ID <span class="text-gray-400">(선택)</span></label>
              <input type="password" id="naver-id" placeholder="Client ID" 
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Naver Client Secret <span class="text-gray-400">(선택)</span></label>
              <input type="password" id="naver-secret" placeholder="Client Secret" 
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500" />
              <a href="https://developers.naver.com/apps" target="_blank" class="text-xs text-blue-500 hover:underline mt-1 inline-block">
                <i class="fas fa-external-link-alt mr-1"></i>Naver Developers에서 발급받기
              </a>
            </div>
          </div>
          
          <div class="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p class="text-xs text-yellow-700">
              <i class="fas fa-info-circle mr-1"></i>
              Gemini API 키는 필수입니다. Naver API 키가 없으면 상권분석이 제한됩니다.
            </p>
          </div>
          
          <button onclick="saveApiKeys()" class="w-full mt-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition">
            <i class="fas fa-save mr-2"></i>저장하기
          </button>
        </div>
      </div>

      <script>
        // 30개 봇 데이터
        const ALL_BOTS = [
          // 상권분석 (5개)
          { id: 'trade-area-overview', name: '상권 종합분석', icon: '🗺️', category: '상권분석' },
          { id: 'competitor-analysis', name: '경쟁사 분석', icon: '🎯', category: '상권분석' },
          { id: 'target-customer', name: '타겟고객 분석', icon: '👥', category: '상권분석' },
          { id: 'location-evaluation', name: '입지 평가', icon: '📍', category: '상권분석' },
          { id: 'trend-analysis', name: '상권 트렌드', icon: '📈', category: '상권분석' },
          // 고객응대 (5개)
          { id: 'greeting', name: '첫인사', icon: '👋', category: '고객응대' },
          { id: 'menu-recommend', name: '메뉴추천', icon: '🍽️', category: '고객응대' },
          { id: 'event-announce', name: '이벤트 안내', icon: '🎉', category: '고객응대' },
          { id: 'review-request', name: '리뷰 요청', icon: '⭐', category: '고객응대' },
          { id: 'sns-content', name: 'SNS 홍보', icon: '📱', category: '고객응대' },
          // 콘텐츠 (5개)
          { id: 'blog-content', name: '블로그 콘텐츠', icon: '📝', category: '콘텐츠' },
          { id: 'keyword-strategy', name: '키워드 전략', icon: '🔍', category: '콘텐츠' },
          { id: 'local-marketing', name: '지역 마케팅', icon: '🏘️', category: '콘텐츠' },
          { id: 'seasonal-marketing', name: '시즌 마케팅', icon: '🗓️', category: '콘텐츠' },
          { id: 'visual-planning', name: '비주얼 기획', icon: '🎬', category: '콘텐츠' },
          // 고객관계 (5개)
          { id: 'loyalty-program', name: '단골 관리', icon: '💎', category: '고객관계' },
          { id: 'upselling', name: '업셀링', icon: '💰', category: '고객관계' },
          { id: 'referral-program', name: '소개 유도', icon: '🤝', category: '고객관계' },
          { id: 'feedback-collection', name: '피드백 수집', icon: '💬', category: '고객관계' },
          { id: 'crisis-response', name: '불만 대응', icon: '🆘', category: '고객관계' },
          // 소셜미디어 (5개)
          { id: 'story-content', name: '스토리 콘텐츠', icon: '📸', category: '소셜미디어' },
          { id: 'hashtag-strategy', name: '해시태그 전략', icon: '#️⃣', category: '소셜미디어' },
          { id: 'influencer-collab', name: '인플루언서 협업', icon: '🌟', category: '소셜미디어' },
          { id: 'community-manage', name: '커뮤니티 관리', icon: '👨‍👩‍👧‍👦', category: '소셜미디어' },
          { id: 'reels-content', name: '릴스/숏폼', icon: '🎵', category: '소셜미디어' },
          // 디지털마케팅 (3개)
          { id: 'email-marketing', name: '카톡/문자', icon: '📧', category: '디지털마케팅' },
          { id: 'sms-marketing', name: 'SMS 마케팅', icon: '💌', category: '디지털마케팅' },
          { id: 'retargeting', name: '리타겟팅', icon: '🔄', category: '디지털마케팅' },
          // 전략분석 (2개)
          { id: 'pricing-strategy', name: '가격 전략', icon: '💵', category: '전략분석' },
          { id: 'performance-analysis', name: '성과 분석', icon: '📊', category: '전략분석' }
        ];

        let selectedBots = new Set();
        let analysisResults = { tradeArea: null, bots: [], storeInfo: null };

        // 봇 그리드 렌더링
        function renderBotGrid() {
          const grid = document.getElementById('bot-grid');
          grid.innerHTML = ALL_BOTS.map(bot => {
            const categoryColors = {
              '상권분석': 'bg-red-50 border-red-200',
              '고객응대': 'bg-blue-50 border-blue-200',
              '콘텐츠': 'bg-purple-50 border-purple-200',
              '고객관계': 'bg-yellow-50 border-yellow-200',
              '소셜미디어': 'bg-pink-50 border-pink-200',
              '디지털마케팅': 'bg-green-50 border-green-200',
              '전략분석': 'bg-orange-50 border-orange-200'
            };
            const color = categoryColors[bot.category] || 'bg-gray-50 border-gray-200';
            
            return '<div class="bot-card p-3 border-2 rounded-xl text-center ' + color + '" data-id="' + bot.id + '" onclick="toggleBot(\\''+bot.id+'\\')"><div class="text-2xl mb-1">' + bot.icon + '</div><div class="text-xs font-medium text-gray-700 truncate">' + bot.name + '</div><div class="text-xs text-gray-400">' + bot.category + '</div></div>';
          }).join('');
        }

        // 봇 선택/해제
        function toggleBot(botId) {
          const card = document.querySelector('[data-id="'+botId+'"]');
          if (selectedBots.has(botId)) {
            selectedBots.delete(botId);
            card.classList.remove('selected');
            card.style.borderColor = '';
            card.style.background = '';
          } else {
            selectedBots.add(botId);
            card.classList.add('selected');
            card.style.borderColor = '#10B981';
            card.style.background = '#ECFDF5';
          }
          updateSelectedCount();
        }

        function selectAllBots() {
          ALL_BOTS.forEach(bot => {
            selectedBots.add(bot.id);
            const card = document.querySelector('[data-id="'+bot.id+'"]');
            if (card) {
              card.classList.add('selected');
              card.style.borderColor = '#10B981';
              card.style.background = '#ECFDF5';
            }
          });
          updateSelectedCount();
        }

        function deselectAllBots() {
          selectedBots.clear();
          document.querySelectorAll('.bot-card').forEach(card => {
            card.classList.remove('selected');
            card.style.borderColor = '';
            card.style.background = '';
          });
          updateSelectedCount();
        }

        function updateSelectedCount() {
          document.getElementById('selected-count').textContent = selectedBots.size;
        }

        // 메인 실행 함수
        async function executeAnalysis() {
          // 입력값 검증
          const storeName = document.getElementById('store-name').value.trim();
          const storeLocation = document.getElementById('store-location').value.trim();
          const storeIndustry = document.getElementById('store-industry').value;
          
          if (!storeName || !storeLocation || !storeIndustry) {
            alert('❌ 매장명, 위치, 업종은 필수 입력입니다!');
            return;
          }

          if (selectedBots.size === 0) {
            alert('❌ 실행할 봇을 1개 이상 선택해주세요!');
            return;
          }

          const geminiKey = localStorage.getItem('gemini_key');
          if (!geminiKey) {
            alert('❌ Gemini API 키를 먼저 설정해주세요!');
            openApiModal();
            return;
          }

          // 매장 정보 구성
          const storeInfo = {
            name: storeName,
            location: storeLocation,
            industry: storeIndustry,
            mainProduct: document.getElementById('store-product').value.trim(),
            priceRange: document.getElementById('store-price').value.trim(),
            targetCustomer: document.getElementById('store-target').value.trim()
          };

          const radius = document.querySelector('input[name="radius"]:checked').value;

          // 로딩 시작
          showLoading();
          analysisResults = { tradeArea: null, bots: [], storeInfo: storeInfo };

          try {
            // 1. 상권분석 실행
            updateLoadingStatus('📊 상권 데이터를 수집하고 있습니다...', 5);
            
            const naverClientId = localStorage.getItem('naver_client_id');
            const naverClientSecret = localStorage.getItem('naver_client_secret');
            
            let tradeAreaData = { 
              competitors: [], 
              totalCompetitors: 0, 
              radius: parseInt(radius),
              analysisDate: new Date().toISOString()
            };
            
            if (naverClientId && naverClientSecret) {
              try {
                const tradeAreaResponse = await fetch('/api/trade-area/analyze', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'X-Naver-Client-Id': naverClientId,
                    'X-Naver-Client-Secret': naverClientSecret
                  },
                  body: JSON.stringify({ 
                    location: storeLocation, 
                    industry: storeIndustry, 
                    radius: parseInt(radius) 
                  })
                });
                const tradeAreaResult = await tradeAreaResponse.json();
                if (tradeAreaResult.success && tradeAreaResult.data) {
                  tradeAreaData = tradeAreaResult.data;
                }
              } catch (e) {
                console.log('상권분석 API 오류:', e);
              }
            }

            analysisResults.tradeArea = tradeAreaData;
            updateLoadingStatus('✅ 상권분석 완료! 봇 실행 시작...', 15);

            // 2. 선택된 봇들 실행
            const selectedBotList = ALL_BOTS.filter(bot => selectedBots.has(bot.id));
            const totalBots = selectedBotList.length;
            
            for (let i = 0; i < totalBots; i++) {
              const bot = selectedBotList[i];
              const progress = 15 + ((i + 1) / totalBots) * 80;
              updateLoadingStatus(bot.icon + ' ' + bot.name + ' 봇 실행 중... (' + (i+1) + '/' + totalBots + ')', progress);

              try {
                const response = await fetch('/api/bot/execute', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'X-Gemini-Key': geminiKey
                  },
                  body: JSON.stringify({
                    botId: bot.id,
                    storeInfo: storeInfo,
                    industry: storeIndustry,
                    tradeAreaData: tradeAreaData
                  })
                });

                const result = await response.json();
                
                if (result.success) {
                  analysisResults.bots.push({
                    ...bot,
                    result: result.result,
                    success: true
                  });
                } else {
                  analysisResults.bots.push({
                    ...bot,
                    result: '⚠️ 실행 실패: ' + (result.error || '알 수 없는 오류'),
                    success: false
                  });
                }
              } catch (err) {
                analysisResults.bots.push({
                  ...bot,
                  result: '⚠️ 네트워크 오류: ' + err.message,
                  success: false
                });
              }

              // 약간의 딜레이 (API 부하 방지)
              await new Promise(resolve => setTimeout(resolve, 300));
            }

            // 3. 결과 표시
            updateLoadingStatus('📋 결과를 정리하고 있습니다...', 98);
            await new Promise(resolve => setTimeout(resolve, 500));
            
            displayResults();

          } catch (error) {
            alert('❌ 실행 중 오류가 발생했습니다: ' + error.message);
          } finally {
            hideLoading();
          }
        }

        // 결과 표시
        function displayResults() {
          const resultsSection = document.getElementById('results-section');
          resultsSection.classList.remove('hidden');
          
          // 상권분석 결과
          const tradeArea = analysisResults.tradeArea;
          document.getElementById('competitor-count').textContent = '경쟁사 ' + (tradeArea?.totalCompetitors || 0) + '개';
          
          let tradeAreaHtml = '📊 상권분석 요약\\n';
          tradeAreaHtml += '═'.repeat(40) + '\\n\\n';
          tradeAreaHtml += '■ 분석 반경: ' + (tradeArea?.radius || 3) + 'km\\n';
          tradeAreaHtml += '■ 총 경쟁사: ' + (tradeArea?.totalCompetitors || 0) + '개\\n';
          tradeAreaHtml += '■ 분석 일자: ' + new Date().toLocaleDateString('ko-KR') + '\\n\\n';
          
          if (tradeArea?.competitors?.length > 0) {
            tradeAreaHtml += '📍 주변 경쟁사 TOP 10:\\n';
            tradeAreaHtml += '─'.repeat(40) + '\\n';
            tradeArea.competitors.slice(0, 10).forEach((c, i) => {
              const name = c.title?.replace(/<[^>]*>/g, '') || '이름 없음';
              const addr = c.address || '';
              tradeAreaHtml += (i+1) + '. ' + name + '\\n   ' + addr + '\\n';
            });
          } else {
            tradeAreaHtml += '\\n⚠️ 네이버 API 키가 없어 상권분석이 제한됩니다.\\n';
            tradeAreaHtml += '   API 설정에서 네이버 API 키를 입력해주세요.';
          }
          
          document.getElementById('trade-area-result').textContent = tradeAreaHtml;

          // 봇 결과들
          const botResultsContainer = document.getElementById('bot-results');
          
          if (analysisResults.bots.length > 0) {
            botResultsContainer.innerHTML = analysisResults.bots.map((bot, index) => {
              const bgColor = bot.success ? 'bg-white' : 'bg-red-50';
              const textColor = bot.success ? '' : 'text-red-600';
              
              return '<div class="' + bgColor + ' rounded-2xl shadow-lg p-6 fade-in" style="animation-delay: ' + (index * 0.1) + 's"><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-bold text-gray-800 flex items-center gap-2"><span class="text-2xl">' + bot.icon + '</span>' + bot.name + '<span class="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-full">' + bot.category + '</span></h3><button onclick="copyResult(\\''+bot.id+'\\', ' + index + ')" class="p-2 hover:bg-gray-100 rounded-lg transition" title="결과 복사"><i class="fas fa-copy text-gray-400"></i></button></div><div id="result-' + index + '" class="result-box bg-gray-50 rounded-xl p-4 whitespace-pre-wrap text-sm ' + textColor + ' leading-relaxed">' + escapeHtml(bot.result) + '</div></div>';
            }).join('');
          } else {
            botResultsContainer.innerHTML = '<div class="bg-yellow-50 rounded-2xl p-6 text-center text-yellow-700"><i class="fas fa-exclamation-triangle text-3xl mb-2"></i><p>실행된 봇 결과가 없습니다.</p></div>';
          }

          // 스크롤
          resultsSection.scrollIntoView({ behavior: 'smooth' });
        }

        // HTML 이스케이프
        function escapeHtml(text) {
          if (!text) return '';
          return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
        }

        // 결과 복사
        function copyResult(botId, index) {
          const resultEl = document.getElementById('result-' + index);
          if (resultEl) {
            navigator.clipboard.writeText(resultEl.textContent).then(() => {
              alert('✅ 복사되었습니다!');
            }).catch(() => {
              alert('❌ 복사에 실패했습니다.');
            });
          }
        }

        function copyAllResults() {
          let allText = '═'.repeat(60) + '\\n';
          allText += '           STUDIOJUAI AI 마케팅 분석 리포트\\n';
          allText += '═'.repeat(60) + '\\n\\n';
          allText += '생성일: ' + new Date().toLocaleString('ko-KR') + '\\n\\n';
          
          allText += '━━━ 상권분석 결과 ━━━\\n';
          allText += document.getElementById('trade-area-result').textContent + '\\n\\n';
          
          analysisResults.bots.forEach(bot => {
            allText += '━━━ ' + bot.icon + ' ' + bot.name + ' (' + bot.category + ') ━━━\\n';
            allText += bot.result + '\\n\\n';
          });
          
          allText += '═'.repeat(60) + '\\n';
          allText += '           STUDIOJUAI - AI 마케팅 자동화 플랫폼\\n';
          allText += '           https://studiojuai.pages.dev\\n';
          allText += '═'.repeat(60);
          
          navigator.clipboard.writeText(allText).then(() => {
            alert('✅ 전체 결과가 복사되었습니다!');
          }).catch(() => {
            alert('❌ 복사에 실패했습니다.');
          });
        }

        // TXT 다운로드
        function downloadTXT() {
          let content = '═'.repeat(60) + '\\n';
          content += '           STUDIOJUAI AI 마케팅 분석 리포트\\n';
          content += '═'.repeat(60) + '\\n\\n';
          content += '생성일시: ' + new Date().toLocaleString('ko-KR') + '\\n\\n';
          
          const store = analysisResults.storeInfo;
          content += '📋 매장 정보\\n';
          content += '─'.repeat(40) + '\\n';
          content += '매장명: ' + (store?.name || '') + '\\n';
          content += '위치: ' + (store?.location || '') + '\\n';
          content += '업종: ' + (store?.industry || '') + '\\n';
          content += '대표 메뉴: ' + (store?.mainProduct || '') + '\\n';
          content += '가격대: ' + (store?.priceRange || '') + '\\n';
          content += '타겟 고객: ' + (store?.targetCustomer || '') + '\\n\\n';
          
          content += '🗺️ 상권분석 결과\\n';
          content += '─'.repeat(40) + '\\n';
          content += document.getElementById('trade-area-result').textContent + '\\n\\n';
          
          analysisResults.bots.forEach(bot => {
            content += '\\n' + bot.icon + ' ' + bot.name + ' (' + bot.category + ')\\n';
            content += '─'.repeat(40) + '\\n';
            content += bot.result + '\\n';
          });
          
          content += '\\n' + '═'.repeat(60) + '\\n';
          content += '           STUDIOJUAI - AI 마케팅 자동화 플랫폼\\n';
          content += '           https://studiojuai.pages.dev\\n';
          content += '═'.repeat(60);
          
          const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'STUDIOJUAI_리포트_' + new Date().toISOString().slice(0,10) + '.txt';
          a.click();
          URL.revokeObjectURL(url);
        }

        // PDF 다운로드 (HTML 인쇄)
        function downloadPDF() {
          const store = analysisResults.storeInfo;
          
          let html = '<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>STUDIOJUAI 마케팅 분석 리포트</title>';
          html += '<style>body{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;padding:40px;line-height:1.8;max-width:800px;margin:0 auto;}';
          html += 'h1{color:#10B981;border-bottom:3px solid #10B981;padding-bottom:10px;margin-bottom:30px;}';
          html += 'h2{color:#333;margin-top:40px;border-left:4px solid #10B981;padding-left:15px;background:#f0fdf4;padding:10px 15px;}';
          html += '.info-table{width:100%;border-collapse:collapse;margin:20px 0;}';
          html += '.info-table td{padding:10px;border:1px solid #ddd;}';
          html += '.info-table td:first-child{background:#f9fafb;width:120px;font-weight:600;}';
          html += '.result-box{background:#f9fafb;padding:20px;border-radius:10px;margin:15px 0;white-space:pre-wrap;font-size:14px;line-height:1.8;}';
          html += '.footer{text-align:center;margin-top:50px;color:#666;border-top:2px solid #10B981;padding-top:20px;}';
          html += '@media print{body{padding:20px;}}</style></head><body>';
          
          html += '<h1>🤖 STUDIOJUAI AI 마케팅 분석 리포트</h1>';
          html += '<p style="color:#666;">생성일시: ' + new Date().toLocaleString('ko-KR') + '</p>';
          
          html += '<h2>📋 매장 정보</h2>';
          html += '<table class="info-table">';
          html += '<tr><td>매장명</td><td>' + (store?.name || '-') + '</td></tr>';
          html += '<tr><td>위치</td><td>' + (store?.location || '-') + '</td></tr>';
          html += '<tr><td>업종</td><td>' + (store?.industry || '-') + '</td></tr>';
          html += '<tr><td>대표 메뉴</td><td>' + (store?.mainProduct || '-') + '</td></tr>';
          html += '<tr><td>가격대</td><td>' + (store?.priceRange || '-') + '</td></tr>';
          html += '<tr><td>타겟 고객</td><td>' + (store?.targetCustomer || '-') + '</td></tr>';
          html += '</table>';
          
          html += '<h2>🗺️ 상권분석 결과</h2>';
          html += '<div class="result-box">' + escapeHtml(document.getElementById('trade-area-result').textContent) + '</div>';
          
          analysisResults.bots.forEach(bot => {
            html += '<h2>' + bot.icon + ' ' + bot.name + ' <span style="font-size:12px;color:#666;">(' + bot.category + ')</span></h2>';
            html += '<div class="result-box">' + escapeHtml(bot.result) + '</div>';
          });
          
          html += '<div class="footer">';
          html += '<p><strong style="color:#10B981;">STUDIOJUAI</strong> - AI 마케팅 자동화 플랫폼</p>';
          html += '<p>https://studiojuai.pages.dev</p>';
          html += '</div></body></html>';
          
          const printWindow = window.open('', '_blank');
          printWindow.document.write(html);
          printWindow.document.close();
          setTimeout(() => {
            printWindow.print();
          }, 500);
        }

        // 로딩 관련
        function showLoading() {
          document.getElementById('loading-overlay').classList.remove('hidden');
          document.getElementById('execute-btn').disabled = true;
          document.getElementById('execute-btn').innerHTML = '<i class="fas fa-spinner animate-spin"></i> 실행 중...';
        }

        function hideLoading() {
          document.getElementById('loading-overlay').classList.add('hidden');
          document.getElementById('execute-btn').disabled = false;
          document.getElementById('execute-btn').innerHTML = '<i class="fas fa-play"></i> <span>상권분석 + 봇 실행</span>';
        }

        function updateLoadingStatus(text, progress) {
          document.getElementById('loading-status').textContent = text;
          document.getElementById('progress-bar').style.width = progress + '%';
        }

        // API 키 모달
        function openApiModal() {
          document.getElementById('api-modal').classList.remove('hidden');
          document.getElementById('gemini-key').value = localStorage.getItem('gemini_key') || '';
          document.getElementById('naver-id').value = localStorage.getItem('naver_client_id') || '';
          document.getElementById('naver-secret').value = localStorage.getItem('naver_client_secret') || '';
        }

        function closeApiModal() {
          document.getElementById('api-modal').classList.add('hidden');
        }

        function saveApiKeys() {
          const geminiKey = document.getElementById('gemini-key').value.trim();
          const naverId = document.getElementById('naver-id').value.trim();
          const naverSecret = document.getElementById('naver-secret').value.trim();
          
          if (!geminiKey) {
            alert('❌ Gemini API 키는 필수입니다!');
            return;
          }
          
          localStorage.setItem('gemini_key', geminiKey);
          if (naverId) localStorage.setItem('naver_client_id', naverId);
          if (naverSecret) localStorage.setItem('naver_client_secret', naverSecret);
          
          alert('✅ API 키가 저장되었습니다!');
          closeApiModal();
        }

        // 초기화
        document.addEventListener('DOMContentLoaded', function() {
          renderBotGrid();
          
          // 기본으로 상권분석 5개 봇 선택
          ['trade-area-overview', 'competitor-analysis', 'target-customer', 'location-evaluation', 'trend-analysis'].forEach(id => {
            setTimeout(() => toggleBot(id), 100);
          });
        });
      </script>

    </body>
    </html>
  `)
}
