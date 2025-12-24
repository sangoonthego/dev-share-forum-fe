"use client"

import { motion } from "framer-motion"

const MarqueeCard = ({ post }: { post: any }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="group relative flex-shrink-0 w-96 rounded-xl border bg-card/60 backdrop-blur p-4 transition-all hover:shadow-2xl hover:border-primary/50"
  >
    <div className="flex items-start gap-3">
      <div className="h-10 w-10 rounded-full bg-primary/20 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate">{post.title}</p>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{post.code}</p>
      </div>
    </div>
  </motion.div>
)

const TechBadge = ({ tech, glow }: { tech: string; glow: boolean }) => (
  <motion.div
    whileHover={{ scale: 1.1 }}
    className={`flex-shrink-0 rounded-lg border bg-card/40 backdrop-blur px-4 py-2 transition-all ${
      glow ? "shadow-lg shadow-primary/40 border-primary/50" : "border-border"
    }`}
  >
    <span className="text-sm font-mono font-semibold">{tech}</span>
  </motion.div>
)

export function CommunityPulseSection() {
  const posts = [
    { id: 1, title: "React Optimization Tips", code: "const optimized = useMemo(...)" },
    { id: 2, title: "Next.js 15 Features", code: "import { experimental } from 'next'" },
    { id: 3, title: "TypeScript Best Practices", code: "type SafeData = NonNullable<T>" },
    { id: 4, title: "AI Integration Patterns", code: "const response = await ai.generate()" },
  ]

  const techs = ["React", "Next.js", "Rust", "AI Agents", "TypeScript", "Vercel"]

  return (
    <section id="pulse" className="container py-20 md:py-32 space-y-12 overflow-hidden">
      <div className="text-center space-y-4">
        <h2 className="font-mono text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Community Pulse</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Real-time activities from thousands of developers collaborating and sharing knowledge
        </p>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
        <motion.div
          className="flex gap-4 w-fit"
          animate={{ x: [0, -2000] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          {[...posts, ...posts].map((post, idx) => (
            <MarqueeCard key={idx} post={post} />
          ))}
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
        <motion.div
          className="flex gap-4 w-fit"
          animate={{ x: [-2000, 0] }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          {[...techs, ...techs].map((tech, idx) => (
            <TechBadge key={idx} tech={tech} glow={idx % 2 === 0} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
