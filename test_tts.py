"""
Test Text-to-Speech (Works without internet)
"""

import pyttsx3

print("Testing Text-to-Speech...")
print("="*50)

try:
    # Initialize TTS engine
    engine = pyttsx3.init()
    
    # Get available voices
    voices = engine.getProperty('voices')
    print(f"✓ Found {len(voices)} voices:")
    for i, voice in enumerate(voices[:3]):
        print(f"  {i+1}. {voice.name}")
    
    # Test speech
    print("\n🔊 Speaking test message...")
    engine.say("Hello! This is the AI voice agent test. Text to speech is working properly.")
    engine.runAndWait()
    
    print("✅ Text-to-Speech is WORKING!")
    
except Exception as e:
    print(f"❌ Error: {e}")
