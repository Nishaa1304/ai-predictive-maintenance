"""
Mock Vehicle Data for Testing and Demo
Contains sample sensor readings for ICE and EV vehicles
"""

# Sample Vehicle Database
VEHICLES = {
    "VEH001": {
        "vehicle_id": "VEH001",
        "type": "ICE",
        "model": "Maruti Swift",
        "year": 2020,
        "owner": "Mr. Rajesh Sharma",
        "phone": "9876543210",
        "sensor_data": {
            "engine_temp": 92,
            "oil_pressure": 35,
            "battery_voltage": 12.3,
            "brake_wear": 78,
            "coolant_level": 65,
            "tire_pressure": 32
        }
    },
    "VEH002": {
        "vehicle_id": "VEH002",
        "type": "EV",
        "model": "Tata Nexon EV",
        "year": 2022,
        "owner": "Ms. Priya Patel",
        "phone": "9123456789",
        "sensor_data": {
            "battery_soh": 72,
            "battery_temp": 58,
            "motor_temp": 92,
            "brake_wear": 55,
            "range_remaining": 85,
            "charging_cycles": 450
        }
    },
    "VEH003": {
        "vehicle_id": "VEH003",
        "type": "ICE",
        "model": "Honda City",
        "year": 2021,
        "owner": "Mr. Amit Kumar",
        "phone": "9898989898",
        "sensor_data": {
            "engine_temp": 86,
            "oil_pressure": 48,
            "battery_voltage": 13.8,
            "brake_wear": 45,
            "coolant_level": 85,
            "tire_pressure": 33
        }
    }
}


def get_vehicle(vehicle_id):
    """
    Get vehicle data by ID
    
    Args:
        vehicle_id: Vehicle identifier (e.g., 'VEH001')
        
    Returns:
        Dictionary with vehicle data or None if not found
    """
    return VEHICLES.get(vehicle_id)


def get_all_vehicles():
    """
    Get all available vehicles
    
    Returns:
        Dictionary of all vehicles
    """
    return VEHICLES


# Test functions
if __name__ == "__main__":
    print("Testing mock_data functions...")
    
    # Test get_vehicle
    vehicle = get_vehicle("VEH001")
    if vehicle:
        print(f"✓ Found vehicle: {vehicle['model']}")
    else:
        print("✗ Vehicle not found")
    
    # Test get_all_vehicles
    all_vehicles = get_all_vehicles()
    print(f"✓ Total vehicles: {len(all_vehicles)}")
    
    for vid, data in all_vehicles.items():
        print(f"  {vid}: {data['year']} {data['model']}")