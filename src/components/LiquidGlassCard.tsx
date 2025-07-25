"use client"

import { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

interface LiquidGlassCardProps {
  children: React.ReactNode
  className?: string
  contrast?: 'light' | 'dark' | 'light-contrast' | 'dark-contrast'
  roundness?: number
  padding?: number
  glowColor?: string
  interactive?: boolean
}

export function LiquidGlassCard({ 
  children, 
  className = '', 
  contrast = 'dark',
  roundness = 20,
  padding = 2,
  glowColor = '#a8c0ff',
  interactive = true
}: LiquidGlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const isDark = contrast === 'dark' || contrast === 'dark-contrast'
  const isHighContrast = contrast.includes('contrast')

  const rotateX = useTransform(mouseY, [-150, 150], [5, -5])
  const rotateY = useTransform(mouseX, [-150, 150], [-5, 5])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const baseStyles = {
    background: isDark 
      ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)' 
      : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
    backdropFilter: 'blur(30px) saturate(200%)',
    WebkitBackdropFilter: 'blur(30px) saturate(200%)',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)'}`,
    borderRadius: `${roundness}px`,
    padding: `${padding}rem`,
    position: 'relative' as const,
    overflow: 'hidden',
    boxShadow: isDark 
      ? `0 20px 60px 0 rgba(0, 0, 0, 0.5), inset 0 0 40px rgba(${hexToRgb(glowColor)}, 0.1)` 
      : `0 20px 60px 0 rgba(0, 0, 0, 0.1), inset 0 0 40px rgba(${hexToRgb(glowColor)}, 0.05)`,
  }

  return (
    <motion.div
      ref={cardRef}
      className={`liquid-glass-card ${className}`}
      style={{
        ...baseStyles,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      animate={{
        rotateX: interactive ? rotateX : 0,
        rotateY: interactive ? rotateY : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Liquid gradient overlay */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(${hexToRgb(glowColor)}, 0.15), transparent 40%)`,
          opacity: 0.8,
          mixBlendMode: isDark ? 'screen' : 'multiply',
        }}
        animate={{
          x: mouseX.get() * 0.1,
          y: mouseY.get() * 0.1,
        }}
      />
      
      {/* Refraction effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255,255,255,0.03) 10px,
              rgba(255,255,255,0.03) 20px
            )
          `,
          filter: 'blur(1px)',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Animated light reflections */}
      <motion.div
        className="absolute -top-1/2 -right-1/2 w-full h-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(255,255,255,${isDark ? 0.2 : 0.1}) 0%, transparent 70%)`,
          filter: 'blur(50px)',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.div>
  )
}

// Helper function to convert hex to rgb
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result 
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '255, 255, 255'
}