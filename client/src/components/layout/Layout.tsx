import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Sidebar } from './Sidebar'

interface LayoutProps {
  children?: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          {children || <Outlet />}
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
