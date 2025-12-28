import { Context } from 'hono'

export const adminPage = (c: Context) => {
  return c.render(
    <html lang="ko">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, nofollow" />
        <title>관리자 페이지 - STUDIOJUAI</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" rel="stylesheet" />
        <style>{`
          body { 
            font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
            /* 복사/드래그 방지 */
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
          /* 콘솔 개발자도구 경고 */
          .no-select { 
            -webkit-touch-callout: none;
          }
          /* 보안 배지 */
          .security-badge {
            background: linear-gradient(135deg, #10B981 0%, #059669 100%);
            animation: pulse 2s infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
          /* 통계 카드 */
          .stat-card {
            transition: all 0.3s ease;
          }
          .stat-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);
          }
        `}</style>
      </head>
      <body class="bg-gray-100 min-h-screen no-select">
        
        {/* 네비게이션 */}
        <nav class="bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg">
          <div class="container mx-auto px-4">
            <div class="flex items-center justify-between h-16">
              <div class="flex items-center gap-4">
                <a href="/" class="text-xl font-bold">
                  STUDIOJUAI <span class="text-red-400">ADMIN</span>
                </a>
                <div class="security-badge px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1">
                  <i class="fas fa-shield-alt"></i> 보안 활성
                </div>
              </div>
              
              <div class="flex items-center gap-4">
                <a href="/" class="text-gray-300 hover:text-white transition">
                  <i class="fas fa-home mr-1"></i> 메인
                </a>
                <a href="/dashboard" class="text-gray-300 hover:text-white transition">
                  <i class="fas fa-th-large mr-1"></i> 대시보드
                </a>
                <button onclick="logout()" class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-medium transition">
                  <i class="fas fa-sign-out-alt mr-1"></i> 로그아웃
                </button>
              </div>
            </div>
          </div>
        </nav>
        
        {/* 메인 콘텐츠 */}
        <div class="container mx-auto px-4 py-8">
          
          {/* 관리자 로그인 모달 */}
          <div id="login-modal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
            <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
              <div class="text-center mb-6">
                <div class="w-16 h-16 bg-gradient-to-r from-slate-700 to-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-lock text-2xl text-white"></i>
                </div>
                <h2 class="text-2xl font-bold text-gray-800">관리자 로그인</h2>
                <p class="text-gray-500 mt-2">인증된 관리자만 접근 가능합니다</p>
              </div>
              
              <form onsubmit="handleLogin(event)" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">관리자 ID</label>
                  <input type="text" id="admin-id" 
                    class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="관리자 ID를 입력하세요" required />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
                  <input type="password" id="admin-password" 
                    class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="비밀번호를 입력하세요" required />
                </div>
                <div id="login-error" class="text-red-500 text-sm hidden"></div>
                <button type="submit" 
                  class="w-full bg-gradient-to-r from-slate-700 to-slate-900 text-white py-3 rounded-lg font-bold hover:opacity-90 transition">
                  <i class="fas fa-sign-in-alt mr-2"></i>로그인
                </button>
              </form>
              
              <p class="text-center text-gray-400 text-sm mt-4">
                <i class="fas fa-shield-alt mr-1"></i> 모든 접근 기록이 저장됩니다
              </p>
            </div>
          </div>
          
          {/* 대시보드 콘텐츠 (로그인 후 표시) */}
          <div id="admin-content" class="hidden">
            
            {/* 통계 카드들 */}
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div class="stat-card bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-gray-500 text-sm">총 사용자</p>
                    <p id="stat-users" class="text-3xl font-bold text-gray-800">0</p>
                  </div>
                  <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <i class="fas fa-users text-xl text-blue-500"></i>
                  </div>
                </div>
                <p class="text-green-500 text-sm mt-2"><i class="fas fa-arrow-up"></i> +12% 이번 주</p>
              </div>
              
              <div class="stat-card bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-gray-500 text-sm">상권분석 실행</p>
                    <p id="stat-analysis" class="text-3xl font-bold text-gray-800">0</p>
                  </div>
                  <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <i class="fas fa-chart-area text-xl text-green-500"></i>
                  </div>
                </div>
                <p class="text-green-500 text-sm mt-2"><i class="fas fa-arrow-up"></i> +8% 이번 주</p>
              </div>
              
              <div class="stat-card bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-gray-500 text-sm">봇 실행 횟수</p>
                    <p id="stat-bots" class="text-3xl font-bold text-gray-800">0</p>
                  </div>
                  <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <i class="fas fa-robot text-xl text-purple-500"></i>
                  </div>
                </div>
                <p class="text-green-500 text-sm mt-2"><i class="fas fa-arrow-up"></i> +25% 이번 주</p>
              </div>
              
              <div class="stat-card bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-gray-500 text-sm">유료 전환</p>
                    <p id="stat-premium" class="text-3xl font-bold text-gray-800">0</p>
                  </div>
                  <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <i class="fas fa-crown text-xl text-orange-500"></i>
                  </div>
                </div>
                <p class="text-orange-500 text-sm mt-2"><i class="fas fa-minus"></i> 0% 이번 주</p>
              </div>
            </div>
            
            {/* 기능 섹션들 */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* 사용자 관리 */}
              <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <i class="fas fa-users text-blue-500"></i> 사용자 관리
                </h3>
                <div class="space-y-4">
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        A
                      </div>
                      <div>
                        <p class="font-medium text-gray-800">테스트 사용자</p>
                        <p class="text-sm text-gray-500">010-1234-5678</p>
                      </div>
                    </div>
                    <span class="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                      무료
                    </span>
                  </div>
                  <div id="user-list" class="text-center text-gray-500 py-4">
                    <i class="fas fa-spinner fa-spin mr-2"></i> 사용자 목록 로딩 중...
                  </div>
                </div>
                <button class="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition">
                  <i class="fas fa-download mr-2"></i> 사용자 목록 내보내기
                </button>
              </div>
              
              {/* 보안 설정 */}
              <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <i class="fas fa-shield-alt text-green-500"></i> 보안 설정
                </h3>
                <div class="space-y-4">
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p class="font-medium text-gray-800">복사/캡처 방지</p>
                      <p class="text-sm text-gray-500">결과물 복사 및 화면 캡처 차단</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" id="security-copy" class="sr-only peer" checked />
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p class="font-medium text-gray-800">API 키 암호화</p>
                      <p class="text-sm text-gray-500">사용자 API 키 암호화 저장</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" id="security-encrypt" class="sr-only peer" checked />
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p class="font-medium text-gray-800">개발자 도구 감지</p>
                      <p class="text-sm text-gray-500">F12/우클릭 차단 및 감지</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" id="security-devtools" class="sr-only peer" checked />
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p class="font-medium text-gray-800">워터마크</p>
                      <p class="text-sm text-gray-500">캡처 시 워터마크 표시</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" id="security-watermark" class="sr-only peer" />
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* API 설정 */}
              <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <i class="fas fa-key text-purple-500"></i> API 설정
                </h3>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Gemini API Key (서버)</label>
                    <div class="flex gap-2">
                      <input type="password" id="server-gemini-key" 
                        class="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="sk-..." />
                      <button onclick="saveServerKey('gemini')" 
                        class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">
                        저장
                      </button>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Naver Client ID (서버)</label>
                    <div class="flex gap-2">
                      <input type="password" id="server-naver-id" 
                        class="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="Client ID" />
                      <button onclick="saveServerKey('naver-id')" 
                        class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">
                        저장
                      </button>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Naver Client Secret (서버)</label>
                    <div class="flex gap-2">
                      <input type="password" id="server-naver-secret" 
                        class="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="Client Secret" />
                      <button onclick="saveServerKey('naver-secret')" 
                        class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">
                        저장
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 요금제 설정 */}
              <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <i class="fas fa-tags text-orange-500"></i> 요금제 설정
                </h3>
                <div class="space-y-4">
                  <div class="p-4 border-2 border-gray-200 rounded-lg">
                    <div class="flex items-center justify-between mb-2">
                      <span class="font-bold text-gray-800">무료 플랜</span>
                      <span class="text-2xl font-bold text-gray-800">₩0</span>
                    </div>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li><i class="fas fa-check text-green-500 mr-2"></i>상권분석 1회 무료</li>
                      <li><i class="fas fa-check text-green-500 mr-2"></i>상권분석 봇 5개</li>
                      <li><i class="fas fa-times text-red-500 mr-2"></i>마케팅 봇 25개 제한</li>
                      <li><i class="fas fa-times text-red-500 mr-2"></i>다운로드 기능 제한</li>
                    </ul>
                  </div>
                  
                  <div class="p-4 border-2 border-orange-500 rounded-lg bg-orange-50">
                    <div class="flex items-center justify-between mb-2">
                      <span class="font-bold text-orange-600">
                        <i class="fas fa-crown mr-1"></i>프리미엄 플랜
                      </span>
                      <span class="text-2xl font-bold text-orange-600">₩9,900<span class="text-sm text-gray-500">/월</span></span>
                    </div>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li><i class="fas fa-check text-green-500 mr-2"></i>상권분석 무제한</li>
                      <li><i class="fas fa-check text-green-500 mr-2"></i>전체 30개 봇 사용</li>
                      <li><i class="fas fa-check text-green-500 mr-2"></i>TXT/PDF 다운로드</li>
                      <li><i class="fas fa-check text-green-500 mr-2"></i>우선 지원</li>
                    </ul>
                  </div>
                </div>
              </div>
              
            </div>
            
            {/* 접근 로그 */}
            <div class="mt-8 bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i class="fas fa-history text-gray-500"></i> 최근 접근 로그
              </h3>
              <div class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-4 py-3 text-left font-medium text-gray-600">시간</th>
                      <th class="px-4 py-3 text-left font-medium text-gray-600">IP 주소</th>
                      <th class="px-4 py-3 text-left font-medium text-gray-600">행동</th>
                      <th class="px-4 py-3 text-left font-medium text-gray-600">상태</th>
                    </tr>
                  </thead>
                  <tbody id="access-log">
                    <tr class="border-b">
                      <td class="px-4 py-3 text-gray-800">{new Date().toLocaleString('ko-KR')}</td>
                      <td class="px-4 py-3 text-gray-600">현재 세션</td>
                      <td class="px-4 py-3 text-gray-600">관리자 로그인</td>
                      <td class="px-4 py-3">
                        <span class="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">성공</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
          </div>
          
        </div>
        
        <script>{`
          // 보안: 개발자 도구 감지 및 차단
          (function() {
            // 우클릭 방지
            document.addEventListener('contextmenu', function(e) {
              if (document.getElementById('security-devtools')?.checked) {
                e.preventDefault();
                showToast('우클릭이 비활성화되어 있습니다.', 'warning');
              }
            });
            
            // 단축키 차단 (F12, Ctrl+Shift+I, Ctrl+U)
            document.addEventListener('keydown', function(e) {
              if (document.getElementById('security-devtools')?.checked) {
                if (e.key === 'F12' || 
                    (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                    (e.ctrlKey && e.key === 'u')) {
                  e.preventDefault();
                  showToast('개발자 도구가 비활성화되어 있습니다.', 'warning');
                }
              }
            });
            
            // 개발자 도구 열림 감지
            let devtools = { open: false };
            const threshold = 160;
            
            setInterval(function() {
              if (document.getElementById('security-devtools')?.checked) {
                if (window.outerWidth - window.innerWidth > threshold ||
                    window.outerHeight - window.innerHeight > threshold) {
                  if (!devtools.open) {
                    devtools.open = true;
                    console.clear();
                    console.log('%c⚠️ 보안 경고', 'font-size: 24px; color: red; font-weight: bold;');
                    console.log('%c개발자 도구 사용이 감지되었습니다. 모든 접근이 기록됩니다.', 'font-size: 14px; color: orange;');
                  }
                } else {
                  devtools.open = false;
                }
              }
            }, 500);
          })();
          
          // 관리자 로그인 처리
          const ADMIN_CREDENTIALS = {
            id: 'studiojuai',
            password: 'admin2024!'
          };
          
          function handleLogin(event) {
            event.preventDefault();
            
            const adminId = document.getElementById('admin-id').value;
            const adminPassword = document.getElementById('admin-password').value;
            
            // 실제 환경에서는 서버 측 인증 필요
            if (adminId === ADMIN_CREDENTIALS.id && adminPassword === ADMIN_CREDENTIALS.password) {
              sessionStorage.setItem('admin_auth', 'true');
              sessionStorage.setItem('admin_login_time', new Date().toISOString());
              
              document.getElementById('login-modal').classList.add('hidden');
              document.getElementById('admin-content').classList.remove('hidden');
              
              loadStats();
              showToast('관리자 로그인 성공', 'success');
            } else {
              document.getElementById('login-error').textContent = '아이디 또는 비밀번호가 올바르지 않습니다.';
              document.getElementById('login-error').classList.remove('hidden');
            }
          }
          
          // 로그아웃
          function logout() {
            sessionStorage.removeItem('admin_auth');
            sessionStorage.removeItem('admin_login_time');
            window.location.href = '/';
          }
          
          // 통계 로드 (시뮬레이션)
          function loadStats() {
            // 실제 환경에서는 API에서 가져옴
            const stats = JSON.parse(localStorage.getItem('admin_stats') || '{}');
            
            document.getElementById('stat-users').textContent = stats.users || Math.floor(Math.random() * 100) + 50;
            document.getElementById('stat-analysis').textContent = stats.analysis || Math.floor(Math.random() * 500) + 200;
            document.getElementById('stat-bots').textContent = stats.bots || Math.floor(Math.random() * 2000) + 1000;
            document.getElementById('stat-premium').textContent = stats.premium || Math.floor(Math.random() * 20) + 5;
          }
          
          // 서버 키 저장 (시뮬레이션)
          function saveServerKey(type) {
            showToast(type + ' 키가 저장되었습니다.', 'success');
          }
          
          // 토스트 메시지
          function showToast(message, type = 'info') {
            const colors = {
              success: 'bg-green-500',
              error: 'bg-red-500',
              warning: 'bg-yellow-500',
              info: 'bg-blue-500'
            };
            
            const toast = document.createElement('div');
            toast.className = 'fixed bottom-4 right-4 px-6 py-3 rounded-lg text-white font-medium shadow-lg transform transition-all duration-300 ' + (colors[type] || colors.info);
            toast.textContent = message;
            document.body.appendChild(toast);
            
            setTimeout(() => {
              toast.style.opacity = '0';
              setTimeout(() => toast.remove(), 300);
            }, 3000);
          }
          
          // 페이지 로드 시 세션 체크
          document.addEventListener('DOMContentLoaded', function() {
            if (sessionStorage.getItem('admin_auth') === 'true') {
              document.getElementById('login-modal').classList.add('hidden');
              document.getElementById('admin-content').classList.remove('hidden');
              loadStats();
            }
          });
        `}</script>
        
      </body>
    </html>
  )
}
