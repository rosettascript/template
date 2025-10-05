import { Routes, Route } from 'react-router-dom'

import Layout from '@/components/layout/Layout'
import { HomeLayout } from '@/components/layout/HomeLayout'
import { ProtectedRoute } from '@/components/common/ProtectedRoute'
import { HomePage } from '@/pages/HomePage'
import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { NotFoundPage } from '@/pages/NotFoundPage'

function App() {
  return (
    <Routes>
      {/* Home page with simple layout */}
      <Route path="/" element={
        <HomeLayout>
          <HomePage />
        </HomeLayout>
      } />
      
      {/* Auth pages with simple layout */}
      <Route path="/login" element={
        <HomeLayout>
          <LoginPage />
        </HomeLayout>
      } />
      <Route path="/register" element={
        <HomeLayout>
          <RegisterPage />
        </HomeLayout>
      } />
      
      {/* Protected pages with sidebar layout */}
      <Route path="/dashboard" element={
        <Layout>
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        </Layout>
      } />
      <Route path="/profile" element={
        <Layout>
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        </Layout>
      } />
      <Route path="*" element={
        <Layout>
          <NotFoundPage />
        </Layout>
      } />
    </Routes>
  )
}

export default App
