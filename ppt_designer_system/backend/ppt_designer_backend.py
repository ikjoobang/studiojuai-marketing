"""
PPT Professional Designer - Backend System
Python implementation for web/app service
"""

import json
from typing import Dict, List, Optional, Any, Tuple
from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum


class QuestionType(Enum):
    """Question types for the questionnaire system"""
    SINGLE_CHOICE = "single_choice"
    MULTIPLE_CHOICE = "multiple_choice"
    TEXT = "text"
    BOOLEAN = "boolean"
    BOOLEAN_WITH_DETAILS = "boolean_with_details"


@dataclass
class Question:
    """Represents a single strategic question"""
    question_id: str
    question_text: str
    question_type: QuestionType
    required: bool
    weight: int
    options: Optional[List[str]] = None
    follow_up: Optional[str] = None
    placeholder: Optional[str] = None


@dataclass
class UserResponse:
    """Stores user's response to a question"""
    question_id: str
    response: Any
    additional_details: Optional[str] = None
    timestamp: datetime = field(default_factory=datetime.now)


@dataclass
class TemplateRecommendation:
    """Represents a template recommendation with matching score"""
    template_name: str
    template_url: str
    match_score: float
    style_tags: List[str]
    pros: List[str]
    cons: List[str]
    customization_difficulty: str
    preview_image: Optional[str] = None


class PPTDesignerSystem:
    """Main system class for PPT Designer"""
    
    def __init__(self, config_path: str = "ppt_designer_system.json"):
        """Initialize the system with configuration"""
        with open(config_path, 'r', encoding='utf-8') as f:
            self.config = json.load(f)
        
        self.user_responses: Dict[str, UserResponse] = {}
        self.current_phase = 1
        self.current_section = 1
        self.recommendations: List[TemplateRecommendation] = []
        
    def get_all_questions(self) -> List[Question]:
        """Get all questions from all phases"""
        questions = []
        for phase in self.config['workflow_phases']:
            for section in phase['sections']:
                for q_data in section['strategic_questions']:
                    question = Question(
                        question_id=q_data['question_id'],
                        question_text=q_data['question_text'],
                        question_type=QuestionType(q_data['question_type']),
                        required=q_data['required'],
                        weight=q_data['weight'],
                        options=q_data.get('options'),
                        follow_up=q_data.get('follow_up'),
                        placeholder=q_data.get('placeholder')
                    )
                    questions.append(question)
        return questions
    
    def get_questions_by_phase(self, phase_id: int) -> List[Question]:
        """Get questions for a specific phase"""
        questions = []
        phase = self.config['workflow_phases'][phase_id - 1]
        
        for section in phase['sections']:
            for q_data in section['strategic_questions']:
                question = Question(
                    question_id=q_data['question_id'],
                    question_text=q_data['question_text'],
                    question_type=QuestionType(q_data['question_type']),
                    required=q_data['required'],
                    weight=q_data['weight'],
                    options=q_data.get('options'),
                    follow_up=q_data.get('follow_up'),
                    placeholder=q_data.get('placeholder')
                )
                questions.append(question)
        return questions
    
    def submit_response(self, question_id: str, response: Any, 
                       additional_details: Optional[str] = None) -> bool:
        """Submit a user response"""
        user_response = UserResponse(
            question_id=question_id,
            response=response,
            additional_details=additional_details
        )
        self.user_responses[question_id] = user_response
        return True
    
    def calculate_profile_score(self) -> Dict[str, float]:
        """Calculate weighted scores for user profile"""
        scores = {
            'content_goals': 0.0,
            'audience_context': 0.0,
            'design_preferences': 0.0,
            'technical_requirements': 0.0,
            'timeline_resources': 0.0,
            'scalability': 0.0
        }
        
        # Map questions to score categories
        category_mapping = {
            'q1.1': 'content_goals',
            'q1.2': 'audience_context',
            'q1.3': 'design_preferences',
            'q2.1': 'design_preferences',
            'q2.2': 'technical_requirements',
            'q3.1': 'content_goals',
            'q3.2': 'audience_context',
            'q4.1': 'technical_requirements',
            'q4.2': 'technical_requirements',
            'q5.1': 'timeline_resources',
            'q5.2': 'scalability'
        }
        
        max_scores = self.config['scoring_system']['weight_distribution']
        
        for question_id, response in self.user_responses.items():
            # Extract category from question_id (e.g., 'q1.1.1' -> 'q1.1')
            prefix = '.'.join(question_id.split('.')[:2])
            category = category_mapping.get(prefix)
            
            if category:
                # Get question weight
                question = self._find_question(question_id)
                if question and response.response:
                    # Simple scoring: weight * (response completeness)
                    score_contribution = question['weight'] / 10.0
                    scores[category] += score_contribution
        
        # Normalize scores to match max_scores
        for category in scores:
            max_score = max_scores[category]
            # Normalize based on number of questions in category
            scores[category] = min(scores[category] * 2, max_score)
        
        return scores
    
    def _find_question(self, question_id: str) -> Optional[Dict]:
        """Find question data by ID"""
        for phase in self.config['workflow_phases']:
            for section in phase['sections']:
                for q_data in section['strategic_questions']:
                    if q_data['question_id'] == question_id:
                        return q_data
        return None
    
    def get_customized_direction(self, phase_id: int, section_id: str, 
                                 user_choice: str) -> Dict[str, Any]:
        """Get customized development direction based on user response"""
        phase = self.config['workflow_phases'][phase_id - 1]
        
        for section in phase['sections']:
            if section['section_id'] == section_id:
                directions = section.get('customized_directions', {})
                return directions.get(user_choice, {})
        
        return {}
    
    def generate_template_search_query(self) -> Dict[str, Any]:
        """Generate search parameters for template matching"""
        search_params = {
            'style': [],
            'color_schemes': [],
            'features': [],
            'industry': None,
            'slide_count': None
        }
        
        # Extract from user responses
        for question_id, response in self.user_responses.items():
            if 'q2.1.1' in question_id:  # Design style
                search_params['style'].append(response.response.lower())
            elif 'q1.3.2' in question_id:  # Color preference
                search_params['color_schemes'].append(response.response)
            elif 'q3.1.1' in question_id:  # Slide count
                search_params['slide_count'] = response.response
        
        return search_params
    
    def calculate_template_match_score(self, template_data: Dict[str, Any]) -> float:
        """Calculate how well a template matches user requirements"""
        profile_scores = self.calculate_profile_score()
        total_score = sum(profile_scores.values())
        
        # Template matching factors
        match_factors = {
            'style_match': 0.0,
            'color_match': 0.0,
            'functionality_match': 0.0,
            'technical_compatibility': 0.0
        }
        
        # Style matching
        user_style = self.user_responses.get('q2.1.1')
        if user_style and user_style.response.lower() in template_data.get('style_tags', []):
            match_factors['style_match'] = 25.0
        
        # Color matching
        user_color = self.user_responses.get('q1.3.2')
        if user_color and user_color.response in template_data.get('color_schemes', []):
            match_factors['color_match'] = 20.0
        
        # Functionality matching
        user_goal = self.user_responses.get('q1.1.1')
        if user_goal and user_goal.response in template_data.get('suitable_for', []):
            match_factors['functionality_match'] = 30.0
        
        # Technical compatibility
        user_version = self.user_responses.get('q2.2.1')
        if user_version and user_version.response in template_data.get('compatible_versions', []):
            match_factors['technical_compatibility'] = 25.0
        
        final_score = sum(match_factors.values())
        return min(final_score, 100.0)
    
    def generate_recommendations(self, templates_database: List[Dict]) -> List[TemplateRecommendation]:
        """Generate template recommendations based on user profile"""
        recommendations = []
        
        for template in templates_database:
            match_score = self.calculate_template_match_score(template)
            
            recommendation = TemplateRecommendation(
                template_name=template['name'],
                template_url=template['url'],
                match_score=match_score,
                style_tags=template.get('style_tags', []),
                pros=template.get('pros', []),
                cons=template.get('cons', []),
                customization_difficulty=template.get('difficulty', 'medium'),
                preview_image=template.get('preview_image')
            )
            recommendations.append(recommendation)
        
        # Sort by match score
        recommendations.sort(key=lambda x: x.match_score, reverse=True)
        self.recommendations = recommendations
        
        return recommendations[:10]  # Top 10 recommendations
    
    def generate_implementation_plan(self) -> Dict[str, Any]:
        """Generate step-by-step implementation plan"""
        timeline = self.user_responses.get('q5.1.1')
        experience = self.user_responses.get('q5.1.2')
        
        plan = {
            'timeline': timeline.response if timeline else '1주',
            'experience_level': experience.response if experience else '중급자',
            'phases': [],
            'resources_needed': [],
            'estimated_hours': 0
        }
        
        # Get roadmap from config
        if timeline:
            timeline_key = {
                '1일': 'tight_timeline_1day',
                '1주': 'standard_timeline_1week',
                '1개월': 'extended_timeline_1month'
            }.get(timeline.response, 'standard_timeline_1week')
            
            roadmap = self.config['workflow_phases'][4]['sections'][0]['implementation_roadmaps'].get(timeline_key, {})
            plan['phases'] = roadmap.get('steps', [])
            plan['resources_needed'] = [roadmap.get('resources', '')]
            plan['customization_level'] = roadmap.get('customization_level', 'moderate')
        
        return plan
    
    def export_user_profile(self) -> Dict[str, Any]:
        """Export complete user profile for storage/analysis"""
        return {
            'profile_id': f"profile_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
            'created_at': datetime.now().isoformat(),
            'responses': {
                qid: {
                    'response': resp.response,
                    'details': resp.additional_details,
                    'timestamp': resp.timestamp.isoformat()
                }
                for qid, resp in self.user_responses.items()
            },
            'profile_scores': self.calculate_profile_score(),
            'recommendations': [
                {
                    'name': rec.template_name,
                    'url': rec.template_url,
                    'score': rec.match_score
                }
                for rec in self.recommendations[:5]
            ]
        }
    
    def get_progress_percentage(self) -> float:
        """Calculate questionnaire completion progress"""
        all_questions = self.get_all_questions()
        required_questions = [q for q in all_questions if q.required]
        
        answered_required = sum(
            1 for q in required_questions 
            if q.question_id in self.user_responses
        )
        
        if not required_questions:
            return 100.0
        
        return (answered_required / len(required_questions)) * 100.0


class TemplateSearchEngine:
    """Template search and matching engine"""
    
    def __init__(self):
        self.platforms = [
            "Microsoft Office Templates",
            "SlidesCarnival",
            "Canva",
            "Envato Elements",
            "GraphicRiver",
            "SlideModel"
        ]
    
    def search_templates(self, search_params: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Search for templates based on parameters"""
        # This would integrate with actual template APIs/databases
        # For now, return mock data structure
        
        mock_templates = [
            {
                'name': 'Minimal Beige Professional',
                'url': 'https://example.com/template1',
                'style_tags': ['minimal', 'modern', 'professional'],
                'color_schemes': ['beige_orange'],
                'suitable_for': ['교육', '정보 전달'],
                'compatible_versions': ['2019', '2021', 'Microsoft 365'],
                'pros': ['깔끔한 디자인', '쉬운 편집', '다양한 레이아웃'],
                'cons': ['애니메이션 제한적'],
                'difficulty': 'easy',
                'preview_image': 'https://example.com/preview1.jpg',
                'slide_count': '20-30',
                'features': ['charts', 'infographics', 'icons']
            },
            {
                'name': 'Modern Education Template',
                'url': 'https://example.com/template2',
                'style_tags': ['modern', 'creative', 'educational'],
                'color_schemes': ['beige_orange', 'blue_gray'],
                'suitable_for': ['교육', '발표'],
                'compatible_versions': ['2016', '2019', '2021', 'Microsoft 365'],
                'pros': ['학생 친화적', '시각적 요소 풍부', '접근성 우수'],
                'cons': ['파일 크기 큼'],
                'difficulty': 'medium',
                'preview_image': 'https://example.com/preview2.jpg',
                'slide_count': '30-40',
                'features': ['image_placeholders', 'timelines', 'quizzes']
            }
        ]
        
        return mock_templates
    
    def filter_by_style(self, templates: List[Dict], style: str) -> List[Dict]:
        """Filter templates by design style"""
        return [t for t in templates if style.lower() in t.get('style_tags', [])]
    
    def filter_by_color(self, templates: List[Dict], color_scheme: str) -> List[Dict]:
        """Filter templates by color scheme"""
        return [t for t in templates if color_scheme in t.get('color_schemes', [])]


# Example usage
if __name__ == "__main__":
    # Initialize system
    system = PPTDesignerSystem()
    
    # Get questions for first phase
    phase1_questions = system.get_questions_by_phase(1)
    print(f"Phase 1 has {len(phase1_questions)} questions")
    
    # Simulate user responses
    system.submit_response('q1.1.1', '교육')
    system.submit_response('q1.2.1', '학생')
    system.submit_response('q2.1.1', '미니멀')
    system.submit_response('q1.3.2', '전문적인')
    system.submit_response('q5.1.1', '1주')
    
    # Calculate scores
    scores = system.calculate_profile_score()
    print(f"\nProfile scores: {scores}")
    
    # Generate search query
    search_params = system.generate_template_search_query()
    print(f"\nSearch parameters: {search_params}")
    
    # Search templates
    search_engine = TemplateSearchEngine()
    templates = search_engine.search_templates(search_params)
    
    # Generate recommendations
    recommendations = system.generate_recommendations(templates)
    print(f"\nTop recommendation: {recommendations[0].template_name}")
    print(f"Match score: {recommendations[0].match_score}")
    
    # Generate implementation plan
    plan = system.generate_implementation_plan()
    print(f"\nImplementation timeline: {plan['timeline']}")
    print(f"Phases: {len(plan['phases'])}")
    
    # Export profile
    profile = system.export_user_profile()
    print(f"\nProfile ID: {profile['profile_id']}")
    
    # Check progress
    progress = system.get_progress_percentage()
    print(f"Progress: {progress:.1f}%")
