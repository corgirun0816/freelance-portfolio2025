"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LiquidGlass } from '../LiquidGlass'

interface NavNode {
  id: string
  label: string
  position: { x: number; y: number; z: number }
  connections: string[]
  dimension: string
}

const navigationNodes: NavNode[] = [
  {
    id: "origin",
    label: "ORIGIN",
    position: { x: 0, y: 0, z: 0 },
    connections: ["services", "connect", "about"],
    dimension: "Primary"
  },
  {
    id: "services",
    label: "SERVICES",
    position: { x: -100, y: 50, z: 20 },
    connections: ["origin", "personal-training", "web-design", "app-development", "seo-writing"],
    dimension: "Service Space"
  },
  {
    id: "connect",
    label: "CONNECT",
    position: { x: 100, y: -50, z: -20 },
    connections: ["origin"],
    dimension: "Communication Plane"
  },
  {
    id: "about",
    label: "CONSCIOUSNESS",
    position: { x: 0, y: 100, z: 50 },
    connections: ["origin"],
    dimension: "Meta Reality"
  },
  {
    id: "personal-training",
    label: "パーソナルトレーニング",
    position: { x: -150, y: 100, z: 30 },
    connections: ["services"],
    dimension: "4D Training Space"
  },
  {
    id: "web-design",
    label: "WEBデザイン",
    position: { x: -150, y: 0, z: 40 },
    connections: ["services"],
    dimension: "Design Timeline"
  },
  {
    id: "app-development",
    label: "アプリ開発",
    position: { x: -100, y: -100, z: 20 },
    connections: ["services"],
    dimension: "Development Continuum"
  },
  {
    id: "seo-writing",
    label: "SEOライティング",
    position: { x: -50, y: 150, z: 60 },
    connections: ["services"],
    dimension: "Content Dimension"
  }
]

export function QuantumNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentNode, setCurrentNode] = useState("origin")
  const [thoughtCommand, setThoughtCommand] = useState("")
  const [neuralActivity, setNeuralActivity] = useState(0)
  
  useEffect(() => {
    // Simulate neural interface reading
    const interval = setInterval(() => {
      setNeuralActivity(Math.random())
      
      // Simulate thought commands
      const commands = ["", "Navigate...", "Thinking...", "Processing..."]
      if (Math.random() > 0.8) {
        setThoughtCommand(commands[Math.floor(Math.random() * commands.length)])
        setTimeout(() => setThoughtCommand(""), 2000)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])
  
  const navigate = (nodeId: string) => {
    setCurrentNode(nodeId)
    
    // Scroll to section if exists
    const element = document.getElementById(nodeId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    
    setTimeout(() => setIsOpen(false), 800)
  }
  
  const currentNodeData = navigationNodes.find(node => node.id === currentNode)
  
  return (
    <>
      <motion.button
        className="fixed top-8 right-8 z-50"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <LiquidGlass className="w-16 h-16 rounded-2xl flex items-center justify-center" intensity={0.3}>
          <div className="relative">
            <motion.div
              className="w-8 h-8 rounded-full border border-gray-400"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute inset-2 rounded-full bg-gray-300"
              animate={{
                scale: neuralActivity
              }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </LiquidGlass>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="h-full flex flex-col p-10">
              <div className="mb-8">
                <h2 className="text-4xl font-thin text-gray-300 tracking-[0.3em] mb-4">
                  4D NAVIGATION
                </h2>
                <div className="flex items-center space-x-6">
                  <div>
                    <p className="text-xs text-gray-400 tracking-[0.2em] mb-1">CURRENT DIMENSION</p>
                    <p className="text-sm text-gray-600">{currentNodeData?.dimension}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 tracking-[0.2em] mb-1">NEURAL LINK</p>
                    <p className="text-sm text-gray-600">Active</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 tracking-[0.2em] mb-1">THOUGHT COMMAND</p>
                    <p className="text-sm text-gray-600">{thoughtCommand || "Ready"}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 relative">
                <svg className="absolute inset-0 w-full h-full">
                  {navigationNodes.map(node => (
                    node.connections.map(targetId => {
                      const target = navigationNodes.find(n => n.id === targetId)
                      if (!target) return null
                      
                      return (
                        <motion.line
                          key={`${node.id}-${targetId}`}
                          x1={`${50 + node.position.x / 4}%`}
                          y1={`${50 - node.position.y / 4}%`}
                          x2={`${50 + target.position.x / 4}%`}
                          y2={`${50 - target.position.y / 4}%`}
                          stroke="#e5e5e5"
                          strokeWidth="1"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      )
                    })
                  ))}
                </svg>
                
                {navigationNodes.map((node, index) => (
                  <motion.div
                    key={node.id}
                    className="absolute cursor-pointer"
                    style={{
                      left: `${50 + node.position.x / 4}%`,
                      top: `${50 - node.position.y / 4}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => navigate(node.id)}
                  >
                    <LiquidGlass
                      className={`px-6 py-3 rounded-full ${
                        currentNode === node.id ? 'bg-gray-100' : ''
                      }`}
                      intensity={currentNode === node.id ? 0.3 : 0.15}
                    >
                      <p className="text-sm text-gray-600 whitespace-nowrap">
                        {node.label}
                      </p>
                    </LiquidGlass>
                    
                    {currentNode === node.id && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-gray-300"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.2, opacity: 0 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 flex justify-between items-end">
                <div>
                  <p className="text-xs text-gray-400 tracking-[0.2em] mb-2">
                    NAVIGATION HINT
                  </p>
                  <p className="text-sm text-gray-500">
                    Think of your destination or click to navigate
                  </p>
                </div>
                
                <motion.button
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close Navigation
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}