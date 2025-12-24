"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useRef, useState } from "react"

const AnimatedBorderBeam = () => {
  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-30"
        style={{
          backgroundSize: "200% 200%",
          mask: "linear-gradient(transparent 0%, transparent calc(50% - 1px), black calc(50% - 1px), black calc(50% + 1px), transparent calc(50% + 1px), transparent 100%)",
        }}
      />
    </div>
  )
}

const MouseSpotlight = ({ mouseX, mouseY }: { mouseX: number; mouseY: number }) => {
  return (
    <motion.div
      animate={{
        left: mouseX,
        top: mouseY,
      }}
      transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
      className="absolute w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none mix-blend-screen"
      style={{
        transform: "translate(-50%, -50%)",
      }}
    />
  )
}

const ShimmerButton = () => {
  return (
    <div className="relative overflow-hidden">
      <Button
        size="lg"
        asChild
        className="relative h-12 px-8 group overflow-hidden active:scale-95 transition-transform"
      >
        <Link href="/home">
          <span className="relative z-10 flex items-center">
            Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
          </span>
          {/* Shimmer effect */}
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/3"
          />
        </Link>
      </Button>
    </div>
  )
}

const ParticleBackground = () => {
  return (
    <motion.div
      animate={{
        opacity: [0.05, 0.15, 0.05],
      }}
      transition={{
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
      }}
      className="absolute inset-0 rounded-2xl pointer-events-none"
      style={{
        backgroundImage:
          "url('data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E')",
        backgroundSize: "200px 200px",
      }}
    />
  )
}

const AnimatedHeadline = ({ text }: { text: string }) => {
  return (
    <motion.h2 className="font-mono text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-slate-200 via-white to-slate-200 animate-gradient">
      {text.split("").map((char, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{
            delay: idx * 0.05,
            duration: 0.5,
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.h2>
  )
}

const ScrollMarquee = () => {
  const keywords = ["COLLABORATE", "INNOVATE", "SHARE", "DEVELOP", "CREATE", "EXPLORE"]

  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
      <motion.div
        animate={{
          x: [0, -1000],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="flex gap-8 whitespace-nowrap opacity-10"
      >
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-8">
            {keywords.map((keyword, idx) => (
              <span key={idx} className="text-xs font-bold tracking-widest">
                {keyword} •
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export function CTASection() {
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMouseX(e.clientX - rect.left)
    setMouseY(e.clientY - rect.top)
  }

  return (
    <section id="cta" className="container py-20 md:py-32 relative">
      <div className="mx-auto max-w-4xl relative">
        {/* Blur blobs for parallax effect */}
        <motion.div
          animate={{
            y: [0, -30, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
          }}
          className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
          }}
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none"
        />

        <Card
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="relative p-8 md:p-12 text-center space-y-6 bg-card/30 border-primary/20 backdrop-blur-xl overflow-hidden group active:scale-95 transition-transform"
        >
          {/* Animated Border Beam */}
          <AnimatedBorderBeam />

          {/* Mouse Spotlight (desktop only) */}
          {isHovering && <MouseSpotlight mouseX={mouseX} mouseY={mouseY} />}

          {/* Particle Background */}
          <ParticleBackground />

          {/* Scroll Marquee */}
          <ScrollMarquee />

          {/* Content */}
          <div className="relative z-10 space-y-6">
            <AnimatedHeadline text="Ready to start sharing?" />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto"
            >
              Join thousands of developers already using DevShare Lite to collaborate and grow their skills.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <ShimmerButton />
            </motion.div>
          </div>

          {/* Glow effect on hover */}
          {isHovering && (
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(79, 70, 229, 0.3)",
                  "0 0 40px rgba(79, 70, 229, 0.6)",
                  "0 0 20px rgba(79, 70, 229, 0.3)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
          )}
        </Card>
      </div>
    </section>
  )
}
