/**
 * Comment-related types
 * Backend response contracts for comment operations
 */

/**
 * Backend Comment Response from NestJS
 */
export interface BackendComment {
  id: string
  content: string
  authorId: string
  author: {
    id: string
    username: string
    firstName: string
    lastName: string
    avatar?: string
  }
  postId: string
  likes: string[] // Array of user IDs who liked
  createdAt: string
  updatedAt: string
}

/**
 * Frontend Comment Display
 * What the UI components actually use
 */
export interface Comment {
  id: string
  content: string
  author: {
    name: string
    username: string
    avatar: string
  }
  likes: number
  timeAgo: string
  createdAt: string
}

/**
 * Create Comment Request
 */
export interface CreateCommentRequest {
  content: string
  postId: string
}
