import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { Search, Check } from "lucide-react"
import Link from "next/link"

const features = [
  "キーワードリサーチと競合分析",
  "検索意図に基づいたコンテンツ設計",
  "読みやすく魅力的な文章作成",
  "内部SEO最適化（メタデータ、見出し構造）",
  "定期的な効果測定とレポート",
  "コンテンツの更新・リライト対応"
]

export default function SEOWritingPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-200 rounded-2xl mb-6">
                  <Search className="w-10 h-10 text-gray-700" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  SEOライティング
                </h1>
                <p className="text-lg text-gray-600">
                  検索上位表示を実現する高品質なコンテンツで集客力を向上
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">サービス内容</h2>
                  <p className="text-gray-600 leading-relaxed">
                    SEOの専門知識と優れたライティングスキルを組み合わせ、検索エンジンとユーザーの両方に評価される
                    コンテンツを作成します。長期的な検索順位向上と安定したトラフィック獲得を実現します。
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
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">単発記事作成</h3>
                      <p className="text-3xl font-bold text-gray-900 mb-2">¥30,000<span className="text-base font-normal text-gray-600">/記事</span></p>
                      <p className="text-sm text-gray-600">2,000-3,000文字の記事1本</p>
                    </div>
                    <div className="p-6 bg-gray-900 text-white rounded-xl">
                      <h3 className="text-xl font-semibold mb-2">月額プラン</h3>
                      <p className="text-3xl font-bold mb-2">¥150,000<span className="text-base font-normal opacity-80">/月</span></p>
                      <p className="text-sm opacity-80">月5記事 + SEO戦略立案</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">プレミアムプラン</h3>
                      <p className="text-3xl font-bold text-gray-900 mb-2">¥300,000<span className="text-base font-normal text-gray-600">/月</span></p>
                      <p className="text-sm text-gray-600">月10記事 + 完全SEOサポート</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link href="/contact">
                  <button className="px-8 py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                    無料相談を申し込む
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