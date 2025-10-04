import { useAuthStore } from '@/stores/authStore'
import { LoginCredentials, RegisterData, UserProfile } from '@/types'

export function useAuth() {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    setLoading,
  } = useAuthStore()

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      await login(credentials)
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      }
    }
  }

  const handleRegister = async (data: RegisterData) => {
    try {
      await register(data)
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Registration failed' 
      }
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Logout failed' 
      }
    }
  }

  const handleUpdateProfile = async (data: UserProfile) => {
    try {
      await updateProfile(data)
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Profile update failed' 
      }
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    updateProfile: handleUpdateProfile,
    setLoading,
  }
}
