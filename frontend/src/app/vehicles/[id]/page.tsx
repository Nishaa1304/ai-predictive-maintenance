'use client'

import { useState } from 'react'
import { ArrowLeft, Phone, AlertTriangle, Activity, Wrench } from 'lucide-react'
import Link from 'next/link'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function VehicleDetail({ params }: { params: { id: string } }) {
  const [showCallTranscript, setShowCallTranscript] = useState(false)

  // Mock telemetry data for charts
  const telemetryData = [
    { time: '00:00', engineTemp: 85, battery: 13.8, oilPressure: 45, brakeTemp: 70 },
    { time: '02:00', engineTemp: 87, battery: 13.7, oilPressure: 44, brakeTemp: 72 },
    { time: '04:00', engineTemp: 90, battery: 13.5, oilPressure: 43, brakeTemp: 75 },
    { time: '06:00', engineTemp: 95, battery: 13.2, oilPressure: 42, brakeTemp: 78 },
    { time: '08:00', engineTemp: 105, battery: 12.8, oilPressure: 40, brakeTemp: 85 },
    { time: '10:00', engineTemp: 110, battery: 12.5, oilPressure: 38, brakeTemp: 90 },
    { time: '12:00', engineTemp: 112, battery: 12.2, oilPressure: 36, brakeTemp: 95 },
  ]

  const predictions = [
    {
      component: 'Battery/Alternator',
      probability: 87,
      timeToFailure: '3 days',
      severity: 'critical'
    },
    {
      component: 'Brake Pads',
      probability: 62,
      timeToFailure: '14 days',
      severity: 'warning'
    },
    {
      component: 'Oil System',
      probability: 45,
      timeToFailure: '30 days',
      severity: 'medium'
    },
  ]

  const maintenanceHistory = [
    { date: '2025-09-15', service: 'Oil Change', parts: 'Oil Filter, Engine Oil', cost: '$85' },
    { date: '2025-07-22', service: 'Brake Inspection', parts: 'Brake Fluid', cost: '$120' },
    { date: '2025-05-10', service: 'Tire Rotation', parts: 'None', cost: '$50' },
    { date: '2025-03-18', service: 'Battery Check', parts: 'Battery Terminal Clean', cost: '$30' },
  ]

  const dtcCodes = [
    { code: 'P0562', description: 'System Voltage Low', severity: 'critical', date: '2025-11-21' },
    { code: 'P0420', description: 'Catalyst System Efficiency Below Threshold', severity: 'warning', date: '2025-11-20' },
  ]

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>

      {/* Vehicle Header */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
              <Activity className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tesla Model 3</h1>
              <p className="text-gray-600 mt-1">VIN: {params.id}</p>
              <div className="flex items-center space-x-4 mt-3">
                <span className="badge-danger">Critical Alert</span>
                <span className="text-sm text-gray-600">Owner: John Smith</span>
                <span className="text-sm text-gray-600">Phone: +1-555-0123</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-danger-600">45%</div>
            <div className="text-sm text-gray-600 mt-1">Health Score</div>
          </div>
        </div>
      </div>

      {/* AI Recommendation Box */}
      <div className="bg-danger-50 border-l-4 border-danger-500 rounded-lg p-6">
        <div className="flex items-start">
          <AlertTriangle className="w-6 h-6 text-danger-600 mr-3 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-danger-900 mb-2">AI Recommendation</h3>
            <p className="text-danger-800 mb-3">
              <strong>IMMEDIATE ACTION REQUIRED:</strong> Battery alternator showing critical degradation pattern. 
              Predicted failure within 72 hours with 87% confidence. Recommend scheduling service within next 48 hours 
              to prevent roadside breakdown.
            </p>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setShowCallTranscript(!showCallTranscript)}
                className="btn-primary flex items-center"
              >
                <Phone className="w-4 h-4 mr-2" />
                Trigger AI Voice Call to Customer
              </button>
              <Link href="/scheduling" className="btn-secondary">
                Schedule Service Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Voice Call Transcript */}
      {showCallTranscript && (
        <div className="card bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Voice Call Transcript</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            <div className="flex justify-start">
              <div className="bg-primary-100 rounded-lg p-3 max-w-md">
                <p className="text-sm text-gray-900">
                  Hello John, this is your vehicle's AI assistant. We detected that your alternator may fail 
                  within the next 3 days. To prevent a breakdown, we recommend scheduling a quick check-up. 
                  Would you like me to book an appointment?
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-gray-200 rounded-lg p-3 max-w-md">
                <p className="text-sm text-gray-900">Yes, please.</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-primary-100 rounded-lg p-3 max-w-md">
                <p className="text-sm text-gray-900">
                  Great! I found AutoCare Center 5 km away with availability tomorrow at 10 AM. Should I book it?
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-gray-200 rounded-lg p-3 max-w-md">
                <p className="text-sm text-gray-900">Yes, that works.</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-primary-100 rounded-lg p-3 max-w-md">
                <p className="text-sm text-gray-900">
                  Perfect! Your appointment is confirmed for tomorrow at 10 AM at AutoCare Center. 
                  You'll receive a text message with details. Drive safe!
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Call Duration: 1:45</span>
              <span className="badge-success">Appointment Confirmed</span>
            </div>
          </div>
        </div>
      )}

      {/* Telemetry Charts */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Live Sensor Readings (Last 12 Hours)</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Engine Temperature */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Engine Temperature (°C)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={telemetryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="engineTemp" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Battery Voltage */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Battery Voltage (V)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={telemetryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="battery" stroke="#eab308" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Oil Pressure */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Oil Pressure (PSI)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={telemetryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="oilPressure" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Brake Temperature */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Brake Temperature (°C)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={telemetryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="brakeTemp" stroke="#22c55e" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Predicted Failures */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">AI-Predicted Failures</h2>
        <div className="space-y-4">
          {predictions.map((pred, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{pred.component}</h3>
                <span className={`badge-${pred.severity === 'critical' ? 'danger' : pred.severity === 'warning' ? 'warning' : 'success'}`}>
                  {pred.severity.toUpperCase()}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Failure Probability:</span>
                  <div className="mt-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-900">{pred.probability}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${pred.severity === 'critical' ? 'bg-danger-500' : pred.severity === 'warning' ? 'bg-warning-500' : 'bg-success-500'}`}
                        style={{ width: `${pred.probability}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Time to Failure:</span>
                  <p className="font-semibold text-gray-900 mt-1">{pred.timeToFailure}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DTC Codes & Maintenance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* DTC Codes */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Diagnostic Trouble Codes (DTC)</h2>
          <div className="space-y-3">
            {dtcCodes.map((code, index) => (
              <div key={index} className="border-l-4 border-danger-500 bg-danger-50 p-3 rounded">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{code.code}</p>
                    <p className="text-sm text-gray-700 mt-1">{code.description}</p>
                    <p className="text-xs text-gray-600 mt-1">{code.date}</p>
                  </div>
                  <span className={`badge-${code.severity === 'critical' ? 'danger' : 'warning'}`}>
                    {code.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance History */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Maintenance History</h2>
          <div className="space-y-3">
            {maintenanceHistory.map((item, index) => (
              <div key={index} className="flex items-start space-x-3 pb-3 border-b border-gray-200 last:border-0">
                <Wrench className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <p className="font-medium text-gray-900">{item.service}</p>
                    <p className="text-sm font-semibold text-gray-900">{item.cost}</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Parts: {item.parts}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
