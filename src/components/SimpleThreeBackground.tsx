"use client"

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { useScroll } from 'framer-motion'

function AnimatedMesh() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const { scrollYProgress } = useScroll()
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const scrollValue = scrollYProgress.get()
    
    if (meshRef.current) {
      // Rotate based on time and scroll
      meshRef.current.rotation.x = time * 0.2 + scrollValue * Math.PI * 2
      meshRef.current.rotation.y = time * 0.1 + scrollValue * Math.PI
      
      // Scale based on scroll (changes shape appearance)
      const scaleX = 1 + Math.sin(scrollValue * Math.PI * 4) * 0.5
      const scaleY = 1 + Math.cos(scrollValue * Math.PI * 4) * 0.5
      const scaleZ = 1 + Math.sin(scrollValue * Math.PI * 6) * 0.3
      meshRef.current.scale.set(scaleX, scaleY, scaleZ)
      
      // Move mesh
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.5 - scrollValue * 3
      meshRef.current.position.z = -2 - scrollValue * 2
    }
    
    // Dynamic camera movement
    const cameraRadius = 6 + Math.sin(scrollValue * Math.PI) * 2
    state.camera.position.x = Math.sin(time * 0.1) * cameraRadius
    state.camera.position.y = scrollValue * 2
    state.camera.position.z = Math.cos(time * 0.1) * cameraRadius
    state.camera.lookAt(0, -scrollValue * 2, 0)
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial
        color="#e5e5e5"
        roughness={0.1}
        metalness={0.8}
        transparent
        opacity={0.4}
        wireframe
      />
    </mesh>
  )
}

export function SimpleThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <AnimatedMesh />
        <fog attach="fog" args={['#fafafa', 8, 20]} />
      </Canvas>
    </div>
  )
}