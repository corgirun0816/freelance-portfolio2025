"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { GridContainer, GridItem } from "./GridContainer"
import { LiquidGlass } from "./LiquidGlass"
import Link from "next/link"

interface ServiceSectionProps {
  title: string
  subtitle: string
  description: string
  features: string[]
  href: string
  index: number
}

function ServiceSection({ title, subtitle, description, features, href, index }: ServiceSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const x = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])

  return (
    <motion.section
      ref={ref}
      className="min-h-screen flex items-center py-20"
      style={{ opacity }}
    >
      <motion.div 
        className="w-full px-4 md:px-8"
        style={{ x, scale }}
      >
        <GridContainer gap={1}>
          <GridItem span={12}>
            <LiquidGlass className="p-8 md:p-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-3xl md:text-5xl font-thin tracking-[0.2em] text-gray-500 mb-2">
                    {title}
                  </h2>
                  <p className="text-xl text-gray-400 mb-6">{subtitle}</p>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    {description}
                  </p>
                  <Link href={href}>
                    <motion.button
                      className="px-8 py-3 border border-gray-400 text-gray-500 tracking-wider hover:bg-gray-100 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      詳しく見る
                    </motion.button>
                  </Link>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="space-y-1"
                >
                  {features.map((feature, i) => (
                    <LiquidGlass key={i} className="p-4">
                      <p className="text-sm text-gray-600">{feature}</p>
                    </LiquidGlass>
                  ))}
                </motion.div>
              </div>
            </LiquidGlass>
          </GridItem>
        </GridContainer>
      </motion.div>
    </motion.section>
  )
}

export function ServiceSections() {
  const services = [
    {
      title: "TRAINING",
      subtitle: "パーソナルトレーニング",
      description: "一人ひとりの目標とライフスタイルに合わせた、完全オーダーメイドのトレーニングプログラムを提供します。",
      features: [
        "個別カウンセリング",
        "カスタマイズプログラム",
        "栄養アドバイス",
        "定期的なフィードバック"
      ],
      href: "/services/personal-training"
    },
    {
      title: "WEB DESIGN",
      subtitle: "WEBデザイン",
      description: "美しさと機能性を兼ね備えた、ユーザー中心のウェブデザインを創造します。",
      features: [
        "レスポンシブデザイン",
        "UI/UX設計",
        "ブランディング統合",
        "パフォーマンス最適化"
      ],
      href: "/services/web-design"
    },
    {
      title: "APP DEVELOPMENT",
      subtitle: "アプリケーション開発",
      description: "最新技術を活用し、スケーラブルで高性能なアプリケーションを開発します。",
      features: [
        "クロスプラットフォーム対応",
        "クラウド統合",
        "セキュアな実装",
        "継続的なサポート"
      ],
      href: "/services/app-development"
    },
    {
      title: "WRITING",
      subtitle: "SEOライティング",
      description: "検索エンジンとユーザーの両方に最適化された、価値あるコンテンツを作成します。",
      features: [
        "キーワード戦略",
        "コンテンツ最適化",
        "競合分析",
        "パフォーマンス測定"
      ],
      href: "/services/seo-writing"
    }
  ]

  return (
    <>
      {services.map((service, index) => (
        <ServiceSection key={service.title} {...service} index={index} />
      ))}
    </>
  )
}