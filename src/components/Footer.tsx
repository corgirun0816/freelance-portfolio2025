"use client"

import Link from "next/link"
import { GridContainer, GridItem } from "./GridContainer"
import { LiquidGlass } from "./LiquidGlass"

export function Footer() {
  return (
    <footer className="bg-gray-50 py-16">
      <div className="px-4 md:px-8">
        <GridContainer gap={1}>
          <GridItem span={12} className="mb-8">
            <LiquidGlass className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-xl font-light tracking-[0.2em] text-gray-800 mb-4">S.STUDIO</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    プロフェッショナルなサービスで<br />
                    あなたのビジネスを成功に導きます
                  </p>
                </div>

                <div>
                  <h4 className="text-sm tracking-[0.2em] text-gray-700 mb-4">SERVICES</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="/services/personal-training" className="text-gray-600 hover:text-gray-800 transition-colors">
                        Personal Training
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/web-design" className="text-gray-600 hover:text-gray-800 transition-colors">
                        Web Design
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/seo-writing" className="text-gray-600 hover:text-gray-800 transition-colors">
                        SEO Writing
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/app-development" className="text-gray-600 hover:text-gray-800 transition-colors">
                        App Development
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm tracking-[0.2em] text-gray-700 mb-4">LINKS</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="/about" className="text-gray-600 hover:text-gray-800 transition-colors">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="text-gray-600 hover:text-gray-800 transition-colors">
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy" className="text-gray-600 hover:text-gray-800 transition-colors">
                        Privacy Policy
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm tracking-[0.2em] text-gray-700 mb-4">CONTACT</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>info@s-studio.com</p>
                    <p>+81 90-1234-5678</p>
                    <p>Tokyo, Japan</p>
                  </div>
                </div>
              </div>
            </LiquidGlass>
          </GridItem>

          <GridItem span={12}>
            <LiquidGlass className="p-4">
              <p className="text-center text-sm text-gray-600 tracking-wider">
                © 2024 S.STUDIO. ALL RIGHTS RESERVED.
              </p>
            </LiquidGlass>
          </GridItem>
        </GridContainer>
      </div>
    </footer>
  )
}