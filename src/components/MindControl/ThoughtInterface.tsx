"use client"

import { useRef, useState, useEffect } from 'react'
import { motion, useAnimationControls } from 'framer-motion'

export function ThoughtInterface() {
  const [thoughts, setThoughts] = useState<string[]>([])
  const [brainwavePattern, setBrainwavePattern] = useState<number[]>([])
  const [mentalFocus, setMentalFocus] = useState(0.5)
  const controls = useAnimationControls()
  
  useEffect(() => {
    // シミュレート：脳波パターンの読み取り
    const interval = setInterval(() => {
      const newPattern = Array(20).fill(0).map(() => Math.random())
      setBrainwavePattern(newPattern)
      
      // 思考の検出
      if (Math.random() > 0.7) {
        const possibleThoughts = [
          "もっと詳しく見たい",
          "次のプロジェクトへ",
          "連絡を取りたい",
          "過去の作品を見る",
          "未来の可能性を探る"
        ]
        const thought = possibleThoughts[Math.floor(Math.random() * possibleThoughts.length)]
        setThoughts(prev => [...prev.slice(-4), thought])
        
        // 思考に応じてUIを変化
        handleThoughtAction(thought)
      }
      
      setMentalFocus(0.3 + Math.random() * 0.7)
    }, 100)
    
    return () => clearInterval(interval)
  }, [])
  
  const handleThoughtAction = (thought: string) => {
    controls.start({
      scale: [1, 1.1, 1],
      transition: { duration: 0.5 }
    })
    
    // 思考に応じてページ遷移やアクション
    if (thought.includes("次")) {
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  return (
    <div className="fixed top-20 left-8 z-40">
      <motion.div
        className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 w-80"
        animate={controls}
      >
        <h3 className="text-sm text-gray-400 tracking-[0.2em] mb-4">
          THOUGHT INTERFACE
        </h3>
        
        {/* 脳波ビジュアライザー */}
        <div className="h-20 mb-4 relative overflow-hidden">
          <svg className="w-full h-full">
            <polyline
              points={brainwavePattern.map((v, i) => `${i * 16},${40 - v * 40}`).join(' ')}
              fill="none"
              stroke="#d4d4d4"
              strokeWidth="1"
            />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white" />
        </div>
        
        {/* メンタルフォーカスゲージ */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">Mental Focus</p>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gray-300"
              animate={{ width: `${mentalFocus * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
        
        {/* 検出された思考 */}
        <div className="space-y-2">
          <p className="text-xs text-gray-500">Detected Thoughts</p>
          {thoughts.map((thought, i) => (
            <motion.div
              key={`${thought}-${i}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm text-gray-600 italic"
            >
              "{thought}"
            </motion.div>
          ))}
        </div>
        
        <p className="text-xs text-gray-400 mt-4">
          Just think about what you want to do
        </p>
      </motion.div>
    </div>
  )
}