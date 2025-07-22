"use client"

import { motion } from "framer-motion"

export function GeometricBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:100px_100px]" />
      
      {/* Animated geometric shapes */}
      <motion.div
        className="absolute top-20 left-20 w-64 h-64 border-2 border-gray-200"
        animate={{
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      />
      
      <motion.div
        className="absolute bottom-32 right-32 w-48 h-48 border-2 border-gray-300"
        animate={{
          rotate: [360, 270, 180, 90, 0],
        }}
        transition={{
          duration: 15,
          ease: "linear",
          repeat: Infinity,
        }}
      />
      
      <motion.div
        className="absolute top-1/2 left-1/3 w-32 h-32 bg-gray-100"
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
      
      {/* Floating lines */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-gray-200"
          style={{
            width: '1px',
            height: `${Math.random() * 300 + 100}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-50, 50, -50],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}