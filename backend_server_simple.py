"""
Simplified FastAPI backend for deployment
Agents functionality will be added in future updates
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import os

app = FastAPI(title="AI Predictive Maintenance API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:3000").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "AI Predictive Maintenance API",
        "status": "operational",
        "version": "1.0.0"
    }

@app.get("/health")
@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0"
    }

@app.get("/api/vehicles")
async def get_vehicles():
    return {
        "vehicles": [
            {"vehicle_id": "VEH001", "model": "2020 Maruti Swift", "status": "active"},
            {"vehicle_id": "VEH002", "model": "2022 Tata Nexon EV", "status": "active"},
            {"vehicle_id": "VEH003", "model": "2021 Hyundai Creta", "status": "active"}
        ]
    }

@app.get("/api/alerts")
async def get_alerts():
    return {
        "alerts": [
            {"id": 1, "type": "critical", "message": "Brake temperature spike", "vehicle_id": "VEH001"},
            {"id": 2, "type": "warning", "message": "Battery degradation", "vehicle_id": "VEH002"}
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))
