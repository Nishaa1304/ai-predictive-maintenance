'use client';

import { useState } from 'react';
import { 
  LayoutDashboard, 
  Car, 
  Calendar, 
  Mic, 
  Star, 
  Factory, 
  Lock, 
  BarChart3,
  UserCircle
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export default function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      id: 'dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard',
      color: 'hover:bg-orange-500/20 hover:border-orange-500/50'
    },
    {
      id: 'vehicles',
      icon: Car,
      label: 'Vehicles',
      color: 'hover:bg-orange-500/20 hover:border-orange-500/50'
    },
    {
      id: 'car_owner',
      icon: UserCircle,
      label: 'Car Owner View',
      color: 'hover:bg-green-500/20 hover:border-green-500/50'
    },
    {
      id: 'scheduling',
      icon: Calendar,
      label: 'Scheduling',
      color: 'hover:bg-orange-500/20 hover:border-orange-500/50'
    },
    {
      id: 'voice_agent',
      icon: Mic,
      label: 'Voice Agent',
      color: 'hover:bg-orange-500/20 hover:border-orange-500/50'
    },
    {
      id: 'feedback',
      icon: Star,
      label: 'Feedback',
      color: 'hover:bg-orange-500/20 hover:border-orange-500/50'
    },
    {
      id: 'manufacturing',
      icon: Factory,
      label: 'Manufacturing',
      color: 'hover:bg-orange-500/20 hover:border-orange-500/50'
    },
    {
      id: 'ueba',
      icon: Lock,
      label: 'UEBA Security',
      color: 'hover:bg-orange-500/20 hover:border-orange-500/50'
    },
    {
      id: 'analytics',
      icon: BarChart3,
      label: 'Analytics',
      color: 'hover:bg-orange-500/20 hover:border-orange-500/50'
    }
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-slate-900 border-r border-slate-700 transition-all duration-300 z-40 overflow-y-auto ${
        isCollapsed ? 'w-24' : 'w-72'
      }`}
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-slate-700 to-slate-800 flex items-center justify-center shadow-lg">
              <Car size={28} className="text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-bold text-white text-base">AI Vehicle</h2>
                <p className="text-sm text-slate-400">Predictive Maintenance</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            {isCollapsed ? '→' : '←'}
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2 pb-24">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 border border-transparent ${
                activeView === item.id
                  ? item.id === 'car_owner' 
                    ? 'bg-green-500/20 border-green-500/50 shadow-lg shadow-green-500/20'
                    : 'bg-orange-500/20 border-orange-500/50 shadow-lg shadow-orange-500/20'
                  : `bg-slate-800/50 ${item.color}`
              }`}
            >
              <IconComponent size={24} className="flex-shrink-0 text-white" />
              {!isCollapsed && (
                <div className="flex-1 text-left">
                  <span
                    className={`font-semibold text-base ${
                      activeView === item.id 
                        ? item.id === 'car_owner' ? 'text-green-400' : 'text-orange-400'
                        : 'text-slate-300'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              )}
              {activeView === item.id && (
                <div className={`w-2 h-2 rounded-full animate-pulse ${
                  item.id === 'car_owner' ? 'bg-green-500' : 'bg-orange-500'
                }`}></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700 bg-slate-900">
        {!isCollapsed && (
          <div className="bg-slate-800/50 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400 font-semibold">System Online</span>
            </div>
            <p className="text-sm text-white">v2.0.1 | All systems operational</p>
          </div>
        )}
      </div>
    </div>
  );
}
