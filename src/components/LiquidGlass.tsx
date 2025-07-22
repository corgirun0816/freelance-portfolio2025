"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface LiquidGlassProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function LiquidGlass({ children, className = "", delay = 0 }: LiquidGlassProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.8,
        delay,
        ease: [0.23, 1, 0.32, 1]
      }}
      className={`relative ${className}`}
    >
      <div className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100/10 to-transparent" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}