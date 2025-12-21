"use client"

import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"

const messages = [
  "Analyzing your code...",
  "Found 3 optimization opportunities",
  "Checking best practices...",
  "Generating suggestions...",
  "Ready! Here are my recommendations:",
]

export function AIAgentDemo() {
  const [messageIndex, setMessageIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length)
      setIsTyping(true)
      setTimeout(() => setIsTyping(false), 800)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="p-6 md:p-8 bg-card/50 backdrop-blur border-2" style={{ borderColor: "var(--glass-border)" }}>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <span className="font-mono text-sm font-semibold text-primary">AI</span>
          </div>
          <div className="flex-1">
            <div className="rounded-lg bg-muted p-4">
              <p className="font-mono text-sm">{messages[messageIndex]}</p>
              {isTyping && (
                <div className="mt-2 flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]"></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]"></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary"></span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-code-bg p-4 font-mono text-sm">
          <div className="space-y-2">
            <div className="text-muted-foreground">{"// Your code"}</div>
            <div>
              <span className="text-accent">const</span> <span className="text-primary">fetchData</span> ={" "}
              <span className="text-accent">async</span> () ={">"} {"{"}
            </div>
            <div className="pl-4 text-muted-foreground">{"// AI suggestions will appear here"}</div>
            <div>{"}"}</div>
          </div>
        </div>
      </div>
    </Card>
  )
}
