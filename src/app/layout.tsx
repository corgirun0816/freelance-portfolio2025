import type { Metadata } from "next"
import "./globals.css"
import { PageTransitionProvider } from "@/components/PageTransitionProvider"

export const metadata: Metadata = {
  title: "S.STUDIO - Creative Digital Solutions",
  description: "S.STUDIOは、パーソナルトレーニング、WEBデザイン、SEOライティング、アプリケーション開発を提供するクリエイティブスタジオです。",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-white text-gray-800 antialiased">
        <PageTransitionProvider>
          {children}
        </PageTransitionProvider>
      </body>
    </html>
  )
}