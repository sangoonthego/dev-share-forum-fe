"use client"

import { Card } from "@/components/ui/card"
import { Code2, MessageSquare, Sparkles, Shield, Zap, Users } from "lucide-react"

const features = [
  {
    icon: Code2,
    title: "Syntax Highlighting",
    description: "Beautiful code blocks with support for 100+ programming languages and custom themes.",
  },
  {
    icon: MessageSquare,
    title: "Threaded Discussions",
    description: "Engage in meaningful conversations with nested comments and real-time updates.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    description: "Get intelligent suggestions for code improvements and SEO optimization.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your code and data are protected with enterprise-grade security.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance with instant page loads and smooth interactions.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Connect with developers worldwide and build your professional network.",
  },
]

export function FeatureCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => {
        const Icon = feature.icon
        return (
          <Card
            key={index}
            className="group relative overflow-hidden border-2 bg-card/50 backdrop-blur p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 active:scale-[0.98]"
            style={{
              background: "var(--glass-bg)",
              borderColor: "var(--glass-border)",
            }}
          >
            <div className="space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-110">
                <Icon className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
