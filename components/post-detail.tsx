"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Bookmark, Share2, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { MarkdownPreview } from "@/components/markdown-preview"

interface PostDetailProps {
  postId: string
}

const MOCK_POST = {
  id: "1",
  author: {
    name: "Sarah Chen",
    avatar: "/developer-working.png",
    username: "@sarahchen",
  },
  title: "Building a Real-Time Chat App with Next.js and WebSockets",
  content: `
# Introduction

In this comprehensive guide, we'll build a real-time chat application using Next.js and WebSockets. This tutorial covers everything from setup to deployment.

## Prerequisites

Before we start, make sure you have:

- Node.js 18+ installed
- Basic knowledge of React and Next.js
- Familiarity with TypeScript

## Setting Up the Project

First, create a new Next.js project:

\`\`\`bash
npx create-next-app@latest chat-app
cd chat-app
\`\`\`

## Implementing WebSocket Connection

Here's how to set up a WebSocket connection:

\`\`\`typescript
import { useEffect, useState } from 'react'

export function useWebSocket(url: string) {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  
  useEffect(() => {
    const ws = new WebSocket(url)
    setSocket(ws)
    
    return () => ws.close()
  }, [url])
  
  return socket
}
\`\`\`

## Building the Chat Interface

The chat interface needs to be **responsive** and *user-friendly*. We'll use Tailwind CSS for styling.

Key features to implement:
- Real-time message updates
- User presence indicators
- Message history
- Typing indicators

## Conclusion

You now have a fully functional real-time chat application! Feel free to extend it with features like file uploads, reactions, and more.
  `,
  tags: ["Next.js", "WebSockets", "React", "Tutorial"],
  likes: 234,
  comments: 45,
  publishedAt: "2024-01-15",
  readTime: "8 min read",
}

export function PostDetail({ postId }: PostDetailProps) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [likeCount, setLikeCount] = useState(MOCK_POST.likes)

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: MOCK_POST.title,
        url: window.location.href,
      })
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Link href={`/profile/${MOCK_POST.author.username}`} className="flex items-center gap-3 group">
              <Avatar className="h-12 w-12 ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
                <AvatarImage src={MOCK_POST.author.avatar || "/placeholder.svg"} alt={MOCK_POST.author.name} />
                <AvatarFallback>{MOCK_POST.author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium group-hover:text-primary transition-colors">{MOCK_POST.author.name}</p>
                <p className="text-sm text-muted-foreground">
                  {MOCK_POST.author.username} · {MOCK_POST.readTime}
                </p>
              </div>
            </Link>
            <Button variant="ghost" size="icon" className="active:scale-95 transition-transform">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>

          <h1 className="font-mono text-3xl md:text-4xl font-bold text-balance leading-tight">{MOCK_POST.title}</h1>

          <div className="flex flex-wrap items-center gap-2">
            {MOCK_POST.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Content - Optimized for readability */}
        <div className="prose prose-slate dark:prose-invert max-w-none leading-relaxed">
          <MarkdownPreview content={MOCK_POST.content} />
        </div>

        {/* Interactions */}
        <div className="flex items-center justify-between pt-6 border-t">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="lg"
              className={cn(
                "gap-2 active:scale-95 transition-all",
                liked && "border-red-500 bg-red-500/10 text-red-500 hover:bg-red-500/20",
              )}
              onClick={handleLike}
            >
              <Heart className={cn("h-5 w-5", liked && "fill-current")} />
              <span className="font-medium">{likeCount}</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 active:scale-95 transition-transform bg-transparent"
              onClick={() => document.getElementById("comments")?.scrollIntoView({ behavior: "smooth" })}
            >
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">{MOCK_POST.comments}</span>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className={cn("active:scale-95 transition-all", saved && "border-primary bg-primary/10 text-primary")}
              onClick={() => setSaved(!saved)}
            >
              <Bookmark className={cn("h-5 w-5", saved && "fill-current")} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="active:scale-95 transition-transform bg-transparent"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
