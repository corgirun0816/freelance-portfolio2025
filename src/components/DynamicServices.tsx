"use client"

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { LiquidGlass } from './LiquidGlass'

const services = [
  {
    id: "01",
    title: "TRAINING",
    description: "Transform your body and mind",
    href: "/services/personal-training",
    details: "Personalized fitness programs designed to push boundaries and achieve extraordinary results"
  },
  {
    id: "02", 
    title: "WEB DESIGN",
    description: "Create digital experiences",
    href: "/services/web-design",
    details: "Cutting-edge web solutions that blend aesthetics with advanced functionality"
  },
  {
    id: "03",
    title: "アプリケーション開発",
    description: "Build tomorrow's applications",
    href: "/services/app-development",
    details: "Innovative applications that leverage emerging technologies and user-centric design"
  },
  {
    id: "04",
    title: "WRITING",
    description: "Craft compelling content",
    href: "/services/seo-writing",
    details: "Strategic content that connects, converts, and dominates search rankings"
  }
]

function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
  const ref = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const isInView = useInView(ref, { once: false, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [100, -100]
  )
  
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [5, 0, -5]
  )
  
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.8, 1, 0.8]
  )
  
  return (
    <motion.div
      ref={ref}
      style={{ y, rotate, scale }}
      className="relative mb-32"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={service.href}>
        <LiquidGlass 
          className="block p-16 md:p-24 rounded-3xl overflow-hidden group"
          intensity={isHovered ? 0.4 : 0.2}
        >
          <motion.div
            className="absolute top-8 right-8 text-9xl font-thin text-gray-200"
            animate={{
              scale: isHovered ? 1.2 : 1,
              rotate: isHovered ? 90 : 0,
              opacity: isHovered ? 0.3 : 0.1
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {service.id}
          </motion.div>
          
          <motion.h3
            className="text-5xl md:text-7xl font-thin text-gray-600 mb-4"
            animate={{
              x: isHovered ? 20 : 0,
              letterSpacing: isHovered ? "0.2em" : "0.05em"
            }}
            transition={{ duration: 0.4 }}
          >
            {service.title}
          </motion.h3>
          
          <motion.p
            className="text-xl text-gray-500 mb-8"
            animate={{
              x: isHovered ? 30 : 0,
              opacity: isHovered ? 1 : 0.7
            }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {service.description}
          </motion.p>
          
          <motion.div
            className="overflow-hidden"
            animate={{
              height: isHovered ? "auto" : 0,
              opacity: isHovered ? 1 : 0
            }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-gray-400 text-lg">
              {service.details}
            </p>
          </motion.div>
          
          <motion.div
            className="absolute bottom-8 right-8"
            animate={{
              scale: isHovered ? 1 : 0,
              rotate: isHovered ? 0 : -180
            }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-16 h-16 rounded-full border border-gray-400 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" className="text-gray-500"/>
              </svg>
            </div>
          </motion.div>
        </LiquidGlass>
      </Link>
    </motion.div>
  )
}

export function DynamicServices() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  
  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 100px,
              rgba(200, 200, 200, 0.05) 100px,
              rgba(200, 200, 200, 0.05) 200px
            )
          `,
          y: backgroundY
        }}
      />
      
      <motion.div
        className="text-center mb-32"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-8xl md:text-[10rem] font-thin text-gray-200 tracking-[0.3em]">
          SERVICES
        </h2>
      </motion.div>
      
      <div className="max-w-6xl mx-auto px-8">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </section>
  )
}