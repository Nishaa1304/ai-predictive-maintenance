'use client'

import Link from 'next/link'
import { AlertCircle, ArrowRight } from 'lucide-react'

interface Vehicle {
  id: string
  model: string
  status: 'healthy' | 'warning' | 'critical'
  lastAlert: string
  health: number
  issue: string | null
}

interface VehicleCardProps {
  vehicle: Vehicle
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const statusColors = {
    healthy: 'bg-success-500',
    warning: 'bg-warning-500',
    critical: 'bg-danger-500'
  }

  const statusText = {
    healthy: 'Healthy',
    warning: 'Warning',
    critical: 'Critical'
  }

  const borderColors = {
    healthy: 'border-success-200',
    warning: 'border-warning-200',
    critical: 'border-danger-200'
  }

  const bgColors = {
    healthy: 'bg-success-50',
    warning: 'bg-warning-50',
    critical: 'bg-danger-50'
  }

  return (
    <div className={`card border-l-4 ${borderColors[vehicle.status]} hover:scale-105 transition-transform`}>
      {/* Status Badge */}
      <div className="flex items-center justify-between mb-3">
        <span className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${bgColors[vehicle.status]}`}>
          <span className={`w-2 h-2 rounded-full ${statusColors[vehicle.status]} mr-2`}></span>
          {statusText[vehicle.status]}
        </span>
        {vehicle.status !== 'healthy' && (
          <AlertCircle className={`w-5 h-5 ${vehicle.status === 'critical' ? 'text-danger-500' : 'text-warning-500'}`} />
        )}
      </div>

      {/* Vehicle Info */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{vehicle.model}</h3>
        <p className="text-sm text-gray-500">{vehicle.id}</p>
      </div>

      {/* Health Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-gray-600">Health Score</span>
          <span className="font-semibold text-gray-900">{vehicle.health}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${statusColors[vehicle.status]}`}
            style={{ width: `${vehicle.health}%` }}
          ></div>
        </div>
      </div>

      {/* Issue Alert */}
      {vehicle.issue && (
        <div className={`mb-4 p-3 rounded-lg ${bgColors[vehicle.status]}`}>
          <p className="text-sm font-medium text-gray-900">{vehicle.issue}</p>
          <p className="text-xs text-gray-600 mt-1">Last alert: {vehicle.lastAlert}</p>
        </div>
      )}

      {/* View Details Button */}
      <Link 
        href={`/vehicles/${vehicle.id}`}
        className="flex items-center justify-center w-full py-2 text-sm font-medium text-primary-600 hover:text-primary-700 border border-primary-300 hover:border-primary-500 rounded-lg transition-colors"
      >
        View Details
        <ArrowRight className="w-4 h-4 ml-2" />
      </Link>
    </div>
  )
}
