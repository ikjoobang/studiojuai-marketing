# 🚀 빠른 시작 가이드

## 1️⃣ 백엔드 실행 (5분)

```bash
# 1. backend 디렉토리로 이동
cd ppt_designer_system/backend

# 2. 가상환경 생성 (선택사항)
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 3. 의존성 설치
pip install -r requirements.txt

# 4. 서버 실행
python api_endpoints.py

# ✅ http://localhost:5000 에서 실행 중
```

## 2️⃣ 프론트엔드 실행 (2가지 방법)

### 방법 A: 간단한 HTML 파일로 실행

```bash
# frontend 디렉토리로 이동
cd ppt_designer_system/frontend

# Python 간이 서버로 실행
python -m http.server 3000

# ✅ http://localhost:3000 에서 index.html 열기
```

### 방법 B: React 앱으로 실행

```bash
# 1. React 프로젝트 생성
npx create-react-app my-ppt-designer
cd my-ppt-designer

# 2. 파일 복사
cp ../frontend/ppt_designer_frontend.js src/
cp ../frontend/ppt_designer_styles.css src/
cp ../frontend/package.json .

# 3. 의존성 설치
npm install

# 4. src/index.js 수정
# import './ppt_designer_styles.css';
# import { PPTDesignerApp } from './ppt_designer_frontend';

# 5. 실행
npm start

# ✅ http://localhost:3000 에서 자동으로 열림
```

## 3️⃣ 첫 사용

1. 브라우저에서 프론트엔드 URL 열기
2. Phase 1부터 차례대로 질문에 답변
3. 진행률 100% 도달 시 맞춤 추천 확인
4. "프로필 내보내기" 버튼으로 결과 저장

## 🔧 문제 해결

### CORS 오류
```python
# api_endpoints.py의 CORS 설정 확인
CORS(app, origins=['http://localhost:3000'])
```

### 포트 충돌
```bash
# 백엔드 포트 변경
python api_endpoints.py --port 5001

# 프론트엔드에서 API URL 수정
const API_URL = 'http://localhost:5001/api';
```

## 📚 다음 단계

- 전체 문서: `README.md` 참조
- API 문서: `README.md`의 API 섹션
- 커스터마이징: `ppt_designer_styles.css` 수정

**즐거운 PPT 제작 되세요! 🎨**
