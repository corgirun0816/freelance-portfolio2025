"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LiquidGlassButton } from './LiquidGlassButton'
import { LiquidGlassCard } from './LiquidGlassCard'

export function LiquidGlassNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('origin')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = ['origin', 'timeline', 'services', 'connect']
      const scrollPosition = window.scrollY + window.innerHeight / 2
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { top, bottom } = element.getBoundingClientRect()
          if (top <= window.innerHeight / 2 && bottom >= window.innerHeight / 2) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navItems = [
    { id: 'origin', label: 'Origin', color: '#a8c0ff' },
    { id: 'timeline', label: 'Timeline', color: '#ff6b6b' },
    { id: 'services', label: 'Services', color: '#4ecdc4' },
    { id: 'connect', label: 'Connect', color: '#f7b731' },
  ]

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 p-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <LiquidGlassCard
        className="max-w-4xl mx-auto"
        contrast="dark"
        roundness={30}
        padding={1}
        glowColor="#a8c0ff"
        interactive={false}
      >
        <div className="flex items-center justify-between">
          <motion.div 
            className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            Shota's Portfolio
          </motion.div>
          
          <div className="flex gap-2">
            {navItems.map((item) => (
              <LiquidGlassButton
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                contrast="dark"
                roundness={25}
                paddingX={3}
                paddingY={1.5}
                fontSize="0.9rem"
                accentColor={activeSection === item.id ? item.color : '#a8c0ff'}
                className={activeSection === item.id ? 'ring-2 ring-white/30' : ''}
              >
                {item.label}
              </LiquidGlassButton>
            ))}
          </div>
        </div>
      </LiquidGlassCard>
    </motion.nav>
  )
}