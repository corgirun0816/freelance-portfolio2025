"use client"

import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

interface PageTransitionProviderProps {
  children: ReactNode
}

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    filter: "blur(10px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    filter: "blur(10px)",
  },
}


export function PageTransitionProvider({ children }: PageTransitionProviderProps) {
  const pathname = usePathname()

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div key={pathname + "-overlay"} className="fixed inset-0 z-50 pointer-events-none">
          <motion.div
            className="absolute inset-0 bg-gray-200 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ 
              scaleX: [0, 1, 1, 0],
              transition: {
                duration: 1.2,
                times: [0, 0.5, 0.5, 1],
                ease: "easeInOut",
              },
            }}
            exit={{ scaleX: 0 }}
          />
        </motion.div>
      </AnimatePresence>
      
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  )
}