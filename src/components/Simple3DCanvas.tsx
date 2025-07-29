"use client"

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, Text, Box, Sphere, MeshDistortMaterial, Environment } from '@react-three/drei'
import * as THREE from 'three'

// Glass Card Component
function GlassCard({ 
  position = [0, 0, 0],
  size = [3, 2, 0.1],
  color = '#ffffff',
  title = '',
  subtitle = '',
  onClick
}: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
      <group position={position}>
        <Box
          ref={meshRef}
          args={size}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={onClick}
        >
          <MeshDistortMaterial
            color={color}
            transparent
            opacity={0.9}
            distort={0.1}
            speed={2}
            roughness={0}
            metalness={0.9}
            envMapIntensity={1}
          />
        </Box>
        
        {/* Title Text */}
        {title && (
          <Text
            position={[0, 0.3, 0.1]}
            fontSize={0.3}
            color="#333"
            anchorX="center"
            anchorY="middle"
          >
            {title}
          </Text>
        )}
        
        {/* Subtitle */}
        {subtitle && (
          <Text
            position={[0, -0.1, 0.1]}
            fontSize={0.15}
            color="#666"
            anchorX="center"
            anchorY="middle"
          >
            {subtitle}
          </Text>
        )}
        
        {/* Glow effect on hover */}
        {hovered && (
          <Box args={[size[0] + 0.1, size[1] + 0.1, 0.05]} position={[0, 0, -0.1]}>
            <meshBasicMaterial color={color} transparent opacity={0.2} />
          </Box>
        )}
      </group>
    </Float>
  )
}

// Social Sphere Component
function SocialSphere({ position, color, onClick }: any) {
  const [hovered, setHovered] = useState(false)
  
  return (
    <Float speed={3} floatIntensity={0.5}>
      <Sphere
        args={[0.3, 32, 32]}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
        scale={hovered ? 1.2 : 1}
      >
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.9}
          distort={0.2}
          speed={2}
          roughness={0}
          metalness={0.9}
        />
      </Sphere>
    </Float>
  )
}

// Main Scene
function Scene() {
  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      {/* Main Card */}
      <GlassCard
        position={[0, 0, 0]}
        size={[4, 3, 0.1]}
        color="#f3f4f6"
        title="S.STUDIO"
        subtitle="Creative Digital Solutions"
      />
      
      {/* Service Cards */}
      <GlassCard
        position={[-5, 2, -2]}
        size={[3, 2, 0.1]}
        color="#fef3c7"
        title="Web Design"
        subtitle="UI/UX"
      />
      
      <GlassCard
        position={[5, 2, -2]}
        size={[3, 2, 0.1]}
        color="#dbeafe"
        title="Development"
        subtitle="React & Next.js"
      />
      
      <GlassCard
        position={[-5, -2, -2]}
        size={[3, 2, 0.1]}
        color="#fecaca"
        title="Training"
        subtitle="Fitness"
      />
      
      <GlassCard
        position={[5, -2, -2]}
        size={[3, 2, 0.1]}
        color="#e9d5ff"
        title="SEO Writing"
        subtitle="Content"
      />
      
      {/* Social Spheres */}
      <SocialSphere position={[-1.5, -4, 0]} color="#E4405F" />
      <SocialSphere position={[0, -4, 0]} color="#1DA1F2" />
      <SocialSphere position={[1.5, -4, 0]} color="#0077B5" />
      
      {/* Profile Text */}
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.2}
        color="#666"
        anchorX="center"
        textAlign="center"
      >
        Web Designer • Developer{'\n'}Personal Trainer • SEO Writer
      </Text>
      
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.5}
        maxDistance={15}
        minDistance={5}
      />
    </>
  )
}

export function Simple3DCanvas() {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <Scene />
      </Canvas>
      
      {/* Overlay for debugging */}
      <div className="absolute top-4 left-4 bg-white/80 backdrop-blur p-4 rounded-lg">
        <p className="text-sm text-gray-600">3D Canvas Loaded</p>
      </div>
    </div>
  )
}