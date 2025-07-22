"use client"

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Box, Sphere, Torus, Text } from '@react-three/drei'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import { LiquidGlass } from '../LiquidGlass'

const services = [
  {
    id: "NEURAL_TRAINING",
    title: "Neural Fitness",
    subtitle: "Mind-Body Quantum Integration",
    description: "Direct neural pathway optimization for instant skill acquisition and physical enhancement",
    features: [
      "Synaptic Pattern Recognition",
      "Quantum Body Mechanics",
      "Consciousness Expansion",
      "Time-Dilated Training"
    ],
    metrics: {
      efficiency: "99.7%",
      integration: "Level 9",
      evolution: "Continuous"
    }
  },
  {
    id: "REALITY_DESIGN",
    title: "Reality Architecture",
    subtitle: "Multidimensional Experience Design",
    description: "Create experiences that transcend physical limitations through quantum reality manipulation",
    features: [
      "Dimensional Layering",
      "Consciousness Mapping",
      "Quantum State Design",
      "Neural Interface UX"
    ],
    metrics: {
      dimensions: "11D",
      perception: "Omniscient",
      creation: "Instantaneous"
    }
  },
  {
    id: "QUANTUM_DEV",
    title: "Quantum Development",
    subtitle: "Probabilistic Application Engineering",
    description: "Applications that exist in superposition, adapting to user consciousness in real-time",
    features: [
      "Quantum Algorithms",
      "Consciousness APIs",
      "Reality Manipulation SDK",
      "Neural Compilation"
    ],
    metrics: {
      qubits: "∞",
      coherence: "Stable",
      entanglement: "Universal"
    }
  },
  {
    id: "THOUGHT_WRITING",
    title: "Thought Synthesis",
    subtitle: "Direct Neural Content Generation",
    description: "Pure thought-to-reality content creation bypassing traditional language constraints",
    features: [
      "Telepathic Composition",
      "Emotion Encoding",
      "Quantum Linguistics",
      "Universal Translation"
    ],
    metrics: {
      bandwidth: "1 PB/s",
      languages: "All",
      dimensions: "Beyond"
    }
  }
]

function ServiceHologram({ service, index, isActive, onActivate }: any) {
  const groupRef = useRef<THREE.Group>(null!)
  const [hover, setHover] = useState(false)
  
  useFrame((state) => {
    const time = state.clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1 + index * Math.PI / 2
      groupRef.current.position.y = Math.sin(time + index) * 0.1
      
      if (isActive) {
        groupRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1)
      } else {
        groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
      }
    }
  })
  
  const angle = (index / 4) * Math.PI * 2
  const radius = 4
  
  return (
    <group
      ref={groupRef}
      position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={onActivate}
    >
      <Box args={[2, 3, 0.1]}>
        <meshStandardMaterial
          color="#f5f5f5"
          transparent
          opacity={0.9}
          metalness={0.1}
          roughness={0.1}
        />
      </Box>
      
      <Text
        position={[0, 1, 0.1]}
        fontSize={0.3}
        color="#d4d4d4"
        anchorX="center"
      >
        {service.title}
      </Text>
      
      {hover && (
        <Torus args={[2.5, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#e5e5e5" />
        </Torus>
      )}
    </group>
  )
}

function ServiceDetails({ service }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="absolute inset-x-10 bottom-20 bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-12"
    >
      <h3 className="text-3xl font-light text-gray-700 mb-2">{service.title}</h3>
      <p className="text-lg text-gray-500 mb-4">{service.subtitle}</p>
      <p className="text-gray-600 mb-8 max-w-2xl">{service.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-xs font-medium text-gray-400 tracking-[0.2em] mb-4">CAPABILITIES</h4>
          <ul className="space-y-2">
            {service.features.map((feature: string) => (
              <li key={feature} className="text-sm text-gray-600 flex items-center">
                <span className="w-1 h-1 bg-gray-300 rounded-full mr-3" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-xs font-medium text-gray-400 tracking-[0.2em] mb-4">METRICS</h4>
          {Object.entries(service.metrics).map(([key, value]) => (
            <div key={key} className="mb-3">
              <p className="text-xs text-gray-500 capitalize">{key}</p>
              <p className="text-lg text-gray-700">{value}</p>
            </div>
          ))}
        </div>
        
        <div>
          <h4 className="text-xs font-medium text-gray-400 tracking-[0.2em] mb-4">INTEGRATION</h4>
          <div className="space-y-4">
            <LiquidGlass className="p-4 rounded-xl" intensity={0.1}>
              <p className="text-sm text-gray-600">Neural Link Ready</p>
            </LiquidGlass>
            <LiquidGlass className="p-4 rounded-xl" intensity={0.1}>
              <p className="text-sm text-gray-600">Quantum Entangled</p>
            </LiquidGlass>
            <LiquidGlass className="p-4 rounded-xl" intensity={0.1}>
              <p className="text-sm text-gray-600">Reality Synced</p>
            </LiquidGlass>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function QuantumServices() {
  const [activeService, setActiveService] = useState(0)
  const [quantumState, setQuantumState] = useState("COHERENT")
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const states = ["COHERENT", "ENTANGLED", "SUPERPOSITION", "COLLAPSED"]
    const interval = setInterval(() => {
      setQuantumState(states[Math.floor(Math.random() * states.length)])
    }, 3000)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <section ref={containerRef} className="min-h-screen relative bg-gray-50">
      <div className="h-screen relative">
        <Canvas
          camera={{ position: [0, 2, 10], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[0, 10, 0]} intensity={0.5} color="#ffffff" />
          
          <group>
            {services.map((service, index) => (
              <ServiceHologram
                key={service.id}
                service={service}
                index={index}
                isActive={activeService === index}
                onActivate={() => setActiveService(index)}
              />
            ))}
          </group>
          
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
            <planeGeometry args={[20, 20, 32, 32]} />
            <meshStandardMaterial
              color="#fafafa"
              wireframe
              transparent
              opacity={0.1}
            />
          </mesh>
        </Canvas>
        
        <div className="absolute top-10 left-10">
          <h2 className="text-5xl font-thin text-gray-300 tracking-[0.3em] mb-4">
            SERVICES
          </h2>
          <p className="text-gray-500 max-w-md">
            Quantum-enhanced capabilities for the evolved human experience
          </p>
          <div className="mt-8 flex items-center space-x-4">
            <span className="text-xs text-gray-400 tracking-[0.2em]">QUANTUM STATE</span>
            <span className="text-sm text-gray-600 font-light">{quantumState}</span>
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          <ServiceDetails key={activeService} service={services[activeService]} />
        </AnimatePresence>
      </div>
    </section>
  )
}