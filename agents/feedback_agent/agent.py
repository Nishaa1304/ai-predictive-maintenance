"""
Feedback Agent
Generates post-service surveys
"""

import os
from crewai import Agent, Task, Crew
from langchain_openai import ChatOpenAI

class FeedbackAgent:
    """Agent for customer feedback collection"""
    
    def __init__(self):
        self.llm = ChatOpenAI(
            model=os.getenv("OPENAI_MODEL", "gpt-4o-mini"),
            temperature=0.3
        )
        
        self.agent = Agent(
            role="Customer Satisfaction Analyst",
            goal="Generate post-service surveys",
            backstory="Expert in customer experience",
            llm=self.llm,
            verbose=True
        )
    
    def generate_survey(self):
        """Generate customer satisfaction survey"""
        task = Task(
            description="""
            Generate a post-service satisfaction survey with:
            1. Service quality rating (1-5)
            2. Wait time satisfaction (1-5)
            3. Technician professionalism (1-5)
            4. Would you recommend us? (Yes/No)
            """,
            agent=self.agent,
            expected_output="Customer satisfaction survey"
        )
        
        crew = Crew(agents=[self.agent], tasks=[task], verbose=False)
        return str(crew.kickoff())