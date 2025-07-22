import type { Metadata } from "next"
import "./globals.css"
import { PageTransitionProvider } from "@/components/PageTransitionProvider"

export const metadata: Metadata = {
  title: "Freelance Services - Personal Training, Web Design, SEO & App Development",
  description: "Professional freelance services including personal training, web design, SEO writing, and application development.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <PageTransitionProvider>
          {children}
        </PageTransitionProvider>
      </body>
    </html>
  )
}