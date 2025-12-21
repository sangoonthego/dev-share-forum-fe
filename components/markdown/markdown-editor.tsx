"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Bold, Italic, LinkIcon, Code, List, ImageIcon, Sparkles, Send, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { MarkdownPreview } from "@/components/markdown/markdown-preview"
import { SmartEditorSuggestions } from "@/components/smart-editor-suggestions"

export function MarkdownEditor() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [showAI, setShowAI] = useState(false)
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write")

  const insertMarkdown = (before: string, after = "") => {
    const textarea = document.querySelector("textarea")
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    const newText = content.substring(0, start) + before + selectedText + after + content.substring(end)

    setContent(newText)
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, end + before.length)
    }, 0)
  }

  const addTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag])
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Main Editor */}
      <div className={cn("lg:col-span-12", showAI && "lg:col-span-8")}>
        <Card className="overflow-hidden">
          <div className="p-4 space-y-4">
            {/* Title Input */}
            <Input
              placeholder="Post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl font-bold border-0 px-0 focus-visible:ring-0 placeholder:text-muted-foreground/40"
            />

            <Separator />

            {/* Tags */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Add tags..."
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addTag()
                    }
                  }}
                  className="flex-1"
                />
                <Button onClick={addTag} variant="secondary" className="active:scale-95 transition-transform">
                  Add
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                      #{tag}
                      <button onClick={() => removeTag(tag)} className="ml-1 hover:text-destructive transition-colors">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <Separator />

            {/* Mobile/Desktop Toolbar - Sticky on mobile */}
            <div className="sticky top-0 z-10 bg-card -mx-4 px-4 py-2 border-b lg:static lg:border-0 lg:p-0">
              <div className="flex flex-wrap items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => insertMarkdown("**", "**")}
                  className="active:scale-95 transition-transform"
                  title="Bold"
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => insertMarkdown("*", "*")}
                  className="active:scale-95 transition-transform"
                  title="Italic"
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => insertMarkdown("[", "](url)")}
                  className="active:scale-95 transition-transform"
                  title="Link"
                >
                  <LinkIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => insertMarkdown("```\n", "\n```")}
                  className="active:scale-95 transition-transform"
                  title="Code Block"
                >
                  <Code className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => insertMarkdown("- ", "")}
                  className="active:scale-95 transition-transform"
                  title="List"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => insertMarkdown("![alt](", ")")}
                  className="active:scale-95 transition-transform"
                  title="Image"
                >
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Separator orientation="vertical" className="h-6 mx-1" />
                <Button
                  variant={showAI ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setShowAI(!showAI)}
                  className="gap-2 active:scale-95 transition-transform"
                >
                  <Sparkles className="h-4 w-4" />
                  <span className="hidden sm:inline">AI Enhance</span>
                </Button>
              </div>
            </div>

            {/* Editor/Preview Tabs - Mobile: Tabs, Desktop: Side-by-side */}
            <div className="lg:hidden">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "write" | "preview")}>
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="write">Write</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="write" className="mt-4">
                  <Textarea
                    placeholder="Write your post content in Markdown..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[400px] font-mono text-sm leading-relaxed resize-none"
                  />
                </TabsContent>
                <TabsContent value="preview" className="mt-4">
                  <div className="min-h-[400px] rounded-lg border p-4">
                    <MarkdownPreview content={content} />
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Desktop Side-by-side */}
            <div className="hidden lg:grid lg:grid-cols-2 lg:gap-4">
              <div>
                <p className="text-sm font-medium mb-2">Editor</p>
                <Textarea
                  placeholder="Write your post content in Markdown..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[500px] font-mono text-sm leading-relaxed resize-none"
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Preview</p>
                <div className="min-h-[500px] rounded-lg border p-4 overflow-auto">
                  <MarkdownPreview content={content} />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t p-4 bg-muted/30 flex gap-3 justify-end">
            <Button variant="outline" className="active:scale-95 transition-transform bg-transparent">
              Save Draft
            </Button>
            <Button className="gap-2 active:scale-95 transition-transform">
              <Send className="h-4 w-4" />
              Publish
            </Button>
          </div>
        </Card>
      </div>

      {/* AI Assistant Sidebar */}
      {showAI && (
        <div className="lg:col-span-4 space-y-4">
          <SmartEditorSuggestions
            title={title}
            content={content}
            onApplyTitle={(newTitle) => setTitle(newTitle)}
            onApplyTags={(newTags) => setTags([...tags, ...newTags])}
          />
        </div>
      )}
    </div>
  )
}
