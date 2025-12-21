import { AppLayout } from "@/components/app-layout"
import { ProfileHeader } from "@/components/profile-header"
import { ActivityHeatmap } from "@/components/activity-heatmap"
import { ProfileTabs } from "@/components/profile-tabs"

export default function ProfilePage({ params }: { params: { username: string } }) {
  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-6xl py-6 space-y-6">
          <ProfileHeader username={params.username} />
          <ActivityHeatmap />
          <ProfileTabs />
        </div>
      </div>
    </AppLayout>
  )
}
