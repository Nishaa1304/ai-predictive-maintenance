'use client';

import { ActivityLogEntry } from './AlertSystem';
import { formatTimestamp } from '../utils/mockAlertGenerator';

interface ActivityLogProps {
  logs: ActivityLogEntry[];
}

export default function ActivityLog({ logs }: ActivityLogProps) {
  const typeIcons = {
    data: '📊',
    diagnosis: '🔧',
    customer: '💬',
    appointment: '📅',
    security: '🔒'
  };

  const typeColors = {
    data: 'text-blue-700',
    diagnosis: 'text-orange-700',
    customer: 'text-green-700',
    appointment: 'text-purple-700',
    security: 'text-red-700'
  };

  return (
    <div className="bg-gray-200 border border-gray-300 rounded-xl p-4 h-full">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <h3 className="text-lg font-bold text-black">Live Activity Log</h3>
      </div>
      <div className="space-y-2 overflow-y-auto custom-scrollbar font-mono text-base" style={{ maxHeight: '600px' }}>
        {logs.map((log, index) => (
          <div
            key={log.id}
            className="log-fade-in flex items-start gap-2 text-black hover:text-gray-700 transition-colors font-semibold"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <span className="text-gray-600">[{formatTimestamp(log.timestamp)}]</span>
            <span className="text-2xl">{typeIcons[log.type]}</span>
            <span className={typeColors[log.type]}>{log.action}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
