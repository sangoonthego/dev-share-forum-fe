"use client"

import React, { useCallback, useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { 
  Code2, MessageSquare, Sparkles, Shield, Zap, Users, 
  Terminal, Globe, Cpu, Database, Layout, Search,
  ChevronLeft, ChevronRight 
} from "lucide-react"
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from "framer-motion"

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
  {
    icon: Terminal,
    title: "CLI Integration",
    description: "Powerful command-line tools to sync your snippets and manage discussions.",
  },
  {
    icon: Globe,
    title: "Global Edge SDK",
    description: "Deploy and access your technical assets from anywhere with 0ms latency.",
  },
  {
    icon: Cpu,
    title: "Compiler API",
    description: "Run and test code snippets directly in the browser across 20+ environments.",
  },
  {
    icon: Database,
    title: "Real-time Sync",
    description: "Collaborative editing and instant state synchronization for remote teams.",
  },
  {
    icon: Layout,
    title: "Custom Dashboard",
    description: "Personalized workspace to track your contributions and code analytics.",
  },
  {
    icon: Search,
    title: "Semantic Search",
    description: "Find code solutions using natural language queries powered by vector embeddings.",
  },
]

export function FeatureCards() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    loop: true,
    skipSnaps: false
  })

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const groupedFeatures = [];
  for (let i = 0; i < features.length; i += 6) {
    groupedFeatures.push(features.slice(i, i + 6));
  }

  return (
    <div className="relative max-w-7xl mx-auto group px-4">
      {/* Nút Điều Hướng Trái */}
      <div className="absolute left-[-30px] top-1/2 -translate-y-1/2 z-30 hidden md:block">
        <button
          onClick={scrollPrev}
          className="h-12 w-12 flex items-center justify-center rounded-full border dark:text-white border-white/10 backdrop-blur-xl text-black hover:bg-primary hover:text-white hover:border-primary transition-all shadow-[0_0_20px_rgba(0,0,0,0.4)] active:scale-90 group-hover:opacity-100 opacity-0"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>

      {/* Viewport chính của Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {groupedFeatures.map((group, groupIndex) => (
            <div 
              key={groupIndex} 
              className="flex-[0_0_100%] min-w-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4"
            >
              {group.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card
                      className="group/card hover:scale-105 relative h-full overflow-hidden border-2 p-7 transition-all hover:border-primary/50 hover:shadow-[0_0_30px_rgba(79,70,229,0.15)] active:scale-[0.98]"
                      style={{
                        background: "rgba(255, 255, 255, 0.02)",
                        backdropFilter: "blur(16px)",
                        borderColor: "rgba(255, 255, 255, 0.05)",
                      }}
                    >
                      <div className="space-y-5">
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all group-hover/card:bg-primary group-hover/card:text-white group-hover/card:rotate-[10deg]">
                          <Icon className="h-7 w-7" />
                        </div>
                        <div className="space-y-3">
                          <h3 className="font-mono text-xl font-bold tracking-tight text-black dark:text-white">
                            {feature.title}
                          </h3>
                          <p className="text-sm text-gray-400 leading-relaxed group-hover/card:text-gray-300">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-500 group-hover/card:w-full" />
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Nút Điều Hướng Phải */}
      <div className="absolute right-[-30px] top-1/2 -translate-y-1/2 z-30 hidden md:block">
        <button
          onClick={scrollNext}
          className="h-12 w-12 flex items-center justify-center rounded-full dark:text-white border border-white/10 backdrop-blur-xl text-black hover:bg-primary hover:text-white hover:border-primary transition-all shadow-[0_0_20px_rgba(0,0,0,0.4)] active:scale-90 group-hover:opacity-100 opacity-0"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Pagination indicators - ĐÃ CẬP NHẬT LOGIC TẠI ĐÂY */}
      <div className="flex justify-center gap-2 mt-8">
        {groupedFeatures.map((_, i) => (
          <div 
            key={i} 
            className="h-1 w-8 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden cursor-pointer"
            onClick={() => emblaApi?.scrollTo(i)}
          >
             <motion.div 
               className="h-full bg-primary"
               initial={false}
               animate={{ 
                 x: selectedIndex === i ? "0%" : "-100%" 
               }}
               transition={{ duration: 0.5, ease: "easeInOut" }}
             />
          </div>
        ))}
      </div>
    </div>
  )
}