'use client';

import { useState, useEffect } from 'react';

interface VehicleOwnerDashboardProps {
  vehicleId: string;
  onClose: () => void;
}

export default function VehicleOwnerDashboard({ vehicleId, onClose }: VehicleOwnerDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const handleQuickAction = (action: string) => {
    setSelectedAction(action);
    setTimeout(() => setSelectedAction(null), 3000);
  };

  const handleBookService = () => {
    setShowBookingModal(true);
  };

  const confirmBooking = () => {
    setShowBookingModal(false);
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 4000);
  };

  // Mock vehicle data
  const vehicleData = {
    VEH001: {
      model: '2020 Maruti Swift',
      vin: 'MA3FYD71S00123456',
      owner: 'Mr. Rajesh Sharma',
      registration: 'MH02AB1234',
      color: 'Pearl White',
      mileage: '42,350 km',
      fuelType: 'Petrol',
      healthScore: 82,
      lastService: 'Dec 15, 2025',
      nextService: 'Mar 15, 2026',
      serviceDue: '45 days',
      activeIssues: [
        { severity: 'high', component: 'Brake System', issue: 'Brake pad wear detected - 15% remaining', action: 'Schedule replacement within 2 weeks' },
        { severity: 'medium', component: 'Battery', issue: 'Battery voltage fluctuation', action: 'Check and clean terminals' }
      ],
      predictedIssues: [
        { probability: 78, component: 'Front Brake Pads', timeframe: '1-2 weeks', cost: '₹2,500' },
        { probability: 45, component: 'Engine Air Filter', timeframe: '1 month', cost: '₹800' },
        { probability: 32, component: 'Spark Plugs', timeframe: '2-3 months', cost: '₹1,200' }
      ],
      recentServices: [
        { date: 'Dec 15, 2025', service: 'Oil Change & Filter', cost: '₹2,800', mileage: '40,000 km' },
        { date: 'Sep 10, 2025', service: 'General Inspection', cost: '₹1,500', mileage: '36,500 km' },
        { date: 'Jun 20, 2025', service: 'AC Service', cost: '₹3,200', mileage: '33,000 km' }
      ],
      drivingInsights: {
        avgSpeed: '45 km/h',
        harshBraking: 12,
        rapidAcceleration: 8,
        idleTime: '2.3 hours/week',
        fuelEfficiency: '17.2 km/l',
        ecoScore: 78
      }
    },
    VEH002: {
      model: '2022 Tata Nexon EV',
      vin: 'MA3FYE82K00234567',
      owner: 'Ms. Priya Patel',
      registration: 'GJ01CD5678',
      color: 'Daytona Grey',
      mileage: '28,450 km',
      fuelType: 'Electric',
      healthScore: 94,
      lastService: 'Jan 5, 2026',
      nextService: 'Jul 5, 2026',
      serviceDue: '175 days',
      activeIssues: [
        { severity: 'low', component: 'Tire Pressure', issue: 'Front left tire pressure slightly low', action: 'Inflate to recommended PSI' }
      ],
      predictedIssues: [
        { probability: 25, component: 'Brake Fluid', timeframe: '3-4 months', cost: '₹1,500' },
        { probability: 18, component: 'Cabin Air Filter', timeframe: '2 months', cost: '₹600' }
      ],
      recentServices: [
        { date: 'Jan 5, 2026', service: 'Battery Health Check', cost: '₹0', mileage: '28,000 km' },
        { date: 'Oct 12, 2025', service: 'Tire Rotation', cost: '₹1,200', mileage: '24,500 km' },
        { date: 'Jul 8, 2025', service: 'Annual Service', cost: '₹4,500', mileage: '20,000 km' }
      ],
      drivingInsights: {
        avgSpeed: '52 km/h',
        harshBraking: 5,
        rapidAcceleration: 15,
        idleTime: '0 hours/week',
        fuelEfficiency: 'N/A (EV)',
        ecoScore: 92,
        batteryHealth: '97%',
        rangeLeft: '320 km'
      }
    },
    VEH003: {
      model: '2021 Hyundai Creta',
      vin: 'MA3FYH55L00345678',
      owner: 'Mr. Amit Kumar',
      registration: 'UP16XY9012',
      color: 'Phantom Black',
      mileage: '35,200 km',
      fuelType: 'Diesel',
      healthScore: 88,
      lastService: 'Nov 22, 2025',
      nextService: 'May 22, 2026',
      serviceDue: '131 days',
      activeIssues: [],
      predictedIssues: [
        { probability: 38, component: 'Diesel Particulate Filter', timeframe: '2-3 months', cost: '₹8,500' },
        { probability: 28, component: 'Front Brake Discs', timeframe: '4-5 months', cost: '₹6,000' }
      ],
      recentServices: [
        { date: 'Nov 22, 2025', service: 'Full Service', cost: '₹5,500', mileage: '35,000 km' },
        { date: 'Aug 15, 2025', service: 'Engine Oil Change', cost: '₹3,200', mileage: '31,000 km' },
        { date: 'May 10, 2025', service: 'Brake Inspection', cost: '₹800', mileage: '27,500 km' }
      ],
      drivingInsights: {
        avgSpeed: '58 km/h',
        harshBraking: 7,
        rapidAcceleration: 10,
        idleTime: '1.8 hours/week',
        fuelEfficiency: '19.5 km/l',
        ecoScore: 85
      }
    }
  };

  const vehicle = vehicleData[vehicleId as keyof typeof vehicleData] || vehicleData.VEH001;
  const isEV = vehicle.fuelType === 'Electric';

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden">
        
        {/* Header - Car Dashboard Style */}
        <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl">
                  🚗
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">{vehicle.model}</h1>
                  <p className="text-orange-100 text-sm">{vehicle.registration} • VIN: {vehicle.vin}</p>
                </div>
              </div>
              <div className="flex gap-4 mt-3">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <p className="text-orange-100 text-xs">Owner</p>
                  <p className="text-white font-semibold">{vehicle.owner}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <p className="text-orange-100 text-xs">Mileage</p>
                  <p className="text-white font-semibold">{vehicle.mileage}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <p className="text-orange-100 text-xs">Fuel Type</p>
                  <p className="text-white font-semibold">{vehicle.fuelType}</p>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-xl transition-all"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(95vh-180px)]">
          
          {/* Health Score & Quick Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            
            {/* Overall Health */}
            <div className="lg:col-span-1 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 text-9xl opacity-10">💚</div>
              <h3 className="text-sm font-semibold mb-2 opacity-90">Overall Vehicle Health</h3>
              <div className="flex items-end gap-3 mb-4">
                <div className="text-6xl font-bold">{vehicle.healthScore}</div>
                <div className="text-2xl mb-2">/100</div>
              </div>
              <div className="w-full bg-white/30 rounded-full h-3 mb-2">
                <div 
                  className="bg-white h-3 rounded-full transition-all"
                  style={{ width: `${vehicle.healthScore}%` }}
                ></div>
              </div>
              <p className="text-sm opacity-90">
                {vehicle.healthScore >= 90 ? '✓ Excellent Condition' : 
                 vehicle.healthScore >= 75 ? '✓ Good Condition' : 
                 '⚠ Needs Attention'}
              </p>
            </div>

            {/* Service Schedule */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-6 border border-gray-600">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">🔧</span>
                Service Schedule
              </h3>
              <div className="space-y-3">
                <div className="bg-gray-900/50 rounded-xl p-3">
                  <p className="text-gray-400 text-xs mb-1">Last Service</p>
                  <p className="text-white font-bold">{vehicle.lastService}</p>
                </div>
                <div className="bg-orange-500/20 border border-orange-500/50 rounded-xl p-3">
                  <p className="text-orange-300 text-xs mb-1">Next Service Due</p>
                  <p className="text-white font-bold">{vehicle.nextService}</p>
                  <p className="text-orange-400 text-sm mt-1">In {vehicle.serviceDue}</p>
                </div>
                <button 
                  onClick={handleBookService}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-xl transition-all"
                >
                  📅 Book Service Now
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-6 border border-gray-600">
              <h3 className="text-white font-bold mb-4">⚡ Quick Actions</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => handleQuickAction('call')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-all text-sm font-semibold"
                >
                  📞 Call Service Center
                </button>
                <button 
                  onClick={() => handleQuickAction('locate')}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl transition-all text-sm font-semibold"
                >
                  🗺️ Locate Nearest Center
                </button>
                <button 
                  onClick={() => handleQuickAction('chat')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition-all text-sm font-semibold"
                >
                  💬 Live Chat Support
                </button>
                <button 
                  onClick={() => handleQuickAction('emergency')}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition-all text-sm font-semibold"
                >
                  🚨 Emergency Roadside Assist
                </button>
              </div>
            </div>
          </div>

          {/* Active Issues Alert */}
          {vehicle.activeIssues.length > 0 && (
            <div className="bg-red-500/10 border-2 border-red-500 rounded-2xl p-6 mb-6">
              <h3 className="text-red-400 font-bold text-xl mb-4 flex items-center gap-2">
                <span className="text-2xl">🚨</span>
                Active Issues Requiring Attention ({vehicle.activeIssues.length})
              </h3>
              <div className="space-y-3">
                {vehicle.activeIssues.map((issue, idx) => (
                  <div key={idx} className={`bg-gray-900/50 border-2 rounded-xl p-4 ${
                    issue.severity === 'high' ? 'border-red-500' : 
                    issue.severity === 'medium' ? 'border-yellow-500' : 
                    'border-blue-500'
                  }`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {issue.severity === 'high' ? '🔴' : issue.severity === 'medium' ? '🟡' : '🔵'}
                        </span>
                        <div>
                          <h4 className="text-white font-bold">{issue.component}</h4>
                          <p className="text-gray-300 text-sm mt-1">{issue.issue}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        issue.severity === 'high' ? 'bg-red-500 text-white' :
                        issue.severity === 'medium' ? 'bg-yellow-500 text-black' :
                        'bg-blue-500 text-white'
                      }`}>
                        {issue.severity.toUpperCase()}
                      </span>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3 mt-3">
                      <p className="text-green-400 text-sm">
                        <strong>Recommended Action:</strong> {issue.action}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Predicted Issues */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 rounded-2xl p-6 mb-6">
            <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
              <span className="text-2xl">🔮</span>
              AI-Predicted Maintenance Needs
            </h3>
            <div className="space-y-3">
              {vehicle.predictedIssues.map((pred, idx) => (
                <div key={idx} className="bg-gray-900/50 border border-gray-600 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-white font-bold">{pred.component}</h4>
                      <p className="text-gray-400 text-sm">Expected: {pred.timeframe}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-400">{pred.probability}%</div>
                      <p className="text-gray-400 text-xs">Probability</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                    <div 
                      className={`h-2 rounded-full ${
                        pred.probability >= 70 ? 'bg-red-500' :
                        pred.probability >= 40 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${pred.probability}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-400 font-semibold">Est. Cost: {pred.cost}</span>
                    <button 
                      onClick={handleBookService}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                    >
                      Schedule Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            
            {/* Recent Service History */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 rounded-2xl p-6">
              <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                <span className="text-2xl">📋</span>
                Recent Service History
              </h3>
              <div className="space-y-3">
                {vehicle.recentServices.map((service, idx) => (
                  <div key={idx} className="bg-gray-900/50 border border-gray-600 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-white font-bold">{service.service}</h4>
                        <p className="text-gray-400 text-sm">{service.date}</p>
                      </div>
                      <span className="text-green-400 font-bold">{service.cost}</span>
                    </div>
                    <p className="text-gray-500 text-xs">Odometer: {service.mileage}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl transition-all font-semibold">
                View Full History →
              </button>
            </div>

            {/* Driving Insights */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 rounded-2xl p-6">
              <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                <span className="text-2xl">📊</span>
                Driving Insights & Behavior
              </h3>
              <div className="space-y-4">
                <div className="bg-blue-500/20 border border-blue-500/50 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-300 text-sm">Eco-Driving Score</span>
                    <span className="text-blue-400 text-2xl font-bold">{vehicle.drivingInsights.ecoScore}/100</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${vehicle.drivingInsights.ecoScore}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <p className="text-gray-400 text-xs mb-1">Avg Speed</p>
                    <p className="text-white font-bold">{vehicle.drivingInsights.avgSpeed}</p>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <p className="text-gray-400 text-xs mb-1">Fuel Efficiency</p>
                    <p className="text-white font-bold">{vehicle.drivingInsights.fuelEfficiency}</p>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <p className="text-gray-400 text-xs mb-1">Harsh Braking</p>
                    <p className="text-yellow-400 font-bold">{vehicle.drivingInsights.harshBraking} events</p>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <p className="text-gray-400 text-xs mb-1">Rapid Acceleration</p>
                    <p className="text-orange-400 font-bold">{vehicle.drivingInsights.rapidAcceleration} events</p>
                  </div>
                </div>

                {isEV && 'batteryHealth' in vehicle.drivingInsights && vehicle.drivingInsights.batteryHealth && (
                  <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-green-300 text-sm">Battery Health</span>
                      <span className="text-green-400 text-xl font-bold">{vehicle.drivingInsights.batteryHealth}</span>
                    </div>
                    <p className="text-green-400 text-sm">Range Left: {'rangeLeft' in vehicle.drivingInsights ? vehicle.drivingInsights.rangeLeft : 'N/A'}</p>
                  </div>
                )}

                <div className="bg-gray-900/50 rounded-lg p-3">
                  <p className="text-gray-400 text-xs mb-1">Weekly Idle Time</p>
                  <p className="text-white font-bold">{vehicle.drivingInsights.idleTime}</p>
                  <p className="text-yellow-400 text-xs mt-1">💡 Tip: Reduce idle time to save fuel</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tips & Recommendations */}
          <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 border-2 border-orange-500/50 rounded-2xl p-6">
            <h3 className="text-orange-400 font-bold text-xl mb-4 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Personalized Recommendations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 rounded-xl p-4">
                <h4 className="text-white font-bold mb-2">🛡️ Warranty Status</h4>
                <p className="text-gray-300 text-sm">Your vehicle warranty expires in 8 months. Consider extended warranty options.</p>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-4">
                <h4 className="text-white font-bold mb-2">💰 Cost Savings</h4>
                <p className="text-gray-300 text-sm">Schedule preventive maintenance now and save up to ₹5,000 on future repairs.</p>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-4">
                <h4 className="text-white font-bold mb-2">🌍 Environmental Impact</h4>
                <p className="text-gray-300 text-sm">Your eco-driving score is {vehicle.drivingInsights.ecoScore}%. Great job reducing emissions!</p>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-4">
                <h4 className="text-white font-bold mb-2">📱 Mobile App</h4>
                <p className="text-gray-300 text-sm">Download our app for real-time alerts and remote vehicle monitoring.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60]">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                📅 Book Service Appointment
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Select Service Type</label>
                <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none">
                  <option>General Service</option>
                  <option>Oil Change</option>
                  <option>Brake Inspection</option>
                  <option>Tire Rotation</option>
                  <option>Battery Check</option>
                  <option>AC Service</option>
                  <option>Custom Service</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Date</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Time</label>
                <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none">
                  <option>9:00 AM - 10:00 AM</option>
                  <option>10:00 AM - 11:00 AM</option>
                  <option>11:00 AM - 12:00 PM</option>
                  <option>2:00 PM - 3:00 PM</option>
                  <option>3:00 PM - 4:00 PM</option>
                  <option>4:00 PM - 5:00 PM</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Additional Notes (Optional)</label>
                <textarea 
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none resize-none"
                  rows={3}
                  placeholder="Any specific concerns or requests..."
                ></textarea>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmBooking}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 rounded-lg transition-all"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Success Notification */}
      {bookingSuccess && (
        <div className="fixed top-8 right-8 z-[70] animate-slide-in">
          <div className="bg-green-500 text-white rounded-xl shadow-2xl p-6 flex items-start gap-4 max-w-md">
            <div className="text-4xl">✅</div>
            <div>
              <h4 className="font-bold text-lg mb-1">Booking Confirmed!</h4>
              <p className="text-sm text-green-100">Your service appointment has been scheduled. We'll send you a confirmation SMS and email shortly.</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Action Notifications */}
      {selectedAction && (
        <div className="fixed top-8 right-8 z-[70] animate-slide-in">
          <div className={`rounded-xl shadow-2xl p-6 flex items-start gap-4 max-w-md ${
            selectedAction === 'emergency' ? 'bg-red-600' : 
            selectedAction === 'call' ? 'bg-blue-600' :
            selectedAction === 'chat' ? 'bg-green-600' :
            'bg-purple-600'
          } text-white`}>
            <div className="text-4xl">
              {selectedAction === 'call' && '📞'}
              {selectedAction === 'locate' && '🗺️'}
              {selectedAction === 'chat' && '💬'}
              {selectedAction === 'emergency' && '🚨'}
            </div>
            <div>
              <h4 className="font-bold text-lg mb-1">
                {selectedAction === 'call' && 'Calling Service Center'}
                {selectedAction === 'locate' && 'Locating Nearest Center'}
                {selectedAction === 'chat' && 'Opening Live Chat'}
                {selectedAction === 'emergency' && 'Emergency Alert Sent'}
              </h4>
              <p className="text-sm opacity-90">
                {selectedAction === 'call' && 'Connecting to: +91-1800-123-4567'}
                {selectedAction === 'locate' && 'Found 3 service centers within 5 km'}
                {selectedAction === 'chat' && 'Agent will respond in ~30 seconds'}
                {selectedAction === 'emergency' && 'Roadside assistance dispatched to your location'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
