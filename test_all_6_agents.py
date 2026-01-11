"""
Complete Test for All 6 AI Agents
"""

import os
from dotenv import load_dotenv

load_dotenv()

# Check API key
if not os.getenv("OPENAI_API_KEY"):
    print("❌ ERROR: OpenAI API key not found!")
    exit(1)

from agents.data_analysis_agent.agent import DataAnalysisAgent
from agents.diagnosis_agent.agent import DiagnosisAgent
from agents.customer_engagement_agent.agent import CustomerEngagementAgent
from utils.mock_data import get_vehicle

print("\n" + "="*70)
print("🧪 TESTING ALL 6 AI AGENTS")
print("="*70 + "\n")

# Get test vehicle
vehicle = get_vehicle("VEH001")
print(f"📋 Test Vehicle: {vehicle['year']} {vehicle['model']}")
print(f"Owner: {vehicle['owner']}\n")

results = {}

# ============================================
# AGENT 1: Data Analysis Agent
# ============================================
try:
    print("="*70)
    print("🔍 AGENT 1: DATA ANALYSIS AGENT")
    print("="*70)
    agent1 = DataAnalysisAgent()
    analysis = agent1.analyze(vehicle)
    results['agent1'] = "✅ WORKING"
    print(analysis[:300] + "...\n")
except Exception as e:
    results['agent1'] = f"❌ FAILED: {str(e)}"
    print(f"❌ Error: {e}\n")
    analysis = None

# ============================================
# AGENT 2: Diagnosis Agent
# ============================================
try:
    print("="*70)
    print("🔧 AGENT 2: DIAGNOSIS AGENT")
    print("="*70)
    if analysis:
        agent2 = DiagnosisAgent()
        diagnosis = agent2.diagnose(analysis, {
            "model": vehicle["model"],
            "year": vehicle["year"],
            "type": vehicle["type"]
        })
        results['agent2'] = "✅ WORKING"
        print(diagnosis[:300] + "...\n")
    else:
        results['agent2'] = "⏭️ SKIPPED (Agent 1 failed)"
        diagnosis = None
except Exception as e:
    results['agent2'] = f"❌ FAILED: {str(e)}"
    print(f"❌ Error: {e}\n")
    diagnosis = None

# ============================================
# AGENT 3: Customer Engagement Agent
# ============================================
try:
    print("="*70)
    print("📞 AGENT 3: CUSTOMER ENGAGEMENT AGENT")
    print("="*70)
    if diagnosis:
        agent3 = CustomerEngagementAgent()
        script = agent3.generate_call_script(vehicle["owner"], diagnosis)
        results['agent3'] = "✅ WORKING"
        print(script[:300] + "...\n")
    else:
        results['agent3'] = "⏭️ SKIPPED (Agent 2 failed)"
except Exception as e:
    results['agent3'] = f"❌ FAILED: {str(e)}"
    print(f"❌ Error: {e}\n")

# ============================================
# AGENT 4: Scheduling Agent
# ============================================
try:
    print("="*70)
    print("📅 AGENT 4: SCHEDULING AGENT")
    print("="*70)
    from agents.scheduling_agent.agent import SchedulingAgent
    agent4 = SchedulingAgent()
    appointment = agent4.schedule_appointment({
        "name": vehicle["owner"],
        "phone": vehicle["phone"],
        "preferred_time": "morning"
    })
    results['agent4'] = "✅ WORKING"
    print(appointment[:200] + "...\n")
except ImportError:
    results['agent4'] = "⚠️ NOT IMPLEMENTED"
    print("⚠️ Scheduling Agent not implemented yet\n")
except Exception as e:
    results['agent4'] = f"❌ FAILED: {str(e)}"
    print(f"❌ Error: {e}\n")

# ============================================
# AGENT 5: Feedback Agent
# ============================================
try:
    print("="*70)
    print("📊 AGENT 5: FEEDBACK AGENT")
    print("="*70)
    from agents.feedback_agent.agent import FeedbackAgent
    agent5 = FeedbackAgent()
    survey = agent5.generate_survey()
    results['agent5'] = "✅ WORKING"
    print(survey[:200] + "...\n")
except ImportError:
    results['agent5'] = "⚠️ NOT IMPLEMENTED"
    print("⚠️ Feedback Agent not implemented yet\n")
except Exception as e:
    results['agent5'] = f"❌ FAILED: {str(e)}"
    print(f"❌ Error: {e}\n")

# ============================================
# AGENT 6: Manufacturing Insights Agent
# ============================================
try:
    print("="*70)
    print("🏭 AGENT 6: MANUFACTURING INSIGHTS AGENT")
    print("="*70)
    from agents.manufacturing_insights_agent.agent import ManufacturingInsightsAgent
    agent6 = ManufacturingInsightsAgent()
    
    # Mock defect data
    defect_data = [
        {"issue": "Brake wear", "frequency": 15, "vehicle_id": "VEH001"},
        {"issue": "Oil pressure low", "frequency": 8, "vehicle_id": "VEH001"},
        {"issue": "Battery issues", "frequency": 5, "vehicle_id": "VEH002"}
    ]
    
    insights = agent6.analyze_defects(defect_data)
    results['agent6'] = "✅ WORKING"
    print(insights[:200] + "...\n")
except ImportError:
    results['agent6'] = "⚠️ NOT IMPLEMENTED"
    print("⚠️ Manufacturing Insights Agent not implemented yet\n")
except AttributeError:
    results['agent6'] = "⚠️ METHOD NOT FOUND"
    print("⚠️ Agent exists but analyze_defects method not found\n")
except Exception as e:
    results['agent6'] = f"❌ FAILED: {str(e)}"
    print(f"❌ Error: {e}\n")

# ============================================
# SUMMARY
# ============================================
print("="*70)
print("📊 TEST SUMMARY")
print("="*70)

working = sum(1 for v in results.values() if "✅" in v)
not_implemented = sum(1 for v in results.values() if "⚠️" in v)
failed = sum(1 for v in results.values() if "❌" in v)

for agent, status in results.items():
    print(f"{agent.upper()}: {status}")

print("\n" + "="*70)
print(f"✅ Working: {working}/6")
print(f"⚠️ Not Implemented: {not_implemented}/6")
print(f"❌ Failed: {failed}/6")
print("="*70 + "\n")

if working >= 3:
    print("🎉 Great! At least 3 core agents are working!")
else:
    print("⚠️ Only {} agents working. Need to fix more agents.".format(working))