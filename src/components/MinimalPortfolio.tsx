"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Code2, Palette, PenTool, Dumbbell,
  Mail, Instagram, Twitter, User
} from 'lucide-react'

// Service card data
const services = [
  {
    id: 'web-design',
    title: 'Web Designer',
    description: 'Creating beautiful and functional web experiences',
    icon: Palette,
    skills: ['UI/UX Design', 'Figma', 'Responsive Design']
  },
  {
    id: 'development',
    title: 'Developer',
    description: 'Building modern web applications with latest technologies',
    icon: Code2,
    skills: ['React', 'Next.js', 'TypeScript']
  },
  {
    id: 'training',
    title: 'Personal Trainer',
    description: 'Helping achieve fitness goals with personalized programs',
    icon: Dumbbell,
    skills: ['Fitness Planning', 'Nutrition', 'Wellness']
  },
  {
    id: 'seo-writing',
    title: 'SEO Writer',
    description: 'Crafting content that ranks and engages',
    icon: PenTool,
    skills: ['Content Strategy', 'SEO', 'Copywriting']
  }
]

// 3D Flip Card Component
function FlipCard({ service }: { service: typeof services[0] }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const Icon = service.icon

  return (
    <motion.div
      className="relative w-full h-64 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transformPerspective: 1000,
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl bg-white border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex flex-col h-full">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
              <Icon className="w-6 h-6 text-gray-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
            <p className="text-gray-600 text-sm flex-grow">{service.description}</p>
            <p className="text-xs text-gray-400 mt-4">Click to see skills →</p>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl bg-gray-900 text-white p-6 shadow-sm"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="flex flex-col h-full">
            <h3 className="text-xl font-semibold mb-4">Skills</h3>
            <div className="space-y-2">
              {service.skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                  <span className="text-gray-300">{skill}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-auto">Click to flip back →</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Main Component
export function MinimalPortfolio() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="pt-20 pb-10">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {/* Profile */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-12 h-12 text-gray-600" />
              </div>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">S.STUDIO</h1>
            
            {/* Subtitle */}
            <p className="text-xl text-gray-600 mb-8">
              Creative Digital Solutions
            </p>
            
            {/* Roles */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {['Web Designer', 'Developer', 'Personal Trainer', 'SEO Writer'].map((role, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-gray-200"
                >
                  {role}
                </span>
              ))}
            </div>
            
            {/* Social Links */}
            <div className="flex justify-center gap-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Services Grid */}
      <section className="py-10 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              >
                <FlipCard service={service} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 S.STUDIO. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}