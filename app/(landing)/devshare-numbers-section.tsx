"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Activity, Users, Zap, TrendingUp } from "lucide-react"

type HeatmapDay = {
  date: Date
  count: number
}

const ContributionHeatmap = () => {
  const [selectedYear, setSelectedYear] = useState(2025)
  const years = [2026, 2025, 2024, 2023]

  // Tạo dữ liệu giả lập cho 364 ngày
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
    <div className="flex flex-col lg:flex-row gap-8 ml-0 md:ml-12 overflow-hidden">
      {/* LEFT: Heatmap Section */}
      <div className="flex-1 min-w-0">
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {/* Day labels */}
          <div className="flex flex-col gap-1 justify-start pt-8">
            {dayLabels.map((day) => (
              <div key={day} className="h-[12px] text-[10px] dark:text-white text-muted-foreground w-7 flex items-center">
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
                  <div key={`month-${weekIdx}`} className="w-[12px] h-5 text-[10px] dark:text-white text-muted-foreground flex items-center justify-center">
                    {isMonthStart ? monthLabels[date.getMonth()] : ""}
                  </div>
                )
              })}
            </div>

            {/* Cells with Snake Animation */}
            <div className="flex gap-1">
              {weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-1">
                  {week.map((day, dayIdx) => {
                    // Thuật toán đường đi con rắn (Zic-zac)
                    // Cột chẵn (0, 2, 4...): chạy từ trên xuống (0 -> 6)
                    // Cột lẻ (1, 3, 5...): chạy từ dưới lên (6 -> 0)
                    const snakeOrder = weekIdx % 2 === 0 
                      ? (weekIdx * 7 + dayIdx) 
                      : (weekIdx * 7 + (6 - dayIdx));

                    return (
                      <motion.div
                        key={`${weekIdx}-${dayIdx}`}
                        initial={{ 
                          opacity: 0, 
                          backgroundColor: "rgb(79 70 229)", // Màu "đầu rắn" rực rỡ
                          scale: 0.3 
                        }}
                        whileInView={{ 
                          opacity: 1, 
                          backgroundColor: "rgba(79, 70, 229, 0)", // Mờ dần về trong suốt để hiện màu thực
                          scale: 1,
                          transition: { 
                            delay: snakeOrder * 0.006, // Tốc độ rắn bò
                            duration: 0.4,
                            ease: "easeOut"
                          } 
                        }}
                        viewport={{ once: true }}
                        className="group relative"
                      >
                        <div className={`w-[12px] h-[12px] rounded-[2px] transition-all hover:ring-2 ring-primary/50 cursor-pointer ${getColor(day.count)}`} />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block px-2 py-1 bg-foreground text-background text-[10px] rounded whitespace-nowrap z-50 shadow-xl">
                          {day.count} contributions on {day.date.toLocaleDateString()}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 mt-4 text-[12px] pl-9">
          <span className="text-muted-foreground font-mono">Less</span>
          {[0, 2, 4, 6, 8, 10].map((i) => (
            <div key={i} className={`w-[11px] h-[11px] rounded-[2px] ${getColor(i)}`} />
          ))}
          <span className="text-muted-foreground font-mono">More</span>
        </div>
      </div>

      {/* RIGHT: Year Selector Section */}
      <div className="flex lg:flex-col flex-wrap gap-2 lg:border-l lg:pl-6 min-w-[100px]">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-4 py-2 rounded-md text-sm font-mono font-medium transition-all text-left ${
              selectedYear === year
                ? "bg-indigo-600 text-white shadow-lg scale-105"
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

export function DevShareNumbersSection() {
  const stats = [
    { label: "Active Posts", value: 12847, icon: Activity, suffix: "+" },
    { label: "Community Members", value: 8956, icon: Users, suffix: "+" },
    { label: "AI Agents Running", value: 145, icon: Zap, suffix: "" },
    { label: "Monthly Growth", value: 32, icon: TrendingUp, suffix: "%" },
  ]

  return (
    <section id="contributions" className="py-24 space-y-16 max-w-7xl mx-auto px-4 overflow-hidden">
      {/* Section Header */}
      <div className="text-center space-y-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-4xl font-bold sm:text-5xl tracking-tight"
        >
          DevShare in Numbers
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Real-time metrics showcasing our thriving community and ecosystem activity
        </motion.p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group rounded-3xl hover:scale-105 border bg-card/40 backdrop-blur-md p-7 space-y-4 shadow-sm hover:shadow-indigo-500/10 hover:border-indigo-500/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </p>
                  <div className="text-3xl font-bold tracking-tighter">
                    {stat.value.toLocaleString()}
                    <span className="text-indigo-500">{stat.suffix}</span>
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Main Heatmap Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Card className="rounded-[2.5rem] border p-6 md:p-10 bg-card/30 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          {/* Animated Glow effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] -z-10" />
          
          <h3 className="font-mono text-xl font-semibold mb-10 flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            Global Network Activity
          </h3>
          
          <ContributionHeatmap />
        </Card>
      </motion.div>
    </section>
  )
}