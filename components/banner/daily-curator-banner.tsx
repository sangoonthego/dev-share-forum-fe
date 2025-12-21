"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Newspaper, TrendingUp, Eye } from "lucide-react"
import Link from "next/link"

export function DailyCuratorBanner() {
  return (
    <Card className="p-4 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-transparent border-blue-500/20">
      <div className="flex items-start gap-3">
        <div className="shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
          <Newspaper className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <h4 className="font-semibold text-sm">Daily DevShare Newsletter</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            AI đã tổng hợp 10 bài viết hay nhất hôm nay. Đọc ngay để cập nhật kiến thức mới nhất!
          </p>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" asChild className="active:scale-95 transition-transform bg-transparent">
              <Link href="/newsletter/daily">
                <Eye className="h-3 w-3 mr-1" />
                Xem bản tin
              </Link>
            </Button>
            <span className="text-xs text-muted-foreground">Được tạo bởi AI Curator</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
