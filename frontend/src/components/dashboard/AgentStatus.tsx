'use client'

import { Activity } from 'lucide-react'

export default function AgentStatus() {
  const agents = [
    {
      name: 'Data Analysis Agent',
      status: 'active',
      activity: 'Analyzing telemetry for Vehicle #VIN45678',
      tasksCompleted: 1247,
      color: 'bg-blue-500'
    },
    {
      name: 'Diagnosis Agent',
      status: 'active',
      activity: 'High alternator heat detected in VIN12345',
      tasksCompleted: 892,
      color: 'bg-purple-500'
    },
    {
      name: 'Scheduling Agent',
      status: 'active',
      activity: 'Booking appointment for Vehicle #VIN23456',
      tasksCompleted: 456,
      color: 'bg-green-500'
    },
    {
      name: 'Voice Agent',
      status: 'active',
      activity: 'Call successful – owner confirmed appointment',
      tasksCompleted: 234,
      color: 'bg-orange-500'
    },
    {
      name: 'Feedback Agent',
      status: 'idle',
      activity: 'Awaiting post-service feedback',
      tasksCompleted: 567,
      color: 'bg-cyan-500'
    },
    {
      name: 'Manufacturing Insights',
      status: 'active',
      activity: 'Analyzing batch patterns for alternator failures',
      tasksCompleted: 123,
      color: 'bg-indigo-500'
    },
  ]

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">AI Agent Activity Monitor</h2>
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-success-500 animate-pulse" />
          <span className="text-sm font-medium text-success-600">All Systems Operational</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <div
            key={agent.name}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${agent.color} mr-2`}></div>
                <span className="text-xs font-semibold uppercase text-gray-500">
                  {agent.status}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {agent.tasksCompleted} tasks
              </span>
            </div>

            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              {agent.name}
            </h3>

            <div className="bg-gray-50 rounded p-3">
              <p className="text-xs text-gray-700 leading-relaxed">
                {agent.activity}
              </p>
            </div>

            {/* Activity Bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                <span>Activity</span>
                <span>{agent.status === 'active' ? '98%' : '0%'}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full ${agent.color} ${agent.status === 'active' ? 'animate-pulse' : ''}`}
                  style={{ width: agent.status === 'active' ? '98%' : '0%' }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
