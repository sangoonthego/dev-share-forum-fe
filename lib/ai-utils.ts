// Utility functions for AI agents

export interface ExpertProfile {
  username: string
  name: string
  karma: number
  skills: string[]
  recentPosts: number
  matchScore?: number
}

export interface ModerationFlags {
  spam: boolean
  toxic: boolean
  malware: boolean
  sentiment: number
}

// Calculate cosine similarity between two text embeddings
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0)
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0))
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0))
  return dotProduct / (magnitudeA * magnitudeB)
}

// Simple text to vector (in production, use actual embeddings)
export function textToVector(text: string): number[] {
  const words = text.toLowerCase().split(/\s+/)
  const vector = new Array(100).fill(0)

  words.forEach((word, idx) => {
    const hash = word.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    vector[hash % 100] += 1
  })

  return vector
}

// Extract skills from post content
export function extractSkills(content: string): string[] {
  const skillKeywords = [
    "react",
    "next.js",
    "typescript",
    "javascript",
    "node.js",
    "python",
    "rust",
    "go",
    "java",
    "websocket",
    "api",
    "database",
    "sql",
    "nosql",
    "docker",
    "kubernetes",
    "aws",
    "frontend",
    "backend",
    "full-stack",
  ]

  const lowerContent = content.toLowerCase()
  return skillKeywords.filter((skill) => lowerContent.includes(skill))
}

// Calculate karma score for expert ranking
export function calculateKarmaScore(profile: ExpertProfile): number {
  const baseKarma = profile.karma
  const recencyBoost = profile.recentPosts * 10
  const skillMatch = profile.matchScore ? profile.matchScore * 100 : 0

  return baseKarma + recencyBoost + skillMatch
}

// Detect code blocks in content
export function detectCodeBlocks(content: string): Array<{ code: string; language?: string; line: number }> {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
  const blocks: Array<{ code: string; language?: string; line: number }> = []
  let match

  while ((match = codeBlockRegex.exec(content)) !== null) {
    const lineNumber = content.substring(0, match.index).split("\n").length
    blocks.push({
      code: match[2],
      language: match[1],
      line: lineNumber,
    })
  }

  return blocks
}

// Generate SEO-friendly title variants
export function generateTitleVariants(originalTitle: string): string[] {
  const year = new Date().getFullYear()
  return [
    `${originalTitle} - Complete Guide ${year}`,
    `How to ${originalTitle}: Step-by-Step Tutorial`,
    `${originalTitle} for Beginners (with Examples)`,
    `Master ${originalTitle} in ${year}`,
    `${originalTitle}: Best Practices & Tips`,
  ]
}

// Check content for moderation flags
export function checkModerationFlags(content: string): ModerationFlags {
  const spamKeywords = ["click here", "buy now", "limited offer", "act fast"]
  const toxicKeywords = ["stupid", "idiot", "hate", "kill"]
  const malwarePatterns = ["<script>", "eval(", "document.cookie"]

  const hasSpam = spamKeywords.some((keyword) => content.toLowerCase().includes(keyword))
  const hasToxic = toxicKeywords.some((keyword) => content.toLowerCase().includes(keyword))
  const hasMalware = malwarePatterns.some((pattern) => content.includes(pattern))

  // Simple sentiment analysis
  const positiveWords = ["good", "great", "awesome", "helpful", "thanks", "love"]
  const negativeWords = ["bad", "terrible", "awful", "hate", "stupid", "useless"]

  const positiveCount = positiveWords.filter((word) => content.toLowerCase().includes(word)).length
  const negativeCount = negativeWords.filter((word) => content.toLowerCase().includes(word)).length

  const sentiment = (positiveCount - negativeCount + 10) / 20 // Normalized 0-1

  return {
    spam: hasSpam,
    toxic: hasToxic,
    malware: hasMalware,
    sentiment: Math.max(0, Math.min(1, sentiment)),
  }
}
