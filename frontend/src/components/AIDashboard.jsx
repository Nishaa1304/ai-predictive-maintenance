'use client';

import { useState, useEffect } from 'react';
import api from '../services/api';
import AgentReportModal from './AgentReportModal';

export default function AIDashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showVehicleSelector, setShowVehicleSelector] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const agents = [
    {
      id: 'data_analysis',
      name: 'Data Analysis Agent',
      icon: '📊',
      color: 'from-blue-500 to-cyan-500',
      borderColor: 'border-blue-500/50',
      glowColor: 'shadow-blue-500/50',
      description: 'Analyzes vehicle telemetry and sensor data'
    },
    {
      id: 'diagnosis',
      name: 'Diagnosis Agent',
      icon: '🔧',
      color: 'from-orange-500 to-red-500',
      borderColor: 'border-orange-500/50',
      glowColor: 'shadow-orange-500/50',
      description: 'Predicts failures and estimates repair costs'
    },
    {
      id: 'customer_engagement',
      name: 'Customer Engagement Agent',
      icon: '💬',
      color: 'from-green-500 to-emerald-500',
      borderColor: 'border-green-500/50',
      glowColor: 'shadow-green-500/50',
      description: 'Generates personalized call scripts'
    },
    {
      id: 'scheduling',
      name: 'Scheduling Agent',
      icon: '📅',
      color: 'from-purple-500 to-pink-500',
      borderColor: 'border-purple-500/50',
      glowColor: 'shadow-purple-500/50',
      description: 'Manages service appointments'
    },
    {
      id: 'feedback',
      name: 'Feedback Agent',
      icon: '⭐',
      color: 'from-yellow-500 to-amber-500',
      borderColor: 'border-yellow-500/50',
      glowColor: 'shadow-yellow-500/50',
      description: 'Collects customer satisfaction data'
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing Insights Agent',
      icon: '🏭',
      color: 'from-indigo-500 to-blue-500',
      borderColor: 'border-indigo-500/50',
      glowColor: 'shadow-indigo-500/50',
      description: 'Analyzes recurring defects for OEMs'
    }
  ];

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const data = await api.getVehicles();
      if (data.vehicles) {
        setVehicles(Object.values(data.vehicles));
      }
    } catch (error) {
      console.error('Error loading vehicles:', error);
    }
  };

  const handleAgentClick = (agent) => {
    setSelectedAgent(agent);
    setShowVehicleSelector(true);
  };

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowVehicleSelector(false);
    setShowReport(true);
  };

  const closeReport = () => {
    setShowReport(false);
    setSelectedAgent(null);
    setSelectedVehicle(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                AI Predictive Maintenance System
              </h1>
              <p className="text-lg text-gray-400">
                Click any AI agent → Select vehicle → Get voice-enabled report
              </p>
            </div>
            
            {/* Voice Assistant Button - Speaking Person Icon */}
            <button className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 group">
              {/* Speaking Person Icon with Sound Waves */}
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Head */}
                <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
                {/* Body */}
                <path d="M6 21V19C6 16.7909 7.79086 15 10 15H14C16.2091 15 18 16.7909 18 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                {/* Sound waves */}
                <path d="M19 10C19.5 10.5 20 11.5 20 12.5C20 13.5 19.5 14.5 19 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-pulse" />
                <path d="M5 10C4.5 10.5 4 11.5 4 12.5C4 13.5 4.5 14.5 5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
              </svg>
              <span className="font-semibold hidden md:inline">Voice Assistant</span>
            </button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-5 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
              <div className="text-gray-400 text-sm mb-1">Active Agents</div>
              <div className="text-3xl font-bold">{agents.length}</div>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-5 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300">
              <div className="text-gray-400 text-sm mb-1">Total Vehicles</div>
              <div className="text-3xl font-bold">{vehicles.length}</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-5 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
              <div className="text-gray-400 text-sm mb-1">System Health</div>
              <div className="text-3xl font-bold flex items-center gap-2">
                98% <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Agent Grid - Dark Theme with Glowing Effects */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI Agent Activity Monitor
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent, index) => (
              <div
                key={agent.id}
                onClick={() => handleAgentClick(agent)}
                className="group relative cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Glowing Border Effect on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${agent.color} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 rounded-2xl`}></div>
                
                {/* Card Content */}
                <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-2xl">
                  
                  {/* Agent Icon */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${agent.color} flex items-center justify-center text-2xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}>
                      {agent.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
                        {agent.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-400 font-semibold">Active</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {agent.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-800 rounded-full h-2 mb-4 overflow-hidden">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${agent.color} transition-all duration-1000`}
                      style={{ width: '85%' }}
                    ></div>
                  </div>

                  {/* Action Button */}
                  <button className={`w-full py-2.5 rounded-lg bg-gradient-to-r ${agent.color} font-semibold hover:shadow-lg ${agent.glowColor} transition-all duration-300 transform hover:scale-105`}>
                    View Report →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vehicle Fleet Overview - Dark Theme */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Your Vehicle Fleet
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.vehicle_id}
                className="bg-gray-800/50 border border-gray-700 rounded-xl p-5 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg text-white">{vehicle.model}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    vehicle.type === 'EV' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                  }`}>
                    {vehicle.type}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-1">Year: {vehicle.year}</p>
                <p className="text-sm text-gray-400 mb-1">Owner: {vehicle.owner}</p>
                <p className="text-xs text-gray-500 mt-3 font-mono">{vehicle.vehicle_id}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vehicle Selector Modal - Dark Theme */}
      {showVehicleSelector && selectedAgent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl max-w-3xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${selectedAgent.color} flex items-center justify-center text-3xl shadow-lg`}>
                  {selectedAgent.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {selectedAgent.name}
                  </h2>
                  <p className="text-gray-400">Select a vehicle to analyze</p>
                </div>
              </div>
              <button
                onClick={() => setShowVehicleSelector(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.vehicle_id}
                  onClick={() => handleVehicleSelect(vehicle)}
                  className="relative group bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all hover:scale-105"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-xl text-white">{vehicle.model}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      vehicle.type === 'EV' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                    }`}>
                      {vehicle.type}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-1">Year: {vehicle.year}</p>
                  <p className="text-gray-400 mb-1">Owner: {vehicle.owner}</p>
                  <p className="text-gray-500 text-sm font-mono mt-2">{vehicle.vehicle_id}</p>
                  <div className="mt-4 text-blue-400 font-semibold flex items-center gap-2 group-hover:text-blue-300 transition-colors">
                    View Report <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Agent Report Modal with Voice */}
      {showReport && selectedAgent && selectedVehicle && (
        <AgentReportModal
          agent={selectedAgent}
          vehicle={selectedVehicle}
          onClose={closeReport}
        />
      )}
    </div>
  );
}