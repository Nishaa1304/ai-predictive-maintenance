'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Car, 
  Calendar, 
  Phone, 
  Factory, 
  Shield,
  MessageSquare,
  BarChart3,
  Settings
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Vehicles', href: '/vehicles', icon: Car },
  { name: 'Scheduling', href: '/scheduling', icon: Calendar },
  { name: 'Voice Agent', href: '/voice-agent', icon: Phone },
  { name: 'Feedback', href: '/feedback', icon: MessageSquare },
  { name: 'Manufacturing', href: '/manufacturer', icon: Factory },
  { name: 'UEBA Security', href: '/security', icon: Shield },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow bg-primary-800 overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 px-4 py-6 bg-primary-900">
          <Car className="w-8 h-8 text-white mr-3" />
          <div>
            <h1 className="text-white text-xl font-bold">AI Vehicle</h1>
            <p className="text-primary-300 text-xs">Predictive Maintenance</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center px-4 py-3 text-sm font-medium rounded-lg
                  transition-colors duration-150
                  ${isActive 
                    ? 'bg-primary-900 text-white' 
                    : 'text-primary-100 hover:bg-primary-700 hover:text-white'
                  }
                `}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Section */}
        <div className="flex-shrink-0 px-2 py-4 border-t border-primary-700">
          <Link
            href="/settings"
            className="flex items-center px-4 py-3 text-sm font-medium text-primary-100 rounded-lg hover:bg-primary-700 hover:text-white transition-colors"
          >
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Link>
        </div>
      </div>
    </div>
  )
}
