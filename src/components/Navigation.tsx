"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { useState, useEffect } from "react"
import { LiquidGlass } from "./LiquidGlass"

const navItems = [
  { name: "HOME", href: "/" },
  { name: "SERVICES", href: "/#services" },
  { name: "ABOUT", href: "/about" },
  { name: "CONTACT", href: "/contact" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 100], [0, 1])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {isScrolled && (
        <motion.div 
          className="absolute inset-0 bg-white/80 backdrop-blur-2xl"
          style={{ opacity }}
        />
      )}
      
      <div className="relative z-10 px-4 md:px-8">
        <div className="grid grid-cols-12 gap-1 py-4">
          <div className="col-span-3">
            <LiquidGlass className="h-12 flex items-center px-4">
              <Link href="/" className="text-xl font-light tracking-[0.2em] text-gray-800">
                S.STUDIO
              </Link>
            </LiquidGlass>
          </div>
          
          <div className="col-span-9">
            <div className="grid grid-cols-4 gap-1 h-12">
              {navItems.map((item, index) => (
                <LiquidGlass key={item.name} delay={index * 0.1}>
                  <Link
                    href={item.href}
                    className="h-12 flex items-center justify-center text-sm tracking-widest text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    {item.name}
                  </Link>
                </LiquidGlass>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}