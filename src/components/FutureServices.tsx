"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"

const services = [
  {
    id: "01",
    title: "TRAINING",
    description: "Transform your body and mind through personalized programs",
    href: "/services/personal-training"
  },
  {
    id: "02",
    title: "DESIGN",
    description: "Create digital experiences that transcend expectations",
    href: "/services/web-design"
  },
  {
    id: "03",
    title: "DEVELOP",
    description: "Build tomorrow's applications with today's technology",
    href: "/services/app-development"
  },
  {
    id: "04",
    title: "WRITE",
    description: "Craft content that connects and converts",
    href: "/services/seo-writing"
  }
]

function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    index % 2 === 0 ? [-100, 0, 100] : [100, 0, -100]
  )
  
  return (
    <motion.div
      ref={ref}
      style={{ x }}
      className="relative"
    >
      <Link href={service.href}>
        <motion.div
          className="group relative overflow-hidden bg-gray-50 p-12 md:p-24"
          whileHover={{ scale: 0.98 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-gray-100 to-transparent opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.5 }}
          />
          
          <div className="relative z-10">
            <motion.span
              className="text-gray-300 text-8xl md:text-[12rem] font-thin absolute -top-8 -left-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ duration: 1 }}
            >
              {service.id}
            </motion.span>
            
            <div className="relative">
              <motion.h3
                className="text-4xl md:text-6xl font-thin text-gray-700 mb-4 tracking-wider"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: isInView ? 0 : -50, opacity: isInView ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {service.title}
              </motion.h3>
              
              <motion.p
                className="text-gray-500 text-lg max-w-md"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: isInView ? 0 : -30, opacity: isInView ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {service.description}
              </motion.p>
            </div>
          </div>
          
          <motion.div
            className="absolute bottom-8 right-8 text-gray-400"
            initial={{ scale: 0 }}
            animate={{ scale: isInView ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M10 30L30 10M30 10H10M30 10V30" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

export function FutureServices() {
  return (
    <section className="py-32 overflow-hidden">
      <motion.div
        className="text-center mb-32"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-6xl md:text-8xl font-thin text-gray-200 tracking-[0.2em]">
          SERVICES
        </h2>
      </motion.div>
      
      <div className="space-y-px">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </section>
  )
}