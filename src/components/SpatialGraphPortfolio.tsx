"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Code2, Palette, PenTool, Dumbbell,
  Mail, Instagram, Twitter, User,
  Activity, Target, Heart, Brain,
  ChevronRight, X
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
    position: { x: -300, y: -100, z: -50 },
    icon: Palette,
    children: []
  },
  'development': {
    id: 'development',
    title: 'Development',
    description: 'React & Next.js Applications',
    position: { x: 300, y: -100, z: -50 },
    icon: Code2,
    children: []
  },
  'seo-writing': {
    id: 'seo-writing',
    title: 'SEO Writing',
    description: 'Content Strategy & Creation',
    position: { x: 0, y: -200, z: -100 },
    icon: PenTool,
    children: []
  },
  'personal-training': {
    id: 'personal-training',
    title: 'Personal Training',
    description: 'Fitness & Wellness Coaching',
    position: { x: 0, y: 200, z: 50 },
    icon: Dumbbell,
    children: ['fitness-assessment', 'training-program', 'nutrition', 'mental-wellness']
  },
  'fitness-assessment': {
    id: 'fitness-assessment',
    title: 'Fitness Assessment',
    description: 'Body composition & movement analysis',
    position: { x: -200, y: 350, z: 100 },
    icon: Activity,
    parent: 'personal-training'
  },
  'training-program': {
    id: 'training-program',
    title: 'Training Program',
    description: 'Customized workout plans',
    position: { x: 0, y: 400, z: 100 },
    icon: Target,
    parent: 'personal-training'
  },
  'nutrition': {
    id: 'nutrition',
    title: 'Nutrition Guidance',
    description: 'Meal planning & dietary advice',
    position: { x: 200, y: 350, z: 100 },
    icon: Heart,
    parent: 'personal-training'
  },
  'mental-wellness': {
    id: 'mental-wellness',
    title: 'Mental Wellness',
    description: 'Stress management & mindfulness',
    position: { x: 0, y: 300, z: 150 },
    icon: Brain,
    parent: 'personal-training'
  }
}

// Card Component
function Card3D({ 
  node, 
  isSelected, 
  onSelect,
  depth = 0 
}: { 
  node: typeof nodes.main
  isSelected: boolean
  onSelect: (id: string) => void
  depth?: number
}) {
  const Icon = node.icon
  const scale = isSelected ? 1.2 : 1 - depth * 0.1
  const zIndex = isSelected ? 100 : 50 - depth * 10

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: '50%',
        top: '50%',
        zIndex,
      }}
      initial={{ 
        x: node.position.x - 150,
        y: node.position.y - 75,
        scale: 0,
        opacity: 0 
      }}
      animate={{ 
        x: isSelected ? -150 : node.position.x - 150,
        y: isSelected ? -75 : node.position.y - 75,
        scale: scale,
        opacity: 1,
        rotateY: depth * 5,
        z: isSelected ? 200 : node.position.z
      }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      onClick={() => onSelect(node.id)}
      whileHover={{ scale: scale * 1.05 }}
    >
      <div 
        className="bg-white rounded-2xl shadow-lg p-6 w-72"
        style={{
          transform: `perspective(1000px) rotateX(${depth * 2}deg)`,
        }}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
            <Icon className="w-6 h-6 text-gray-700" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{node.title}</h3>
            <p className="text-sm text-gray-600">{node.description}</p>
            {'children' in node && node.children && node.children.length > 0 && (
              <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                <span>{node.children.length} connections</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Connection Line Component
function Connection({ from, to }: { from: typeof nodes.main; to: typeof nodes.main }) {
  return (
    <svg 
      className="absolute inset-0 pointer-events-none" 
      style={{ zIndex: 1 }}
    >
      <line
        x1={`${50 + from.position.x / 10}%`}
        y1={`${50 + from.position.y / 10}%`}
        x2={`${50 + to.position.x / 10}%`}
        y2={`${50 + to.position.y / 10}%`}
        stroke="#e5e7eb"
        strokeWidth="2"
        strokeDasharray="5,5"
        opacity="0.5"
      />
    </svg>
  )
}

// Detail View Component
function DetailView({ nodeId, onClose }: { nodeId: string; onClose: () => void }) {
  const node = nodes[nodeId as keyof typeof nodes]
  const Icon = node.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/20 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center">
              <Icon className="w-8 h-8 text-gray-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{node.title}</h2>
              <p className="text-gray-600 mt-1">{node.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Additional content based on node type */}
        {nodeId === 'personal-training' && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">Our Approach</h3>
              <p className="text-gray-600">
                At Beefy Tokyo, we provide personalized fitness programs tailored to your goals. 
                Our comprehensive approach includes fitness assessments, customized training programs, 
                nutrition guidance, and mental wellness support.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-xl">
                <Activity className="w-6 h-6 text-gray-600 mb-2" />
                <h4 className="font-medium text-gray-900">Assessment</h4>
                <p className="text-sm text-gray-600 mt-1">Comprehensive fitness evaluation</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-xl">
                <Target className="w-6 h-6 text-gray-600 mb-2" />
                <h4 className="font-medium text-gray-900">Training</h4>
                <p className="text-sm text-gray-600 mt-1">Customized workout programs</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-xl">
                <Heart className="w-6 h-6 text-gray-600 mb-2" />
                <h4 className="font-medium text-gray-900">Nutrition</h4>
                <p className="text-sm text-gray-600 mt-1">Personalized meal planning</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-xl">
                <Brain className="w-6 h-6 text-gray-600 mb-2" />
                <h4 className="font-medium text-gray-900">Wellness</h4>
                <p className="text-sm text-gray-600 mt-1">Mental health support</p>
              </div>
            </div>
          </div>
        )}

        {nodeId === 'main' && (
          <div className="space-y-4">
            <div className="flex justify-center gap-4 mt-6">
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

// Main Component
export function SpatialGraphPortfolio() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [expandedNodes, setExpandedNodes] = useState<string[]>(['main', 'personal-training'])

  const handleNodeSelect = (nodeId: string) => {
    setSelectedNode(nodeId)
    // Expand children when selecting a node
    const node = nodes[nodeId as keyof typeof nodes]
    if ('children' in node && node.children && node.children.length > 0) {
      setExpandedNodes(prev => [...new Set([...prev, nodeId, ...node.children])])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <div className="relative w-full h-screen">
        {/* 3D Space Container */}
        <div 
          className="absolute inset-0"
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Render connections */}
          {Object.values(nodes).map(node => {
            if ('children' in node && node.children) {
              return node.children.map(childId => {
                const childNode = nodes[childId as keyof typeof nodes]
                if (childNode && expandedNodes.includes(childId)) {
                  return (
                    <Connection
                      key={`${node.id}-${childId}`}
                      from={node}
                      to={childNode}
                    />
                  )
                }
                return null
              })
            }
            return null
          })}

          {/* Render nodes */}
          {Object.values(nodes).map(node => {
            if (!expandedNodes.includes(node.id)) return null
            
            const depth = node.id === 'main' ? 0 : 
                         'parent' in node && node.parent === 'personal-training' ? 2 : 1

            return (
              <Card3D
                key={node.id}
                node={node}
                isSelected={selectedNode === node.id}
                onSelect={handleNodeSelect}
                depth={depth}
              />
            )
          })}
        </div>

        {/* Detail View */}
        <AnimatePresence>
          {selectedNode && (
            <DetailView
              nodeId={selectedNode}
              onClose={() => setSelectedNode(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}