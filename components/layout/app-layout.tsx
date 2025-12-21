import type React from "react"
import { MobileNavigation, DesktopSidebar } from "@/components/navigation"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <DesktopSidebar />
      <main className="pb-20 md:pb-0 md:pl-64">{children}</main>
      <MobileNavigation />
    </div>
  )
}
