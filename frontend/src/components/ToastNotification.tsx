'use client';

import { useEffect } from 'react';
import { Alert } from './AlertSystem';

interface ToastNotificationProps {
  alert: Alert;
  onClose: () => void;
}

export default function ToastNotification({ alert, onClose }: ToastNotificationProps) {
  useEffect(() => {
    // Auto close after 5 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 toast-slide-in">
      <div className="bg-gradient-to-r from-red-600 to-red-700 border border-red-500 rounded-xl shadow-2xl shadow-red-500/50 p-4 max-w-sm">
        <div className="flex items-start gap-3">
          <div className="text-2xl animate-bounce">🚨</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-white">CRITICAL ALERT</span>
              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            </div>
            <p className="text-sm text-white mb-1 font-semibold">{alert.vehicleModel}</p>
            <p className="text-xs text-red-100">{alert.issue}</p>
            <p className="text-xs text-red-200 mt-1">📍 {alert.location}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-red-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
