"use client"

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Move, ZoomIn, ZoomOut, Maximize2, Code2, Palette, 
  PenTool, Dumbbell, User, Mail, Github, Linkedin,
  ChevronRight, Sparkles, Layers, Hash
} from 'lucide-react'

interface CanvasNode {
  id: string
  x: number
  y: number
  width: number
  height: number
  type: 'intro' | 'service' | 'skill' | 'project' | 'contact' | 'about'
  title: string
  content?: React.ReactNode
  connections?: string[]
  color?: string
}

// 初期ノード配置
const initialNodes: CanvasNode[] = [
  {
    id: 'welcome',
    x: 0,
    y: 0,
    width: 400,
    height: 300,
    type: 'intro',
    title: 'Welcome to S.STUDIO',
    color: '#a8c0ff',
    content: (
      <div className="space-y-4">
        <p className="text-lg font-light">
          クリエイティブな<span className="font-semibold text-[#a8c0ff]">デジタル体験</span>を
          空間的に探索してください
        </p>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="outline" className="bg-[#a8c0ff]/10">
            <Sparkles className="w-3 h-3 mr-1" />
            Interactive
          </Badge>
          <Badge variant="outline" className="bg-[#a8c0ff]/10">
            <Move className="w-3 h-3 mr-1" />
            Draggable
          </Badge>
          <Badge variant="outline" className="bg-[#a8c0ff]/10">
            <Layers className="w-3 h-3 mr-1" />
            Multi-dimensional
          </Badge>
        </div>
      </div>
    ),
    connections: ['web-design', 'app-dev', 'seo', 'personal-training']
  },
  {
    id: 'web-design',
    x: -500,
    y: -200,
    width: 350,
    height: 250,
    type: 'service',
    title: 'Web Design',
    color: '#3b82f6',
    content: (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-[#3b82f6]" />
          <span className="font-medium">美しいWebサイトの設計</span>
        </div>
        <p className="text-sm text-muted-foreground">
          ユーザー体験を重視した、モダンで洗練されたWebデザイン
        </p>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary" className="text-xs">UI/UX</Badge>
          <Badge variant="secondary" className="text-xs">Responsive</Badge>
          <Badge variant="secondary" className="text-xs">Figma</Badge>
        </div>
      </div>
    ),
    connections: ['figma-skill', 'react-skill']
  },
  {
    id: 'app-dev',
    x: 500,
    y: -200,
    width: 350,
    height: 250,
    type: 'service',
    title: 'App Development',
    color: '#10b981',
    content: (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-[#10b981]" />
          <span className="font-medium">モバイル＆Webアプリ開発</span>
        </div>
        <p className="text-sm text-muted-foreground">
          React Native、Next.jsを使用した高性能アプリケーション
        </p>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary" className="text-xs">React</Badge>
          <Badge variant="secondary" className="text-xs">TypeScript</Badge>
          <Badge variant="secondary" className="text-xs">Node.js</Badge>
        </div>
      </div>
    ),
    connections: ['react-skill', 'node-skill']
  },
  {
    id: 'seo',
    x: -500,
    y: 300,
    width: 350,
    height: 250,
    type: 'service',
    title: 'SEO Writing',
    color: '#f59e0b',
    content: (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <PenTool className="w-5 h-5 text-[#f59e0b]" />
          <span className="font-medium">SEO最適化コンテンツ</span>
        </div>
        <p className="text-sm text-muted-foreground">
          検索エンジンとユーザーの両方に最適化された質の高いコンテンツ
        </p>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary" className="text-xs">Content Strategy</Badge>
          <Badge variant="secondary" className="text-xs">Keywords</Badge>
          <Badge variant="secondary" className="text-xs">Analytics</Badge>
        </div>
      </div>
    )
  },
  {
    id: 'personal-training',
    x: 500,
    y: 300,
    width: 350,
    height: 250,
    type: 'service',
    title: 'Personal Training',
    color: '#ef4444',
    content: (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Dumbbell className="w-5 h-5 text-[#ef4444]" />
          <span className="font-medium">パーソナルトレーニング</span>
        </div>
        <p className="text-sm text-muted-foreground">
          個人に最適化されたフィットネスプログラムと栄養指導
        </p>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary" className="text-xs">Fitness</Badge>
          <Badge variant="secondary" className="text-xs">Nutrition</Badge>
          <Badge variant="secondary" className="text-xs">Wellness</Badge>
        </div>
      </div>
    )
  },
  {
    id: 'about',
    x: 0,
    y: 400,
    width: 400,
    height: 200,
    type: 'about',
    title: 'About Me',
    color: '#8b5cf6',
    content: (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-[#8b5cf6]" />
          <span className="font-medium">多様なスキルを持つクリエイター</span>
        </div>
        <p className="text-sm text-muted-foreground">
          テクノロジーとクリエイティビティ、そして健康的なライフスタイルを融合
        </p>
      </div>
    )
  },
  {
    id: 'contact',
    x: 0,
    y: -400,
    width: 400,
    height: 200,
    type: 'contact',
    title: 'Connect With Me',
    color: '#06b6d4',
    content: (
      <div className="space-y-3">
        <div className="flex gap-4 justify-center">
          <Button size="icon" variant="outline" className="rounded-full">
            <Mail className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="outline" className="rounded-full">
            <Github className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="outline" className="rounded-full">
            <Linkedin className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-center text-muted-foreground">
          プロジェクトについてお話ししましょう
        </p>
      </div>
    )
  },
  // Skills
  {
    id: 'react-skill',
    x: -200,
    y: -400,
    width: 150,
    height: 100,
    type: 'skill',
    title: 'React',
    color: '#61dafb'
  },
  {
    id: 'node-skill',
    x: 200,
    y: -400,
    width: 150,
    height: 100,
    type: 'skill',
    title: 'Node.js',
    color: '#339933'
  },
  {
    id: 'figma-skill',
    x: -700,
    y: 0,
    width: 150,
    height: 100,
    type: 'skill',
    title: 'Figma',
    color: '#f24e1e'
  }
]

function DraggableNode({ 
  node, 
  scale, 
  panX, 
  panY,
  onDrag,
  isSelected,
  onSelect
}: { 
  node: CanvasNode
  scale: number
  panX: any
  panY: any
  onDrag: (id: string, x: number, y: number) => void
  isSelected: boolean
  onSelect: (id: string) => void
}) {
  const [isDragging, setIsDragging] = useState(false)
  const dragX = useMotionValue(node.x)
  const dragY = useMotionValue(node.y)

  const x = useTransform(() => dragX.get() + panX.get())
  const y = useTransform(() => dragY.get() + panY.get())

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      onDragStart={() => {
        setIsDragging(true)
        onSelect(node.id)
      }}
      onDragEnd={() => {
        setIsDragging(false)
        onDrag(node.id, dragX.get(), dragY.get())
      }}
      style={{
        x,
        y,
        position: 'absolute',
        left: -node.width / 2,
        top: -node.height / 2,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        className={`
          ${isSelected ? 'ring-2 ring-primary' : ''}
          relative overflow-hidden transition-all duration-300
          bg-background/80 backdrop-blur-sm border-2
          hover:shadow-xl
        `}
        style={{
          width: node.width,
          height: node.height,
          borderColor: node.color || '#666',
          boxShadow: `0 0 20px ${node.color}20`
        }}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-lg" style={{ color: node.color }}>
              {node.title}
            </h3>
            {node.type === 'service' && (
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1">
            {node.content}
          </div>
        </div>
        
        {/* Glow effect */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${node.color}40 0%, transparent 70%)`
          }}
        />
      </Card>
    </motion.div>
  )
}

function ConnectionLine({ 
  from, 
  to, 
  nodes,
  panX,
  panY
}: { 
  from: string
  to: string
  nodes: CanvasNode[]
  panX: any
  panY: any
}) {
  const fromNode = nodes.find(n => n.id === from)
  const toNode = nodes.find(n => n.id === to)
  
  if (!fromNode || !toNode) return null

  const x1 = useTransform(() => fromNode.x + panX.get())
  const y1 = useTransform(() => fromNode.y + panY.get())
  const x2 = useTransform(() => toNode.x + panX.get())
  const y2 = useTransform(() => toNode.y + panY.get())

  return (
    <motion.svg
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    >
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={fromNode.color || '#666'}
        strokeWidth="2"
        strokeOpacity="0.3"
        strokeDasharray="5,5"
      />
    </motion.svg>
  )
}

export function InfiniteCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [nodes, setNodes] = useState(initialNodes)
  const [scale, setScale] = useState(1)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  
  const panX = useMotionValue(0)
  const panY = useMotionValue(0)

  // Handle zoom
  const handleZoom = useCallback((delta: number) => {
    setScale(prev => Math.max(0.5, Math.min(2, prev + delta)))
  }, [])

  // Handle pan
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let isPanning = false
    let startX = 0
    let startY = 0

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 1 || (e.button === 0 && e.shiftKey)) { // Middle click or Shift+Left click
        isPanning = true
        startX = e.clientX - panX.get()
        startY = e.clientY - panY.get()
        container.style.cursor = 'grabbing'
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (isPanning) {
        panX.set(e.clientX - startX)
        panY.set(e.clientY - startY)
      }
    }

    const handleMouseUp = () => {
      isPanning = false
      container.style.cursor = 'default'
    }

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        handleZoom(-e.deltaY * 0.001)
      } else {
        panX.set(panX.get() - e.deltaX)
        panY.set(panY.get() - e.deltaY)
      }
    }

    container.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    container.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      container.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      container.removeEventListener('wheel', handleWheel)
    }
  }, [panX, panY, handleZoom])

  const handleNodeDrag = (id: string, x: number, y: number) => {
    setNodes(prev => prev.map(node => 
      node.id === id ? { ...node, x, y } : node
    ))
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: `${50 * scale}px ${50 * scale}px`,
          backgroundPosition: `${panX.get()}px ${panY.get()}px`
        }}
      />
      
      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 left-4 z-20"
      >
        <Card className="p-4 bg-background/80 backdrop-blur-sm">
          <h1 className="text-2xl font-bold mb-3">S.STUDIO Space</h1>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <Move className="w-4 h-4" />
              ドラッグでカードを移動
            </p>
            <p className="flex items-center gap-2">
              <Hash className="w-4 h-4" />
              Shift+ドラッグで画面移動
            </p>
            <p className="flex items-center gap-2">
              <ZoomIn className="w-4 h-4" />
              Ctrl+スクロールでズーム
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Zoom controls */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-4 right-4 z-20 flex flex-col gap-2"
      >
        <Button
          size="icon"
          variant="outline"
          onClick={() => handleZoom(0.1)}
          className="bg-background/80 backdrop-blur-sm"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={() => handleZoom(-0.1)}
          className="bg-background/80 backdrop-blur-sm"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            setScale(1)
            panX.set(0)
            panY.set(0)
          }}
          className="bg-background/80 backdrop-blur-sm"
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
      </motion.div>

      {/* Canvas */}
      <div 
        ref={containerRef}
        className="relative w-full h-full"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center',
          cursor: 'default'
        }}
      >
        {/* Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {nodes.map(node => 
            node.connections?.map(targetId => (
              <ConnectionLine
                key={`${node.id}-${targetId}`}
                from={node.id}
                to={targetId}
                nodes={nodes}
                panX={panX}
                panY={panY}
              />
            ))
          )}
        </svg>

        {/* Nodes */}
        <div className="absolute inset-0 flex items-center justify-center">
          {nodes.map(node => (
            <DraggableNode
              key={node.id}
              node={node}
              scale={scale}
              panX={panX}
              panY={panY}
              onDrag={handleNodeDrag}
              isSelected={selectedNode === node.id}
              onSelect={setSelectedNode}
            />
          ))}
        </div>
      </div>

      {/* Minimap */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute bottom-4 right-4 z-20"
      >
        <Card className="p-2 bg-background/80 backdrop-blur-sm">
          <div className="w-48 h-32 relative bg-muted/20 rounded overflow-hidden">
            {nodes.map(node => (
              <div
                key={node.id}
                className="absolute bg-primary/50"
                style={{
                  left: `${(node.x + 1000) / 2000 * 100}%`,
                  top: `${(node.y + 1000) / 2000 * 100}%`,
                  width: '4px',
                  height: '4px',
                  transform: 'translate(-50%, -50%)'
                }}
              />
            ))}
            <div 
              className="absolute border border-primary/50"
              style={{
                left: `${(-panX.get() / scale + 1000) / 2000 * 100}%`,
                top: `${(-panY.get() / scale + 1000) / 2000 * 100}%`,
                width: `${100 / scale}%`,
                height: `${100 / scale}%`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          </div>
        </Card>
      </motion.div>
    </div>
  )
}