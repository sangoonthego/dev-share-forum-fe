"use client"

import { useState, useRef, useEffect } from "react"
import { Bot, X, Send, Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const QUICK_ACTIONS = [
  { label: "Tóm tắt bài viết này", action: "summarize" },
  { label: "Tìm chuyên gia Node.js", action: "find-expert" },
  { label: "Kiểm tra lỗi code", action: "check-code" },
  { label: "Gợi ý tags phù hợp", action: "suggest-tags" },
]

export function AIChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Xin chào! Tôi là DevShare AI Assistant. Tôi có thể giúp bạn tìm chuyên gia, kiểm tra code, hoặc cải thiện bài viết. Bạn cần tôi giúp gì?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(messageText),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()
    if (lowerQuery.includes("tóm tắt") || lowerQuery.includes("summarize")) {
      return "I have analyzed the current article. Here is the summary: The article provides instructions on building a real-time chat application with Next.js and WebSockets, including setup, implementation and deployment. Key points: WebSocket connections, message handling, and performance optimization."
    }
    if (lowerQuery.includes("chuyên gia") || lowerQuery.includes("expert")) {
      return "I found 3 Node.js experts with high Karma:\n\n1. **@alexkumar** - 2.5k Karma, specializing in Backend\n2. **@sarahchen** - 1.8k Karma, specializing in Full-stack\n3. **@jameswilson** - 1.2k Karma, specializing in API Design\n\nCan I send them an announcement inviting them to join the discussion?"
    }
    if (lowerQuery.includes("code") || lowerQuery.includes("lỗi")) {
      return "I checked the code blocks in the article:\n\n✅ WebSocket hook: Syntax is correct, but error handling should be added\n⚠️ TypeScript types: Missing interface for Message\n✅ useEffect cleanup: Correctly implemented\n\nDo you want me to suggest code improvements?"
    }
    if (lowerQuery.includes("tag")) {
      return "Based on the content, I recommend the following tags:\n\n#Real-time #WebSocket #Next.js #TypeScript #Tutorial #Chat-App\n\nThese tags will help the article be found more easily in the community."
    }
    return "I understand you need support. You can ask me about:\n- Article summary\n- Finding the right expert\n- Checking code errors\n- Suggested tags and titles\n- SEO optimization"
  }

  const handleQuickAction = (action: string) => {
    const actionMap: Record<string, string> = {
      summarize: "Please summarize this article for me",
      "find-expert": "Find a Node.js expert to help me",
      "check-code": "Check for code errors in the article",
      "suggest-tags": "Suggest suitable tags for the article",
    }
    handleSend(actionMap[action])
  }

  const ChatContent = () => (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={cn("flex gap-3", message.role === "user" && "flex-row-reverse")}>
            {message.role === "assistant" && (
              <Avatar className="h-8 w-8 shrink-0">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500 to-cyan-500">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              </Avatar>
            )}
            <div
              className={cn(
                "rounded-2xl px-4 py-2 max-w-[80%]",
                message.role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground ml-auto",
              )}
            >
              <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <Avatar className="h-8 w-8">
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500 to-cyan-500">
                <Bot className="h-4 w-4 text-white" />
              </div>
            </Avatar>
            <div className="rounded-2xl px-4 py-3 bg-muted">
              <div className="flex gap-1">
                <div
                  className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="px-4 pb-3">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {QUICK_ACTIONS.map((action) => (
            <Button
              key={action.action}
              variant="outline"
              size="sm"
              className="shrink-0 text-xs active:scale-95 transition-transform bg-transparent"
              onClick={() => handleQuickAction(action.action)}
            >
              <Sparkles className="h-3 w-3 mr-1" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="border-t p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Hỏi AI Assistant..."
            className="flex-1"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isTyping}
            className="shrink-0 active:scale-95 transition-transform"
          >
            {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </div>
    </div>
  )

  // Mobile: Full-screen Sheet
  if (isMobile) {
    return (
      <>
        <Button
          size="icon"
          className="fixed bottom-24 right-4 z-50 h-14 w-14 rounded-full shadow-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 animate-pulse"
          onClick={() => setIsOpen(true)}
        >
          <Bot className="h-6 w-6 text-white" />
        </Button>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="bottom" className="h-[90vh] p-0">
            <SheetHeader className="p-4 border-b">
              <SheetTitle className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                DevShare AI Assistant
              </SheetTitle>
            </SheetHeader>
            <ChatContent />
          </SheetContent>
        </Sheet>
      </>
    )
  }

  // Desktop: Popover Card
  return (
    <>
      <Button
        size="icon"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 animate-pulse"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bot className="h-6 w-6 text-white" />
        <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75" />
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-96 h-[600px] shadow-2xl flex flex-col">
          <CardHeader className="border-b shrink-0">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                DevShare AI Assistant
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1 flex flex-col">
            <ChatContent />
          </CardContent>
        </Card>
      )}
    </>
  )
}
