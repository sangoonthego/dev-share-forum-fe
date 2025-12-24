import { Suspense } from "react"
import { ExploreContent } from "./explore-content"
import { AppLayout } from "@/components/layout/app-layout"

export default function ExplorePage() {
  return (
    <AppLayout>
      <Suspense fallback={null}>
        <ExploreContent />
      </Suspense>
    </AppLayout>
  )
}
