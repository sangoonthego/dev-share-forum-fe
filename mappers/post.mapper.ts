/**
 * Post Data Mapper
 * Pattern: Data Adapter Pattern
 * Responsibility: Transforms Backend (Prisma/NestJS) responses into Frontend-friendly formats.
 * Features: Time formatting, Read time calculation, Null-safety, and UI Prop mapping.
 */

import type { Post, PostCardProps } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { calculateReadTime } from '@/lib/post-utils';

/**
 * Map API post response to frontend Post model
 * Includes computed fields like timeAgo and readTime
 */
export const mapApiPostToPost = (apiPost: any): Post => {
  const createdDate = new Date(apiPost.createdAt);

  return {
    id: apiPost.id,
    title: apiPost.title,
    excerpt: apiPost.excerpt || '',
    content: apiPost.content || '',
    author: {
      name: `${apiPost.author.firstName} ${apiPost.author.lastName}`.trim(),
      username: apiPost.author.username,
      avatar: apiPost.author.avatar || '/placeholder.svg',
    },
    tags: apiPost.tags || [],
    likes: Array.isArray(apiPost.likes) ? apiPost.likes.length : 0,
    comments: apiPost.commentCount || 0,
    views: apiPost.views || 0,
    timeAgo: formatDistanceToNow(createdDate, { addSuffix: true }),
    readTime: calculateReadTime(apiPost.content || ''),
    createdAt: apiPost.createdAt,
  };
};

/**
 * Map Post to PostCardProps
 * Prepares data for PostCard component rendering
 */
export const mapPostToPostCardProps = (post: Post): PostCardProps => {
  return {
    id: post.id,
    author: {
      name: post.author.name,
      avatar: post.author.avatar,
      username: post.author.username,
    },
    title: post.title,
    excerpt: post.excerpt,
    tags: post.tags,
    likes: post.likes,
    comments: post.comments,
    timeAgo: post.timeAgo,
    readTime: post.readTime,
  };
};

/**
 * Batch mappers
 */
export const mapApiPostsToPosts = (apiPosts: any[]): Post[] => {
  return apiPosts.map(mapApiPostToPost);
};

export const mapPostsToPostCardProps = (posts: Post[]): PostCardProps[] => {
  return posts.map(mapPostToPostCardProps);
};