"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, PenSquare, Bell, User, Code2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

const routes = [
  { icon: Home, label: "Home", href: "/home" },
  { icon: Search, label: "Search", href: "/search", isSearchTrigger: true },
  { icon: PenSquare, label: "Create", href: "/create" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: User, label: "Profile", href: "/profile" },
]

export function MobileNavigation() {
  const pathname = usePathname()

  const handleSearchClick = () => {
    window.dispatchEvent(new Event("open-search"))
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card/95 backdrop-blur-lg supports-[backdrop-filter]:bg-card/80 md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {routes.map((route) => {
          const isActive = pathname === route.href
          const Icon = route.icon

          if (route.isSearchTrigger) {
            return (
              <Button
                key={route.href}
                variant="ghost"
                size="sm"
                onClick={handleSearchClick}
                className="flex h-12 w-14 flex-col items-center justify-center gap-1 active:scale-95 transition-transform"
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{route.label}</span>
              </Button>
            )
          }

          return (
            <Link key={route.href} href={route.href}>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "flex h-12 w-14 flex-col items-center justify-center gap-1 active:scale-95 transition-transform",
                  isActive && "text-primary",
                )}
              >
                <Icon className={cn("h-5 w-5", isActive && "fill-current")} />
                <span className="text-xs">{route.label}</span>
              </Button>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export function DesktopSidebar() {
  const pathname = usePathname()

  const handleSearchClick = () => {
    window.dispatchEvent(new Event("open-search"))
  }

  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <Code2 className="h-6 w-6 text-primary" />
        <span className="font-mono text-lg font-semibold">DevShare</span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {routes.map((route) => {
          const isActive = pathname === route.href
          const Icon = route.icon

          if (route.isSearchTrigger) {
            return (
              <Button
                key={route.href}
                variant="ghost"
                onClick={handleSearchClick}
                className="w-full justify-start gap-3 active:scale-95 transition-transform"
              >
                <Icon className="h-5 w-5" />
                {route.label}
              </Button>
            )
          }

          return (
            <Link key={route.href} href={route.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 active:scale-95 transition-transform",
                  isActive && "bg-primary/10 text-primary font-medium",
                )}
              >
                <Icon className="h-5 w-5" />
                {route.label}
              </Button>
            </Link>
          )
        })}
      </nav>

      <div className="border-t p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Theme</span>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  )
}
