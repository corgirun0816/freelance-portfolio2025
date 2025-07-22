import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { motion } from "framer-motion"
import { Dumbbell, Check } from "lucide-react"
import Link from "next/link"

const features = [
  "個別カスタマイズされたトレーニングプログラム",
  "栄養指導とダイエットサポート",
  "定期的な進捗チェックと調整",
  "モチベーション維持のためのメンタルサポート",
  "オンライン・オフライン両方に対応",
  "初心者からアスリートまで幅広く対応"
]

export default function PersonalTrainingPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-200 rounded-2xl mb-6">
                  <Dumbbell className="w-10 h-10 text-gray-700" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  パーソナルトレーニング
                </h1>
                <p className="text-lg text-gray-600">
                  あなたの理想の体づくりを全力でサポートします
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">サービス内容</h2>
                  <p className="text-gray-600 leading-relaxed">
                    一人ひとりの目標、体力レベル、ライフスタイルに合わせた完全オーダーメイドのトレーニングプログラムを提供します。
                    科学的根拠に基づいた効果的なトレーニングと、継続可能な習慣づくりをサポートします。
                  </p>
                  <ul className="space-y-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">料金プラン</h2>
                  <div className="space-y-4">
                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">ベーシックプラン</h3>
                      <p className="text-3xl font-bold text-gray-900 mb-2">¥8,000<span className="text-base font-normal text-gray-600">/回</span></p>
                      <p className="text-sm text-gray-600">週1回のトレーニング（60分）</p>
                    </div>
                    <div className="p-6 bg-gray-900 text-white rounded-xl">
                      <h3 className="text-xl font-semibold mb-2">スタンダードプラン</h3>
                      <p className="text-3xl font-bold mb-2">¥15,000<span className="text-base font-normal opacity-80">/回</span></p>
                      <p className="text-sm opacity-80">週2回のトレーニング（60分）+ 栄養指導</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">プレミアムプラン</h3>
                      <p className="text-3xl font-bold text-gray-900 mb-2">¥25,000<span className="text-base font-normal text-gray-600">/回</span></p>
                      <p className="text-sm text-gray-600">週3回のトレーニング（60分）+ 完全サポート</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link href="/contact">
                  <button className="px-8 py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                    無料カウンセリングを予約
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}