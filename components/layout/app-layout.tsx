"use client"

import type React from "react"
import { useEffect, useState } from "react"

import { MobileNavigation, DesktopSidebar } from "@/components/navigation"
import { TopNavbar } from "./top-navbar"
import { cn } from "@/lib/utils"

const SIDEBAR_KEY = "sidebar-collapsed"

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(SIDEBAR_KEY)
    if (saved !== null) {
      setCollapsed(saved === "true")
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(SIDEBAR_KEY, String(collapsed))
    }
  }, [collapsed, mounted])

  if (!mounted) return null

  return (
    <div className="min-h-screen">
      {/* Sidebar */}
      <DesktopSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((prev) => !prev)}
      />

      {/* Main content */}
      <div
        className={cn(
          "flex flex-1 flex-col transition-all duration-300",
          collapsed ? "md:pl-16" : "md:pl-64"
        )}
      >
        <TopNavbar />
        <main className="flex-1 pb-24 md:pb-6">{children}</main>
      </div>

      {/* Mobile nav */}
      <MobileNavigation />
    </div>
  )
}
