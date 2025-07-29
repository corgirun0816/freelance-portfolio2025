"use client"

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Float, Stars, Cloud } from '@react-three/drei'
import { LiquidGlassCard } from './LiquidGlassCard'
import { 
  Code2, Palette, PenTool, Dumbbell, 
  Mail, Github, Linkedin, Twitter,
  Sparkles, Zap, Globe
} from 'lucide-react'
import * as THREE from 'three'

interface CanvasNode {
  id: string
  x: number
  y: number
  width: number
  height: number
  type: 'main' | 'service' | 'skill' | 'contact'
  title: string
  content?: React.ReactNode
  color?: string
  icon?: React.ReactNode
}

// 3D Background Component
function Background3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      
      {/* Floating geometric shapes */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[3, 2, -5]}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#e0e7ff" opacity={0.3} transparent />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh position={[-4, -2, -8]}>
          <icosahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial color="#c7d2fe" opacity={0.2} transparent />
        </mesh>
      </Float>
      
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh position={[5, -3, -6]}>
          <tetrahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial color="#a5b4fc" opacity={0.25} transparent />
        </mesh>
      </Float>
      
      {/* Subtle particles */}
      <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
    </Canvas>
  )
}

// Node configuration
const nodes: CanvasNode[] = [
  {
    id: 'main',
    x: 0,
    y: 0,
    width: 450,
    height: 280,
    type: 'main',
    title: 'S.STUDIO',
    color: '#6366f1',
    content: (
      <div className="space-y-4 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
        </div>
        <p className="text-xl font-light text-gray-600 leading-relaxed">
          デジタルクリエイティブと
          <br />
          <span className="font-medium text-indigo-600">革新的なソリューション</span>
        </p>
        <div className="flex gap-3 justify-center pt-2">
          <motion.div whileHover={{ scale: 1.1 }} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer">
            <Mail className="w-5 h-5 text-gray-600" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer">
            <Github className="w-5 h-5 text-gray-600" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer">
            <Linkedin className="w-5 h-5 text-gray-600" />
          </motion.div>
        </div>
      </div>
    )
  },
  {
    id: 'web-design',
    x: -400,
    y: -200,
    width: 320,
    height: 200,
    type: 'service',
    title: 'Web Design',
    color: '#8b5cf6',
    icon: <Palette className="w-6 h-6" />,
    content: (
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
            <Palette className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">美しいデザイン</h4>
            <p className="text-sm text-gray-500">UI/UX最適化</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'development',
    x: 400,
    y: -200,
    width: 320,
    height: 200,
    type: 'service',
    title: 'Development',
    color: '#10b981',
    icon: <Code2 className="w-6 h-6" />,
    content: (
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
            <Code2 className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">モダン開発</h4>
            <p className="text-sm text-gray-500">React & Next.js</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'content',
    x: -400,
    y: 250,
    width: 320,
    height: 200,
    type: 'service',
    title: 'Content Creation',
    color: '#f59e0b',
    icon: <PenTool className="w-6 h-6" />,
    content: (
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
            <PenTool className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">SEOコンテンツ</h4>
            <p className="text-sm text-gray-500">検索最適化</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'fitness',
    x: 400,
    y: 250,
    width: 320,
    height: 200,
    type: 'service',
    title: 'Personal Training',
    color: '#ef4444',
    icon: <Dumbbell className="w-6 h-6" />,
    content: (
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
            <Dumbbell className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">フィットネス</h4>
            <p className="text-sm text-gray-500">パーソナル指導</p>
          </div>
        </div>
      </div>
    )
  }
]

function DraggableNode({ 
  node, 
  onDrag
}: { 
  node: CanvasNode
  onDrag: (id: string, x: number, y: number) => void
}) {
  const [isDragging, setIsDragging] = useState(false)
  const dragX = useMotionValue(node.x)
  const dragY = useMotionValue(node.y)

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => {
        setIsDragging(false)
        onDrag(node.id, dragX.get(), dragY.get())
      }}
      style={{
        x: dragX,
        y: dragY,
        position: 'absolute',
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: Math.random() * 0.3 }}
    >
      <LiquidGlassCard
        contrast="light"
        roundness={24}
        padding={1.5}
        glowColor={node.color}
        interactive={true}
        className="shadow-xl hover:shadow-2xl transition-shadow duration-300"
        style={{
          width: node.width,
          height: node.height,
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.5)'
        }}
      >
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-4 text-center" style={{ color: node.color }}>
            {node.title}
          </h3>
          {node.content}
        </div>
      </LiquidGlassCard>
    </motion.div>
  )
}

// Connection component
function Connection({ from, to, nodes }: { from: string; to: string; nodes: CanvasNode[] }) {
  const fromNode = nodes.find(n => n.id === from)
  const toNode = nodes.find(n => n.id === to)
  
  if (!fromNode || !toNode) return null

  const path = `M ${fromNode.x} ${fromNode.y} Q ${(fromNode.x + toNode.x) / 2} ${(fromNode.y + toNode.y) / 2 - 100} ${toNode.x} ${toNode.y}`

  return (
    <motion.svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.path
        d={path}
        stroke="url(#gradient)"
        strokeWidth="2"
        fill="none"
        strokeDasharray="5,5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e0e7ff" />
          <stop offset="50%" stopColor="#c7d2fe" />
          <stop offset="100%" stopColor="#a5b4fc" />
        </linearGradient>
      </defs>
    </motion.svg>
  )
}

export function ModernInfiniteCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [nodePositions, setNodePositions] = useState(nodes)
  const [isPanning, setIsPanning] = useState(false)
  const panX = useMotionValue(0)
  const panY = useMotionValue(0)

  // Handle panning
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let startX = 0
    let startY = 0

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 1 || (e.button === 0 && e.shiftKey)) {
        setIsPanning(true)
        startX = e.clientX - panX.get()
        startY = e.clientY - panY.get()
        container.style.cursor = 'move'
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (isPanning) {
        panX.set(e.clientX - startX)
        panY.set(e.clientY - startY)
      }
    }

    const handleMouseUp = () => {
      setIsPanning(false)
      container.style.cursor = 'default'
    }

    container.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      container.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isPanning, panX, panY])

  const handleNodeDrag = (id: string, x: number, y: number) => {
    setNodePositions(prev => prev.map(node => 
      node.id === id ? { ...node, x, y } : node
    ))
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-50">
        <Background3D />
      </div>
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-200/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-indigo-100/10 to-transparent rounded-full blur-2xl" />
      </div>

      {/* Canvas */}
      <motion.div 
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center"
        style={{ x: panX, y: panY }}
      >
        {/* Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ left: '-50%', top: '-50%', width: '200%', height: '200%' }}>
          <Connection from="main" to="web-design" nodes={nodePositions} />
          <Connection from="main" to="development" nodes={nodePositions} />
          <Connection from="main" to="content" nodes={nodePositions} />
          <Connection from="main" to="fitness" nodes={nodePositions} />
        </svg>

        {/* Nodes */}
        {nodePositions.map(node => (
          <DraggableNode
            key={node.id}
            node={node}
            onDrag={handleNodeDrag}
          />
        ))}
      </motion.div>
    </div>
  )
}