"use client"

import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { LiquidGlass } from './LiquidGlass'

export function DynamicHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 300 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)
  
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5])
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -200])
  
  const letterSpacing = useTransform(scrollYProgress, [0, 0.5], ["-0.05em", "0.5em"])
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height
        mouseX.set(x * 100)
        mouseY.set(y * 100)
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])
  
  return (
    <section ref={containerRef} className="min-h-screen relative overflow-hidden">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: useTransform(
            scrollYProgress,
            [0, 1],
            [
              'radial-gradient(circle at 50% 50%, rgba(200,200,200,0.1), transparent 60%)',
              'radial-gradient(circle at 50% 50%, rgba(200,200,200,0.3), transparent 80%)'
            ]
          )
        }}
      />
      
      <div className="h-screen flex items-center justify-center relative">
        <LiquidGlass className="absolute inset-0 w-full h-full" intensity={0.2} />
        
        <motion.div
          className="relative z-10"
          style={{
            scale: textScale,
            opacity: textOpacity,
            y: textY,
            x: springX,
            rotateY: useTransform(springX, [-100, 100], [-5, 5]),
            rotateX: useTransform(springY, [-100, 100], [5, -5]),
          }}
        >
          <motion.h1
            className="text-[12vw] font-thin text-gray-300 select-none relative"
            style={{ letterSpacing }}
          >
            <motion.span
              className="inline-block"
              whileHover={{ scale: 1.2, color: "#999" }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              S
            </motion.span>
            <motion.span
              className="inline-block"
              whileHover={{ scale: 0.8, rotate: 180 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              .
            </motion.span>
            <motion.span
              className="inline-block"
              whileHover={{ scale: 1.2, color: "#999" }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              S
            </motion.span>
            <motion.span
              className="inline-block"
              whileHover={{ scale: 1.2, color: "#999" }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              T
            </motion.span>
            <motion.span
              className="inline-block"
              whileHover={{ scale: 1.2, color: "#999" }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              U
            </motion.span>
            <motion.span
              className="inline-block"
              whileHover={{ scale: 1.2, color: "#999" }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              D
            </motion.span>
            <motion.span
              className="inline-block"
              whileHover={{ scale: 1.2, color: "#999" }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              I
            </motion.span>
            <motion.span
              className="inline-block"
              whileHover={{ scale: 1.2, color: "#999" }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              O
            </motion.span>
          </motion.h1>
          
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.3], [0, 1]),
              scale: useTransform(scrollYProgress, [0, 0.3], [0.8, 1]),
            }}
          >
            <h2 className="text-[12vw] font-thin text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-500">
              S.STUDIO
            </h2>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="absolute bottom-20 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            animate={{ 
              y: [0, 10, 0],
              opacity: [1, 0.5, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-gray-400 text-xs tracking-[0.3em] text-center"
          >
            SCROLL TO EXPLORE
            <div className="w-px h-20 bg-gradient-to-b from-gray-400 to-transparent mx-auto mt-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}