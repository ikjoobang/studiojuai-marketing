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
      <main class="pt-20 pb-12 min-h-screen">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 페이지 헤더 */}
          <div class="mb-8">
            <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              <i class="fas fa-th-large text-primary-500 mr-3"></i>
              봇 대시보드
            </h1>
            <p class="text-slate-600 dark:text-slate-400">
              30개 AI 봇을 관리하고 실행하세요. 먼저 다가가는 영업사원처럼!
            </p>
          </div>
          
          {/* 매장 정보 카드 */}
          <div id="store-info-card" class="bg-white dark:bg-dark-card rounded-2xl shadow-lg border border-slate-100 dark:border-dark-border p-6 mb-8">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-1" id="display-store-name">
                  매장 정보 없음
                </h2>
                <p class="text-slate-600 dark:text-slate-400" id="display-store-info">
                  홈에서 매장 정보를 입력해주세요
                </p>
              </div>
              <div class="flex gap-2">
                <a href="/" class="px-4 py-2 bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  <i class="fas fa-edit mr-2"></i>수정
                </a>
                <button onclick="executeAllBotsSequentially()" class="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all">
                  <i class="fas fa-bolt mr-2"></i>전체 실행
                </button>
              </div>
            </div>
          </div>
          
          {/* 실행 진행 상황 */}
          <div id="execution-progress" class="hidden bg-white dark:bg-dark-card rounded-2xl shadow-lg border border-slate-100 dark:border-dark-border p-6 mb-8">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
                <i class="fas fa-spinner fa-spin text-primary-500 mr-2"></i>
                봇 실행 중...
              </h3>
              <span id="progress-text" class="text-sm text-slate-600 dark:text-slate-400">0/30</span>
            </div>
            <div class="w-full bg-slate-200 dark:bg-dark-bg rounded-full h-3">
              <div id="progress-bar" class="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-300" style="width: 0%"></div>
            </div>
          </div>
          
          {/* 카테고리 필터 */}
          <div class="flex flex-wrap gap-2 mb-6">
            <button onclick="filterBots('all')" class="bot-filter-btn px-4 py-2 rounded-full bg-primary-500 text-white font-medium transition-all" data-filter="all">
              전체 (30)
            </button>
            <button onclick="filterBots('고객응대')" class="bot-filter-btn px-4 py-2 rounded-full bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 font-medium hover:bg-primary-100 transition-all" data-filter="고객응대">
              고객응대 (5)
            </button>
            <button onclick="filterBots('콘텐츠')" class="bot-filter-btn px-4 py-2 rounded-full bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 font-medium hover:bg-primary-100 transition-all" data-filter="콘텐츠">
              콘텐츠 (5)
            </button>
            <button onclick="filterBots('고객관계')" class="bot-filter-btn px-4 py-2 rounded-full bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 font-medium hover:bg-primary-100 transition-all" data-filter="고객관계">
              고객관계 (5)
            </button>
            <button onclick="filterBots('소셜미디어')" class="bot-filter-btn px-4 py-2 rounded-full bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 font-medium hover:bg-primary-100 transition-all" data-filter="소셜미디어">
              소셜미디어 (5)
            </button>
            <button onclick="filterBots('디지털마케팅')" class="bot-filter-btn px-4 py-2 rounded-full bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 font-medium hover:bg-primary-100 transition-all" data-filter="디지털마케팅">
              디지털마케팅 (5)
            </button>
            <button onclick="filterBots('전략분석')" class="bot-filter-btn px-4 py-2 rounded-full bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 font-medium hover:bg-primary-100 transition-all" data-filter="전략분석">
              전략분석 (5)
            </button>
          </div>
          
          {/* 봇 그리드 */}
          <div id="bot-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* JavaScript로 렌더링 */}
          </div>
          
          {/* 결과 패널 */}
          <div id="results-panel" class="hidden mt-8">
            <div class="bg-white dark:bg-dark-card rounded-2xl shadow-lg border border-slate-100 dark:border-dark-border overflow-hidden">
              <div class="p-6 border-b border-slate-200 dark:border-dark-border flex items-center justify-between">
                <h3 class="text-xl font-bold text-slate-900 dark:text-white">
                  <i class="fas fa-check-circle text-green-500 mr-2"></i>
                  실행 결과
                </h3>
                <div class="flex gap-2">
                  <button onclick="exportResults()" class="px-4 py-2 bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 transition-colors">
                    <i class="fas fa-download mr-2"></i>내보내기
                  </button>
                  <button onclick="clearResults()" class="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                    <i class="fas fa-trash mr-2"></i>지우기
                  </button>
                </div>
              </div>
              <div id="results-container" class="divide-y divide-slate-200 dark:divide-dark-border max-h-[600px] overflow-y-auto">
                {/* 결과 아이템들 */}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* 스크립트 */}
      <script dangerouslySetInnerHTML={{
        __html: `
          const botsData = [
            { id: 'greeting', name: '첫인사 봇', icon: '👋', category: '고객응대', desc: '신규 고객에게 먼저 다가가는 환영 메시지' },
            { id: 'menu', name: '메뉴추천 봇', icon: '🍽️', category: '고객응대', desc: '고객 취향에 맞는 메뉴 적극 추천' },
            { id: 'event', name: '이벤트 안내 봇', icon: '🎉', category: '고객응대', desc: '진행 중인 이벤트/프로모션 적극 홍보' },
            { id: 'review', name: '리뷰 요청 봇', icon: '⭐', category: '고객응대', desc: '만족 고객에게 리뷰 작성 적극 요청' },
            { id: 'sns', name: 'SNS 홍보 봇', icon: '📱', category: '고객응대', desc: '인스타그램/페이스북용 홍보 문구' },
            { id: 'blog', name: '블로그 콘텐츠 봇', icon: '📝', category: '콘텐츠', desc: '네이버 블로그 최적화 콘텐츠 작성' },
            { id: 'keyword', name: '키워드 분석 봇', icon: '🔍', category: '콘텐츠', desc: '검색 최적화 키워드 발굴 및 제안' },
            { id: 'competitor', name: '경쟁사 분석 봇', icon: '🎯', category: '콘텐츠', desc: '주변 경쟁 매장 분석 및 차별화 전략' },
            { id: 'local', name: '지역 마케팅 봇', icon: '📍', category: '콘텐츠', desc: '동네 타겟 마케팅 전략 수립' },
            { id: 'seasonal', name: '시즌 마케팅 봇', icon: '🗓️', category: '콘텐츠', desc: '계절/시기별 맞춤 프로모션 기획' },
            { id: 'loyalty', name: '단골 관리 봇', icon: '💎', category: '고객관계', desc: '재방문 고객 특별 관리 및 혜택 제공' },
            { id: 'upsell', name: '업셀링 봇', icon: '📈', category: '고객관계', desc: '추가 구매 및 업그레이드 유도' },
            { id: 'referral', name: '소개 유도 봇', icon: '🤝', category: '고객관계', desc: '지인 소개 프로그램 적극 홍보' },
            { id: 'feedback', name: '피드백 수집 봇', icon: '💬', category: '고객관계', desc: '고객 의견 적극 수집 및 개선 약속' },
            { id: 'crisis', name: '불만 대응 봇', icon: '🆘', category: '고객관계', desc: '고객 불만 신속 대응 및 해결' },
            { id: 'story', name: '스토리 콘텐츠 봇', icon: '📸', category: '소셜미디어', desc: '인스타 스토리/릴스용 콘텐츠 기획' },
            { id: 'visual', name: '비주얼 기획 봇', icon: '🎬', category: '소셜미디어', desc: '사진/영상 촬영 가이드 및 편집 방향' },
            { id: 'hashtag', name: '해시태그 전략 봇', icon: '#️⃣', category: '소셜미디어', desc: '최적의 해시태그 조합 제안' },
            { id: 'influencer', name: '인플루언서 협업 봇', icon: '🌟', category: '소셜미디어', desc: '인플루언서 마케팅 전략 수립' },
            { id: 'community', name: '커뮤니티 관리 봇', icon: '👥', category: '소셜미디어', desc: '온라인 커뮤니티 활동 전략' },
            { id: 'email', name: '이메일 마케팅 봇', icon: '📧', category: '디지털마케팅', desc: '고객 이메일 캠페인 문구 작성' },
            { id: 'sms', name: 'SMS 마케팅 봇', icon: '💌', category: '디지털마케팅', desc: '문자 메시지 마케팅 문구 작성' },
            { id: 'push', name: '푸시 알림 봇', icon: '🔔', category: '디지털마케팅', desc: '앱/웹 푸시 알림 메시지 작성' },
            { id: 'retarget', name: '리타겟팅 봇', icon: '🔄', category: '디지털마케팅', desc: '이탈 고객 재유입 전략 수립' },
            { id: 'partnership', name: '제휴 마케팅 봇', icon: '🤜', category: '디지털마케팅', desc: '지역 업체 간 제휴 전략 수립' },
            { id: 'pricing', name: '가격 전략 봇', icon: '💰', category: '전략분석', desc: '최적 가격 책정 및 조정 전략' },
            { id: 'bundle', name: '번들 기획 봇', icon: '📦', category: '전략분석', desc: '세트/패키지 상품 기획' },
            { id: 'flash', name: '플래시 세일 봇', icon: '⚡', category: '전략분석', desc: '긴급 할인 이벤트 기획' },
            { id: 'membership', name: '멤버십 기획 봇', icon: '🏆', category: '전략분석', desc: '고객 등급제/구독 서비스 설계' },
            { id: 'analytics', name: '성과 분석 봇', icon: '📊', category: '전략분석', desc: '마케팅 성과 분석 및 개선점 도출' },
          ];
          
          let currentFilter = 'all';
          let botResults = {};
          let isExecuting = false;
          
          document.addEventListener('DOMContentLoaded', function() {
            loadStoreInfo();
            renderBotGrid();
            
            // URL 파라미터 확인 (전체 실행)
            const params = new URLSearchParams(window.location.search);
            if (params.get('executeAll') === 'true') {
              setTimeout(() => executeAllBotsSequentially(), 500);
            }
          });
          
          function loadStoreInfo() {
            const storeInfo = StoreInfoManager.get();
            if (storeInfo && storeInfo.name) {
              document.getElementById('display-store-name').textContent = storeInfo.name;
              document.getElementById('display-store-info').textContent = 
                [storeInfo.location, storeInfo.industry, storeInfo.mainProduct].filter(Boolean).join(' · ');
            }
          }
          
          function renderBotGrid() {
            const container = document.getElementById('bot-grid');
            const filteredBots = currentFilter === 'all' 
              ? botsData 
              : botsData.filter(b => b.category === currentFilter);
            
            container.innerHTML = filteredBots.map(bot => {
              const result = botResults[bot.id];
              const statusClass = result 
                ? (result.success ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-red-500 bg-red-50 dark:bg-red-900/20')
                : 'border-slate-100 dark:border-dark-border';
              
              return \`
                <div class="bot-card bg-white dark:bg-dark-card rounded-2xl shadow-lg border-2 \${statusClass} p-6 transition-all" data-bot-id="\${bot.id}" data-category="\${bot.category}">
                  <div class="flex items-start justify-between mb-4">
                    <div class="text-4xl">\${bot.icon}</div>
                    <div class="flex items-center gap-2">
                      \${result ? \`
                        <span class="w-3 h-3 rounded-full \${result.success ? 'bg-green-500' : 'bg-red-500'}"></span>
                      \` : ''}
                      <span class="text-xs px-2 py-1 bg-slate-100 dark:bg-dark-bg text-slate-600 dark:text-slate-400 rounded-full">
                        \${bot.category}
                      </span>
                    </div>
                  </div>
                  <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">\${bot.name}</h3>
                  <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">\${bot.desc}</p>
                  <div class="flex gap-2">
                    <button onclick="executeBot('\${bot.id}')" class="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors \${isExecuting ? 'opacity-50 cursor-not-allowed' : ''}" \${isExecuting ? 'disabled' : ''}>
                      <i class="fas fa-play mr-2"></i>실행
                    </button>
                    \${result && result.success ? \`
                      <button onclick="viewResult('\${bot.id}')" class="px-4 py-2 bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 transition-colors">
                        <i class="fas fa-eye"></i>
                      </button>
                    \` : ''}
                  </div>
                </div>
              \`;
            }).join('');
          }
          
          function filterBots(category) {
            currentFilter = category;
            
            document.querySelectorAll('.bot-filter-btn').forEach(btn => {
              if (btn.dataset.filter === category) {
                btn.className = 'bot-filter-btn px-4 py-2 rounded-full bg-primary-500 text-white font-medium transition-all';
              } else {
                btn.className = 'bot-filter-btn px-4 py-2 rounded-full bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 font-medium hover:bg-primary-100 transition-all';
              }
            });
            
            renderBotGrid();
          }
          
          async function executeBot(botId) {
            if (isExecuting) return;
            
            if (!ApiKeyManager.isSet()) {
              showToast('API 키를 먼저 설정해주세요', 'warning');
              return;
            }
            
            const storeInfo = StoreInfoManager.get();
            if (!storeInfo || !storeInfo.name) {
              showToast('매장 정보를 먼저 입력해주세요', 'warning');
              window.location.href = '/';
              return;
            }
            
            const botCard = document.querySelector(\`[data-bot-id="\${botId}"]\`);
            botCard.classList.add('animate-pulse');
            
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
                  industry: storeInfo.industry || 'cafe'
                })
              });
              
              const data = await response.json();
              
              botResults[botId] = data;
              renderBotGrid();
              updateResultsPanel();
              
              if (data.success) {
                showToast(\`\${data.botName} 실행 완료!\`, 'success');
              } else {
                showToast(data.error || '봇 실행 실패', 'error');
              }
            } catch (error) {
              botResults[botId] = { success: false, error: error.message };
              renderBotGrid();
              showToast('봇 실행 중 오류가 발생했습니다', 'error');
            }
            
            botCard.classList.remove('animate-pulse');
          }
          
          async function executeAllBotsSequentially() {
            if (isExecuting) return;
            
            if (!ApiKeyManager.isSet()) {
              showToast('API 키를 먼저 설정해주세요', 'warning');
              return;
            }
            
            const storeInfo = StoreInfoManager.get();
            if (!storeInfo || !storeInfo.name) {
              showToast('매장 정보를 먼저 입력해주세요', 'warning');
              window.location.href = '/';
              return;
            }
            
            isExecuting = true;
            renderBotGrid();
            
            const progressEl = document.getElementById('execution-progress');
            const progressBar = document.getElementById('progress-bar');
            const progressText = document.getElementById('progress-text');
            progressEl.classList.remove('hidden');
            
            for (let i = 0; i < botsData.length; i++) {
              const bot = botsData[i];
              const progress = ((i + 1) / botsData.length) * 100;
              
              progressBar.style.width = progress + '%';
              progressText.textContent = \`\${i + 1}/\${botsData.length} - \${bot.name}\`;
              
              try {
                const response = await fetch('/api/bot/execute', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'X-Gemini-Key': ApiKeyManager.get()
                  },
                  body: JSON.stringify({
                    botId: bot.id,
                    storeInfo,
                    industry: storeInfo.industry || 'cafe'
                  })
                });
                
                const data = await response.json();
                botResults[bot.id] = data;
                renderBotGrid();
                updateResultsPanel();
                
                // 잠시 대기 (API 속도 제한 방지)
                await new Promise(resolve => setTimeout(resolve, 500));
                
              } catch (error) {
                botResults[bot.id] = { success: false, error: error.message };
              }
            }
            
            isExecuting = false;
            progressEl.classList.add('hidden');
            renderBotGrid();
            
            const successCount = Object.values(botResults).filter(r => r.success).length;
            showToast(\`전체 실행 완료! 성공: \${successCount}/\${botsData.length}\`, 'success');
          }
          
          function viewResult(botId) {
            const result = botResults[botId];
            if (!result || !result.success) return;
            
            const bot = botsData.find(b => b.id === botId);
            
            const modal = document.createElement('div');
            modal.id = 'result-modal';
            modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
            modal.innerHTML = \`
              <div class="bg-white dark:bg-dark-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
                <div class="p-6 border-b border-slate-200 dark:border-dark-border flex items-center justify-between">
                  <h3 class="text-xl font-bold text-slate-900 dark:text-white">
                    \${bot.icon} \${bot.name} 결과
                  </h3>
                  <button onclick="document.getElementById('result-modal').remove()" class="p-2 hover:bg-slate-100 dark:hover:bg-dark-bg rounded-lg">
                    <i class="fas fa-times text-slate-500"></i>
                  </button>
                </div>
                <div class="p-6 overflow-y-auto max-h-[60vh]">
                  <div class="prose dark:prose-invert max-w-none whitespace-pre-wrap">\${result.result}</div>
                </div>
                <div class="p-4 border-t border-slate-200 dark:border-dark-border flex justify-end gap-2">
                  <button onclick="copyToClipboard('\${botId}')" class="px-4 py-2 bg-slate-100 dark:bg-dark-bg text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200">
                    <i class="fas fa-copy mr-2"></i>복사
                  </button>
                  <button onclick="document.getElementById('result-modal').remove()" class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
                    확인
                  </button>
                </div>
              </div>
            \`;
            document.body.appendChild(modal);
          }
          
          function copyToClipboard(botId) {
            const result = botResults[botId];
            if (result && result.result) {
              navigator.clipboard.writeText(result.result);
              showToast('클립보드에 복사되었습니다', 'success');
            }
          }
          
          function updateResultsPanel() {
            const panel = document.getElementById('results-panel');
            const container = document.getElementById('results-container');
            
            const successResults = Object.entries(botResults).filter(([_, r]) => r.success);
            
            if (successResults.length === 0) {
              panel.classList.add('hidden');
              return;
            }
            
            panel.classList.remove('hidden');
            
            container.innerHTML = successResults.map(([botId, result]) => {
              const bot = botsData.find(b => b.id === botId);
              return \`
                <div class="p-4 hover:bg-slate-50 dark:hover:bg-dark-bg transition-colors">
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-2">
                      <span class="text-2xl">\${bot.icon}</span>
                      <span class="font-semibold text-slate-900 dark:text-white">\${bot.name}</span>
                    </div>
                    <button onclick="viewResult('\${botId}')" class="text-primary-500 hover:text-primary-600 text-sm">
                      자세히 보기 →
                    </button>
                  </div>
                  <p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">\${result.result.substring(0, 150)}...</p>
                </div>
              \`;
            }).join('');
          }
          
          function exportResults() {
            const successResults = Object.entries(botResults)
              .filter(([_, r]) => r.success)
              .map(([botId, result]) => {
                const bot = botsData.find(b => b.id === botId);
                return \`## \${bot.icon} \${bot.name}\\n\\n\${result.result}\\n\\n---\\n\`;
              });
            
            if (successResults.length === 0) {
              showToast('내보낼 결과가 없습니다', 'warning');
              return;
            }
            
            const storeInfo = StoreInfoManager.get();
            const content = \`# \${storeInfo?.name || '매장'} 마케팅 콘텐츠\\n\\n생성일: \${new Date().toLocaleString('ko-KR')}\\n\\n---\\n\\n\${successResults.join('')}\`;
            
            const blob = new Blob([content], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = \`marketing-content-\${Date.now()}.md\`;
            a.click();
            URL.revokeObjectURL(url);
            
            showToast('결과가 다운로드되었습니다', 'success');
          }
          
          function clearResults() {
            if (confirm('모든 결과를 삭제하시겠습니까?')) {
              botResults = {};
              renderBotGrid();
              document.getElementById('results-panel').classList.add('hidden');
              showToast('결과가 삭제되었습니다', 'info');
            }
          }
        `
      }} />
    </>
  )
}
