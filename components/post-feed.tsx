"use client"

import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useState } from "react"

const MOCK_POSTS = [
  {
    id: "1",
    author: {
      name: "Sarah Chen",
      avatar: "/developer-working.png",
      username: "@sarahchen",
    },
    title: "Building a Real-Time Chat App with Next.js and WebSockets",
    excerpt:
      "Learn how to implement real-time messaging with WebSockets, handle connection states, and optimize performance...",
    tags: ["Next.js", "WebSockets", "React"],
    likes: 234,
    comments: 45,
    timeAgo: "2h ago",
    readTime: "5 min read",
  },
  {
    id: "2",
    author: {
      name: "Alex Kumar",
      avatar: "/programmer.png",
      username: "@alexkumar",
    },
    title: "10 TypeScript Tips That Will Make You a Better Developer",
    excerpt:
      "Discover advanced TypeScript patterns and techniques that professional developers use to write cleaner code...",
    tags: ["TypeScript", "Best Practices"],
    likes: 567,
    comments: 89,
    timeAgo: "4h ago",
    readTime: "8 min read",
  },
  {
    id: "3",
    author: {
      name: "Maria Garcia",
      avatar: "/coder.png",
      username: "@mariagarcia",
    },
    title: "Understanding React Server Components in Depth",
    excerpt:
      "A comprehensive guide to React Server Components, their benefits, and how to use them effectively in production...",
    tags: ["React", "Next.js", "Performance"],
    likes: 892,
    comments: 123,
    timeAgo: "6h ago",
    readTime: "12 min read",
  },
  {
    id: "4",
    author: {
      name: "James Wilson",
      avatar: "/diverse-engineers-meeting.png",
      username: "@jameswilson",
    },
    title: "Building Accessible Web Apps: A Complete Guide",
    excerpt:
      "Everything you need to know about web accessibility, ARIA attributes, keyboard navigation, and screen readers...",
    tags: ["Accessibility", "Web Dev", "UX"],
    likes: 445,
    comments: 67,
    timeAgo: "8h ago",
    readTime: "10 min read",
  },
  {
    id: "5",
    author: {
      name: "Priya Patel",
      avatar: "/developer-woman.jpg",
      username: "@priyapatel",
    },
    title: "Optimizing Database Queries in Production",
    excerpt:
      "Learn advanced SQL optimization techniques, indexing strategies, and how to identify performance bottlenecks...",
    tags: ["Database", "SQL", "Performance"],
    likes: 678,
    comments: 91,
    timeAgo: "12h ago",
    readTime: "15 min read",
  },
]

export function PostFeed() {
  const [posts, setPosts] = useState(MOCK_POSTS)
  const [loading, setLoading] = useState(false)

  const loadMore = () => {
    setLoading(true)
    // Simulate loading more posts
    setTimeout(() => {
      setPosts([...posts, ...MOCK_POSTS.map((post) => ({ ...post, id: `${post.id}-${Date.now()}` }))])
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-mono text-2xl font-bold">Your Feed</h1>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <div className="flex justify-center py-8">
        <Button
          variant="outline"
          size="lg"
          onClick={loadMore}
          disabled={loading}
          className="active:scale-95 transition-transform bg-transparent"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            "Load More Posts"
          )}
        </Button>
      </div>
    </div>
  )
}
