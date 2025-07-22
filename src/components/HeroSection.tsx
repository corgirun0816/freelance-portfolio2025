"use client"

import { motion } from "framer-motion"
import { ArrowDown, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 opacity-50" />
      
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(600px at 0% 0%, rgba(102, 126, 234, 0.1) 0%, transparent 50%)",
            "radial-gradient(600px at 100% 100%, rgba(118, 75, 162, 0.1) 0%, transparent 50%)",
            "radial-gradient(600px at 0% 100%, rgba(240, 147, 251, 0.1) 0%, transparent 50%)",
            "radial-gradient(600px at 100% 0%, rgba(79, 172, 254, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <div
        className="absolute w-96 h-96 rounded-full opacity-30 blur-3xl"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          left: `${mousePosition.x * 0.05}px`,
          top: `${mousePosition.y * 0.05}px`,
          transform: "translate(-50%, -50%)",
        }}
      />
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect text-sm font-medium text-gray-700"
          >
            <Sparkles className="w-4 h-4" />
            Creative Digital Solutions
          </motion.div>

          <motion.h1 
            className="text-6xl md:text-8xl font-black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="block text-gray-900">S.STUDIO</span>
            <span className="block text-4xl md:text-5xl mt-4 gradient-text">
              Where Ideas Come to Life
            </span>
          </motion.h1>
          
          <motion.p 
            className="mx-auto max-w-2xl text-lg md:text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            パーソナルトレーニング、WEBデザイン、SEOライティング、アプリケーション開発。
            あなたのビジョンを現実に変える、プロフェッショナルなサービスを提供します。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
            >
              サービスを見る
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glass-effect text-gray-900 rounded-xl font-bold hover:bg-white/90 transition-all"
            >
              お問い合わせ
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  )
}