"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { useRef } from "react"

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      <motion.div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:50px_50px]"
        style={{ y }}
      />
      
      <motion.div className="container relative z-10 mx-auto px-4 text-center" style={{ opacity }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-12"
        >
          <motion.div
            initial={{ scale: 0.8, rotateX: -30 }}
            animate={{ scale: 1, rotateX: 0 }}
            transition={{ 
              duration: 1.2,
              ease: [0.19, 1, 0.22, 1]
            }}
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
          >
            <motion.h1 
              className="text-7xl md:text-9xl font-black tracking-tighter text-gray-800"
              whileHover={{ 
                scale: 1.05,
                textShadow: "10px 10px 20px rgba(0,0,0,0.1)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              S.STUDIO
            </motion.h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <p className="mx-auto max-w-3xl text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
              デジタルの可能性を、現実のビジネス価値へ
            </p>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-4 text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, staggerChildren: 0.1 }}
            >
              {["パーソナルトレーニング", "WEBデザイン", "SEOライティング", "アプリケーション開発"].map((service, i) => (
                <motion.span
                  key={service}
                  className="px-4 py-2 bg-gray-100 rounded-full text-sm"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: "#e5e5e5",
                    y: -5
                  }}
                >
                  {service}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-6 pt-8"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                y: -5
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 bg-gray-800 text-white font-medium text-lg overflow-hidden transition-all"
            >
              <motion.span
                className="absolute inset-0 bg-gray-700"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">サービスを見る</span>
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
                y: -5
              }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white text-gray-800 font-medium text-lg border-2 border-gray-300 hover:bg-gray-50 transition-all"
            >
              お問い合わせ
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            y: [0, 10, 0] 
          }}
          transition={{ 
            opacity: { delay: 1, duration: 0.5 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <ArrowDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </motion.div>

      {/* 3D floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotateZ: [0, 360],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          >
            <div className="w-8 h-8 bg-gray-200 opacity-30" style={{
              transform: "rotateX(45deg) rotateY(45deg)",
              transformStyle: "preserve-3d",
            }} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}