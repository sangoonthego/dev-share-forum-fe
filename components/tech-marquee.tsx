"use client"

import { Code2, Database, Sparkles, Zap, Shield, Globe } from "lucide-react"

const technologies = [
  { icon: Code2, name: "React" },
  { icon: Zap, name: "Next.js" },
  { icon: Database, name: "TypeScript" },
  { icon: Sparkles, name: "AI SDK" },
  { icon: Shield, name: "Vercel" },
  { icon: Globe, name: "Tailwind" },
]

export function TechMarquee() {
  return (
    <div className="relative overflow-hidden">
      <div className="flex animate-marquee gap-8">
        {[...technologies, ...technologies].map((tech, index) => {
          const Icon = tech.icon
          return (
            <div key={index} className="flex items-center gap-2 rounded-lg border bg-card px-4 py-2 whitespace-nowrap">
              <Icon className="h-4 w-4 text-primary" />
              <span className="font-mono text-sm font-medium">{tech.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
