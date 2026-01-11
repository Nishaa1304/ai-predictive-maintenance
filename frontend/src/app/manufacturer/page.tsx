'use client'

import { Factory, AlertTriangle, TrendingUp, FileText } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function ManufacturerPage() {
  const recurringFailures = [
    { component: 'Alternator', count: 48, severity: 'high' },
    { component: 'Brake Pads', count: 35, severity: 'medium' },
    { component: 'Battery', count: 28, severity: 'medium' },
    { component: 'Oil Pump', count: 15, severity: 'low' },
    { component: 'Coolant System', count: 12, severity: 'high' },
  ]

  const batchAnalysis = [
    {
      batchId: 'BATCH-2024-A',
      component: 'Alternator',
      vehiclesAffected: 48,
      failureRate: '12%',
      avgTimeToFailure: '18,500 km',
      status: 'critical'
    },
    {
      batchId: 'BATCH-2024-B',
      component: 'Brake System',
      vehiclesAffected: 35,
      failureRate: '8%',
      avgTimeToFailure: '25,000 km',
      status: 'warning'
    },
    {
      batchId: 'BATCH-2023-C',
      component: 'Battery',
      vehiclesAffected: 28,
      failureRate: '7%',
      avgTimeToFailure: '22,000 km',
      status: 'warning'
    },
  ]

  const capaRecommendations = [
    {
      id: 1,
      title: 'Alternator Overheating - Design Review Required',
      component: 'Alternator',
      priority: 'critical',
      affectedBatches: ['BATCH-2024-A', 'BATCH-2024-B'],
      rootCause: 'Insufficient cooling capacity in alternator housing design. Heat dissipation inadequate under sustained high-load conditions.',
      recommendation: 'Redesign alternator housing with enhanced ventilation. Increase cooling fin surface area by 30%. Consider copper heat sink integration.',
      estimatedImpact: '$2.4M cost savings, 75% failure reduction',
      status: 'open'
    },
    {
      id: 2,
      title: 'Brake Pad Material Composition Issue',
      component: 'Brake Pads',
      priority: 'high',
      affectedBatches: ['BATCH-2024-B'],
      rootCause: 'Current brake pad material shows accelerated wear in high-temperature environments. Supplier material quality inconsistent.',
      recommendation: 'Switch to ceramic-composite brake pads. Implement stricter quality control for supplier materials. Add temperature monitoring.',
      estimatedImpact: '$1.2M cost savings, 60% wear reduction',
      status: 'in-progress'
    },
  ]

  const stats = {
    totalBatches: 12,
    criticalIssues: 3,
    capaGenerated: 8,
    costSavings: '$4.8M'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Manufacturing Insights</h1>
        <p className="text-gray-600 mt-1">Root Cause Analysis (RCA) and Corrective Actions (CAPA)</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Batches</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalBatches}</p>
            </div>
            <Factory className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Critical Issues</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{stats.criticalIssues}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">CAPA Generated</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.capaGenerated}</p>
            </div>
            <FileText className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Cost Savings</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.costSavings}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Recurring Failures Chart */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Recurring Failures by Component</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={recurringFailures}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="component" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Batch Analysis */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Batch-Level Analysis</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Batch ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Component</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Vehicles Affected</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Failure Rate</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Avg Time to Failure</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {batchAnalysis.map((batch, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{batch.batchId}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{batch.component}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{batch.vehiclesAffected}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{batch.failureRate}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{batch.avgTimeToFailure}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      batch.status === 'critical' 
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {batch.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CAPA Recommendations */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">CAPA Recommendations</h2>
        <div className="space-y-4">
          {capaRecommendations.map((capa) => (
            <div key={capa.id} className={`border-l-4 rounded-lg p-4 ${
              capa.priority === 'critical' 
                ? 'border-red-500 bg-red-50' 
                : 'border-yellow-500 bg-yellow-50'
            }`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{capa.title}</h3>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      capa.priority === 'critical' 
                        ? 'bg-red-200 text-red-800' 
                        : 'bg-yellow-200 text-yellow-800'
                    }`}>
                      {capa.priority.toUpperCase()}
                    </span>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      capa.status === 'open' 
                        ? 'bg-gray-200 text-gray-800' 
                        : 'bg-blue-200 text-blue-800'
                    }`}>
                      {capa.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Component:</strong> {capa.component}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Affected Batches:</strong> {capa.affectedBatches.join(', ')}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-white p-3 rounded">
                  <p className="text-sm font-semibold text-gray-900 mb-1">Root Cause:</p>
                  <p className="text-sm text-gray-700">{capa.rootCause}</p>
                </div>

                <div className="bg-white p-3 rounded">
                  <p className="text-sm font-semibold text-gray-900 mb-1">Recommendation:</p>
                  <p className="text-sm text-gray-700">{capa.recommendation}</p>
                </div>

                <div className="bg-green-100 p-3 rounded">
                  <p className="text-sm font-semibold text-green-900 mb-1">Estimated Impact:</p>
                  <p className="text-sm text-green-800">{capa.estimatedImpact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
