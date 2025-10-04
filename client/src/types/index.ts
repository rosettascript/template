// User types
export interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  displayName?: string
  status: 'active' | 'inactive' | 'suspended' | 'deleted'
  roles: string[]
  emailVerifiedAt?: string
  createdAt: string
  updatedAt: string
}

export interface UserProfile {
  firstName?: string
  lastName?: string
  displayName?: string
  phone?: string
  bio?: string
  locale?: string
  timezone?: string
}

// Auth types
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface AuthResponse {
  user: User
  token: string
}

// API types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: {
    message: string
    statusCode: number
  }
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Form types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'tel' | 'textarea' | 'select'
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
}

// Component props types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export interface InputProps extends BaseComponentProps {
  name: string
  label?: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'textarea'
  placeholder?: string
  value?: string
  error?: string
  required?: boolean
  disabled?: boolean
  onChange?: (value: string) => void
}

// Store types
export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  updateProfile: (data: UserProfile) => Promise<void>
  setLoading: (loading: boolean) => void
}
