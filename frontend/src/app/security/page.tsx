'use client'

import { Shield, AlertTriangle, Activity, Eye, Lock, TrendingUp } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function SecurityPage() {
  const anomalyData = [
    { time: '00:00', score: 15 },
    { time: '04:00', score: 12 },
    { time: '08:00', score: 25 },
    { time: '12:00', score: 42 },
    { time: '16:00', score: 68 },
    { time: '20:00', score: 35 },
  ]

  const threats = [
    {
      id: 1,
      timestamp: '2025-11-21 16:45',
      severity: 'critical',
      type: 'Unauthorized Access Attempt',
      source: 'External IP: 203.0.113.45',
      target: 'Vehicle Data API',
      description: 'Multiple failed authentication attempts detected from suspicious IP address',
      status: 'blocked',
      action: 'IP blacklisted, access denied'
    },
    {
      id: 2,
      timestamp: '2025-11-21 15:30',
      severity: 'high',
      type: 'Anomalous Data Exfiltration',
      source: 'User: mechanic_087',
      target: 'Customer Database',
      description: 'Unusual bulk data export pattern detected - 10x normal download volume',
      status: 'investigating',
      action: 'Account temporarily suspended, security team notified'
    },
    {
      id: 3,
      timestamp: '2025-11-21 14:15',
      severity: 'medium',
      type: 'Privilege Escalation Attempt',
      source: 'User: service_user_23',
      target: 'Admin Panel',
      description: 'Service account attempted to access admin functions outside normal scope',
      status: 'blocked',
      action: 'Access denied, logged for review'
    },
  ]

  const behaviorPatterns = [
    {
      entity: 'mechanic_087',
      type: 'User',
      riskScore: 85,
      anomalies: ['Unusual access hours', 'Excessive data downloads', 'New IP location'],
      lastActivity: '2025-11-21 15:30'
    },
    {
      entity: 'api_client_192.168.1.50',
      type: 'Device',
      riskScore: 72,
      anomalies: ['High request rate', 'Failed auth attempts'],
      lastActivity: '2025-11-21 16:45'
    },
    {
      entity: 'service_user_23',
      type: 'Service Account',
      riskScore: 58,
      anomalies: ['Privilege escalation attempt', 'Off-hours activity'],
      lastActivity: '2025-11-21 14:15'
    },
  ]

  const stats = {
    activeThreats: 3,
    blockedAttempts: 147,
    anomaliesDetected: 28,
    avgRiskScore: 42
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">UEBA Security Console</h1>
        <p className="text-gray-400 mt-1">User and Entity Behavior Analytics - Threat Detection & Monitoring</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 border border-red-500 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Active Threats</p>
              <p className="text-3xl font-bold text-red-400 mt-2">{stats.activeThreats}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
        </div>

        <div className="bg-gray-800 border border-green-500 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Blocked Attempts</p>
              <p className="text-3xl font-bold text-green-400 mt-2">{stats.blockedAttempts}</p>
            </div>
            <Shield className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gray-800 border border-yellow-500 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Anomalies Detected</p>
              <p className="text-3xl font-bold text-yellow-400 mt-2">{stats.anomaliesDetected}</p>
            </div>
            <Eye className="w-8 h-8 text-yellow-400" />
          </div>
        </div>

        <div className="bg-gray-800 border border-blue-500 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Avg Risk Score</p>
              <p className="text-3xl font-bold text-blue-400 mt-2">{stats.avgRiskScore}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Anomaly Score Timeline */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-blue-400" />
          Anomaly Score Timeline (24h)
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={anomalyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', color: '#fff' }}
            />
            <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Active Threats */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
          Active Threats & Incidents
        </h2>
        <div className="space-y-4">
          {threats.map((threat) => (
            <div key={threat.id} className={`border-l-4 rounded-lg p-4 bg-gray-900 ${
              threat.severity === 'critical' 
                ? 'border-red-500' 
                : threat.severity === 'high'
                ? 'border-orange-500'
                : 'border-yellow-500'
            }`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{threat.type}</h3>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      threat.severity === 'critical' 
                        ? 'bg-red-500 text-white' 
                        : threat.severity === 'high'
                        ? 'bg-orange-500 text-white'
                        : 'bg-yellow-500 text-gray-900'
                    }`}>
                      {threat.severity.toUpperCase()}
                    </span>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      threat.status === 'blocked' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-blue-500 text-white'
                    }`}>
                      {threat.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{threat.timestamp}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-gray-800 p-3 rounded">
                  <p className="text-xs text-gray-500 mb-1">Source</p>
                  <p className="text-sm text-gray-200">{threat.source}</p>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                  <p className="text-xs text-gray-500 mb-1">Target</p>
                  <p className="text-sm text-gray-200">{threat.target}</p>
                </div>
              </div>

              <div className="bg-gray-800 p-3 rounded mb-3">
                <p className="text-xs text-gray-500 mb-1">Description</p>
                <p className="text-sm text-gray-200">{threat.description}</p>
              </div>

              <div className="bg-green-900 border border-green-500 p-3 rounded">
                <p className="text-xs text-green-400 mb-1">Action Taken</p>
                <p className="text-sm text-green-200">{threat.action}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Behavior Patterns */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Lock className="w-5 h-5 mr-2 text-yellow-400" />
          High-Risk Behavior Patterns
        </h2>
        <div className="space-y-4">
          {behaviorPatterns.map((pattern, idx) => (
            <div key={idx} className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{pattern.entity}</h3>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-600 text-white">
                      {pattern.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">Last Activity: {pattern.lastActivity}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Risk Score</p>
                  <p className={`text-3xl font-bold ${
                    pattern.riskScore >= 80 ? 'text-red-400' : 'text-yellow-400'
                  }`}>
                    {pattern.riskScore}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-2">Detected Anomalies:</p>
                <div className="flex flex-wrap gap-2">
                  {pattern.anomalies.map((anomaly, i) => (
                    <span key={i} className="text-xs px-3 py-1 bg-red-900 border border-red-500 text-red-200 rounded">
                      {anomaly}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
