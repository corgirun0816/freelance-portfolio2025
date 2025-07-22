"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, Float, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

function FloatingText({ children, position, rotation, scale = 1 }: any) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current && hovered) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.z = position[2] + Math.sin(state.clock.elapsedTime) * 0.2
    }
  })
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Text
        ref={meshRef}
        fontSize={scale}
        position={position}
        rotation={rotation}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        color={hovered ? "#999" : "#e5e5e5"}
        anchorX="center"
        anchorY="middle"
      >
        {children}
        <meshStandardMaterial 
          metalness={0.1}
          roughness={0.8}
        />
      </Text>
    </Float>
  )
}

function Hero3DScene() {
  const { camera } = useThree()
  const groupRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    const time = state.clock.elapsedTime
    camera.position.x = Math.sin(time * 0.1) * 2
    camera.position.y = Math.cos(time * 0.1) * 1
    camera.lookAt(0, 0, 0)
    
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.05) * 0.1
    }
  })
  
  return (
    <group ref={groupRef}>
      <FloatingText position={[-3, 2, -2]} rotation={[0, 0.3, 0]} scale={0.8}>
        S
      </FloatingText>
      <FloatingText position={[-1, 2, -1]} rotation={[0, 0.1, 0]} scale={0.8}>
        .
      </FloatingText>
      <FloatingText position={[1, 2, 0]} rotation={[0, -0.1, 0]} scale={0.8}>
        S
      </FloatingText>
      <FloatingText position={[2.5, 2, 1]} rotation={[0, -0.2, 0]} scale={0.8}>
        T
      </FloatingText>
      <FloatingText position={[4, 2, 0.5]} rotation={[0, -0.3, 0]} scale={0.8}>
        U
      </FloatingText>
      <FloatingText position={[-2, 0, -1]} rotation={[0, 0.2, 0]} scale={0.8}>
        D
      </FloatingText>
      <FloatingText position={[0, 0, 1]} rotation={[0, 0, 0]} scale={0.8}>
        I
      </FloatingText>
      <FloatingText position={[2, 0, -0.5]} rotation={[0, -0.2, 0]} scale={0.8}>
        O
      </FloatingText>
      
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20, 50, 50]} />
        <meshStandardMaterial 
          color="#f5f5f5" 
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  )
}

export function Spatial3DHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -100])
  
  return (
    <section ref={containerRef} className="h-screen relative">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 5]} intensity={0.6} />
        <pointLight position={[-10, -10, -5]} intensity={0.3} />
        <Hero3DScene />
        <fog attach="fog" args={['#ffffff', 10, 30]} />
      </Canvas>
      
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
        style={{ y }}
      >
        <p className="text-gray-400 text-xs tracking-[0.3em] mb-4">
          SCROLL TO EXPLORE 3D SPACE
        </p>
        <motion.div
          className="w-px h-20 bg-gradient-to-b from-gray-400 to-transparent mx-auto"
          animate={{ 
            scaleY: [1, 0.5, 1],
            opacity: [1, 0.5, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </section>
  )
}