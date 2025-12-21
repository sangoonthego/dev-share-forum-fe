"use client"

import { Card } from "@/components/ui/card"
import { Bot, TrendingDown } from "lucide-react"
import { useEffect, useState } from "react"

interface CommunityHealthMonitorProps {
  threadId: string
  commentCount: number
}

export function CommunityHealthMonitor({ threadId, commentCount }: CommunityHealthMonitorProps) {
  const [shouldShow, setShouldShow] = useState(false)
  const [sentimentScore, setSentimentScore] = useState(0.8)

  useEffect(() => {
    // Simulate sentiment monitoring
    if (commentCount > 10) {
      const timer = setTimeout(() => {
        // Simulate negative sentiment detection
        const randomScore = Math.random()
        setSentimentScore(randomScore)
        if (randomScore < 0.4) {
          setShouldShow(true)
        }
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [commentCount])

  if (!shouldShow) return null

  return (
    <Card className="p-4 bg-amber-500/10 border-amber-500/20">
      <div className="flex gap-3">
        <div className="shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
          <Bot className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="h-4 w-4 text-amber-600" />
            <h4 className="font-semibold text-sm">DevShare AI Moderator</h4>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Cuộc thảo luận đang nóng lên. Các Dev hãy giữ bình tĩnh và tập trung vào chuyên môn nhé! Hãy cùng nhau xây
            dựng một cộng đồng tích cực. 💙
          </p>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-amber-500 transition-all"
                style={{ width: `${(1 - sentimentScore) * 100}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{Math.round((1 - sentimentScore) * 100)}% tension</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
