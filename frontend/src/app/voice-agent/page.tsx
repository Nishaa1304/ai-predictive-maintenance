'use client'

import { Phone, Clock, CheckCircle, XCircle, TrendingUp } from 'lucide-react'

export default function VoiceAgentPage() {
  const calls = [
    {
      id: 1,
      vehicleId: 'VIN12345',
      owner: 'John Smith',
      phone: '+1-555-0123',
      timestamp: '2025-11-21 14:30',
      duration: '1:45',
      status: 'success',
      outcome: 'Appointment Confirmed',
      issue: 'Battery failure predicted',
      transcript: [
        { speaker: 'AI', message: 'Hello John, this is your vehicle\'s AI assistant. We detected that your alternator may fail within the next 3 days.' },
        { speaker: 'Customer', message: 'Oh no, what should I do?' },
        { speaker: 'AI', message: 'To prevent a breakdown, we recommend scheduling a quick check-up. Would you like me to book an appointment?' },
        { speaker: 'Customer', message: 'Yes, please.' },
        { speaker: 'AI', message: 'Great! I found AutoCare Center 5 km away with availability tomorrow at 10 AM. Should I book it?' },
        { speaker: 'Customer', message: 'Yes, that works.' },
        { speaker: 'AI', message: 'Perfect! Your appointment is confirmed. You\'ll receive a text message with details. Drive safe!' },
      ]
    },
    {
      id: 2,
      vehicleId: 'VIN23456',
      owner: 'Sarah Johnson',
      phone: '+1-555-0456',
      timestamp: '2025-11-21 13:15',
      duration: '2:10',
      status: 'success',
      outcome: 'Appointment Confirmed',
      issue: 'Brake pad wear detected',
      transcript: []
    },
    {
      id: 3,
      vehicleId: 'VIN67890',
      owner: 'Mike Brown',
      phone: '+1-555-0789',
      timestamp: '2025-11-21 12:00',
      duration: '0:45',
      status: 'failed',
      outcome: 'No Answer - SMS Sent',
      issue: 'Engine overheating',
      transcript: []
    },
    {
      id: 4,
      vehicleId: 'VIN45678',
      owner: 'Emily Davis',
      phone: '+1-555-0321',
      timestamp: '2025-11-21 11:30',
      duration: '1:30',
      status: 'success',
      outcome: 'Appointment Confirmed',
      issue: 'Oil pressure low',
      transcript: []
    },
  ]

  const stats = {
    totalCalls: 127,
    successRate: 89,
    avgDuration: '1:52',
    appointmentsBooked: 113
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Voice Agent</h1>
        <p className="text-gray-600 mt-1">Automated customer engagement and appointment booking</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Calls</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalCalls}</p>
            </div>
            <Phone className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Success Rate</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.successRate}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Avg Duration</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.avgDuration}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Appointments</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{stats.appointmentsBooked}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Call History */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Call History</h2>
        <div className="space-y-4">
          {calls.map((call) => (
            <div key={call.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold text-gray-900">{call.owner}</h3>
                    {call.status === 'success' ? (
                      <span className="flex items-center text-xs font-semibold px-3 py-1 bg-green-100 text-green-700 rounded-full">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Success
                      </span>
                    ) : (
                      <span className="flex items-center text-xs font-semibold px-3 py-1 bg-red-100 text-red-700 rounded-full">
                        <XCircle className="w-3 h-3 mr-1" />
                        Failed
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Vehicle: {call.vehicleId} | Phone: {call.phone}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{call.timestamp}</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">Duration: {call.duration}</p>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 mb-3">
                <p className="text-sm font-medium text-gray-900">Issue: {call.issue}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm font-medium text-gray-900">Outcome: {call.outcome}</p>
              </div>

              {call.transcript.length > 0 && (
                <details className="mt-3">
                  <summary className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-700">
                    View Transcript
                  </summary>
                  <div className="mt-3 space-y-2 max-h-64 overflow-y-auto">
                    {call.transcript.map((line, idx) => (
                      <div key={idx} className={`flex ${line.speaker === 'AI' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-md p-3 rounded-lg ${
                          line.speaker === 'AI' 
                            ? 'bg-blue-100 text-gray-900' 
                            : 'bg-gray-200 text-gray-900'
                        }`}>
                          <p className="text-xs font-semibold mb-1">{line.speaker}</p>
                          <p className="text-sm">{line.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
