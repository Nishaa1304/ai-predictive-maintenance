"""Test Suite for Automotive Agentic AI"""

import os
import sys
from pathlib import Path

project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

import pytest
from dotenv import load_dotenv

load_dotenv()

if not os.getenv("OPENAI_API_KEY"):
    pytest.skip("OpenAI API key not found", allow_module_level=True)


class TestDataAnalysisAgent:
    def test_agent_initialization(self):
        from agents.data_analysis_agent.agent import DataAnalysisAgent
        agent = DataAnalysisAgent()
        assert agent is not None
        print("✓ Data Analysis Agent initialized")


class TestDiagnosisAgent:
    def test_agent_initialization(self):
        from agents.diagnosis_agent.agent import DiagnosisAgent
        agent = DiagnosisAgent()
        assert agent is not None
        print("✓ Diagnosis Agent initialized")


class TestCustomerEngagementAgent:
    def test_agent_initialization(self):
        from agents.customer_engagement_agent.agent import CustomerEngagementAgent
        agent = CustomerEngagementAgent()
        assert agent is not None
        print("✓ Customer Engagement Agent initialized")


if __name__ == "__main__":
    print("\n" + "="*60)
    print("🧪 AUTOMOTIVE AGENTIC AI - TEST SUITE")
    print("="*60 + "\n")
    
    pytest.main([__file__, "-v", "-s"])