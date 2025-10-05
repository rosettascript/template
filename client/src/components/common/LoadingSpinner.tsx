import React from 'react'
import { cn } from '@/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className,
}) => {
  const sizeClasses = {
    sm: 'icon-sm',
    md: 'icon-lg',
    lg: 'icon-xl',
  }

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div
        className={cn(
          'loading-spinner',
          sizeClasses[size]
        )}
      />
    </div>
  )
}
