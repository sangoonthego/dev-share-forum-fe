/**
 * Post Service
 * Handles all post-related API calls and business logic
 * 
 * Pattern: Service Layer
 * Responsibility: API calls, data transformation via mappers, business logic
 * 
 * Flow: Component → Hook → Service → Mapper → API Client
 */

import { apiClient, handleApiError, getErrorDetails } from '@/lib/api-client'
import type {
  Post,
  CreatePostRequest,
  UpdatePostRequest,
  PostFeedResponse,
  ApiResponse,
  PaginatedResponse,
} from '@/types'
import { mapApiPostToPost, mapApiPostsToPosts } from '@/mappers/post.mapper'

/**
 * Post Service Class
 * Encapsulates all post-related operations
 */
class PostService {
  private readonly baseURL = '/posts'

  /**
   * Fetch all posts with pagination
   * 
   * @param page - Page number (default: 1)
   * @param limit - Items per page (default: 10)
   * @returns Promise with array of posts
   * @throws Error with user-friendly message
   */
  async getPosts(page: number = 1, limit: number = 10): Promise<{
    posts: Post[]
    total: number
    page: number
    limit: number
  }> {
    try {
      const response = await apiClient.get<
        ApiResponse<PaginatedResponse<any>>
      >(this.baseURL, {
        params: { page, limit },
      })

      const apiPosts = response.data.data.data
      const mappedPosts = mapApiPostsToPosts(apiPosts)

      return {
        posts: mappedPosts,
        total: response.data.data.meta.total,
        page: response.data.data.meta.page,
        limit: response.data.data.meta.limit,
      }
    } catch (error) {
      const { message } = getErrorDetails(error)
      throw new Error(message || 'Failed to fetch posts')
    }
  }

  /**
   * Fetch a single post by ID
   * 
   * @param postId - Post ID
   * @returns Promise with single post
   * @throws Error with user-friendly message
   */
  async getPostById(postId: string): Promise<Post> {
    try {
      const response = await apiClient.get<ApiResponse<any>>(
        `${this.baseURL}/${postId}`
      )

      return mapApiPostToPost(response.data.data)
    } catch (error) {
      const { message } = getErrorDetails(error)
      throw new Error(message || 'Failed to fetch post')
    }
  }

  /**
   * Search posts by query
   * 
   * @param query - Search query
   * @param page - Page number (default: 1)
   * @param limit - Items per page (default: 10)
   * @returns Promise with array of matching posts
   * @throws Error with user-friendly message
   */
  async searchPosts(
    query: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{
    posts: Post[]
    total: number
  }> {
    try {
      const response = await apiClient.get<
        ApiResponse<PaginatedResponse<any>>
      >(`${this.baseURL}/search`, {
        params: { q: query, page, limit },
      })

      const mappedPosts = mapApiPostsToPosts(response.data.data.data)

      return {
        posts: mappedPosts,
        total: response.data.data.meta.total,
      }
    } catch (error) {
      const { message } = getErrorDetails(error)
      throw new Error(message || 'Search failed')
    }
  }

  /**
   * Create a new post
   * 
   * @param data - Post creation data
   * @returns Promise with created post
   * @throws Error with user-friendly message
   */
  async createPost(data: CreatePostRequest): Promise<Post> {
    try {
      const response = await apiClient.post<ApiResponse<any>>(
        this.baseURL,
        data
      )

      return mapApiPostToPost(response.data.data)
    } catch (error) {
      const { message } = getErrorDetails(error)
      throw new Error(message || 'Failed to create post')
    }
  }

  /**
   * Update an existing post
   * 
   * @param postId - Post ID
   * @param data - Post update data
   * @returns Promise with updated post
   * @throws Error with user-friendly message
   */
  async updatePost(postId: string, data: UpdatePostRequest): Promise<Post> {
    try {
      const response = await apiClient.patch<ApiResponse<any>>(
        `${this.baseURL}/${postId}`,
        data
      )

      return mapApiPostToPost(response.data.data)
    } catch (error) {
      const { message } = getErrorDetails(error)
      throw new Error(message || 'Failed to update post')
    }
  }

  /**
   * Delete a post
   * 
   * @param postId - Post ID
   * @throws Error with user-friendly message
   */
  async deletePost(postId: string): Promise<void> {
    try {
      await apiClient.delete(`${this.baseURL}/${postId}`)
    } catch (error) {
      const { message } = getErrorDetails(error)
      throw new Error(message || 'Failed to delete post')
    }
  }

  /**
   * Like a post
   * 
   * @param postId - Post ID
   * @throws Error with user-friendly message
   */
  async likePost(postId: string): Promise<void> {
    try {
      await apiClient.post(`${this.baseURL}/${postId}/like`)
    } catch (error) {
      const { message } = getErrorDetails(error)
      throw new Error(message || 'Failed to like post')
    }
  }

  /**
   * Unlike a post
   * 
   * @param postId - Post ID
   * @throws Error with user-friendly message
   */
  async unlikePost(postId: string): Promise<void> {
    try {
      await apiClient.delete(`${this.baseURL}/${postId}/like`)
    } catch (error) {
      const { message } = getErrorDetails(error)
      throw new Error(message || 'Failed to unlike post')
    }
  }

  /**
   * Get posts by tag
   * 
   * @param tag - Tag name
   * @param page - Page number (default: 1)
   * @param limit - Items per page (default: 10)
   * @returns Promise with array of posts
   * @throws Error with user-friendly message
   */
  async getPostsByTag(
    tag: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{
    posts: Post[]
    total: number
  }> {
    try {
      const response = await apiClient.get<
        ApiResponse<PaginatedResponse<any>>
      >(`${this.baseURL}/tag/${tag}`, {
        params: { page, limit },
      })

      const mappedPosts = mapApiPostsToPosts(response.data.data.data)

      return {
        posts: mappedPosts,
        total: response.data.data.meta.total,
      }
    } catch (error) {
      const { message } = getErrorDetails(error)
      throw new Error(message || 'Failed to fetch posts by tag')
    }
  }
}

// Export singleton instance
export const postService = new PostService()

export default postService
