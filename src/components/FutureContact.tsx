"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export function FutureContact() {
  const [email, setEmail] = useState("")
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        <motion.h2
          className="text-6xl md:text-8xl font-thin text-gray-200 text-center mb-16 tracking-[0.2em]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          CONNECT
        </motion.h2>
        
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="YOUR EMAIL"
            className="w-full px-0 py-8 text-2xl md:text-4xl font-thin text-gray-600 bg-transparent border-b border-gray-300 focus:border-gray-500 outline-none transition-colors tracking-wider placeholder:text-gray-300"
          />
          
          <motion.button
            className="absolute right-0 top-1/2 -translate-y-1/2 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="w-16 h-16 rounded-full border border-gray-400 flex items-center justify-center"
              animate={{ 
                borderColor: isHovered ? "#9ca3af" : "#d1d5db",
                rotate: isHovered ? 90 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" className="text-gray-500"/>
              </svg>
            </motion.div>
          </motion.button>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {[
            { label: "EMAIL", value: "hello@future.studio" },
            { label: "PHONE", value: "+81 90 0000 0000" },
            { label: "LOCATION", value: "TOKYO, JAPAN" }
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.1 }}
            >
              <p className="text-xs text-gray-400 tracking-[0.2em] mb-2">{item.label}</p>
              <p className="text-gray-600">{item.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}