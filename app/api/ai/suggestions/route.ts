import { type NextRequest, NextResponse } from "next/server"

interface Suggestion {
  type: "title" | "tags" | "links" | "code"
  suggestions: any[]
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, currentTags } = await request.json()

    const suggestions: Suggestion[] = []

    // Title suggestions
    if (title) {
      suggestions.push({
        type: "title",
        suggestions: generateTitleSuggestions(title),
      })
    }

    // Tag suggestions
    if (content) {
      suggestions.push({
        type: "tags",
        suggestions: suggestTags(content, currentTags || []),
      })
    }

    // Related posts for linking
    suggestions.push({
      type: "links",
      suggestions: findRelatedPosts(content),
    })

    // Code improvements
    const codeBlocks = extractCodeBlocks(content)
    if (codeBlocks.length > 0) {
      suggestions.push({
        type: "code",
        suggestions: analyzeCode(codeBlocks),
      })
    }

    return NextResponse.json({
      success: true,
      suggestions,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to generate suggestions" }, { status: 500 })
  }
}

function generateTitleSuggestions(title: string): string[] {
  return [
    `${title}: A Complete Guide for Developers`,
    `How to Master ${title} in 2024`,
    `${title} - Best Practices & Examples`,
  ]
}

function suggestTags(content: string, existingTags: string[]): string[] {
  const allTags = [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "WebSocket",
    "API",
    "Tutorial",
    "Performance",
    "Security",
  ]

  // Filter out existing tags and return suggestions
  return allTags.filter((tag) => !existingTags.includes(tag)).slice(0, 5)
}

function findRelatedPosts(content: string) {
  return [
    {
      id: "2",
      title: "Understanding React Server Components",
      similarity: 0.85,
      excerpt: "Learn about RSC and how they work...",
    },
    {
      id: "4",
      title: "WebSocket Best Practices",
      similarity: 0.78,
      excerpt: "Production-ready WebSocket patterns...",
    },
  ]
}

function extractCodeBlocks(content: string): string[] {
  const codeBlockRegex = /```[\s\S]*?```/g
  return content.match(codeBlockRegex) || []
}

function analyzeCode(codeBlocks: string[]) {
  return [
    {
      severity: "warning",
      message: "Consider adding error handling for async operations",
      line: 12,
    },
    {
      severity: "info",
      message: "Add TypeScript interfaces for better type safety",
      line: 8,
    },
  ]
}
