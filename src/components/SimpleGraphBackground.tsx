"use client"

import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import { useRouter } from 'next/navigation'

interface Node {
  id: string
  position: [number, number, number]
  label: string
  href?: string
  size: number
}

function GraphNode({ node, onClick }: { node: Node; onClick: (href?: string) => void }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.scale.setScalar(hovered ? 1.2 : 1)
      // Floating animation
      const baseY = node.position[1]
      meshRef.current.position.y = baseY + Math.sin(time * 2 + node.position[0]) * 0.05
    }
  })
  
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    console.log('Clicked node:', node.label, node.href)
    onClick(node.href)
  }
  
  return (
    <mesh
      ref={meshRef}
      position={node.position}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setHovered(false)
        document.body.style.cursor = 'auto'
      }}
      onClick={handleClick}
    >
      <sphereGeometry args={[node.size, 32, 32]} />
      <meshStandardMaterial
        color={hovered ? "#9ca3af" : "#e5e5e5"}
        metalness={0.3}
        roughness={0.7}
      />
    </mesh>
  )
}

export function SimpleGraphBackground() {
  const router = useRouter()
  
  const nodes: Node[] = [
    { id: 'home', position: [0, 0, 0], label: 'S.STUDIO', href: '/', size: 0.8 },
    { id: 'training', position: [3, 1, 0], label: 'TRAINING', href: '/services/personal-training', size: 0.6 },
    { id: 'web', position: [-3, 1, 0], label: 'WEBDESIGN', href: '/services/web-design', size: 0.6 },
    { id: 'app', position: [0, -3, 0], label: 'APP DEV', href: '/services/app-development', size: 0.6 },
    { id: 'writing', position: [0, 3, 0], label: 'WRITING', href: '/services/seo-writing', size: 0.6 },
  ]
  
  const handleClick = (href?: string) => {
    if (href) {
      console.log('Navigating to:', href)
      router.push(href)
    }
  }
  
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        
        {/* Lines */}
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([0, 0, 0, 3, 1, 0])}
              itemSize={3}
              args={[new Float32Array([0, 0, 0, 3, 1, 0]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#e5e7eb" opacity={0.3} transparent />
        </line>
        
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([0, 0, 0, -3, 1, 0])}
              itemSize={3}
              args={[new Float32Array([0, 0, 0, -3, 1, 0]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#e5e7eb" opacity={0.3} transparent />
        </line>
        
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([0, 0, 0, 0, -3, 0])}
              itemSize={3}
              args={[new Float32Array([0, 0, 0, 0, -3, 0]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#e5e7eb" opacity={0.3} transparent />
        </line>
        
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([0, 0, 0, 0, 3, 0])}
              itemSize={3}
              args={[new Float32Array([0, 0, 0, 0, 3, 0]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#e5e7eb" opacity={0.3} transparent />
        </line>
        
        {/* Nodes */}
        {nodes.map(node => (
          <GraphNode key={node.id} node={node} onClick={handleClick} />
        ))}
        
        <fog attach="fog" args={['#fafafa', 10, 25]} />
      </Canvas>
    </div>
  )
}