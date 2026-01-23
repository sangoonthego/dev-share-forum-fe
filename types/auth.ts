/**
 * Authentication-related types
 * Backend response contracts for auth operations
 */

/**
 * Auth Response from NestJS API
 * This is what the API returns
 */
export interface AuthResponse {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  avatar?: string
  role: 'user' | 'moderator' | 'admin'
  isVerified: boolean
  createdAt: string
}

/**
 * Login Request/Response
 */
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: AuthResponse
  token: string
  refreshToken: string
}

/**
 * Signup Request
 */
export interface SignupRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  username: string
}

export interface SignupResponse {
  user: AuthResponse
  token: string
  refreshToken: string
}

/**
 * Frontend Auth State
 * What the UI components actually use
 */
export interface AuthUser {
  id: string
  email: string
  name: string
  username: string
  avatar: string
  role: 'user' | 'moderator' | 'admin'
  isVerified: boolean
}

export interface AuthState {
  user: AuthUser | null
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupData {
  email: string
  password: string
  firstName: string
  lastName: string
  username: string
}
