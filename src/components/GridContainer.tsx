"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"

interface GridContainerProps {
  children: ReactNode
  columns?: number
  gap?: number
  className?: string
}

export function GridContainer({ 
  children, 
  columns = 12, 
  gap = 1,
  className = "" 
}: GridContainerProps) {
  return (
    <div className={`w-full ${className}`}>
      <div 
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `${gap}px`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

interface GridItemProps {
  children: ReactNode
  span?: number
  className?: string
  delay?: number
}

export function GridItem({ 
  children, 
  span = 1,
  className = "",
  delay = 0
}: GridItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6,
        delay,
        ease: [0.23, 1, 0.32, 1]
      }}
      className={className}
      style={{ gridColumn: `span ${span}` }}
    >
      {children}
    </motion.div>
  )
}