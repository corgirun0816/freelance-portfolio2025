"use client"

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Code2, Palette, PenTool, Dumbbell,
  Mail, Instagram, Twitter, User
} from 'lucide-react'

// Service data
const services = [
  {
    id: 'web-design',
    title: 'Web Designer',
    icon: Palette,
    color: 'bg-orange-100 text-orange-600',
    position: { x: 0, y: -250 } // top
  },
  {
    id: 'development',
    title: 'Developer',
    icon: Code2,
    color: 'bg-blue-100 text-blue-600',
    position: { x: 250, y: 0 } // right
  },
  {
    id: 'training',
    title: 'Personal Trainer',
    icon: Dumbbell,
    color: 'bg-red-100 text-red-600',
    position: { x: 0, y: 250 } // bottom
  },
  {
    id: 'seo-writing',
    title: 'SEO Writer',
    icon: PenTool,
    color: 'bg-purple-100 text-purple-600',
    position: { x: -250, y: 0 } // left
  }
]

// Connection Line Component
function ConnectionLine({ from, to }: { from: HTMLElement | null; to: HTMLElement | null }) {
  const [path, setPath] = useState('')

  useEffect(() => {
    if (!from || !to) return

    const updatePath = () => {
      const fromRect = from.getBoundingClientRect()
      const toRect = to.getBoundingClientRect()
      
      const fromX = fromRect.left + fromRect.width / 2
      const fromY = fromRect.top + fromRect.height / 2
      const toX = toRect.left + toRect.width / 2
      const toY = toRect.top + toRect.height / 2

      // Create a curved path
      const midX = (fromX + toX) / 2
      const midY = (fromY + toY) / 2
      const curve = 50

      setPath(`M ${fromX} ${fromY} Q ${midX} ${midY - curve} ${toX} ${toY}`)
    }

    updatePath()
    window.addEventListener('resize', updatePath)
    return () => window.removeEventListener('resize', updatePath)
  }, [from, to])

  return (
    <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <path
        d={path}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="2"
        strokeDasharray="5,5"
      />
    </svg>
  )
}

// Service Card Component
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const Icon = service.icon
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={cardRef}
      id={service.id}
      className="absolute w-32 h-32"
      style={{
        left: '50%',
        top: '50%',
        x: service.position.x - 64,
        y: service.position.y - 64,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
    >
      <motion.div
        className="relative w-full h-full cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
        whileHover={{ scale: 1.1 }}
        style={{
          transformStyle: 'preserve-3d',
          transformPerspective: 1000,
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 rounded-2xl ${service.color} border-2 border-white shadow-lg flex flex-col items-center justify-center p-4`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <Icon className="w-8 h-8 mb-2" />
          <p className="text-xs font-medium text-center">{service.title}</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl bg-gray-800 text-white flex items-center justify-center p-4"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <p className="text-xs text-center">Click for details</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Main Component
export function GraphPortfolio() {
  const mainCardRef = useRef<HTMLDivElement>(null)
  const [serviceRefs, setServiceRefs] = useState<(HTMLElement | null)[]>([])

  useEffect(() => {
    // Get all service card elements
    const refs = services.map(service => document.getElementById(service.id))
    setServiceRefs(refs)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="relative w-full max-w-4xl h-[600px]">
        {/* Connection Lines */}
        {serviceRefs.map((serviceRef, index) => (
          <ConnectionLine
            key={index}
            from={mainCardRef.current}
            to={serviceRef}
          />
        ))}

        {/* Main Center Card */}
        <motion.div
          ref={mainCardRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring" }}
        >
          <div className="bg-white rounded-3xl shadow-xl p-8 w-80">
            {/* Profile */}
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-10 h-10 text-gray-600" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">S.STUDIO</h1>
            <p className="text-center text-gray-600 mb-6">Creative Digital Solutions</p>

            {/* Roles */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                Web Designer
              </span>
              <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                Developer
              </span>
              <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                Personal Trainer
              </span>
              <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                SEO Writer
              </span>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-3">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Service Cards */}
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </div>
  )
}