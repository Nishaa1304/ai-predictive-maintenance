'use client';

import { Alert } from './AlertSystem';
import { formatTimestamp } from '../utils/mockAlertGenerator';

interface AlertCardProps {
  alert: Alert;
  index: number;
  onDismiss: (alertId: string) => void;
  onEscalate: (alertId: string) => void;
}

export default function AlertCard({ alert, index, onDismiss, onEscalate }: AlertCardProps) {
  const severityColors = {
    critical: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/50',
      text: 'text-red-400',
      glow: 'shadow-red-500/50',
      badge: 'bg-red-500'
    },
    medium: {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/50',
      text: 'text-yellow-400',
      glow: 'shadow-yellow-500/50',
      badge: 'bg-yellow-500'
    },
    low: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/50',
      text: 'text-green-400',
      glow: 'shadow-green-500/50',
      badge: 'bg-green-500'
    }
  };

  const statusInfo = {
    analyzing: { icon: '🔍', text: 'Analyzing Data', color: 'text-blue-400' },
    calling_customer: { icon: '📞', text: 'Calling Customer', color: 'text-purple-400' },
    appointment_scheduled: { icon: '📅', text: 'Appointment Set', color: 'text-green-400' },
    resolved: { icon: '✅', text: 'Resolved', color: 'text-green-500' }
  };

  const colors = severityColors[alert.alertType];
  const status = statusInfo[alert.status];

  return (
    <div
      className={`alert-slide-in ${colors.bg} border ${colors.border} rounded-xl p-4 hover:${colors.glow} hover:shadow-lg transition-all duration-300 ${
        alert.alertType === 'critical' ? 'animate-pulse-slow' : ''
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 ${colors.badge} rounded-full ${alert.alertType === 'critical' ? 'animate-ping' : ''}`}></div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-black text-lg">{alert.vehicleModel}</span>
              <span className={`px-2 py-0.5 rounded text-sm font-bold text-black ${colors.bg} border ${colors.border}`}>
                {alert.alertType.toUpperCase()}
              </span>
            </div>
            <div className="text-sm text-black font-mono font-bold">{alert.vehicleId}</div>
          </div>
        </div>
        <span className="text-sm text-black font-bold">{formatTimestamp(alert.timestamp)}</span>
      </div>

      {/* Issue Description */}
      <div className="mb-3">
        <p className="text-base text-black mb-2 font-semibold">
          <span className="font-bold">Issue:</span> {alert.issue}
        </p>
        <p className="text-sm text-black font-semibold">
          📍 {alert.location}
        </p>
      </div>

      {/* Status Badge */}
      <div className="mb-3 flex items-center gap-2">
        <span className="text-2xl">{status.icon}</span>
        <span className={`text-base font-bold text-black status-fade-in`}>
          {status.text}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button className="flex-1 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded-lg text-xs font-semibold transition-colors duration-200">
          View Details
        </button>
        <button
          onClick={() => onDismiss(alert.id)}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded-lg text-xs font-semibold transition-colors duration-200"
        >
          Dismiss
        </button>
        {alert.alertType !== 'critical' && (
          <button
            onClick={() => onEscalate(alert.id)}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded-lg text-xs font-semibold transition-colors duration-200"
          >
            Escalate
          </button>
        )}
      </div>
    </div>
  );
}
