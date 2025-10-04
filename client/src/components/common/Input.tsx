import React from 'react'
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange?.(e.target.value)
  }

  const inputClasses = cn(
    'input',
    error && 'input-error',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )

  const InputComponent = type === 'textarea' ? 'textarea' : 'input'

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={name} className="label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <InputComponent
        id={name}
        name={name}
        type={type === 'textarea' ? undefined : type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        className={inputClasses}
        rows={type === 'textarea' ? 3 : undefined}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
