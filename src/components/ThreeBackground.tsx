"use client"

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function Particles() {
  const points = useRef<THREE.Points>(null!)
  const particleCount = 500

  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [particleCount])

  const sizes = useMemo(() => {
    const sizes = new Float32Array(particleCount)
    for (let i = 0; i < particleCount; i++) {
      sizes[i] = Math.random() * 0.05
    }
    return sizes
  }, [particleCount])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (points.current) {
      points.current.rotation.x = time * 0.1
      points.current.rotation.y = time * 0.15
      
      const positions = points.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3
        positions[idx + 1] = Math.sin(time + positions[idx]) * 0.3 + positions[idx + 1]
      }
      points.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={sizes}
          itemSize={1}
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#9ca3af"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function LiquidMesh() {
  const mesh = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(time * 0.3) * 0.1
      mesh.current.rotation.y = Math.sin(time * 0.2) * 0.1
      mesh.current.position.y = Math.sin(time * 0.5) * 0.2
    }
  })

  return (
    <mesh ref={mesh} position={[0, 0, -2]}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial
        color="#f5f5f5"
        roughness={0.1}
        metalness={0.8}
        transparent
        opacity={0.3}
        wireframe
      />
    </mesh>
  )
}

export function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <Particles />
        <LiquidMesh />
        <fog attach="fog" args={['#fafafa', 5, 15]} />
      </Canvas>
    </div>
  )
}