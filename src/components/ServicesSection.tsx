"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { useRef } from "react"
import { GridContainer, GridItem } from "./GridContainer"
import { LiquidGlass } from "./LiquidGlass"

const services = [
  {
    title: "PERSONAL TRAINING",
    subtitle: "パーソナルトレーニング",
    description: "あなたの目標に合わせた個別のトレーニングプログラムを作成",
    href: "/services/personal-training",
  },
  {
    title: "WEB DESIGN", 
    subtitle: "WEBデザイン",
    description: "ユーザー体験を重視した美しく機能的なウェブサイトをデザイン",
    href: "/services/web-design",
  },
  {
    title: "SEO WRITING",
    subtitle: "SEOライティング", 
    description: "検索エンジンに最適化された高品質なコンテンツを作成",
    href: "/services/seo-writing",
  },
  {
    title: "APP DEVELOPMENT",
    subtitle: "アプリケーション開発",
    description: "最新技術を活用した高性能なアプリケーションを開発",
    href: "/services/app-development",
  },
]

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.section 
      ref={sectionRef}
      className="py-32 bg-white/90 backdrop-blur-sm"
      style={{ opacity }}
    >
      <div className="px-4 md:px-8">
        <GridContainer gap={1}>
          <GridItem span={12} className="mb-16">
            <LiquidGlass className="p-8">
              <h2 className="text-4xl md:text-6xl font-thin tracking-[0.2em] text-gray-500 text-center">
                SERVICES
              </h2>
            </LiquidGlass>
          </GridItem>

          {services.map((service, index) => (
            <GridItem key={service.title} span={12} delay={index * 0.1} className="mb-1">
              <Link href={service.href}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <LiquidGlass>
                    <div className="grid grid-cols-12 gap-1 p-8 md:p-12">
                      <div className="col-span-12 md:col-span-3">
                        <h3 className="text-sm tracking-[0.2em] text-gray-600 mb-2">
                          {service.title}
                        </h3>
                        <p className="text-lg text-gray-500">
                          {service.subtitle}
                        </p>
                      </div>
                      <div className="col-span-12 md:col-span-7 mt-4 md:mt-0">
                        <p className="text-gray-600 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                      <div className="col-span-12 md:col-span-2 flex items-center justify-end mt-4 md:mt-0">
                        <motion.div
                          className="text-gray-400"
                          whileHover={{ x: 10, color: "#1f2937" }}
                          transition={{ duration: 0.3 }}
                        >
                          <span className="text-2xl font-thin">→</span>
                        </motion.div>
                      </div>
                    </div>
                  </LiquidGlass>
                </motion.div>
              </Link>
            </GridItem>
          ))}
        </GridContainer>
      </div>
    </motion.section>
  )
}