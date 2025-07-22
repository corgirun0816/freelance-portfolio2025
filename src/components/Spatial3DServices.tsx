"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Box, Text, Float, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { LiquidGlass } from './LiquidGlass'

const services = [
  {
    id: "01",
    title: "TRAINING",
    description: "Transform your body and mind through cutting-edge fitness programs",
    position: [-3, 2, 0],
    rotation: [0, 0.3, 0],
    color: "#e5e5e5"
  },
  {
    id: "02",
    title: "WEB DESIGN",
    description: "Create immersive digital experiences that transcend dimensions",
    position: [3, 2, -1],
    rotation: [0, -0.3, 0],
    color: "#d4d4d4"
  },
  {
    id: "03",
    title: "APP DEV",
    description: "Build next-generation applications with spatial interfaces",
    position: [-3, -2, 1],
    rotation: [0, 0.2, 0],
    color: "#e5e5e5"
  },
  {
    id: "04",
    title: "WRITING",
    description: "Craft compelling narratives that engage across all dimensions",
    position: [3, -2, 0],
    rotation: [0, -0.2, 0],
    color: "#d4d4d4"
  }
]

function ServiceBox({ service, index }: any) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += hovered ? 0.01 : 0.002
      const targetZ = clicked ? 3 : hovered ? 1 : 0
      meshRef.current.position.z = THREE.MathUtils.lerp(
        meshRef.current.position.z,
        service.position[2] + targetZ,
        0.1
      )
    }
  })
  
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
      <group
        ref={meshRef}
        position={service.position}
        rotation={service.rotation}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
      >
        <Box args={[3, 2, 0.1]}>
          <meshStandardMaterial 
            color={service.color}
            metalness={0.1}
            roughness={0.9}
            transparent
            opacity={hovered ? 0.9 : 0.7}
          />
        </Box>
        
        <Text
          position={[0, 0.5, 0.1]}
          fontSize={0.3}
          color="#666"
          anchorX="center"
          anchorY="middle"
        >
          {service.title}
        </Text>
        
        <Text
          position={[0, -0.2, 0.1]}
          fontSize={0.1}
          color="#999"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.5}
          textAlign="center"
        >
          {service.description}
        </Text>
        
        {clicked && (
          <Box args={[2.8, 1.8, 0.05]} position={[0, 0, 0.2]}>
            <meshStandardMaterial 
              color="white"
              metalness={0.1}
              roughness={0.9}
              transparent
              opacity={0.9}
            />
          </Box>
        )}
      </group>
    </Float>
  )
}

function Services3DScene() {
  const groupRef = useRef<THREE.Group>(null!)
  const { scrollY } = useScroll()
  
  useFrame((state) => {
    if (groupRef.current) {
      const scroll = scrollY.get()
      groupRef.current.rotation.y = scroll * 0.0005
      groupRef.current.position.y = -scroll * 0.002
    }
  })
  
  return (
    <group ref={groupRef}>
      {services.map((service, index) => (
        <ServiceBox key={service.id} service={service} index={index} />
      ))}
      
      <mesh position={[0, 0, -3]} rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[5, 0.05, 16, 100]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
    </group>
  )
}

export function Spatial3DServices() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  
  return (
    <section ref={containerRef} className="h-screen relative">
      <motion.div
        className="absolute top-10 left-10 z-10"
        style={{ opacity }}
      >
        <h2 className="text-6xl font-thin text-gray-300 tracking-[0.3em]">
          SERVICES
        </h2>
        <p className="text-gray-400 mt-4 max-w-md">
          Navigate through our three-dimensional service space. 
          Click to explore each dimension in detail.
        </p>
      </motion.div>
      
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 12]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        <Services3DScene />
        <fog attach="fog" args={['#ffffff', 10, 30]} />
      </Canvas>
      
      <motion.div
        className="absolute bottom-10 right-10 text-right"
        style={{ opacity }}
      >
        <p className="text-gray-400 text-xs tracking-[0.2em]">
          HOVER & CLICK TO INTERACT
        </p>
      </motion.div>
    </section>
  )
}