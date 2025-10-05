import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  User, 
  Settings, 
  BarChart3, 
  Calendar,
  FileText,
  HelpCircle,
  X,
  Menu
} from 'lucide-react'
import { cn } from '@/utils'

interface SidebarProps {
  className?: string
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation()

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      current: location.pathname === '/dashboard'
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: User,
      current: location.pathname === '/profile'
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: BarChart3,
      current: location.pathname === '/analytics'
    },
    {
      name: 'Calendar',
      href: '/calendar',
      icon: Calendar,
      current: location.pathname === '/calendar'
    },
    {
      name: 'Documents',
      href: '/documents',
      icon: FileText,
      current: location.pathname === '/documents'
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
      current: location.pathname === '/settings'
    }
  ]

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className={cn(
      'sidebar h-screen',
      isCollapsed ? 'w-20' : 'w-64',
      'transition-all duration-300 ease-in-out',
      className
    )}>
      {/* Sidebar Header */}
      <div className={cn(
        'flex items-center h-16 border-b border-gray-200',
        isCollapsed ? 'justify-center px-2' : 'justify-between px-4'
      )}>
        {!isCollapsed && (
          <div className="flex items-center">
            <div className="logo">T</div>
            <span className="app-title ml-2">Template</span>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-0 focus:ring-offset-0"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <Menu className="h-5 w-5" />
          ) : (
            <X className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className={cn('flex-1 py-4 space-y-2', isCollapsed ? 'px-2' : 'px-4')}>
        {navigationItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'nav-link flex items-center py-2 rounded-md text-sm font-medium transition-colors duration-200',
                isCollapsed ? 'px-2 justify-center' : 'px-3',
                item.current
                  ? 'bg-button-primary text-white'
                  : 'text-text-secondary hover:bg-gray-100 hover:text-text-primary'
              )}
            >
              <Icon className={cn('h-5 w-5 flex-shrink-0', isCollapsed ? 'mx-auto' : 'mr-3')} />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className={cn('py-4 border-t border-gray-200', isCollapsed ? 'px-2' : 'px-4')}>
        <Link
          to="/help"
          className={cn(
            'nav-link flex items-center py-2 rounded-md text-sm font-medium text-text-secondary hover:bg-gray-100 hover:text-text-primary transition-colors duration-200',
            isCollapsed ? 'px-2 justify-center' : 'px-3'
          )}
        >
          <HelpCircle className={cn('h-5 w-5 flex-shrink-0', isCollapsed ? 'mx-auto' : 'mr-3')} />
          {!isCollapsed && <span>Help & Support</span>}
        </Link>
      </div>
    </div>
  )
}
