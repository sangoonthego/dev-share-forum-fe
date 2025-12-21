"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, LinkIcon, Calendar, Settings } from "lucide-react"

const MOCK_USER = {
  name: "Sarah Chen",
  username: "@sarahchen",
  avatar: "/developer-working.png",
  bio: "Full-stack developer passionate about React, Next.js, and building developer tools. Open source contributor.",
  location: "San Francisco, CA",
  website: "sarahchen.dev",
  joinedDate: "January 2023",
  stats: {
    followers: 1234,
    following: 567,
    posts: 89,
    karma: 4567,
  },
}

export function ProfileHeader({ username }: { username: string }) {
  return (
    <Card className="overflow-hidden">
      {/* Cover gradient */}
      <div className="h-32 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20" />

      {/* Profile info */}
      <div className="p-6 -mt-16">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar - Mobile: center, Desktop: left */}
          <div className="flex flex-col items-center md:items-start">
            <Avatar className="h-32 w-32 border-4 border-background ring-2 ring-primary/20">
              <AvatarImage src={MOCK_USER.avatar || "/placeholder.svg"} alt={MOCK_USER.name} />
              <AvatarFallback className="text-3xl">{MOCK_USER.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="text-center md:text-left">
                <h1 className="font-mono text-2xl md:text-3xl font-bold">{MOCK_USER.name}</h1>
                <p className="text-muted-foreground">{MOCK_USER.username}</p>
              </div>
              <Button className="active:scale-95 transition-transform gap-2">
                <Settings className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>

            {/* Stats - Mobile: row, Desktop: row */}
            <div className="flex items-center justify-center md:justify-start gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold">{MOCK_USER.stats.followers}</p>
                <p className="text-sm text-muted-foreground">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{MOCK_USER.stats.following}</p>
                <p className="text-sm text-muted-foreground">Following</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{MOCK_USER.stats.posts}</p>
                <p className="text-sm text-muted-foreground">Posts</p>
              </div>
              <div className="text-center">
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {MOCK_USER.stats.karma} Karma
                </Badge>
              </div>
            </div>

            <p className="text-center md:text-left leading-relaxed">{MOCK_USER.bio}</p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {MOCK_USER.location}
              </div>
              <a
                href={`https://${MOCK_USER.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <LinkIcon className="h-4 w-4" />
                {MOCK_USER.website}
              </a>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                Joined {MOCK_USER.joinedDate}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
