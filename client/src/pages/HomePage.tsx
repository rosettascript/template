import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/common/Button'
import { ArrowRight, CheckCircle, Shield, Zap } from 'lucide-react'

export const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth()

  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Secure Authentication',
      description: 'Built-in JWT authentication with role-based access control.',
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Fast Development',
      description: 'Pre-configured with modern tools and best practices.',
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: 'Production Ready',
      description: 'Includes logging, error handling, and monitoring.',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Template App
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              A modern, full-stack template application built with React, TypeScript, and Node.js.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to build modern web applications
            </h2>
            <p className="text-xl text-gray-600">
              Pre-configured with industry best practices and modern development tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of developers who are already building amazing applications.
          </p>
          {!isAuthenticated && (
            <Link to="/register">
              <Button size="lg">
                Create Your Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}
