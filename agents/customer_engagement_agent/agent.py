"""
Customer Engagement Agent
Generates natural conversation scripts for customer communication
"""

import os
from crewai import Agent, Task, Crew
from langchain_openai import ChatOpenAI

class CustomerEngagementAgent:
    """Agent for customer communication and engagement"""
    
    def __init__(self):
        """Initialize the Customer Engagement Agent"""
        self.llm = ChatOpenAI(
            model=os.getenv("OPENAI_MODEL", "gpt-4o-mini"),
            temperature=0.7
        )
        
        self.agent = Agent(
            role="Customer Service Voice AI with excellent communication skills",
            goal="Persuade customers to schedule maintenance through empathetic conversation",
            backstory="Professional AI trained in empathetic communication, objection handling, and customer psychology",
            llm=self.llm,
            verbose=True
        )
    
    def generate_call_script(self, customer_name, diagnosis):
        """
        Generate customer call script
        
        Args:
            customer_name: Name of the customer
            diagnosis: Diagnosis output from Diagnosis Agent
            
        Returns:
            Natural conversation script
        """
        task = Task(
            description=f"""
            Create a natural phone conversation script for customer: {customer_name}
            
            Based on this diagnosis: {diagnosis}
            
            Generate a 5-7 exchange conversation with:
            1. Warm, empathetic greeting
            2. Explain issue in simple, non-technical language
            3. Emphasize: Safety, cost savings of prevention, convenience
            4. Offer 2-3 specific appointment times
            5. Handle common objections
            
            Format:
            AI: [greeting]
            CUSTOMER: [response]
            AI: [continuation]
            
            Tone: Warm, professional, safety-focused
            Context: Indian customer
            """,
            agent=self.agent,
            expected_output="Natural conversation script with 5-7 exchanges"
        )
        
        crew = Crew(
            agents=[self.agent],
            tasks=[task],
            verbose=False
        )
        
        result = crew.kickoff()
        return str(result)


if __name__ == "__main__":
    print("Testing Customer Engagement Agent...")
    agent = CustomerEngagementAgent()
    
    test_diagnosis = """
    Primary Issue: Front brake pads worn
    Time to Failure: 7-10 days
    Estimated Repair Cost: ₹4,500
    Safety Risk: HIGH
    """
    
    result = agent.generate_call_script("Mr. Sharma", test_diagnosis)
    print("\nCall Script:")
    print(result)