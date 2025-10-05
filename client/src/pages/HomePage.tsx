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
      <section className="bg-gradient-to-r from-button-primary to-primary-600 text-white">
        <div className="container py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Template App
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Build faster with our comprehensive development template featuring authentication, database integration, and modern tooling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button variant="secondary" size="lg">
                    Go to Dashboard
                    <ArrowRight className="icon-md ml-2" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button variant="primary" size="lg">
                      Get Started
                      <ArrowRight className="icon-md ml-2" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="secondary" size="lg">
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
      <section className="section-lg bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Everything you need to build modern web applications
            </h2>
            <p className="text-xl text-text-secondary">
              Everything you need to kickstart your next project with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-secondary">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-lg bg-background-secondary">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Join Our Developer Community
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            Connect with thousands of developers who are already building amazing applications with our template.
          </p>
          {!isAuthenticated && (
            <Link to="/register">
              <Button variant="primary" size="lg">
                Join Now
                <ArrowRight className="icon-md ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}
