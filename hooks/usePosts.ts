/**
 * usePosts Hook
 * Custom hook for managing posts and post operations
 * 
 * Pattern: Hooks consume Services
 * Responsibility: State management, service orchestration, error handling for UI
 * 
 * Usage Example:
 * const { posts, loading, error, fetchPosts, createPost } = usePosts()
 * 
 * Full Flow:
 * UI Component → usePosts Hook → Post Service → API Client → Backend
 *                                    ↓
 *                            Post Mapper
 *                                    ↓
 *                           Frontend Types
 */

'use client'

import { useState, useCallback } from 'react'
import { postService } from '@/services/post.service'
import type { Post, CreatePostRequest, UpdatePostRequest } from '@/types'

/**
 * Hook return type for better IDE support
 */
interface UsePostsReturn {
  posts: Post[]
  total: number
  page: number
  limit: number
  loading: boolean
  error: string | null
  fetchPosts: (page?: number, limit?: number) => Promise<void>
  searchPosts: (query: string, page?: number) => Promise<void>
  getPostById: (postId: string) => Promise<Post | null>
  createPost: (data: CreatePostRequest) => Promise<Post | null>
  updatePost: (postId: string, data: UpdatePostRequest) => Promise<Post | null>
  deletePost: (postId: string) => Promise<boolean>
  likePost: (postId: string) => Promise<boolean>
  unlikePost: (postId: string) => Promise<boolean>
  clearError: () => void
}

/**
 * usePosts Hook Implementation
 */
export const usePosts = (): UsePostsReturn => {
  const [posts, setPosts] = useState<Post[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Fetch posts with pagination
   */
  const fetchPosts = useCallback(
    async (pageNum: number = 1, pageLimit: number = 10): Promise<void> => {
      setLoading(true)
      setError(null)

      try {
        const { posts: fetchedPosts, total: totalCount } = await postService.getPosts(
          pageNum,
          pageLimit
        )

        setPosts(fetchedPosts)
        setTotal(totalCount)
        setPage(pageNum)
        setLimit(pageLimit)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch posts'
        setError(errorMessage)
        setPosts([])
      } finally {
        setLoading(false)
      }
    },
    []
  )

  /**
   * Search posts
   */
  const searchPosts = useCallback(
    async (query: string, pageNum: number = 1): Promise<void> => {
      setLoading(true)
      setError(null)

      try {
        const { posts: searchResults, total: totalCount } = await postService.searchPosts(
          query,
          pageNum
        )

        setPosts(searchResults)
        setTotal(totalCount)
        setPage(pageNum)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Search failed'
        setError(errorMessage)
        setPosts([])
      } finally {
        setLoading(false)
      }
    },
    []
  )

  /**
   * Get single post by ID
   */
  const getPostById = useCallback(
    async (postId: string): Promise<Post | null> => {
      setLoading(true)
      setError(null)

      try {
        return await postService.getPostById(postId)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch post'
        setError(errorMessage)
        return null
      } finally {
        setLoading(false)
      }
    },
    []
  )

  /**
   * Create new post
   */
  const createPost = useCallback(
    async (data: CreatePostRequest): Promise<Post | null> => {
      setLoading(true)
      setError(null)

      try {
        const newPost = await postService.createPost(data)
        // Add to beginning of posts list
        setPosts((prev) => [newPost, ...prev])
        setTotal((prev) => prev + 1)
        return newPost
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to create post'
        setError(errorMessage)
        return null
      } finally {
        setLoading(false)
      }
    },
    []
  )

  /**
   * Update post
   */
  const updatePost = useCallback(
    async (postId: string, data: UpdatePostRequest): Promise<Post | null> => {
      setLoading(true)
      setError(null)

      try {
        const updatedPost = await postService.updatePost(postId, data)
        // Update in posts list
        setPosts((prev) =>
          prev.map((p) => (p.id === postId ? updatedPost : p))
        )
        return updatedPost
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to update post'
        setError(errorMessage)
        return null
      } finally {
        setLoading(false)
      }
    },
    []
  )

  /**
   * Delete post
   */
  const deletePost = useCallback(
    async (postId: string): Promise<boolean> => {
      setLoading(true)
      setError(null)

      try {
        await postService.deletePost(postId)
        // Remove from posts list
        setPosts((prev) => prev.filter((p) => p.id !== postId))
        setTotal((prev) => prev - 1)
        return true
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to delete post'
        setError(errorMessage)
        return false
      } finally {
        setLoading(false)
      }
    },
    []
  )

  /**
   * Like post
   */
  const likePost = useCallback(
    async (postId: string): Promise<boolean> => {
      setError(null)

      try {
        await postService.likePost(postId)
        return true
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to like post'
        setError(errorMessage)
        return false
      }
    },
    []
  )

  /**
   * Unlike post
   */
  const unlikePost = useCallback(
    async (postId: string): Promise<boolean> => {
      setError(null)

      try {
        await postService.unlikePost(postId)
        return true
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to unlike post'
        setError(errorMessage)
        return false
      }
    },
    []
  )

  /**
   * Clear error
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    posts,
    total,
    page,
    limit,
    loading,
    error,
    fetchPosts,
    searchPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    likePost,
    unlikePost,
    clearError,
  }
}

export default usePosts
