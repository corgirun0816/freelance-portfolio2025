"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { GridContainer, GridItem } from "./GridContainer"
import { LiquidGlass } from "./LiquidGlass"
import Link from "next/link"

const services = [
  {
    title: "TRAINING",
    subtitle: "パーソナルトレーニング",
    description: "身体と心の調和を追求する、オーガニックなトレーニング体験",
    cells: ["FITNESS", "NUTRITION", "MINDFULNESS"],
    href: "/services/personal-training",
    gradient: "from-gray-100 to-gray-200"
  },
  {
    title: "WEBDESIGN",
    subtitle: "WEBデザイン",
    description: "生命体のように成長し進化する、有機的なデジタル体験",
    cells: ["UI/UX", "MOTION", "INTERACTION"],
    href: "/services/web-design",
    gradient: "from-gray-200 to-gray-100"
  },
  {
    title: "APP DEV",
    subtitle: "アプリケーション開発",
    description: "エコシステムのように繋がり、共生するアプリケーション",
    cells: ["MOBILE", "WEB", "CLOUD"],
    href: "/services/app-development",
    gradient: "from-gray-100 to-gray-200"
  },
  {
    title: "WRITING",
    subtitle: "SEOライティング",
    description: "情報の海を泳ぐ、生きたコンテンツの創造",
    cells: ["SEO", "CONTENT", "STRATEGY"],
    href: "/services/seo-writing",
    gradient: "from-gray-200 to-gray-100"
  }
]

function ServiceCell({ service, index }: { service: typeof services[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])
  
  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className="mb-32"
    >
      <GridContainer gap={1}>
        <GridItem span={12}>
          <LiquidGlass className="overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-10`} />
            <div className="relative z-10 p-8 md:p-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-4xl md:text-6xl font-thin tracking-[0.2em] text-gray-500 mb-2">
                  {service.title}
                </h2>
                <p className="text-lg text-gray-400 mb-6">{service.subtitle}</p>
                <p className="text-gray-600 leading-relaxed max-w-2xl mb-8">
                  {service.description}
                </p>
              </motion.div>
              
              <motion.div 
                className="grid grid-cols-3 gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {service.cells.map((cell, i) => (
                  <motion.div
                    key={cell}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                  >
                    <LiquidGlass className="p-4 text-center">
                      <p className="text-xs text-gray-500 tracking-wider">{cell}</p>
                    </LiquidGlass>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                <Link href={service.href}>
                  <motion.button
                    className="px-8 py-3 border border-gray-400 text-gray-500 tracking-wider hover:bg-gray-100 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    EXPLORE
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </LiquidGlass>
        </GridItem>
      </GridContainer>
    </motion.div>
  )
}

export function VolvoxServices() {
  return (
    <section className="py-32 relative">
      <div className="px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-thin tracking-[0.3em] text-gray-500 mb-4">
            ECOSYSTEM
          </h2>
          <p className="text-gray-400 tracking-wider">
            相互に繋がり、成長する4つのサービス
          </p>
        </motion.div>
        
        {services.map((service, index) => (
          <ServiceCell key={service.title} service={service} index={index} />
        ))}
      </div>
    </section>
  )
}