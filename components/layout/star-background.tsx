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

    const handleResize = () => {
      generateStars()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const generateStars = () => {
    const numberOfStars = Math.floor((window.innerWidth * window.innerHeight) / 10000)
    const newStars = []
    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.5,
        animationDuration: Math.random() * 4 + 2,
      })
    }
    setStars(newStars)
  }

  const generateMeteors = () => {
    const numberOfMeteors = 7
    const newMeteors = []
    for (let i = 0; i < numberOfMeteors; i++) {
      newMeteors.push({
        id: i,
        size: Math.random() * 2 + 1,
        x: Math.random() * 100,
        y: Math.random() * 20,
        delay: Math.random() * 10,
        animationDuration: Math.random() * 3 + 3,
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
          className="absolute bg-white rounded-full shadow-[0_0_5px_white]"
          style={{
            width: star.size + "px",
            height: star.size + "px",
            left: star.x + "%",
            top: star.y + "%",
          }}
          animate={{
            opacity: [star.opacity * 0.5, star.opacity, star.opacity * 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.animationDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 2. Meteors - Siêu rực rỡ (Ultra Glow) */}
      {meteors.map((meteor) => (
        <motion.div
          key={`meteor-${meteor.id}`}
          className="absolute rounded-full"
          style={{
            width: meteor.size * 80 + "px", // Đuôi dài hơn tí
            height: "4px",
            left: meteor.x + "%",
            top: meteor.y + "%",
            rotate: "45deg",
            background: "linear-gradient(to right, transparent, #fbbf24, #f97316, #ffffff)",
            // Chồng 3 lớp shadow để tạo quầng sáng thực tế
            boxShadow: `
              0 0 20px 2px rgba(251, 191, 36, 0.8), 
              0 0 40px 4px rgba(249, 115, 22, 0.4),
              0 0 10px 1px rgba(255, 255, 255, 0.9)
            `,
          }}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: [0, 1000], // Bay xa hơn
            y: [0, 1000],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: meteor.animationDuration,
            repeat: Infinity,
            delay: meteor.delay,
            ease: "linear",
          }}
        >
          {/* Lớp blur bọc ngoài để tăng độ rực rỡ */}
          <div className="absolute inset-0 bg-orange-500 blur-[6px] opacity-50 rounded-full" />
        </motion.div>
      ))}
    </div>
  )
}