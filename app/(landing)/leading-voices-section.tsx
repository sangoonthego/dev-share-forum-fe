"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { useEffect, useRef, useState } from "react"
import { useTypingText } from "@/hooks/use-typing-text"

export function LeadingVoicesSection() {
  const ref = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100])

  const specialist = [
    "LLM Expert",
    "GenAI Engineer",
    "Lead of Agent"
  ]

  const specialist1 = [
    "AI Engineer",
    "DX Speaker",
    "Cutting-Edge Thinker"
  ]

  const sections = [
    "Transformer Architecture",
    "Attention Is All You Need",
    "Practice Makes Perfect"
  ]

  const [titleIndex, setTitleIndex] = useState(0)

  const typing = useTypingText({
    text: specialist[titleIndex],
    speed: 60,
  })

  const typing1 = useTypingText({
    text: specialist1[titleIndex],
    speed: 60,
  })

  useEffect(() => {
    if (!typing.isDone) return

    const timer = setTimeout(() => {
      setTitleIndex((prev) => (prev + 1) % specialist.length)
    }, 1500)

    return () => clearTimeout(timer)
  }, [typing.isDone, specialist.length])

  const experts = [
    {
      name: "Logan Matthew",
      title: typing1.displayText,
      karma: 2847,
      badges: ["Top Speaker", "AI Master"],
      posts: 156,
      image: "/indi/me.jpg",
    },
    {
      name: "Tuan Ngoc",
      title: typing.displayText,
      karma: 2654,
      badges: ["Top Contributor", "Code Master"],
      posts: 203,
      image: "/indi/ntn.jpg",
    },
  ]

  return (
    <section
      id="experts"
      ref={ref}
      className="container py-20 md:py-32 space-y-12"
    >
      {/* === HEADER (GIỮ NGUYÊN) === */}
      <div className="text-center space-y-4">
        <h2 className="font-mono text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Leading Voices
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Meet the experts shaping our community
        </p>
      </div>

      {/* === CARDS (GIỮ NGUYÊN) === */}
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {experts.map((expert, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{
              delay: idx * 0.2,
              duration: 2,
              ease: "easeOut",
            }}
            className="grid md:grid-cols-2 gap-6 items-center"
          >
            {/* IMAGE */}
            <div className="relative h-96 group">
              <div className="absolute inset-0 rounded-2xl blur-2xl" />
              <motion.div
                style={{ y: imageY }}
                className="relative h-full rounded-2xl overflow-hidden border-2 border-primary/30"
              >
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </motion.div>
            </div>

            {/* CONTENT */}
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold">{expert.name}</h3>
                <p className="text-lg text-muted-foreground">
                  {expert.title}
                  {expert.name && (
                    <span className="animate-pulse">|</span>
                  )}
                </p>
              </div>

              {/* POSTS */}
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Featured Posts
                </p>
                <div className="flex gap-2 flex-wrap">
                  {sections.map((section, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="text-xs"
                    >
                      Post {i + 1}: {section}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-3 items-start gap-2 p-4 rounded-lg bg-card/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {expert.posts}
                  </div>
                  <p className="text-xs text-muted-foreground">Posts</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">
                    {expert.karma}
                  </div>
                  <p className="text-xs text-muted-foreground">Karma</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    ★★★★★
                  </div>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
              </div>

              {/* BADGES */}
              <div className="flex gap-2 flex-wrap">
                {expert.badges.map((badge, i) => (
                  <Badge
                    key={i}
                    className="bg-primary/10 text-primary"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
