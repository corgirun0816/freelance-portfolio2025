"use client"

import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { LiquidGlass } from './LiquidGlass'

export function PhysicsNav() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 20, stiffness: 200 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isOpen) return
      
      const rect = menuRef.current?.getBoundingClientRect()
      if (rect) {
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height
        mouseX.set(x * 30)
        mouseY.set(y * 30)
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isOpen, mouseX, mouseY])
  
  const menuItems = [
    { name: "HOME", href: "/", delay: 0 },
    { name: "TRAINING", href: "/services/personal-training", delay: 0.1 },
    { name: "WEBDESIGN", href: "/services/web-design", delay: 0.2 },
    { name: "アプリケーション開発", href: "/services/app-development", delay: 0.3 },
    { name: "WRITING", href: "/services/seo-writing", delay: 0.4 },
    { name: "問い合わせ", href: "#contact", delay: 0.5 }
  ]
  
  return (
    <>
      <motion.button
        className="fixed top-8 right-8 z-50 w-16 h-16"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <LiquidGlass className="w-full h-full rounded-full flex items-center justify-center" intensity={0.4}>
          <div className="relative w-6 h-6">
            <motion.span
              className="absolute left-0 w-6 h-px bg-gray-600"
              animate={{ 
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 0 : -8
              }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.span
              className="absolute left-0 w-6 h-px bg-gray-600"
              animate={{ 
                opacity: isOpen ? 0 : 1,
                scaleX: isOpen ? 0 : 1
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute left-0 w-6 h-px bg-gray-600"
              animate={{ 
                rotate: isOpen ? -45 : 0,
                y: isOpen ? 0 : 8
              }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </div>
        </LiquidGlass>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-white/90"
              initial={{ scale: 0, borderRadius: "100%" }}
              animate={{ scale: 1, borderRadius: "0%" }}
              exit={{ scale: 0, borderRadius: "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                transformOrigin: "top right"
              }}
            />
            
            <div 
              ref={menuRef}
              className="relative h-full flex items-center justify-center"
            >
              <motion.nav
                className="text-center relative"
                style={{
                  x: springX,
                  y: springY,
                }}
              >
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: {
                        delay: item.delay,
                        type: "spring",
                        stiffness: 200,
                        damping: 20
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      y: -50, 
                      scale: 0.8,
                      transition: {
                        delay: (menuItems.length - i - 1) * 0.05
                      }
                    }}
                    whileHover={{ 
                      scale: 1.2,
                      rotate: [-2, 2, -2],
                      transition: {
                        rotate: {
                          duration: 0.3,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }
                      }
                    }}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      className="block py-4 px-8 text-4xl md:text-5xl font-thin text-gray-600 hover:text-gray-400 transition-colors tracking-[0.2em] relative"
                      onClick={() => setIsOpen(false)}
                    >
                      <motion.span
                        className="relative z-10"
                        whileHover={{ 
                          textShadow: "2px 2px 8px rgba(0,0,0,0.1)"
                        }}
                      >
                        {item.name}
                      </motion.span>
                      
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <LiquidGlass className="w-full h-full" intensity={0.2} />
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}