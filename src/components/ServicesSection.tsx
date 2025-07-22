"use client"

import { motion } from "framer-motion"
import { Dumbbell, Code, PenTool, Search } from "lucide-react"
import Link from "next/link"

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

export function ServicesSection() {
  return (
    <section className="py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight">
            Services
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="border border-gray-200"
            >
              <Link href={service.href}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative h-full p-12 bg-white overflow-hidden group cursor-pointer"
                >
                  <motion.div
                    className="absolute inset-0 bg-gray-900"
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  />
                  
                  <div className="relative z-10">
                    <motion.div
                      className="w-16 h-16 mb-8"
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.5 }}
                    >
                      <service.icon className="w-full h-full text-gray-700 group-hover:text-white transition-colors duration-500" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-white transition-colors duration-500">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
                      {service.description}
                    </p>

                    <motion.div 
                      className="mt-8 inline-block"
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-gray-900 font-medium group-hover:text-white transition-colors duration-500">
                        詳しく見る →
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}