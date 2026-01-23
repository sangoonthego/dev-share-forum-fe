/**
 * User Data Mapper
 * Transforms Backend responses to Frontend model formats
 * 
 * Pattern: Data Adapter Pattern
 * Responsibility: BE → FE type conversion, field mapping, formatting
 */

import type { User, UserProfile, UserListItem, ExpertProfile } from '@/types'

/**
 * Map user to frontend UserProfile model
 */
export const mapUserToUserProfile = (user: User): UserProfile => {
  return {
    id: user.id,
    name: `${user.firstName} ${user.lastName}`.trim(),
    username: user.username,
    email: user.email,
    avatar: user.avatar || '/placeholder.svg',
    bio: user.bio || '',
    karma: user.karma,
    skills: user.skills,
    recentPosts: user.recentPostCount,
    followers: user.followersCount,
    following: user.followingCount,
    isVerified: user.isVerified,
    joinDate: user.createdAt,
  }
}

/**
 * Map user to UserListItem (for leaderboards)
 */
export const mapUserToUserListItem = (
  user: User,
  rank?: number
): UserListItem => {
  return {
    id: user.id,
    name: `${user.firstName} ${user.lastName}`.trim(),
    username: user.username,
    avatar: user.avatar || '/placeholder.svg',
    karma: user.karma,
    rank,
  }
}

/**
 * Map user to ExpertProfile (for expert matching)
 */
export const mapUserToExpertProfile = (
  user: User,
  matchScore?: number
): ExpertProfile => {
  return {
    username: user.username,
    name: `${user.firstName} ${user.lastName}`.trim(),
    karma: user.karma,
    skills: user.skills,
    recentPosts: user.recentPostCount,
    matchScore,
  }
}

/**
 * Batch map multiple users
 */
export const mapUsersToUserProfile = (users: User[]): UserProfile[] => {
  return users.map(mapUserToUserProfile)
}

/**
 * Batch map multiple users to UserListItem
 */
export const mapUsersToUserListItem = (
  users: User[],
  startRank: number = 1
): UserListItem[] => {
  return users.map((user, idx) => mapUserToUserListItem(user, startRank + idx))
}
