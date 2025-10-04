import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from '@/hooks/useForm'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { LoginCredentials } from '@/types'

interface LoginFormData {
  email: string
  password: string
}

const initialValues: LoginFormData = {
  email: '',
  password: '',
}

const validateForm = (values: LoginFormData) => {
  const errors: Partial<Record<keyof LoginFormData, string>> = {}

  if (!values.email) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (!values.password) {
    errors.password = 'Password is required'
  }

  return errors
}

export const LoginForm: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isLoading } = useAuth()
  
  const {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(initialValues, validateForm)

  const onSubmit = async (values: LoginFormData) => {
    const result = await login(values)
    
    if (result.success) {
      // Redirect to intended page or dashboard
      const from = location.state?.from?.pathname || '/dashboard'
      navigate(from, { replace: true })
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <div className="card-header">
          <h2 className="text-2xl font-bold text-center text-gray-900">Sign In</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome back! Please sign in to your account.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="card-body space-y-6">
          <Input
            name="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={values.email}
            error={touched.email ? errors.email : undefined}
            required
            onChange={handleChange('email')}
            onBlur={handleBlur('email')}
          />

          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={values.password}
            error={touched.password ? errors.password : undefined}
            required
            onChange={handleChange('password')}
            onBlur={handleBlur('password')}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            loading={isSubmitting || isLoading}
            className="w-full"
          >
            {isSubmitting || isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="card-footer">
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
