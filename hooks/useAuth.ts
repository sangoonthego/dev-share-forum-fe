/**
 * useAuth Hook
 * Custom hook for managing authentication state and operations
 * 
 * Pattern: Hooks consume Services
 * Responsibility: State management, service orchestration, error handling for UI
 * 
 * Usage Example:
 * const { user, login, signup, logout, isLoading, error } = useAuth()
 * 
 * Full Flow:
 * UI Component → useAuth Hook → Auth Service → API Client → Backend
 *                                    ↓
 *                            Auth Mapper
 *                                    ↓
 *                           Frontend Types
 */

'use client'

import { useState, useCallback, useEffect } from 'react'
import { authService } from '@/services/auth.service'
import type {
  AuthState,
  AuthUser,
  LoginCredentials,
  SignupData,
} from '@/types'

/**
 * Hook return type for better IDE support
 */
interface UseAuthReturn {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (credentials: LoginCredentials) => Promise<void>
  signup: (data: SignupData) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
}

/**
 * useAuth Hook Implementation
 */
export const useAuth = (): UseAuthReturn => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  })

  /**
   * Initialize auth state from localStorage on mount
   */
  useEffect(() => {
    const initializeAuth = () => {
      if (typeof window !== 'undefined') {
        const storedToken = localStorage.getItem('auth_token')
        const storedUser = localStorage.getItem('auth_user')

        if (storedToken && storedUser) {
          try {
            const user = JSON.parse(storedUser) as AuthUser
            setAuthState((prev) => ({
              ...prev,
              user,
              token: storedToken,
              isAuthenticated: true,
            }))
          } catch {
            // Invalid stored data, clear it
            localStorage.removeItem('auth_token')
            localStorage.removeItem('auth_user')
          }
        }
      }
    }

    initializeAuth()
  }, [])

  /**
   * Login handler
   */
  const login = useCallback(async (credentials: LoginCredentials): Promise<void> => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const { user, token, refreshToken } = await authService.login(credentials)

      // Store user data for persistence
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_user', JSON.stringify(user))
      }

      setAuthState((prev) => ({
        ...prev,
        user,
        token,
        refreshToken,
        isAuthenticated: true,
        isLoading: false,
      }))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed'
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
      throw error
    }
  }, [])

  /**
   * Signup handler
   */
  const signup = useCallback(async (data: SignupData): Promise<void> => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const { user, token, refreshToken } = await authService.signup(data)

      // Store user data for persistence
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_user', JSON.stringify(user))
      }

      setAuthState((prev) => ({
        ...prev,
        user,
        token,
        refreshToken,
        isAuthenticated: true,
        isLoading: false,
      }))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Signup failed'
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
      throw error
    }
  }, [])

  /**
   * Logout handler
   */
  const logout = useCallback(async (): Promise<void> => {
    setAuthState((prev) => ({ ...prev, isLoading: true }))

    try {
      await authService.logout()

      // Clear stored user data
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_user')
      }

      setAuthState({
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Logout failed'
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
      throw error
    }
  }, [])

  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    setAuthState((prev) => ({ ...prev, error: null }))
  }, [])

  return {
    user: authState.user,
    token: authState.token,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    error: authState.error,
    login,
    signup,
    logout,
    clearError,
  }
}

export default useAuth
