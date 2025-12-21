import { AppLayout } from "@/components/app-layout"
import { MarkdownEditor } from "@/components/markdown-editor"

export default function CreatePage() {
  return (
    <AppLayout>
      <div className="min-h-screen">
        <div className="container mx-auto max-w-6xl py-6">
          <div className="mb-6">
            <h1 className="font-mono text-3xl font-bold">Create New Post</h1>
            <p className="text-muted-foreground mt-2">Share your knowledge with the community</p>
          </div>
          <MarkdownEditor />
        </div>
      </div>
    </AppLayout>
  )
}
