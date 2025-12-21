"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  MapPin,
  Share2,
  Bookmark,
  ArrowRight,
  Video,
  Shield,
  RefreshCw,
  UserPlus,
  ChevronRight,
  Zap,
  Download,
  BadgeCheck,
} from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function EventDetailPage() {
  const params = useParams()
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  const [showGuestListModal, setShowGuestListModal] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  // Mock data
  const event = {
    id: params.id,
    title: "React Meetup Hanoi - Building AI Apps with Next.js 15",
    coverImage: "/tech-meetup-event.jpg",
    date: "2025-03-21",
    startTime: "18:00",
    endTime: "21:00",
    location: {
      name: "Dreamplex Lieu Giai",
      address: "15 Lieu Giai, Ba Dinh, Hanoi",
      coordinates: { lat: 21.0285, lng: 105.8542 },
    },
    type: "in-person",
    category: "Tech & Development",
    status: "upcoming",
    isFree: true,
    attendeeCount: 127,
    capacity: 150,
    price: 0,
    hasCapacity: true,
    requiresApproval: false,
    host: {
      name: "Nguyen Van A",
      avatar: "/diverse-avatars.png",
      followerCount: 1234,
    },
    description: `## About This Event

Join us for an exciting evening exploring the latest features in Next.js 15 and how to build production-ready AI applications!

### What You'll Learn

- Next.js 15 new features and improvements
- Integrating AI models with the Vercel AI SDK
- Best practices for building scalable AI apps
- Live coding session and Q&A

### Who Should Attend

This event is perfect for developers who have basic knowledge of React and want to explore AI integration in their web applications.

### Agenda

- 18:00 - Registration & Networking
- 18:30 - Keynote: Next.js 15 Overview
- 19:15 - Workshop: Building Your First AI App
- 20:30 - Q&A and Networking
- 21:00 - Event Ends

### What to Bring

- Your laptop
- Curiosity and questions!
- Business cards for networking`,
    schedule: [
      {
        startTime: "18:00",
        endTime: "18:30",
        title: "Registration & Networking",
        description: "Check-in and meet other developers",
      },
      {
        startTime: "18:30",
        endTime: "19:15",
        title: "Keynote: Next.js 15 Overview",
        description: "Deep dive into new features",
        speaker: {
          name: "John Doe",
          avatar: "/audio-speaker.png",
        },
      },
      {
        startTime: "19:15",
        endTime: "20:30",
        title: "Workshop: Building Your First AI App",
        description: "Hands-on coding session",
      },
      {
        startTime: "20:30",
        endTime: "21:00",
        title: "Q&A and Networking",
        description: "Ask questions and connect with attendees",
      },
    ],
    attendees: Array(40).fill({
      id: "1",
      name: "User Name",
      avatar: "/diverse-avatars.png",
    }),
    featuredGuests: [
      {
        id: "1",
        name: "Jane Smith",
        title: "Senior Engineer at Vercel",
        avatar: "/featured-badge.png",
        isVerified: true,
      },
      {
        id: "2",
        name: "Bob Johnson",
        title: "Tech Lead at Shopee",
        avatar: "/featured-badge.png",
        isVerified: true,
      },
    ],
  }

  const handleRegister = () => {
    setShowRegistrationModal(true)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        url: window.location.href,
      })
    }
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        {/* Hero Section with Cover Image */}
        <section className="relative w-full h-80 md:h-96 overflow-hidden bg-muted">
          <img src={event.coverImage || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background" />

          {/* Breadcrumb */}
          <div className="absolute top-4 left-4 z-10">
            <Breadcrumb>
              <BreadcrumbList className="text-white">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/events" className="text-white/80 hover:text-white">
                    Events
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white/60" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white">{event.category}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-card/95 backdrop-blur-sm"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-card/95 backdrop-blur-sm"
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
            </Button>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Event Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title & Host */}
              <div>
                <h1 className="text-3xl md:text-4xl font-black mb-4 text-balance leading-tight">{event.title}</h1>

                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={event.host.avatar || "/placeholder.svg"} />
                      <AvatarFallback>H</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{event.host.name}</p>
                      <p className="text-sm text-muted-foreground">{event.host.followerCount} followers</p>
                    </div>
                  </div>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <UserPlus className="h-4 w-4" />
                    Follow
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div className="text-foreground leading-relaxed whitespace-pre-line">{event.description}</div>
              </div>

              {/* Schedule */}
              {event.schedule && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Event Schedule</h2>
                  <div className="space-y-4">
                    {event.schedule.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex gap-4 p-4 rounded-xl border bg-card hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col items-center min-w-[80px] pt-1">
                          <span className="text-xs text-muted-foreground">{item.startTime}</span>
                          <div className="flex-1 w-px bg-border my-2" />
                          <span className="text-xs text-muted-foreground">{item.endTime}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                          {item.speaker && (
                            <div className="flex items-center gap-2 mt-3">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={item.speaker.avatar || "/placeholder.svg"} />
                                <AvatarFallback>S</AvatarFallback>
                              </Avatar>
                              <span className="text-xs">{item.speaker.name}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Registration Card (Sticky) */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4 shadow-xl border-0">
                <CardHeader className="space-y-4">
                  {event.status === "upcoming" && (
                    <Badge className="w-fit gap-1">
                      <Zap className="h-3 w-3" />
                      Happening Soon
                    </Badge>
                  )}

                  <div>
                    {event.isFree ? (
                      <p className="text-3xl font-black">Free</p>
                    ) : (
                      <>
                        <p className="text-3xl font-black">${event.price}</p>
                        <p className="text-sm text-muted-foreground">per person</p>
                      </>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Date & Time */}
                  <div className="flex gap-3">
                    <Calendar className="text-muted-foreground flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {event.startTime} - {event.endTime}
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex gap-3">
                    <MapPin className="text-muted-foreground flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold">{event.location.name}</p>
                      <p className="text-sm text-muted-foreground">{event.location.address}</p>
                      {event.type === "online" && (
                        <Badge variant="secondary" className="mt-1 gap-1">
                          <Video className="h-3 w-3" />
                          Online Event
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Capacity */}
                  {event.hasCapacity && (
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Spots Left</span>
                        <span className="font-semibold">
                          {event.capacity - event.attendeeCount} / {event.capacity}
                        </span>
                      </div>
                      <Progress value={(event.attendeeCount / event.capacity) * 100} className="h-2" />
                    </div>
                  )}

                  {/* CTA Button */}
                  <Button size="lg" className="w-full text-base font-bold gap-2" onClick={handleRegister}>
                    {event.requiresApproval ? "Request to Join" : "Register Now"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>

                  {/* Add to Calendar */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full gap-2 bg-transparent">
                        <Calendar className="h-4 w-4" />
                        Add to Calendar
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <span className="mr-2">📅</span>
                        Google Calendar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span className="mr-2">🍎</span>
                        Apple Calendar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Download .ics
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Trust Signals */}
                  <div className="pt-4 border-t space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span>Secure registration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4" />
                      <span>Free cancellation anytime</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Guest List Card */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Who's Coming</span>
                    <Badge variant="secondary">{event.attendeeCount} guests</Badge>
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  {/* Featured Guests */}
                  {event.featuredGuests.length > 0 && (
                    <div className="mb-4 pb-4 border-b">
                      <p className="text-xs text-muted-foreground mb-3">Featured Guests</p>
                      <div className="space-y-3">
                        {event.featuredGuests.map((guest) => (
                          <div key={guest.id} className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={guest.avatar || "/placeholder.svg"} />
                              <AvatarFallback>G</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm truncate">{guest.name}</p>
                              <p className="text-xs text-muted-foreground truncate">{guest.title}</p>
                            </div>
                            {guest.isVerified && <BadgeCheck className="h-4 w-4 text-primary flex-shrink-0" />}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Stacked Avatars */}
                  <div className="flex flex-wrap gap-1">
                    {event.attendees.slice(0, 40).map((attendee, idx) => (
                      <Avatar
                        key={idx}
                        className="w-10 h-10 ring-2 ring-background hover:scale-110 transition-transform cursor-pointer"
                        title={attendee.name}
                      >
                        <AvatarImage src={attendee.avatar || "/placeholder.svg"} />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    ))}
                    {event.attendeeCount > 40 && (
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                        +{event.attendeeCount - 40}
                      </div>
                    )}
                  </div>

                  <Button variant="ghost" className="w-full mt-4 gap-2" onClick={() => setShowGuestListModal(true)}>
                    See All {event.attendeeCount} Guests
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Bar - Mobile Only */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-card border-t shadow-2xl z-40">
          <Button size="lg" className="w-full font-bold gap-2" onClick={handleRegister}>
            {event.requiresApproval ? "Request to Join" : "Register Now"}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <p className="text-center text-xs text-muted-foreground mt-2">{event.attendeeCount} people are going</p>
        </div>

        {/* Registration Modal */}
        <Dialog open={showRegistrationModal} onOpenChange={setShowRegistrationModal}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Register for Event</DialogTitle>
            </DialogHeader>
            <form className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Why do you want to attend? (Optional)</Label>
                <Textarea id="message" placeholder="Share your interest..." rows={3} />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Complete Registration
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  )
}
