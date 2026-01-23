/**
 * Centralized Axios instance with interceptors
 * Handles JWT authentication, error handling, and request/response transformation
 * 
 * Pattern: Infrastructure Layer
 * Responsibility: HTTP communication, auth token management, error handling
 */

import axios, {
  AxiosInstance,
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

// Error response type guard
interface AxiosErrorResponse {
  success: false
  error: {
    code: string
    message: string
  }
}

/**
 * Create a base Axios instance with default configuration
 */
const createApiClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  /**
   * REQUEST INTERCEPTOR
   * Add JWT token to headers if available
   */
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
    (error: AxiosError) => {
      return Promise.reject(error)
    }
  )

  /**
   * RESPONSE INTERCEPTOR
   * Handle token refresh, errors, and response transformation
   */
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Success: return response data
      return response
    },
    (error: AxiosError<AxiosErrorResponse>) => {
      // Handle 401 Unauthorized - Token expired
      if (error.response?.status === 401) {
        // Clear auth tokens
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token')
          localStorage.removeItem('refresh_token')
          // Redirect to login if needed
          window.location.href = '/auth/login'
        }
      }

      // Handle 403 Forbidden
      if (error.response?.status === 403) {
        console.error('Access denied:', error.response.data)
      }

      // Handle 500+ Server errors
      if (error.response?.status && error.response.status >= 500) {
        console.error('Server error:', error.response.data)
      }

      return Promise.reject(error)
    }
  )

  return instance
}

// Export singleton instance
export const apiClient = createApiClient()

/**
 * Helper function to handle API errors consistently
 */
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const response = error.response?.data as AxiosErrorResponse | undefined

    if (response?.error?.message) {
      return response.error.message
    }

    if (error.message) {
      return error.message
    }

    return 'An unexpected error occurred'
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'An unexpected error occurred'
}

/**
 * Helper function to extract error details
 */
export const getErrorDetails = (error: unknown): { code: string; message: string } => {
  if (axios.isAxiosError(error)) {
    const response = error.response?.data as AxiosErrorResponse | undefined

    if (response?.error) {
      return {
        code: response.error.code,
        message: response.error.message,
      }
    }

    return {
      code: `HTTP_${error.response?.status || 'UNKNOWN'}`,
      message: error.message,
    }
  }

  if (error instanceof Error) {
    return {
      code: 'CLIENT_ERROR',
      message: error.message,
    }
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: 'An unexpected error occurred',
  }
}

export default apiClient
