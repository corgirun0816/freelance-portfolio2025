import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { Code, Check } from "lucide-react"
import Link from "next/link"

const features = [
  "最新のフレームワークとテクノロジーを活用",
  "スケーラブルなアーキテクチャ設計",
  "セキュアで堅牢なコード実装",
  "継続的インテグレーション/デプロイメント",
  "クロスプラットフォーム対応",
  "アジャイル開発手法による柔軟な対応"
]

export default function AppDevelopmentPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-200 rounded-2xl mb-6">
                  <Code className="w-10 h-10 text-gray-700" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  アプリケーション開発
                </h1>
                <p className="text-lg text-gray-600">
                  革新的なアプリケーションでビジネスの可能性を広げます
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">サービス内容</h2>
                  <p className="text-gray-600 leading-relaxed">
                    ウェブアプリケーションからモバイルアプリまで、ビジネスニーズに合わせた
                    カスタムソリューションを開発します。最新技術を活用し、ユーザー体験と
                    パフォーマンスを最適化したアプリケーションを提供します。
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
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">MVP開発</h3>
                      <p className="text-3xl font-bold text-gray-900 mb-2">¥1,000,000<span className="text-base font-normal text-gray-600">〜</span></p>
                      <p className="text-sm text-gray-600">最小限の機能での製品開発</p>
                    </div>
                    <div className="p-6 bg-gray-900 text-white rounded-xl">
                      <h3 className="text-xl font-semibold mb-2">フルスタック開発</h3>
                      <p className="text-3xl font-bold mb-2">¥3,000,000<span className="text-base font-normal opacity-80">〜</span></p>
                      <p className="text-sm opacity-80">完全なウェブアプリケーション</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">エンタープライズ</h3>
                      <p className="text-3xl font-bold text-gray-900 mb-2">要相談</p>
                      <p className="text-sm text-gray-600">大規模システムの開発・統合</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link href="/contact">
                  <button className="px-8 py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                    プロジェクトの相談をする
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