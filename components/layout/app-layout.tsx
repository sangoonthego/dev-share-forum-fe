import type React from "react"
import { MobileNavigation, DesktopSidebar } from "@/components/navigation"
import { TopNavbar } from "./top-navbar"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <DesktopSidebar />
      <div className="flex flex-1 flex-col md:pl-64">
        <TopNavbar />
        <main className="flex-1 pb-24 md:pb-6">{children}</main>
      </div>
      <MobileNavigation />
    </div>
  )
}
