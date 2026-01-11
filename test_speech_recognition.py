"""
Test Speech Recognition (Needs microphone and internet)
"""

import speech_recognition as sr

print("Testing Speech Recognition...")
print("="*50)

try:
    # Initialize recognizer
    recognizer = sr.Recognizer()
    
    # List microphones
    print("Available microphones:")
    for index, name in enumerate(sr.Microphone.list_microphone_names()):
        print(f"  {index}: {name}")
    
    # Test microphone
    print("\n🎤 Testing microphone...")
    with sr.Microphone() as source:
        print("✓ Microphone connected")
        print("🔧 Adjusting for ambient noise (please wait 2 seconds)...")
        recognizer.adjust_for_ambient_noise(source, duration=2)
        print("✓ Calibration complete")
        
        print("\n📢 Say something (you have 5 seconds)...")
        try:
            audio = recognizer.listen(source, timeout=5, phrase_time_limit=5)
            print("✓ Audio captured")
            
            print("🔄 Converting speech to text...")
            text = recognizer.recognize_google(audio)
            print(f"✅ You said: '{text}'")
            
        except sr.WaitTimeoutError:
            print("⏱️ Timeout - No speech detected")
        except sr.UnknownValueError:
            print("❓ Could not understand audio")
        except sr.RequestError as e:
            print(f"⚠️ Google Speech Recognition error: {e}")
            print("   (This needs internet connection)")
    
except Exception as e:
    print(f"❌ Error: {e}")
