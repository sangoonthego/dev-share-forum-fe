"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, X, TrendingUp, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const RECENT_SEARCHES = ["React hooks", "TypeScript generics", "Next.js API routes"]
const POPULAR_TAGS = ["JavaScript", "React", "TypeScript", "Next.js", "CSS", "Node.js"]

export function SearchOverlay() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const pathname = usePathname()

  // Close on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Listen for search click from navigation
  useEffect(() => {
    const handleSearchClick = () => setIsOpen(true)
    window.addEventListener("open-search", handleSearchClick)
    return () => window.removeEventListener("open-search", handleSearchClick)
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur animate-fade-in">
      <div className="container max-w-2xl pt-20 px-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            autoFocus
            placeholder="Search posts, tags, or users..."
            className="h-14 pl-12 pr-12 text-lg border-2 focus-visible:ring-0 focus-visible:border-primary"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 active:scale-95 transition-transform"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Search Results / Suggestions */}
        <div className="mt-8 space-y-6">
          {/* Recent Searches */}
          {!query && (
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-mono font-semibold text-sm">Recent Searches</h3>
              </div>
              <div className="space-y-2">
                {RECENT_SEARCHES.map((search) => (
                  <button
                    key={search}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm"
                    onClick={() => setQuery(search)}
                  >
                    {search}
                  </button>
                ))}
              </div>
            </Card>
          )}

          {/* Popular Tags */}
          {!query && (
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Hash className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-mono font-semibold text-sm">Popular Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_TAGS.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className={cn("cursor-pointer active:scale-95 transition-transform")}
                    onClick={() => setQuery(tag)}
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </Card>
          )}

          {/* Search Results */}
          {query && (
            <Card className="p-4">
              <p className="text-sm text-muted-foreground text-center py-8">
                Searching for "{query}"... (Search functionality coming soon)
              </p>
            </Card>
          )}
        </div>

        {/* Close hint */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">Press ESC to close</p>
        </div>
      </div>
    </div>
  )
}
