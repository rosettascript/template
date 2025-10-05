import React from 'react'
import { ButtonProps } from '@/types'
import { cn } from '@/utils'

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className,
  ...props
}) => {
  const baseClasses = 'btn'
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
    danger: 'btn-danger',
    success: 'btn-success',
  }
  
  const sizeClasses = {
    sm: 'btn-sm',
    md: 'px-4 py-2 text-base',
    lg: 'btn-lg',
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && 'opacity-50 cursor-not-allowed',
        loading && 'opacity-75 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {loading && (
        <div className="loading-spinner icon-sm -ml-1 mr-2" />
      )}
      {children}
    </button>
  )
}
