"use client"

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { Html } from '@react-three/drei'
import Link from 'next/link'
import { useScroll } from 'framer-motion'

interface Cell {
  id: string
  position: THREE.Vector3
  velocity: THREE.Vector3
  size: number
  label?: string
  href?: string
  isMain?: boolean
}

function VolvoxCell({ cell, parentRef }: { cell: Cell; parentRef: React.RefObject<THREE.Group> }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const htmlRef = useRef<HTMLDivElement>(null!)
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (meshRef.current && parentRef.current) {
      // Organic floating movement within the sphere
      const radius = 3
      const theta = time * 0.3 + cell.id.charCodeAt(0)
      const phi = time * 0.2 + cell.id.charCodeAt(1)
      
      const x = cell.position.x + Math.sin(theta) * Math.cos(phi) * 0.3
      const y = cell.position.y + Math.sin(phi) * 0.3
      const z = cell.position.z + Math.cos(theta) * Math.sin(phi) * 0.3
      
      // Keep cells within the main sphere
      const distance = Math.sqrt(x * x + y * y + z * z)
      if (distance > radius - cell.size) {
        const scale = (radius - cell.size) / distance
        meshRef.current.position.set(x * scale, y * scale, z * scale)
      } else {
        meshRef.current.position.set(x, y, z)
      }
      
      // Gentle pulsing
      const pulse = 1 + Math.sin(time * 3 + cell.id.charCodeAt(0)) * 0.1
      meshRef.current.scale.setScalar(pulse)
    }
  })
  
  return (
    <group>
      <mesh ref={meshRef} position={[cell.position.x, cell.position.y, cell.position.z]}>
        <sphereGeometry args={[cell.size, 16, 16]} />
        <meshPhysicalMaterial
          color={cell.isMain ? "#d4d4d8" : "#e5e7eb"}
          transmission={0.9}
          thickness={0.5}
          roughness={0.1}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent
          opacity={0.7}
        />
      </mesh>
      {cell.label && cell.href && (
        <Html center position={[cell.position.x, cell.position.y, cell.position.z]}>
          <div ref={htmlRef}>
            <Link 
              href={cell.href}
              className="text-gray-600 text-xs hover:text-gray-400 transition-colors whitespace-nowrap backdrop-blur-sm bg-white/30 px-2 py-1 rounded"
            >
              {cell.label}
            </Link>
          </div>
        </Html>
      )}
    </group>
  )
}

function VolvoxColony() {
  const groupRef = useRef<THREE.Group>(null!)
  const { scrollYProgress } = useScroll()
  
  // Create cells for the volvox structure
  const cells = useMemo(() => {
    const cellData: Cell[] = []
    
    // Main navigation cells
    cellData.push({
      id: 'center',
      position: new THREE.Vector3(0, 0, 0),
      velocity: new THREE.Vector3(0, 0, 0),
      size: 0.6,
      label: 'S.STUDIO',
      href: '/',
      isMain: true
    })
    
    // Service cells in a spherical arrangement
    const services = [
      { label: 'TRAINING', href: '/services/personal-training' },
      { label: 'WEBDESIGN', href: '/services/web-design' },
      { label: 'APP DEV', href: '/services/app-development' },
      { label: 'WRITING', href: '/services/seo-writing' }
    ]
    
    services.forEach((service, i) => {
      const angle = (i / services.length) * Math.PI * 2
      const x = Math.cos(angle) * 1.5
      const y = Math.sin(angle) * 1.5
      const z = Math.sin(i) * 0.5
      
      cellData.push({
        id: `service-${i}`,
        position: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(0, 0, 0),
        size: 0.4,
        label: service.label,
        href: service.href,
        isMain: true
      })
    })
    
    // Smaller decorative cells
    for (let i = 0; i < 30; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const radius = 2.5 + Math.random() * 0.5
      
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)
      
      cellData.push({
        id: `cell-${i}`,
        position: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(0, 0, 0),
        size: 0.1 + Math.random() * 0.15
      })
    }
    
    return cellData
  }, [])
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const scrollValue = scrollYProgress.get()
    
    if (groupRef.current) {
      // Rotate the entire colony
      groupRef.current.rotation.y = time * 0.05 + scrollValue * Math.PI
      groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.1
      
      // Breathing effect
      const breathe = 1 + Math.sin(time * 0.5) * 0.05
      groupRef.current.scale.setScalar(breathe)
    }
    
    // Camera movement
    const cameraRadius = 8 + Math.sin(scrollValue * Math.PI) * 2
    state.camera.position.x = Math.sin(time * 0.02) * cameraRadius
    state.camera.position.z = Math.cos(time * 0.02) * cameraRadius
    state.camera.position.y = Math.sin(time * 0.03) * 2
    state.camera.lookAt(0, 0, 0)
  })
  
  return (
    <group ref={groupRef}>
      {/* Outer transparent sphere */}
      <mesh>
        <sphereGeometry args={[3, 32, 32]} />
        <meshPhysicalMaterial
          color="#f5f5f5"
          transmission={0.95}
          thickness={0.1}
          roughness={0.1}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Inner cells */}
      {cells.map(cell => (
        <VolvoxCell key={cell.id} cell={cell} parentRef={groupRef} />
      ))}
      
      {/* Connection lines between main cells */}
      {cells.filter(c => c.isMain).map((cell, i) => {
        if (i === 0) return null
        return (
          <line key={`line-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([0, 0, 0, cell.position.x, cell.position.y, cell.position.z])}
                itemSize={3}
                args={[new Float32Array([0, 0, 0, cell.position.x, cell.position.y, cell.position.z]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#e5e7eb" opacity={0.2} transparent />
          </line>
        )
      })}
    </group>
  )
}

export function VolvoxBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <VolvoxColony />
        <fog attach="fog" args={['#fafafa', 15, 35]} />
      </Canvas>
    </div>
  )
}