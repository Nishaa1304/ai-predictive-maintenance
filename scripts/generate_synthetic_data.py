"""
Python script to generate synthetic vehicle telemetry data for demo
"""
import random
import json
from datetime import datetime, timedelta
import pandas as pd
import numpy as np

class VehicleDataGenerator:
    """Generate synthetic vehicle telemetry data"""
    
    def __init__(self, num_vehicles: int = 50):
        self.num_vehicles = num_vehicles
        self.vehicle_ids = [f"VIN{str(i).zfill(5)}" for i in range(1, num_vehicles + 1)]
        
    def generate_normal_telemetry(self, vehicle_id: str, timestamp: datetime) -> dict:
        """Generate normal operating telemetry"""
        return {
            "vehicle_id": vehicle_id,
            "timestamp": timestamp.isoformat(),
            "engine_temperature": random.uniform(85, 95),  # Celsius
            "battery_voltage": random.uniform(13.5, 14.5),  # Volts
            "oil_pressure": random.uniform(40, 60),  # PSI
            "coolant_temperature": random.uniform(80, 90),  # Celsius
            "rpm": random.uniform(1000, 3000),
            "speed": random.uniform(0, 120),  # km/h
            "fuel_level": random.uniform(20, 100),  # Percentage
            "odometer": random.uniform(10000, 150000),  # km
            "vibration_level": random.uniform(0.1, 0.3),
            "brake_pad_thickness": random.uniform(8, 12),  # mm
            "tire_pressure_fl": random.uniform(30, 35),  # PSI
            "tire_pressure_fr": random.uniform(30, 35),
            "tire_pressure_rl": random.uniform(30, 35),
            "tire_pressure_rr": random.uniform(30, 35),
        }
    
    def generate_faulty_telemetry(self, vehicle_id: str, timestamp: datetime, 
                                  fault_type: str) -> dict:
        """Generate telemetry with faults"""
        data = self.generate_normal_telemetry(vehicle_id, timestamp)
        
        if fault_type == "battery_failure":
            data["battery_voltage"] = random.uniform(11.5, 12.5)
            data["dtc_codes"] = ["P0562"]
            
        elif fault_type == "overheating":
            data["engine_temperature"] = random.uniform(105, 120)
            data["coolant_temperature"] = random.uniform(95, 110)
            data["dtc_codes"] = ["P0217", "P0218"]
            
        elif fault_type == "oil_pressure_low":
            data["oil_pressure"] = random.uniform(15, 30)
            data["dtc_codes"] = ["P0524"]
            
        elif fault_type == "brake_wear":
            data["brake_pad_thickness"] = random.uniform(2, 4)
            data["vibration_level"] = random.uniform(0.5, 0.8)
            
        return data
    
    def generate_time_series(self, vehicle_id: str, days: int = 7, 
                            interval_minutes: int = 60) -> list:
        """Generate time series data for a vehicle"""
        data_points = []
        start_time = datetime.now() - timedelta(days=days)
        
        # Decide if this vehicle will have faults
        has_fault = random.random() < 0.3  # 30% chance of fault
        fault_type = random.choice([
            "battery_failure", "overheating", "oil_pressure_low", "brake_wear"
        ]) if has_fault else None
        
        fault_start_day = random.randint(days // 2, days) if has_fault else days + 1
        
        current_time = start_time
        while current_time < datetime.now():
            days_elapsed = (current_time - start_time).days
            
            if has_fault and days_elapsed >= fault_start_day:
                data = self.generate_faulty_telemetry(vehicle_id, current_time, fault_type)
            else:
                data = self.generate_normal_telemetry(vehicle_id, current_time)
            
            data_points.append(data)
            current_time += timedelta(minutes=interval_minutes)
        
        return data_points
    
    def generate_fleet_data(self, days: int = 7, output_format: str = "json") -> str:
        """Generate data for entire fleet"""
        all_data = []
        
        print(f"Generating data for {self.num_vehicles} vehicles...")
        
        for vehicle_id in self.vehicle_ids:
            vehicle_data = self.generate_time_series(vehicle_id, days)
            all_data.extend(vehicle_data)
        
        print(f"Generated {len(all_data)} data points")
        
        if output_format == "json":
            output_file = "data/synthetic/fleet_telemetry.json"
            with open(output_file, 'w') as f:
                json.dump(all_data, f, indent=2)
            print(f"Data saved to {output_file}")
            
        elif output_format == "csv":
            output_file = "data/synthetic/fleet_telemetry.csv"
            df = pd.DataFrame(all_data)
            df.to_csv(output_file, index=False)
            print(f"Data saved to {output_file}")
        
        return output_file
    
    def generate_demo_scenario(self) -> dict:
        """Generate a specific scenario for demo"""
        vehicle_id = "VINDEMO001"
        
        # Create a vehicle that will have alternator failure
        scenario = {
            "vehicle_id": vehicle_id,
            "owner_name": "John Smith",
            "owner_phone": "+1-555-0123",
            "vehicle_make": "Tesla",
            "vehicle_model": "Model 3",
            "vehicle_year": 2022,
            "current_telemetry": self.generate_faulty_telemetry(
                vehicle_id, 
                datetime.now(), 
                "battery_failure"
            ),
            "predicted_failure": {
                "component": "Alternator",
                "confidence": 0.87,
                "time_to_failure_days": 3,
                "severity": "high"
            },
            "service_centers": [
                {
                    "name": "AutoCare Center",
                    "distance_km": 5,
                    "available_slots": [
                        "2025-11-22 10:00",
                        "2025-11-22 14:00",
                        "2025-11-23 09:00"
                    ]
                }
            ]
        }
        
        output_file = "data/synthetic/demo_scenario.json"
        with open(output_file, 'w') as f:
            json.dump(scenario, f, indent=2)
        
        print(f"Demo scenario saved to {output_file}")
        return scenario


if __name__ == "__main__":
    # Generate synthetic data
    generator = VehicleDataGenerator(num_vehicles=50)
    
    # Generate fleet data
    generator.generate_fleet_data(days=7, output_format="json")
    generator.generate_fleet_data(days=7, output_format="csv")
    
    # Generate demo scenario
    generator.generate_demo_scenario()
    
    print("✅ Synthetic data generation complete!")
