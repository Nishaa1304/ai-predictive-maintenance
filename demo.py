"""Automotive Agentic AI Demo"""

import os
from dotenv import load_dotenv

load_dotenv()

try:
    from colorama import Fore, Style, init
    init(autoreset=True)
except ImportError:
    class Fore:
        BLUE = GREEN = YELLOW = RED = CYAN = WHITE = ""
    class Style:
        BRIGHT = RESET_ALL = ""

from agents.data_analysis_agent.agent import DataAnalysisAgent
from agents.diagnosis_agent.agent import DiagnosisAgent
from agents.customer_engagement_agent.agent import CustomerEngagementAgent
from utils.mock_data import get_vehicle, get_all_vehicles


def print_header():
    print("\n" + "="*70)
    print(Fore.CYAN + "🚗 AUTOMOTIVE AGENTIC AI DEMO 🤖")
    print("="*70 + "\n")


def run_demo():
    if not os.getenv("OPENAI_API_KEY"):
        print(Fore.RED + "❌ ERROR: OpenAI API key not found!")
        return
    
    print_header()
    
    print("Available Vehicles:")
    for vid, data in get_all_vehicles().items():
        print(f"  {vid} - {data['year']} {data['model']}")
    
    vehicle_id = input("\nEnter Vehicle ID: ").strip().upper()
    vehicle_data = get_vehicle(vehicle_id)
    
    if not vehicle_data:
        print(Fore.RED + f"Vehicle {vehicle_id} not found!")
        return
    
    print(Fore.GREEN + f"\n✓ Starting demo...")
    
    try:
        print(Fore.BLUE + "\n[STAGE 1] Data Analysis")
        agent1 = DataAnalysisAgent()
        analysis = agent1.analyze(vehicle_data)
        print(analysis[:400])
        
        print(Fore.BLUE + "\n[STAGE 2] Diagnosis")
        agent2 = DiagnosisAgent()
        diagnosis = agent2.diagnose(analysis, {
            "model": vehicle_data["model"],
            "year": vehicle_data["year"],
            "type": vehicle_data["type"]
        })
        print(diagnosis[:400])
        
        print(Fore.GREEN + "\n✅ DEMO COMPLETE!")
        
    except Exception as e:
        print(Fore.RED + f"❌ Error: {e}")


if __name__ == "__main__":
    run_demo()