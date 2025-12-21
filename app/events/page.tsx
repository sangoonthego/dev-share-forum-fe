"use client"

import { useState } from "react"
import Link from "next/link"
import { AppLayout } from "@/components/layout/app-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Clock, Search, Grid3x3, List, Plus, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data
const events = [
  {
    id: "1",
    title: "React Meetup Hanoi - Building AI Apps with Next.js 15",
    coverImage: "/tech-meetup.png",
    date: "2025-03-21",
    startTime: "18:00",
    endTime: "21:00",
    location: { name: "Dreamplex Lieu Giai", address: "Hanoi, Vietnam" },
    type: "in-person",
    category: "Tech & Development",
    isFree: true,
    attendeeCount: 127,
    capacity: 150,
    host: { name: "Nguyen Van A", avatar: "/diverse-avatars.png" },
    attendees: Array(8).fill({ avatar: "/diverse-avatars.png" }),
  },
  {
    id: "2",
    title: "AI Hackathon 2025 - Build the Future",
    coverImage: "/ai-hackathon.jpg",
    date: "2025-03-25",
    startTime: "09:00",
    endTime: "18:00",
    location: { name: "Online Event", address: "Zoom" },
    type: "online",
    category: "AI & Machine Learning",
    isFree: false,
    price: 25,
    attendeeCount: 342,
    capacity: 500,
    host: { name: "Tech Community HN", avatar: "/interconnected-tech.png" },
    attendees: Array(8).fill({ avatar: "/diverse-avatars.png" }),
  },
  {
    id: "3",
    title: "Coffee & Code: Casual Developer Networking",
    coverImage: "/coffee-networking.jpg",
    date: "2025-03-23",
    startTime: "10:00",
    endTime: "12:00",
    location: { name: "The Coffee House", address: "Ho Chi Minh City" },
    type: "in-person",
    category: "Networking",
    isFree: true,
    attendeeCount: 45,
    capacity: 50,
    host: { name: "Tran Thi B", avatar: "/diverse-avatars.png" },
    attendees: Array(8).fill({ avatar: "/diverse-avatars.png" }),
  },
]

const categories = [
  { id: "tech", name: "Tech & Development", count: 24 },
  { id: "ai", name: "AI & Machine Learning", count: 18 },
  { id: "design", name: "Design", count: 12 },
  { id: "networking", name: "Networking", count: 31 },
]

export default function EventsPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [selectedTab, setSelectedTab] = useState("all")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-background border-b">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-16">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-balance">Discover Events</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Join developer meetups, workshops, and conferences in your community
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mt-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input placeholder="Search events..." className="pl-12 h-12 text-base shadow-lg border-0" />
                </div>
              </div>

              {/* Create Event CTA */}
              <div className="pt-4">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/events/create">
                    <Plus className="h-4 w-4" />
                    Host an Event
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-4 space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 text-sm">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label
                        key={cat.id}
                        className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors"
                      >
                        <Checkbox
                          checked={selectedCategories.includes(cat.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedCategories([...selectedCategories, cat.id])
                            } else {
                              setSelectedCategories(selectedCategories.filter((c) => c !== cat.id))
                            }
                          }}
                        />
                        <span className="flex-1">{cat.name}</span>
                        <span className="text-xs text-muted-foreground">{cat.count}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-sm">Location</h4>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="hanoi">Hanoi</SelectItem>
                      <SelectItem value="hcm">Ho Chi Minh</SelectItem>
                      <SelectItem value="danang">Da Nang</SelectItem>
                      <SelectItem value="online">Online</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-sm">Event Type</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <Checkbox />
                      <span>In-Person</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <Checkbox />
                      <span>Online</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <Checkbox />
                      <span>Hybrid</span>
                    </label>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Filter Bar */}
              <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
                <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                  <TabsList>
                    <TabsTrigger value="all">All Events</TabsTrigger>
                    <TabsTrigger value="week">This Week</TabsTrigger>
                    <TabsTrigger value="online">Online</TabsTrigger>
                    <TabsTrigger value="free">Free</TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="flex items-center gap-2">
                  {/* Mobile Filter Trigger */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6 space-y-6">
                        <div>
                          <h4 className="font-semibold mb-3">Categories</h4>
                          <div className="space-y-2">
                            {categories.map((cat) => (
                              <label key={cat.id} className="flex items-center gap-2 text-sm cursor-pointer">
                                <Checkbox />
                                <span className="flex-1">{cat.name}</span>
                                <span className="text-xs text-muted-foreground">{cat.count}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* View Toggle */}
                  <div className="hidden md:flex items-center gap-1 border rounded-lg p-1">
                    <Button
                      variant={view === "grid" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setView("grid")}
                    >
                      <Grid3x3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={view === "list" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setView("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Event Grid/List */}
              <div className={view === "grid" ? "grid sm:grid-cols-2 lg:grid-cols-2 gap-6" : "flex flex-col gap-4"}>
                {events.map((event) => (
                  <Link key={event.id} href={`/events/${event.id}`}>
                    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 active:scale-[0.98]">
                      {/* Cover Image */}
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={event.coverImage || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Type Badge */}
                        <Badge
                          variant={event.type === "online" ? "default" : "secondary"}
                          className="absolute top-3 right-3 shadow-lg"
                        >
                          {event.type === "online" ? "Online" : "In-Person"}
                        </Badge>

                        {/* Date Badge */}
                        <div className="absolute top-3 left-3 bg-card rounded-lg px-3 py-2 shadow-lg">
                          <p className="text-xs font-bold text-muted-foreground">
                            {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                          </p>
                          <p className="text-2xl font-black leading-none">{new Date(event.date).getDate()}</p>
                        </div>
                      </div>

                      <CardContent className="p-4">
                        {/* Title */}
                        <h3 className="text-lg font-bold line-clamp-2 mb-3 group-hover:text-primary transition-colors">
                          {event.title}
                        </h3>

                        {/* Meta Info */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>
                              {new Date(event.date).toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                              })}{" "}
                              · {event.startTime}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{event.location.name}</span>
                          </div>
                        </div>

                        {/* Attendees & Price */}
                        <div className="flex items-center justify-between pt-3 border-t">
                          <div className="flex items-center">
                            <div className="flex -space-x-2">
                              {event.attendees.slice(0, 4).map((attendee, idx) => (
                                <Avatar
                                  key={idx}
                                  className="w-8 h-8 ring-2 ring-background hover:scale-110 transition-transform"
                                >
                                  <AvatarImage src={attendee.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                            <span className="ml-3 text-xs text-muted-foreground">+{event.attendeeCount} going</span>
                          </div>

                          {event.isFree ? (
                            <Badge variant="secondary">Free</Badge>
                          ) : (
                            <span className="text-sm font-semibold">${event.price}</span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* Load More */}
              <div className="mt-8 text-center">
                <Button variant="outline" size="lg">
                  Load More Events
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
