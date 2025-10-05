import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { InputProps } from '@/types'
import { cn } from '@/utils'

export const Input: React.FC<InputProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  value,
  error,
  required = false,
  disabled = false,
  onChange,
  className,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange?.(e.target.value)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const inputClasses = cn(
    'input',
    error && 'input-error',
    disabled && 'bg-gray-50 text-gray-500 cursor-not-allowed',
    isPassword && 'pr-10', // Add padding for the eye icon
    className
  )

  const InputComponent = type === 'textarea' ? 'textarea' : 'input'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={name} className={cn('label', required && 'label-required')}>
          {label}
        </label>
      )}
      
      <div className="relative">
        <InputComponent
          id={name}
          name={name}
          type={type === 'textarea' ? undefined : inputType}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          className={inputClasses}
          rows={type === 'textarea' ? 3 : undefined}
          {...props}
        />
        
        {isPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="icon-md" />
            ) : (
              <Eye className="icon-md" />
            )}
          </button>
        )}
      </div>
      
      {error && (
        <p className="form-error">{error}</p>
      )}
    </div>
  )
}
