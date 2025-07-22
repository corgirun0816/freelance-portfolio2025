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
          <GridItem span={12} className="mb-16">
            <LiquidGlass className="p-12 md:p-20">
              <motion.h1 
                className="text-5xl md:text-8xl font-thin tracking-[0.2em] text-gray-800 text-center"
                initial={{ letterSpacing: "0.5em", opacity: 0 }}
                animate={{ letterSpacing: "0.2em", opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                S.STUDIO
              </motion.h1>
              <motion.p
                className="text-center text-gray-600 tracking-[0.3em] mt-4 text-sm md:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                DIGITAL CRAFTSMANSHIP
              </motion.p>
            </LiquidGlass>
          </GridItem>

          <GridItem span={12}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
              {["PERSONAL TRAINING", "WEB DESIGN", "SEO WRITING", "APP DEVELOPMENT"].map((service, index) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.6,
                    delay: 0.8 + index * 0.1,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                >
                  <LiquidGlass className="p-6 md:p-8 h-full">
                    <p className="text-xs md:text-sm text-gray-600 tracking-wider text-center">
                      {service}
                    </p>
                  </LiquidGlass>
                </motion.div>
              ))}
            </div>
          </GridItem>

          <GridItem span={12} className="mt-16">
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <LiquidGlass className="px-12 py-4">
                <button className="text-gray-800 tracking-[0.2em] text-sm">
                  EXPLORE SERVICES
                </button>
              </LiquidGlass>
            </motion.div>
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