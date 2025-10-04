import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, LoginCredentials, RegisterData, UserProfile, AuthState, AuthActions } from '@/types'
import { authService } from '@/services/authService'
import toast from 'react-hot-toast'

interface AuthStore extends AuthState, AuthActions {}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      // Actions
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true })
        
        try {
          const response = await authService.login(credentials)
          
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
          })

          toast.success('Login successful!')
        } catch (error) {
          set({ isLoading: false })
          const message = error instanceof Error ? error.message : 'Login failed'
          toast.error(message)
          throw error
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true })
        
        try {
          const response = await authService.register(data)
          
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
          })

          toast.success('Registration successful!')
        } catch (error) {
          set({ isLoading: false })
          const message = error instanceof Error ? error.message : 'Registration failed'
          toast.error(message)
          throw error
        }
      },

      logout: async () => {
        set({ isLoading: true })
        
        try {
          await authService.logout()
        } catch (error) {
          console.warn('Logout error:', error)
        } finally {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          })
          
          toast.success('Logged out successfully')
        }
      },

      updateProfile: async (data: UserProfile) => {
        set({ isLoading: true })
        
        try {
          const updatedUser = await authService.updateProfile(data)
          
          set({
            user: updatedUser,
            isLoading: false,
          })

          toast.success('Profile updated successfully!')
        } catch (error) {
          set({ isLoading: false })
          const message = error instanceof Error ? error.message : 'Profile update failed'
          toast.error(message)
          throw error
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      },

      // Initialize from stored data
      initialize: () => {
        const token = authService.getStoredToken()
        const user = authService.getStoredUser()
        
        if (token && user && !authService.isTokenExpired()) {
          set({
            user,
            token,
            isAuthenticated: true,
          })
        } else {
          // Clear invalid data
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

// Initialize store on app start
if (typeof window !== 'undefined') {
  useAuthStore.getState().initialize()
}
