"""
Data Analysis Agent
Processes vehicle telemetry data and detects anomalies
"""

import os
from crewai import Agent, Task, Crew
from langchain_openai import ChatOpenAI


class DataAnalysisAgent:
    """Agent for analyzing vehicle sensor data"""
    
    def __init__(self):
        """Initialize the Data Analysis Agent"""
        self.llm = ChatOpenAI(
            model=os.getenv("OPENAI_MODEL", "gpt-4o-mini"),
            temperature=float(os.getenv("TEMPERATURE", "0.3"))
        )
        
        self.agent = Agent(
            role="Vehicle Telematics Monitoring Specialist",
            goal="Analyze vehicle sensor data from ICE and EV vehicles to detect anomalies",
            backstory="Expert automotive AI that monitors vehicle health 24/7 across diverse powertrains",
            llm=self.llm,
            verbose=True
        )
    
    def analyze(self, vehicle_data):
        """
        Analyze vehicle sensor data
        
        Args:
            vehicle_data: Dictionary containing vehicle type and sensor readings
            
        Returns:
            Analysis report with anomalies and recommendations
        """
        vehicle_type = vehicle_data.get("type", "Unknown")
        sensor_data = vehicle_data.get("sensor_data", {})
        
        task = Task(
            description=f"""
            Analyze this {vehicle_type} vehicle's sensor data: {sensor_data}
            
            Thresholds:
            ICE Vehicles:
            - Engine Temp: 80-90°C normal, >100°C critical
            - Oil Pressure: 40-60 PSI normal, <30 PSI critical
            - Battery Voltage: 12.6-14.4V normal, <12V critical
            - Brake Wear: <50% good, >75% critical
            
            EV Vehicles:
            - Battery SOH: 85-100% good, <70% critical
            - Battery Temp: 20-45°C normal, >60°C critical
            - Motor Temp: <80°C normal, >95°C critical
            - Brake Wear: <50% good, >75% critical
            
            Return structured analysis with:
            - Anomalies Found: [list]
            - Severity Level: LOW/MEDIUM/HIGH/CRITICAL
            - Recommended Action: [action]
            - Time to Failure: [estimate]
            """,
            agent=self.agent,
            expected_output="Detailed analysis report with anomalies and severity levels"
        )
        
        crew = Crew(
            agents=[self.agent],
            tasks=[task],
            verbose=False
        )
        
        result = crew.kickoff()
        return str(result)


if __name__ == "__main__":
    print("Testing Data Analysis Agent...")
    agent = DataAnalysisAgent()
    
    test_data = {
        "type": "ICE",
        "vehicle_id": "VEH001",
        "sensor_data": {
            "engine_temp": 105,
            "oil_pressure": 28,
            "battery_voltage": 11.8,
            "brake_wear": 80
        }
    }
    
    result = agent.analyze(test_data)
    print("\nAnalysis Result:")
    print(result)