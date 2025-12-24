"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, ArrowRight } from "lucide-react"
import { useState } from "react"

export function ExperienceAgentSection() {
  const [isTyping, setIsTyping] = useState(false)
  const [codeOutput, setCodeOutput] = useState("")
  const [showSuggestion, setShowSuggestion] = useState(false)

  const startDemo = () => {
    setIsTyping(true)
    setCodeOutput("")
    setShowSuggestion(false)

    const code = `const fetchData = async (url) => {
  const response = await fetch(url);
  const data = response.json();
  return data;
}`

    let index = 0
    const interval = setInterval(() => {
      if (index < code.length) {
        setCodeOutput((prev) => prev + code[index])
        index++
      } else {
        clearInterval(interval)
        setIsTyping(false)
        setTimeout(() => setShowSuggestion(true), 500)
      }
    }, 20)
  }

  return (
    <section className="container py-20 md:py-32 space-y-12">
      <div className="text-center space-y-4">
        <h2 className="font-mono text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Experience the Agent</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Watch our AI agent instantly analyze, suggest, and improve your code
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="overflow-hidden border-2 border-primary/20 bg-card/30 backdrop-blur">
          <div className="bg-muted/50 border-b px-4 py-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-auto text-xs text-muted-foreground">code.ts</span>
          </div>

          <div className="p-6 font-mono text-sm min-h-64 space-y-4">
            <pre className="text-primary whitespace-pre-wrap break-words">
              <code>{codeOutput}</code>
              {isTyping && (
                <motion.span
                  animate={{ opacity: [0, 1] }}
                  transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
                >
                  |
                </motion.span>
              )}
            </pre>

            {showSuggestion && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg border-l-4 border-primary bg-primary/5 space-y-2"
              >
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <Sparkles className="w-4 h-4" />
                  Memory Leak Detected
                </div>
                <p className="text-xs text-muted-foreground">
                  Missing await on response.json() - this causes a memory leak when fetching large datasets.
                </p>
                <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                  Apply Fix <ArrowRight className="ml-1 w-3 h-3" />
                </Button>
              </motion.div>
            )}
          </div>
        </Card>

        <div className="flex justify-center">
          <motion.button
            onClick={startDemo}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold overflow-hidden"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                backgroundSize: "200% 200%",
                borderRadius: "inherit",
              }}
            />
            <span className="relative flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              {showSuggestion ? "Try Again with AI" : "Try Now with AI"}
            </span>
          </motion.button>
        </div>
      </div>
    </section>
  )
}
