/**
 * Post-related types
 * Backend response contracts for post operations
 */

/**
 * Post Response from API
 * Combined type for both API response and frontend display
 */
export interface Post {
  id: string
  title: string
  content: string
  excerpt: string
  author: {
    name: string
    username: string
    avatar: string
  }
  tags: string[]
  likes: number
  comments: number
  views: number
  timeAgo: string
  readTime: string
  createdAt: string
}

/**
 * Post Card Props (for reusable components)
 */
export interface PostCardProps {
  id: string
  author: {
    name: string
    avatar: string
    username: string
  }
  title: string
  excerpt: string
  tags: string[]
  likes: number
  comments: number
  timeAgo: string
  readTime: string
}

/**
 * Create Post Request
 */
export interface CreatePostRequest {
  title: string
  content: string
  excerpt: string
  tags: string[]
}

/**
 * Update Post Request
 */
export interface UpdatePostRequest {
  title?: string
  content?: string
  excerpt?: string
  tags?: string[]
}

/**
 * Post Feed Response
 */
export interface PostFeedResponse {
  posts: Post[]
  total: number
  page: number
  limit: number
}
