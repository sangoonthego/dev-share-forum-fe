import { AppLayout } from "@/components/app-layout"
import { PostDetail } from "@/components/post-detail"
import { CommentSection } from "@/components/comment-section"
import { RelatedPosts } from "@/components/related-posts"
import { ExpertMatchingBanner } from "@/components/expert-matching-banner"
import { CommunityHealthMonitor } from "@/components/community-health-monitor"
import { LegacyContentBanner } from "@/components/legacy-content-banner"

export default function PostDetailPage({ params }: { params: { id: string } }) {
  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-5xl py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <LegacyContentBanner
                publishedDate="Jan 15, 2022"
                outdatedInfo="React 19 đã ra mắt với Server Components stable. Xem bài viết cập nhật về RSC."
              />

              <ExpertMatchingBanner
                postId={params.id}
                postTitle="Building Real-Time Chat with WebSockets"
                requiredSkills={["Node.js", "WebSocket", "Real-time"]}
              />

              <PostDetail postId={params.id} />

              <CommunityHealthMonitor threadId={params.id} commentCount={45} />

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
