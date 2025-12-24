"use client"

import { useState } from "react"
import { Brain, TrendingUp, BookmarkCheck, Lightbulb, Target, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface InsightRecommendation {
  id: string
  title: string
  description: string
  relevanceScore: number
  reason: string
  author: { name: string; avatar: string }
  readTime: number
}

interface LearningPath {
  id: string
  title: string
  progress: number
  topicsCompleted: number
  topicsTotal: number
  estimatedTimeRemaining: number
  nextLesson: string
}

const recommendations: InsightRecommendation[] = [
  {
    id: "1",
    title: "Advanced React Server Components Pattern",
    description: "Based on your recent posts about React 19, you might like this deep dive into server components.",
    relevanceScore: 98,
    reason: "Similar to your interests in React & AI",
    author: { name: "Sarah Chen", avatar: "/placeholder.svg" },
    readTime: 12,
  },
  {
    id: "2",
    title: "Building Scalable Node.js Microservices",
    description: "Your expertise in backend development makes this advanced guide perfect for you.",
    relevanceScore: 92,
    reason: "Matches your backend expertise",
    author: { name: "Alex Kumar", avatar: "/placeholder.svg" },
    readTime: 15,
  },
  {
    id: "3",
    title: "AI Integration Testing Strategies",
    description: "Combine your AI knowledge with testing best practices in this comprehensive guide.",
    relevanceScore: 87,
    reason: "Bridges your AI and testing interests",
    author: { name: "Lisa Wong", avatar: "/placeholder.svg" },
    readTime: 18,
  },
]

const learningPaths: LearningPath[] = [
  {
    id: "path-1",
    title: "Next.js Mastery",
    progress: 65,
    topicsCompleted: 13,
    topicsTotal: 20,
    estimatedTimeRemaining: 8,
    nextLesson: "Building with Database & ORM",
  },
  {
    id: "path-2",
    title: "Agentic AI Fundamentals",
    progress: 40,
    topicsCompleted: 4,
    topicsTotal: 10,
    estimatedTimeRemaining: 12,
    nextLesson: "Implementing AI Chains",
  },
  {
    id: "path-3",
    title: "TypeScript Advanced Patterns",
    progress: 85,
    topicsCompleted: 17,
    topicsTotal: 20,
    estimatedTimeRemaining: 3,
    nextLesson: "Custom Type Guards",
  },
]

const readingHistory = [
  {
    title: "React 19 Features Overview",
    readDate: "2 hours ago",
    timeSpent: 18,
    highlightCount: 3,
  },
  {
    title: "Docker Best Practices 2024",
    readDate: "1 day ago",
    timeSpent: 24,
    highlightCount: 5,
  },
  {
    title: "TypeScript Generics Deep Dive",
    readDate: "2 days ago",
    timeSpent: 35,
    highlightCount: 8,
  },
]

export default function AIInsightsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-r from-primary/10 to-accent/10 p-6 md:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary/20 rounded-lg">
              <Brain size={32} className="text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black">AI Insights Dashboard</h1>
              <p className="text-muted-foreground mt-1">Personalized learning paths and smart recommendations</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">Reading Level</p>
              <p className="text-2xl font-bold mt-2">Advanced</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">Articles Read</p>
              <p className="text-2xl font-bold mt-2">247</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">Learning Paths</p>
              <p className="text-2xl font-bold mt-2">3</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">Topics Mastered</p>
              <p className="text-2xl font-bold mt-2">34</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 md:p-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="learning">Learning Paths</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Insights */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Lightbulb size={24} className="text-primary" />
                Key Insights
              </h3>

              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-muted/30">
                  <p className="font-semibold mb-2">Your Learning Focus</p>
                  <p className="text-sm text-muted-foreground">
                    You're heavily focused on React and AI integration. We recommend exploring TypeScript patterns to
                    strengthen your type-safety skills.
                  </p>
                </div>

                <div className="p-4 border rounded-lg bg-muted/30">
                  <p className="font-semibold mb-2">Engagement Pattern</p>
                  <p className="text-sm text-muted-foreground">
                    Most active between 7-10 PM. You typically spend 15-20 minutes per article and highlight 2-3
                    sections.
                  </p>
                </div>

                <div className="p-4 border rounded-lg bg-muted/30">
                  <p className="font-semibold mb-2">Knowledge Gaps</p>
                  <p className="text-sm text-muted-foreground">
                    Based on your reads, we suggest focusing on DevOps and system design to complement your AI
                    expertise.
                  </p>
                </div>
              </div>
            </Card>

            {/* Summary Stats */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <TrendingUp size={20} className="text-primary" />
                  This Week's Progress
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Articles Read</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: "75%" }} />
                      </div>
                      <span className="font-bold">15/20</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Learning Hours</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-accent" style={{ width: "60%" }} />
                      </div>
                      <span className="font-bold">6/10</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Topics Explored</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: "40%" }} />
                      </div>
                      <span className="font-bold">4/10</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Target size={20} className="text-primary" />
                  Recommendations
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-lg">▸</span>
                    Take a break after reading 3 articles
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-lg">▸</span>
                    Try a guided learning path for structured growth
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-lg">▸</span>
                    Join study groups on your favorite topics
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-lg">▸</span>
                    Share your notes to reinforce learning
                  </li>
                </ul>
              </Card>
            </div>
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-6">
            <div className="space-y-4">
              {recommendations.map((rec) => (
                <Card key={rec.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className="bg-primary/20 text-primary border-0">{rec.relevanceScore}% relevant</Badge>
                        <span className="text-xs text-muted-foreground">{rec.readTime} min read</span>
                      </div>

                      <h3 className="text-lg font-bold mb-2">{rec.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>

                      <p className="text-xs text-muted-foreground mb-3">
                        Why: <span className="font-medium">{rec.reason}</span>
                      </p>

                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={rec.author.avatar || "/placeholder.svg"} />
                        </Avatar>
                        <span className="text-sm text-muted-foreground">by {rec.author.name}</span>
                      </div>
                    </div>

                    <Button className="gap-2 md:self-start">
                      Read
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Learning Paths Tab */}
          <TabsContent value="learning" className="space-y-6">
            <div className="space-y-4">
              {learningPaths.map((path) => (
                <Card key={path.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{path.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {path.topicsCompleted} of {path.topicsTotal} topics completed
                      </p>
                    </div>
                    <Badge variant="secondary">{path.estimatedTimeRemaining}h left</Badge>
                  </div>

                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-xs text-muted-foreground mb-2">
                        <span>Progress</span>
                        <span>{path.progress}%</span>
                      </div>
                      <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary transition-all" style={{ width: `${path.progress}%` }} />
                      </div>
                    </div>

                    {/* Next Lesson */}
                    <div className="p-4 rounded-lg border bg-muted/30">
                      <p className="text-xs text-muted-foreground mb-1">Next Lesson</p>
                      <p className="font-semibold">{path.nextLesson}</p>
                    </div>

                    <Button variant="outline" className="w-full bg-transparent">
                      Continue Learning
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-4">
            {readingHistory.map((item, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <div className="flex gap-6 text-sm text-muted-foreground">
                      <span>{item.readDate}</span>
                      <span>{item.timeSpent} min read</span>
                      <span>{item.highlightCount} highlights</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <BookmarkCheck size={16} />
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
