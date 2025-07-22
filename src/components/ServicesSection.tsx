"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Dumbbell, Code, PenTool, Search } from "lucide-react"
import Link from "next/link"
import { useRef, useState } from "react"

const services = [
  {
    title: "パーソナルトレーニング",
    description: "あなたの目標に合わせた個別のトレーニングプログラムを作成し、理想の体づくりをサポートします。",
    icon: Dumbbell,
    href: "/services/personal-training",
  },
  {
    title: "WEBデザイン",
    description: "ユーザー体験を重視した美しく機能的なウェブサイトをデザイン・開発します。",
    icon: PenTool,
    href: "/services/web-design",
  },
  {
    title: "SEOライティング",
    description: "検索エンジンに最適化された高品質なコンテンツを作成し、ウェブサイトの集客力を向上させます。",
    icon: Search,
    href: "/services/seo-writing",
  },
  {
    title: "アプリケーション開発",
    description: "最新技術を活用した高性能なウェブ・モバイルアプリケーションを開発します。",
    icon: Code,
    href: "/services/app-development",
  },
]

function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transformStyle: "preserve-3d" }}
      whileHover={{ z: 50 }}
    >
      <Link href={service.href}>
        <motion.div
          className="relative h-[400px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden cursor-pointer group"
          whileHover={{ 
            rotateY: 5,
            rotateX: -5,
            scale: 1.02,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            transformStyle: "preserve-3d",
            boxShadow: isHovered 
              ? "20px 20px 60px rgba(0,0,0,0.15), -20px -20px 60px rgba(255,255,255,0.9)"
              : "10px 10px 30px rgba(0,0,0,0.1), -10px -10px 30px rgba(255,255,255,0.9)",
          }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,#e5e5e5_25%,transparent_25%,transparent_75%,#e5e5e5_75%,#e5e5e5),linear-gradient(45deg,#e5e5e5_25%,transparent_25%,transparent_75%,#e5e5e5_75%,#e5e5e5)]" 
              style={{ 
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 10px 10px",
              }} 
            />
          </div>

          <div className="relative z-10 p-8 h-full flex flex-col">
            <motion.div
              className="w-20 h-20 mb-6 bg-white rounded-lg shadow-lg flex items-center justify-center"
              animate={isHovered ? { 
                rotateZ: 360,
                scale: 1.1,
              } : {}}
              transition={{ duration: 0.8 }}
              style={{ transform: "translateZ(40px)" }}
            >
              <service.icon className="w-10 h-10 text-gray-600" />
            </motion.div>

            <motion.h3 
              className="text-2xl font-bold text-gray-800 mb-4"
              style={{ transform: "translateZ(30px)" }}
            >
              {service.title}
            </motion.h3>
            
            <motion.p 
              className="text-gray-600 leading-relaxed flex-grow"
              style={{ transform: "translateZ(20px)" }}
            >
              {service.description}
            </motion.p>

            <motion.div 
              className="mt-6 inline-flex items-center text-gray-700 font-medium group-hover:text-gray-900"
              animate={isHovered ? { x: 10 } : { x: 0 }}
              style={{ transform: "translateZ(30px)" }}
            >
              詳しく見る
              <motion.span
                className="ml-2"
                animate={isHovered ? { x: 5 } : { x: 0 }}
              >
                →
              </motion.span>
            </motion.div>
          </div>

          {/* Animated background elements */}
          <motion.div
            className="absolute -top-10 -right-10 w-40 h-40 bg-gray-200 rounded-full opacity-10"
            animate={isHovered ? {
              scale: [1, 1.5, 1],
              rotate: 360,
            } : {}}
            transition={{ duration: 2 }}
          />
          
          <motion.div
            className="absolute -bottom-10 -left-10 w-32 h-32 bg-gray-300 rounded-full opacity-10"
            animate={isHovered ? {
              scale: [1, 1.3, 1],
              rotate: -360,
            } : {}}
            transition={{ duration: 2.5 }}
          />
        </motion.div>
      </Link>
    </motion.div>
  )
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <motion.section 
      ref={sectionRef}
      className="py-32 bg-white relative overflow-hidden"
      style={{ opacity, scale }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:100px_100px] opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-black text-gray-800 tracking-tight mb-4"
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            Services
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            専門性と創造性を融合させた、4つのコアサービス
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ perspective: 1000 }}>
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}