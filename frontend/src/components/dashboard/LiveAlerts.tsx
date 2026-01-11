'use client'

import { AlertCircle, Clock } from 'lucide-react'

export default function LiveAlerts() {
  const alerts = [
    {
      id: 1,
      vehicle: 'VIN12345 - Tesla Model 3',
      component: 'Battery/Alternator',
      severity: 'critical',
      time: '5 mins ago',
      message: 'Battery failure predicted in 3 days'
    },
    {
      id: 2,
      vehicle: 'VIN67890 - Honda Accord',
      component: 'Engine Cooling',
      severity: 'critical',
      time: '10 mins ago',
      message: 'Engine temperature exceeding limits'
    },
    {
      id: 3,
      vehicle: 'VIN23456 - BMW X5',
      component: 'Brake System',
      severity: 'warning',
      time: '1 hour ago',
      message: 'Brake pad wear detected'
    },
    {
      id: 4,
      vehicle: 'VIN45678 - Audi A4',
      component: 'Oil System',
      severity: 'warning',
      time: '2 hours ago',
      message: 'Oil pressure below normal range'
    },
    {
      id: 5,
      vehicle: 'VIN89012 - Ford F-150',
      component: 'Transmission',
      severity: 'warning',
      time: '3 hours ago',
      message: 'Transmission temperature elevated'
    },
  ]

  const severityColors = {
    critical: 'text-danger-600 bg-danger-50 border-danger-200',
    warning: 'text-warning-600 bg-warning-50 border-warning-200',
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Live Alerts</h2>
        <span className="flex items-center text-xs text-gray-500">
          <div className="w-2 h-2 bg-success-500 rounded-full mr-2 animate-pulse"></div>
          Real-time
        </span>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-3 rounded-lg border ${severityColors[alert.severity as keyof typeof severityColors]} transition-all hover:shadow-md`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center">
                <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-xs font-semibold uppercase">
                  {alert.severity}
                </span>
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="w-3 h-3 mr-1" />
                {alert.time}
              </div>
            </div>
            
            <p className="text-sm font-medium text-gray-900 mb-1">
              {alert.vehicle}
            </p>
            
            <p className="text-xs text-gray-600 mb-1">
              Component: <span className="font-medium">{alert.component}</span>
            </p>
            
            <p className="text-xs text-gray-700">
              {alert.message}
            </p>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 border border-primary-300 hover:border-primary-500 rounded-lg transition-colors">
        View All Alerts
      </button>
    </div>
  )
}
