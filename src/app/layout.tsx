import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { PageTransitionProvider } from "@/components/PageTransitionProvider"

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-inter"
})

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
      <body className={`${inter.variable} font-sans min-h-screen bg-white text-gray-600 antialiased`}>
        <PageTransitionProvider>
          {children}
        </PageTransitionProvider>
      </body>
    </html>
  )
}