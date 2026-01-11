'use client';

import { useState, useEffect } from 'react';

export default function UEBASecurityView() {
  const [securityStatus, setSecurityStatus] = useState<'normal' | 'suspicious' | 'blocked'>('normal');
  const [threats, setThreats] = useState([
    { 
      id: 1, 
      type: 'Privilege Escalation', 
      severity: 'high', 
      source: 'Agent_Diagnosis_003',
      target: 'Database Access',
      description: 'Unusual privilege elevation detected', 
      time: '2 mins ago',
      action: 'Blocked'
    },
    { 
      id: 2, 
      type: 'Data Exfiltration', 
      severity: 'critical', 
      source: 'Agent_Customer_007',
      target: 'External API',
      description: 'Unauthorized data export attempt', 
      time: '5 mins ago',
      action: 'Quarantined'
    },
    { 
      id: 3, 
      type: 'Anomalous Behavior', 
      severity: 'medium', 
      source: 'Agent_Scheduling_002',
      target: 'System Resources',
      description: 'Unusual API call pattern detected', 
      time: '12 mins ago',
      action: 'Monitoring'
    }
  ]);

  const [securityStats, setSecurityStats] = useState({
    agentsMonitored: 6,
    activeThreats: 3,
    anomaliesDetected: 7,
    threatsBlocked: 127,
    averageRiskScore: 28
  });

  const [riskPatterns, setRiskPatterns] = useState([
    { entity: 'Agent_Data_Analysis', type: 'Agent', riskScore: 85, anomalies: 'Excessive data access, Off-hours activity' },
    { entity: 'Agent_Manufacturing', type: 'Agent', riskScore: 72, anomalies: 'Unusual API patterns, Multiple failed auth' },
    { entity: 'Service_Account_001', type: 'Service Account', riskScore: 45, anomalies: 'Geographic anomaly detected' }
  ]);

  const statusConfig = {
    normal: {
      color: 'text-green-600',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/50',
      icon: '✅',
      title: 'Security Normal',
      message: 'All agents operating within normal parameters'
    },
    suspicious: {
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/50',
      icon: '⚠️',
      title: 'Suspicious Activity',
      message: 'Unusual agent behavior detected - monitoring'
    },
    blocked: {
      color: 'text-red-600',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/50',
      icon: '🚫',
      title: 'Threat Blocked',
      message: 'Malicious action blocked - agent quarantined'
    }
  };

  const config = statusConfig[securityStatus];

  // Simulate status changes
  useEffect(() => {
    const statusInterval = setInterval(() => {
      const statuses: ('normal' | 'suspicious' | 'blocked')[] = ['normal', 'suspicious', 'blocked'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      if (Math.random() > 0.7) {
        setSecurityStatus(randomStatus);
      }
    }, 10000);

    return () => clearInterval(statusInterval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header with Status Indicator */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-orange-600">
            🔒 UEBA Security Console
          </h1>
          <p className="text-gray-700 mt-2">User and Entity Behavior Analytics</p>
        </div>
      </div>

      {/* Main Status Card */}
      <div className={`bg-white border-2 ${config.borderColor} rounded-2xl p-6`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-xl ${config.bgColor} border ${config.borderColor} flex items-center justify-center text-3xl`}>
              {config.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-black">{config.title}</h3>
              <p className="text-sm text-gray-600 mt-1">UEBA Monitoring Active</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-600 font-semibold text-sm">Live</span>
          </div>
        </div>

        <p className={`text-sm ${config.color} mb-6 font-medium`}>
          {config.message}
        </p>

        {/* Security Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-3">
            <span className="text-gray-600 text-xs block mb-1">Agents Monitored</span>
            <span className="font-bold text-black text-xl">{securityStats.agentsMonitored}/6</span>
          </div>
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3">
            <span className="text-gray-600 text-xs block mb-1">Active Threats</span>
            <span className="font-bold text-red-600 text-xl">{securityStats.activeThreats}</span>
          </div>
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-3">
            <span className="text-gray-600 text-xs block mb-1">Anomalies Detected</span>
            <span className="font-bold text-yellow-600 text-xl">{securityStats.anomaliesDetected}</span>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3">
            <span className="text-gray-600 text-xs block mb-1">Threats Blocked</span>
            <span className="font-bold text-green-600 text-xl">{securityStats.threatsBlocked}</span>
          </div>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3">
            <span className="text-gray-600 text-xs block mb-1">Avg Risk Score</span>
            <span className="font-bold text-blue-600 text-xl">{securityStats.averageRiskScore}</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Active Threats & Incidents */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-black">🚨 Active Threats & Incidents</h2>
            <span className="px-3 py-1 bg-red-100 border border-red-300 rounded-full text-xs font-bold text-red-700">
              {threats.length} Active
            </span>
          </div>
          
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {threats.map((threat) => (
              <div
                key={threat.id}
                className={`border-2 rounded-xl p-4 ${
                  threat.severity === 'critical'
                    ? 'border-red-300 bg-red-50'
                    : threat.severity === 'high'
                    ? 'border-orange-300 bg-orange-50'
                    : 'border-yellow-300 bg-yellow-50'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0 ${
                      threat.severity === 'critical' ? 'bg-red-200' : 
                      threat.severity === 'high' ? 'bg-orange-200' : 'bg-yellow-200'
                    }`}>
                      🚨
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-bold text-black text-sm">{threat.type}</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          threat.severity === 'critical' ? 'bg-red-500 text-white' :
                          threat.severity === 'high' ? 'bg-orange-500 text-white' :
                          'bg-yellow-500 text-black'
                        }`}>
                          {threat.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-700 mb-2">{threat.description}</p>
                      <div className="space-y-1 text-xs mb-2">
                        <div>
                          <span className="text-gray-600 font-semibold">Source:</span>
                          <span className="text-gray-800 ml-1 font-mono break-all">{threat.source}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 font-semibold">Target:</span>
                          <span className="text-gray-800 ml-1 break-all">{threat.target}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-xs text-gray-600">{threat.time}</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          threat.action === 'Blocked' ? 'bg-red-200 text-red-800' :
                          threat.action === 'Quarantined' ? 'bg-orange-200 text-orange-800' :
                          'bg-blue-200 text-blue-800'
                        }`}>
                          {threat.action}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors">
                  Investigate Incident
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* High-Risk Behavior Patterns */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-black">⚠️ High-Risk Behavior Patterns</h2>
            <span className="px-3 py-1 bg-yellow-100 border border-yellow-300 rounded-full text-xs font-bold text-yellow-700">
              {riskPatterns.length} Entities
            </span>
          </div>

          <div className="space-y-3">
            {riskPatterns.map((pattern, index) => (
              <div
                key={index}
                className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 hover:border-yellow-400 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-yellow-200 flex items-center justify-center text-xl flex-shrink-0">
                      {pattern.type === 'Agent' ? '🤖' : '🔑'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-black text-sm block truncate">{pattern.entity}</span>
                      <span className="text-xs text-gray-600">{pattern.type}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xl font-bold text-orange-600">{pattern.riskScore}</div>
                    <div className="text-xs text-gray-600">Risk Score</div>
                  </div>
                </div>

                {/* Risk Bar */}
                <div className="w-full bg-gray-300 rounded-full h-2 mb-3">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-yellow-500 to-red-500"
                    style={{ width: `${pattern.riskScore}%` }}
                  ></div>
                </div>

                <div className="bg-white border border-yellow-200 rounded-lg p-2 mb-3">
                  <span className="text-xs text-gray-600 font-semibold block mb-1">Detected Anomalies:</span>
                  <span className="text-xs text-gray-800">{pattern.anomalies}</span>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors">
                    View Details
                  </button>
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors">
                    Quarantine
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline Chart */}
          <div className="mt-6 bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-bold text-black mb-3">📈 Anomaly Score Timeline (24h)</h3>
            <div className="h-32 flex items-end justify-between gap-1">
              {[45, 52, 38, 65, 72, 58, 43, 55, 68, 75, 62, 48, 35, 42, 58, 70, 65, 52, 45, 38, 32, 28, 25, 30].map((value, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t transition-all hover:opacity-80 cursor-pointer"
                  style={{ height: `${value}%` }}
                  title={`${value}% risk`}
                ></div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-600 mt-2">
              <span>24h ago</span>
              <span>12h ago</span>
              <span>Now</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-white hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-400 rounded-xl p-6 transition-all text-left group">
          <div className="text-3xl mb-3">🛡️</div>
          <h3 className="font-bold text-black mb-2 group-hover:text-blue-600 transition-colors">Run Security Scan</h3>
          <p className="text-sm text-gray-600">Perform full system audit across all agents</p>
        </button>
        <button className="bg-white hover:bg-purple-50 border-2 border-gray-200 hover:border-purple-400 rounded-xl p-6 transition-all text-left group">
          <div className="text-3xl mb-3">📊</div>
          <h3 className="font-bold text-black mb-2 group-hover:text-purple-600 transition-colors">View Detailed Reports</h3>
          <p className="text-sm text-gray-600">Access comprehensive security analytics</p>
        </button>
        <button className="bg-white hover:bg-green-50 border-2 border-gray-200 hover:border-green-400 rounded-xl p-6 transition-all text-left group">
          <div className="text-3xl mb-3">⚙️</div>
          <h3 className="font-bold text-black mb-2 group-hover:text-green-600 transition-colors">Configure Security Rules</h3>
          <p className="text-sm text-gray-600">Manage policies and access controls</p>
        </button>
      </div>
    </div>
  );
}
