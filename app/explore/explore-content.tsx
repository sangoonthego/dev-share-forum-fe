"use client"

import { useState } from "react"
import { Search, TrendingUp, Zap, Users, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

interface Post {
  id: string
  title: string
  excerpt: string
  author: { name: string; avatar: string }
  views: number
  likes: number
  tags: string[]
  image?: string
  category: string
}

const featuredPost: Post = {
  id: "featured-1",
  title: "Building Production-Ready AI Agents with Next.js",
  excerpt:
    "A comprehensive guide on integrating AI agents into your Next.js applications with best practices for scalability and performance.",
  author: { name: "Sarah Chen", avatar: "/placeholder.svg" },
  views: 2450,
  likes: 340,
  tags: ["AI", "Next.js", "Production"],
  category: "Tutorial",
}

const trendingPosts: Post[] = [
  {
    id: "1",
    title: "React 19: New Features You Need to Know",
    excerpt: "Exploring the latest React features and their impact on development workflow.",
    author: { name: "Alex Kumar", avatar: "/placeholder.svg" },
    views: 1890,
    likes: 234,
    tags: ["React", "JavaScript"],
    category: "Article",
  },
  {
    id: "2",
    title: "Mastering TypeScript Generics",
    excerpt: "Deep dive into advanced TypeScript patterns for type-safe applications.",
    author: { name: "Lisa Wong", avatar: "/placeholder.svg" },
    views: 1650,
    likes: 198,
    tags: ["TypeScript", "Programming"],
    category: "Tutorial",
  },
  {
    id: "3",
    title: "Docker Best Practices 2024",
    excerpt: "Modern containerization strategies for microservices architecture.",
    author: { name: "James Peterson", avatar: "/placeholder.svg" },
    views: 1420,
    likes: 176,
    tags: ["DevOps", "Docker"],
    category: "Guide",
  },
]

const topContributors = [
  { name: "Sarah Chen", avatar: "/placeholder.svg", posts: 42, followers: 1200 },
  { name: "Alex Kumar", avatar: "/placeholder.svg", posts: 38, followers: 980 },
  { name: "Lisa Wong", avatar: "/placeholder.svg", posts: 35, followers: 870 },
]

const trendingTags = [
  { name: "React", count: 450 },
  { name: "NodeJS", count: 380 },
  { name: "AgenticAI", count: 320 },
  { name: "TypeScript", count: 290 },
  { name: "NextJS", count: 265 },
  { name: "DevOps", count: 240 },
]

const upcomingEvents = [
  { title: "React Meetup Hanoi", date: "Mar 15", attendees: 45 },
  { title: "AI Workshop", date: "Mar 18", attendees: 32 },
  { title: "Node.js Deep Dive", date: "Mar 22", attendees: 28 },
]

export function ExploreContent() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b bg-card p-6 md:p-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl md:text-5xl font-black text-balance leading-tight">
            Discover the Best Developer Content
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore trending articles, top contributors, and upcoming events in our community
          </p>

          {/* Search Bar */}
          <div className="relative mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Search articles, topics, authors..."
              className="pl-12 h-12 text-base shadow-lg border-0"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex gap-2 flex-wrap">
            {["All", "Tutorial", "Article", "Guide", "Tool"].map((filter) => (
              <Button key={filter} variant="outline" size="sm">
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 md:p-12">
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Featured Post - Large */}
          <div className="md:col-span-2">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer h-full">
              <div className="md:flex h-full">
                <div className="flex-1 p-8 flex flex-col justify-between">
                  <div>
                    <Badge className="mb-3">{featuredPost.category}</Badge>
                    <h2 className="text-2xl md:text-3xl font-black mb-3 text-balance leading-tight">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{featuredPost.excerpt}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar size="sm">
                        <AvatarImage src={featuredPost.author.avatar || "/placeholder.svg"} />
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{featuredPost.author.name}</p>
                        <p className="text-xs text-muted-foreground">Editor's Pick</p>
                      </div>
                    </div>
                    <div className="text-right text-xs text-muted-foreground">
                      <p>{featuredPost.views.toLocaleString()} views</p>
                      <p>{featuredPost.likes} likes</p>
                    </div>
                  </div>
                </div>

                {featuredPost.image && (
                  <div className="hidden md:block w-96 bg-gradient-to-br from-primary/10 to-accent/10" />
                )}
              </div>
            </Card>
          </div>

          {/* Top Contributors */}
          <Card className="p-6 space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Users size={20} />
              Top Contributors
            </h3>
            <div className="space-y-3">
              {topContributors.map((contributor) => (
                <div
                  key={contributor.name}
                  className="flex items-center gap-3 p-2 rounded hover:bg-muted transition-colors cursor-pointer"
                >
                  <Avatar size="sm">
                    <AvatarImage src={contributor.avatar || "/placeholder.svg"} />
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{contributor.name}</p>
                    <p className="text-xs text-muted-foreground">{contributor.posts} posts</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full bg-transparent" size="sm">
              View All
            </Button>
          </Card>
        </div>

        {/* Second Row - Trending Tags & Events */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Trending Tags */}
          <Card className="p-6 space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <TrendingUp size={20} />
              Trending Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {trendingTags.map((tag) => (
                <Badge
                  key={tag.name}
                  variant={selectedTag === tag.name ? "default" : "secondary"}
                  className="cursor-pointer hover:opacity-80 transition-opacity text-sm"
                  onClick={() => setSelectedTag(selectedTag === tag.name ? null : tag.name)}
                >
                  #{tag.name}
                  <span className="ml-1 text-xs opacity-70">({tag.count})</span>
                </Badge>
              ))}
            </div>
            <Button variant="outline" className="w-full bg-transparent" size="sm">
              Explore All Topics
            </Button>
          </Card>

          {/* Upcoming Events */}
          <Card className="p-6 space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Zap size={20} />
              Upcoming Events
            </h3>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.title} className="p-3 rounded border hover:bg-muted transition-colors cursor-pointer">
                  <p className="text-sm font-medium">{event.title}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <span>{event.date}</span>
                    <span>·</span>
                    <span>{event.attendees} going</span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full bg-transparent" size="sm">
              View Calendar
            </Button>
          </Card>
        </div>

        {/* Trending Posts Grid (Masonry-like) */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
              <BookOpen size={24} />
              Recommended for You
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trendingPosts.map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer flex flex-col h-full"
                >
                  <div className="h-40 bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors" />

                  <div className="p-6 flex flex-col flex-1">
                    <Badge className="w-fit mb-3" variant="secondary">
                      {post.category}
                    </Badge>

                    <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">{post.excerpt}</p>

                    <div className="flex gap-2 mb-4 flex-wrap">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Avatar size="xs">
                          <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                        </Avatar>
                        <span>{post.author.name}</span>
                      </div>
                      <div className="flex gap-3">
                        <span>{post.likes} likes</span>
                        <span>{post.views} views</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
