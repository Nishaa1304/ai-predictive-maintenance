'use client'

import Link from 'next/link'
import { Car, Wrench, Clock, AlertTriangle } from 'lucide-react'

export default function VehiclesPage() {
  const vehicles = [
    {
      id: 'VIN12345',
      make: 'Honda',
      model: 'Civic',
      year: 2022,
      owner: 'John Smith',
      mileage: '32,450 km',
      healthScore: 68,
      status: 'warning',
      lastService: '2025-10-15',
      nextPrediction: 'Battery failure in 3 days',
      alerts: 2
    },
    {
      id: 'VIN23456',
      make: 'Toyota',
      model: 'Camry',
      year: 2021,
      owner: 'Sarah Johnson',
      mileage: '45,200 km',
      healthScore: 85,
      status: 'good',
      lastService: '2025-11-01',
      nextPrediction: 'Brake pads in 15 days',
      alerts: 1
    },
    {
      id: 'VIN67890',
      make: 'Ford',
      model: 'F-150',
      year: 2020,
      owner: 'Mike Brown',
      mileage: '68,900 km',
      healthScore: 45,
      status: 'critical',
      lastService: '2025-09-20',
      nextPrediction: 'Engine overheating',
      alerts: 4
    },
    {
      id: 'VIN45678',
      make: 'Nissan',
      model: 'Altima',
      year: 2023,
      owner: 'Emily Davis',
      mileage: '18,300 km',
      healthScore: 92,
      status: 'good',
      lastService: '2025-11-10',
      nextPrediction: 'No issues predicted',
      alerts: 0
    },
    {
      id: 'VIN78901',
      make: 'Chevrolet',
      model: 'Malibu',
      year: 2021,
      owner: 'David Wilson',
      mileage: '52,100 km',
      healthScore: 72,
      status: 'warning',
      lastService: '2025-10-25',
      nextPrediction: 'Oil change in 7 days',
      alerts: 1
    },
  ]

  return (
    <div className="space-y-6 bg-gray-100 min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-black">Vehicle Fleet</h1>
          <p className="text-base font-semibold text-black mt-1">Monitor and manage all vehicles</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Car className="w-5 h-5 mr-2" />
          Add Vehicle
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card bg-gray-50 border-2 border-gray-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-black text-base font-bold">Total Vehicles</p>
              <p className="text-4xl font-bold text-black mt-2">{vehicles.length}</p>
            </div>
            <Car className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-black text-base font-bold">Critical</p>
              <p className="text-4xl font-bold text-red-600 mt-2">
                {vehicles.filter(v => v.status === 'critical').length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-black text-base font-bold">Warning</p>
              <p className="text-4xl font-bold text-yellow-600 mt-2">
                {vehicles.filter(v => v.status === 'warning').length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-black text-base font-bold">Good</p>
              <p className="text-4xl font-bold text-green-600 mt-2">
                {vehicles.filter(v => v.status === 'good').length}
              </p>
            </div>
            <Wrench className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Vehicle List */}
      <div className="card bg-gray-50 border-2 border-gray-300">
        <h2 className="text-2xl font-bold text-black mb-4">All Vehicles</h2>
        <div className="space-y-4">
          {vehicles.map((vehicle) => (
            <Link 
              key={vehicle.id} 
              href={`/vehicles/${vehicle.id}`}
              className="block border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Car className={`w-6 h-6 ${
                      vehicle.status === 'critical' ? 'text-red-600' :
                      vehicle.status === 'warning' ? 'text-yellow-600' :
                      'text-green-600'
                    }`} />
                    <h3 className="text-xl font-bold text-black">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </h3>
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                      vehicle.status === 'critical' 
                        ? 'bg-red-100 text-red-700' 
                        : vehicle.status === 'warning'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {vehicle.status.toUpperCase()}
                    </span>
                    {vehicle.alerts > 0 && (
                      <span className="flex items-center text-sm font-bold px-2 py-1 bg-red-100 text-red-700 rounded-full">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {vehicle.alerts} alert{vehicle.alerts > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-base text-black font-semibold">
                    <div>
                      <span className="font-bold">VIN:</span> {vehicle.id}
                    </div>
                    <div>
                      <span className="font-bold">Owner:</span> {vehicle.owner}
                    </div>
                    <div>
                      <span className="font-bold">Mileage:</span> {vehicle.mileage}
                    </div>
                    <div>
                      <span className="font-bold">Last Service:</span> {vehicle.lastService}
                    </div>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="text-base text-black font-bold mb-1">Health Score</p>
                  <div className="relative w-16 h-16">
                    <svg className="transform -rotate-90 w-16 h-16">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        className="text-gray-200"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 28}`}
                        strokeDashoffset={`${2 * Math.PI * 28 * (1 - vehicle.healthScore / 100)}`}
                        className={
                          vehicle.healthScore >= 80 ? 'text-green-500' :
                          vehicle.healthScore >= 60 ? 'text-yellow-500' :
                          'text-red-500'
                        }
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold text-black">{vehicle.healthScore}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {vehicle.nextPrediction !== 'No issues predicted' && (
                <div className="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-yellow-600 mr-2" />
                    <p className="text-base font-bold text-black">
                      Next Prediction: {vehicle.nextPrediction}
                    </p>
                  </div>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
