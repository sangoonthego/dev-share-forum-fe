import { AppLayout } from "@/components/app-layout"
import { PostDetail } from "@/components/post-detail"
import { CommentSection } from "@/components/comment-section"
import { RelatedPosts } from "@/components/related-posts"

export default function PostDetailPage({ params }: { params: { id: string } }) {
  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-5xl py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <PostDetail postId={params.id} />
              <div id="comments" className="mt-8">
                <CommentSection postId={params.id} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <RelatedPosts />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
