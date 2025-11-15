// ========================================
// AI 마케팅 자동화 플랫폼 - 메인 JavaScript
// ========================================

// 전역 변수
let currentIndustry = 'cafe';
let currentStore = null;
let performanceChart = null;

// ========================================
// 초기화
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 AI 마케팅 자동화 플랫폼 시작!');
    
    // URL 파라미터 확인
    const urlParams = new URLSearchParams(window.location.search);
    const industry = urlParams.get('industry');
    if (industry) {
        currentIndustry = industry;
        selectIndustry(industry);
    } else {
        // 기본값: 카페 선택
        selectIndustry('cafe');
    }
    
    // 이벤트 리스너 등록
    setupEventListeners();
    
    // 봇 카드 생성
    generateBotCards();
    
    // 차트 초기화
    initPerformanceChart();
    
    // 로컬스토리지에서 데이터 로드
    loadStoredData();
});

// ========================================
// 이벤트 리스너 설정
// ========================================
function setupEventListeners() {
    // 업종 선택 버튼
    const industryBtns = document.querySelectorAll('.industry-btn');
    industryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const industry = this.getAttribute('data-industry');
            selectIndustry(industry);
        });
    });
}

// ========================================
// 업종 선택
// ========================================
function selectIndustry(industry) {
    currentIndustry = industry;
    
    // 버튼 활성화 상태 업데이트
    const industryBtns = document.querySelectorAll('.industry-btn');
    industryBtns.forEach(btn => {
        if (btn.getAttribute('data-industry') === industry) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // 업종에 따라 봇 재설정
    updateBotsForIndustry(industry);
    
    // 알림
    showNotification(`${getIndustryName(industry)} 업종이 선택되었습니다!`, 'success');
    
    console.log(`✅ 업종 선택: ${industry}`);
}

// ========================================
// 업종명 가져오기
// ========================================
function getIndustryName(industry) {
    const names = {
        'cafe': '카페',
        'chicken': '치킨',
        'korean': '한식',
        'beauty': '미용실',
        'pizza': '피자',
        'dessert': '디저트',
        'other': '기타'
    };
    return names[industry] || '기타';
}

// ========================================
// 매장 정보 저장
// ========================================
async function saveStoreInfo() {
    console.log('🔵 saveStoreInfo 함수 호출됨!');
    alert('✅ 매장 정보 저장 시작!');
    
    const storeName = document.getElementById('storeName').value;
    const location = document.getElementById('location').value;
    const targetAge = document.getElementById('targetAge').value;
    const avgPrice = document.getElementById('avgPrice').value;
    const competitors = document.getElementById('competitors').value;
    const naverUrl = document.getElementById('naverUrl').value;
    
    console.log('📝 입력값:', { storeName, location, targetAge, avgPrice, competitors, naverUrl });
    
    // 유효성 검사
    if (!storeName || !location) {
        alert('❌ 매장명과 지역을 입력해주세요!');
        showNotification('매장명과 지역은 필수 입력 항목입니다!', 'error');
        return;
    }
    
    alert(`✅ 유효성 검사 통과!\n매장명: ${storeName}\n지역: ${location}`);
    
    try {
        showNotification('매장 정보를 저장하는 중...', 'info');
        
        // ✅ 백엔드 API로 매장 생성
        const result = await apiClient.createStore({
            name: storeName,
            industry: currentIndustry,
            location: location,
            targetAge: targetAge,
            avgPrice: avgPrice,
            competitors: parseInt(competitors) || 0,
            naverUrl: naverUrl
        });
        
        if (result.success) {
            // 매장 정보 저장
            currentStore = {
                id: result.storeId,
                name: storeName,
                industry: currentIndustry,
                location: location,
                targetAge: targetAge,
                avgPrice: avgPrice,
                competitors: parseInt(competitors) || 0,
                naverUrl: naverUrl,
                createdAt: new Date().toISOString()
            };
            
            // LocalStorage 백업
            localStorage.setItem('currentStore', JSON.stringify(currentStore));
            
            // 매장 목록에 추가
            let stores = JSON.parse(localStorage.getItem('stores') || '[]');
            stores.push(currentStore);
            localStorage.setItem('stores', JSON.stringify(stores));
            
            showNotification('✅ 매장 정보가 저장되었습니다! 이제 봇을 실행할 수 있습니다.', 'success');
            console.log('✅ 매장 정보 저장 완료:', currentStore);
            
            // 봇 대시보드 섹션으로 스크롤
            setTimeout(() => {
                document.getElementById('botDashboard')?.scrollIntoView({ behavior: 'smooth' });
            }, 1000);
        } else {
            throw new Error(result.message || '저장 실패');
        }
        
    } catch (error) {
        console.error('❌ 매장 정보 저장 실패:', error);
        const errorDetail = `
에러 상세:
- 메시지: ${error.message}
- Stack: ${error.stack?.substring(0, 200)}
- API 엔드포인트: /api/stores
        `;
        alert(errorDetail);
        showNotification('❌ 매장 정보 저장에 실패했습니다: ' + error.message, 'error');
    }
}

// ========================================
// 전체 봇 실행
// ========================================
async function runAllBots() {
    // localStorage에서 매장 정보 확인
    if (!currentStore || !currentStore.id) {
        const storedStore = localStorage.getItem('currentStore');
        if (storedStore) {
            currentStore = JSON.parse(storedStore);
            console.log('📦 localStorage에서 매장 정보 복구:', currentStore);
        }
    }
    
    if (!currentStore || !currentStore.id) {
        alert('❌ 매장 정보가 없습니다!\n\n메인 페이지에서 매장 정보를 입력하고 저장해주세요.');
        showNotification('먼저 매장 정보를 저장해주세요!', 'error');
        return;
    }
    
    // 백엔드에 매장이 없으면 자동 생성
    try {
        const checkStore = await apiClient.getStore(currentStore.id);
        console.log('✅ 백엔드에 매장 존재:', checkStore);
    } catch (error) {
        console.log('⚠️ 백엔드에 매장 없음. 자동 생성 시도...');
        try {
            const result = await apiClient.createStore({
                name: currentStore.name,
                industry: currentStore.industry || 'other',
                location: currentStore.location,
                targetAge: currentStore.targetAge || '',
                avgPrice: currentStore.avgPrice || '',
                competitors: currentStore.competitors || 0,
                naverUrl: currentStore.naverUrl || ''
            });
            console.log('✅ 매장 자동 생성 완료:', result);
            currentStore.id = result.storeId;
            localStorage.setItem('currentStore', JSON.stringify(currentStore));
        } catch (createError) {
            alert('❌ 매장 생성 실패!\n\n' + createError.message);
            showNotification('매장 생성에 실패했습니다', 'error');
            return;
        }
    }
    
    showNotification('30개 AI 봇을 실행합니다... 예상 소요 시간: 5-10분', 'info');
    
    try {
        // ✅ 백엔드 API로 전체 봇 실행
        const result = await apiClient.executeAllBots(
            currentStore.id,
            // 진행 상황 콜백
            (botId, total, botResult) => {
                console.log(`🤖 봇 ${botId}/${total} 완료: ${botResult.botName}`);
                updateDashboard(botId, total);
                updateBotCard(botId, 'completed');
            }
        );
        
        const { successCount, failedCount, totalBots } = result;
        
        if (successCount > 0) {
            showNotification(`🎉 ${successCount}/${totalBots}개 봇 실행 완료! ${failedCount > 0 ? `(${failedCount}개 실패)` : ''}`, 'success');
            
            // PPT 다운로드 버튼 표시
            showPPTDownloadButton();
        } else {
            showNotification('❌ 모든 봇 실행에 실패했습니다. 콘솔을 확인해주세요.', 'error');
        }
        
    } catch (error) {
        const errorDetail = `
🐛 디버그 정보:
- 봇 실행 실패
- 에러: ${error.message}
- 현재 매장 ID: ${currentStore?.id}
- API 엔드포인트: /api/bots/execute-all
        `;
        alert(errorDetail);
        console.error('❌ 전체 봇 실행 실패:', error);
        console.error('❌ 전체 봇 실행 실패:', error);
        showNotification('❌ 봇 실행 중 오류가 발생했습니다: ' + error.message, 'error');
    }
}

// ========================================
// PPT 다운로드 버튼 표시
// ========================================
function showPPTDownloadButton() {
    // 기존 버튼이 있으면 제거
    const existingBtn = document.getElementById('ppt-download-btn');
    if (existingBtn) existingBtn.remove();
    
    // PPT 다운로드 버튼 생성
    const pptButton = document.createElement('div');
    pptButton.id = 'ppt-download-btn';
    pptButton.className = 'fixed bottom-8 right-8 z-50 animate-bounce';
    pptButton.innerHTML = `
        <button onclick="downloadPPTReport()" class="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 flex items-center gap-3">
            <i class="fas fa-file-powerpoint text-2xl"></i>
            <div class="text-left">
                <div class="text-lg">📊 PPT 다운로드</div>
                <div class="text-xs opacity-80">분석 보고서 (37페이지)</div>
            </div>
        </button>
    `;
    
    document.body.appendChild(pptButton);
    
    // 5초 후 bounce 애니메이션 제거
    setTimeout(() => {
        pptButton.classList.remove('animate-bounce');
    }, 5000);
}

// ========================================
// PPT 보고서 다운로드
// ========================================
async function downloadPPTReport() {
    console.log('🔵 downloadPPTReport 호출됨!');
    alert('✅ PPT 다운로드 함수 호출됨!');
    
    if (!currentStore) {
        alert('❌ 매장 정보 없음!');
        showNotification('매장 정보가 없습니다!', 'error');
        return;
    }
    
    // PptxGenJS 로드 확인
    if (typeof PptxGenJS === 'undefined') {
        alert('❌ PptxGenJS 라이브러리가 로드되지 않았습니다!');
        showNotification('❌ PPT 라이브러리 로딩 실패', 'error');
        return;
    }
    
    try {
        alert('📊 PPT 생성 시작!');
        showNotification('📊 PPT 생성 중... 잠시만 기다려주세요', 'info');
        
        // 간단한 PPT 생성
        const pptx = new PptxGenJS();
        
        // 표지 슬라이드
        let slide = pptx.addSlide();
        slide.background = { color: '000000' };
        slide.addText('Studiojuai 마케팅 분석 보고서', {
            x: 1, y: 2, w: 8, h: 1,
            fontSize: 44,
            bold: true,
            color: 'FF6B35',
            align: 'center'
        });
        slide.addText(`${currentStore.name} - ${currentStore.location}`, {
            x: 1, y: 3.5, w: 8, h: 0.5,
            fontSize: 24,
            color: 'FFFFFF',
            align: 'center'
        });
        slide.addText(new Date().toLocaleDateString('ko-KR'), {
            x: 1, y: 5, w: 8, h: 0.3,
            fontSize: 16,
            color: 'CCCCCC',
            align: 'center'
        });
        
        // 매장 정보 슬라이드
        slide = pptx.addSlide();
        slide.background = { color: '1a1a1a' };
        slide.addText('매장 기본 정보', {
            x: 0.5, y: 0.5, w: 9, h: 0.6,
            fontSize: 32,
            bold: true,
            color: 'FF6B35'
        });
        
        const storeInfo = [
            ['항목', '내용'],
            ['매장명', currentStore.name || 'N/A'],
            ['업종', currentStore.industry || 'N/A'],
            ['위치', currentStore.location || 'N/A'],
            ['타겟층', currentStore.targetAge || 'N/A'],
            ['객단가', currentStore.avgPrice || 'N/A'],
            ['경쟁사 수', (currentStore.competitors || 0) + '개']
        ];
        
        slide.addTable(storeInfo, {
            x: 1, y: 1.5, w: 8, h: 3,
            fontSize: 16,
            color: 'FFFFFF',
            fill: { color: '2a2a2a' },
            border: { pt: 1, color: '444444' }
        });
        
        // PPT 파일명
        const fileName = `Studiojuai_${currentStore.name}_${new Date().toISOString().split('T')[0]}.pptx`;
        
        // 다운로드
        await pptx.writeFile({ fileName });
        
        showNotification('✅ PPT 다운로드가 완료되었습니다!', 'success');
        
    } catch (error) {
        console.error('PPT 생성 오류:', error);
        alert(`❌ PPT 생성 실패\n\n에러: ${error.message}\n\nPptxGenJS 라이브러리가 로드되었는지 확인해주세요.`);
        showNotification('❌ PPT 생성에 실패했습니다: ' + error.message, 'error');
    }
}

// ========================================
// 개별 봇 실행
// ========================================
async function executeBot(botId, store) {
    const bot = findBotById(botId);
    if (!bot) {
        throw new Error('봇을 찾을 수 없습니다.');
    }
    
    try {
        // ✅ 백엔드 API로 봇 실행
        const result = await apiClient.executeBot(botId, store.id);
        
        if (result.success) {
            console.log(`✅ ${bot.name} 실행 완료`);
            
            // 봇 카드 업데이트
            updateBotCard(botId, 'completed');
            
            // LocalStorage에 결과 백업
            saveBotExecution({
                id: Date.now().toString(),
                botId: bot.id,
                botName: bot.name,
                storeId: store.id,
                storeName: store.name,
                industry: store.industry,
                status: 'completed',
                result: result.result,
                createdAt: new Date().toISOString()
            });
            
            return result;
        } else {
            throw new Error(result.error || '봇 실행 실패');
        }
        
    } catch (error) {
        console.error(`❌ ${bot.name} 실행 실패:`, error);
        updateBotCard(botId, 'error');
        throw error;
    }
}

// ========================================
// 봇 로직 실행 (업종별 맞춤)
// ========================================
async function runBotLogic(bot, store) {
    // 업종별 프롬프트 생성 (네이버 플레이스 데이터 포함)
    const prompt = await generateIndustrySpecificPrompt(bot, store);
    
    console.log(`📝 프롬프트 생성: ${bot.name}`);
    console.log(`업종: ${store.industry}, 매장: ${store.name}`);
    
    // 실제 GPT API 호출
    try {
        const gptResult = await dataManager.callGPT(prompt, {
            model: 'gpt-4',
            systemPrompt: `당신은 ${store.industry} 업종 전문 마케팅 AI입니다. 구체적이고 실용적인 조언을 제공하세요.`,
            temperature: 0.7,
            maxTokens: 2000
        });
        
        console.log(`✅ GPT 응답 완료: ${bot.name}`);
        
        // 실제 GPT 결과 반환
        const result = {
            botId: bot.id,
            botName: bot.name,
            industry: store.industry,
            timestamp: new Date().toISOString(),
            data: {
                type: 'gpt_response',
                content: gptResult,
                prompt: prompt,
                model: 'gpt-4'
            }
        };
        
        return result;
        
    } catch (error) {
        console.error(`❌ GPT API 호출 실패: ${bot.name}`, error);
        
        // GPT 실패 시 모의 데이터 반환
        console.log(`⚠️ 모의 데이터로 대체: ${bot.name}`);
        
        const result = {
            botId: bot.id,
            botName: bot.name,
            industry: store.industry,
            timestamp: new Date().toISOString(),
            data: {
                type: 'mock_data',
                error: error.message,
                fallback: generateMockResult(bot, store)
            }
        };
        
        return result;
    }
}

// ========================================
// 업종별 프롬프트 생성 (네이버 플레이스 데이터 통합)
// ========================================
async function generateIndustrySpecificPrompt(bot, store) {
    const industryContext = {
        'cafe': '카페 및 디저트 전문점',
        'chicken': '치킨 및 배달 음식점',
        'korean': '한식당 및 전통 음식점',
        'beauty': '미용실 및 헤어살롱',
        'pizza': '피자 및 패스트푸드',
        'dessert': '디저트 및 베이커리',
        'other': '일반 소상공인'
    };
    
    const context = industryContext[store.industry] || '일반 매장';
    
    let prompt = `당신은 ${context} 전문 마케팅 AI 봇입니다.\n\n`;
    prompt += `[기본 매장 정보]\n`;
    prompt += `매장명: ${store.name}\n`;
    prompt += `업종: ${getIndustryName(store.industry)}\n`;
    prompt += `위치: ${store.location}\n`;
    prompt += `타겟층: ${store.targetAge}\n`;
    prompt += `객단가: ${store.avgPrice}\n`;
    prompt += `경쟁사 수: ${store.competitors}개\n\n`;
    
    // ✅ 네이버 플레이스 URL이 있으면 실제 데이터 가져오기
    if (store.naverUrl && store.naverUrl.trim() !== '') {
        try {
            console.log(`🔍 네이버 플레이스 데이터 조회 중: ${store.name}`);
            const placeData = await fetchNaverPlaceData(store);
            
            if (placeData && placeData.success) {
                prompt += `[네이버 플레이스 실제 데이터]\n`;
                prompt += `평점: ${placeData.rating || 'N/A'} / 5.0\n`;
                prompt += `리뷰 수: ${placeData.reviewCount || 'N/A'}개\n`;
                prompt += `카테고리: ${placeData.category || 'N/A'}\n`;
                prompt += `주소: ${placeData.address || 'N/A'}\n`;
                
                if (placeData.description) {
                    prompt += `소개: ${placeData.description}\n`;
                }
                
                if (placeData.keywords && placeData.keywords.length > 0) {
                    prompt += `주요 키워드: ${placeData.keywords.join(', ')}\n`;
                }
                
                prompt += `\n✅ 위 네이버 플레이스 실제 데이터를 참고하여 분석해주세요.\n\n`;
                console.log(`✅ 네이버 플레이스 데이터 조회 성공`);
            } else {
                prompt += `\n⚠️ 네이버 플레이스 데이터 조회 실패 (기본 정보로 분석)\n\n`;
                console.warn(`⚠️ 네이버 플레이스 데이터 조회 실패`);
            }
        } catch (error) {
            console.error(`❌ 네이버 플레이스 데이터 조회 오류:`, error);
            prompt += `\n⚠️ 네이버 플레이스 데이터 조회 중 오류 발생 (기본 정보로 분석)\n\n`;
        }
    }
    
    // 봇별 특화 프롬프트
    prompt += bot.prompt + '\n\n';
    
    prompt += `위 정보를 바탕으로 ${store.industry} 업종에 특화된 구체적이고 실용적인 분석/제안을 제공해주세요.`;
    
    return prompt;
}

// ========================================
// 네이버 플레이스 데이터 가져오기
// ========================================
async function fetchNaverPlaceData(store) {
    try {
        // 네이버 로컬 검색 API 호출 (매장명 + 위치로 검색)
        const searchQuery = `${store.name} ${store.location}`;
        console.log(`🔍 네이버 검색 쿼리: "${searchQuery}"`);
        
        const searchResults = await dataManager.searchNaver(searchQuery, {
            type: 'local',
            display: 5  // 상위 5개 결과 조회
        });
        
        if (!searchResults || !searchResults.items || searchResults.items.length === 0) {
            console.warn('⚠️ 네이버 검색 결과 없음');
            return { success: false, reason: 'no_results' };
        }
        
        // 첫 번째 결과 사용 (가장 관련성 높은 결과)
        const firstResult = searchResults.items[0];
        console.log(`✅ 네이버 검색 결과 발견: ${firstResult.title}`);
        
        // HTML 태그 제거 함수
        const stripHtml = (html) => {
            if (!html) return '';
            return html.replace(/<[^>]*>/g, '').trim();
        };
        
        // 네이버 플레이스 데이터 구조화
        const placeData = {
            success: true,
            title: stripHtml(firstResult.title),
            category: stripHtml(firstResult.category),
            address: stripHtml(firstResult.address) || stripHtml(firstResult.roadAddress),
            rating: null,  // 네이버 로컬 검색 API에는 평점 없음
            reviewCount: null,  // 리뷰 수도 없음
            description: stripHtml(firstResult.description),
            telephone: firstResult.telephone,
            mapx: firstResult.mapx,
            mapy: firstResult.mapy,
            link: firstResult.link,
            keywords: []
        };
        
        // 카테고리에서 키워드 추출 (예: "음식점>한식>한정식" -> ["음식점", "한식", "한정식"])
        if (placeData.category) {
            placeData.keywords = placeData.category.split('>').map(k => k.trim());
        }
        
        console.log(`📊 네이버 플레이스 데이터 구조화 완료:`, placeData);
        
        return placeData;
        
    } catch (error) {
        console.error('❌ 네이버 플레이스 데이터 조회 실패:', error);
        return { 
            success: false, 
            reason: 'api_error',
            error: error.message 
        };
    }
}

// ========================================
// 모의 결과 생성
// ========================================
function generateMockResult(bot, store) {
    // 봇 카테고리별로 다른 결과 생성
    const results = {
        'market': {
            summary: `${store.name}의 ${store.location} 상권 분석 완료`,
            score: Math.floor(Math.random() * 30) + 70,
            insights: [
                `경쟁사 ${store.competitors}개 대비 차별화 포인트 3가지 발굴`,
                `타겟층(${store.targetAge}) 유입 증대 방안 5가지 제시`,
                `${store.location} 지역 트렌드 분석 완료`
            ]
        },
        'content': {
            summary: `${store.industry} 맞춤 마케팅 콘텐츠 생성 완료`,
            itemsGenerated: Math.floor(Math.random() * 5) + 3,
            samples: [
                '네이버 플레이스 소개글 (최적화)',
                'SNS 홍보 문구 3종',
                '시즌 이벤트 기획안'
            ]
        },
        'creative': {
            summary: `${store.industry} 브랜드 크리에이티브 제작 완료`,
            assetsCreated: Math.floor(Math.random() * 4) + 2,
            types: [
                '마케팅 이미지 디자인',
                '프로모션 포스터',
                '메뉴판 레이아웃'
            ]
        },
        'operations': {
            summary: `${store.name} 운영 최적화 완료`,
            improvements: Math.floor(Math.random() * 10) + 5,
            actions: [
                '리뷰 응답 템플릿 생성',
                '예약 시스템 최적화',
                '고객 상담 FAQ 작성'
            ]
        }
    };
    
    return results[bot.category] || results['market'];
}

// ========================================
// 대시보드 업데이트 (실제 통계만)
// ========================================
function updateDashboard(executed, total) {
    document.getElementById('executedBots').textContent = `${executed} / ${total}`;
    
    // 실제 완료된 봇 수
    const executions = dataManager.getBotExecutions();
    const completed = executions.filter(e => e.status === 'completed').length;
    document.getElementById('completedBots').textContent = completed;
    
    // 실제 평균 실행 시간
    const avgTime = executed > 0 
        ? dataManager.calculateAverageExecutionTime(executions.slice(-executed))
        : 0;
    document.getElementById('avgExecutionTime').textContent = (avgTime / 1000).toFixed(1) + 's';
    
    // 실제 성공률
    const successRate = executed > 0 ? Math.round((executed / total) * 100) : 0;
    document.getElementById('successRate').textContent = successRate + '%';
    
    // 차트 업데이트
    updatePerformanceChart(executed, total);
}

// ========================================
// 성과 차트 초기화
// ========================================
function initPerformanceChart() {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    
    performanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['시작', '25%', '50%', '75%', '완료'],
            datasets: [{
                label: '봇 실행 진행률',
                data: [0, 0, 0, 0, 0],
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: 'white'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white',
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: 'white'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
}

// ========================================
// 성과 차트 업데이트 (실제 진행률만 표시)
// ========================================
function updatePerformanceChart(executed, total) {
    if (!performanceChart) return;
    
    const progress = executed / total;
    
    // 실제 진행률 기반 데이터 포인트
    const dataPoints = [
        0,
        progress >= 0.25 ? 25 : 0,
        progress >= 0.50 ? 50 : 0,
        progress >= 0.75 ? 75 : 0,
        progress >= 1.0 ? 100 : 0
    ];
    
    performanceChart.data.datasets[0].data = dataPoints;
    
    // Y축 레이블 업데이트
    performanceChart.options.scales.y.ticks.callback = function(value) {
        return value + '%';
    };
    
    performanceChart.update();
}

// ========================================
// 알림 표시
// ========================================
function showNotification(message, type = 'info') {
    // 기존 알림 제거
    const existing = document.getElementById('notification');
    if (existing) existing.remove();
    
    // 알림 생성
    const notification = document.createElement('div');
    notification.id = 'notification';
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-md ${getNotificationColor(type)}`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${getNotificationIcon(type)} mr-3 text-xl"></i>
            <p class="text-white font-bold">${message}</p>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // 3초 후 자동 제거
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function getNotificationColor(type) {
    const colors = {
        'success': 'bg-green-500',
        'error': 'bg-red-500',
        'info': 'bg-blue-500',
        'warning': 'bg-yellow-500'
    };
    return colors[type] || colors['info'];
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'fa-check-circle',
        'error': 'fa-exclamation-circle',
        'info': 'fa-info-circle',
        'warning': 'fa-exclamation-triangle'
    };
    return icons[type] || icons['info'];
}

// ========================================
// 설정 모달 표시
// ========================================
function showSettings() {
    console.log('⚙️ showSettings() 함수 호출됨');
    
    const modal = document.getElementById('settingsModal');
    if (!modal) {
        console.error('❌ settingsModal 요소를 찾을 수 없습니다!');
        alert('설정 모달을 찾을 수 없습니다. 페이지를 새로고침해주세요.');
        return;
    }
    
    console.log('✅ settingsModal 요소 발견, 모달 표시 중...');
    modal.style.display = 'flex';
    
    // 저장된 API 키 로드 (암호화되어 있어서 복호화 필요)
    const savedKey = localStorage.getItem('api_key_gpt');
    if (savedKey) {
        console.log('✅ 저장된 API 키 발견 (마지막 4자리: ' + savedKey.slice(-4) + ')');
        document.getElementById('gptApiKeyInput').placeholder = '••••••••••••••••' + savedKey.slice(-4);
    } else {
        console.log('ℹ️ 저장된 API 키 없음');
    }
}

function closeSettings() {
    console.log('❌ closeSettings() 호출됨');
    const modal = document.getElementById('settingsModal');
    if (modal) {
        modal.style.display = 'none';
        console.log('✅ 설정 모달 닫힘');
    }
}

function saveApiKey() {
    const apiKey = document.getElementById('gptApiKeyInput').value.trim();
    
    if (!apiKey) {
        showNotification('⚠️ API 키를 입력해주세요!', 'warning');
        return;
    }
    
    if (!apiKey.startsWith('sk-')) {
        showNotification('⚠️ 올바른 OpenAI API 키 형식이 아닙니다 (sk-로 시작)', 'error');
        return;
    }
    
    try {
        // 보안 시스템을 통해 암호화하여 저장
        securityManager.saveApiKey('gpt', apiKey);
        
        showNotification('✅ GPT API 키가 저장되었습니다!', 'success');
        
        // 입력 필드 초기화
        document.getElementById('gptApiKeyInput').value = '';
        document.getElementById('gptApiKeyInput').placeholder = '••••••••••••••••' + apiKey.slice(-4);
        
        // 모달 닫기
        setTimeout(() => {
            closeSettings();
        }, 1500);
        
    } catch (error) {
        console.error('❌ API 키 저장 실패:', error);
        showNotification('❌ API 키 저장에 실패했습니다: ' + error.message, 'error');
    }
}

async function testApiKey() {
    const apiKey = localStorage.getItem('api_key_gpt');
    
    if (!apiKey) {
        showNotification('⚠️ 먼저 API 키를 저장해주세요!', 'warning');
        return;
    }
    
    showNotification('🧪 API 키 테스트 중...', 'info');
    
    try {
        // 간단한 GPT API 호출 테스트
        const testResult = await dataManager.callGPT('안녕하세요. 간단히 "테스트 성공"이라고만 답변해주세요.', {
            model: 'gpt-4',
            temperature: 0.3,
            maxTokens: 50
        });
        
        console.log('✅ API 테스트 성공:', testResult);
        showNotification('✅ GPT API 키가 정상적으로 작동합니다!\n응답: ' + testResult, 'success');
        
    } catch (error) {
        console.error('❌ API 테스트 실패:', error);
        showNotification('❌ API 키 테스트 실패: ' + error.message, 'error');
    }
}

// ========================================
// 저장된 데이터 로드
// ========================================
function loadStoredData() {
    const stored = localStorage.getItem('currentStore');
    if (stored) {
        currentStore = JSON.parse(stored);
        
        // 폼에 데이터 채우기
        document.getElementById('storeName').value = currentStore.name || '';
        document.getElementById('location').value = currentStore.location || '';
        document.getElementById('targetAge').value = currentStore.targetAge || '';
        document.getElementById('avgPrice').value = currentStore.avgPrice || '';
        document.getElementById('competitors').value = currentStore.competitors || '';
        document.getElementById('naverUrl').value = currentStore.naverUrl || '';
        
        console.log('✅ 저장된 매장 정보 로드:', currentStore.name);
    }
}

// ========================================
// 유틸리티 함수
// ========================================
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function saveBotExecution(execution) {
    // 데이터베이스에 저장
    try {
        await databaseManager.saveBotExecution(execution);
        console.log('✅ 봇 실행 기록 데이터베이스 저장 완료');
    } catch (error) {
        console.warn('⚠️ 데이터베이스 저장 실패, LocalStorage만 사용:', error);
    }
    
    // LocalStorage 백업
    let executions = JSON.parse(localStorage.getItem('botExecutions') || '[]');
    executions.push(execution);
    localStorage.setItem('botExecutions', JSON.stringify(executions));
}

console.log('✅ main.js 로드 완료');

// ========================================
// TXT 다운로드 기능
// ========================================
function downloadAllResultsAsTXT() {
    if (!currentStore) {
        alert('먼저 매장을 생성해주세요.');
        return;
    }
    
    // D1에서 실행 결과 가져오기
    fetch(`/api/stores/${currentStore.id}/executions`)
        .then(res => res.json())
        .then(data => {
            if (!data.success || data.results.length === 0) {
                alert('아직 실행된 봇이 없습니다. 먼저 봇을 실행해주세요.');
                return;
            }
            
            // TXT 파일 내용 생성
            let txtContent = '';
            txtContent += '='.repeat(80) + '\n';
            txtContent += `Studiojuai_${currentStore.industry}_Analysis\n`;
            txtContent += '='.repeat(80) + '\n\n';
            
            txtContent += `❶ 매장 정보\n`;
            txtContent += `■ 매장명: ${currentStore.name}\n`;
            txtContent += `■ 업종: ${currentStore.industry}\n`;
            txtContent += `■ 위치: ${currentStore.location}\n`;
            txtContent += `■ 타겟 연령대: ${currentStore.targetAge}\n`;
            txtContent += `■ 평균 객단가: ${currentStore.avgPrice}\n`;
            txtContent += `■ 생성일: ${new Date().toLocaleDateString('ko-KR')}\n\n`;
            txtContent += '='.repeat(80) + '\n\n';
            
            // 각 봇 결과 추가
            data.results.forEach((execution, index) => {
                txtContent += `\n\n❷ ${execution.botName}\n`;
                txtContent += '-'.repeat(80) + '\n';
                txtContent += execution.result + '\n';
                txtContent += '-'.repeat(80) + '\n';
            });
            
            // 푸터
            txtContent += '\n\n' + '='.repeat(80) + '\n';
            txtContent += `✔️ 보고서 생성일: ${new Date().toLocaleString('ko-KR')}\n`;
            txtContent += `✔️ 생성 플랫폼: Studiojuai Marketing Platform\n`;
            txtContent += `✔️ 웹사이트: https://www.studiojuai.com\n`;
            txtContent += `✔️ 이메일: ikjoobang@gmail.com\n`;
            txtContent += '='.repeat(80) + '\n';
            
            // Blob 생성 및 다운로드
            const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Studiojuai_${currentStore.industry}_${currentStore.name}_${new Date().getTime()}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            console.log('✅ TXT 파일 다운로드 완료!');
        })
        .catch(error => {
            console.error('TXT 다운로드 오류:', error);
            alert('TXT 파일 생성 중 오류가 발생했습니다.');
        });
}
