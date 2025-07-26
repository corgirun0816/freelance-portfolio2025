"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { LiquidGlassCard } from './LiquidGlassCard'
import { LiquidGlassButton } from './LiquidGlassButton'
import { Mail, MessageSquare, Send } from 'lucide-react'

export function LiquidGlassContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission here
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            プロジェクトのご相談をお待ちしています
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <LiquidGlassCard
              contrast="dark"
              roundness={30}
              padding={3}
              glowColor="#a8c0ff"
              className="h-full"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10">
                    <Mail size={24} className="text-blue-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Email</h4>
                    <p className="text-gray-300">contact@example.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500/20 to-teal-500/20 border border-white/10">
                    <MessageSquare size={24} className="text-green-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Response Time</h4>
                    <p className="text-gray-300">通常24時間以内にご返信します</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-white/10">
                <p className="text-gray-300 text-sm">
                  お気軽にお問い合わせください。プロジェクトの規模に関わらず、
                  最適なソリューションをご提案いたします。
                </p>
              </div>
            </LiquidGlassCard>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <LiquidGlassCard
              contrast="dark"
              roundness={30}
              padding={3}
              glowColor="#4ecdc4"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">お名前</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="山田 太郎"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm">メールアドレス</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm">メッセージ</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-white/30 transition-colors resize-none"
                    placeholder="プロジェクトの詳細をお聞かせください..."
                  />
                </div>

                <LiquidGlassButton
                  contrast="dark"
                  roundness={25}
                  paddingX={5}
                  paddingY={2.5}
                  fontSize="1rem"
                  fontWeight={600}
                  accentColor="#4ecdc4"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => {
                    const fakeEvent = { preventDefault: () => {} } as React.FormEvent
                    handleSubmit(fakeEvent)
                  }}
                >
                  <Send size={18} />
                  送信する
                </LiquidGlassButton>
              </div>
            </LiquidGlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}