"use client"

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { InteractiveGraphView } from './InteractiveGraphView'
import { LiquidGlassNav } from './LiquidGlassNav'
import { LiquidGlassButton } from './LiquidGlassButton'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Sparkles, Layers, Network } from 'lucide-react'

export function SpatialLandingPage() {
  const [showTraditionalView, setShowTraditionalView] = useState(false)
  
  return (
    <div className="relative min-h-screen">
      <AnimatePresence mode="wait">
        {!showTraditionalView ? (
          <motion.div
            key="spatial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            {/* Floating Navigation */}
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              className="absolute top-0 left-0 right-0 z-20"
            >
              <div className="flex justify-between items-center p-6">
                <motion.h1 
                  className="text-3xl font-bold text-white"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  S.STUDIO
                </motion.h1>
                
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex gap-4"
                >
                  <LiquidGlassButton
                    onClick={() => setShowTraditionalView(true)}
                    contrast="dark"
                    className="flex items-center gap-2"
                  >
                    <Layers className="w-4 h-4" />
                    Traditional View
                  </LiquidGlassButton>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Interactive Graph */}
            <InteractiveGraphView />
            
            {/* Floating Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-6 left-6 z-20"
            >
              <Card className="p-6 bg-black/60 text-white border-white/20 backdrop-blur-md max-w-md">
                <div className="flex items-start gap-3 mb-4">
                  <Network className="w-6 h-6 text-[#a8c0ff] mt-1" />
                  <div>
                    <h2 className="text-xl font-bold mb-2">空間的ナビゲーション</h2>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      私たちのサービスとスキルを、インタラクティブな知識グラフとして探索できます。
                      各ノードは異なるサービスやプロジェクトを表し、つながりが関係性を示しています。
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge className="bg-[#a8c0ff]/20 text-[#a8c0ff] border-[#a8c0ff]/30">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Interactive
                  </Badge>
                  <Badge className="bg-[#3b82f6]/20 text-[#3b82f6] border-[#3b82f6]/30">
                    3D Navigation
                  </Badge>
                  <Badge className="bg-[#6b7280]/20 text-[#6b7280] border-[#6b7280]/30">
                    Knowledge Graph
                  </Badge>
                </div>
              </Card>
            </motion.div>
            
            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-6 right-6 z-20"
            >
              <LiquidGlassButton
                contrast="dark"
                className="flex items-center gap-2 text-lg px-6 py-3"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </LiquidGlassButton>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="traditional"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Traditional landing page content will go here */}
            <LiquidGlassNav />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-4">Traditional View</h2>
                <LiquidGlassButton
                  onClick={() => setShowTraditionalView(false)}
                  contrast="dark"
                  className="flex items-center gap-2 mx-auto"
                >
                  <Network className="w-4 h-4" />
                  Back to Spatial View
                </LiquidGlassButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}