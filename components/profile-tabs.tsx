"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PostCard } from "@/components/post-card"
import { Card } from "@/components/ui/card"
import { FileText, BookMarked, FileEdit } from "lucide-react"

const MOCK_POSTS = [
  {
    id: "1",
    author: {
      name: "Sarah Chen",
      avatar: "/developer-working.png",
      username: "@sarahchen",
    },
    title: "Building a Real-Time Chat App with Next.js and WebSockets",
    excerpt: "Learn how to implement real-time messaging with WebSockets...",
    tags: ["Next.js", "WebSockets"],
    likes: 234,
    comments: 45,
    timeAgo: "2h ago",
    readTime: "5 min read",
  },
]

export function ProfileTabs() {
  return (
    <Tabs defaultValue="posts" className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="posts" className="gap-2">
          <FileText className="h-4 w-4" />
          <span className="hidden sm:inline">Posts</span>
        </TabsTrigger>
        <TabsTrigger value="saved" className="gap-2">
          <BookMarked className="h-4 w-4" />
          <span className="hidden sm:inline">Saved</span>
        </TabsTrigger>
        <TabsTrigger value="drafts" className="gap-2">
          <FileEdit className="h-4 w-4" />
          <span className="hidden sm:inline">Drafts</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="posts" className="space-y-4">
        {MOCK_POSTS.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </TabsContent>

      <TabsContent value="saved">
        <Card className="p-12 text-center">
          <BookMarked className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No saved posts yet</p>
        </Card>
      </TabsContent>

      <TabsContent value="drafts">
        <Card className="p-12 text-center">
          <FileEdit className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No drafts</p>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
