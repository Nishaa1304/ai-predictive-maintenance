"""
Voice-Enabled Customer Call Agent
AI agent that speaks to you and listens to your voice responses
"""

import os
import speech_recognition as sr
import pyttsx3
import time
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


class VoiceCallAgent:
    """Voice-enabled AI agent for customer calls"""
    
    def __init__(self):
        """Initialize voice components"""
        # Text-to-Speech engine
        self.tts_engine = pyttsx3.init()
        self.tts_engine.setProperty('rate', 150)  # Speed of speech
        self.tts_engine.setProperty('volume', 0.9)  # Volume (0-1)
        
        # Set voice to female (like Maya)
        voices = self.tts_engine.getProperty('voices')
        for voice in voices:
            if "female" in voice.name.lower() or "zira" in voice.name.lower():
                self.tts_engine.setProperty('voice', voice.id)
                break
        
        # Speech recognition
        self.recognizer = sr.Recognizer()
        self.microphone = sr.Microphone()
        
        # Adjust for ambient noise
        print(Fore.YELLOW + "🎤 Calibrating microphone for ambient noise...")
        with self.microphone as source:
            self.recognizer.adjust_for_ambient_noise(source, duration=2)
        print(Fore.GREEN + "✓ Microphone ready!")
    
    def speak(self, text):
        """Make the AI speak"""
        print(Fore.CYAN + Style.BRIGHT + f"\n🤖 Maya (AI): " + Fore.WHITE + text)
        self.tts_engine.say(text)
        self.tts_engine.runAndWait()
    
    def listen(self, timeout=10):
        """Listen to user's voice and convert to text"""
        print(Fore.YELLOW + "\n👂 Listening... (speak now)")
        
        try:
            with self.microphone as source:
                # Listen for speech
                audio = self.recognizer.listen(source, timeout=timeout, phrase_time_limit=15)
            
            # Convert speech to text
            print(Fore.BLUE + "🔄 Processing your speech...")
            text = self.recognizer.recognize_google(audio)
            print(Fore.GREEN + f"👤 You said: " + Fore.WHITE + text)
            return text.lower()
            
        except sr.WaitTimeoutError:
            print(Fore.RED + "⏱️ No speech detected. Please try again.")
            return ""
        except sr.UnknownValueError:
            print(Fore.RED + "❌ Sorry, I couldn't understand that. Please speak clearly.")
            return ""
        except sr.RequestError as e:
            print(Fore.RED + f"❌ Speech recognition error: {e}")
            return ""
    
    def wait_for_response(self, prompt_text, timeout=10):
        """Ask a question and wait for voice response"""
        self.speak(prompt_text)
        time.sleep(0.5)  # Small pause before listening
        return self.listen(timeout)


def voice_conversation(agent, customer_name, diagnosis):
    """Conduct voice-based conversation"""
    
    print("\n" + "="*70)
    print(Fore.CYAN + Style.BRIGHT + "📞 INCOMING CALL FROM ABC MOTORS...")
    print("="*70 + "\n")
    
    # Greeting
    greeting = f"Hello {customer_name}! This is Maya from ABC Motors Service Center. " \
               f"I hope I'm not catching you at a bad time?"
    agent.speak(greeting)
    time.sleep(1)
    
    response1 = agent.listen(timeout=8)
    
    # Introduction to issue
    intro = "Great! I'm calling about your vehicle. Our monitoring system has detected " \
            "some important maintenance alerts that I wanted to discuss with you."
    agent.speak(intro)
    time.sleep(1)
    
    # Explain the issues
    issues = "Our analysis shows two critical issues. First, your brake pads are at " \
             "78 percent wear, which is very high. Second, your oil pressure is low at " \
             "35 PSI when it should be above 40. Both of these need immediate attention."
    agent.speak(issues)
    time.sleep(1)
    
    # Safety concern
    safety = "I want to emphasize that these are safety-critical issues. The brake wear " \
             "could affect your stopping distance, and low oil pressure can cause serious " \
             "engine damage if not addressed within the next 7 to 10 days."
    agent.speak(safety)
    time.sleep(1)
    
    # Cost information
    cost_info = "The good news is we caught this early. The repair would cost approximately " \
                "5,000 to 10,000 rupees for both issues. However, if we wait, the cost could " \
                "triple if the brake rotors get damaged or the engine develops problems."
    agent.speak(cost_info)
    time.sleep(1)
    
    # Ask about scheduling
    scheduling_question = "Would you like to schedule a service appointment? We have slots " \
                         "available tomorrow morning at 10 AM or afternoon at 2 PM. " \
                         "Which would work better for you?"
    response2 = agent.wait_for_response(scheduling_question, timeout=12)
    
    # Process response
    if any(word in response2 for word in ["yes", "sure", "okay", "ok", "schedule", "book", "tomorrow", "morning", "afternoon", "10", "2"]):
        confirmation = "Excellent decision! I'm so glad we could catch this early. "
        
        if "morning" in response2 or "10" in response2:
            confirmation += "I've scheduled you for tomorrow at 10 AM. "
        elif "afternoon" in response2 or "2" in response2:
            confirmation += "I've scheduled you for tomorrow at 2 PM. "
        else:
            confirmation += "I've scheduled you for tomorrow at 10 AM. "
        
        confirmation += "You'll receive a confirmation SMS shortly with all the details. " \
                       "We offer free pickup and drop-off service, so you don't need to worry " \
                       "about transportation. Is there anything else I can help you with?"
        agent.speak(confirmation)
        
        final_response = agent.listen(timeout=8)
        
        if any(word in final_response for word in ["no", "nothing", "that's all", "nope"]):
            closing = "Perfect! Thank you so much for your time. We'll see you tomorrow. " \
                     "Drive safely until then, and avoid heavy braking if possible. Have a great day!"
        else:
            closing = "I'm glad I could help. If you have any questions before your appointment, " \
                     "feel free to call us anytime. Thank you and drive safely!"
        agent.speak(closing)
        
        print(Fore.GREEN + Style.BRIGHT + "\n✅ APPOINTMENT CONFIRMED!")
        print(Fore.WHITE + "📅 Date: Tomorrow")
        print(Fore.WHITE + "⏰ Time: 10:00 AM or 2:00 PM")
        print(Fore.WHITE + "💰 Estimated cost: ₹5,000-10,000")
        
    elif any(word in response2 for word in ["busy", "later", "think", "wait", "not sure"]):
        concern = "I completely understand you need time to think. However, I want to stress " \
                 "that this is a safety issue, especially the brakes. For your family's safety, " \
                 "I strongly recommend getting this checked within the next 7 days. " \
                 "Can I call you back in two days to follow up?"
        agent.speak(concern)
        
        follow_up_response = agent.listen(timeout=8)
        
        if "yes" in follow_up_response or "okay" in follow_up_response:
            follow_up = "Perfect! I'll call you back on Wednesday. In the meantime, please avoid " \
                       "highway driving and heavy braking. If you hear any unusual sounds, " \
                       "please call our emergency line immediately. Stay safe!"
        else:
            follow_up = "I understand. Please do consider the safety implications. You can reach us " \
                       "anytime at our service center. Take care and drive carefully!"
        agent.speak(follow_up)
        
    else:
        clarification = "I want to make sure you understand the urgency. These issues could lead " \
                       "to a dangerous situation if not addressed soon. Would you like me to " \
                       "explain the risks again, or would you prefer to schedule an appointment now?"
        agent.speak(clarification)
        
        final = agent.listen(timeout=10)
        
        if "schedule" in final or "appointment" in final or "yes" in final:
            booking = "Great choice! Let me book you for tomorrow at 10 AM. You'll receive a " \
                     "confirmation message shortly. Thank you for prioritizing your safety!"
            agent.speak(booking)
        else:
            last_try = "Alright. Please do think about it seriously. Your vehicle needs attention " \
                      "within the next week. We're here to help whenever you're ready. Drive safely!"
            agent.speak(last_try)
    
    print("\n" + Fore.MAGENTA + "━" * 70)
    print(Fore.GREEN + Style.BRIGHT + "📞 Call Ended")
    print(Fore.MAGENTA + "━" * 70 + "\n")


def run_voice_demo():
    """Run the voice-enabled demo"""
    
    if not os.getenv("OPENAI_API_KEY"):
        print(Fore.RED + "❌ ERROR: OpenAI API key not found!")
        return
    
    print("\n" + "="*70)
    print(Fore.CYAN + Style.BRIGHT + """
    ╔══════════════════════════════════════════════════════════════╗
    ║        🎤  VOICE-ENABLED CUSTOMER CALL DEMO  🔊              ║
    ║           Talk Naturally - AI Responds by Voice              ║
    ╚══════════════════════════════════════════════════════════════╝
    """)
    print("="*70 + "\n")
    
    print(Fore.YELLOW + "🎯 Instructions:")
    print("  • Speak clearly into your microphone")
    print("  • Wait for the AI to finish speaking before responding")
    print("  • Answer naturally (yes/no/maybe/etc.)")
    print("  • Make sure your microphone is working\n")
    
    # Test microphone
    print(Fore.CYAN + "🎤 Microphone Test:")
    print(Fore.YELLOW + "Say 'test' to check if your microphone is working...")
    
    voice_agent = VoiceCallAgent()
    test_result = voice_agent.listen(timeout=5)
    
    if not test_result:
        print(Fore.RED + "⚠️ Microphone test failed. Please check your microphone settings.")
        print(Fore.YELLOW + "Continue anyway? (Press Enter)")
        input()
    else:
        print(Fore.GREEN + "✓ Microphone is working!")
    
    # Choose vehicle (text input for simplicity)
    print(Fore.CYAN + "\nSelect vehicle:")
    print("  1. VEH001 - 2020 Maruti Swift (Mr. Rajesh Sharma)")
    print("  2. VEH002 - 2022 Tata Nexon EV (Ms. Priya Patel)")
    
    choice = input(Fore.YELLOW + "\nEnter 1 or 2: ").strip()
    vehicle_id = "VEH001" if choice == "1" else "VEH002"
    
    vehicle_data = get_vehicle(vehicle_id)
    if not vehicle_data:
        print(Fore.RED + "Vehicle not found!")
        return
    
    customer_name = vehicle_data["owner"].split()[-1]  # Use last name for natural speech
    
    print(Fore.GREEN + f"\n✓ Vehicle: {vehicle_data['year']} {vehicle_data['model']}")
    print(Fore.GREEN + f"✓ Customer: {vehicle_data['owner']}")
    
    input(Fore.CYAN + "\n📞 Press Enter to receive the call...\n")
    
    try:
        # Analyze vehicle and generate diagnosis
        print(Fore.BLUE + "🔄 Analyzing vehicle data...")
        analysis_agent = DataAnalysisAgent()
        analysis = analysis_agent.analyze(vehicle_data)
        
        print(Fore.BLUE + "🔄 Generating diagnosis...")
        diagnosis_agent = DiagnosisAgent()
        diagnosis = diagnosis_agent.diagnose(analysis, {
            "model": vehicle_data["model"],
            "year": vehicle_data["year"],
            "type": vehicle_data["type"]
        })
        
        print(Fore.GREEN + "✓ Ready for voice call!\n")
        time.sleep(1)
        
        # Start voice conversation
        voice_conversation(voice_agent, customer_name, diagnosis)
        
        print(Fore.GREEN + Style.BRIGHT + "\n✅ VOICE DEMO COMPLETE!")
        
    except Exception as e:
        print(Fore.RED + f"\n❌ Error: {str(e)}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    run_voice_demo()