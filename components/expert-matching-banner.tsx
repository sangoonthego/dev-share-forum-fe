"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, X } from "lucide-react"
import { useState } from "react"

interface ExpertMatchingBannerProps {
  postId: string
  postTitle: string
  requiredSkills: string[]
}

export function ExpertMatchingBanner({ postId, postTitle, requiredSkills }: ExpertMatchingBannerProps) {
  const [dismissed, setDismissed] = useState(false)

  const suggestedExperts = [
    {
      username: "alexkumar",
      name: "Alex Kumar",
      avatar: "/programmer.png",
      karma: 2543,
      matchReason: "Chuyên về Backend & Node.js",
    },
    {
      username: "sarahchen",
      name: "Sarah Chen",
      avatar: "/developer-working.png",
      karma: 1876,
      matchReason: "Expert về Real-time Systems",
    },
    {
      username: "jameswilson",
      name: "James Wilson",
      avatar: "/diverse-engineers-meeting.png",
      karma: 1234,
      matchReason: "Có 15 bài về WebSocket",
    },
  ]

  if (dismissed) return null

  return (
    <Card className="p-4 bg-gradient-to-br from-indigo-500/10 via-cyan-500/10 to-transparent border-indigo-500/20">
      <div className="flex items-start gap-3">
        <div className="shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1 space-y-3">
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-sm">AI đã tìm thấy chuyên gia phù hợp!</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Dựa trên nội dung bài viết, những người này có thể giúp bạn:
                </p>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={() => setDismissed(true)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {requiredSkills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>

          <div className="space-y-2">
            {suggestedExperts.map((expert) => (
              <div
                key={expert.username}
                className="flex items-center justify-between p-2 rounded-lg bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={expert.avatar || "/placeholder.svg"} alt={expert.name} />
                    <AvatarFallback>{expert.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{expert.name}</p>
                    <p className="text-xs text-muted-foreground">{expert.matchReason}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs h-7 active:scale-95 transition-transform bg-transparent"
                >
                  Mời tham gia
                </Button>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            AI sẽ tự động gửi thông báo cá nhân hóa đến những chuyên gia này.
          </p>
        </div>
      </div>
    </Card>
  )
}
