import React from 'react'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/common/Button'

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-lg text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>

        <div className="space-y-4">
          <Link to="/">
            <Button size="lg" className="w-full">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Button>
          </Link>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="w-full"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>
        </div>

        <div className="mt-8">
          <p className="text-sm text-gray-500">
            If you think this is an error, please{' '}
            <a href="#" className="text-primary-600 hover:text-primary-500">
              contact support
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
