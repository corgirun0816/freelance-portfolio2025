"use client"

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useScroll } from 'framer-motion'

function TransformingWireframe() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const geometryRef = useRef<THREE.BufferGeometry>(null!)
  const { scrollYProgress } = useScroll()
  
  // Create initial sphere vertices
  const { positions, originalPositions } = useMemo(() => {
    const radius = 2
    const segments = 32
    const rings = 16
    const vertices = []
    const original = []
    
    for (let i = 0; i <= rings; i++) {
      const theta = (i / rings) * Math.PI
      for (let j = 0; j <= segments; j++) {
        const phi = (j / segments) * Math.PI * 2
        
        const x = radius * Math.sin(theta) * Math.cos(phi)
        const y = radius * Math.cos(theta)
        const z = radius * Math.sin(theta) * Math.sin(phi)
        
        vertices.push(x, y, z)
        original.push(x, y, z)
      }
    }
    
    return {
      positions: new Float32Array(vertices),
      originalPositions: new Float32Array(original)
    }
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const scrollValue = scrollYProgress.get()
    
    if (geometryRef.current && meshRef.current) {
      const positionAttribute = geometryRef.current.getAttribute('position')
      const positions = positionAttribute.array as Float32Array
      
      // Different transformations based on scroll
      for (let i = 0; i < positions.length; i += 3) {
        const x = originalPositions[i]
        const y = originalPositions[i + 1]
        const z = originalPositions[i + 2]
        
        // Calculate distance from center
        const dist = Math.sqrt(x * x + y * y + z * z)
        
        if (scrollValue < 0.2) {
          // Perfect sphere (0-20%)
          positions[i] = x
          positions[i + 1] = y
          positions[i + 2] = z
        } else if (scrollValue < 0.4) {
          // Morphing to cube (20-40%)
          const progress = (scrollValue - 0.2) / 0.2
          const cubeX = x * (1 + Math.abs(x) * progress)
          const cubeY = y * (1 + Math.abs(y) * progress)
          const cubeZ = z * (1 + Math.abs(z) * progress)
          
          positions[i] = x + (cubeX - x) * progress
          positions[i + 1] = y + (cubeY - y) * progress
          positions[i + 2] = z + (cubeZ - z) * progress
        } else if (scrollValue < 0.6) {
          // Morphing to torus (40-60%)
          const progress = (scrollValue - 0.4) / 0.2
          const angle = Math.atan2(z, x)
          const ringRadius = 2
          const tubeRadius = 0.7
          
          const torusX = (ringRadius + tubeRadius * (y / dist)) * Math.cos(angle)
          const torusY = tubeRadius * (y / dist) * Math.sin(Math.atan2(dist, y))
          const torusZ = (ringRadius + tubeRadius * (y / dist)) * Math.sin(angle)
          
          positions[i] = x + (torusX - x) * progress
          positions[i + 1] = y + (torusY - y) * progress
          positions[i + 2] = z + (torusZ - z) * progress
        } else if (scrollValue < 0.8) {
          // Morphing to spiky star (60-80%)
          const progress = (scrollValue - 0.6) / 0.2
          const spike = Math.sin(Math.atan2(y, x) * 5) * Math.cos(Math.atan2(z, x) * 3)
          const spikeRadius = dist * (1 + spike * 0.5 * progress)
          
          positions[i] = (x / dist) * spikeRadius
          positions[i + 1] = (y / dist) * spikeRadius
          positions[i + 2] = (z / dist) * spikeRadius
        } else {
          // Morphing to DNA helix (80-100%)
          const progress = (scrollValue - 0.8) / 0.2
          const t = Math.atan2(z, x) + y * 2
          const helixRadius = 1.5
          
          const helixX = helixRadius * Math.cos(t + time * 0.5)
          const helixY = y
          const helixZ = helixRadius * Math.sin(t + time * 0.5)
          
          positions[i] = x + (helixX - x) * progress
          positions[i + 1] = y
          positions[i + 2] = z + (helixZ - z) * progress
        }
        
        // Add subtle animation
        const wave = Math.sin(time * 2 + i * 0.01) * 0.02
        positions[i] += wave
        positions[i + 1] += wave
        positions[i + 2] += wave
      }
      
      positionAttribute.needsUpdate = true
      
      // Rotate mesh
      meshRef.current.rotation.y = time * 0.1 + scrollValue * Math.PI
      meshRef.current.position.y = -scrollValue * 2
    }
    
    // Camera movement
    const cameraRadius = 6 + Math.sin(scrollValue * Math.PI * 2) * 2
    state.camera.position.x = Math.sin(time * 0.05) * cameraRadius
    state.camera.position.z = Math.cos(time * 0.05) * cameraRadius
    state.camera.position.y = 2 + scrollValue * 2
    state.camera.lookAt(0, -scrollValue * 2, 0)
  })

  return (
    <mesh ref={meshRef}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <meshBasicMaterial
        color="#d4d4d4"
        wireframe
        transparent
        opacity={0.6}
      />
    </mesh>
  )
}

export function TransformingThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <TransformingWireframe />
        <fog attach="fog" args={['#fafafa', 10, 25]} />
      </Canvas>
    </div>
  )
}