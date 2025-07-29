"use client"

import { useEffect, useRef, useState } from 'react'
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
    description: 'UI/UX Design',
    icon: Palette,
    position: { x: 0, y: -300 }
  },
  {
    id: 'development',
    title: 'Developer',
    description: 'React & Next.js',
    icon: Code2,
    position: { x: 300, y: 0 }
  },
  {
    id: 'training',
    title: 'Personal Trainer',
    description: 'Fitness & Health',
    icon: Dumbbell,
    position: { x: 0, y: 300 }
  },
  {
    id: 'seo-writing',
    title: 'SEO Writer',
    description: 'Content Creation',
    icon: PenTool,
    position: { x: -300, y: 0 }
  }
]

// Service Card Component
function ServiceCard({ service }: { service: typeof services[0] }) {
  const Icon = service.icon

  return (
    <motion.div
      className="absolute bg-white rounded-2xl shadow-lg p-6 w-64"
      style={{
        left: '50%',
        top: '50%',
        x: service.position.x - 128,
        y: service.position.y - 64,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3, type: "spring" }}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-gray-700" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
          <p className="text-sm text-gray-600">{service.description}</p>
        </div>
      </div>
    </motion.div>
  )
}

// Main Component
export function SimpleGraphPortfolio() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height)

    // Set line style
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])

    // Center position
    const centerX = dimensions.width / 2
    const centerY = dimensions.height / 2

    // Draw lines to each service
    services.forEach(service => {
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + service.position.x, centerY + service.position.y)
      ctx.stroke()
    })
  }, [dimensions])

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="relative w-full max-w-5xl h-[700px]">
        {/* Connection Lines Canvas */}
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
        />

        {/* Main Center Card */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring" }}
        >
          <div className="bg-white rounded-3xl shadow-xl p-8 w-80">
            {/* Profile */}
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                <User className="w-10 h-10 text-gray-600" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">S.STUDIO</h1>
            <p className="text-center text-gray-600 mb-6">Creative Digital Solutions</p>

            {/* Roles */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <span className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-700">
                Web Designer
              </span>
              <span className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-700">
                Developer
              </span>
              <span className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-700">
                Personal Trainer
              </span>
              <span className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-700">
                SEO Writer
              </span>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Service Cards */}
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  )
}