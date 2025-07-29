"use client"

import { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Text, Line, Html } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import * as THREE from 'three'

interface Node {
  id: string
  label: string
  position: [number, number, number]
  type: 'main' | 'service' | 'project' | 'skill'
  description?: string
  link?: string
  color?: string
  size?: number
}

interface Edge {
  from: string
  to: string
  strength?: number
}

interface GraphData {
  nodes: Node[]
  edges: Edge[]
}

// サンプルデータ
const graphData: GraphData = {
  nodes: [
    { id: 'main', label: 'S.STUDIO', position: [0, 0, 0], type: 'main', size: 1.5, color: '#a8c0ff' },
    { id: 'web', label: 'Web Design', position: [3, 1, 0], type: 'service', description: '美しいWebサイトの設計', link: '/services/web-design' },
    { id: 'app', label: 'App Development', position: [-3, 1, 0], type: 'service', description: 'モバイル＆Webアプリ開発', link: '/services/app-development' },
    { id: 'seo', label: 'SEO Writing', position: [0, -3, 0], type: 'service', description: 'SEO最適化コンテンツ', link: '/services/seo-writing' },
    { id: 'pt', label: 'Personal Training', position: [0, 3, 0], type: 'service', description: 'パーソナルトレーニング', link: '/services/personal-training' },
    { id: 'react', label: 'React', position: [4, -1, 1], type: 'skill', size: 0.8 },
    { id: 'node', label: 'Node.js', position: [-4, -1, 1], type: 'skill', size: 0.8 },
    { id: 'figma', label: 'Figma', position: [2, 2, -1], type: 'skill', size: 0.8 },
    { id: 'fitness', label: 'Fitness', position: [-2, 4, 0], type: 'skill', size: 0.8 },
  ],
  edges: [
    { from: 'main', to: 'web', strength: 1 },
    { from: 'main', to: 'app', strength: 1 },
    { from: 'main', to: 'seo', strength: 1 },
    { from: 'main', to: 'pt', strength: 1 },
    { from: 'web', to: 'react', strength: 0.5 },
    { from: 'web', to: 'figma', strength: 0.5 },
    { from: 'app', to: 'react', strength: 0.5 },
    { from: 'app', to: 'node', strength: 0.5 },
    { from: 'pt', to: 'fitness', strength: 0.5 },
  ]
}

function GraphNode({ node, onHover, onUnhover, onClick }: { 
  node: Node
  onHover: (node: Node) => void
  onUnhover: () => void
  onClick: (node: Node) => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
      const scale = hovered ? 1.2 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1)
    }
  })

  const color = node.color || (node.type === 'main' ? '#a8c0ff' : node.type === 'service' ? '#3b82f6' : '#6b7280')
  const size = node.size || (node.type === 'main' ? 1.2 : node.type === 'service' ? 0.8 : 0.6)

  return (
    <group position={node.position}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          onHover(node)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHovered(false)
          onUnhover()
          document.body.style.cursor = 'auto'
        }}
        onClick={(e) => {
          e.stopPropagation()
          onClick(node)
        }}
      >
        {node.type === 'main' ? (
          <icosahedronGeometry args={[size, 2]} />
        ) : node.type === 'service' ? (
          <octahedronGeometry args={[size]} />
        ) : (
          <tetrahedronGeometry args={[size]} />
        )}
        <meshPhongMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={hovered ? 0.5 : 0.2}
          wireframe={node.type === 'skill'}
        />
      </mesh>
      <Text
        position={[0, size + 0.5, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {node.label}
      </Text>
    </group>
  )
}

function GraphEdge({ edge, nodes }: { edge: Edge; nodes: Node[] }) {
  const fromNode = nodes.find(n => n.id === edge.from)
  const toNode = nodes.find(n => n.id === edge.to)
  
  if (!fromNode || !toNode) return null
  
  const points = [fromNode.position, toNode.position]
  const color = edge.strength === 1 ? '#a8c0ff' : '#6b7280'
  const lineWidth = (edge.strength || 0.5) * 2
  
  return (
    <Line
      points={points}
      color={color}
      lineWidth={lineWidth}
      opacity={0.6}
      transparent
    />
  )
}

function GraphScene({ data, onNodeClick }: { data: GraphData; onNodeClick: (node: Node) => void }) {
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null)
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      {/* Edges */}
      {data.edges.map((edge, i) => (
        <GraphEdge key={i} edge={edge} nodes={data.nodes} />
      ))}
      
      {/* Nodes */}
      {data.nodes.map((node) => (
        <GraphNode
          key={node.id}
          node={node}
          onHover={setHoveredNode}
          onUnhover={() => setHoveredNode(null)}
          onClick={onNodeClick}
        />
      ))}
      
      {/* Hover info */}
      {hoveredNode && hoveredNode.description && (
        <Html position={hoveredNode.position} center>
          <div className="pointer-events-none">
            <Card className="p-3 bg-black/80 text-white border-white/20 backdrop-blur-sm">
              <p className="text-sm">{hoveredNode.description}</p>
            </Card>
          </div>
        </Html>
      )}
      
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={20}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  )
}

export function InteractiveGraphView() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  
  const handleNodeClick = (node: Node) => {
    if (node.link) {
      window.location.href = node.link
    } else {
      setSelectedNode(node)
    }
  }
  
  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 left-4 z-10"
      >
        <Card className="p-4 bg-black/50 text-white border-white/20 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-2">Interactive Knowledge Graph</h3>
          <div className="space-y-1 text-sm">
            <p>🖱️ ドラッグで回転</p>
            <p>🔍 スクロールでズーム</p>
            <p>👆 ノードをクリックで詳細</p>
          </div>
        </Card>
      </motion.div>
      
      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-4 right-4 z-10"
      >
        <Card className="p-4 bg-black/50 text-white border-white/20 backdrop-blur-sm">
          <h4 className="text-sm font-semibold mb-2">凡例</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#a8c0ff] rounded-full" />
              <span className="text-xs">メイン</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#3b82f6] rounded-full" />
              <span className="text-xs">サービス</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#6b7280] rounded-full" />
              <span className="text-xs">スキル</span>
            </div>
          </div>
        </Card>
      </motion.div>
      
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <GraphScene data={graphData} onNodeClick={handleNodeClick} />
      </Canvas>
      
      {/* Selected Node Details */}
      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10"
        >
          <Card className="p-6 bg-black/80 text-white border-white/20 backdrop-blur-sm max-w-md">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">{selectedNode.label}</h3>
              <Badge variant="secondary" className="bg-white/20 text-white">
                {selectedNode.type}
              </Badge>
            </div>
            {selectedNode.description && (
              <p className="text-sm mb-4">{selectedNode.description}</p>
            )}
            <button
              onClick={() => setSelectedNode(null)}
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              閉じる
            </button>
          </Card>
        </motion.div>
      )}
    </div>
  )
}