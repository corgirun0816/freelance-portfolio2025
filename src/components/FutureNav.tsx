"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import Link from "next/link"

export function FutureNav() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <motion.button
        className="fixed top-8 right-8 z-50 w-12 h-12 flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="relative w-6 h-6">
          <motion.span
            className="absolute left-0 w-6 h-px bg-gray-600"
            animate={{ 
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 0 : -8
            }}
          />
          <motion.span
            className="absolute left-0 w-6 h-px bg-gray-600"
            animate={{ 
              opacity: isOpen ? 0 : 1
            }}
          />
          <motion.span
            className="absolute left-0 w-6 h-px bg-gray-600"
            animate={{ 
              rotate: isOpen ? -45 : 0,
              y: isOpen ? 0 : 8
            }}
          />
        </div>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="h-full flex items-center justify-center">
              <nav className="text-center">
                {[
                  { name: "HOME", href: "/" },
                  { name: "TRAINING", href: "/services/personal-training" },
                  { name: "DESIGN", href: "/services/web-design" },
                  { name: "DEVELOP", href: "/services/app-development" },
                  { name: "WRITE", href: "/services/seo-writing" },
                ].map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="block py-4 text-4xl font-thin text-gray-600 hover:text-gray-400 transition-colors tracking-[0.2em]"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}