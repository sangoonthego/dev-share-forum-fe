/**
 * Authentication Service
 * Handles all auth-related API calls and business logic
 * 
 * Pattern: Service Layer
 * Responsibility: API calls, data transformation via mappers, business logic
 * 
 * Flow: Component → Hook → Service → Mapper → API Client
 */

import { apiClient, handleApiError, getErrorDetails } from '@/lib/api-client'
import type {
  LoginResponse,
  SignupResponse,
  LoginCredentials,
  SignupData,
  AuthUser,
  ApiResponse,
} from '@/types'
import {
  mapLoginResponse,
  mapSignupResponse,
} from '@/mappers/auth.mapper'

/**
 * Authentication Service Class
 * Encapsulates all auth-related operations
 */
class AuthService {
  private readonly baseURL = '/auth'

  /**
   * Login user with email and password
   * 
   * @param credentials - User login credentials
   * @returns Promise with auth user, token, and refresh token
   * @throws Error with user-friendly message
   */
  async login(
    credentials: LoginCredentials
  ): Promise<{
    user: AuthUser
    token: string
    refreshToken: string
  }> {
    try {
      const response = await apiClient.post<ApiResponse<LoginResponse>>(
        `${this.baseURL}/login`,
        credentials
      )

      const { user, token, refreshToken } = mapLoginResponse(response.data.data)

      // Store tokens in localStorage for persistence
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', token)
        localStorage.setItem('refresh_token', refreshToken)
      }

      return { user, token, refreshToken }
    } catch (error) {
      const { message } = getErrorDetails(error)
      throw new Error(message || 'Login failed')
    }
  }

  /**
   * Sign up new user
   * 
   * @param data - User signup data
   * @returns Promise with auth user, token, and refresh token
   * @throws Error with user-friendly message
   */
  async signup(
    data: SignupData
  ): Promise<{
    user: AuthUser
    token: string
    refreshToken: string
  }> {
    try {
      const response = await apiClient.post<ApiResponse<SignupResponse>>(
        `${this.baseURL}/signup`,
        data
      )

      const { user, token, refreshToken } = mapSignupResponse(response.data.data)

      // Store tokens in localStorage for persistence
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', token)
        localStorage.setItem('refresh_token', refreshToken)
      }

      return { user, token, refreshToken }
    } catch (error) {
      const { message } = getErrorDetails(error)
      throw new Error(message || 'Signup failed')
    }
  }

  /**
   * Logout user and clear tokens
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post(`${this.baseURL}/logout`)
    } catch (error) {
      console.error('Logout error:', handleApiError(error))
    } finally {
      // Always clear tokens locally
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('refresh_token')
      }
    }
  }

  /**
   * Refresh authentication token
   * 
   * @returns Promise with new token
   */
  async refreshToken(): Promise<string> {
    try {
      const refreshToken =
        typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null

      if (!refreshToken) {
        throw new Error('No refresh token available')
      }

      const response = await apiClient.post<ApiResponse<{ token: string }>>(
        `${this.baseURL}/refresh`,
        { refreshToken }
      )

      const newToken = response.data.data.token

      // Update token in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', newToken)
      }

      return newToken
    } catch (error) {
      const { message } = getErrorDetails(error)
      throw new Error(message || 'Token refresh failed')
    }
  }

  /**
   * Request password reset
   * 
   * @param email - User email
   */
  async requestPasswordReset(email: string): Promise<void> {
    try {
      await apiClient.post(`${this.baseURL}/forgot-password`, { email })
    } catch (error) {
      const { message } = getErrorDetails(error)
      throw new Error(message || 'Password reset request failed')
    }
  }

  /**
   * Reset password with token
   * 
   * @param token - Password reset token
   * @param newPassword - New password
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      await apiClient.post(`${this.baseURL}/reset-password`, {
        token,
        newPassword,
      })
    } catch (error) {
      const { message } = getErrorDetails(error)
      throw new Error(message || 'Password reset failed')
    }
  }

  /**
   * Verify email with token
   * 
   * @param token - Email verification token
   */
  async verifyEmail(token: string): Promise<void> {
    try {
      await apiClient.post(`${this.baseURL}/verify-email`, { token })
    } catch (error) {
      const { message } = getErrorDetails(error)
      throw new Error(message || 'Email verification failed')
    }
  }
}

// Export singleton instance
export const authService = new AuthService()

export default authService
