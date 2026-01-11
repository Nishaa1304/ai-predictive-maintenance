"""
Scheduling Agent
Books maintenance appointments
"""

import os
from crewai import Agent, Task, Crew
from langchain_openai import ChatOpenAI
from datetime import datetime, timedelta

class SchedulingAgent:
    """Agent for appointment scheduling"""
    
    def __init__(self):
        self.llm = ChatOpenAI(
            model=os.getenv("OPENAI_MODEL", "gpt-4o-mini"),
            temperature=0.3
        )
        
        self.agent = Agent(
            role="Appointment Coordinator",
            goal="Book maintenance appointments efficiently",
            backstory="Experienced scheduler with access to service center availability",
            llm=self.llm,
            verbose=True
        )
    
    def schedule_appointment(self, customer_info):
        """Schedule appointment for customer"""
        tomorrow = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d")
        
        task = Task(
            description=f"""
            Book appointment for: {customer_info.get('name')}
            Phone: {customer_info.get('phone')}
            
            Available slots:
            - {tomorrow} 10:00 AM
            - {tomorrow} 2:00 PM
            
            Confirm booking and generate SMS notification.
            """,
            agent=self.agent,
            expected_output="Appointment confirmation"
        )
        
        crew = Crew(agents=[self.agent], tasks=[task], verbose=False)
        return str(crew.kickoff())