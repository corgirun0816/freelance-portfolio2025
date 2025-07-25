"use client"

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { LiquidGlassCard } from './LiquidGlassCard'
import { Calendar, Award, Rocket, Star } from 'lucide-react'

const timelineEvents = [
  {
    year: "2019",
    title: "Journey Begins",
    description: "フリーランスとしてのキャリアをスタート",
    icon: Rocket,
    color: "#ff6b6b"
  },
  {
    year: "2020",
    title: "Skill Expansion",
    description: "Web開発、アプリ開発のスキルを習得",
    icon: Star,
    color: "#4ecdc4"
  },
  {
    year: "2021",
    title: "Major Projects",
    description: "大規模プロジェクトの成功で評価を獲得",
    icon: Award,
    color: "#45b7d1"
  },
  {
    year: "2023",
    title: "New Horizons",
    description: "AI/ML技術を取り入れた次世代サービスを開始",
    icon: Calendar,
    color: "#f7b731"
  }
]

export function LiquidGlassTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

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
              Timeline
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            成長と革新の軌跡
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-transparent via-blue-400 to-transparent"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline events */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${
                    isEven ? 'md:justify-start' : 'md:justify-end'
                  }`}
                >
                  <div className={`w-full md:w-5/12 ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
                    <LiquidGlassCard
                      contrast="dark"
                      roundness={25}
                      padding={2.5}
                      glowColor={event.color}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div 
                          className="p-2 rounded-xl"
                          style={{
                            background: `linear-gradient(135deg, ${event.color}30, ${event.color}10)`,
                            border: `1px solid ${event.color}50`
                          }}
                        >
                          <Icon size={20} style={{ color: event.color }} />
                        </div>
                        <div className="text-2xl font-bold" style={{ color: event.color }}>
                          {event.year}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {event.description}
                      </p>
                    </LiquidGlassCard>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
                    <motion.div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: event.color }}
                      whileInView={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}