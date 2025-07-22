"use client"

import { motion } from "framer-motion"
import { Dumbbell, Code, PenTool, Search, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const services = [
  {
    title: "パーソナルトレーニング",
    description: "あなたの目標に合わせた個別のトレーニングプログラムを作成し、理想の体づくりをサポートします。",
    icon: Dumbbell,
    href: "/services/personal-training",
    gradient: "from-purple-500 to-pink-500",
    shadowColor: "rgba(168, 85, 247, 0.4)",
  },
  {
    title: "WEBデザイン",
    description: "ユーザー体験を重視した美しく機能的なウェブサイトをデザイン・開発します。",
    icon: PenTool,
    href: "/services/web-design",
    gradient: "from-blue-500 to-cyan-500",
    shadowColor: "rgba(59, 130, 246, 0.4)",
  },
  {
    title: "SEOライティング",
    description: "検索エンジンに最適化された高品質なコンテンツを作成し、ウェブサイトの集客力を向上させます。",
    icon: Search,
    href: "/services/seo-writing",
    gradient: "from-green-500 to-teal-500",
    shadowColor: "rgba(34, 197, 94, 0.4)",
  },
  {
    title: "アプリケーション開発",
    description: "最新技術を活用した高性能なウェブ・モバイルアプリケーションを開発します。",
    icon: Code,
    href: "/services/app-development",
    gradient: "from-orange-500 to-red-500",
    shadowColor: "rgba(251, 146, 60, 0.4)",
  },
]

export function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/20 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="text-sm font-bold text-purple-600 bg-purple-100 px-4 py-2 rounded-full">
              OUR SERVICES
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">
            What We Offer
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            幅広い分野で専門的なサービスを提供し、あなたのビジネスの成長をサポートします
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link href={service.href}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="relative h-full p-8 rounded-2xl bg-white overflow-hidden group cursor-pointer transition-all duration-300"
                  style={{
                    boxShadow: hoveredIndex === index 
                      ? `0 20px 40px ${service.shadowColor}` 
                      : "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient}`} />
                  </div>
                  
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${service.gradient} p-4 text-white shadow-lg`}
                    >
                      <service.icon className="w-full h-full" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {service.description}
                    </p>

                    <motion.div 
                      className="inline-flex items-center text-gray-700 font-bold group-hover:text-purple-600 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      詳しく見る
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </motion.div>
                  </div>

                  <motion.div
                    className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full opacity-20"
                    style={{
                      background: `linear-gradient(135deg, ${service.gradient.split(' ')[1]} 0%, ${service.gradient.split(' ')[3]} 100%)`,
                    }}
                    animate={{
                      scale: hoveredIndex === index ? [1, 1.2, 1] : 1,
                    }}
                    transition={{
                      duration: 2,
                      repeat: hoveredIndex === index ? Infinity : 0,
                    }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}