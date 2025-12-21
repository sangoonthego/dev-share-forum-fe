"use client"

import { cn } from "@/lib/utils"

interface MarkdownPreviewProps {
  content: string
  className?: string
}

export function MarkdownPreview({ content, className }: MarkdownPreviewProps) {
  if (!content) {
    return (
      <div className="text-center text-muted-foreground py-12">
        <p>Nothing to preview yet. Start writing!</p>
      </div>
    )
  }

  // Simple markdown rendering (in production, use a library like react-markdown)
  const renderMarkdown = (text: string) => {
    let html = text
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-6 mb-3">$1</h3>')
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-10 mb-5">$1</h1>')
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    // Code blocks
    html = html.replace(
      /```([\s\S]*?)```/g,
      '<pre class="bg-code-bg p-4 rounded-lg overflow-x-auto my-4"><code class="font-mono text-sm">$1</code></pre>',
    )
    // Inline code
    html = html.replace(/`(.*?)`/g, '<code class="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    // Lists
    html = html.replace(/^- (.*$)/gim, '<li class="ml-6 list-disc">$1</li>')
    // Links
    html = html.replace(/\[(.*?)\]$$(.*?)$$/g, '<a href="$2" class="text-primary hover:underline">$1</a>')
    // Paragraphs
    html = html.replace(/\n\n/g, "</p><p class='mb-4'>")

    return html
  }

  return (
    <div
      className={cn("prose prose-slate dark:prose-invert max-w-none leading-relaxed", className)}
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  )
}
