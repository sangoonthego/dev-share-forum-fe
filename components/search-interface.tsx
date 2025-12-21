"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, TrendingUp } from "lucide-react"
import { PostCard } from "@/components/post-card"

const TRENDING_TAGS = ["Next.js", "React", "TypeScript", "WebSockets", "AI", "Performance", "Security", "UI/UX"]

const MOCK_RESULTS = [
  {
    id: "1",
    author: { name: "Sarah Chen", avatar: "/developer-working.png", username: "@sarahchen" },
    title: "Building a Real-Time Chat App with Next.js",
    excerpt: "Learn how to implement real-time messaging...",
    tags: ["Next.js", "WebSockets"],
    likes: 234,
    comments: 45,
    timeAgo: "2h ago",
    readTime: "5 min read",
  },
]

export function SearchInterface() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState(MOCK_RESULTS)

  return (
    <div className="container mx-auto max-w-5xl py-6 space-y-6">
      {/* Search Header */}
      <Card className="p-6 space-y-4">
        <h1 className="font-mono text-3xl font-bold">Search</h1>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search posts, users, tags..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
              autoFocus
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 active:scale-95 transition-transform bg-transparent"
          >
            <Filter className="h-5 w-5" />
          </Button>
        </div>
      </Card>

      {/* Trending Tags */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Trending Topics</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {TRENDING_TAGS.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors active:scale-95"
            >
              #{tag}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">{query ? `Results for "${query}"` : "Recent Posts"}</h2>
        {results.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
