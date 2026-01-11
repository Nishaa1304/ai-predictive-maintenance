"""
AI Predictive Maintenance - Backend API Server
FastAPI server connecting AI agents to frontend
"""

import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv
import uvicorn

load_dotenv()

from agents.data_analysis_agent.agent import DataAnalysisAgent
from agents.diagnosis_agent.agent import DiagnosisAgent
from agents.customer_engagement_agent.agent import CustomerEngagementAgent
from agents.scheduling_agent.agent import SchedulingAgent
from agents.feedback_agent.agent import FeedbackAgent
from utils.mock_data import get_vehicle, get_all_vehicles

app = FastAPI(
    title="AI Predictive Maintenance API",
    description="Backend API for Automotive Predictive Maintenance System",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request models
class VehicleAnalysisRequest(BaseModel):
    vehicle_id: str

class DiagnosisRequest(BaseModel):
    vehicle_id: str
    analysis: str

class CallScriptRequest(BaseModel):
    customer_name: str
    diagnosis: str

class AppointmentRequest(BaseModel):
    name: str
    phone: str
    preferred_time: Optional[str] = "morning"


# API Routes
@app.get("/")
def root():
    """Root endpoint"""
    return {
        "message": "AI Predictive Maintenance API",
        "status": "running",
        "version": "1.0.0",
        "endpoints": {
            "health": "/api/health",
            "vehicles": "/api/vehicles",
            "docs": "/docs"
        }
    }

@app.get("/api/health")
def health_check():
    """Health check endpoint"""
    api_key_status = "configured" if os.getenv("OPENAI_API_KEY") else "missing"
    return {
        "status": "healthy",
        "api_key": api_key_status,
        "agents": ["data_analysis", "diagnosis", "customer_engagement", "scheduling", "feedback"]
    }

@app.get("/api/vehicles")
def list_vehicles():
    """Get all available vehicles"""
    vehicles = get_all_vehicles()
    return {
        "success": True,
        "count": len(vehicles),
        "vehicles": vehicles
    }

@app.get("/api/vehicles/{vehicle_id}")
def get_vehicle_details(vehicle_id: str):
    """Get specific vehicle information"""
    vehicle = get_vehicle(vehicle_id)
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return {
        "success": True,
        "vehicle": vehicle
    }

@app.post("/api/analyze")
async def analyze_vehicle(request: VehicleAnalysisRequest):
    """Analyze vehicle sensor data"""
    vehicle = get_vehicle(request.vehicle_id)
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    
    try:
        agent = DataAnalysisAgent()
        analysis = agent.analyze(vehicle)
        return {
            "success": True,
            "vehicle_id": request.vehicle_id,
            "analysis": analysis
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/diagnose")
async def diagnose_vehicle(request: DiagnosisRequest):
    """Generate diagnosis from analysis"""
    vehicle = get_vehicle(request.vehicle_id)
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    
    try:
        agent = DiagnosisAgent()
        vehicle_info = {
            "model": vehicle["model"],
            "year": vehicle["year"],
            "type": vehicle["type"]
        }
        diagnosis = agent.diagnose(request.analysis, vehicle_info)
        return {
            "success": True,
            "diagnosis": diagnosis
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/call-script")
async def generate_call_script(request: CallScriptRequest):
    """Generate customer call script"""
    try:
        agent = CustomerEngagementAgent()
        script = agent.generate_call_script(request.customer_name, request.diagnosis)
        return {
            "success": True,
            "script": script
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/schedule")
async def schedule_appointment(request: AppointmentRequest):
    """Schedule maintenance appointment"""
    try:
        agent = SchedulingAgent()
        booking = agent.schedule_appointment({
            "name": request.name,
            "phone": request.phone,
            "preferred_time": request.preferred_time
        })
        return {
            "success": True,
            "booking": booking
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/feedback")
async def get_feedback_survey():
    """Get customer feedback survey"""
    try:
        agent = FeedbackAgent()
        survey = agent.generate_survey()
        return {
            "success": True,
            "survey": survey
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/complete-workflow/{vehicle_id}")
async def complete_workflow(vehicle_id: str):
    """Run complete maintenance workflow"""
    vehicle = get_vehicle(vehicle_id)
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    
    try:
        # Step 1: Analysis
        print(f"Analyzing vehicle {vehicle_id}...")
        analysis_agent = DataAnalysisAgent()
        analysis = analysis_agent.analyze(vehicle)
        
        # Step 2: Diagnosis
        print(f"Generating diagnosis...")
        diagnosis_agent = DiagnosisAgent()
        vehicle_info = {
            "model": vehicle["model"],
            "year": vehicle["year"],
            "type": vehicle["type"]
        }
        diagnosis = diagnosis_agent.diagnose(analysis, vehicle_info)
        
        # Step 3: Call Script
        print(f"Generating call script...")
        engagement_agent = CustomerEngagementAgent()
        call_script = engagement_agent.generate_call_script(vehicle["owner"], diagnosis)
        
        return {
            "success": True,
            "vehicle_id": vehicle_id,
            "vehicle_info": {
                "model": vehicle["model"],
                "year": vehicle["year"],
                "owner": vehicle["owner"],
                "type": vehicle["type"]
            },
            "analysis": analysis,
            "diagnosis": diagnosis,
            "call_script": call_script
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    print("\n" + "="*70)
    print("🚗 AI PREDICTIVE MAINTENANCE - BACKEND SERVER")
    print("="*70)
    print("\n📡 Server: http://localhost:8000")
    print("📚 API Docs: http://localhost:8000/docs")
    print("🔧 Health Check: http://localhost:8000/api/health")
    print("📋 Vehicles: http://localhost:8000/api/vehicles")
    print("\n" + "="*70 + "\n")
    
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)