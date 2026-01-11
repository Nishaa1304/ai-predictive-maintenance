// API Service for AI Predictive Maintenance
const API_BASE_URL = 'http://localhost:8000';

export const api = {
  // Health check
  async checkHealth() {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    return response.json();
  },

  // Get all vehicles
  async getVehicles() {
    const response = await fetch(`${API_BASE_URL}/api/vehicles`);
    return response.json();
  },

  // Get specific vehicle
  async getVehicle(vehicleId) {
    const response = await fetch(`${API_BASE_URL}/api/vehicles/${vehicleId}`);
    return response.json();
  },

  // Complete workflow (Analysis + Diagnosis + Call Script)
  async completeWorkflow(vehicleId) {
    const response = await fetch(`${API_BASE_URL}/api/complete-workflow/${vehicleId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    return response.json();
  },

  // Analyze vehicle
  async analyzeVehicle(vehicleId) {
    const response = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vehicle_id: vehicleId })
    });
    return response.json();
  },

  // Get diagnosis
  async getDiagnosis(vehicleId, analysis) {
    const response = await fetch(`${API_BASE_URL}/api/diagnose`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vehicle_id: vehicleId, analysis })
    });
    return response.json();
  },

  // Generate call script
  async generateCallScript(customerName, diagnosis) {
    const response = await fetch(`${API_BASE_URL}/api/call-script`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customer_name: customerName, diagnosis })
    });
    return response.json();
  },

  // Schedule appointment
  async scheduleAppointment(name, phone, preferredTime) {
    const response = await fetch(`${API_BASE_URL}/api/schedule`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, preferred_time: preferredTime })
    });
    return response.json();
  },

  // Get feedback survey
  async getFeedbackSurvey() {
    const response = await fetch(`${API_BASE_URL}/api/feedback`);
    return response.json();
  }
};

export default api;