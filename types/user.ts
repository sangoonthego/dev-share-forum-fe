/**
 * User-related types
 * Backend response contracts for user operations
 */

/**
 * User Response from NestJS API
 */
export interface User {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  avatar?: string
  bio?: string
  role: 'user' | 'moderator' | 'admin'
  isVerified: boolean
  karma: number
  skills: string[]
  recentPostCount: number
  followersCount: number
  followingCount: number
  createdAt: string
  updatedAt: string
}

/**
 * Frontend User Display
 * What the UI components actually use
 */
export interface UserProfile {
  id: string
  name: string
  username: string
  email: string
  avatar: string
  bio: string
  karma: number
  skills: string[]
  recentPosts: number
  followers: number
  following: number
  isVerified: boolean
  joinDate: string
}

/**
 * User for Expert Matching
 */
export interface ExpertProfile {
  username: string
  name: string
  karma: number
  skills: string[]
  recentPosts: number
  matchScore?: number
}

/**
 * User List Item (for leaderboards, etc)
 */
export interface UserListItem {
  id: string
  name: string
  username: string
  avatar: string
  karma: number
  rank?: number
}
