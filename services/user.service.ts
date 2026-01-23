/**
 * User Service
 * Handles all user-related API calls and business logic
 * 
 * Pattern: Service Layer
 * Responsibility: API calls, data transformation via mappers, business logic
 * 
 * Flow: Component → Hook → Service → Mapper → API Client
 */

import { apiClient, handleApiError, getErrorDetails } from '@/lib/api-client'
import type {
  User,
  UserProfile,
  UserListItem,
  ExpertProfile,
  ApiResponse,
  PaginatedResponse,
} from '@/types'
import {
  mapUserToUserProfile,
  mapUserToUserListItem,
  mapUserToExpertProfile,
  mapUsersToUserListItem,
  mapUsersToUserProfile,
} from '@/mappers/user.mapper'

/**
 * User Service Class
 * Encapsulates all user-related operations
 */
class UserService {
  private readonly baseURL = '/users'

  /**
   * Get current authenticated user profile
   * 
   * @returns Promise with user profile
   * @throws Error with user-friendly message
   */
  async getCurrentUser(): Promise<UserProfile> {
    try {
      const response = await apiClient.get<ApiResponse<User>>(
        `${this.baseURL}/me`
      )

      return mapUserToUserProfile(response.data.data)
    } catch (error) {
      const { message } = getErrorDetails(error)
      throw new Error(message || 'Failed to fetch current user')
    }
  }

  /**
   * Get user profile by username
   * 
   * @param username - Username
   * @returns Promise with user profile
   * @throws Error with user-friendly message
   */
  async getUserByUsername(username: string): Promise<UserProfile> {
    try {
      const response = await apiClient.get<ApiResponse<User>>(
        `${this.baseURL}/${username}`
      )

      return mapUserToUserProfile(response.data.data)
    } catch (error) {
      const { message } = getErrorDetails(error)
      throw new Error(message || 'Failed to fetch user profile')
    }
  }

  /**
   * Get user profile by ID
   * 
   * @param userId - User ID
   * @returns Promise with user profile
   * @throws Error with user-friendly message
   */
  async getUserById(userId: string): Promise<UserProfile> {
    try {
      const response = await apiClient.get<ApiResponse<User>>(
        `${this.baseURL}/${userId}`
      )

      return mapUserToUserProfile(response.data.data)
    } catch (error) {
      const { message } = getErrorDetails(error)
      throw new Error(message || 'Failed to fetch user profile')
    }
  }

  /**
   * Get leaderboard (top users by karma)
   * 
   * @param limit - Number of users to fetch (default: 10)
   * @returns Promise with user list
   * @throws Error with user-friendly message
   */
  async getLeaderboard(limit: number = 10): Promise<UserListItem[]> {
    try {
      const response = await apiClient.get<ApiResponse<User[]>>(
        `${this.baseURL}/leaderboard`,
        {
          params: { limit },
        }
      )

      return mapUsersToUserListItem(response.data.data, 1)
    } catch (error) {
      const { message } = getErrorDetails(error)
      throw new Error(message || 'Failed to fetch leaderboard')
    }
  }

  /**
   * Search users
   * 
   * @param query - Search query
   * @param limit - Number of results (default: 10)
   * @returns Promise with user list
   * @throws Error with user-friendly message
   */
  async searchUsers(query: string, limit: number = 10): Promise<UserProfile[]> {
    try {
      const response = await apiClient.get<ApiResponse<User[]>>(
        `${this.baseURL}/search`,
        {
          params: { q: query, limit },
        }
      )

      return mapUsersToUserProfile(response.data.data)
    } catch (error) {
      const { message } = getErrorDetails(error)
      throw new Error(message || 'Search failed')
    }
  }

  /**
   * Get expert matches based on skills
   * 
   * @param skills - Array of skill names
   * @param limit - Number of matches (default: 10)
   * @returns Promise with expert profiles
   * @throws Error with user-friendly message
   */
  async getExpertMatches(
    skills: string[],
    limit: number = 10
  ): Promise<ExpertProfile[]> {
    try {
      const response = await apiClient.post<ApiResponse<User[]>>(
        `${this.baseURL}/expert-match`,
        { skills, limit }
      )

      return response.data.data.map((user) =>
        mapUserToExpertProfile(user)
      )
    } catch (error) {
      const { message } = getErrorDetails(error)
      throw new Error(message || 'Failed to find expert matches')
    }
  }

  /**
   * Update user profile
   * 
   * @param updates - Profile updates
   * @returns Promise with updated profile
   * @throws Error with user-friendly message
   */
  async updateProfile(
    updates: Partial<{
      firstName: string
      lastName: string
      bio: string
      avatar: string
      skills: string[]
    }>
  ): Promise<UserProfile> {
    try {
      const response = await apiClient.patch<ApiResponse<User>>(
        `${this.baseURL}/me`,
        updates
      )

      return mapUserToUserProfile(response.data.data)
    } catch (error) {
      const { message } = getErrorDetails(error)
      throw new Error(message || 'Failed to update profile')
    }
  }

  /**
   * Follow a user
   * 
   * @param userId - User ID to follow
   * @throws Error with user-friendly message
   */
  async followUser(userId: string): Promise<void> {
    try {
      await apiClient.post(`${this.baseURL}/${userId}/follow`)
    } catch (error) {
      const { message } = getErrorDetails(error)
      throw new Error(message || 'Failed to follow user')
    }
  }

  /**
   * Unfollow a user
   * 
   * @param userId - User ID to unfollow
   * @throws Error with user-friendly message
   */
  async unfollowUser(userId: string): Promise<void> {
    try {
      await apiClient.delete(`${this.baseURL}/${userId}/follow`)
    } catch (error) {
      const { message } = getErrorDetails(error)
      throw new Error(message || 'Failed to unfollow user')
    }
  }
}

// Export singleton instance
export const userService = new UserService()

export default userService
