# PPT Professional Designer System

> AI 기반 맞춤형 PowerPoint 템플릿 추천 및 설계 시스템

전략적 질문을 통해 사용자의 요구사항을 분석하고, 최적의 PPT 템플릿과 구현 전략을 제공하는 웹/앱 서비스입니다.

## 📋 목차

- [주요 기능](#주요-기능)
- [시스템 아키텍처](#시스템-아키텍처)
- [설치 방법](#설치-방법)
- [사용 방법](#사용-방법)
- [API 문서](#api-문서)
- [프론트엔드 가이드](#프론트엔드-가이드)
- [배포 가이드](#배포-가이드)
- [라이선스](#라이선스)

---

## 🎯 주요 기능

### 1. **5단계 전략적 워크플로우**
- **Phase 1**: 콘텐츠 심층 분석
- **Phase 2**: 템플릿 선호도 발견
- **Phase 3**: 슬라이드 구조 설계
- **Phase 4**: 기술 최적화
- **Phase 5**: 실행 전략 수립

### 2. **AI 기반 맞춤 추천**
- 가중치 기반 스코어링 시스템
- 실시간 진행률 추적
- 맞춤형 개발 방향 제시

### 3. **템플릿 매칭 알고리즘**
- 스타일, 색상, 기능, 호환성 기반 매칭
- 100점 만점 매칭 점수 계산
- 장단점 분석 및 난이도 평가

### 4. **구현 계획 자동 생성**
- 타임라인별 맞춤 로드맵
- 경험 수준별 가이드
- 리소스 추천

---

## 🏗️ 시스템 아키텍처

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend Layer                       │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │   React    │  │JavaScript  │  │    CSS     │            │
│  │ Components │  │   Classes  │  │  Styling   │            │
│  └────────────┘  └────────────┘  └────────────┘            │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ REST API
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                        Backend Layer                         │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │   Flask    │  │   Python   │  │   JSON     │            │
│  │    API     │  │   System   │  │   Config   │            │
│  └────────────┘  └────────────┘  └────────────┘            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                         Data Layer                           │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │  Template  │  │    User    │  │  Session   │            │
│  │  Database  │  │  Profiles  │  │   Storage  │            │
│  └────────────┘  └────────────┘  └────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 설치 방법

### 필수 요구사항

- Python 3.8+
- Node.js 14+
- npm 또는 yarn

### 백엔드 설치

```bash
# 저장소 클론
git clone https://github.com/your-repo/ppt-designer-system.git
cd ppt-designer-system

# Python 가상환경 생성
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 의존성 설치
pip install flask flask-cors

# 설정 파일 확인
ls ppt_designer_system.json
```

### 프론트엔드 설치

```bash
# React 프로젝트 생성 (이미 있다면 스킵)
npx create-react-app ppt-designer-frontend
cd ppt-designer-frontend

# 프론트엔드 파일 복사
cp ../ppt_designer_frontend.js src/
cp ../ppt_designer_styles.css src/

# 의존성 설치
npm install axios
```

---

## 💻 사용 방법

### 백엔드 서버 실행

```bash
# Python 스크립트 실행
python api_endpoints.py

# 서버 주소: http://localhost:5000
```

### 프론트엔드 실행

```bash
# React 개발 서버 실행
cd ppt-designer-frontend
npm start

# 브라우저: http://localhost:3000
```

### 독립 실행 예제

```python
# Python에서 직접 사용
from ppt_designer_backend import PPTDesignerSystem

# 시스템 초기화
system = PPTDesignerSystem('ppt_designer_system.json')

# 질문 가져오기
questions = system.get_questions_by_phase(1)

# 응답 제출
system.submit_response('q1.1.1', '교육')
system.submit_response('q1.2.1', '학생')

# 점수 계산
scores = system.calculate_profile_score()
print(scores)

# 추천 생성
templates = [...]  # 템플릿 데이터베이스
recommendations = system.generate_recommendations(templates)

# 프로필 내보내기
profile = system.export_user_profile()
```

```javascript
// JavaScript에서 직접 사용
import { PPTDesignerSystem } from './ppt_designer_frontend';

// 설정 로드
fetch('/api/config')
  .then(res => res.json())
  .then(config => {
    const system = new PPTDesignerSystem(config);
    
    // 질문 가져오기
    const questions = system.getQuestionsByPhase(1);
    
    // 응답 제출
    system.submitResponse('q1.1.1', '교육');
    
    // 진행률 확인
    const progress = system.getProgressPercentage();
    console.log(`진행률: ${progress}%`);
  });
```

---

## 📡 API 문서

### 기본 URL
```
http://localhost:5000/api
```

### 엔드포인트 목록

#### 1. 설정 및 초기화

**GET** `/config`
- 시스템 설정 가져오기
- Response: JSON 설정 파일

**POST** `/system/initialize`
- 새 세션 초기화
- Body: `{ "session_id": "string" }`
- Response: `{ "success": true, "session_id": "..." }`

#### 2. 질문 관리

**GET** `/questions/all`
- 모든 질문 가져오기
- Response:
```json
{
  "success": true,
  "questions": [...],
  "total_count": 45
}
```

**GET** `/questions/phase/<phase_id>`
- 특정 단계의 질문 가져오기
- Parameters: `phase_id` (1-5)
- Response:
```json
{
  "success": true,
  "phase_id": 1,
  "questions": [...],
  "count": 12
}
```

#### 3. 응답 제출

**POST** `/response/submit`
- 단일 응답 제출
- Body:
```json
{
  "question_id": "q1.1.1",
  "response": "교육",
  "additional_details": "대학교 강의"
}
```
- Response:
```json
{
  "success": true,
  "progress": 15.5
}
```

**POST** `/response/batch`
- 여러 응답 일괄 제출
- Body:
```json
{
  "responses": [
    {
      "question_id": "q1.1.1",
      "response": "교육"
    },
    ...
  ]
}
```

#### 4. 템플릿 및 추천

**GET** `/templates`
- 모든 템플릿 가져오기
- Response:
```json
{
  "success": true,
  "templates": [...],
  "count": 5
}
```

**POST** `/templates/search`
- 템플릿 검색
- Body:
```json
{
  "style": ["minimal", "modern"],
  "color_schemes": ["beige_orange"],
  "slide_count": "20-30"
}
```

**POST** `/recommendations/generate`
- 맞춤 추천 생성
- Response:
```json
{
  "success": true,
  "recommendations": [
    {
      "template_name": "Minimal Beige Professional",
      "match_score": 95.0,
      "style_tags": ["minimal", "modern"],
      "pros": [...],
      "cons": [...]
    }
  ]
}
```

#### 5. 프로필 및 분석

**GET** `/profile/scores`
- 프로필 점수 계산
- Response:
```json
{
  "success": true,
  "scores": {
    "content_goals": 20,
    "audience_context": 18,
    "design_preferences": 19,
    ...
  },
  "total_score": 87
}
```

**GET** `/profile/export`
- 프로필 내보내기
- Response: 전체 프로필 JSON

**GET** `/profile/download`
- 프로필 JSON 파일 다운로드

#### 6. 구현 계획

**GET** `/plan/generate`
- 구현 계획 생성
- Response:
```json
{
  "success": true,
  "plan": {
    "timeline": "1주",
    "phases": [...],
    "resources_needed": [...],
    "customization_level": "moderate"
  }
}
```

#### 7. 유틸리티

**GET** `/health`
- 헬스 체크

**POST** `/session/clear`
- 세션 초기화

---

## 🎨 프론트엔드 가이드

### 컴포넌트 구조

```
PPTDesignerApp
├── Header
│   └── ProgressBar
├── PhaseNavigation
│   └── PhaseButton (x5)
├── QuestionnaireSection
│   ├── QuestionCard
│   │   ├── SingleChoiceInput
│   │   ├── MultipleChoiceInput
│   │   ├── TextInput
│   │   └── BooleanInput
│   └── NavigationButtons
└── RecommendationsPanel
    ├── TemplateCard (x10)
    ├── ImplementationPlanCard
    └── ExportButton
```

### 주요 클래스

#### PPTDesignerSystem
```javascript
const system = new PPTDesignerSystem(configData);

// 주요 메서드
system.getAllQuestions()              // 모든 질문
system.getQuestionsByPhase(phaseId)   // 단계별 질문
system.submitResponse(id, response)   // 응답 제출
system.calculateProfileScore()         // 점수 계산
system.generateRecommendations(templates) // 추천 생성
system.getProgressPercentage()        // 진행률
system.exportUserProfile()            // 프로필 내보내기
```

### 스타일링 커스터마이징

CSS 변수를 수정하여 쉽게 테마 변경:

```css
:root {
    /* 색상 변경 */
    --color-accent-primary: #E67E22;  /* 메인 강조색 */
    --color-bg-primary: #FAF7F0;      /* 배경색 */
    
    /* 간격 조정 */
    --spacing-lg: 24px;
    
    /* 폰트 크기 */
    --font-size-base: 16px;
}
```

---

## 🚢 배포 가이드

### Docker 배포

```dockerfile
# Dockerfile
FROM python:3.9-slim

WORKDIR /app

# Python 의존성 설치
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 애플리케이션 파일 복사
COPY . .

# 포트 노출
EXPOSE 5000

# 실행
CMD ["python", "api_endpoints.py"]
```

```bash
# Docker 이미지 빌드
docker build -t ppt-designer-backend .

# 컨테이너 실행
docker run -p 5000:5000 ppt-designer-backend
```

### 프로덕션 배포

#### 백엔드 (Gunicorn)

```bash
# Gunicorn 설치
pip install gunicorn

# 실행
gunicorn -w 4 -b 0.0.0.0:5000 api_endpoints:app
```

#### 프론트엔드 (Nginx)

```bash
# React 빌드
npm run build

# Nginx 설정
server {
    listen 80;
    server_name your-domain.com;
    
    root /var/www/ppt-designer/build;
    index index.html;
    
    location / {
        try_files $uri /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 환경 변수

```bash
# .env 파일
FLASK_ENV=production
FLASK_DEBUG=False
DATABASE_URL=postgresql://user:pass@localhost/pptdb
SECRET_KEY=your-secret-key-here
CORS_ORIGINS=https://your-domain.com
```

---

## 📊 데이터 구조

### 사용자 프로필 스키마

```json
{
  "profile_id": "profile_20251105_143052",
  "created_at": "2025-11-05T14:30:52Z",
  "responses": {
    "q1.1.1": {
      "response": "교육",
      "details": "대학교 강의",
      "timestamp": "2025-11-05T14:25:12Z"
    }
  },
  "profile_scores": {
    "content_goals": 20,
    "audience_context": 18,
    "design_preferences": 19,
    "technical_requirements": 14,
    "timeline_resources": 9,
    "scalability": 8
  },
  "recommendations": [
    {
      "name": "Minimal Beige Professional",
      "url": "https://example.com/template1",
      "score": 95.0
    }
  ]
}
```

### 템플릿 데이터 스키마

```json
{
  "id": 1,
  "name": "Template Name",
  "url": "https://...",
  "style_tags": ["minimal", "modern"],
  "color_schemes": ["beige_orange"],
  "suitable_for": ["교육", "정보 전달"],
  "compatible_versions": ["2019", "2021", "Microsoft 365"],
  "pros": ["장점1", "장점2"],
  "cons": ["단점1"],
  "difficulty": "easy",
  "preview_image": "https://...",
  "slide_count": "20-30",
  "features": ["charts", "icons"],
  "price": "free",
  "downloads": 12580
}
```

---

## 🧪 테스트

### 백엔드 테스트

```python
# test_backend.py
import unittest
from ppt_designer_backend import PPTDesignerSystem

class TestPPTDesignerSystem(unittest.TestCase):
    def setUp(self):
        self.system = PPTDesignerSystem()
    
    def test_question_loading(self):
        questions = self.system.get_all_questions()
        self.assertGreater(len(questions), 0)
    
    def test_response_submission(self):
        result = self.system.submit_response('q1.1.1', '교육')
        self.assertTrue(result)
    
    def test_score_calculation(self):
        self.system.submit_response('q1.1.1', '교육')
        scores = self.system.calculate_profile_score()
        self.assertIsInstance(scores, dict)

if __name__ == '__main__':
    unittest.main()
```

### 프론트엔드 테스트

```javascript
// PPTDesignerSystem.test.js
import { PPTDesignerSystem } from './ppt_designer_frontend';

describe('PPTDesignerSystem', () => {
  let system;
  
  beforeEach(() => {
    system = new PPTDesignerSystem(mockConfig);
  });
  
  test('should load questions', () => {
    const questions = system.getAllQuestions();
    expect(questions.length).toBeGreaterThan(0);
  });
  
  test('should submit response', () => {
    const result = system.submitResponse('q1.1.1', '교육');
    expect(result).toBe(true);
  });
});
```

---

## 🔧 문제 해결

### 일반적인 문제

**Q: CORS 오류가 발생합니다**
```python
# api_endpoints.py에서 CORS 설정 확인
from flask_cors import CORS
CORS(app, origins=['http://localhost:3000'])
```

**Q: 템플릿이 로드되지 않습니다**
```javascript
// 브라우저 콘솔에서 네트워크 요청 확인
fetch('/api/templates')
  .then(res => res.json())
  .then(data => console.log(data))
```

**Q: 세션이 유지되지 않습니다**
```javascript
// localStorage 사용 확인
system.saveToLocalStorage();
system.loadFromLocalStorage();
```

---

## 📚 추가 리소스

### 관련 문서
- [PowerPoint JavaScript API](https://docs.microsoft.com/en-us/office/dev/add-ins/reference/overview/powerpoint-add-ins-reference-overview)
- [Flask 공식 문서](https://flask.palletsprojects.com/)
- [React 공식 문서](https://react.dev/)

### 템플릿 소스
- [SlidesCarnival](https://www.slidescarnival.com/)
- [Microsoft Office Templates](https://templates.office.com/)
- [Canva](https://www.canva.com/templates/)

---

## 🤝 기여 가이드

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 라이선스

MIT License

Copyright (c) 2025 PPT Professional Designer

---

## 👥 문의

- 프로젝트 URL: [https://github.com/your-repo/ppt-designer-system](https://github.com/your-repo/ppt-designer-system)
- 이슈 리포트: [https://github.com/your-repo/ppt-designer-system/issues](https://github.com/your-repo/ppt-designer-system/issues)

---

## 🎉 감사의 말

이 프로젝트는 교육 현장에서 더 나은 프레젠테이션 자료를 만들고자 하는 모든 분들을 위해 개발되었습니다.

**Made with ❤️ for educators and presenters**
