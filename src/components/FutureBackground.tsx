"use client"

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { useScroll, useMotionValue, useTransform } from 'framer-motion'

function DataStream() {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const particleCount = 1000
  const dummy = new THREE.Object3D()
  
  const particles = useRef({
    positions: new Float32Array(particleCount * 3),
    velocities: new Float32Array(particleCount * 3),
    scales: new Float32Array(particleCount)
  })
  
  // Initialize particles
  for (let i = 0; i < particleCount; i++) {
    particles.current.positions[i * 3] = (Math.random() - 0.5) * 20
    particles.current.positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    particles.current.positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    
    particles.current.velocities[i * 3] = (Math.random() - 0.5) * 0.02
    particles.current.velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02
    particles.current.velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02
    
    particles.current.scales[i] = Math.random() * 0.5 + 0.1
  }
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    for (let i = 0; i < particleCount; i++) {
      // Update positions
      particles.current.positions[i * 3] += particles.current.velocities[i * 3]
      particles.current.positions[i * 3 + 1] += particles.current.velocities[i * 3 + 1]
      particles.current.positions[i * 3 + 2] += particles.current.velocities[i * 3 + 2]
      
      // Wrap around
      for (let j = 0; j < 3; j++) {
        if (Math.abs(particles.current.positions[i * 3 + j]) > 10) {
          particles.current.positions[i * 3 + j] *= -0.9
          particles.current.velocities[i * 3 + j] *= -1
        }
      }
      
      // Set instance transform
      dummy.position.set(
        particles.current.positions[i * 3],
        particles.current.positions[i * 3 + 1],
        particles.current.positions[i * 3 + 2]
      )
      
      const scale = particles.current.scales[i] * (1 + Math.sin(time * 2 + i) * 0.2)
      dummy.scale.setScalar(scale)
      dummy.updateMatrix()
      
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true
  })
  
  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, particleCount]}>
      <boxGeometry args={[0.05, 0.05, 0.05]} />
      <meshBasicMaterial color="#e5e5e5" />
    </instancedMesh>
  )
}

function QuantumGrid() {
  const { scrollYProgress } = useScroll()
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const scroll = scrollYProgress.get()
    
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.1
      meshRef.current.rotation.y = time * 0.05
      meshRef.current.scale.setScalar(1 + scroll * 0.5)
    }
  })
  
  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[2, 0.3, 128, 16]} />
      <meshBasicMaterial color="#d4d4d4" wireframe />
    </mesh>
  )
}

export function FutureBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <DataStream />
        <QuantumGrid />
        <fog attach="fog" args={['#ffffff', 5, 20]} />
      </Canvas>
    </div>
  )
}