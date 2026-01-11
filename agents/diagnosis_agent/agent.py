"""
Diagnosis Agent
Predicts component failures with cost estimates
"""

import os
from crewai import Agent, Task, Crew
from langchain_openai import ChatOpenAI

class DiagnosisAgent:
    """Agent for diagnosing vehicle issues and predicting failures"""
    
    def __init__(self):
        """Initialize the Diagnosis Agent"""
        self.llm = ChatOpenAI(
            model=os.getenv("OPENAI_MODEL", "gpt-4o-mini"),
            temperature=float(os.getenv("TEMPERATURE", "0.3"))
        )
        
        self.agent = Agent(
            role="Automotive Diagnostic Expert with 20 years experience",
            goal="Predict specific component failures with time and cost estimates",
            backstory="Master diagnostician who can predict what will fail, when, and repair costs",
            llm=self.llm,
            verbose=True
        )
    
    def diagnose(self, analysis_result, vehicle_info):
        """
        Diagnose vehicle issues based on analysis
        
        Args:
            analysis_result: Analysis output from Data Analysis Agent
            vehicle_info: Dictionary with model, year, type
            
        Returns:
            Diagnosis report with failure predictions and cost estimates
        """
        model = vehicle_info.get("model", "Unknown")
        year = vehicle_info.get("year", "Unknown")
        vehicle_type = vehicle_info.get("type", "Unknown")
        
        task = Task(
            description=f"""
            Based on this analysis: {analysis_result}
            
            For vehicle: {model} ({year}) - {vehicle_type}
            
            Provide detailed diagnosis with:
            1. Primary Issue: [specific component]
            2. Failure Probability: [percentage]
            3. Time to Failure: [days/weeks estimate]
            4. Estimated Repair Cost: [in INR - Indian Rupees]
            5. Safety Risk: LOW/MEDIUM/HIGH
            6. Urgency: Can wait / Schedule soon / Immediate
            
            Cost Guidelines (India):
            - Brake pads: ₹3,000-6,000
            - Oil change: ₹2,000-4,000
            - Battery replacement: ₹8,000-15,000
            - EV battery service: ₹25,000-50,000
            """,
            agent=self.agent,
            expected_output="Detailed diagnosis with component-specific predictions and cost estimates"
        )
        
        crew = Crew(
            agents=[self.agent],
            tasks=[task],
            verbose=False
        )
        
        result = crew.kickoff()
        return str(result)


if __name__ == "__main__":
    print("Testing Diagnosis Agent...")
    agent = DiagnosisAgent()
    
    test_analysis = """
    Anomalies Found: High brake wear (80%), Low oil pressure (28 PSI)
    Severity Level: HIGH
    Recommended Action: Immediate inspection required
    """
    
    test_vehicle = {
        "model": "Maruti Swift",
        "year": 2020,
        "type": "ICE"
    }
    
    result = agent.diagnose(test_analysis, test_vehicle)
    print("\nDiagnosis Result:")
    print(result)