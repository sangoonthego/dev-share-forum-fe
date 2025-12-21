import { AppLayout } from "@/components/layout/app-layout"
import { SearchInterface } from "@/components/search/search-interface"

export default function SearchPage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        <SearchInterface />
      </div>
    </AppLayout>
  )
}
