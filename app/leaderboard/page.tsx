"use client"

import { useState } from "react"
import { Trophy, TrendingUp, Award, Medal, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

interface LeaderboardUser {
  rank: number
  name: string
  avatar: string
  karma: number
  posts: number
  followers: number
  answers: number
  streak: number
  badges: string[]
}

const leaderboardData: LeaderboardUser[] = [
  {
    rank: 1,
    name: "Sarah Chen",
    avatar: "/placeholder.svg",
    karma: 4850,
    posts: 42,
    followers: 1200,
    answers: 156,
    streak: 45,
    badges: ["Expert", "Top Contributor", "Helpful"],
  },
  {
    rank: 2,
    name: "Alex Kumar",
    avatar: "/placeholder.svg",
    karma: 4320,
    posts: 38,
    followers: 980,
    answers: 142,
    streak: 32,
    badges: ["Expert", "Trending"],
  },
  {
    rank: 3,
    name: "Lisa Wong",
    avatar: "/placeholder.svg",
    karma: 3950,
    posts: 35,
    followers: 870,
    answers: 128,
    streak: 28,
    badges: ["Top Contributor", "Rising Star"],
  },
  {
    rank: 4,
    name: "James Peterson",
    avatar: "/placeholder.svg",
    karma: 3620,
    posts: 32,
    followers: 750,
    answers: 115,
    streak: 21,
    badges: ["Helpful"],
  },
  {
    rank: 5,
    name: "Emma Rodriguez",
    avatar: "/placeholder.svg",
    karma: 3280,
    posts: 28,
    followers: 640,
    answers: 104,
    streak: 18,
    badges: ["Rising Star"],
  },
]

const badgeColors: Record<string, { bg: string; text: string; icon: string }> = {
  Expert: { bg: "bg-amber-100 dark:bg-amber-950/30", text: "text-amber-800 dark:text-amber-200", icon: "⭐" },
  "Top Contributor": { bg: "bg-red-100 dark:bg-red-950/30", text: "text-red-800 dark:text-red-200", icon: "🏆" },
  Helpful: { bg: "bg-green-100 dark:bg-green-950/30", text: "text-green-800 dark:text-green-200", icon: "❤️" },
  Trending: { bg: "bg-pink-100 dark:bg-pink-950/30", text: "text-pink-800 dark:text-pink-200", icon: "📈" },
  "Rising Star": { bg: "bg-blue-100 dark:bg-blue-950/30", text: "text-blue-800 dark:text-blue-200", icon: "✨" },
}

export default function LeaderboardPage() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "alltime">("month")
  const [category, setCategory] = useState<"karma" | "posts" | "followers">("karma")

  const sortedData = [...leaderboardData].sort((a, b) => {
    if (category === "karma") return b.karma - a.karma
    if (category === "posts") return b.posts - a.posts
    return b.followers - a.followers
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-primary/10 to-transparent p-6 md:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary/20 rounded-lg">
              <Trophy size={32} className="text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black">Community Leaderboard</h1>
              <p className="text-muted-foreground mt-1">Celebrate our top contributors and experts</p>
            </div>
          </div>

          {/* Time Range & Category Filters */}
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <div>
              <p className="text-sm font-semibold mb-3">Time Range</p>
              <div className="flex gap-2">
                {(["week", "month", "alltime"] as const).map((range) => (
                  <Button
                    key={range}
                    variant={timeRange === range ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeRange(range)}
                    className="capitalize"
                  >
                    {range === "alltime" ? "All Time" : range.charAt(0).toUpperCase() + range.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold mb-3">Sort By</p>
              <div className="flex gap-2">
                {(["karma", "posts", "followers"] as const).map((cat) => (
                  <Button
                    key={cat}
                    variant={category === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCategory(cat)}
                    className="capitalize"
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Table */}
      <div className="max-w-7xl mx-auto p-6 md:p-12">
        <div className="space-y-4">
          {/* Top 3 Podium */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {sortedData.slice(0, 3).map((user, idx) => (
              <Card key={user.rank} className="relative overflow-hidden">
                <div
                  className={`absolute top-0 left-0 right-0 h-1 ${
                    idx === 0 ? "bg-amber-500" : idx === 1 ? "bg-gray-400" : "bg-orange-600"
                  }`}
                />

                <div className="p-6">
                  {/* Medal */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-4xl">{idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}</div>
                    <span className="text-sm font-bold text-muted-foreground">#{user.rank}</span>
                  </div>

                  {/* User Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-bold">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.followers} followers</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-3 mb-4 py-4 border-y">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Karma</span>
                      <span className="font-bold text-lg">{user.karma.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Posts</span>
                      <span className="font-bold">{user.posts}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Streak</span>
                      <span className="font-bold flex items-center gap-1">
                        <Zap size={16} className="text-amber-500" />
                        {user.streak} days
                      </span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground">Badges</p>
                    <div className="flex flex-wrap gap-2">
                      {user.badges.map((badge) => (
                        <Badge key={badge} className={`${badgeColors[badge].bg} ${badgeColors[badge].text} border-0`}>
                          {badgeColors[badge].icon} {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Full Leaderboard Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="px-6 py-4 text-left text-sm font-semibold">Rank</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">User</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">Karma</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">Posts</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">Answers</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">Followers</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Streak</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((user, idx) => (
                    <tr key={user.rank} className="border-b hover:bg-muted/30 transition-colors last:border-0">
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center">
                          {idx === 0 ? (
                            <Trophy size={20} className="text-amber-500" />
                          ) : (
                            <span className="font-bold text-muted-foreground">#{user.rank}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          </Avatar>
                          <div>
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.followers} followers</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-bold text-lg">{user.karma.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4 text-right font-medium">{user.posts}</td>
                      <td className="px-6 py-4 text-right font-medium">{user.answers}</td>
                      <td className="px-6 py-4 text-right font-medium">{user.followers}</td>
                      <td className="px-6 py-4 text-center">
                        <Badge variant="secondary" className="flex items-center justify-center gap-1 w-fit mx-auto">
                          <Zap size={12} />
                          {user.streak}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Medal size={24} className="text-primary" />
                <h3 className="font-semibold">How Karma Works</h3>
              </div>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>Post published: +10 karma</li>
                <li>Post liked: +5 karma</li>
                <li>Helpful answer: +20 karma</li>
                <li>7-day streak: +50 karma</li>
              </ul>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Award size={24} className="text-primary" />
                <h3 className="font-semibold">Earn Badges</h3>
              </div>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>Expert: 2000+ karma</li>
                <li>Top Contributor: 100+ posts</li>
                <li>Rising Star: 10 posts in 7 days</li>
                <li>Helpful: 50+ answers</li>
              </ul>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp size={24} className="text-primary" />
                <h3 className="font-semibold">Keep Streaking</h3>
              </div>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>Post daily to build streak</li>
                <li>Earn bonus karma per day</li>
                <li>Unlock special badges</li>
                <li>Featured in top contributors</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
