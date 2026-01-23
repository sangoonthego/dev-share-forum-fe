/**
 * Post utility functions
 * Supporting functions for post processing and calculations
 */

/**
 * Calculate estimated read time in minutes
 * Based on average reading speed of 200 words per minute
 */
export const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute)

  if (readTimeMinutes < 1) {
    return 'Less than 1 min read'
  }

  return `${readTimeMinutes} min read`
}

/**
 * Truncate content to excerpt length
 */
export const generateExcerpt = (content: string, maxLength: number = 150): string => {
  if (content.length <= maxLength) {
    return content
  }

  return content.substring(0, maxLength).trim() + '...'
}

/**
 * Extract tags from content
 * Finds hashtags in markdown format
 */
export const extractTagsFromContent = (content: string): string[] => {
  const tagRegex = /#([a-zA-Z0-9]+)/g
  const matches = content.match(tagRegex)

  if (!matches) {
    return []
  }

  return matches
    .map((tag) => tag.substring(1)) // Remove the # prefix
    .filter((tag, idx, arr) => arr.indexOf(tag) === idx) // Remove duplicates
}
