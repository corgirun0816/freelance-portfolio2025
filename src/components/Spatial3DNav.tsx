"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Box, Sphere, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

const menuItems = [
  { name: "HOME", position: [0, 0, 0], color: "#e5e5e5" },
  { name: "TRAINING", position: [-2, 1, -1], color: "#d4d4d4" },
  { name: "DESIGN", position: [2, 1, -1], color: "#e5e5e5" },
  { name: "DEVELOP", position: [-2, -1, -1], color: "#d4d4d4" },
  { name: "WRITE", position: [2, -1, -1], color: "#e5e5e5" },
  { name: "CONTACT", position: [0, 0, -2], color: "#d4d4d4" }
]

function NavigationSphere({ item, onClick, isActive }: any) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      const scale = hovered ? 1.2 : 1
      meshRef.current.scale.lerp(
        new THREE.Vector3(scale, scale, scale),
        0.1
      )
      
      if (isActive) {
        meshRef.current.rotation.y += 0.02
      }
    }
  })
  
  return (
    <group position={item.position}>
      <Sphere
        ref={meshRef}
        args={[0.5, 32, 32]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <meshStandardMaterial
          color={item.color}
          metalness={0.2}
          roughness={0.8}
          emissive={isActive ? item.color : "#000000"}
          emissiveIntensity={isActive ? 0.2 : 0}
        />
      </Sphere>
      
      <Text
        position={[0, 0.8, 0]}
        fontSize={0.15}
        color="#666"
        anchorX="center"
      >
        {item.name}
      </Text>
    </group>
  )
}

function Navigation3D({ activeSection, onNavigate }: any) {
  const groupRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })
  
  return (
    <group ref={groupRef}>
      {menuItems.map((item, index) => (
        <NavigationSphere
          key={item.name}
          item={item}
          isActive={activeSection === index}
          onClick={() => onNavigate(index)}
        />
      ))}
      
      <mesh>
        <octahedronGeometry args={[3, 0]} />
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

export function Spatial3DNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(0)
  
  const handleNavigate = (index: number) => {
    setActiveSection(index)
    // Scroll to section logic here
    const sections = ['hero', 'services', 'contact']
    if (index > 0 && index <= sections.length) {
      const element = document.getElementById(sections[index - 1])
      element?.scrollIntoView({ behavior: 'smooth' })
    }
    setTimeout(() => setIsOpen(false), 500)
  }
  
  return (
    <>
      <motion.button
        className="fixed top-8 right-8 z-50 w-16 h-16 bg-white/80 backdrop-blur-xl rounded-full flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="relative w-6 h-6">
          <motion.span
            className="absolute left-0 w-6 h-px bg-gray-600"
            animate={{ 
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 0 : -8
            }}
          />
          <motion.span
            className="absolute left-0 w-6 h-px bg-gray-600"
            animate={{ 
              opacity: isOpen ? 0 : 1
            }}
          />
          <motion.span
            className="absolute left-0 w-6 h-px bg-gray-600"
            animate={{ 
              rotate: isOpen ? -45 : 0,
              y: isOpen ? 0 : 8
            }}
          />
        </div>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Canvas
              camera={{ position: [0, 0, 8], fov: 60 }}
              gl={{ antialias: true, alpha: true }}
            >
              <PerspectiveCamera makeDefault position={[0, 0, 8]} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={0.5} />
              <Navigation3D 
                activeSection={activeSection}
                onNavigate={handleNavigate}
              />
              <fog attach="fog" args={['#ffffff', 5, 20]} />
            </Canvas>
            
            <motion.div
              className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-gray-400 text-sm tracking-[0.2em]">
                CLICK TO NAVIGATE 3D SPACE
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}