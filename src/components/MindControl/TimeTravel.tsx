"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Sphere, Box, Text } from '@react-three/drei'

interface TimelineEvent {
  year: number
  title: string
  description: string
  type: 'project' | 'achievement' | 'learning'
}

const timeline: TimelineEvent[] = [
  { year: 2020, title: "Web開発開始", description: "HTMLから始めた旅", type: "learning" },
  { year: 2021, title: "React習得", description: "モダンフロントエンドへ", type: "learning" },
  { year: 2022, title: "フリーランス独立", description: "S.STUDIO設立", type: "achievement" },
  { year: 2023, title: "大規模プロジェクト", description: "100万人が使うアプリ開発", type: "project" },
  { year: 2024, title: "AI統合", description: "次世代サービス展開", type: "project" },
  { year: 2025, title: "現在", description: "あなたと出会う", type: "achievement" },
  { year: 2030, title: "グローバル展開", description: "世界を変えるサービス", type: "project" },
  { year: 2050, title: "技術革新", description: "人類の進化に貢献", type: "achievement" },
  { year: 2125, title: "時空を超えて", description: "無限の可能性", type: "project" }
]

export function TimeTravel() {
  const [currentYear, setCurrentYear] = useState(2025)
  const [isTimeTraveling, setIsTimeTraveling] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)
  
  const travelToYear = (year: number) => {
    setIsTimeTraveling(true)
    
    // 時間旅行アニメーション
    const duration = Math.abs(year - currentYear) * 10
    const steps = 50
    const stepDuration = duration / steps
    
    let step = 0
    const interval = setInterval(() => {
      step++
      const progress = step / steps
      const newYear = Math.round(currentYear + (year - currentYear) * progress)
      setCurrentYear(newYear)
      
      if (step >= steps) {
        clearInterval(interval)
        setIsTimeTraveling(false)
        const event = timeline.find(e => e.year === year)
        if (event) setSelectedEvent(event)
      }
    }, stepDuration)
  }
  
  return (
    <section className="min-h-screen relative bg-gray-50 overflow-hidden">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          
          {/* 時間の渦 */}
          <group rotation={[0, currentYear * 0.001, 0]}>
            {timeline.map((event, i) => {
              const angle = (i / timeline.length) * Math.PI * 2
              const radius = 5
              const y = (event.year - 2025) * 0.05
              
              return (
                <group
                  key={event.year}
                  position={[
                    Math.cos(angle) * radius,
                    y,
                    Math.sin(angle) * radius
                  ]}
                >
                  <Box
                    args={[0.5, 0.5, 0.5]}
                    onClick={() => travelToYear(event.year)}
                  >
                    <meshStandardMaterial
                      color={currentYear === event.year ? "#999" : "#e5e5e5"}
                      emissive={currentYear === event.year ? "#666" : "#000"}
                      emissiveIntensity={currentYear === event.year ? 0.3 : 0}
                    />
                  </Box>
                  <Text
                    position={[0, 0.8, 0]}
                    fontSize={0.2}
                    color="#666"
                    anchorX="center"
                  >
                    {event.year}
                  </Text>
                </group>
              )
            })}
          </group>
        </Canvas>
      </div>
      
      <div className="relative z-10 p-10">
        <motion.h2
          className="text-6xl font-thin text-gray-300 tracking-[0.3em] mb-8"
          animate={{ opacity: isTimeTraveling ? 0.3 : 1 }}
        >
          TIME TRAVEL
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <motion.div
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-8"
              animate={{
                scale: isTimeTraveling ? 0.95 : 1,
                rotateY: isTimeTraveling ? 180 : 0
              }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-8xl font-thin text-gray-300 mb-4">
                {currentYear}
              </h3>
              
              <AnimatePresence mode="wait">
                {isTimeTraveling ? (
                  <motion.p
                    key="traveling"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-gray-500"
                  >
                    時空を移動中...
                  </motion.p>
                ) : (
                  <motion.div
                    key="arrived"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    {selectedEvent && (
                      <>
                        <h4 className="text-2xl text-gray-700 mb-2">
                          {selectedEvent.title}
                        </h4>
                        <p className="text-gray-500 mb-4">
                          {selectedEvent.description}
                        </p>
                        <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600">
                          {selectedEvent.type}
                        </span>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm text-gray-400 tracking-[0.2em]">
              TIMELINE NAVIGATOR
            </h3>
            
            <div className="space-y-2">
              {timeline.map((event) => (
                <motion.button
                  key={event.year}
                  className={`w-full text-left p-4 rounded-2xl transition-colors ${
                    currentYear === event.year
                      ? 'bg-gray-200'
                      : 'bg-white hover:bg-gray-50'
                  }`}
                  onClick={() => travelToYear(event.year)}
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-700">{event.title}</p>
                      <p className="text-sm text-gray-400">{event.year}</p>
                    </div>
                    <motion.div
                      animate={{
                        rotate: currentYear === event.year ? 360 : 0
                      }}
                      transition={{ duration: 1 }}
                    >
                      →
                    </motion.div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}