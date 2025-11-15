"""
PPT Professional Designer - API Endpoints
Flask/FastAPI implementation for web service
"""

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from ppt_designer_backend import PPTDesignerSystem, TemplateSearchEngine
import json
import os
from datetime import datetime
from typing import Dict, List, Any

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend access

# Initialize system
system = None
search_engine = TemplateSearchEngine()

# ============================================================================
# CONFIGURATION ENDPOINTS
# ============================================================================

@app.route('/api/config', methods=['GET'])
def get_config():
    """Get system configuration"""
    try:
        with open('ppt_designer_system.json', 'r', encoding='utf-8') as f:
            config = json.load(f)
        return jsonify(config), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/system/initialize', methods=['POST'])
def initialize_system():
    """Initialize a new system instance for user session"""
    global system
    try:
        session_id = request.json.get('session_id')
        system = PPTDesignerSystem()
        
        return jsonify({
            'success': True,
            'session_id': session_id,
            'message': 'System initialized successfully'
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ============================================================================
# QUESTIONNAIRE ENDPOINTS
# ============================================================================

@app.route('/api/questions/all', methods=['GET'])
def get_all_questions():
    """Get all questions from all phases"""
    try:
        if not system:
            initialize_system()
        
        questions = system.get_all_questions()
        questions_data = [
            {
                'question_id': q.question_id,
                'question_text': q.question_text,
                'question_type': q.question_type.value,
                'required': q.required,
                'weight': q.weight,
                'options': q.options,
                'follow_up': q.follow_up,
                'placeholder': q.placeholder
            }
            for q in questions
        ]
        
        return jsonify({
            'success': True,
            'questions': questions_data,
            'total_count': len(questions_data)
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/questions/phase/<int:phase_id>', methods=['GET'])
def get_questions_by_phase(phase_id):
    """Get questions for a specific phase"""
    try:
        if not system:
            initialize_system()
        
        questions = system.get_questions_by_phase(phase_id)
        questions_data = [
            {
                'question_id': q.question_id,
                'question_text': q.question_text,
                'question_type': q.question_type.value,
                'required': q.required,
                'weight': q.weight,
                'options': q.options,
                'follow_up': q.follow_up,
                'placeholder': q.placeholder
            }
            for q in questions
        ]
        
        return jsonify({
            'success': True,
            'phase_id': phase_id,
            'questions': questions_data,
            'count': len(questions_data)
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/response/submit', methods=['POST'])
def submit_response():
    """Submit a user response"""
    try:
        if not system:
            initialize_system()
        
        data = request.json
        question_id = data.get('question_id')
        response = data.get('response')
        additional_details = data.get('additional_details')
        
        if not question_id or response is None:
            return jsonify({
                'success': False,
                'error': 'question_id and response are required'
            }), 400
        
        success = system.submit_response(question_id, response, additional_details)
        progress = system.get_progress_percentage()
        
        return jsonify({
            'success': success,
            'question_id': question_id,
            'progress': progress,
            'message': 'Response submitted successfully'
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/response/batch', methods=['POST'])
def submit_batch_responses():
    """Submit multiple responses at once"""
    try:
        if not system:
            initialize_system()
        
        data = request.json
        responses = data.get('responses', [])
        
        if not responses:
            return jsonify({
                'success': False,
                'error': 'responses array is required'
            }), 400
        
        submitted_count = 0
        for resp in responses:
            question_id = resp.get('question_id')
            response = resp.get('response')
            additional_details = resp.get('additional_details')
            
            if question_id and response is not None:
                system.submit_response(question_id, response, additional_details)
                submitted_count += 1
        
        progress = system.get_progress_percentage()
        
        return jsonify({
            'success': True,
            'submitted_count': submitted_count,
            'total_count': len(responses),
            'progress': progress
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/progress', methods=['GET'])
def get_progress():
    """Get questionnaire completion progress"""
    try:
        if not system:
            initialize_system()
        
        progress = system.get_progress_percentage()
        all_questions = system.get_all_questions()
        required_questions = [q for q in all_questions if q.required]
        answered_required = sum(
            1 for q in required_questions 
            if q.question_id in system.user_responses
        )
        
        return jsonify({
            'success': True,
            'progress_percentage': progress,
            'answered_required': answered_required,
            'total_required': len(required_questions),
            'total_questions': len(all_questions)
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ============================================================================
# TEMPLATE SEARCH & RECOMMENDATION ENDPOINTS
# ============================================================================

@app.route('/api/templates/search', methods=['POST'])
def search_templates():
    """Search for templates based on parameters"""
    try:
        search_params = request.json
        templates = search_engine.search_templates(search_params)
        
        return jsonify({
            'success': True,
            'templates': templates,
            'count': len(templates)
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/templates', methods=['GET'])
def get_templates():
    """Get all available templates"""
    try:
        # Mock template database - in production, this would query a real database
        templates = [
            {
                'id': 1,
                'name': 'Minimal Beige Professional',
                'url': 'https://example.com/template1',
                'style_tags': ['minimal', 'modern', 'professional'],
                'color_schemes': ['beige_orange'],
                'suitable_for': ['교육', '정보 전달', '보고'],
                'compatible_versions': ['2019', '2021', 'Microsoft 365'],
                'pros': ['깔끔한 디자인', '쉬운 편집', '다양한 레이아웃', '전문적인 느낌'],
                'cons': ['애니메이션 제한적', '색상 변경 제약'],
                'difficulty': 'easy',
                'preview_image': 'https://via.placeholder.com/400x300/F5EFE7/E67E22?text=Minimal+Beige',
                'slide_count': '20-30',
                'features': ['charts', 'infographics', 'icons'],
                'price': 'free',
                'downloads': 12580
            },
            {
                'id': 2,
                'name': 'Modern Education Template',
                'url': 'https://example.com/template2',
                'style_tags': ['modern', 'creative', 'educational'],
                'color_schemes': ['beige_orange', 'blue_gray'],
                'suitable_for': ['교육', '발표', '세미나'],
                'compatible_versions': ['2016', '2019', '2021', 'Microsoft 365'],
                'pros': ['학생 친화적', '시각적 요소 풍부', '접근성 우수', '대화형 요소 포함'],
                'cons': ['파일 크기 큼', '복잡한 편집'],
                'difficulty': 'medium',
                'preview_image': 'https://via.placeholder.com/400x300/E8DFD0/D35400?text=Modern+Education',
                'slide_count': '30-40',
                'features': ['image_placeholders', 'timelines', 'quizzes', 'interactive_elements'],
                'price': 'free',
                'downloads': 8932
            },
            {
                'id': 3,
                'name': 'Elegant Academic Presentation',
                'url': 'https://example.com/template3',
                'style_tags': ['classic', 'elegant', 'academic'],
                'color_schemes': ['beige_orange'],
                'suitable_for': ['교육', '연구 발표', '학술 회의'],
                'compatible_versions': ['2016', '2019', '2021', 'Microsoft 365'],
                'pros': ['학술적 신뢰성', '참고문헌 관리 용이', '데이터 시각화 최적화'],
                'cons': ['보수적 디자인', '제한된 색상 옵션'],
                'difficulty': 'easy',
                'preview_image': 'https://via.placeholder.com/400x300/FAF7F0/8B4513?text=Elegant+Academic',
                'slide_count': '40+',
                'features': ['charts', 'tables', 'references', 'equations'],
                'price': 'premium',
                'downloads': 5642
            },
            {
                'id': 4,
                'name': 'Creative Workshop Kit',
                'url': 'https://example.com/template4',
                'style_tags': ['creative', 'modern', 'interactive'],
                'color_schemes': ['beige_orange', 'custom'],
                'suitable_for': ['교육', '워크샵', '트레이닝'],
                'compatible_versions': ['2019', '2021', 'Microsoft 365'],
                'pros': ['인터랙티브 요소', '참여 유도 디자인', '모듈화된 구조'],
                'cons': ['높은 난이도', '시간 소요 큼'],
                'difficulty': 'hard',
                'preview_image': 'https://via.placeholder.com/400x300/E8DFD0/F39C12?text=Creative+Workshop',
                'slide_count': '20-30',
                'features': ['interactive_elements', 'animations', 'games', 'exercises'],
                'price': 'premium',
                'downloads': 4123
            },
            {
                'id': 5,
                'name': 'Simple Lecture Slides',
                'url': 'https://example.com/template5',
                'style_tags': ['minimal', 'simple', 'clean'],
                'color_schemes': ['beige_orange'],
                'suitable_for': ['교육', '강의', '튜토리얼'],
                'compatible_versions': ['2016', '2019', '2021', 'Microsoft 365', 'Mac용 PowerPoint'],
                'pros': ['초보자 친화적', '빠른 제작', '범용성 높음', '낮은 파일 크기'],
                'cons': ['단순한 디자인', '차별화 어려움'],
                'difficulty': 'easy',
                'preview_image': 'https://via.placeholder.com/400x300/FAF7F0/E67E22?text=Simple+Lecture',
                'slide_count': '10-15',
                'features': ['basic_layouts', 'simple_charts', 'text_focus'],
                'price': 'free',
                'downloads': 24567
            }
        ]
        
        return jsonify({
            'success': True,
            'templates': templates,
            'count': len(templates)
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/recommendations/generate', methods=['POST'])
def generate_recommendations():
    """Generate template recommendations based on user profile"""
    try:
        if not system:
            initialize_system()
        
        # Get templates
        templates = search_templates().json.get('templates', [])
        
        # Generate recommendations
        recommendations = system.generate_recommendations(templates)
        
        recommendations_data = [
            {
                'template_name': rec.template_name,
                'template_url': rec.template_url,
                'match_score': rec.match_score,
                'style_tags': rec.style_tags,
                'pros': rec.pros,
                'cons': rec.cons,
                'customization_difficulty': rec.customization_difficulty,
                'preview_image': rec.preview_image
            }
            for rec in recommendations
        ]
        
        return jsonify({
            'success': True,
            'recommendations': recommendations_data,
            'count': len(recommendations_data)
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ============================================================================
# PROFILE & ANALYSIS ENDPOINTS
# ============================================================================

@app.route('/api/profile/scores', methods=['GET'])
def get_profile_scores():
    """Get calculated profile scores"""
    try:
        if not system:
            initialize_system()
        
        scores = system.calculate_profile_score()
        total_score = sum(scores.values())
        
        return jsonify({
            'success': True,
            'scores': scores,
            'total_score': total_score,
            'max_score': 100
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/profile/export', methods=['GET'])
def export_profile():
    """Export complete user profile"""
    try:
        if not system:
            initialize_system()
        
        profile = system.export_user_profile()
        
        return jsonify({
            'success': True,
            'profile': profile
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/profile/download', methods=['GET'])
def download_profile():
    """Download profile as JSON file"""
    try:
        if not system:
            initialize_system()
        
        profile = system.export_user_profile()
        
        # Save to temporary file
        filename = f"ppt_profile_{profile['profile_id']}.json"
        filepath = os.path.join('/tmp', filename)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(profile, f, ensure_ascii=False, indent=2)
        
        return send_file(
            filepath,
            mimetype='application/json',
            as_attachment=True,
            download_name=filename
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/plan/generate', methods=['GET'])
def generate_implementation_plan():
    """Generate implementation plan"""
    try:
        if not system:
            initialize_system()
        
        plan = system.generate_implementation_plan()
        
        return jsonify({
            'success': True,
            'plan': plan
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ============================================================================
# CUSTOMIZED DIRECTION ENDPOINTS
# ============================================================================

@app.route('/api/direction/<int:phase_id>/<section_id>', methods=['POST'])
def get_customized_direction(phase_id, section_id):
    """Get customized development direction"""
    try:
        if not system:
            initialize_system()
        
        data = request.json
        user_choice = data.get('user_choice')
        
        if not user_choice:
            return jsonify({
                'success': False,
                'error': 'user_choice is required'
            }), 400
        
        direction = system.get_customized_direction(phase_id, section_id, user_choice)
        
        return jsonify({
            'success': True,
            'phase_id': phase_id,
            'section_id': section_id,
            'user_choice': user_choice,
            'direction': direction
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ============================================================================
# UTILITY ENDPOINTS
# ============================================================================

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0'
    }), 200


@app.route('/api/session/clear', methods=['POST'])
def clear_session():
    """Clear current session"""
    global system
    try:
        if system:
            system.clear_session()
        system = None
        
        return jsonify({
            'success': True,
            'message': 'Session cleared successfully'
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ============================================================================
# ERROR HANDLERS
# ============================================================================

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'error': 'Endpoint not found',
        'status': 404
    }), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        'error': 'Internal server error',
        'status': 500
    }), 500


# ============================================================================
# MAIN
# ============================================================================

if __name__ == '__main__':
    # Run development server
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )
