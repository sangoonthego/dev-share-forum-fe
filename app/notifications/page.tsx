import { AppLayout } from "@/components/layout/app-layout"
import { NotificationsList } from "@/components/notifications-list"

export default function NotificationsPage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-3xl py-6">
          <NotificationsList />
        </div>
      </div>
    </AppLayout>
  )
}
