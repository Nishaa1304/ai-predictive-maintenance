'use client'

import { Bell, Search, User } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 z-10">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
            <input
              type="text"
              placeholder="Search vehicles, alerts, or components..."
              className="w-full pl-10 pr-4 py-2 border-2 border-black rounded-lg text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 ml-6">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">Service Manager</p>
            </div>
            <button className="flex items-center justify-center w-10 h-10 bg-primary-100 text-primary-600 rounded-full hover:bg-primary-200 transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
