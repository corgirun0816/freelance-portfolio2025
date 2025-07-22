"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AIPersonality {
  name: string
  traits: string[]
  greeting: string
  expertise: string
}

export function EvolvingAI() {
  const [visitorData, setVisitorData] = useState({
    interests: [] as string[],
    timeSpent: 0,
    interactions: 0,
    preference: 'unknown'
  })
  
  const [aiPersonality, setAIPersonality] = useState<AIPersonality>({
    name: "ARIA",
    traits: ["好奇心旺盛", "適応的", "創造的"],
    greeting: "はじめまして。私はARIA、あなたに最適化されたAIアシスタントです。",
    expertise: "全般"
  })
  
  const [messages, setMessages] = useState<string[]>([])
  const [isEvolving, setIsEvolving] = useState(false)
  
  useEffect(() => {
    // 訪問者の行動を追跡
    const timer = setInterval(() => {
      setVisitorData(prev => ({
        ...prev,
        timeSpent: prev.timeSpent + 1
      }))
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])
  
  useEffect(() => {
    // AIの進化
    if (visitorData.timeSpent > 10 && visitorData.timeSpent % 10 === 0) {
      evolveAI()
    }
  }, [visitorData.timeSpent])
  
  const trackInteraction = (type: string) => {
    setVisitorData(prev => ({
      ...prev,
      interactions: prev.interactions + 1,
      interests: [...prev.interests, type].slice(-5)
    }))
  }
  
  const evolveAI = () => {
    setIsEvolving(true)
    
    // 訪問者の興味に基づいてAIを進化
    const interestCounts = visitorData.interests.reduce((acc, interest) => {
      acc[interest] = (acc[interest] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    const dominantInterest = Object.entries(interestCounts).sort((a, b) => b[1] - a[1])[0]?.[0]
    
    const personalities: Record<string, AIPersonality> = {
      training: {
        name: "TITAN",
        traits: ["エネルギッシュ", "モチベーショナル", "分析的"],
        greeting: "トレーニングに興味がおありですね！一緒に限界を超えましょう！",
        expertise: "フィットネス"
      },
      design: {
        name: "PIXEL",
        traits: ["美的センス", "革新的", "直感的"],
        greeting: "デザインの世界へようこそ。美しい体験を創造しましょう。",
        expertise: "デザイン"
      },
      development: {
        name: "BYTE",
        traits: ["論理的", "効率的", "問題解決型"],
        greeting: "コードの世界は無限の可能性。一緒に未来を構築しましょう。",
        expertise: "開発"
      },
      writing: {
        name: "PROSE",
        traits: ["表現豊か", "洞察力", "説得力"],
        greeting: "言葉には力があります。心に響くコンテンツを創りましょう。",
        expertise: "ライティング"
      }
    }
    
    if (dominantInterest && personalities[dominantInterest]) {
      setTimeout(() => {
        setAIPersonality(personalities[dominantInterest])
        setMessages(prev => [...prev, `私は進化しました。${personalities[dominantInterest].greeting}`])
        setIsEvolving(false)
      }, 2000)
    } else {
      setIsEvolving(false)
    }
  }
  
  return (
    <div className="fixed bottom-8 right-8 z-40">
      <motion.div
        className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 w-96 shadow-2xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
      >
        {/* AI アバター */}
        <div className="relative mb-6">
          <motion.div
            className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-gray-200 to-gray-300 relative overflow-hidden"
            animate={{
              scale: isEvolving ? [1, 1.2, 1] : 1,
              rotate: isEvolving ? 360 : 0
            }}
            transition={{ duration: 2 }}
          >
            <AnimatePresence>
              {isEvolving && (
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, repeat: 2 }}
                />
              )}
            </AnimatePresence>
            
            {/* AI の顔 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-3xl text-gray-600">
                {aiPersonality.name[0]}
              </div>
            </div>
          </motion.div>
          
          <motion.h3
            className="text-center mt-4 text-xl text-gray-700"
            key={aiPersonality.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {aiPersonality.name}
          </motion.h3>
          
          <div className="flex justify-center space-x-2 mt-2">
            {aiPersonality.traits.map((trait, i) => (
              <motion.span
                key={trait}
                className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                {trait}
              </motion.span>
            ))}
          </div>
        </div>
        
        {/* メッセージエリア */}
        <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
          <AnimatePresence>
            {messages.map((message, i) => (
              <motion.div
                key={`${message}-${i}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="text-sm text-gray-600 bg-gray-50 p-3 rounded-2xl"
              >
                {message}
              </motion.div>
            ))}
          </AnimatePresence>
          
          {messages.length === 0 && (
            <p className="text-sm text-gray-500 text-center">
              {aiPersonality.greeting}
            </p>
          )}
        </div>
        
        {/* インタラクションボタン */}
        <div className="grid grid-cols-2 gap-2">
          <button
            className="text-sm text-gray-600 bg-gray-100 p-2 rounded-xl hover:bg-gray-200 transition-colors"
            onClick={() => {
              trackInteraction('training')
              setMessages(prev => [...prev, "トレーニングについて詳しく教えます。"])
            }}
          >
            トレーニング
          </button>
          <button
            className="text-sm text-gray-600 bg-gray-100 p-2 rounded-xl hover:bg-gray-200 transition-colors"
            onClick={() => {
              trackInteraction('design')
              setMessages(prev => [...prev, "デザインの可能性を探りましょう。"])
            }}
          >
            デザイン
          </button>
          <button
            className="text-sm text-gray-600 bg-gray-100 p-2 rounded-xl hover:bg-gray-200 transition-colors"
            onClick={() => {
              trackInteraction('development')
              setMessages(prev => [...prev, "開発について話しましょう。"])
            }}
          >
            開発
          </button>
          <button
            className="text-sm text-gray-600 bg-gray-100 p-2 rounded-xl hover:bg-gray-200 transition-colors"
            onClick={() => {
              trackInteraction('writing')
              setMessages(prev => [...prev, "ライティングの極意をお教えします。"])
            }}
          >
            ライティング
          </button>
        </div>
        
        {/* 進化状態 */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">
            滞在時間: {visitorData.timeSpent}秒 | 
            インタラクション: {visitorData.interactions}回
          </p>
          <p className="text-xs text-gray-500 mt-1">
            私はあなたの興味に合わせて進化します
          </p>
        </div>
      </motion.div>
    </div>
  )
}