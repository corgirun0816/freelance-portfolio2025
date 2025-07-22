"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"

export function FutureHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={containerRef} className="h-screen relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ y, opacity }}
      >
        <div className="relative">
          <motion.h1
            className="text-[15vw] font-thin tracking-[-0.05em] text-gray-200 select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            FUTURE
          </motion.h1>
          
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.h1
              className="text-[15vw] font-thin tracking-[-0.05em] text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-400"
              animate={{
                backgroundPosition: isHovered ? ["0% 50%", "100% 50%", "0% 50%"] : "0% 50%"
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              FUTURE
            </motion.h1>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-400 text-xs tracking-[0.3em]"
        >
          SCROLL
        </motion.div>
      </motion.div>
    </section>
  )
}