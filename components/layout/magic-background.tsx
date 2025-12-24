"use client"

import { motion } from "framer-motion"

export function MagicBackground() {
  const planets = [
    { size: 12, color: "bg-blue-400", duration: 15, radius: 120, delay: 0 },
    { size: 20, color: "bg-purple-500", duration: 25, radius: 200, delay: -5 },
    { size: 16, color: "bg-teal-400", duration: 20, radius: 280, delay: -10 },
    { size: 24, color: "bg-rose-500", duration: 35, radius: 380, delay: -15 },
  ]

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#020205]">
      {/* 1. Các vì sao tinh tú (Stars) lấp lánh */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 2. Mặt trời trung tâm (The Sun) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Lớp hào quang tỏa sáng (Glow) */}
        <div className="absolute -inset-24 bg-indigo-600/20 rounded-full blur-[80px]" />
        <div className="absolute -inset-16 bg-blue-500/30 rounded-full blur-[40px]" />
        
        {/* Khối cầu mặt trời */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: 360,
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-300 shadow-[0_0_50px_rgba(99,102,241,0.5)]"
        />
      </div>

      {/* 3. Quỹ đạo và Các hành tinh (Orbits & Planets) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {planets.map((planet, index) => (
          <div key={index} className="absolute">
            {/* Vòng quỹ đạo mờ */}
            <div
              className="absolute border border-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"
              style={{
                width: planet.radius * 2,
                height: planet.radius * 2,
              }}
            />
            
            {/* Hành tinh chuyển động */}
            <motion.div
              style={{
                width: planet.radius * 2,
                height: planet.radius * 2,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              animate={{ rotate: 360 }}
              transition={{
                duration: planet.duration,
                repeat: Infinity,
                ease: "linear",
                delay: planet.delay,
              }}
            >
              <div
                className={`absolute top-0 left-1/2 -translate-x-1/2 rounded-full shadow-lg ${planet.color} blur-[1px]`}
                style={{
                  width: planet.size,
                  height: planet.size,
                }}
              >
                {/* Hiệu ứng ánh sáng trên hành tinh */}
                <div className="absolute inset-0 rounded-full bg-white/20 blur-[2px]" />
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* 4. Lớp hạt bụi vũ trụ (Grain Effect) cho chiều sâu */}
      <div 
        className="absolute inset-0 opacity-[0.1] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}