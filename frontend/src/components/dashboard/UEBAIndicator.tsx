'use client'

import { Shield, AlertTriangle, CheckCircle } from 'lucide-react'

export default function UEBAIndicator() {
  const securityStatus = 'normal' // 'normal' | 'suspicious' | 'blocked'
  
  const statusConfig = {
    normal: {
      color: 'text-success-600',
      bgColor: 'bg-success-50',
      borderColor: 'border-success-200',
      icon: CheckCircle,
      title: 'Security Normal',
      message: 'All agents operating within normal parameters'
    },
    suspicious: {
      color: 'text-warning-600',
      bgColor: 'bg-warning-50',
      borderColor: 'border-warning-200',
      icon: AlertTriangle,
      title: 'Suspicious Activity',
      message: 'Unusual agent behavior detected - monitoring'
    },
    blocked: {
      color: 'text-danger-600',
      bgColor: 'bg-danger-50',
      borderColor: 'border-danger-200',
      icon: AlertTriangle,
      title: 'Threat Blocked',
      message: 'Malicious action blocked - agent quarantined'
    }
  }

  const config = statusConfig[securityStatus as keyof typeof statusConfig]
  const StatusIcon = config.icon

  return (
    <div className={`card border ${config.borderColor} ${config.bgColor}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <Shield className={`w-6 h-6 ${config.color} mr-3`} />
          <div>
            <h3 className="text-sm font-semibold text-gray-900">{config.title}</h3>
            <p className="text-xs text-gray-600 mt-1">UEBA Monitoring Active</p>
          </div>
        </div>
        <StatusIcon className={`w-5 h-5 ${config.color}`} />
      </div>

      <p className="text-sm text-gray-700 mb-4">
        {config.message}
      </p>

      {/* Security Metrics */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-600">Agents Monitored</span>
          <span className="font-semibold text-gray-900">6/6</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-600">Anomalies Detected</span>
          <span className="font-semibold text-gray-900">0</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-600">Threats Blocked</span>
          <span className="font-semibold text-gray-900">0</span>
        </div>
      </div>

      <button className="w-full mt-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 border border-primary-300 hover:border-primary-500 rounded-lg transition-colors">
        View Security Console
      </button>
    </div>
  )
}
