"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Shield, AlertTriangle, XCircle } from "lucide-react"

interface ModerationAlertProps {
  type: "warning" | "error" | "info"
  title: string
  message: string
  issues?: { line: number; issue: string }[]
  onFix?: () => void
  onDismiss?: () => void
}

export function ModerationAlert({ type, title, message, issues, onFix, onDismiss }: ModerationAlertProps) {
  const getIcon = () => {
    switch (type) {
      case "error":
        return <XCircle className="h-5 w-5" />
      case "warning":
        return <AlertTriangle className="h-5 w-5" />
      default:
        return <Shield className="h-5 w-5" />
    }
  }

  const getVariant = () => {
    switch (type) {
      case "error":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <Alert variant={getVariant()} className="mb-4">
      <div className="flex gap-3">
        {getIcon()}
        <div className="flex-1 space-y-2">
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{message}</AlertDescription>

          {issues && issues.length > 0 && (
            <div className="mt-3 space-y-1">
              {issues.map((issue, idx) => (
                <div key={idx} className="text-sm p-2 rounded bg-background/50">
                  <span className="font-mono text-xs text-muted-foreground">Line {issue.line}:</span> {issue.issue}
                </div>
              ))}
            </div>
          )}

          {(onFix || onDismiss) && (
            <div className="flex gap-2 mt-3">
              {onFix && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onFix}
                  className="active:scale-95 transition-transform bg-transparent"
                >
                  Sửa ngay
                </Button>
              )}
              {onDismiss && (
                <Button size="sm" variant="ghost" onClick={onDismiss} className="active:scale-95 transition-transform">
                  Đóng
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Alert>
  )
}
