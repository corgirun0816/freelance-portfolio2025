"use client"

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

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
        <LiquidMesh />
        <fog attach="fog" args={['#fafafa', 5, 15]} />
      </Canvas>
    </div>
  )
}