"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { GridContainer, GridItem } from "./GridContainer"
import { LiquidGlass } from "./LiquidGlass"

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center">
      <motion.div className="w-full px-4 md:px-8 py-32" style={{ y, opacity }}>
        <GridContainer gap={1}>
          <GridItem span={12}>
            <LiquidGlass className="p-12 md:p-20">
              <motion.h1 
                className="text-6xl md:text-9xl font-thin tracking-[0.3em] text-gray-800 text-center"
                initial={{ letterSpacing: "0.5em", opacity: 0 }}
                animate={{ letterSpacing: "0.3em", opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                S.STUDIO
              </motion.h1>
            </LiquidGlass>
          </GridItem>
        </GridContainer>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-px h-16 bg-gray-300" />
      </motion.div>
    </section>
  )
}