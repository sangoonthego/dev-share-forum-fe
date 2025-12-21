"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Tag, Link2, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"

interface SmartEditorSuggestionsProps {
  title: string
  content: string
  onApplyTitle?: (newTitle: string) => void
  onApplyLinks?: (links: string[]) => void
  onApplyTags?: (tags: string[]) => void
}

export function SmartEditorSuggestions({
  title,
  content,
  onApplyTitle,
  onApplyLinks,
  onApplyTags,
}: SmartEditorSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (content.length > 100) {
        analyzContent()
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [content])

  const analyzContent = async () => {
    setLoading(true)
    // Simulate AI analysis
    setTimeout(() => {
      setSuggestions({
        titleSuggestions: [
          "Building Real-Time Chat with Next.js & WebSockets: A Complete Guide",
          "How to Create a Production-Ready Chat App with Next.js",
          "Next.js Chat App Tutorial: WebSockets Made Simple",
        ],
        relatedPosts: [
          { id: "2", title: "Understanding React Server Components", similarity: 0.85 },
          { id: "4", title: "WebSocket Best Practices for Production", similarity: 0.78 },
        ],
        suggestedTags: ["Real-time", "WebSocket", "Chat-App", "Tutorial"],
        codeIssues: [
          {
            severity: "warning",
            message: "WebSocket hook thiếu error handling",
            line: 12,
          },
          {
            severity: "info",
            message: "Nên thêm TypeScript interface cho Message",
            line: 8,
          },
        ],
      })
      setLoading(false)
    }, 1500)
  }

  if (loading) {
    return (
      <Card className="p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          AI đang phân tích nội dung...
        </div>
      </Card>
    )
  }

  if (!suggestions) return null

  return (
    <div className="space-y-4">
      {/* SEO Title Suggestions */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          <h4 className="font-semibold text-sm">Gợi ý tiêu đề SEO</h4>
        </div>
        <div className="space-y-2">
          {suggestions.titleSuggestions.map((suggestedTitle: string, idx: number) => (
            <div
              key={idx}
              className="flex items-start justify-between gap-2 p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <p className="text-sm flex-1">{suggestedTitle}</p>
              <Button
                size="sm"
                variant="ghost"
                className="shrink-0 h-7 text-xs active:scale-95 transition-transform"
                onClick={() => onApplyTitle?.(suggestedTitle)}
              >
                Apply
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Related Posts for Linking */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Link2 className="h-4 w-4 text-blue-500" />
          <h4 className="font-semibold text-sm">Bài viết liên quan</h4>
        </div>
        <div className="space-y-2">
          {suggestions.relatedPosts.map((post: any) => (
            <div key={post.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
              <div className="flex-1">
                <p className="text-sm font-medium">{post.title}</p>
                <p className="text-xs text-muted-foreground">{Math.round(post.similarity * 100)}% similarity</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs active:scale-95 transition-transform bg-transparent"
              >
                Chèn link
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Auto-tagging */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Tag className="h-4 w-4 text-green-500" />
          <h4 className="font-semibold text-sm">Tags được đề xuất</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestions.suggestedTags.map((tag: string) => (
            <Badge
              key={tag}
              variant="outline"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => onApplyTags?.([tag])}
            >
              #{tag}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Code Audit */}
      {suggestions.codeIssues.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="h-4 w-4 text-orange-500" />
            <h4 className="font-semibold text-sm">Code Audit</h4>
          </div>
          <div className="space-y-2">
            {suggestions.codeIssues.map((issue: any, idx: number) => (
              <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-muted/50 text-sm">
                <div
                  className={`shrink-0 h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold ${
                    issue.severity === "warning" ? "bg-amber-500/20 text-amber-500" : "bg-blue-500/20 text-blue-500"
                  }`}
                >
                  {issue.severity === "warning" ? "⚠" : "ℹ"}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{issue.message}</p>
                  <p className="text-xs text-muted-foreground">Line {issue.line}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
