"use client"

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, Box, Sphere, PerspectiveCamera } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'
import * as THREE from 'three'

function TemporalText({ children, position, time, delay = 0 }: any) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [opacity, setOpacity] = useState(0.6)
  
  useFrame((state) => {
    const currentTime = state.clock.elapsedTime
    if (meshRef.current) {
      // 4D position: x, y, z, time
      const timePhase = Math.sin(currentTime * 0.5 + delay) * 2
      meshRef.current.position.x = position[0] + Math.sin(currentTime + delay) * 0.2
      meshRef.current.position.y = position[1] + Math.cos(currentTime + delay) * 0.1
      meshRef.current.position.z = position[2] + timePhase
      
      // Temporal visibility based on 4th dimension
      const visibility = 0.3 + Math.sin(currentTime + time) * 0.7
      setOpacity(visibility)
    }
  })
  
  return (
    <Text
      ref={meshRef}
      position={position}
      fontSize={1.2}
      color="#d4d4d4"
      anchorX="center"
      anchorY="middle"
      material-transparent
      material-opacity={opacity}
    >
      {children}
    </Text>
  )
}

function FourDimensionalField() {
  const groupRef = useRef<THREE.Group>(null!)
  
  const lineCount = 20
  const timeSlices = 5
  
  useFrame((state) => {
    const time = state.clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.02
      groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.1
      
      // 4D transformation
      groupRef.current.children.forEach((line, i) => {
        const t = i / lineCount
        const timeOffset = (i % timeSlices) / timeSlices
        line.position.y = Math.sin(time + t * Math.PI * 2) * 2
        if (line.material && 'opacity' in line.material) {
          (line.material as any).opacity = 0.1 + timeOffset * 0.2
        }
        line.scale.z = 1 + Math.sin(time * 2 + timeOffset * Math.PI) * 0.5
      })
    }
  })
  
  return (
    <group ref={groupRef}>
      {[...Array(lineCount)].map((_, i) => {
        const angle = (i / lineCount) * Math.PI * 2
        const radius = 5
        const points = []
        
        for (let j = 0; j < 50; j++) {
          const t = j / 49
          const x = Math.cos(angle) * radius * (1 - t * 0.5)
          const y = (t - 0.5) * 10
          const z = Math.sin(angle) * radius * (1 - t * 0.5)
          points.push(new THREE.Vector3(x, y, z))
        }
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        
        return (
          <line key={i} geometry={geometry}>
            <lineBasicMaterial color="#e5e5e5" transparent opacity={0.2} />
          </line>
        )
      })}
    </group>
  )
}

function TemporalSphere() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [timePhase, setTimePhase] = useState(0)
  
  useFrame((state) => {
    const time = state.clock.elapsedTime
    if (meshRef.current) {
      // 4D rotation through time
      meshRef.current.rotation.x = time * 0.1
      meshRef.current.rotation.y = time * 0.15
      meshRef.current.rotation.z = time * 0.05
      
      // Temporal pulsation
      const scale = 1 + Math.sin(time) * 0.2
      meshRef.current.scale.setScalar(scale)
      
      setTimePhase((time % (Math.PI * 2)) / (Math.PI * 2))
    }
  })
  
  return (
    <Sphere ref={meshRef} args={[2, 32, 32]}>
      <meshStandardMaterial
        color="#f5f5f5"
        wireframe
        transparent
        opacity={0.1}
      />
    </Sphere>
  )
}

export function Quantum4DHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentTimeline, setCurrentTimeline] = useState("PRESENT")
  const [temporalCoordinate, setTemporalCoordinate] = useState(0)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTemporalCoordinate((prev) => (prev + 0.01) % 1)
      
      // Timeline shifts
      const timelines = ["PAST", "PRESENT", "FUTURE", "PARALLEL"]
      if (Math.random() > 0.95) {
        setCurrentTimeline(timelines[Math.floor(Math.random() * timelines.length)])
      }
    }, 50)
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
          <TemporalText position={[-4, 2, 0]} time={0} delay={0}>S</TemporalText>
          <TemporalText position={[-2, 2, 0]} time={0.5} delay={0.2}>.</TemporalText>
          <TemporalText position={[0, 2, 0]} time={1} delay={0.4}>S</TemporalText>
          <TemporalText position={[2, 2, 0]} time={1.5} delay={0.6}>T</TemporalText>
          <TemporalText position={[4, 2, 0]} time={2} delay={0.8}>U</TemporalText>
          <TemporalText position={[-3, 0, 0]} time={2.5} delay={1}>D</TemporalText>
          <TemporalText position={[0, 0, 0]} time={3} delay={1.2}>I</TemporalText>
          <TemporalText position={[3, 0, 0]} time={3.5} delay={1.4}>O</TemporalText>
        </group>
        
        <FourDimensionalField />
        <TemporalSphere />
      </Canvas>
      
      <motion.div
        className="absolute top-10 left-10"
        style={{ opacity }}
      >
        <h2 className="text-sm font-light text-gray-400 tracking-[0.3em] mb-2">
          4D INTERFACE ACTIVE
        </h2>
        <div className="space-y-2">
          <div className="flex items-center space-x-4">
            <span className="text-xs text-gray-400">TIMELINE</span>
            <span className="text-sm text-gray-600">{currentTimeline}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-xs text-gray-400">TEMPORAL COORDINATE</span>
            <span className="text-sm text-gray-600">{temporalCoordinate.toFixed(3)}</span>
          </div>
        </div>
      </motion.div>
      
      <div className="absolute bottom-10 left-10 right-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-gray-300 text-xs tracking-[0.2em] mb-2">SPATIAL DIMENSIONS</h3>
            <p className="text-gray-500 text-sm">X, Y, Z Active</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-gray-300 text-xs tracking-[0.2em] mb-2">TEMPORAL DIMENSION</h3>
            <p className="text-gray-500 text-sm">Time Axis Enabled</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h3 className="text-gray-300 text-xs tracking-[0.2em] mb-2">4D NAVIGATION</h3>
            <p className="text-gray-500 text-sm">Spacetime Control</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <h3 className="text-gray-300 text-xs tracking-[0.2em] mb-2">CAUSALITY MODE</h3>
            <p className="text-gray-500 text-sm">Non-Linear Active</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}