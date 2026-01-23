"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export const StarBackground = () => {
  const [stars, setStars] = useState<any[]>([])
  const [meteors, setMeteors] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    generateStars()
    generateMeteors()

    const handleResize = () => generateStars()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const generateStars = () => {
    const numberOfStars = Math.floor((window.innerWidth * window.innerHeight) / 10000)
    const newStars = []
    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 2 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.5,
        animationDuration: Math.random() * 4 + 2,
      })
    }
    setStars(newStars)
  }

  const generateMeteors = () => {
    const numberOfMeteors = 6
    const newMeteors = []
    for (let i = 0; i < numberOfMeteors; i++) {
      newMeteors.push({
        id: i,
        size: Math.random() * 1.5 + 1,
        x: Math.random() * 100,
        y: Math.random() * -10, // Xuất phát từ trên mép màn hình
        delay: Math.random() * 10,
        animationDuration: Math.random() * 2 + 2,
      })
    }
    setMeteors(newMeteors)
  }

  if (!mounted) return null

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-transparent">
      {/* 1. Stars */}
      {stars.map((star) => (
        <motion.div
          key={`star-${star.id}`}
          className="absolute bg-white rounded-full shadow-[0_0_4px_rgba(255,255,255,0.8)]"
          style={{
            width: star.size + "px",
            height: star.size + "px",
            left: star.x + "%",
            top: star.y + "%",
          }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: star.animationDuration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* 2. Meteors - Thiết kế lại để giống ảnh AI */}
      {meteors.map((meteor) => (
        <motion.div
          key={`meteor-${meteor.id}`}
          className="absolute"
          style={{
            left: meteor.x + "%",
            top: meteor.y + "%",
            rotate: "45deg",
          }}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: [0, 1200],
            y: [0, 1200],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: meteor.animationDuration,
            repeat: Infinity,
            delay: meteor.delay,
            ease: "linear",
          }}
        >
          {/* Đuôi sao băng (The Tail) */}
          <div 
            className="relative bg-gradient-to-r from-transparent via-orange-500 to-amber-200"
            style={{
              width: meteor.size * 120 + "px",
              height: "2px",
              borderRadius: "9999px",
              filter: "blur(1px)",
              boxShadow: "0 0 15px #f97316, 0 0 30px #fbbf24",
            }}
          >
            {/* Đầu sao băng rực sáng (The Head / Core) */}
            <div 
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full"
              style={{
                width: "6px",
                height: "6px",
                boxShadow: `
                  0 0 10px 2px #ffffff,
                  0 0 20px 5px #fbbf24,
                  0 0 40px 10px #f97316
                `,
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}