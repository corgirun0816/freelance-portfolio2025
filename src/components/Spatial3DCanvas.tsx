"use client"

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, Text, Box, RoundedBox, MeshDistortMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'
import { 
  Code2, Palette, PenTool, Dumbbell, 
  Mail, Instagram, Twitter,
  Sparkles, User
} from 'lucide-react'
import * as THREE from 'three'

// 3D Card Component
function Card3D({ 
  position, 
  rotation = [0, 0, 0],
  scale = 1,
  color = '#ffffff',
  opacity = 0.9,
  children,
  onClick,
  glowColor
}: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current && hovered) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.05
    }
  })

  return (
    <Float
      speed={2}
      rotationIntensity={0.1}
      floatIntensity={0.2}
    >
      <group position={position} rotation={rotation} scale={scale}>
        <RoundedBox
          ref={meshRef}
          args={[3, 2, 0.1]}
          radius={0.1}
          smoothness={4}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={onClick}
        >
          <MeshDistortMaterial
            color={color}
            transparent
            opacity={opacity}
            distort={0.1}
            speed={2}
            roughness={0.1}
            metalness={0.8}
          />
        </RoundedBox>
        
        {/* Glow effect */}
        {hovered && (
          <RoundedBox
            args={[3.1, 2.1, 0.05]}
            radius={0.1}
            position={[0, 0, -0.05]}
          >
            <meshBasicMaterial
              color={glowColor || color}
              transparent
              opacity={0.2}
            />
          </RoundedBox>
        )}
        
        {/* HTML content */}
        <group position={[0, 0, 0.1]}>
          {children}
        </group>
      </group>
    </Float>
  )
}

// Connection Line Component
function ConnectionLine({ start, end, color = '#e0e7ff' }: any) {
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(...start),
    new THREE.Vector3(
      (start[0] + end[0]) / 2,
      (start[1] + end[1]) / 2 + 0.5,
      (start[2] + end[2]) / 2
    ),
    new THREE.Vector3(...end),
  ])

  const points = curve.getPoints(50)
  const geometry = new THREE.BufferGeometry().setFromPoints(points)

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={color} opacity={0.3} transparent />
    </line>
  )
}

// 3D Scene
function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      {/* Main Card - S.STUDIO */}
      <Card3D
        position={[0, 0, 0]}
        scale={1.2}
        color="#f3f4f6"
        glowColor="#6366f1"
      >
        <Text
          position={[0, 0.4, 0.1]}
          fontSize={0.3}
          color="#6366f1"
          anchorX="center"
          anchorY="middle"
          font="/fonts/helvetiker_regular.typeface.json"
        >
          S.STUDIO
        </Text>
      </Card3D>

      {/* Service Cards */}
      <Card3D
        position={[-4, 2, -1]}
        rotation={[0, 0.3, 0]}
        color="#fef3c7"
        glowColor="#f59e0b"
      >
        <Text
          position={[0, 0, 0.1]}
          fontSize={0.15}
          color="#92400e"
          anchorX="center"
          anchorY="middle"
        >
          Web Designer
        </Text>
      </Card3D>

      <Card3D
        position={[4, 2, -1]}
        rotation={[0, -0.3, 0]}
        color="#dbeafe"
        glowColor="#3b82f6"
      >
        <Text
          position={[0, 0, 0.1]}
          fontSize={0.15}
          color="#1e3a8a"
          anchorX="center"
          anchorY="middle"
        >
          Developer
        </Text>
      </Card3D>

      <Card3D
        position={[-4, -2, -1]}
        rotation={[0, 0.3, 0]}
        color="#fecaca"
        glowColor="#ef4444"
      >
        <Text
          position={[0, 0, 0.1]}
          fontSize={0.15}
          color="#991b1b"
          anchorX="center"
          anchorY="middle"
        >
          Personal Trainer
        </Text>
      </Card3D>

      <Card3D
        position={[4, -2, -1]}
        rotation={[0, -0.3, 0]}
        color="#e9d5ff"
        glowColor="#9333ea"
      >
        <Text
          position={[0, 0, 0.1]}
          fontSize={0.15}
          color="#581c87"
          anchorX="center"
          anchorY="middle"
        >
          SEO Writer
        </Text>
      </Card3D>

      {/* Connections */}
      <ConnectionLine start={[0, 0, 0]} end={[-4, 2, -1]} />
      <ConnectionLine start={[0, 0, 0]} end={[4, 2, -1]} />
      <ConnectionLine start={[0, 0, 0]} end={[-4, -2, -1]} />
      <ConnectionLine start={[0, 0, 0]} end={[4, -2, -1]} />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <Float key={i} speed={Math.random() * 2 + 1}>
          <Box
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10 - 5
            ]}
            args={[0.1, 0.1, 0.1]}
          >
            <meshStandardMaterial
              color="#e0e7ff"
              emissive="#6366f1"
              emissiveIntensity={0.5}
            />
          </Box>
        </Float>
      ))}

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </>
  )
}

export function Spatial3DCanvas() {
  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <Scene3D />
      </Canvas>

      {/* Overlay UI */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main Card Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-auto"
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/50">
            {/* Profile Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              S.STUDIO
            </h1>

            {/* Roles */}
            <div className="space-y-2 mb-8">
              <p className="text-gray-600">Web Designer</p>
              <p className="text-gray-600">Developer</p>
              <p className="text-gray-600">Personal Trainer</p>
              <p className="text-gray-600">SEO Writer</p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-red-600 flex items-center justify-center text-white shadow-lg"
              >
                <Instagram className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-black flex items-center justify-center text-white shadow-lg"
              >
                <Twitter className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white shadow-lg"
              >
                <Mail className="w-6 h-6" />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Service Cards Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute inset-0"
        >
          {/* Web Designer Card */}
          <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-amber-50/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-amber-200/50">
              <Palette className="w-8 h-8 text-amber-600 mb-2" />
              <h3 className="font-semibold text-amber-900">Web Designer</h3>
              <p className="text-sm text-amber-700 mt-1">美しいUI/UXデザイン</p>
            </div>
          </div>

          {/* Developer Card */}
          <div className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2">
            <div className="bg-blue-50/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-blue-200/50">
              <Code2 className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-semibold text-blue-900">Developer</h3>
              <p className="text-sm text-blue-700 mt-1">モダンな開発技術</p>
            </div>
          </div>

          {/* Personal Trainer Card */}
          <div className="absolute bottom-1/4 left-1/4 transform -translate-x-1/2 translate-y-1/2">
            <div className="bg-red-50/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-red-200/50">
              <Dumbbell className="w-8 h-8 text-red-600 mb-2" />
              <h3 className="font-semibold text-red-900">Personal Trainer</h3>
              <p className="text-sm text-red-700 mt-1">健康的なライフスタイル</p>
            </div>
          </div>

          {/* SEO Writer Card */}
          <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2">
            <div className="bg-purple-50/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-purple-200/50">
              <PenTool className="w-8 h-8 text-purple-600 mb-2" />
              <h3 className="font-semibold text-purple-900">SEO Writer</h3>
              <p className="text-sm text-purple-700 mt-1">検索最適化コンテンツ</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}