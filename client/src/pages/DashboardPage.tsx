import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { User, Calendar, BarChart3, Settings, CheckCircle } from 'lucide-react'

export const DashboardPage: React.FC = () => {
  const { user } = useAuth()

  const stats = [
    {
      name: 'Total Users',
      value: '1,234',
      change: '+12%',
      changeType: 'positive',
      icon: <User className="h-6 w-6" />,
    },
    {
      name: 'Active Sessions',
      value: '567',
      change: '+8%',
      changeType: 'positive',
      icon: <Calendar className="h-6 w-6" />,
    },
    {
      name: 'Revenue',
      value: '$12,345',
      change: '+23%',
      changeType: 'positive',
      icon: <BarChart3 className="h-6 w-6" />,
    },
    {
      name: 'Settings',
      value: '24',
      change: '+2%',
      changeType: 'neutral',
      icon: <Settings className="h-6 w-6" />,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.firstName || user?.displayName || 'User'}!
          </h1>
          <p className="mt-2 text-gray-600">
            Here's what's happening with your account today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="card">
              <div className="card-body">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 bg-primary-100 text-primary-600 rounded-lg">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${
                      stat.changeType === 'positive' ? 'text-green-600' : 
                      stat.changeType === 'negative' ? 'text-red-600' : 
                      'text-gray-600'
                    }`}>
                      {stat.change} from last month
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Profile updated successfully</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">New user registered</p>
                    <p className="text-xs text-gray-500">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Settings className="h-4 w-4 text-yellow-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Settings modified</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <User className="h-6 w-6 text-primary-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Manage Users</p>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Settings className="h-6 w-6 text-primary-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Settings</p>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <BarChart3 className="h-6 w-6 text-primary-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Analytics</p>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Calendar className="h-6 w-6 text-primary-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Schedule</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
