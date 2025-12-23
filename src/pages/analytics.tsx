import type { Context } from 'hono'

export const analyticsPage = (c: Context) => {
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
              <a href="/analytics" class="text-primary-600 dark:text-primary-400 font-medium">분석</a>
              <a href="/settings" class="text-slate-600 dark:text-slate-400 hover:text-primary-600 transition-colors">설정</a>
            </nav>
            
            <button onclick="toggleDarkMode()" class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-card transition-colors">
              <i class="fas fa-moon dark:hidden text-slate-600"></i>
              <i class="fas fa-sun hidden dark:block text-yellow-400"></i>
            </button>
          </div>
        </div>
      </header>
      
      {/* 메인 컨텐츠 */}
      <main class="pt-20 pb-12 min-h-screen">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 페이지 헤더 */}
          <div class="mb-8">
            <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              <i class="fas fa-chart-line text-primary-500 mr-3"></i>
              마케팅 분석
            </h1>
            <p class="text-slate-600 dark:text-slate-400">
              AI 봇 실행 현황 및 마케팅 성과를 분석합니다
            </p>
          </div>
          
          {/* 통계 카드 */}
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div class="bg-white dark:bg-dark-card rounded-2xl shadow-lg border border-slate-100 dark:border-dark-border p-6">
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                  <i class="fas fa-robot text-primary-600 dark:text-primary-400 text-xl"></i>
                </div>
                <span class="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full">+12%</span>
              </div>
              <div class="text-3xl font-bold text-slate-900 dark:text-white mb-1" id="stat-total-runs">0</div>
              <div class="text-sm text-slate-600 dark:text-slate-400">총 봇 실행</div>
            </div>
            
            <div class="bg-white dark:bg-dark-card rounded-2xl shadow-lg border border-slate-100 dark:border-dark-border p-6">
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                  <i class="fas fa-check-circle text-green-600 dark:text-green-400 text-xl"></i>
                </div>
                <span class="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full">98.5%</span>
              </div>
              <div class="text-3xl font-bold text-slate-900 dark:text-white mb-1" id="stat-success-rate">0%</div>
              <div class="text-sm text-slate-600 dark:text-slate-400">성공률</div>
            </div>
            
            <div class="bg-white dark:bg-dark-card rounded-2xl shadow-lg border border-slate-100 dark:border-dark-border p-6">
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <i class="fas fa-file-alt text-blue-600 dark:text-blue-400 text-xl"></i>
                </div>
                <span class="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">NEW</span>
              </div>
              <div class="text-3xl font-bold text-slate-900 dark:text-white mb-1" id="stat-contents">0</div>
              <div class="text-sm text-slate-600 dark:text-slate-400">생성된 콘텐츠</div>
            </div>
            
            <div class="bg-white dark:bg-dark-card rounded-2xl shadow-lg border border-slate-100 dark:border-dark-border p-6">
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center">
                  <i class="fas fa-clock text-amber-600 dark:text-amber-400 text-xl"></i>
                </div>
              </div>
              <div class="text-3xl font-bold text-slate-900 dark:text-white mb-1" id="stat-time-saved">0h</div>
              <div class="text-sm text-slate-600 dark:text-slate-400">절약된 시간</div>
            </div>
          </div>
          
          {/* 차트 섹션 */}
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* 카테고리별 사용 현황 */}
            <div class="bg-white dark:bg-dark-card rounded-2xl shadow-lg border border-slate-100 dark:border-dark-border p-6">
              <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-6">
                <i class="fas fa-pie-chart text-primary-500 mr-2"></i>
                카테고리별 사용 현황
              </h3>
              <div id="category-chart" class="h-64 flex items-center justify-center">
                <div class="text-center text-slate-500 dark:text-slate-400">
                  <i class="fas fa-chart-pie text-4xl mb-3 opacity-50"></i>
                  <p>봇 실행 후 데이터가 표시됩니다</p>
                </div>
              </div>
            </div>
            
            {/* 일별 실행 추이 */}
            <div class="bg-white dark:bg-dark-card rounded-2xl shadow-lg border border-slate-100 dark:border-dark-border p-6">
              <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-6">
                <i class="fas fa-chart-bar text-primary-500 mr-2"></i>
                일별 실행 추이
              </h3>
              <div id="daily-chart" class="h-64 flex items-center justify-center">
                <div class="text-center text-slate-500 dark:text-slate-400">
                  <i class="fas fa-chart-bar text-4xl mb-3 opacity-50"></i>
                  <p>봇 실행 후 데이터가 표시됩니다</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* 인기 봇 랭킹 */}
          <div class="bg-white dark:bg-dark-card rounded-2xl shadow-lg border border-slate-100 dark:border-dark-border p-6 mb-8">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-6">
              <i class="fas fa-trophy text-amber-500 mr-2"></i>
              인기 봇 TOP 10
            </h3>
            <div id="top-bots" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* JavaScript로 렌더링 */}
            </div>
          </div>
          
          {/* 최근 활동 */}
          <div class="bg-white dark:bg-dark-card rounded-2xl shadow-lg border border-slate-100 dark:border-dark-border p-6">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-6">
              <i class="fas fa-history text-primary-500 mr-2"></i>
              최근 활동
            </h3>
            <div id="recent-activity" class="space-y-3">
              <div class="text-center py-8 text-slate-500 dark:text-slate-400">
                <i class="fas fa-inbox text-4xl mb-3 opacity-50"></i>
                <p>아직 활동 기록이 없습니다</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* 스크립트 */}
      <script dangerouslySetInnerHTML={{
        __html: `
          const botsData = [
            { id: 'greeting', name: '첫인사 봇', icon: '👋', category: '고객응대' },
            { id: 'menu', name: '메뉴추천 봇', icon: '🍽️', category: '고객응대' },
            { id: 'event', name: '이벤트 안내 봇', icon: '🎉', category: '고객응대' },
            { id: 'review', name: '리뷰 요청 봇', icon: '⭐', category: '고객응대' },
            { id: 'sns', name: 'SNS 홍보 봇', icon: '📱', category: '고객응대' },
            { id: 'blog', name: '블로그 콘텐츠 봇', icon: '📝', category: '콘텐츠' },
            { id: 'keyword', name: '키워드 분석 봇', icon: '🔍', category: '콘텐츠' },
            { id: 'competitor', name: '경쟁사 분석 봇', icon: '🎯', category: '콘텐츠' },
            { id: 'local', name: '지역 마케팅 봇', icon: '📍', category: '콘텐츠' },
            { id: 'seasonal', name: '시즌 마케팅 봇', icon: '🗓️', category: '콘텐츠' },
          ];
          
          document.addEventListener('DOMContentLoaded', function() {
            loadAnalytics();
            renderTopBots();
          });
          
          function loadAnalytics() {
            // 로컬 스토리지에서 통계 로드 (데모 데이터)
            const stats = JSON.parse(localStorage.getItem('bot_stats') || '{}');
            
            const totalRuns = stats.totalRuns || Math.floor(Math.random() * 100) + 50;
            const successRate = stats.successRate || (95 + Math.random() * 5).toFixed(1);
            const contents = stats.contents || Math.floor(Math.random() * 50) + 20;
            const timeSaved = Math.floor(totalRuns * 0.5);
            
            document.getElementById('stat-total-runs').textContent = totalRuns.toLocaleString();
            document.getElementById('stat-success-rate').textContent = successRate + '%';
            document.getElementById('stat-contents').textContent = contents.toLocaleString();
            document.getElementById('stat-time-saved').textContent = timeSaved + 'h';
            
            // 통계 저장
            localStorage.setItem('bot_stats', JSON.stringify({
              totalRuns, successRate, contents
            }));
          }
          
          function renderTopBots() {
            const container = document.getElementById('top-bots');
            const topBots = botsData.slice(0, 10).map((bot, index) => ({
              ...bot,
              runs: Math.floor(Math.random() * 50) + 10 - index * 3
            })).sort((a, b) => b.runs - a.runs);
            
            container.innerHTML = topBots.slice(0, 5).map((bot, index) => \`
              <div class="flex items-center space-x-3 p-4 bg-slate-50 dark:bg-dark-bg rounded-xl">
                <div class="w-8 h-8 flex items-center justify-center font-bold \${index === 0 ? 'text-amber-500' : index === 1 ? 'text-slate-400' : index === 2 ? 'text-amber-700' : 'text-slate-500'}">
                  \${index < 3 ? ['🥇', '🥈', '🥉'][index] : (index + 1)}
                </div>
                <div class="text-2xl">\${bot.icon}</div>
                <div class="flex-1">
                  <div class="font-semibold text-slate-900 dark:text-white text-sm">\${bot.name}</div>
                  <div class="text-xs text-slate-500">\${bot.runs}회 실행</div>
                </div>
              </div>
            \`).join('');
          }
        `
      }} />
    </>
  )
}
