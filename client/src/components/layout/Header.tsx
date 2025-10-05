import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, User, LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/common/Button'
import { cn } from '@/utils'

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center focus:outline-none focus:ring-0 focus:ring-offset-0">
            <div className="logo">T</div>
            <span className="app-title ml-2">Template</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {isAuthenticated && (
            <>
              <Link
                to="/dashboard"
                className="nav-link"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="nav-link"
              >
                Profile
              </Link>
            </>
          )}
        </nav>


          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-text-primary hover:text-button-primary p-2 transition-colors"
            >
              {isMenuOpen ? <X className="icon-lg" /> : <Menu className="icon-lg" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              <Link
                to="/dashboard"
                className="nav-link block"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="nav-link block"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            </div>
          </div>
        )}
    </header>
  )
}
