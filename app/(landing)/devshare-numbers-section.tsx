"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Activity, Users, Zap, TrendingUp } from "lucide-react"

const CounterNumber = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      whileInView={{
        y: -value,
        transition: { duration, ease: "easeOut" },
      }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold tabular-nums"
    >
      {Array.from({ length: Math.max(value + 1, 10) }, (_, i) => (
        <div key={i}>{i}</div>
      ))}
    </motion.div>
  )
}

export function DevShareNumbersSection() {
  const stats = [
    { label: "Active Posts", value: 12847, icon: Activity, suffix: "+" },
    { label: "Community Members", value: 8956, icon: Users, suffix: "+" },
    { label: "AI Agents Running", value: 145, icon: Zap, suffix: "" },
    { label: "Monthly Growth", value: 32, icon: TrendingUp, suffix: "%" },
  ]

  return (
    <section className="container py-20 md:py-32 space-y-12 relative">
      <div
        className="absolute inset-0 -z-10 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 24%, rgba(255, 0, 0, .05) 25%, rgba(255, 0, 0, .05) 26%, transparent 27%, transparent 74%, rgba(255, 0, 0, .05) 75%, rgba(255, 0, 0, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 0, 0, .05) 25%, rgba(255, 0, 0, .05) 26%, transparent 27%, transparent 74%, rgba(255, 0, 0, .05) 75%, rgba(255, 0, 0, .05) 76%, transparent 77%, transparent)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="text-center space-y-4">
        <h2 className="font-mono text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">DevShare in Numbers</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Real-time metrics showcasing our thriving community
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {stats.slice(0, 2).map((stat, idx) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="lg:col-span-2 rounded-2xl border bg-card/50 backdrop-blur p-6 md:p-8 space-y-4 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                  <div className="text-4xl md:text-5xl font-bold tabular-nums">
                    {stat.value.toLocaleString()}
                    <span className="text-primary">{stat.suffix}</span>
                  </div>
                </div>
                <Icon className="w-8 h-8 text-primary/50" />
              </div>
            </motion.div>
          )
        })}
        {stats.slice(2).map((stat, idx) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={idx + 2}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx + 2) * 0.1 }}
              className="rounded-2xl border bg-card/50 backdrop-blur p-6 space-y-4 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                  <div className="text-3xl font-bold">
                    {stat.value}
                    <span className="text-primary text-lg">{stat.suffix}</span>
                  </div>
                </div>
                <Icon className="w-6 h-6 text-primary/50" />
              </div>
            </motion.div>
          )
        })}
      </div>

      <Card className="rounded-2xl border-2 border-primary/20 p-6 bg-card/50 backdrop-blur max-w-6xl mx-auto">
        <h3 className="font-mono text-lg font-semibold mb-4">Global Contributions</h3>
        <div className="h-32 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground text-sm">Interactive contribution heatmap</p>
        </div>
      </Card>
    </section>
  )
}
