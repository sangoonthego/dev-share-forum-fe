"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Generate mock activity data (0-4 contributions per day)
const generateMockData = () => {
  const data = []
  const today = new Date()
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toISOString().split("T")[0],
      count: Math.floor(Math.random() * 5),
    })
  }
  return data
}

export function ActivityHeatmap() {
  const data = generateMockData()
  const weeks = []

  // Group by weeks
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7))
  }

  const getColor = (count: number) => {
    if (count === 0) return "bg-muted"
    if (count === 1) return "bg-primary/20"
    if (count === 2) return "bg-primary/40"
    if (count === 3) return "bg-primary/60"
    return "bg-primary"
  }

  return (
    <Card className="p-6 space-y-4">
      <h2 className="font-semibold">Activity</h2>
      <div className="overflow-x-auto">
        <div className="inline-flex gap-1 min-w-max">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={cn(
                    "h-3 w-3 rounded-sm transition-colors hover:ring-2 hover:ring-primary/50 cursor-pointer",
                    getColor(day.count),
                  )}
                  title={`${day.date}: ${day.count} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((level) => (
            <div key={level} className={cn("h-3 w-3 rounded-sm", getColor(level))} />
          ))}
        </div>
        <span>More</span>
      </div>
    </Card>
  )
}
