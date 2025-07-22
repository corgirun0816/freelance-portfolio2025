"use client"

import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

interface PageTransitionProviderProps {
  children: ReactNode
}

export function PageTransitionProvider({ children }: PageTransitionProviderProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none"
          initial={{ scaleX: 0 }}
          animate={{ 
            scaleX: [0, 1, 1, 0],
          }}
          transition={{
            duration: 1.2,
            times: [0, 0.4, 0.6, 1],
            ease: "easeInOut",
          }}
          style={{ 
            originX: 0,
            background: "linear-gradient(90deg, #f5f5f5 0%, #e5e5e5 50%, #f5f5f5 100%)"
          }}
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.2,
            ease: "easeOut"
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}