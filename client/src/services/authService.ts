import { apiService } from './api'
import { LoginCredentials, RegisterData, AuthResponse, User, UserProfile } from '@/types'

export class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/login', credentials)
    
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Login failed')
    }

    // Store token and user data
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user', JSON.stringify(response.data.user))

    return response.data
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/register', data)
    
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Registration failed')
    }

    // Store token and user data
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user', JSON.stringify(response.data.user))

    return response.data
  }

  async logout(): Promise<void> {
    try {
      await apiService.post('/auth/logout')
    } catch (error) {
      // Continue with logout even if API call fails
      console.warn('Logout API call failed:', error)
    } finally {
      // Clear local storage
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }

  async getProfile(): Promise<User> {
    const response = await apiService.get<User>('/users/profile')
    
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Failed to fetch profile')
    }

    return response.data
  }

  async updateProfile(data: UserProfile): Promise<User> {
    const response = await apiService.put<User>('/users/profile', data)
    
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Failed to update profile')
    }

    // Update stored user data
    localStorage.setItem('user', JSON.stringify(response.data))

    return response.data
  }

  async refreshToken(): Promise<string> {
    const response = await apiService.post<{ token: string }>('/auth/refresh')
    
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Token refresh failed')
    }

    localStorage.setItem('token', response.data.token)
    return response.data.token
  }

  async verifyEmail(token: string): Promise<void> {
    const response = await apiService.post('/auth/verify-email', { token })
    
    if (!response.success) {
      throw new Error(response.error?.message || 'Email verification failed')
    }
  }

  async forgotPassword(email: string): Promise<void> {
    const response = await apiService.post('/auth/forgot-password', { email })
    
    if (!response.success) {
      throw new Error(response.error?.message || 'Password reset request failed')
    }
  }

  async resetPassword(token: string, password: string): Promise<void> {
    const response = await apiService.post('/auth/reset-password', { token, password })
    
    if (!response.success) {
      throw new Error(response.error?.message || 'Password reset failed')
    }
  }

  // Helper methods
  getStoredToken(): string | null {
    return localStorage.getItem('token')
  }

  getStoredUser(): User | null {
    const userStr = localStorage.getItem('user')
    if (!userStr) return null
    
    try {
      return JSON.parse(userStr)
    } catch {
      return null
    }
  }

  isTokenExpired(): boolean {
    const token = this.getStoredToken()
    if (!token) return true

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const currentTime = Date.now() / 1000
      return payload.exp < currentTime
    } catch {
      return true
    }
  }
}

export const authService = new AuthService()
