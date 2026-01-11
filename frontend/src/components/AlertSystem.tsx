'use client';

import { useState, useEffect, useCallback } from 'react';
import { generateMockAlert, generateActivityLog, getRandomInterval } from '../utils/mockAlertGenerator';
import AlertCard from './AlertCard';
import ActivityLog from './ActivityLog';
import LiveCounters from './LiveCounters';
import ToastNotification from './ToastNotification';

export interface Alert {
  id: string;
  vehicleId: string;
  vehicleModel: string;
  alertType: 'critical' | 'medium' | 'low';
  issue: string;
  location: string;
  status: 'analyzing' | 'calling_customer' | 'appointment_scheduled' | 'resolved';
  timestamp: Date;
  resolvedAt?: Date;
}

export interface ActivityLogEntry {
  id: string;
  timestamp: Date;
  action: string;
  type: 'data' | 'diagnosis' | 'customer' | 'appointment' | 'security';
}

interface Statistics {
  totalAlerts: number;
  criticalAlerts: number;
  predictedFailures: number;
  callsInProgress: number;
  callsCompleted: number;
  vehiclesScheduled: number;
  manufacturingInsights: number;
}

export default function AlertSystem() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLogEntry[]>([]);
  const [filter, setFilter] = useState<'all' | 'critical' | 'medium' | 'low'>('all');
  const [statistics, setStatistics] = useState<Statistics>({
    totalAlerts: 0,
    criticalAlerts: 0,
    predictedFailures: 0,
    callsInProgress: 0,
    callsCompleted: 0,
    vehiclesScheduled: 0,
    manufacturingInsights: 0
  });
  const [toastAlert, setToastAlert] = useState<Alert | null>(null);
  const [counters, setCounters] = useState({
    vehiclesMonitored: 0,
    activeAlerts: 0,
    callsInProgress: 0,
    todaysPredictions: 0
  });

  // Generate new alerts every 8-15 seconds
  useEffect(() => {
    const generateNewAlert = () => {
      const newAlert = generateMockAlert();
      setAlerts(prev => [newAlert, ...prev].slice(0, 10)); // Keep max 10 alerts
      
      // Show toast for critical alerts
      if (newAlert.alertType === 'critical') {
        setToastAlert(newAlert);
      }

      // Add activity log
      const logEntry = generateActivityLog('data', `Scanning ${newAlert.vehicleModel} - ${newAlert.issue}`);
      setActivityLogs(prev => [logEntry, ...prev].slice(0, 20));

      // Update statistics
      setStatistics(prev => ({
        ...prev,
        totalAlerts: prev.totalAlerts + 1,
        criticalAlerts: newAlert.alertType === 'critical' ? prev.criticalAlerts + 1 : prev.criticalAlerts
      }));
    };

    // Initial alerts
    for (let i = 0; i < 5; i++) {
      setTimeout(() => generateNewAlert(), i * 2000);
    }

    // Continuous generation
    const interval = setInterval(() => {
      generateNewAlert();
    }, getRandomInterval(8000, 15000));

    return () => clearInterval(interval);
  }, []);

  // Update alert statuses progressively
  useEffect(() => {
    const statusInterval = setInterval(() => {
      setAlerts(prev => prev.map(alert => {
        if (alert.status === 'resolved') return alert;

        const statusFlow: Alert['status'][] = ['analyzing', 'calling_customer', 'appointment_scheduled', 'resolved'];
        const currentIndex = statusFlow.indexOf(alert.status);
        
        if (Math.random() > 0.7 && currentIndex < statusFlow.length - 1) {
          const newStatus = statusFlow[currentIndex + 1];
          
          // Add activity log for status change
          let logMessage = '';
          switch (newStatus) {
            case 'calling_customer':
              logMessage = `Customer Agent calling ${alert.vehicleModel} owner`;
              setStatistics(prev => ({ ...prev, callsInProgress: prev.callsInProgress + 1 }));
              break;
            case 'appointment_scheduled':
              logMessage = `Appointment booked for ${alert.vehicleModel}`;
              setStatistics(prev => ({ 
                ...prev, 
                predictedFailures: prev.predictedFailures + 1,
                callsInProgress: Math.max(0, prev.callsInProgress - 1)
              }));
              break;
            case 'resolved':
              logMessage = `Issue resolved for ${alert.vehicleModel}`;
              setStatistics(prev => ({ 
                ...prev, 
                callsCompleted: prev.callsCompleted + 1
              }));
              break;
          }

          if (logMessage) {
            const logEntry = generateActivityLog('customer', logMessage);
            setActivityLogs(prev => [logEntry, ...prev].slice(0, 20));
          }

          return { ...alert, status: newStatus };
        }
        return alert;
      }));
    }, 5000);

    return () => clearInterval(statusInterval);
  }, []);

  // Auto-dismiss resolved alerts after 30 seconds
  useEffect(() => {
    const dismissInterval = setInterval(() => {
      setAlerts(prev => prev.filter(alert => {
        if (alert.status === 'resolved' && alert.resolvedAt) {
          const timeSinceResolved = Date.now() - alert.resolvedAt.getTime();
          return timeSinceResolved < 30000; // Keep for 30 seconds
        }
        return true;
      }));
    }, 5000);

    return () => clearInterval(dismissInterval);
  }, []);

  // Mark alert as resolved when status changes to resolved
  useEffect(() => {
    setAlerts(prev => prev.map(alert => {
      if (alert.status === 'resolved' && !alert.resolvedAt) {
        return { ...alert, resolvedAt: new Date() };
      }
      return alert;
    }));
  }, [alerts]);

  // Update live counters
  useEffect(() => {
    const counterInterval = setInterval(() => {
      setCounters(prev => ({
        vehiclesMonitored: Math.min(prev.vehiclesMonitored + Math.floor(Math.random() * 3), 250),
        activeAlerts: alerts.filter(a => a.status !== 'resolved').length,
        callsInProgress: statistics.callsInProgress || Math.floor(Math.random() * 5),
        todaysPredictions: Math.min(prev.todaysPredictions + Math.floor(Math.random() * 2), 500)
      }));
    }, 3000);

    // Initial values
    setCounters({
      vehiclesMonitored: 187,
      activeAlerts: alerts.filter(a => a.status !== 'resolved').length,
      callsInProgress: 3,
      todaysPredictions: 342
    });

    return () => clearInterval(counterInterval);
  }, [alerts, statistics.callsInProgress]);

  // Update manufacturing insights randomly
  useEffect(() => {
    const insightsInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setStatistics(prev => ({
          ...prev,
          manufacturingInsights: prev.manufacturingInsights + 1
        }));
        const logEntry = generateActivityLog('security', 'Manufacturing insight generated and sent to OEM');
        setActivityLogs(prev => [logEntry, ...prev].slice(0, 20));
      }
    }, 15000);

    return () => clearInterval(insightsInterval);
  }, []);

  const handleDismiss = useCallback((alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  }, []);

  const handleEscalate = useCallback((alertId: string) => {
    const alert = alerts.find(a => a.id === alertId);
    if (alert) {
      const logEntry = generateActivityLog('security', `URGENT: ${alert.issue} escalated for ${alert.vehicleModel}`);
      setActivityLogs(prev => [logEntry, ...prev].slice(0, 20));
      setToastAlert({ ...alert, alertType: 'critical' });
    }
  }, [alerts]);

  const filteredAlerts = alerts.filter(alert => 
    filter === 'all' || alert.alertType === filter
  );

  return (
    <div className="flex flex-col space-y-6">
      {/* Live Counters */}
      <LiveCounters counters={counters} />

      {/* Main Content - Two Column Layout for Landscape */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Section - Alerts Feed (2/3 width) */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Filter Buttons */}
          <div className="flex gap-2 flex-wrap">
            {(['all', 'critical', 'medium', 'low'] as const).map(filterType => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  filter === filterType
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                {filterType !== 'all' && (
                  <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                    {alerts.filter(a => a.alertType === filterType).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Statistics Panel */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
              <div className="text-black text-lg font-bold mb-2">Alerts (1hr)</div>
              <div className="text-5xl font-bold text-black">{statistics.totalAlerts}</div>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
              <div className="text-black text-lg font-bold mb-2">Scheduled</div>
              <div className="text-5xl font-bold text-black">{statistics.vehiclesScheduled}</div>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
              <div className="text-black text-lg font-bold mb-2">Calls Done</div>
              <div className="text-5xl font-bold text-black">{statistics.callsCompleted}</div>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
              <div className="text-black text-lg font-bold mb-2">Mfg Insights</div>
              <div className="text-5xl font-bold text-black">{statistics.manufacturingInsights}</div>
            </div>
          </div>

          {/* Alerts Feed - Scrollable */}
          <div className="overflow-y-auto space-y-3 pr-2 custom-scrollbar" style={{ maxHeight: '500px' }}>
            {filteredAlerts.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No alerts to display
              </div>
            ) : (
              filteredAlerts.map((alert, index) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  index={index}
                  onDismiss={handleDismiss}
                  onEscalate={handleEscalate}
                />
              ))
            )}
          </div>
        </div>

        {/* Right Section - Activity Log (1/3 width) */}
        <div className="lg:col-span-1">
          <ActivityLog logs={activityLogs} />
        </div>

      </div>

      {/* Toast Notification */}
      {toastAlert && (
        <ToastNotification
          alert={toastAlert}
          onClose={() => setToastAlert(null)}
        />
      )}
    </div>
  );
}
