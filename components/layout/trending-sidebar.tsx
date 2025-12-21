import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { TrendingUp, Sparkles } from "lucide-react"
import Link from "next/link"

const TRENDING_TOPICS = [
  { tag: "Next.js 15", posts: 234, trending: true },
  { tag: "TypeScript", posts: 189, trending: false },
  { tag: "AI Development", posts: 156, trending: true },
  { tag: "React Server Components", posts: 143, trending: false },
  { tag: "Web Performance", posts: 98, trending: false },
]

const WHO_TO_FOLLOW = [
  {
    name: "Dan Abramov",
    username: "@dan_abramov",
    avatar: "/developer-man.jpg",
    bio: "Working on React",
  },
  {
    name: "Cassidy Williams",
    username: "@cassidoo",
    avatar: "/developer-woman-2.jpg",
    bio: "Developer advocate",
  },
  {
    name: "Kent C. Dodds",
    username: "@kentcdodds",
    avatar: "/developer-man-2.jpg",
    bio: "Teaching full stack",
  },
]

export function TrendingSidebar() {
  return (
    <div className="sticky top-6 space-y-6">
      {/* Trending Topics */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="font-mono font-semibold">Trending Topics</h2>
        </div>
        <div className="space-y-3">
          {TRENDING_TOPICS.map((topic) => (
            <Link key={topic.tag} href={`/tag/${topic.tag}`} className="block group">
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm group-hover:text-primary transition-colors">#{topic.tag}</span>
                    {topic.trending && (
                      <Badge variant="secondary" className="text-xs h-5 px-1.5">
                        <Sparkles className="h-3 w-3" />
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{topic.posts} posts</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Card>

      {/* Who to Follow */}
      <Card className="p-4">
        <h2 className="font-mono font-semibold mb-4">Who to Follow</h2>
        <div className="space-y-4">
          {WHO_TO_FOLLOW.map((user) => (
            <div key={user.username} className="flex items-start gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <Link href={`/profile/${user.username}`} className="group">
                  <p className="font-medium text-sm group-hover:text-primary transition-colors truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.username}</p>
                </Link>
                <p className="text-xs text-muted-foreground mt-1">{user.bio}</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2 h-7 text-xs active:scale-95 transition-transform bg-transparent"
                >
                  Follow
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
