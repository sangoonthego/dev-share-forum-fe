"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, ArrowRight, BrainCircuit, Zap, Eye } from "lucide-react"
import { useState, useEffect } from "react"

export function ExperienceAgentSection() {
  const [status, setStatus] = useState<"idle" | "typing" | "analyzing" | "fixed">("idle")
  const [codeOutput, setCodeOutput] = useState("")
  const [logs, setLogs] = useState<string[]>([])

  const rawCode = `const fetchData = async (url) => {
  const response = await fetch(url);
  const data = response.json();
  return data;
}`

  const fixedCode = `const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json(); // Fixed: Added await
  return data;
}`

  const startDemo = async () => {
    // 1. Reset & Typing
    setStatus("typing")
    setCodeOutput("")
    setLogs(["Initializing Agent...", "Reading code.ts..."])
    
    let index = 0
    const typingInterval = setInterval(() => {
      if (index < rawCode.length) {
        setCodeOutput((prev) => prev + rawCode[index])
        index++
      } else {
        clearInterval(typingInterval)
        // 2. Analyzing
        setTimeout(() => startAnalysis(), 500)
      }
    }, 25)
  }

  const startAnalysis = () => {
    setStatus("analyzing")
    setLogs((prev) => [...prev, "Analyzing call stack...", "Identifying memory patterns..."])
    
    setTimeout(() => {
       setLogs((prev) => [...prev, "⚠️ Error: Floating Promise detected"])
    }, 1000)
  }

  const applyFix = () => {
    setStatus("fixed")
    setCodeOutput(fixedCode)
    setLogs((prev) => [...prev, "✅ Fix applied: Await added to json()"])
  }

  return (
    <section id="agents" className="relative container py-24 md:py-32 overflow-hidden">
      {/* Background Decor - Những đốm sáng mờ ảo */}
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
        <div className="absolute w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] top-0 left-0" />
        <div className="absolute w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] bottom-0 right-0" />
      </div> */}

      <div className="text-center space-y-4 mb-16">
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono mb-4"
        >
          <BrainCircuit className="w-3 h-3" /> AI AGENT LIVE DEMO
        </motion.div>
        <h2 className="font-mono text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Don&apos;t just code. <span className="text-primary">Collaborate.</span>
        </h2>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* LEFT: AI Thinking Logs (Unique Idea 3) */}
        <div className="lg:col-span-1 space-y-3 order-2 lg:order-1">
            <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2">Agent Logs</h4>
            <div className="space-y-2">
                <AnimatePresence>
                    {logs.map((log, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`p-2 rounded border text-[10px] font-mono ${
                                log.includes('⚠️') ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' :
                                log.includes('✅') ? 'bg-green-500/10 border-green-500/20 text-green-500' :
                                'bg-muted/30 border-white/5 text-muted-foreground'
                            }`}
                        >
                            {log}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>

        {/* CENTER: The IDE (Unique Idea 1 & 2) */}
        <div className="lg:col-span-3 relative order-1 lg:order-2">
          {/* Sóng não AI chạy quanh viền khi Analyzing */}
          {status === "analyzing" && (
            <motion.div
              layoutId="border-glow"
              className="absolute -inset-[2px] rounded-2xl z-0 bg-gradient-to-r from-primary via-accent to-primary"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            />
          )}

          <Card className="relative z-10 overflow-hidden border-2 border-white/5 bg-[#0d1117]/80 backdrop-blur-xl shadow-2xl">
            <div className="bg-muted/20 border-b border-white/5 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-[10px] font-mono text-muted-foreground tracking-widest ml-4 uppercase flex items-center gap-2">
                <Zap className="w-3 h-3 text-yellow-500" /> Neural Analyzer
              </span>
            </div>

            <div className="p-8 font-mono text-base min-h-[300px] relative">
              {/* Scanline effect khi analyzing */}
              {status === "analyzing" && (
                <motion.div 
                    initial={{ top: 0 }}
                    animate={{ top: "100%" }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 w-full h-1 bg-primary/40 blur-sm z-20"
                />
              )}

              <pre className="text-slate-300 whitespace-pre-wrap">
                <code>{codeOutput}</code>
                {status === "typing" && <motion.span animate={{ opacity: [0, 1] }} transition={{ repeat: Infinity }} className="text-primary">_</motion.span>}
              </pre>

              {/* Suggestions Overlay */}
              <AnimatePresence>
                {status === "analyzing" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute top-1/2 right-8 -translate-y-1/2 w-64 p-5 rounded-xl border border-primary/30 bg-black/60 backdrop-blur-md shadow-2xl z-30"
                  >
                    <div className="flex items-center gap-2 text-primary font-bold mb-2">
                      <Sparkles className="w-4 h-4" /> Logic Gap
                    </div>
                    <p className="text-[11px] text-slate-400 mb-4">
                      The <code className="text-yellow-500">json()</code> method is asynchronous. Omitting <code className="text-primary">await</code> returns a Promise, not the data.
                    </p>
                    <Button onClick={applyFix} size="sm" className="w-full bg-primary hover:bg-primary/90 text-white font-bold group">
                      Fix Instantly <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center gap-4">
        <Button 
          disabled={status === "typing" || status === "analyzing"}
          onClick={startDemo} 
          size="lg" 
          className="rounded-full px-12 py-7 text-lg font-bold shadow-[0_0_40px_rgba(var(--primary-rgb),0.3)] transition-all hover:shadow-[0_0_60px_rgba(var(--primary-rgb),0.5)]"
        >
          {status === "fixed" ? "Restart Experience" : "Wake Up the Agent"}
        </Button>
        <p className="text-xs text-muted-foreground font-mono italic">Experience 0.1s latency neural fixing</p>
      </div>
    </section>
  )
}