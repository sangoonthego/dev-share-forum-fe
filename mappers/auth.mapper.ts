/**
 * Authentication Data Mapper
 * Transforms Backend responses to Frontend model formats
 * 
 * Pattern: Data Adapter Pattern
 * Responsibility: BE → FE type conversion, data enrichment, field mapping
 */

import type {
  AuthResponse,
  LoginResponse,
  SignupResponse,
  AuthUser,
} from '@/types'

/**
 * Map auth response to frontend AuthUser model
 * Handles field name changes and data enrichment
 */
export const mapAuthToAuthUser = (auth: AuthResponse): AuthUser => {
  return {
    id: auth.id,
    email: auth.email,
    username: auth.username,
    name: `${auth.firstName} ${auth.lastName}`.trim(),
    avatar: auth.avatar || '/placeholder.svg',
    role: auth.role,
    isVerified: auth.isVerified,
  }
}

/**
 * Map login response to frontend format
 * Extracts token and user data
 */
export const mapLoginResponse = (response: LoginResponse): {
  user: AuthUser
  token: string
  refreshToken: string
} => {
  return {
    user: mapAuthToAuthUser(response.user),
    token: response.token,
    refreshToken: response.refreshToken,
  }
}

/**
 * Map signup response to frontend format
 * Same structure as login response
 */
export const mapSignupResponse = (response: SignupResponse): {
  user: AuthUser
  token: string
  refreshToken: string
} => {
  return {
    user: mapAuthToAuthUser(response.user),
    token: response.token,
    refreshToken: response.refreshToken,
  }
}
