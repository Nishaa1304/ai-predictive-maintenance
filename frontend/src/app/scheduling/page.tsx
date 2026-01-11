'use client'

import { Calendar, Clock, MapPin, Check } from 'lucide-react'
import { useState } from 'react'

export default function SchedulingPage() {
  const [selectedDate, setSelectedDate] = useState('2025-11-22')
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [selectedCenter, setSelectedCenter] = useState('autocare')

  const serviceCenters = [
    { id: 'autocare', name: 'AutoCare Center', distance: '5 km', rating: 4.8 },
    { id: 'quickfix', name: 'QuickFix Service', distance: '8 km', rating: 4.6 },
    { id: 'proservice', name: 'Pro Service Station', distance: '12 km', rating: 4.9 },
  ]

  const timeSlots = [
    { time: '08:00 AM', status: 'busy', aiRecommended: false },
    { time: '09:00 AM', status: 'busy', aiRecommended: false },
    { time: '10:00 AM', status: 'available', aiRecommended: true },
    { time: '11:00 AM', status: 'available', aiRecommended: false },
    { time: '12:00 PM', status: 'full', aiRecommended: false },
    { time: '01:00 PM', status: 'full', aiRecommended: false },
    { time: '02:00 PM', status: 'available', aiRecommended: true },
    { time: '03:00 PM', status: 'busy', aiRecommended: false },
    { time: '04:00 PM', status: 'available', aiRecommended: false },
    { time: '05:00 PM', status: 'busy', aiRecommended: false },
  ]

  const statusColors = {
    available: 'bg-success-100 text-success-700 border-success-300 hover:border-success-500',
    busy: 'bg-warning-100 text-warning-700 border-warning-300',
    full: 'bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed'
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI-Powered Scheduling</h1>
        <p className="text-gray-600 mt-1">Smart appointment booking with optimized time slots</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Service Centers */}
        <div className="card lg:col-span-1">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Service Center</h2>
          <div className="space-y-3">
            {serviceCenters.map((center) => (
              <button
                key={center.id}
                onClick={() => setSelectedCenter(center.id)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedCenter === center.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{center.name}</h3>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {center.distance}
                    </div>
                    <div className="flex items-center text-sm text-warning-600 mt-1">
                      <span>⭐ {center.rating}</span>
                    </div>
                  </div>
                  {selectedCenter === center.id && (
                    <Check className="w-5 h-5 text-primary-600" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Customer Preferences */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Customer Preferences</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>• Prefers morning appointments</p>
              <p>• 15 min travel time acceptable</p>
              <p>• Preferred mechanic: John D.</p>
            </div>
          </div>
        </div>

        {/* Right Panel - Calendar & Time Slots */}
        <div className="lg:col-span-2 space-y-6">
          {/* Date Selector */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h2>
            <div className="grid grid-cols-7 gap-2">
              {['21', '22', '23', '24', '25', '26', '27'].map((day, index) => (
                <button
                  key={day}
                  onClick={() => setSelectedDate(`2025-11-${day}`)}
                  className={`p-3 rounded-lg text-center transition-all ${
                    selectedDate === `2025-11-${day}`
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="text-xs">Nov</div>
                  <div className="text-lg font-semibold">{day}</div>
                  <div className="text-xs">{['Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'][index]}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Available Time Slots</h2>
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-success-500 rounded mr-1"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-warning-500 rounded mr-1"></div>
                  <span>Busy</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-400 rounded mr-1"></div>
                  <span>Full</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => slot.status === 'available' && setSelectedSlot(slot.time)}
                  disabled={slot.status === 'full'}
                  className={`relative p-4 rounded-lg border-2 transition-all ${
                    selectedSlot === slot.time
                      ? 'border-primary-600 bg-primary-50'
                      : statusColors[slot.status as keyof typeof statusColors]
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="font-medium">{slot.time}</span>
                  </div>
                  {slot.aiRecommended && (
                    <div className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                      AI Pick
                    </div>
                  )}
                  {selectedSlot === slot.time && (
                    <Check className="absolute top-1 right-1 w-4 h-4 text-primary-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Booking Summary */}
          {selectedSlot && (
            <div className="card bg-primary-50 border border-primary-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Center:</span>
                  <span className="font-semibold text-gray-900">
                    {serviceCenters.find(c => c.id === selectedCenter)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-semibold text-gray-900">{selectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-semibold text-gray-900">{selectedSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Duration:</span>
                  <span className="font-semibold text-gray-900">2 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Type:</span>
                  <span className="font-semibold text-gray-900">Battery/Alternator Check</span>
                </div>
              </div>

              <button className="w-full mt-6 btn-primary text-center">
                Confirm Appointment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
