"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Activity, Users, Zap, TrendingUp } from "lucide-react"

const CounterNumber = ({
  value,
  duration = 2,
}: {
  value: number
  duration?: number
}) => {
  return (
    <div className="h-[48px] md:h-[60px] overflow-hidden flex items-start">
      <motion.div
        initial={{ y: 0 }}
        whileInView={{
          y: -value * 10, // Giả lập cuộn số
          transition: { duration, ease: "easeOut" },
        }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold tabular-nums leading-none"
      >
        {Array.from({ length: 100 }, (_, i) => (
          <div key={i}>{i}</div>
        ))}
      </motion.div>
    </div>
  )
}

type HeatmapDay = {
  date: Date
  count: number
}

const ContributionHeatmap = () => {
  const [selectedYear, setSelectedYear] = useState(2025)
  const years = [2026, 2025, 2024, 2023]

  // Generate 364 days of mock data (approx 52 weeks)
  const generateHeatmapData = (): HeatmapDay[] => {
    const data: HeatmapDay[] = []
    const today = new Date()

    for (let i = 364; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)

      data.push({
        date,
        count: Math.floor(Math.random() * 11),
      })
    }
    return data
  }

  const heatmapData = generateHeatmapData()
  const weeks = Array.from({ length: 52 }, (_, i) =>
    heatmapData.slice(i * 7, (i + 1) * 7)
  )

  const getColor = (count: number) => {
    if (count === 0) return "bg-muted/20"
    if (count <= 2) return "bg-indigo-200 dark:bg-indigo-900/40"
    if (count <= 4) return "bg-indigo-400 dark:bg-indigo-700/60"
    if (count <= 6) return "bg-indigo-600 dark:bg-indigo-600/80"
    if (count <= 8) return "bg-indigo-700 dark:bg-indigo-500"
    return "bg-indigo-900 dark:bg-indigo-400"
  }

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  return (
    <div className="flex flex-col lg:flex-row gap-15 ml-15">
      {/* LEFT: Heatmap Section */}
      <div className="flex-1 min-w-0">
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {/* Day labels */}
          <div className="flex flex-col gap-1 justify-start pt-8">
            {dayLabels.map((day) => (
              <div key={day} className="h-[12px] text-[15px] text-muted-foreground w-7 flex items-center">
                {day}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            {/* Month labels */}
            <div className="flex gap-1">
              {weeks.map((_, weekIdx) => {
                const { date } = heatmapData[weekIdx * 7]
                const isMonthStart = date.getDate() <= 7 && weekIdx > 0
                return (
                  <div key={`month-${weekIdx}`} className="w-[12px] h-5 text-[15px] text-muted-foreground flex items-center justify-center">
                    {isMonthStart ? monthLabels[date.getMonth()] : ""}
                  </div>
                )
              })}
            </div>

            {/* Cells */}
            <div className="flex gap-1">
              {weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-1">
                  {week.map((day, dayIdx) => (
                    <motion.div
                      key={`${weekIdx}-${dayIdx}`}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (weekIdx * 7 + dayIdx) * 0.002, duration: 0.2 }}
                      className="group relative"
                    >
                      <div className={`w-[12px] h-[12px] rounded-[2px] transition-all hover:ring-2 ring-primary/50 cursor-pointer ${getColor(day.count)}`} />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block px-2 py-1 bg-foreground text-background text-[10px] rounded whitespace-nowrap z-10">
                        {day.count} contributions on {day.date.toLocaleDateString()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend: Right under the heatmap */}
        <div className="flex items-center justify-end gap-2 mt-4 text-[14px] pl-9">
          <span className="text-muted-foreground">Less</span>
          {[0, 2, 4, 6, 8, 10].map((i) => (
            <div key={i} className={`w-[11px] h-[11px] rounded-[2px] ${getColor(i)}`} />
          ))}
          <span className="text-muted-foreground">More</span>
        </div>
      </div>

      {/* RIGHT: Year Selector Section */}
      <div className="flex lg:flex-col flex-wrap gap-2 lg:border-l lg:pl-6 min-w-[100px]">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all text-left ${
              selectedYear === year
                ? "bg-indigo-600 text-white shadow-md"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  )
}

const ContributionHeatmap = () => {
  // Generate 365 days of mock data
  const generateHeatmapData = () => {
    const data: { date: Date; count: number }[] = []
    const today = new Date()
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      data.push({
        date,
        count: Math.floor(Math.random() * 11), // 0-10 contributions
      })
    }
    return data
  }

  const heatmapData = generateHeatmapData()
  const weeks = Array.from({ length: 52 }, (_, i) => heatmapData.slice(i * 7, (i + 1) * 7))

  // Get color based on contribution intensity
  const getColor = (count: number) => {
    if (count === 0) return "bg-muted/20"
    if (count <= 2) return "bg-indigo-200 dark:bg-indigo-900/40"
    if (count <= 4) return "bg-indigo-400 dark:bg-indigo-700/60"
    if (count <= 6) return "bg-indigo-600 dark:bg-indigo-600/80"
    if (count <= 8) return "bg-indigo-700 dark:bg-indigo-500"
    return "bg-indigo-900 dark:bg-indigo-400"
  }

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  return (
    <div className="space-y-6">
      {/* Heatmap Grid */}
      <div className="flex gap-2">
        {/* Day labels */}
        <div className="flex flex-col gap-1 justify-start pt-6">
          {dayLabels.map((day, idx) => (
            <div key={idx} className="h-[12px] text-xs text-muted-foreground w-6 flex items-center">
              {day}
            </div>
          ))}
        </div>

        {/* Weeks grid */}
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-1">
            {/* Month labels row */}
            <div className="flex gap-1 mb-2">
              {weeks.map((_, weekIdx) => {
                const firstDate = heatmapData[weekIdx * 7]
                const isMonthStart = firstDate.getDate() <= 7 && weekIdx > 0
                return (
                  <div
                    key={`month-${weekIdx}`}
                    className="w-[12px] h-5 text-xs text-muted-foreground flex items-center justify-center"
                  >
                    {isMonthStart ? monthLabels[firstDate.getMonth()] : ""}
                  </div>
                )
              })}
            </div>

            {/* Heatmap cells */}
            <div className="flex gap-1">
              {weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-1">
                  {week.map((day, dayIdx) => (
                    <motion.div
                      key={`${weekIdx}-${dayIdx}`}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: (weekIdx * 7 + dayIdx) * 0.01,
                        duration: 0.3,
                      }}
                      className="group relative"
                    >
                      <div
                        className={`w-[12px] h-[12px] rounded-sm transition-all hover:ring-2 ring-primary/50 cursor-pointer ${getColor(day.count)}`}
                      />
                      {/* Tooltip */}
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-foreground text-background text-xs rounded whitespace-nowrap pointer-events-none z-10 group-hover:block hidden"
                      >
                        {day.count} contributions on {day.date.toLocaleDateString()}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-2 text-xs">
        <span className="text-muted-foreground">Less</span>
        {[0, 2, 4, 6, 8, 10].map((intensity) => (
          <div key={intensity} className={`w-3 h-3 rounded-sm ${getColor(intensity)}`} />
        ))}
        <span className="text-muted-foreground">More</span>
      </div>
    </div>
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
    <section className="container py-20 md:py-32 space-y-12 max-w-7xl mx-auto px-4">
      <div className="text-center space-y-4">
        <h2 className="font-mono text-3xl font-bold sm:text-4xl md:text-5xl">
          DevShare in Numbers
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Real-time metrics showcasing our thriving community
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-2xl border bg-card/50 backdrop-blur p-6 space-y-4 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {stat.label}
                  </p>
                  <div className="text-3xl font-bold">
                    {stat.value.toLocaleString()}
                    <span className="text-indigo-600">{stat.suffix}</span>
                  </div>
                </div>
                <Icon className="w-6 h-6 text-indigo-600/50" />
              </div>
            </motion.div>
          )
        })}
      </div>

<<<<<<< HEAD
      <Card className="rounded-2xl border p-8 bg-card/50 backdrop-blur shadow-sm">
        <h3 className="font-mono text-xl font-semibold mb-8">
          Global Contributions
        </h3>
=======
      <Card className="rounded-2xl border-2 border-primary/20 p-6 bg-card/50 backdrop-blur max-w-6xl mx-auto">
        <h3 className="font-mono text-lg font-semibold mb-6">Global Contributions</h3>
>>>>>>> 77e8011b079c598a43d6343e7de0df80116b7430
        <ContributionHeatmap />
      </Card>
    </section>
  )
}