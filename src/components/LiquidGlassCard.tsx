"use client"

import { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface LiquidGlassCardProps {
  children: React.ReactNode
  className?: string
  contrast?: 'light' | 'dark' | 'light-contrast' | 'dark-contrast'
  roundness?: number
  padding?: number
  glowColor?: string
  interactive?: boolean
  title?: string
  description?: string
  footer?: React.ReactNode
}

export function LiquidGlassCard({ 
  children, 
  className = '', 
  contrast = 'dark',
  roundness = 20,
  padding = 2,
  glowColor = '#a8c0ff',
  interactive = true,
  title,
  description,
  footer
}: LiquidGlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isHovering, setIsHovering] = useState(false)

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
    setIsHovering(false)
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const baseStyles = {
    background: isDark 
      ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)' 
      : 'linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.02) 100%)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}`,
    borderRadius: `${roundness}px`,
    boxShadow: isDark 
      ? `0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 0 30px rgba(${hexToRgb(glowColor)}, 0.15)` 
      : `0 8px 32px 0 rgba(31, 38, 135, 0.1), inset 0 0 30px rgba(${hexToRgb(glowColor)}, 0.08)`,
  }

  const hoverStyles = {
    boxShadow: isDark 
      ? `0 12px 40px 0 rgba(31, 38, 135, 0.5), inset 0 0 40px rgba(${hexToRgb(glowColor)}, 0.25)` 
      : `0 12px 40px 0 rgba(31, 38, 135, 0.15), inset 0 0 40px rgba(${hexToRgb(glowColor)}, 0.12)`,
  }

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX: interactive ? rotateX : 0,
        rotateY: interactive ? rotateY : 0,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      animate={{
        boxShadow: isHovering ? hoverStyles.boxShadow : baseStyles.boxShadow,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card 
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          isDark ? "text-white" : "text-black",
          className
        )}
        style={baseStyles}
      >
        {(title || description) && (
          <CardHeader>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription className={isDark ? "text-gray-300" : "text-gray-600"}>{description}</CardDescription>}
          </CardHeader>
        )}
        
        <CardContent className={`p-${padding * 4}`}>
          {/* Liquid effect overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${isHovering ? '50% 50%' : '50% 150%'}, rgba(${hexToRgb(glowColor)}, 0.3) 0%, transparent 70%)`,
              transition: 'all 0.6s ease',
              filter: 'blur(60px)',
              transform: 'translateZ(0)',
            }}
          />
          
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,${isDark ? 0.2 : 0.15}) 50%, transparent 60%)`,
              transform: 'translateX(-100%)',
            }}
            animate={isHovering ? {
              transform: ['translateX(-100%)', 'translateX(100%)'],
            } : {}}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
          
          {/* Content */}
          <div className="relative z-10">
            {children}
          </div>
        </CardContent>
        
        {footer && (
          <CardFooter className={`p-${padding * 4} pt-0`}>
            {footer}
          </CardFooter>
        )}
      </Card>
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