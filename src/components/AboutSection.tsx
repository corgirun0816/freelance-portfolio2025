"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { GridContainer, GridItem } from "./GridContainer"
import { LiquidGlass } from "./LiquidGlass"

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1])

  return (
    <motion.section 
      ref={sectionRef}
      className="py-32 bg-gray-50/90 backdrop-blur-sm"
      style={{ scale }}
    >
      <div className="px-4 md:px-8">
        <GridContainer gap={1}>
          <GridItem span={12} className="mb-8">
            <LiquidGlass className="p-8">
              <h2 className="text-4xl md:text-6xl font-thin tracking-[0.2em] text-gray-500 text-center">
                ABOUT
              </h2>
            </LiquidGlass>
          </GridItem>

          <GridItem span={12} delay={0.2}>
            <GridContainer gap={1}>
              <GridItem span={12} className="md:col-span-8">
                <LiquidGlass className="p-8 md:p-12 h-full">
                  <h3 className="text-2xl font-light tracking-wider text-gray-500 mb-6">
                    DIGITAL EXCELLENCE
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    S.STUDIOは、デジタルの可能性を最大限に引き出し、
                    お客様のビジネスを次のステージへと導きます。
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    私たちは、美しさと機能性を兼ね備えたソリューションを通じて、
                    持続可能な価値を創造します。
                  </p>
                </LiquidGlass>
              </GridItem>

              <GridItem span={12} className="md:col-span-4">
                <div className="grid grid-cols-2 gap-1 h-full">
                  {[
                    { label: "PROJECTS", value: "150+" },
                    { label: "CLIENTS", value: "80+" },
                    { label: "YEARS", value: "5+" },
                    { label: "AWARDS", value: "12" },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <LiquidGlass className="p-6 h-full flex flex-col justify-center items-center">
                        <p className="text-3xl font-thin text-gray-500">{stat.value}</p>
                        <p className="text-xs tracking-wider text-gray-600 mt-2">{stat.label}</p>
                      </LiquidGlass>
                    </motion.div>
                  ))}
                </div>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    </motion.section>
  )
}