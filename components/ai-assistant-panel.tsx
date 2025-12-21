"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Wand2, FileText, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface AIAssistantPanelProps {
  title: string
  content: string
  onApply: (newContent: string) => void
}

export function AIAssistantPanel({ title, content, onApply }: AIAssistantPanelProps) {
  const [loading, setLoading] = useState(false)

  const suggestions = [
    {
      icon: Wand2,
      title: "Improve Title",
      description: "Make your title more engaging and SEO-friendly",
      action: "improve-title",
    },
    {
      icon: FileText,
      title: "Fix Grammar",
      description: "Check and fix grammar and spelling errors",
      action: "fix-grammar",
    },
    {
      icon: CheckCircle2,
      title: "Optimize Code",
      description: "Review code blocks for best practices",
      action: "optimize-code",
    },
  ]

  const handleSuggestion = async (action: string) => {
    setLoading(true)
    // Simulate AI processing
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }

  return (
    <Card className="sticky top-6 p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">AI Assistant</h3>
        <Badge variant="secondary" className="ml-auto text-xs">
          Beta
        </Badge>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Get intelligent suggestions to improve your post quality and reach.
        </p>

        {suggestions.map((suggestion) => {
          const Icon = suggestion.icon
          return (
            <Button
              key={suggestion.action}
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-3 px-4 active:scale-95 transition-transform bg-transparent"
              onClick={() => handleSuggestion(suggestion.action)}
              disabled={loading}
            >
              <Icon className="h-4 w-4 text-primary shrink-0" />
              <div className="text-left">
                <p className="font-medium text-sm">{suggestion.title}</p>
                <p className="text-xs text-muted-foreground">{suggestion.description}</p>
              </div>
            </Button>
          )
        })}
      </div>

      <div className="pt-4 border-t">
        <div className="rounded-lg bg-muted/50 p-3 space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <p className="text-xs font-medium">AI Insights</p>
          </div>
          <p className="text-xs text-muted-foreground">
            {content.length > 0
              ? `Your post is ${content.split(" ").length} words. Consider adding code examples for better engagement.`
              : "Start writing to get AI-powered suggestions."}
          </p>
        </div>
      </div>
    </Card>
  )
}
