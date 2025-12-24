"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Code2 } from "lucide-react"
import { useRef } from "react"

const RotatingBadge = ({ text, icon: Icon }: { text: string; icon: any }) => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
    className="absolute -top-3 -right-3 bg-primary text-primary-foreground rounded-full p-2 shadow-lg"
  >
    <Icon className="w-4 h-4" />
  </motion.div>
)

export function LeadingVoicesSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100])

  const experts = [
    {
      name: "Logan Matthew",
      title: "AI/ML Architect",
      karma: 2847,
      badges: ["Top Speaker", "AI Master"],
      posts: 156,
      image: "/indi/me.jpg",
    },
    {
      name: "Tuan Ngoc",
      title: "Full-Stack Lead",
      karma: 2654,
      badges: ["Top Contributor", "Code Master"],
      posts: 203,
      image: "/indi/ntn.jpg",
    },
  ]

  return (
    <section ref={ref} className="container py-20 md:py-32 space-y-12">
      <div className="text-center space-y-4">
        <h2 className="font-mono text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Leading Voices</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Meet the experts shaping our community</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {experts.map((expert, idx) => (
          <motion.div
            key={idx}
            initial={{ 
                opacity: 0, 
                y: 20, 
                filter: "blur(10px)" 
            }}
            whileInView={{ 
                opacity: 1, 
                y: 0, 
                filter: "blur(0px)"  
            }}
            viewport={{ once: true }}
            transition={{ 
                delay: idx * 0.2,
                duration: 2,        
                ease: "easeOut" 
            }}
            className="grid md:grid-cols-2 gap-6 items-center"
            >
            <div className="relative h-96 group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-accent/20 to-primary/10 rounded-2xl blur-2xl" />
              <motion.div
                style={{ y: imageY }}
                className="relative h-full rounded-2xl overflow-hidden border-2 border-primary/30"
              >
                <img
                  src={expert.image || "/placeholder.svg"}
                  alt={expert.name}
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </motion.div>
              <RotatingBadge text="Expert" icon={Code2} />
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold">{expert.name}</h3>
                <p className="text-lg text-muted-foreground">{expert.title}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Featured Posts</p>
                <div className="flex gap-2 flex-wrap">
                  {[1, 2, 3].map((i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      Post {i}: Advanced {expert.title}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 items-start gap-2 p-4 rounded-lg bg-card/50">
                <div className="text-center">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-2xl font-bold text-primary"
                  >
                    {expert.posts}
                  </motion.div>
                  <p className="text-xs text-muted-foreground">Posts</p>
                </div>
                <div className="text-center">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-2xl font-bold text-accent"
                  >
                    {expert.karma}
                  </motion.div>
                  <p className="text-xs text-muted-foreground">Karma</p>
                </div>
                <div className="text-center">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-2xl font-bold text-primary"
                  >
                    ★★★★★
                  </motion.div>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                {expert.badges.map((badge, i) => (
                  <Badge key={i} className="bg-primary/10 text-primary">
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
