"use client"

import { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Box, Text, MeshDistortMaterial } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import { LiquidGlass } from '../LiquidGlass'

function ThoughtWave() {
  const groupRef = useRef<THREE.Group>(null!)
  const wavesRef = useRef<THREE.Mesh[]>([])
  
  useFrame((state) => {
    const time = state.clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05
      
      wavesRef.current.forEach((wave, i) => {
        if (wave) {
          const scale = 1 + Math.sin(time * 2 - i * 0.5) * 0.3
          wave.scale.set(scale, scale, scale)
          if (wave.material && 'opacity' in wave.material) {
            (wave.material as any).opacity = 0.1 + Math.sin(time * 3 - i * 0.5) * 0.05
          }
        }
      })
    }
  })
  
  return (
    <group ref={groupRef}>
      {[...Array(5)].map((_, i) => (
        <mesh
          key={i}
          ref={(el) => el && (wavesRef.current[i] = el)}
        >
          <torusGeometry args={[2 + i * 0.5, 0.01, 16, 100]} />
          <meshBasicMaterial
            color="#e5e5e5"
            transparent
            opacity={0.1}
          />
        </mesh>
      ))}
    </group>
  )
}

function EmotionSphere({ emotion, intensity }: any) {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    const time = state.clock.elapsedTime
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.1
      meshRef.current.rotation.y = time * 0.15
      const scale = 1 + intensity * Math.sin(time * 2) * 0.2
      meshRef.current.scale.setScalar(scale)
    }
  })
  
  const colors = {
    calm: "#f5f5f5",
    excited: "#e5e5e5",
    focused: "#d4d4d4",
    creative: "#f0f0f0"
  }
  
  return (
    <Sphere ref={meshRef} args={[1, 32, 32]}>
      <MeshDistortMaterial
        color={colors[emotion as keyof typeof colors] || "#f5f5f5"}
        distort={intensity}
        speed={2}
        transparent
        opacity={0.3}
      />
    </Sphere>
  )
}

interface ThoughtMessage {
  id: string
  content: string
  emotion: string
  timestamp: number
  dimension: string
}

export function QuantumContact() {
  const [thoughtInput, setThoughtInput] = useState("")
  const [currentEmotion, setCurrentEmotion] = useState("calm")
  const [emotionIntensity, setEmotionIntensity] = useState(0.3)
  const [messages, setMessages] = useState<ThoughtMessage[]>([])
  const [isTransmitting, setIsTransmitting] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState("QUANTUM_LINKED")
  
  useEffect(() => {
    // Simulate emotion detection
    const interval = setInterval(() => {
      const emotions = ["calm", "excited", "focused", "creative"]
      setCurrentEmotion(emotions[Math.floor(Math.random() * emotions.length)])
      setEmotionIntensity(0.2 + Math.random() * 0.6)
    }, 5000)
    return () => clearInterval(interval)
  }, [])
  
  const transmitThought = async () => {
    if (!thoughtInput.trim()) return
    
    setIsTransmitting(true)
    
    // Simulate quantum transmission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const newMessage: ThoughtMessage = {
      id: Date.now().toString(),
      content: thoughtInput,
      emotion: currentEmotion,
      timestamp: Date.now(),
      dimension: "Primary Reality"
    }
    
    setMessages([newMessage, ...messages])
    setThoughtInput("")
    setIsTransmitting(false)
  }
  
  return (
    <section className="min-h-screen relative bg-white">
      <div className="h-screen relative overflow-hidden">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.2} />
          <pointLight position={[5, 5, 5]} intensity={0.3} />
          
          <ThoughtWave />
          <EmotionSphere emotion={currentEmotion} intensity={emotionIntensity} />
        </Canvas>
        
        <div className="absolute inset-0 flex flex-col">
          <div className="p-10">
            <h2 className="text-5xl font-thin text-gray-300 tracking-[0.3em] mb-4">
              CONNECT
            </h2>
            <p className="text-gray-500 max-w-2xl mb-8">
              Direct consciousness-to-consciousness communication transcending space-time limitations
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <LiquidGlass className="p-4 rounded-xl" intensity={0.1}>
                <p className="text-xs text-gray-400 tracking-[0.2em] mb-1">STATUS</p>
                <p className="text-sm text-gray-600">{connectionStatus}</p>
              </LiquidGlass>
              
              <LiquidGlass className="p-4 rounded-xl" intensity={0.1}>
                <p className="text-xs text-gray-400 tracking-[0.2em] mb-1">EMOTION</p>
                <p className="text-sm text-gray-600 capitalize">{currentEmotion}</p>
              </LiquidGlass>
              
              <LiquidGlass className="p-4 rounded-xl" intensity={0.1}>
                <p className="text-xs text-gray-400 tracking-[0.2em] mb-1">BANDWIDTH</p>
                <p className="text-sm text-gray-600">∞ TB/s</p>
              </LiquidGlass>
              
              <LiquidGlass className="p-4 rounded-xl" intensity={0.1}>
                <p className="text-xs text-gray-400 tracking-[0.2em] mb-1">LATENCY</p>
                <p className="text-sm text-gray-600">0.00ms</p>
              </LiquidGlass>
            </div>
          </div>
          
          <div className="flex-1 px-10 pb-10">
            <div className="h-full flex flex-col">
              <div className="flex-1 mb-6 overflow-y-auto">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="mb-4"
                    >
                      <LiquidGlass className="p-6 rounded-2xl" intensity={0.15}>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs text-gray-400 tracking-[0.2em]">
                            THOUGHT RECEIVED
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-2">{message.content}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Emotion: {message.emotion}</span>
                          <span>•</span>
                          <span>Dimension: {message.dimension}</span>
                        </div>
                      </LiquidGlass>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              <div className="relative">
                <textarea
                  value={thoughtInput}
                  onChange={(e) => setThoughtInput(e.target.value)}
                  placeholder="Think your message..."
                  className="w-full p-6 bg-gray-50 rounded-2xl resize-none h-32 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  disabled={isTransmitting}
                />
                
                <button
                  onClick={transmitThought}
                  disabled={isTransmitting || !thoughtInput.trim()}
                  className="absolute bottom-4 right-4 px-6 py-3 bg-white rounded-xl text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isTransmitting ? (
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Transmitting...
                    </motion.span>
                  ) : (
                    "Transmit Thought"
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-10 right-10">
            <div className="text-right">
              <p className="text-xs text-gray-400 tracking-[0.2em] mb-2">
                NEURAL INTERFACES
              </p>
              <p className="text-sm text-gray-500">Tokyo • Mars • Dimension-7</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}