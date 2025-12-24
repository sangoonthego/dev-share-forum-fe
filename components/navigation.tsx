"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  PenSquare,
  Code2,
  Trophy,
  Bot,
  Menu,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const routes = [
  { icon: Home, label: "Home", href: "/home" },
  { icon: PenSquare, label: "Create", href: "/create" },
  { icon: Trophy, label: "Leaderboard", href: "/leaderboard" },
]

export function MobileNavigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card/95 backdrop-blur md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {routes.map((route) => {
          const isActive = pathname === route.href
          const Icon = route.icon

          return (
            <Link key={route.href} href={route.href}>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "flex h-12 w-14 flex-col items-center gap-1",
                  isActive && "text-primary"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{route.label}</span>
              </Button>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

interface DesktopSidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function DesktopSidebar({
  collapsed,
  onToggle,
}: DesktopSidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 bottom-0 z-40 hidden md:flex flex-col border-r bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex h-14 items-center justify-between border-b px-4">
        <div className="flex items-center gap-2 overflow-hidden">
          <Code2 className="h-6 w-6 text-primary shrink-0" />
          {!collapsed && (
            <span className="font-mono text-lg font-semibold truncate">
              DevShare Forum
            </span>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
        >
          {collapsed ? <Menu className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {routes.map((route) => {
          const isActive = pathname === route.href
          const Icon = route.icon

          return (
            <Link key={route.href} href={route.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3",
                  isActive && "bg-primary/10 text-primary",
                  collapsed && "justify-center"
                )}
              >
                <Icon className="h-5 w-5" />
                {!collapsed && route.label}
              </Button>
            </Link>
          )
        })}

        {/* AI Demo */}
        <Link href="/ai-demo">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3",
              pathname === "/ai-demo" && "bg-primary/10 text-primary",
              collapsed && "justify-center"
            )}
          >
            <Bot className="h-5 w-5" />
            {!collapsed && (
              <>
                AI Demo
                <Badge className="ml-auto text-xs">New</Badge>
              </>
            )}
          </Button>
        </Link>
      </nav>
    </aside>
  )
}
