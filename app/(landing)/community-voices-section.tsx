"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

interface CommunityVoice {
  id: string
  name: string
  role: string
  company: string
  avatar: string
  content: string
  platform: "X" | "GitHub"
  verified: boolean
  height: "sm" | "md" | "lg"
}

const communityVoices: CommunityVoice[] = [
  {
    id: "1",
    name: "Yann LeCun",
    role: "Chief AI Scientist",
    company: "Meta",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    content: "Finally found a community deep enough to discuss garbage collection optimization in distributed systems. DevShare Lite is not for people who just skim the surface.",
    platform: "X",
    verified: true,
    height: "md",
  },
  {
    id: "2",
    name: "Sarah Chen",
    role: "Principal Engineer",
    company: "Anthropic",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    content: "The combination of RAG and Agentic AI on this forum is genuinely revolutionizing technical documentation discovery. No more hallucination issues when cross-referencing concepts.",
    platform: "GitHub",
    verified: true,
    height: "md",
  },
  {
    id: "3",
    name: "Alex Rodriguez",
    role: "Staff SRE",
    company: "Google Cloud",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    content: "k8s optimization patterns here hit different. Latency insights actually helped us reduce P99 by 40%.",
    platform: "X",
    verified: true,
    height: "sm",
  },
  {
    id: "4",
    name: "Maya Patel",
    role: "Rust Systems Engineer",
    company: "Tokio Labs",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop",
    content: "Memory safety discussions here are unmatched. The async/await race condition thread alone saved me 20 hours of debugging. This is the signal-to-noise ratio I've been looking for.",
    platform: "GitHub",
    verified: true,
    height: "md",
  },
  {
    id: "5",
    name: "James Wilson",
    role: "DevOps Architect",
    company: "HashiCorp",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop",
    content: "CI/CD pipeline optimization posts here are gold. Infrastructure as Code discussions moved so fast.",
    platform: "X",
    verified: true,
    height: "sm",
  },
  {
    id: "6",
    name: "Emma Kumar",
    role: "ML Researcher",
    company: "DeepMind",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    content: "Vector search implementations and embedding optimization threads on DevShare Lite set the standard. Never seen such rigorous technical discussion in one place.",
    platform: "GitHub",
    verified: true,
    height: "md",
  },
  {
    id: "7",
    name: "David Park",
    role: "Security Engineer",
    company: "Cloudflare",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    content: "The hydration issues and SSR edge cases discussed here solved production headaches. This community understands Next.js at a level I rarely see.",
    platform: "X",
    verified: true,
    height: "md",
  },
  {
    id: "8",
    name: "Lisa Thompson",
    role: "Performance Engineer",
    company: "Vercel",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    content: "Web vitals optimization and Core Web Metrics deep dives here are why I check DevShare first. The data-driven approach to performance tuning is refreshing.",
    platform: "GitHub",
    verified: true,
    height: "sm",
  },
  {
    id: "9",
    name: "Marcus Aurelius",
    role: "Technical Lead",
    company: "OpenAI",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop",
    content: "The level of discourse on LLM quantization and KV cache optimization is phenomenal. It's rare to find such high-density technical insights without the usual hype.",
    platform: "GitHub",
    verified: true,
    height: "md",
  },
]

const getItemVariants = (index: number) => {
  const rowIndex = Math.floor(index / 3)
  const isFromRight = rowIndex % 2 !== 0

  return {
    hidden: { 
      opacity: 0, 
      x: isFromRight ? 60 : -60, 
      y: 20 
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 45,  
        damping: 18,    
        mass: 0.8,
        velocity: 2
      },
    },
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18, 
      delayChildren: 0.3,
    },
  },
}

export function CommunityVoicesSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section id="community" className="relative py-24 px-4 md:px-6 lg:px-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-sm font-semibold text-primary tracking-widest uppercase"
          >
            Trusted by pioneering engineers
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-balance"
          >
            Take their word for it
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto"
          >
            Hear from leading developers, researchers, and engineers who are shaping the future of technology
          </motion.p>
        </div>

        {/* Masonry Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max"
        >
          {communityVoices.map((voice, index) => (
            <motion.div
              key={voice.id}
              variants={getItemVariants(index)}
              className={`group relative ${
                voice.height === "lg" ? "md:row-span-2 lg:row-span-2" : ""
              } ${voice.height === "sm" ? "md:row-span-1" : ""}`}
              onMouseEnter={() => setHoveredId(voice.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div
                className="relative h-full p-6 rounded-2xl overflow-hidden transition-all duration-500 ease-out"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
                animate={{
                  boxShadow:
                    hoveredId === voice.id ? "0 0 40px rgba(79, 70, 229, 0.15)" : "0 0 0px rgba(79, 70, 229, 0)",
                  y: hoveredId === voice.id ? -6 : 0,
                }}
              >
                {/* Hover glow effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at center, rgba(79, 70, 229, 0.08), transparent 80%)",
                  }}
                />

                <div className="relative z-10 h-full flex flex-col">
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <motion.img
                        src={voice.avatar}
                        alt={voice.name}
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0 border border-white/10"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="font-semibold text-foreground truncate">{voice.name}</p>
                          {voice.verified && (
                            <div
                              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{
                                background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                              }}
                            >
                              <span className="text-[8px] font-bold text-white">✓</span>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {voice.role} · {voice.company}
                        </p>
                      </div>
                    </div>

                    <div className="flex-shrink-0 ml-2">
                      {voice.platform === "X" ? (
                        <svg className="w-4 h-4 text-muted-foreground/60" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-muted-foreground/60" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Message Content */}
                  <p className="text-sm leading-relaxed text-foreground/80 flex-1 mb-4 italic">
                    "{voice.content}"
                  </p>

                  {/* Footer icon */}
                  <motion.div
                    className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-all duration-500"
                    animate={{ x: hoveredId === voice.id ? 0 : -8 }}
                  >
                    <ExternalLink className="w-4 h-4 text-primary" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="text-center mt-20"
        >
          <p className="text-muted-foreground mb-6 font-medium">
            Join {communityVoices.length}+ elite engineers in the conversation
          </p>
          <motion.a
            href="/auth/signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Join the Community
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}