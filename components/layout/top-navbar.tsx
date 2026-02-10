"use client"

import { Search, Bell, Compass, Calendar, LayoutGrid, LogOut, User, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "../theme/theme-toggle"
import { useAuth } from "@/hooks/useAuth"

export function TopNavbar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const navItems = [
    { icon: LayoutGrid, label: "Event", href: "/events" },
    { icon: Calendar, label: "Calendar", href: "/calendar" },
    { icon: Compass, label: "Explore", href: "/explore" },
  ]

  const handleLogout = async () => {
    await logout()
  }

  // Get avatar initials
  const getInitials = (name: string | undefined) => {
    if (!name) return "NN"
    return name
      .split(" ")
      .map(n => n.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full border-0 items-center justify-between bg-card/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      {/* Căn giữa các nút điều hướng chính */}
      <div className="flex flex-1 items-center justify-center gap-2 md:gap-6">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "flex items-center gap-2 px-3 text-muted-foreground transition-colors hover:text-white",
                pathname === item.href && "text-foreground font-bold"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="hidden sm:inline-block text-sm">{item.label}</span>
            </Button>
          </Link>
        ))}
      </div>

      {/* Phần bên phải: Giờ, Search, Thông báo, Avatar Dropdown */}
      <div className="flex items-center gap-2 md:gap-4">
        <span className="hidden lg:block text-xs font-mono text-muted-foreground">
          {new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} GMT+7
        </span>

        <ThemeToggle />

        <Link href="/search">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Search className="h-5 w-5" />
          </Button>
        </Link>
        
        <Link href="/notifications">
          <div className="relative">
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Bell className="h-5 w-5" />
            </Button>
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 border-2 border-card" />
          </div>
        </Link>

        {/* Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-9 w-9 cursor-pointer border-2 border-transparent hover:border-primary/50 transition-all">
              <AvatarImage src={user?.avatar ?? `https://i.pravatar.cc/150?u=${user?.email}`} />
              <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent 
            className="w-64 mt-2 bg-[#1a1b26] border-[#2f3146] text-slate-200 p-0 overflow-hidden rounded-xl shadow-2xl" 
            align="end"
          >
            {/* Header nằm ngang (Horizontal) */}
            <div className="bg-[#24263a] p-4 flex flex-row items-center gap-4 border-b border-[#2f3146]">
              <Avatar className="h-12 w-12 ring-2 ring-primary/20 flex-shrink-0">
                <AvatarImage src={user?.avatar ?? `https://i.pravatar.cc/150?u=${user?.email}`} />
                <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{user?.name || "User"}</p>
                <p className="text-xs text-slate-400 mt-1 truncate">{user?.email || "email@example.com"}</p>
              </div>
            </div>

            <div className="p-2">
              <DropdownMenuItem asChild className="focus:bg-[#2f3146] focus:text-white cursor-pointer py-2.5 px-3 rounded-lg mt-1 transition-colors">
                <Link href="/profile" className="flex w-full items-center">
                  <User className="mr-2 h-4 w-4 text-slate-400" />
                  <span className="text-sm">View Profile</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild className="focus:bg-[#2f3146] focus:text-white cursor-pointer py-2.5 px-3 rounded-lg mt-1 transition-colors">
                <Link href="/settings" className="flex w-full items-center">
                  <Settings className="mr-2 h-4 w-4 text-slate-400" />
                  <span className="text-sm">Settings</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-[#2f3146] my-2" />

              <DropdownMenuItem 
                onClick={handleLogout}
                className="focus:bg-red-500/10 focus:text-red-400 text-red-400 cursor-pointer py-2.5 px-3 rounded-lg mb-1 transition-colors"
              >
                <LogOut className="mr-4 h-4 w-4" />
                <span className="text-sm">Log out</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
