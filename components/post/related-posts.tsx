import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const RELATED_POSTS = [
  { id: "2", title: "Understanding WebSocket Protocols", tags: ["WebSockets", "Networking"], readTime: "6 min" },
  { id: "3", title: "Next.js 15 New Features", tags: ["Next.js", "React"], readTime: "4 min" },
  { id: "4", title: "Building Scalable Real-Time Apps", tags: ["Architecture", "WebSockets"], readTime: "10 min" },
]

export function RelatedPosts() {
  return (
    <Card className="p-6 space-y-4 sticky top-6">
      <h3 className="font-semibold">Related Posts</h3>
      <div className="space-y-4">
        {RELATED_POSTS.map((post) => (
          <Link
            key={post.id}
            href={`/post/${post.id}`}
            className="block space-y-2 group p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h4>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {post.tags[0]}
              </Badge>
              <span className="text-xs text-muted-foreground">{post.readTime}</span>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  )
}
