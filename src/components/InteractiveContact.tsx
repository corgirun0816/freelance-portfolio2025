"use client"

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { LiquidGlass } from './LiquidGlass'

export function InteractiveContact() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 15, stiffness: 150 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height
        mouseX.set(x * 20)
        mouseY.set(y * 20)
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSuccess(true)
    setEmail("")
    
    setTimeout(() => setIsSuccess(false), 3000)
  }
  
  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          x: springX,
          y: springY,
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-200 rounded-full opacity-5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-300 rounded-full opacity-5 blur-3xl" />
      </motion.div>
      
      <div className="max-w-5xl w-full relative z-10">
        <motion.h2
          className="text-7xl md:text-9xl font-thin text-gray-200 text-center mb-24 tracking-[0.3em]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          CONNECT
        </motion.h2>
        
        <LiquidGlass className="p-12 md:p-20 rounded-3xl" intensity={0.3}>
          <form onSubmit={handleSubmit} className="relative">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <input
                ref={inputRef}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOUR EMAIL"
                required
                className="w-full px-0 py-6 text-3xl md:text-5xl font-thin text-gray-600 bg-transparent border-b-2 border-gray-300 focus:border-gray-500 outline-none transition-all duration-300 placeholder:text-gray-300"
                style={{
                  letterSpacing: email ? "0.05em" : "0.1em"
                }}
              />
              
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gray-500"
                initial={{ width: "0%" }}
                animate={{ width: email ? "100%" : "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            
            <motion.button
              type="submit"
              className="mt-12 relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting || isSuccess}
            >
              <LiquidGlass 
                className="px-12 py-6 rounded-full" 
                intensity={0.4}
              >
                <motion.span
                  className="relative z-10 text-2xl font-thin tracking-[0.2em] text-gray-600"
                  animate={{
                    opacity: isSuccess ? 0 : 1
                  }}
                >
                  {isSubmitting ? (
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      SENDING...
                    </motion.span>
                  ) : (
                    "SEND MESSAGE"
                  )}
                </motion.span>
                
                <motion.span
                  className="absolute inset-0 flex items-center justify-center text-2xl font-thin tracking-[0.2em] text-gray-500"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: isSuccess ? 1 : 0,
                    scale: isSuccess ? 1 : 0.5
                  }}
                  transition={{ duration: 0.3 }}
                >
                  SUCCESS!
                </motion.span>
              </LiquidGlass>
            </motion.button>
          </form>
        </LiquidGlass>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {[
            { 
              label: "EMAIL", 
              value: "hello@s.studio",
              delay: 0.6
            },
            { 
              label: "LOCATION", 
              value: "TOKYO, JAPAN",
              delay: 0.7
            },
            { 
              label: "AVAILABILITY", 
              value: "OPEN FOR PROJECTS",
              delay: 0.8
            }
          ].map((item) => (
            <motion.div
              key={item.label}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: item.delay }}
              whileHover={{ x: 10 }}
              className="text-center md:text-left"
            >
              <p className="text-xs text-gray-400 tracking-[0.3em] mb-3">{item.label}</p>
              <p className="text-xl text-gray-600 font-light">{item.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}