"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Box, Sphere, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { LiquidGlass } from './LiquidGlass'

function ContactForm3D() {
  const formRef = useRef<THREE.Group>(null!)
  const [formData, setFormData] = useState({ email: '', message: '' })
  const [activeField, setActiveField] = useState<string | null>(null)
  
  useFrame((state) => {
    if (formRef.current) {
      formRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
      formRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })
  
  return (
    <group ref={formRef}>
      <Box 
        args={[6, 4, 0.1]} 
        position={[0, 0, 0]}
        onClick={() => setActiveField('form')}
      >
        <meshStandardMaterial 
          color="#f5f5f5"
          metalness={0.1}
          roughness={0.9}
          transparent
          opacity={0.8}
        />
      </Box>
      
      <Text
        position={[0, 1.5, 0.1]}
        fontSize={0.4}
        color="#666"
        anchorX="center"
      >
        CONNECT
      </Text>
      
      <Box 
        args={[5, 0.5, 0.05]} 
        position={[0, 0.5, 0.15]}
        onClick={() => setActiveField('email')}
      >
        <meshStandardMaterial 
          color={activeField === 'email' ? "#e5e5e5" : "#f0f0f0"}
          metalness={0.1}
          roughness={0.9}
        />
      </Box>
      
      <Text
        position={[-2, 0.5, 0.2]}
        fontSize={0.15}
        color="#999"
        anchorX="left"
      >
        YOUR EMAIL
      </Text>
      
      <Box 
        args={[5, 1.5, 0.05]} 
        position={[0, -0.5, 0.15]}
        onClick={() => setActiveField('message')}
      >
        <meshStandardMaterial 
          color={activeField === 'message' ? "#e5e5e5" : "#f0f0f0"}
          metalness={0.1}
          roughness={0.9}
        />
      </Box>
      
      <Text
        position={[-2, -0.1, 0.2]}
        fontSize={0.15}
        color="#999"
        anchorX="left"
      >
        YOUR MESSAGE
      </Text>
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Box 
          args={[2, 0.6, 0.1]} 
          position={[0, -1.8, 0.2]}
          onClick={() => console.log('Submit:', formData)}
        >
          <meshStandardMaterial 
            color="#d4d4d4"
            metalness={0.2}
            roughness={0.8}
          />
        </Box>
        <Text
          position={[0, -1.8, 0.25]}
          fontSize={0.2}
          color="#666"
          anchorX="center"
          >
          SEND
        </Text>
      </Float>
    </group>
  )
}

function FloatingOrbs() {
  const groupRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001
      groupRef.current.children.forEach((child, i) => {
        child.position.y = Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.5
      })
    }
  })
  
  return (
    <group ref={groupRef}>
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2
        const radius = 4
        return (
          <Sphere
            key={i}
            args={[0.3, 32, 32]}
            position={[
              Math.cos(angle) * radius,
              0,
              Math.sin(angle) * radius
            ]}
          >
            <meshStandardMaterial
              color="#f0f0f0"
              metalness={0.3}
              roughness={0.7}
              transparent
              opacity={0.5}
            />
          </Sphere>
        )
      })}
    </group>
  )
}

export function Spatial3DContact() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const z = useTransform(scrollYProgress, [0, 1], [20, -5])
  
  return (
    <section ref={containerRef} className="h-screen relative">
      <Canvas
        camera={{ position: [0, 2, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 2, 10]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, 10, 10]} intensity={0.3} />
        
        <motion.group
          position-z={z}
        >
          <ContactForm3D />
          <FloatingOrbs />
        </motion.group>
        
        <mesh position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 20, 1, 1]} />
          <meshStandardMaterial 
            color="#fafafa" 
            metalness={0}
            roughness={1}
          />
        </mesh>
        
        <fog attach="fog" args={['#ffffff', 10, 25]} />
      </Canvas>
      
      <div className="absolute bottom-10 left-10 z-10">
        <LiquidGlass className="p-6 rounded-2xl" intensity={0.2}>
          <p className="text-gray-600 text-sm tracking-[0.2em] mb-2">
            EMAIL
          </p>
          <p className="text-gray-500 mb-4">hello@s.studio</p>
          <p className="text-gray-600 text-sm tracking-[0.2em] mb-2">
            LOCATION
          </p>
          <p className="text-gray-500">TOKYO, JAPAN</p>
        </LiquidGlass>
      </div>
    </section>
  )
}