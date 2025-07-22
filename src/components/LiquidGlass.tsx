"use client"

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface LiquidGlassProps {
  className?: string
  children?: React.ReactNode
  intensity?: number
}

export function LiquidGlass({ className = "", children, intensity = 0.3 }: LiquidGlassProps) {
  const glassRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glassRef.current) return
      
      const rect = glassRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      
      glassRef.current.style.setProperty('--mouse-x', `${x}`)
      glassRef.current.style.setProperty('--mouse-y', `${y}`)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  return (
    <motion.div
      ref={glassRef}
      className={`liquid-glass ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        background: `
          radial-gradient(
            circle at calc(var(--mouse-x, 0.5) * 100%) calc(var(--mouse-y, 0.5) * 100%),
            rgba(255, 255, 255, ${intensity * 0.5}),
            rgba(255, 255, 255, ${intensity * 0.2}) 40%,
            transparent 70%
          ),
          linear-gradient(
            135deg,
            rgba(255, 255, 255, ${intensity * 0.1}),
            rgba(200, 200, 200, ${intensity * 0.05})
          )
        `,
        backdropFilter: `blur(${intensity * 20}px)`,
        WebkitBackdropFilter: `blur(${intensity * 20}px)`,
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {children}
    </motion.div>
  )
}