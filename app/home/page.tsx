import { AppLayout } from "@/components/layout/app-layout"
import { PostFeed } from "@/components/post/post-feed"
import { TrendingSidebar } from "@/components/trending-sidebar"
import { SearchOverlay } from "@/components/search/search-overlay"
import { Suspense } from "react"
import { PostCardSkeleton } from "@/components/post/post-card"
import { DailyCuratorBanner } from "@/components/banner/daily-curator-banner"

export default function HomePage() {
  return (
    <AppLayout>
      <div className="min-h-screen">
        {/* Main content area with 3-column layout on desktop */}
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 py-6 lg:grid-cols-12">
            {/* Main Feed - Mobile: full width, Desktop: 8 columns */}
            <div className="lg:col-span-8">
              <div className="mb-6">
                <DailyCuratorBanner />
              </div>

              <Suspense
                fallback={
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <PostCardSkeleton key={i} />
                    ))}
                  </div>
                }
              >
                <PostFeed />
              </Suspense>
            </div>

            {/* Sidebar - Hidden on mobile, Desktop: 4 columns */}
            <div className="hidden lg:block lg:col-span-4">
              <TrendingSidebar />
            </div>
          </div>
        </div>

        <SearchOverlay />
      </div>
    </AppLayout>
  )
}
