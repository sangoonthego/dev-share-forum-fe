"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, UserPlus, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const MOCK_NOTIFICATIONS = [
  {
    id: "1",
    type: "like",
    user: { name: "Alex Kumar", avatar: "/programmer.png" },
    content: "liked your post",
    postTitle: "Building a Real-Time Chat App",
    timeAgo: "5m ago",
    read: false,
  },
  {
    id: "2",
    type: "comment",
    user: { name: "Maria Garcia", avatar: "/coder.png" },
    content: "commented on your post",
    postTitle: "Understanding WebSocket Protocols",
    timeAgo: "1h ago",
    read: false,
  },
  {
    id: "3",
    type: "follow",
    user: { name: "James Wilson", avatar: "/diverse-engineers-meeting.png" },
    content: "started following you",
    timeAgo: "2h ago",
    read: true,
  },
]

export function NotificationsList() {
  const getIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />
      case "comment":
        return <MessageCircle className="h-4 w-4 text-blue-500" />
      case "follow":
        return <UserPlus className="h-4 w-4 text-green-500" />
      default:
        return <Sparkles className="h-4 w-4 text-primary" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-mono text-3xl font-bold">Notifications</h1>
        <Button variant="outline">Mark all as read</Button>
      </div>

      <div className="space-y-2">
        {MOCK_NOTIFICATIONS.map((notification) => (
          <Card
            key={notification.id}
            className={cn(
              "p-4 transition-all hover:shadow-md cursor-pointer",
              !notification.read && "border-primary/50 bg-primary/5",
            )}
          >
            <div className="flex gap-3">
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarImage src={notification.user.avatar || "/placeholder.svg"} alt={notification.user.name} />
                <AvatarFallback>{notification.user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-1">
                <div className="flex items-start gap-2">
                  {getIcon(notification.type)}
                  <p className="text-sm">
                    <span className="font-medium">{notification.user.name}</span>{" "}
                    <span className="text-muted-foreground">{notification.content}</span>
                    {notification.postTitle && (
                      <>
                        {" "}
                        <span className="font-medium">"{notification.postTitle}"</span>
                      </>
                    )}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">{notification.timeAgo}</p>
              </div>

              {!notification.read && <Badge variant="secondary" className="h-2 w-2 p-0 rounded-full bg-primary" />}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
