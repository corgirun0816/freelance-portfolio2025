"use client"

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, Box, Sphere, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'
import * as THREE from 'three'

function QuantumText({ children, position, delay = 0 }: any) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [phase, setPhase] = useState(0)
  
  useFrame((state) => {
    const time = state.clock.elapsedTime
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(time + delay) * 0.1
      meshRef.current.rotation.y = Math.sin(time * 0.5 + delay) * 0.05
      
      // Quantum superposition effect
      const opacity = 0.3 + Math.sin(time * 2 + delay) * 0.3
      if (meshRef.current.material) {
        (meshRef.current.material as any).opacity = opacity
      }
    }
  })
  
  return (
    <Text
      ref={meshRef}
      position={position}
      fontSize={1.5}
      color="#e5e5e5"
      anchorX="center"
      anchorY="middle"
      material-transparent
      material-opacity={0.6}
    >
      {children}
    </Text>
  )
}

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null!)
  const particlesRef = useRef<THREE.Points>(null!)
  
  const particleCount = 500
  const positions = new Float32Array(particleCount * 3)
  const connections = new Float32Array(particleCount * 3)
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
  }
  
  useFrame((state) => {
    const time = state.clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.02
    }
    
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        positions.array[i3 + 1] += Math.sin(time + i) * 0.001
      }
      positions.needsUpdate = true
    }
  })
  
  return (
    <group ref={groupRef}>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#f5f5f5"
          transparent
          opacity={0.3}
          sizeAttenuation
        />
      </points>
    </group>
  )
}

function AdaptiveSphere() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [distortionScale, setDistortionScale] = useState(0.3)
  
  useFrame((state) => {
    const time = state.clock.elapsedTime
    const mouseX = state.pointer.x
    const mouseY = state.pointer.y
    
    if (meshRef.current) {
      meshRef.current.rotation.x = mouseY * 0.2
      meshRef.current.rotation.y = mouseX * 0.2 + time * 0.1
      
      // Adaptive distortion based on interaction
      const targetDistortion = Math.sqrt(mouseX * mouseX + mouseY * mouseY) * 0.5
      setDistortionScale(THREE.MathUtils.lerp(distortionScale, targetDistortion, 0.1))
    }
  })
  
  return (
    <Sphere ref={meshRef} args={[2, 64, 64]}>
      <MeshDistortMaterial
        color="#f5f5f5"
        distort={distortionScale}
        speed={2}
        transparent
        opacity={0.1}
        wireframe
      />
    </Sphere>
  )
}

export function QuantumHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [neuralActivity, setNeuralActivity] = useState(0)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  
  useEffect(() => {
    // Simulate neural interface activity
    const interval = setInterval(() => {
      setNeuralActivity(Math.random())
    }, 100)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <section ref={containerRef} className="h-screen relative bg-white overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 15]} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.3} color="#ffffff" />
        
        <group>
          <QuantumText position={[-4, 2, 0]} delay={0}>S</QuantumText>
          <QuantumText position={[-2, 2, 0]} delay={0.2}>.</QuantumText>
          <QuantumText position={[0, 2, 0]} delay={0.4}>S</QuantumText>
          <QuantumText position={[2, 2, 0]} delay={0.6}>T</QuantumText>
          <QuantumText position={[4, 2, 0]} delay={0.8}>U</QuantumText>
          <QuantumText position={[-3, 0, 0]} delay={1}>D</QuantumText>
          <QuantumText position={[0, 0, 0]} delay={1.2}>I</QuantumText>
          <QuantumText position={[3, 0, 0]} delay={1.4}>O</QuantumText>
        </group>
        
        <NeuralNetwork />
        <AdaptiveSphere />
      </Canvas>
      
      <motion.div
        className="absolute top-10 left-10"
        style={{ opacity }}
      >
        <h2 className="text-sm font-light text-gray-400 tracking-[0.3em] mb-2">
          NEURAL INTERFACE ACTIVE
        </h2>
        <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gray-300"
            animate={{ width: `${neuralActivity * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </motion.div>
      
      <div className="absolute bottom-10 left-10 right-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-gray-300 text-xs tracking-[0.2em] mb-2">QUANTUM STATE</h3>
            <p className="text-gray-500 text-sm">Superposition Active</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-gray-300 text-xs tracking-[0.2em] mb-2">CONSCIOUSNESS</h3>
            <p className="text-gray-500 text-sm">Level 7 Integration</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h3 className="text-gray-300 text-xs tracking-[0.2em] mb-2">REALITY MODE</h3>
            <p className="text-gray-500 text-sm">Augmented Perception</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <h3 className="text-gray-300 text-xs tracking-[0.2em] mb-2">TIME DILATION</h3>
            <p className="text-gray-500 text-sm">1.00x Normal</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}