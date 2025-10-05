import React from 'react'
import { Link } from 'react-router-dom'
import { Footer } from './Footer'

interface HomeLayoutProps {
  children?: React.ReactNode
}

export const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Home Header - Just Logo */}
      <header className="absolute top-4 left-4 z-10">
        <Link to="/" className="flex items-center focus:outline-none focus:ring-0 focus:ring-offset-0">
          <div className="logo">T</div>
        </Link>
      </header>
      
      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
