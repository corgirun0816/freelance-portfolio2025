"use client"

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { LiquidGlassCard } from './LiquidGlassCard'
import { LiquidGlassButton } from './LiquidGlassButton'
import { 
  Activity, 
  Palette, 
  Smartphone, 
  PenTool,
  Dumbbell,
  Globe,
  Code,
  Search
} from 'lucide-react'

const services = [
  {
    id: "training",
    title: "パーソナルトレーニング",
    description: "重力を無視したトレーニングで、あなたの限界を超える",
    icon: Dumbbell,
    color: "#ff6b6b",
    features: ["カスタマイズプログラム", "栄養指導", "メンタルサポート"]
  },
  {
    id: "web",
    title: "WEBデザイン",
    description: "物理法則に縛られない、流動的なデザイン体験",
    icon: Palette,
    color: "#4ecdc4",
    features: ["レスポンシブデザイン", "UI/UX設計", "ブランディング"]
  },
  {
    id: "app",
    title: "アプリ開発",
    description: "次元を超えたアプリケーションの創造",
    icon: Smartphone,
    color: "#45b7d1",
    features: ["iOS/Android", "ウェブアプリ", "クロスプラットフォーム"]
  },
  {
    id: "seo",
    title: "SEOライティング",
    description: "時空を超えて永遠に残るコンテンツ",
    icon: Search,
    color: "#f7b731",
    features: ["キーワード最適化", "コンテンツ戦略", "分析レポート"]
  }
]

export function LiquidGlassServices() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  return (
    <section ref={containerRef} className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            次世代のソリューションを提供します
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            const cardY = useTransform(
              scrollYProgress,
              [0, 1],
              [50 * (index % 2 === 0 ? 1 : -1), -50 * (index % 2 === 0 ? 1 : -1)]
            )

            return (
              <motion.div
                key={service.id}
                style={{ y: cardY }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <LiquidGlassCard
                  contrast="dark"
                  roundness={30}
                  padding={3}
                  glowColor={service.color}
                  className="h-full"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div 
                      className="p-3 rounded-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${service.color}30, ${service.color}10)`,
                        border: `1px solid ${service.color}50`
                      }}
                    >
                      <Icon size={28} style={{ color: service.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-300 mb-4">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: service.color }}
                        />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <LiquidGlassButton
                    contrast="dark"
                    roundness={25}
                    paddingX={4}
                    paddingY={2}
                    fontSize="0.95rem"
                    accentColor={service.color}
                    className="w-full"
                    onClick={() => console.log(`Learn more about ${service.title}`)}
                  >
                    詳細を見る →
                  </LiquidGlassButton>
                </LiquidGlassCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}