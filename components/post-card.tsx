"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Bookmark, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface PostCardProps {
  post: {
    id: string
    author: {
      name: string
      avatar: string
      username: string
    }
    title: string
    excerpt: string
    tags: string[]
    likes: number
    comments: number
    timeAgo: string
    readTime: string
  }
}

export function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md hover:border-primary/20 active:scale-[0.99]">
      <div className="p-4 space-y-3">
        {/* Author info */}
        <div className="flex items-center justify-between">
          <Link href={`/profile/${post.author.username}`} className="flex items-center gap-3 group">
            <Avatar className="h-10 w-10 ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
              <AvatarFallback>{post.author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm group-hover:text-primary transition-colors">{post.author.name}</p>
              <p className="text-xs text-muted-foreground">
                {post.author.username} · {post.timeAgo}
              </p>
            </div>
          </Link>
          <Button variant="ghost" size="icon" className="h-8 w-8 active:scale-95 transition-transform">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Post content */}
        <Link href={`/post/${post.id}`} className="block space-y-2 group">
          <h2 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>
        </Link>

        {/* Tags */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs whitespace-nowrap">
              #{tag}
            </Badge>
          ))}
          <span className="text-xs text-muted-foreground whitespace-nowrap ml-auto">{post.readTime}</span>
        </div>

        {/* Interactions */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "gap-2 active:scale-95 transition-all",
                liked && "text-red-500 hover:text-red-600 hover:bg-red-500/10",
              )}
              onClick={handleLike}
            >
              <Heart className={cn("h-4 w-4", liked && "fill-current")} />
              <span className="text-sm font-medium">{likeCount}</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 active:scale-95 transition-transform" asChild>
              <Link href={`/post/${post.id}#comments`}>
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm font-medium">{post.comments}</span>
              </Link>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-9 w-9 active:scale-95 transition-all",
              saved && "text-primary hover:text-primary hover:bg-primary/10",
            )}
            onClick={() => setSaved(!saved)}
          >
            <Bookmark className={cn("h-4 w-4", saved && "fill-current")} />
          </Button>
        </div>
      </div>
    </Card>
  )
}

export function PostCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
          <div className="space-y-2 flex-1">
            <div className="h-4 w-24 bg-muted animate-pulse rounded" />
            <div className="h-3 w-32 bg-muted animate-pulse rounded" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-5 w-3/4 bg-muted animate-pulse rounded" />
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-muted animate-pulse rounded-full" />
          <div className="h-6 w-20 bg-muted animate-pulse rounded-full" />
        </div>
      </div>
    </Card>
  )
}
