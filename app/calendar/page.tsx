"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Settings2, CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, isSameDay } from "date-fns"

interface CalendarEvent {
  id: string
  title: string
  date: Date
  startTime: string
  endTime: string
  type: "my-events" | "community" | "workshop"
  color: "indigo" | "emerald" | "cyan" | "amber"
  attendees: number
}

const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "React Meetup Hanoi",
    date: new Date(2024, 2, 15),
    startTime: "18:00",
    endTime: "20:00",
    type: "community",
    color: "indigo",
    attendees: 45,
  },
  {
    id: "2",
    title: "AI Workshop",
    date: new Date(2024, 2, 18),
    startTime: "19:00",
    endTime: "21:00",
    type: "workshop",
    color: "cyan",
    attendees: 32,
  },
  {
    id: "3",
    title: "Node.js Deep Dive",
    date: new Date(2024, 2, 22),
    startTime: "20:00",
    endTime: "22:00",
    type: "community",
    color: "emerald",
    attendees: 28,
  },
]

const colorClasses = {
  indigo: "bg-indigo-50 dark:bg-indigo-950/30 border-l-4 border-indigo-500",
  emerald: "bg-emerald-50 dark:bg-emerald-950/30 border-l-4 border-emerald-500",
  cyan: "bg-cyan-50 dark:bg-cyan-950/30 border-l-4 border-cyan-500",
  amber: "bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500",
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 2, 1))
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 2, 15))
  const [view, setView] = useState<"calendar" | "schedule">("calendar")
  const [visibleLayers, setVisibleLayers] = useState({
    "my-events": true,
    community: true,
    workshop: true,
  })

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const selectedDateEvents = mockEvents.filter((event) => isSameDay(event.date, selectedDate))

  const toggleLayer = (layer: string) => {
    setVisibleLayers((prev) => ({
      ...prev,
      [layer]: !prev[layer],
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "t" || e.key === "T") {
      setSelectedDate(new Date())
      setCurrentDate(new Date())
    }
  }

  return (
    <div className="min-h-screen bg-background md:flex" onKeyDown={handleKeyPress} tabIndex={0}>
      {/* Left Sidebar - Mini Calendar & Layers */}
      <div className="hidden md:flex md:w-72 border-r bg-card flex-col p-6 gap-6 overflow-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Calendar</h2>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings2 size={16} />
          </Button>
        </div>

        {/* Mini Calendar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentDate(subMonths(currentDate, 1))}
              className="h-8 w-8"
            >
              <ChevronLeft size={16} />
            </Button>
            <span className="text-sm font-semibold">{format(currentDate, "MMMM yyyy")}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentDate(addMonths(currentDate, 1))}
              className="h-8 w-8"
            >
              <ChevronRight size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="text-xs font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {daysInMonth.map((day) => (
              <button
                key={day.toString()}
                onClick={() => setSelectedDate(day)}
                className={cn(
                  "h-8 w-8 rounded text-xs font-medium transition-colors hover:bg-muted",
                  isSameDay(day, selectedDate) ? "bg-primary text-primary-foreground font-bold" : "hover:bg-muted",
                )}
              >
                {format(day, "d")}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar Layers */}
        <div className="space-y-3 border-t pt-4">
          <p className="text-sm font-semibold">Calendar Layers</p>

          <label className="flex items-center gap-3 cursor-pointer hover:bg-muted p-2 rounded transition-colors">
            <Checkbox checked={visibleLayers["my-events"]} onCheckedChange={() => toggleLayer("my-events")} />
            <div className="flex-1">
              <p className="text-sm">My Events</p>
              <p className="text-xs text-muted-foreground">
                {mockEvents.filter((e) => e.type === "my-events").length} events
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer hover:bg-muted p-2 rounded transition-colors">
            <Checkbox checked={visibleLayers["community"]} onCheckedChange={() => toggleLayer("community")} />
            <div className="flex-1">
              <p className="text-sm">Community Events</p>
              <p className="text-xs text-muted-foreground">
                {mockEvents.filter((e) => e.type === "community").length} events
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer hover:bg-muted p-2 rounded transition-colors">
            <Checkbox checked={visibleLayers["workshop"]} onCheckedChange={() => toggleLayer("workshop")} />
            <div className="flex-1">
              <p className="text-sm">Workshops & AI</p>
              <p className="text-xs text-muted-foreground">
                {mockEvents.filter((e) => e.type === "workshop").length} events
              </p>
            </div>
          </label>
        </div>

        <Button className="w-full gap-2" size="sm">
          <Plus size={16} />
          Create Event
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Press <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">T</kbd> to go to today
        </p>
      </div>

      {/* Main Calendar View */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b bg-card p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-black">{format(currentDate, "MMMM yyyy")}</h1>
              <p className="text-sm text-muted-foreground mt-1">{mockEvents.length} events this month</p>
            </div>

            <div className="flex gap-2">
              <Button
                variant={view === "calendar" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("calendar")}
              >
                <CalendarIcon size={16} className="mr-2" />
                Calendar
              </Button>
              <Button
                variant={view === "schedule" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("schedule")}
              >
                Schedule
              </Button>
            </div>
          </div>
        </div>

        {/* Calendar/Schedule Content */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          {view === "calendar" ? (
            // Calendar Grid View
            <div className="hidden md:grid grid-cols-7 gap-4 auto-rows-[120px]">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center font-semibold text-sm text-muted-foreground mb-4">
                  {day}
                </div>
              ))}

              {daysInMonth.map((day) => {
                const dayEvents = mockEvents.filter((e) => isSameDay(e.date, day))
                const isToday = isSameDay(day, new Date())
                const isSelected = isSameDay(day, selectedDate)

                return (
                  <div
                    key={day.toString()}
                    onClick={() => setSelectedDate(day)}
                    className={cn(
                      "border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md",
                      isSelected && "ring-2 ring-primary",
                      isToday && "bg-primary/5 border-primary",
                    )}
                  >
                    <div className={cn("text-xs font-bold mb-2", isToday ? "text-primary" : "text-muted-foreground")}>
                      {format(day, "d")}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={cn(
                            "text-xs p-1 rounded truncate text-white font-medium",
                            event.color === "indigo" && "bg-indigo-500",
                            event.color === "emerald" && "bg-emerald-500",
                            event.color === "cyan" && "bg-cyan-500",
                            event.color === "amber" && "bg-amber-500",
                          )}
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-muted-foreground px-1">+{dayEvents.length - 2} more</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            // Schedule List View
            <div className="max-w-2xl space-y-4">
              {selectedDateEvents.length > 0 ? (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl font-bold mb-4">{format(selectedDate, "EEEE, MMMM d, yyyy")}</h2>
                    <div className="space-y-3">
                      {selectedDateEvents.map((event) => (
                        <Card
                          key={event.id}
                          className={cn(
                            "p-4 hover:shadow-lg transition-shadow cursor-pointer",
                            colorClasses[event.color],
                          )}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold">{event.title}</h3>
                              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                <span>
                                  {event.startTime} - {event.endTime}
                                </span>
                                <Badge variant="secondary" className="text-xs">
                                  {event.attendees} going
                                </Badge>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              Details
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <CalendarIcon size={40} className="mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">No events on this day</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Sidebar - Selected Day Details (Mobile: appears in schedule view) */}
        {view === "schedule" && selectedDateEvents.length > 0 && (
          <div className="md:hidden border-t bg-card p-4 space-y-4">
            <h3 className="font-semibold">Details</h3>
            <div className="space-y-2">
              {selectedDateEvents.map((event) => (
                <Card key={event.id} className="p-3">
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {event.startTime} - {event.endTime}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
