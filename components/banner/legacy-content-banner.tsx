"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Archive, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LegacyContentBannerProps {
  publishedDate: string
  outdatedInfo?: string
}

export function LegacyContentBanner({ publishedDate, outdatedInfo }: LegacyContentBannerProps) {
  return (
    <Alert className="mb-6 bg-amber-500/10 border-amber-500/20">
      <Archive className="h-4 w-4 text-amber-600" />
      <AlertTitle className="flex items-center gap-2">
        Legacy Content
        <Info className="h-3 w-3 text-muted-foreground" />
      </AlertTitle>
      <AlertDescription className="mt-2">
        <p className="text-sm">
          Bài viết này được xuất bản vào <strong>{publishedDate}</strong> (hơn 2 năm trước). AI đã phát hiện một số
          thông tin có thể đã lỗi thời.
        </p>
        {outdatedInfo && (
          <div className="mt-3 p-3 rounded-lg bg-background/50 text-sm">
            <p className="font-medium mb-1">Cập nhật từ AI:</p>
            <p className="text-muted-foreground">{outdatedInfo}</p>
          </div>
        )}
        <Button size="sm" variant="outline" className="mt-3 active:scale-95 transition-transform bg-transparent">
          Xem phiên bản cập nhật
        </Button>
      </AlertDescription>
    </Alert>
  )
}
