"use client"

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { Html } from '@react-three/drei'
import Link from 'next/link'

interface Node {
  id: string
  position: [number, number, number]
  label: string
  href: string
  size: number
}

function GraphNode({ node }: { node: Node }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      const baseY = node.position[1]
      meshRef.current.position.y = baseY + Math.sin(time * 2 + node.position[0]) * 0.05
    }
  })
  
  return (
    <group position={node.position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[node.size, 32, 32]} />
        <meshStandardMaterial
          color="#e5e5e5"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      <Html center>
        <Link 
          href={node.href}
          className="text-gray-600 text-sm hover:text-gray-400 transition-colors whitespace-nowrap"
          style={{ 
            transform: 'translateY(-50px)',
            display: 'block',
            textAlign: 'center'
          }}
        >
          {node.label}
        </Link>
      </Html>
    </group>
  )
}

export function ClickableGraphBackground() {
  const nodes: Node[] = [
    { id: 'home', position: [0, 0, 0], label: 'S.STUDIO', href: '/', size: 0.8 },
    { id: 'training', position: [3, 1, 0], label: 'TRAINING', href: '/services/personal-training', size: 0.6 },
    { id: 'web', position: [-3, 1, 0], label: 'WEBDESIGN', href: '/services/web-design', size: 0.6 },
    { id: 'app', position: [0, -3, 0], label: 'APP DEV', href: '/services/app-development', size: 0.6 },
    { id: 'writing', position: [0, 3, 0], label: 'WRITING', href: '/services/seo-writing', size: 0.6 },
  ]
  
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        
        {/* Connection lines */}
        {nodes.slice(1).map((node, i) => (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([0, 0, 0, ...node.position])}
                itemSize={3}
                args={[new Float32Array([0, 0, 0, ...node.position]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#e5e7eb" opacity={0.3} transparent />
          </line>
        ))}
        
        {/* Nodes with HTML labels */}
        {nodes.map(node => (
          <GraphNode key={node.id} node={node} />
        ))}
        
        <fog attach="fog" args={['#fafafa', 10, 25]} />
      </Canvas>
    </div>
  )
}