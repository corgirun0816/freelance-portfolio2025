"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Code2, Palette, PenTool, Dumbbell,
  Mail, Instagram, Twitter, User,
  Activity, Target, Heart, Brain,
  ChevronRight, X, ArrowLeft
} from 'lucide-react'

// Node structure
const nodes = {
  main: {
    id: 'main',
    title: 'S.STUDIO',
    description: 'Creative Digital Solutions',
    position: { x: 0, y: 0, z: 0 },
    icon: User,
    children: ['web-design', 'development', 'seo-writing', 'personal-training']
  },
  'web-design': {
    id: 'web-design',
    title: 'Web Design',
    description: 'UI/UX Design & Prototyping',
    position: { x: -400, y: -200, z: -50 },
    icon: Palette,
    children: []
  },
  'development': {
    id: 'development',
    title: 'Development',
    description: 'React & Next.js Applications',
    position: { x: 400, y: -200, z: -50 },
    icon: Code2,
    children: []
  },
  'seo-writing': {
    id: 'seo-writing',
    title: 'SEO Writing',
    description: 'Content Strategy & Creation',
    position: { x: 0, y: -300, z: -100 },
    icon: PenTool,
    children: []
  },
  'personal-training': {
    id: 'personal-training',
    title: 'Personal Training',
    description: 'Fitness & Wellness Coaching',
    position: { x: 0, y: 300, z: 50 },
    icon: Dumbbell,
    children: ['fitness-assessment', 'training-program', 'nutrition', 'mental-wellness']
  },
  'fitness-assessment': {
    id: 'fitness-assessment',
    title: 'Fitness Assessment',
    description: 'Body composition & movement analysis',
    position: { x: -300, y: 500, z: 100 },
    icon: Activity,
    parent: 'personal-training'
  },
  'training-program': {
    id: 'training-program',
    title: 'Training Program',
    description: 'Customized workout plans',
    position: { x: -100, y: 550, z: 100 },
    icon: Target,
    parent: 'personal-training'
  },
  'nutrition': {
    id: 'nutrition',
    title: 'Nutrition Guidance',
    description: 'Meal planning & dietary advice',
    position: { x: 100, y: 550, z: 100 },
    icon: Heart,
    parent: 'personal-training'
  },
  'mental-wellness': {
    id: 'mental-wellness',
    title: 'Mental Wellness',
    description: 'Stress management & mindfulness',
    position: { x: 300, y: 500, z: 100 },
    icon: Brain,
    parent: 'personal-training'
  }
}

// Node type
type Node = {
  id: string
  title: string
  description: string
  position: { x: number; y: number; z: number }
  icon: any
  children?: string[]
  parent?: string
}

// Card Component
function Card3D({ 
  node, 
  isSelected,
  onSelect,
  viewOffset,
  depth = 0 
}: { 
  node: Node
  isSelected: boolean
  onSelect: (id: string) => void
  viewOffset: { x: number; y: number }
  depth?: number
}) {
  const Icon = node.icon
  const scale = isSelected ? 1.5 : 1 - depth * 0.05
  const zIndex = isSelected ? 100 : 50 - depth * 10

  return (
    <motion.div
      layoutId={node.id}
      className="absolute cursor-pointer"
      style={{
        left: '50%',
        top: '50%',
        zIndex,
      }}
      initial={{ 
        x: node.position.x - 150,
        y: node.position.y - 100,
        scale: 0,
        opacity: 0 
      }}
      animate={{ 
        x: isSelected ? -viewOffset.x - 200 : node.position.x - 150 + viewOffset.x,
        y: isSelected ? -viewOffset.y - 150 : node.position.y - 100 + viewOffset.y,
        scale: scale,
        opacity: 1,
        rotateY: isSelected ? 0 : depth * 3,
        z: isSelected ? 300 : node.position.z
      }}
      transition={{ 
        type: "spring",
        stiffness: 80,
        damping: 20,
        duration: 0.8
      }}
      onClick={() => onSelect(node.id)}
      whileHover={{ scale: isSelected ? scale : scale * 1.05 }}
    >
      <motion.div 
        className={`bg-white rounded-2xl shadow-lg p-6 ${isSelected ? 'w-[500px]' : 'w-72'}`}
        style={{
          transform: `perspective(1000px) rotateX(${isSelected ? 0 : depth * 2}deg)`,
        }}
        layout
      >
        <motion.div layout="position" className="flex items-start gap-4">
          <div className={`${isSelected ? 'w-16 h-16' : 'w-12 h-12'} rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0`}>
            <Icon className={`${isSelected ? 'w-8 h-8' : 'w-6 h-6'} text-gray-700`} />
          </div>
          <div className="flex-1">
            <h3 className={`font-semibold text-gray-900 mb-1 ${isSelected ? 'text-2xl' : 'text-lg'}`}>
              {node.title}
            </h3>
            <p className={`${isSelected ? 'text-base' : 'text-sm'} text-gray-600`}>
              {node.description}
            </p>
            {!isSelected && node.children && node.children.length > 0 && (
              <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                <span>{node.children.length} connections</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            )}
          </div>
        </motion.div>

        {/* Expanded content */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              {node.id === 'main' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                      Web Designer
                    </span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                      Developer
                    </span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                      Personal Trainer
                    </span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                      SEO Writer
                    </span>
                  </div>
                  <div className="flex gap-3 justify-center">
                    <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              )}

              {node.id === 'personal-training' && (
                <div className="space-y-4">
                  <p className="text-gray-600">
                    At Beefy Tokyo, we provide personalized fitness programs tailored to your goals. 
                    Our comprehensive approach includes:
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {node.children?.map(childId => {
                      const child = nodes[childId as keyof typeof nodes]
                      const ChildIcon = child.icon
                      return (
                        <div key={childId} className="p-3 bg-gray-50 rounded-lg">
                          <ChildIcon className="w-5 h-5 text-gray-600 mb-1" />
                          <h4 className="font-medium text-sm text-gray-900">{child.title}</h4>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {node.id === 'web-design' && (
                <div className="space-y-3">
                  <p className="text-gray-600">Creating beautiful and functional web experiences with:</p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• User-centered design approach</li>
                    <li>• Modern UI/UX principles</li>
                    <li>• Responsive layouts</li>
                    <li>• Figma prototyping</li>
                  </ul>
                </div>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onSelect('')
                }}
                className="mt-4 text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to overview
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

// Connection Line Component
function Connection({ from, to, viewOffset }: { from: Node; to: Node; viewOffset: { x: number; y: number } }) {
  const fromX = 50 + (from.position.x + viewOffset.x) / 20
  const fromY = 50 + (from.position.y + viewOffset.y) / 20
  const toX = 50 + (to.position.x + viewOffset.x) / 20
  const toY = 50 + (to.position.y + viewOffset.y) / 20

  return (
    <svg 
      className="absolute inset-0 pointer-events-none" 
      style={{ zIndex: 1 }}
    >
      <motion.line
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        x1={`${fromX}%`}
        y1={`${fromY}%`}
        x2={`${toX}%`}
        y2={`${toY}%`}
        stroke="#e5e7eb"
        strokeWidth="2"
        strokeDasharray="5,5"
      />
    </svg>
  )
}

// Main Component
export function ExpandedGraphPortfolio() {
  const [selectedNode, setSelectedNode] = useState<string>('')
  const [viewOffset, setViewOffset] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleNodeSelect = (nodeId: string) => {
    setSelectedNode(nodeId)
    
    // Center the view on the selected node
    if (nodeId && nodes[nodeId as keyof typeof nodes]) {
      const node = nodes[nodeId as keyof typeof nodes]
      setViewOffset({
        x: -node.position.x,
        y: -node.position.y
      })
    } else {
      setViewOffset({ x: 0, y: 0 })
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50 overflow-hidden">
      <div className="relative w-full h-screen">
        <motion.div 
          className="absolute inset-0"
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
          animate={{
            x: viewOffset.x * 0.2,
            y: viewOffset.y * 0.2,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
          {/* Render all connections */}
          {Object.values(nodes).map(node => {
            if ('children' in node && node.children) {
              return node.children.map(childId => {
                const childNode = nodes[childId as keyof typeof nodes]
                return (
                  <Connection
                    key={`${node.id}-${childId}`}
                    from={node}
                    to={childNode}
                    viewOffset={viewOffset}
                  />
                )
              })
            }
            return null
          })}

          {/* Render all nodes */}
          {Object.values(nodes).map(node => {
            const depth = node.id === 'main' ? 0 : 
                         'parent' in node && node.parent === 'personal-training' ? 2 : 1

            return (
              <Card3D
                key={node.id}
                node={node}
                isSelected={selectedNode === node.id}
                onSelect={handleNodeSelect}
                viewOffset={viewOffset}
                depth={depth}
              />
            )
          })}
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
            <p className="text-sm text-gray-600">
              Click any card to explore • Click again to return
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}