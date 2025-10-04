import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from '@/hooks/useForm'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { RegisterData } from '@/types'

interface RegisterFormData {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
}

const initialValues: RegisterFormData = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
}

const validateForm = (values: RegisterFormData) => {
  const errors: Partial<Record<keyof RegisterFormData, string>> = {}

  if (!values.email) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (!values.password) {
    errors.password = 'Password is required'
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long'
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password'
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }

  if (!values.firstName) {
    errors.firstName = 'First name is required'
  }

  if (!values.lastName) {
    errors.lastName = 'Last name is required'
  }

  return errors
}

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate()
  const { register, isLoading } = useAuth()
  
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

  const onSubmit = async (values: RegisterFormData) => {
    const { confirmPassword, ...registerData } = values
    const result = await register(registerData)
    
    if (result.success) {
      navigate('/dashboard', { replace: true })
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <div className="card-header">
          <h2 className="text-2xl font-bold text-center text-gray-900">Create Account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Get started with your free account today.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="card-body space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="firstName"
              label="First Name"
              placeholder="Enter your first name"
              value={values.firstName}
              error={touched.firstName ? errors.firstName : undefined}
              required
              onChange={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
            />

            <Input
              name="lastName"
              label="Last Name"
              placeholder="Enter your last name"
              value={values.lastName}
              error={touched.lastName ? errors.lastName : undefined}
              required
              onChange={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
            />
          </div>

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
            placeholder="Create a password"
            value={values.password}
            error={touched.password ? errors.password : undefined}
            required
            onChange={handleChange('password')}
            onBlur={handleBlur('password')}
          />

          <Input
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={values.confirmPassword}
            error={touched.confirmPassword ? errors.confirmPassword : undefined}
            required
            onChange={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
          />

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I agree to the{' '}
              <a href="#" className="text-primary-600 hover:text-primary-500">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary-600 hover:text-primary-500">
                Privacy Policy
              </a>
            </label>
          </div>

          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            loading={isSubmitting || isLoading}
            className="w-full"
          >
            {isSubmitting || isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <div className="card-footer">
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
