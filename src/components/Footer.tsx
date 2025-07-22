import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">S.STUDIO</h3>
            <p className="text-sm">
              プロフェッショナルなサービスであなたのビジネスを成功に導きます。
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/personal-training" className="hover:text-white transition-colors">
                  パーソナルトレーニング
                </Link>
              </li>
              <li>
                <Link href="/services/web-design" className="hover:text-white transition-colors">
                  WEBデザイン
                </Link>
              </li>
              <li>
                <Link href="/services/seo-writing" className="hover:text-white transition-colors">
                  SEOライティング
                </Link>
              </li>
              <li>
                <Link href="/services/app-development" className="hover:text-white transition-colors">
                  アプリケーション開発
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>info@freelance.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+81 90-1234-5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>Tokyo, Japan</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; 2024 S.STUDIO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}