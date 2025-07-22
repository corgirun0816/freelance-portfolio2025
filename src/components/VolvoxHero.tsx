"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { LiquidGlass } from "./LiquidGlass"

export function VolvoxHero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center">
      <motion.div 
        className="relative z-10"
        style={{ opacity, scale }}
      >
        <LiquidGlass className="px-8 py-12 md:px-16 md:py-20">
          <motion.h1 
            className="text-5xl md:text-8xl font-thin tracking-[0.3em] text-gray-500 text-center"
            initial={{ letterSpacing: "0.5em", opacity: 0 }}
            animate={{ letterSpacing: "0.3em", opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            S.STUDIO
          </motion.h1>
          <motion.p
            className="text-center text-gray-400 tracking-[0.4em] mt-4 text-xs md:text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            ORGANIC DIGITAL EXPERIENCES
          </motion.p>
        </LiquidGlass>
        
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-gray-500 text-sm tracking-wider">
            SCROLL TO EXPLORE THE ECOSYSTEM
          </p>
        </motion.div>
      </motion.div>
      
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-gray-400 to-transparent" />
      </motion.div>
    </section>
  )
}