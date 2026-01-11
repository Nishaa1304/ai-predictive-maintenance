"""
Interactive Customer Call Demo
Role-play as a customer receiving a call from the AI agent
"""

import os
from dotenv import load_dotenv

load_dotenv()

try:
    from colorama import Fore, Style, init
    init(autoreset=True)
except ImportError:
    class Fore:
        BLUE = GREEN = YELLOW = RED = CYAN = MAGENTA = WHITE = ""
    class Style:
        BRIGHT = RESET_ALL = ""

from agents.customer_engagement_agent.agent import CustomerEngagementAgent
from agents.data_analysis_agent.agent import DataAnalysisAgent
from agents.diagnosis_agent.agent import DiagnosisAgent
from utils.mock_data import get_vehicle


def print_header():
    print("\n" + "="*70)
    print(Fore.CYAN + Style.BRIGHT + """
    ╔══════════════════════════════════════════════════════════════╗
    ║        📞  INTERACTIVE CUSTOMER CALL DEMO  🤖                ║
    ║           Role-Play: You are the Car Owner                   ║
    ╚══════════════════════════════════════════════════════════════╝
    """)
    print("="*70 + "\n")


def simulate_call_exchange(agent, customer_name, diagnosis):
    """Simulate a real phone conversation"""
    
    print(Fore.YELLOW + "📱 Incoming call from ABC Motors Service Center...\n")
    input(Fore.GREEN + "Press Enter to answer the call...")
    print()
    
    # Generate initial greeting
    print(Fore.CYAN + Style.BRIGHT + "🤖 AI Agent: ", end="")
    greeting = f"Hello {customer_name}! This is Maya from ABC Motors Service Center. " \
               f"I hope I'm not catching you at a bad time?"
    
    print(Fore.WHITE + greeting)
    print()
    
    # Get customer response
    print(Fore.YELLOW + f"👤 {customer_name} (You): ", end="")
    customer_response = input()
    print()
    
    # Agent explains the situation
    print(Fore.CYAN + Style.BRIGHT + "🤖 AI Agent: ", end="")
    print(Fore.WHITE + "Great! I'm calling about your vehicle. Our monitoring system " \
          "has detected some important maintenance alerts that I wanted to discuss with you.")
    print()
    
    # Show diagnosis
    print(Fore.MAGENTA + "━" * 70)
    print(Fore.MAGENTA + "📋 VEHICLE STATUS REPORT")
    print(Fore.MAGENTA + "━" * 70)
    print(Fore.WHITE + diagnosis[:400] + "...")
    print(Fore.MAGENTA + "━" * 70)
    print()
    
    # Generate full conversation script
    print(Fore.BLUE + "🔄 Generating personalized conversation...\n")
    full_script = agent.generate_call_script(customer_name, diagnosis)
    
    # Parse and present conversation interactively
    print(Fore.CYAN + Style.BRIGHT + "🤖 AI Agent: ", end="")
    print(Fore.WHITE + "I understand this might be concerning, but I want to assure you " \
          "that we caught these issues early through our predictive monitoring system.")
    print()
    
    # Interactive objection handling
    print(Fore.YELLOW + "\n📌 Common Customer Responses:")
    print("  1. I'm too busy right now")
    print("  2. How much will this cost?")
    print("  3. Can't this wait a few weeks?")
    print("  4. Is it really that urgent?")
    print("  5. I'd like to schedule service")
    print()
    
    print(Fore.YELLOW + f"👤 {customer_name} (You): ", end="")
    choice = input()
    print()
    
    # Agent responses based on choice
    responses = {
        "1": "I completely understand! We value your time. That's why we offer flexible " \
             "scheduling including early morning slots at 7 AM or evening appointments until 7 PM. " \
             "We can also arrange pickup and drop-off service at no extra cost. " \
             "The service typically takes just 2-3 hours.",
        
        "2": f"Absolutely, transparency is important. Based on the diagnosis, " \
             f"we're looking at approximately ₹3,000-6,000 for the brake pads and " \
             f"₹2,000-4,000 for the oil service. However, if we address this now, " \
             f"you'll save significantly - waiting could result in costs 3-4 times higher " \
             f"if the brake rotors get damaged or engine issues develop. " \
             f"We also offer a 10% preventive maintenance discount!",
        
        "3": "I appreciate your question. Here's my honest concern: our analysis shows " \
             "you have about 7-10 days before the brake pads could cause serious safety issues. " \
             "More importantly, continuing to drive with low oil pressure risks significant engine damage - " \
             "we're talking potential repair costs of ₹50,000+ if the engine seizes. " \
             "Your family's safety is paramount, especially with the upcoming holiday season and increased travel.",
        
        "4": "Great question! Yes, it is urgent for two main reasons. First, brake safety - " \
             "we detected 78% wear, and at 80%+ the stopping distance increases dramatically, " \
             "especially in monsoon conditions. Second, the oil pressure issue puts stress on " \
             "the engine every time you drive. Think of it like ignoring chest pain - " \
             "small issue now, major problem later. We'd never call if it wasn't genuinely important.",
        
        "5": "Excellent decision! I'm so glad we could catch this early. Let me check our availability. " \
             "We have slots tomorrow at 10 AM and 2 PM, or the day after at 9 AM. " \
             "Which works better for you? I'll also send you a confirmation SMS with the " \
             "appointment details and a pre-service checklist."
    }
    
    agent_response = responses.get(choice, responses["5"])
    
    print(Fore.CYAN + Style.BRIGHT + "🤖 AI Agent: ", end="")
    print(Fore.WHITE + agent_response)
    print()
    
    # Final interaction
    if choice != "5":
        print(Fore.YELLOW + "Would you like to schedule an appointment now? (yes/no): ", end="")
        final_choice = input().lower()
        print()
        
        if final_choice in ["yes", "y"]:
            print(Fore.CYAN + Style.BRIGHT + "🤖 AI Agent: ", end="")
            print(Fore.WHITE + "Perfect! I have slots available tomorrow at 10 AM or 2 PM. " \
                  "Which time works better for you?")
            print()
            
            print(Fore.YELLOW + f"👤 {customer_name} (You): ", end="")
            time_choice = input()
            print()
            
            print(Fore.GREEN + Style.BRIGHT + "✅ APPOINTMENT CONFIRMED!")
            print(Fore.WHITE + f"📅 Date: Tomorrow")
            print(Fore.WHITE + f"⏰ Time: {time_choice}")
            print(Fore.WHITE + f"📍 Location: ABC Motors Service Center")
            print(Fore.WHITE + f"📱 SMS confirmation sent to your phone")
            print(Fore.WHITE + f"💰 Estimated cost: ₹5,000-10,000")
            print(Fore.WHITE + f"⏱️  Estimated duration: 2-3 hours")
        else:
            print(Fore.CYAN + Style.BRIGHT + "🤖 AI Agent: ", end="")
            print(Fore.WHITE + "I understand. However, for your safety, I'll follow up with you " \
                  "in 2 days. In the meantime, please avoid heavy braking and highway speeds. " \
                  "If you notice any unusual sounds or brake pedal feeling soft, please call us immediately " \
                  "at our 24/7 emergency line. Drive safe!")
    
    print("\n" + Fore.MAGENTA + "━" * 70)
    print(Fore.GREEN + Style.BRIGHT + "📞 Call Ended - Duration: 5 minutes")
    print(Fore.MAGENTA + "━" * 70 + "\n")
    
    # Show full AI-generated script
    print(Fore.BLUE + "\n📝 AI-Generated Full Call Script (for training purposes):")
    print(Fore.WHITE + "=" * 70)
    print(full_script[:800])
    print("=" * 70 + "\n")


def run_interactive_demo():
    """Run the interactive call demo"""
    
    if not os.getenv("OPENAI_API_KEY"):
        print(Fore.RED + "❌ ERROR: OpenAI API key not found!")
        return
    
    print_header()
    
    # Choose vehicle
    print(Fore.CYAN + "Available Vehicles:")
    print("  1. VEH001 - 2020 Maruti Swift (ICE) - Mr. Rajesh Sharma")
    print("  2. VEH002 - 2022 Tata Nexon EV - Ms. Priya Patel")
    print()
    
    choice = input(Fore.YELLOW + "Select vehicle (1/2): ").strip()
    vehicle_id = "VEH001" if choice == "1" else "VEH002"
    
    vehicle_data = get_vehicle(vehicle_id)
    if not vehicle_data:
        print(Fore.RED + "Vehicle not found!")
        return
    
    customer_name = vehicle_data["owner"]
    
    print(Fore.GREEN + f"\n✓ Selected: {vehicle_data['year']} {vehicle_data['model']}")
    print(Fore.GREEN + f"✓ Customer: {customer_name}")
    print(Fore.YELLOW + f"\n🎭 You will role-play as: {customer_name}")
    print()
    
    input(Fore.CYAN + "Press Enter to start the demo...")
    
    try:
        # Step 1: Analyze vehicle
        print(Fore.BLUE + "\n[Analyzing vehicle data...]")
        analysis_agent = DataAnalysisAgent()
        analysis = analysis_agent.analyze(vehicle_data)
        
        # Step 2: Generate diagnosis
        print(Fore.BLUE + "[Generating diagnosis...]")
        diagnosis_agent = DiagnosisAgent()
        diagnosis = diagnosis_agent.diagnose(analysis, {
            "model": vehicle_data["model"],
            "year": vehicle_data["year"],
            "type": vehicle_data["type"]
        })
        
        # Step 3: Interactive call
        print(Fore.BLUE + "[Preparing customer call...]\n")
        engagement_agent = CustomerEngagementAgent()
        simulate_call_exchange(engagement_agent, customer_name, diagnosis)
        
        print(Fore.GREEN + Style.BRIGHT + "\n✅ INTERACTIVE DEMO COMPLETE!")
        print(Fore.CYAN + "\nTips for your presentation:")
        print("  • Show this demo live to demonstrate AI-human interaction")
        print("  • Emphasize the empathetic, non-pushy communication style")
        print("  • Highlight safety-focused messaging and cost transparency")
        print("  • Demonstrate objection handling capabilities")
        
    except Exception as e:
        print(Fore.RED + f"\n❌ Error: {str(e)}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    run_interactive_demo()