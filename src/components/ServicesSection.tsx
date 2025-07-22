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
    gradient: "from-gray-100 to-gray-200",
  },
  {
    title: "WEBデザイン",
    description: "ユーザー体験を重視した美しく機能的なウェブサイトをデザイン・開発します。",
    icon: PenTool,
    href: "/services/web-design",
    gradient: "from-gray-200 to-gray-300",
  },
  {
    title: "SEOライティング",
    description: "検索エンジンに最適化された高品質なコンテンツを作成し、ウェブサイトの集客力を向上させます。",
    icon: Search,
    href: "/services/seo-writing",
    gradient: "from-gray-100 to-gray-200",
  },
  {
    title: "アプリケーション開発",
    description: "最新技術を活用した高性能なウェブ・モバイルアプリケーションを開発します。",
    icon: Code,
    href: "/services/app-development",
    gradient: "from-gray-200 to-gray-300",
  },
]

export function ServicesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Services
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
            >
              <Link href={service.href}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative h-full p-8 rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 overflow-hidden group cursor-pointer"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center"
                    >
                      <service.icon className="w-8 h-8 text-gray-700" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>

                    <motion.div 
                      className="mt-6 inline-flex items-center text-gray-700 font-medium"
                      whileHover={{ x: 5 }}
                    >
                      詳しく見る
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </motion.div>
                  </div>

                  <motion.div
                    className="absolute -bottom-8 -right-8 w-32 h-32 bg-gray-200 rounded-full opacity-20 blur-2xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
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