'use client'

import { BarChart3, TrendingUp, Users, DollarSign, Clock, Wrench } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function AnalyticsPage() {
  const predictionAccuracy = [
    { month: 'Jun', accuracy: 82 },
    { month: 'Jul', accuracy: 85 },
    { month: 'Aug', accuracy: 88 },
    { month: 'Sep', accuracy: 91 },
    { month: 'Oct', accuracy: 93 },
    { month: 'Nov', accuracy: 95 },
  ]

  const failuresByComponent = [
    { name: 'Alternator', value: 48 },
    { name: 'Brake System', value: 35 },
    { name: 'Battery', value: 28 },
    { name: 'Oil Pump', value: 15 },
    { name: 'Cooling System', value: 12 },
  ]

  const costSavings = [
    { month: 'Jun', prevented: 45000, actual: 12000 },
    { month: 'Jul', prevented: 52000, actual: 15000 },
    { month: 'Aug', prevented: 61000, actual: 11000 },
    { month: 'Sep', prevented: 68000, actual: 9000 },
    { month: 'Oct', prevented: 74000, actual: 8000 },
    { month: 'Nov', prevented: 82000, actual: 7000 },
  ]

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

  const stats = {
    totalPredictions: 1247,
    accuracy: 95,
    preventedBreakdowns: 1056,
    costSaved: '$412K'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-1">System performance metrics and business insights</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Predictions</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalPredictions}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Prediction Accuracy</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.accuracy}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Prevented Breakdowns</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.preventedBreakdowns}</p>
            </div>
            <Wrench className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Cost Saved</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.costSaved}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Prediction Accuracy Trend */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Prediction Accuracy Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={predictionAccuracy}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[75, 100]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={3} name="Accuracy %" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Cost Savings Analysis */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Cost Savings Analysis</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={costSavings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="prevented" fill="#10b981" name="Breakdowns Prevented ($)" />
            <Bar dataKey="actual" fill="#ef4444" name="Actual Repair Costs ($)" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm font-medium text-green-900">
            💰 Total Cost Savings: <span className="text-2xl font-bold">$412,000</span>
          </p>
          <p className="text-sm text-green-700 mt-1">
            By predicting and preventing breakdowns, we&apos;ve saved 85% of potential repair costs
          </p>
        </div>
      </div>

      {/* Failures by Component */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Failures by Component</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={failuresByComponent}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {failuresByComponent.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Performance Indicators</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Avg Prediction Lead Time</p>
                  <p className="text-2xl font-bold text-gray-900">5.2 days</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Customer Satisfaction</p>
                  <p className="text-2xl font-bold text-gray-900">4.6/5.0</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center">
                <Wrench className="w-8 h-8 text-yellow-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Service Completion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">94%</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center">
                <BarChart3 className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">AI Model Confidence</p>
                  <p className="text-2xl font-bold text-gray-900">92%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ROI Summary */}
      <div className="card bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <h2 className="text-2xl font-bold mb-4">Return on Investment (ROI)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-blue-200 text-sm">Total Investment</p>
            <p className="text-3xl font-bold mt-2">$85,000</p>
            <p className="text-sm text-blue-200 mt-1">System deployment & training</p>
          </div>
          <div>
            <p className="text-blue-200 text-sm">Cost Savings (6 months)</p>
            <p className="text-3xl font-bold mt-2">$412,000</p>
            <p className="text-sm text-blue-200 mt-1">Prevented breakdowns & repairs</p>
          </div>
          <div>
            <p className="text-blue-200 text-sm">Net ROI</p>
            <p className="text-3xl font-bold mt-2">485%</p>
            <p className="text-sm text-blue-200 mt-1">5x return in 6 months</p>
          </div>
        </div>
      </div>
    </div>
  )
}
