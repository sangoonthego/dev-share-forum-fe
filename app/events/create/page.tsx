"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Upload,
  X,
  MapPin,
  Video,
  Layers,
  Code,
  Brain,
  Search,
  CalendarIcon,
  Plus,
  Trash2,
  Globe,
  Link2,
  Save,
  Rocket,
  Info,
  Eye,
} from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

const steps = [
  { id: 0, label: "Basic Info" },
  { id: 1, label: "Details" },
  { id: 2, label: "Settings" },
  { id: 3, label: "Preview" },
]

export default function CreateEventPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [coverImage, setCoverImage] = useState("")
  const [eventType, setEventType] = useState("in-person")
  const [ticketType, setTicketType] = useState("free")
  const [hasCapacity, setHasCapacity] = useState(false)
  const [requiresApproval, setRequiresApproval] = useState(false)
  const [schedule, setSchedule] = useState<any[]>([])
  const [startDate, setStartDate] = useState<Date>()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCoverImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addScheduleItem = () => {
    setSchedule([...schedule, { startTime: "", endTime: "", title: "", description: "" }])
  }

  const removeScheduleItem = (idx: number) => {
    setSchedule(schedule.filter((_, i) => i !== idx))
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" onClick={() => router.back()} className="mb-4 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <h1 className="text-3xl font-black">Create Your Event</h1>
            <p className="text-muted-foreground mt-2">Share your knowledge and connect with the community</p>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-between max-w-2xl mx-auto mb-12">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center gap-3 ${currentStep >= idx ? "text-primary" : "text-muted-foreground"}`}
                >
                  <div
                    className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    font-bold transition-all
                    ${
                      currentStep > idx
                        ? "bg-primary text-primary-foreground"
                        : currentStep === idx
                          ? "bg-primary/20 text-primary ring-4 ring-primary/20"
                          : "bg-muted"
                    }
                  `}
                  >
                    {currentStep > idx ? <Check className="h-5 w-5" /> : idx + 1}
                  </div>
                  <span className="font-medium hidden sm:inline">{step.label}</span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`
                    w-12 sm:w-24 h-px mx-2
                    ${currentStep > idx ? "bg-primary" : "bg-border"}
                  `}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Basic Information */}
          {currentStep === 0 && (
            <Card className="max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle>Let's create your event</CardTitle>
                <p className="text-sm text-muted-foreground">Start with the basics - you can always edit this later</p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Event Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title *</Label>
                  <Input id="title" placeholder="e.g. React Meetup Hanoi - Building AI Apps" className="text-lg" />
                  <p className="text-xs text-muted-foreground">Make it clear and catchy</p>
                </div>

                {/* Cover Image */}
                <div className="space-y-2">
                  <Label>Cover Image *</Label>
                  {!coverImage ? (
                    <label
                      htmlFor="cover-upload"
                      className="border-2 border-dashed border-border rounded-xl h-64 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors bg-muted/30"
                    >
                      <Upload className="h-10 w-10 text-muted-foreground mb-3" />
                      <p className="font-semibold">Click to upload cover image</p>
                      <p className="text-sm text-muted-foreground">Recommended: 2:1 ratio (e.g. 1200x600px)</p>
                      <input
                        type="file"
                        id="cover-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  ) : (
                    <div className="relative rounded-xl overflow-hidden group">
                      <img src={coverImage || "/placeholder.svg"} className="w-full h-64 object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <Button size="sm" variant="secondary" onClick={() => setCoverImage("")}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">
                        <div className="flex items-center gap-2">
                          <Code className="h-4 w-4" />
                          Tech & Development
                        </div>
                      </SelectItem>
                      <SelectItem value="ai">
                        <div className="flex items-center gap-2">
                          <Brain className="h-4 w-4" />
                          AI & Machine Learning
                        </div>
                      </SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="networking">Networking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Date & Time */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date & Time *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                          <CalendarIcon className="h-4 w-4" />
                          {startDate ? startDate.toLocaleDateString() : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={startDate} onSelect={setStartDate} />
                      </PopoverContent>
                    </Popover>
                    <Input type="time" className="mt-2" />
                  </div>

                  <div className="space-y-2">
                    <Label>End Date & Time *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                          <CalendarIcon className="h-4 w-4" />
                          Pick a date
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" />
                      </PopoverContent>
                    </Popover>
                    <Input type="time" className="mt-2" />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="justify-between">
                <Button variant="ghost" onClick={() => router.back()}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={() => setCurrentStep(1)} className="gap-2">
                  Next: Details
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Step 2: Event Details */}
          {currentStep === 1 && (
            <Card className="max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Event Type */}
                <div className="space-y-2">
                  <Label>Event Type *</Label>
                  <Tabs value={eventType} onValueChange={setEventType} className="mt-2">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="in-person" className="gap-2">
                        <MapPin className="h-4 w-4" />
                        In-Person
                      </TabsTrigger>
                      <TabsTrigger value="online" className="gap-2">
                        <Video className="h-4 w-4" />
                        Online
                      </TabsTrigger>
                      <TabsTrigger value="hybrid" className="gap-2">
                        <Layers className="h-4 w-4" />
                        Hybrid
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="in-person" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label>Venue Location *</Label>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Search for a venue or enter address" className="pl-10" />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="online" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label>Meeting Link *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose platform" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="zoom">Zoom</SelectItem>
                            <SelectItem value="meet">Google Meet</SelectItem>
                            <SelectItem value="custom">Custom Link</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input placeholder="https://zoom.us/j/..." className="mt-2" />
                        <p className="text-xs text-muted-foreground">
                          Link will be shared with attendees after registration
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label>Event Description *</Label>
                  <Tabs defaultValue="write">
                    <TabsList>
                      <TabsTrigger value="write">Write</TabsTrigger>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>
                    <TabsContent value="write">
                      <Textarea placeholder="Tell attendees what to expect..." className="min-h-[300px] mt-2" />
                      <p className="text-xs text-muted-foreground mt-2">
                        Markdown supported • Use ** for bold, * for italic
                      </p>
                    </TabsContent>
                    <TabsContent value="preview">
                      <div className="min-h-[300px] p-4 border rounded-lg bg-muted/30">Preview content here</div>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Schedule Builder */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Event Schedule (Optional)</Label>
                    <Button variant="outline" size="sm" onClick={addScheduleItem} className="gap-1 bg-transparent">
                      <Plus className="h-3 w-3" />
                      Add Item
                    </Button>
                  </div>

                  {schedule.map((item, idx) => (
                    <Card key={idx} className="p-4">
                      <div className="grid md:grid-cols-2 gap-3 mb-3">
                        <Input placeholder="Start Time (e.g. 09:00)" />
                        <Input placeholder="End Time (e.g. 10:00)" />
                      </div>
                      <Input placeholder="Session title" className="mb-2" />
                      <Textarea placeholder="Description (optional)" rows={2} />
                      <Button variant="ghost" size="sm" className="mt-2 gap-1" onClick={() => removeScheduleItem(idx)}>
                        <Trash2 className="h-3 w-3" />
                        Remove
                      </Button>
                    </Card>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="justify-between">
                <Button variant="ghost" onClick={() => setCurrentStep(0)} className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button onClick={() => setCurrentStep(2)} className="gap-2">
                  Next: Settings
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Step 3: Registration Settings */}
          {currentStep === 2 && (
            <Card className="max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle>Registration Settings</CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Ticket Type */}
                <div className="space-y-2">
                  <Label>Ticket Type *</Label>
                  <RadioGroup value={ticketType} onValueChange={setTicketType}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted">
                      <RadioGroupItem value="free" id="free" />
                      <Label htmlFor="free" className="flex-1 cursor-pointer">
                        <p className="font-semibold">Free</p>
                        <p className="text-sm text-muted-foreground">No charge for attendees</p>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted">
                      <RadioGroupItem value="paid" id="paid" />
                      <Label htmlFor="paid" className="flex-1 cursor-pointer">
                        <p className="font-semibold">Paid</p>
                        <p className="text-sm text-muted-foreground">Charge a fixed price per ticket</p>
                      </Label>
                    </div>
                  </RadioGroup>

                  {ticketType === "paid" && (
                    <div className="mt-3 p-4 border rounded-lg bg-muted/30">
                      <Label>Price per Ticket</Label>
                      <div className="flex gap-2 mt-2">
                        <Select defaultValue="usd">
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="usd">USD</SelectItem>
                            <SelectItem value="vnd">VND</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input type="number" placeholder="0.00" className="flex-1" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Capacity */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Event Capacity</Label>
                    <Switch checked={hasCapacity} onCheckedChange={setHasCapacity} />
                  </div>

                  {hasCapacity && (
                    <>
                      <div className="space-y-2">
                        <Label>Maximum Attendees</Label>
                        <Input type="number" placeholder="e.g. 100" />
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-sm">Enable Waitlist</p>
                          <p className="text-xs text-muted-foreground">
                            Allow guests to join waitlist when event is full
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </>
                  )}
                </div>

                {/* Approval */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold">Require Approval</p>
                    <p className="text-sm text-muted-foreground">Review and approve each registration manually</p>
                  </div>
                  <Switch checked={requiresApproval} onCheckedChange={setRequiresApproval} />
                </div>

                {/* Visibility */}
                <div className="space-y-2">
                  <Label>Event Visibility</Label>
                  <RadioGroup defaultValue="public">
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="public" id="public" />
                      <Label htmlFor="public" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          <p className="font-semibold">Public</p>
                        </div>
                        <p className="text-xs text-muted-foreground">Anyone can discover and register</p>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="unlisted" id="unlisted" />
                      <Label htmlFor="unlisted" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Link2 className="h-4 w-4" />
                          <p className="font-semibold">Unlisted</p>
                        </div>
                        <p className="text-xs text-muted-foreground">Only people with the link can register</p>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>

              <CardFooter className="justify-between">
                <Button variant="ghost" onClick={() => setCurrentStep(1)} className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button onClick={() => setCurrentStep(3)} className="gap-2">
                  Preview Event
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Step 4: Preview & Publish */}
          {currentStep === 3 && (
            <div className="max-w-4xl mx-auto space-y-6">
              <Card>
                <CardHeader className="bg-muted/30">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">Preview Mode</span>
                  </div>
                  <CardTitle>Review your event before publishing</CardTitle>
                </CardHeader>
              </Card>

              <div className="border rounded-xl overflow-hidden bg-card">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  {coverImage ? (
                    <img src={coverImage || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
                  ) : (
                    <p className="text-muted-foreground">Event Cover Preview</p>
                  )}
                </div>
                <div className="p-8">
                  <h2 className="text-3xl font-black mb-4">Your Event Title</h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CalendarIcon className="h-4 w-4" />
                      <span>Date & Time Preview</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>Location Preview</span>
                    </div>
                  </div>
                </div>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg mb-6">
                    <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold mb-1">Ready to go live?</p>
                      <p className="text-sm text-muted-foreground">
                        Your event will be visible to the community immediately after publishing. You can always edit
                        details later from your event dashboard.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                      <Save className="h-4 w-4" />
                      Save as Draft
                    </Button>
                    <Button className="flex-1 gap-2" size="lg" onClick={() => router.push("/events")}>
                      <Rocket className="h-4 w-4" />
                      Publish Event
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
