import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { PenTool, Check } from "lucide-react"
import Link from "next/link"

const features = [
  "レスポンシブデザイン対応",
  "SEOに最適化されたコード設計",
  "高速なページ読み込み速度",
  "ユーザビリティを重視したUI/UX",
  "ブランドアイデンティティの確立",
  "継続的なメンテナンスサポート"
]

export default function WebDesignPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-200 rounded-2xl mb-6">
                  <PenTool className="w-10 h-10 text-gray-700" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  WEBデザイン
                </h1>
                <p className="text-lg text-gray-600">
                  美しく機能的なウェブサイトでビジネスの成長を加速させます
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">サービス内容</h2>
                  <p className="text-gray-600 leading-relaxed">
                    最新のウェブ技術とデザイントレンドを活用し、ビジネスの目的に合わせた効果的なウェブサイトを制作します。
                    ユーザー体験を最優先に考え、美しさと機能性を両立したデザインを提供します。
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
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">ランディングページ</h3>
                      <p className="text-3xl font-bold text-gray-900 mb-2">¥150,000<span className="text-base font-normal text-gray-600">〜</span></p>
                      <p className="text-sm text-gray-600">1ページのシンプルなサイト</p>
                    </div>
                    <div className="p-6 bg-gray-900 text-white rounded-xl">
                      <h3 className="text-xl font-semibold mb-2">コーポレートサイト</h3>
                      <p className="text-3xl font-bold mb-2">¥500,000<span className="text-base font-normal opacity-80">〜</span></p>
                      <p className="text-sm opacity-80">5-10ページの企業サイト</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">ECサイト</h3>
                      <p className="text-3xl font-bold text-gray-900 mb-2">¥800,000<span className="text-base font-normal text-gray-600">〜</span></p>
                      <p className="text-sm text-gray-600">オンラインショップの構築</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link href="/contact">
                  <button className="px-8 py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                    無料見積もりを依頼
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