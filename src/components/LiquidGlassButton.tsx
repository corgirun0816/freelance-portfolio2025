"use client"

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface LiquidGlassButtonProps extends ButtonProps {
  children: React.ReactNode
  contrast?: 'light' | 'dark' | 'light-contrast' | 'dark-contrast'
  roundness?: number
  paddingX?: number
  paddingY?: number
  fontSize?: string
  fontWeight?: number
  accentColor?: string
}

export function LiquidGlassButton({ 
  children, 
  className = '', 
  contrast = 'dark',
  roundness = 40,
  paddingX = 4,
  paddingY = 2,
  fontSize = '1rem',
  fontWeight = 500,
  accentColor = '#a8c0ff',
  variant = "ghost",
  size = "default",
  ...props
}: LiquidGlassButtonProps) {
  const [isHovering, setIsHovering] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const isDark = contrast === 'dark' || contrast === 'dark-contrast'
  const isHighContrast = contrast.includes('contrast')

  const baseStyles = {
    background: isDark 
      ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)' 
      : 'linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.02) 100%)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}`,
    borderRadius: `${roundness}px`,
    padding: `${paddingY * 0.5}rem ${paddingX * 0.5}rem`,
    fontSize,
    fontWeight,
    boxShadow: isDark 
      ? `0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 0 20px rgba(${hexToRgb(accentColor)}, 0.2)` 
      : `0 8px 32px 0 rgba(31, 38, 135, 0.1), inset 0 0 20px rgba(${hexToRgb(accentColor)}, 0.1)`,
  }

  const hoverStyles = {
    background: isDark 
      ? 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)' 
      : 'linear-gradient(135deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.04) 100%)',
    transform: 'translateY(-2px) scale(1.02)',
    boxShadow: isDark 
      ? `0 12px 40px 0 rgba(31, 38, 135, 0.5), inset 0 0 30px rgba(${hexToRgb(accentColor)}, 0.3)` 
      : `0 12px 40px 0 rgba(31, 38, 135, 0.15), inset 0 0 30px rgba(${hexToRgb(accentColor)}, 0.15)`,
  }

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      style={{ display: 'inline-block' }}
    >
      <Button
        ref={buttonRef}
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          isDark ? "text-white hover:text-white" : "text-black hover:text-black",
          className
        )}
        style={{
          ...baseStyles,
          background: isHovering ? hoverStyles.background : baseStyles.background,
          transform: isHovering ? hoverStyles.transform : 'none',
          boxShadow: isHovering ? hoverStyles.boxShadow : baseStyles.boxShadow,
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        variant={variant}
        size={size}
        {...props}
      >
        {/* Liquid effect overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${isHovering ? '50% 50%' : '50% 150%'}, rgba(${hexToRgb(accentColor)}, 0.3) 0%, transparent 70%)`,
            transition: 'all 0.6s ease',
            filter: 'blur(40px)',
          }}
        />
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,${isDark ? 0.3 : 0.2}) 50%, transparent 60%)`,
            transform: 'translateX(-100%)',
          }}
          animate={isHovering ? {
            transform: ['translateX(-100%)', 'translateX(100%)'],
          } : {}}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        
        {/* Content */}
        <span className="relative z-10">{children}</span>
        
        {/* SVG Filters for liquid distortion */}
        <svg className="absolute w-0 h-0">
          <defs>
            <filter id="liquid-filter">
              <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
            </filter>
          </defs>
        </svg>
      </Button>
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