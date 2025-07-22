"use client"

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useMemo, useState } from 'react'
import * as THREE from 'three'
import { Text } from '@react-three/drei'
import { useRouter } from 'next/navigation'
import { useScroll } from 'framer-motion'

interface Node {
  id: string
  position: THREE.Vector3
  velocity: THREE.Vector3
  connections: string[]
  size: number
  label: string
  href?: string
  color: string
}

function InteractiveNode({ node, isHovered, onHover, onClick }: { 
  node: Node
  isHovered: boolean
  onHover: (id: string | null) => void
  onClick: (href?: string) => void
}) {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.scale.setScalar(isHovered ? 1.3 : 1)
      // Gentle floating animation
      meshRef.current.position.y = node.position.y + Math.sin(time * 2 + node.position.x) * 0.05
    }
  })
  
  return (
    <group position={node.position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => onHover(node.id)}
        onPointerOut={() => onHover(null)}
        onClick={() => onClick(node.href)}
      >
        <sphereGeometry args={[node.size, 32, 32]} />
        <meshStandardMaterial
          color={isHovered ? "#9ca3af" : node.color}
          emissive={node.color}
          emissiveIntensity={isHovered ? 0.3 : 0.1}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      <Text
        position={[0, node.size + 0.5, 0]}
        fontSize={0.3}
        color="#6b7280"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-v12-latin-regular.woff"
      >
        {node.label}
      </Text>
    </group>
  )
}

function GraphNetwork() {
  const groupRef = useRef<THREE.Group>(null!)
  const router = useRouter()
  const { scrollYProgress } = useScroll()
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  
  // Create nodes with actual links
  const { nodes, connections } = useMemo(() => {
    const nodeData: Node[] = [
      { 
        id: 'home', 
        position: new THREE.Vector3(0, 0, 0), 
        velocity: new THREE.Vector3(0, 0, 0), 
        connections: ['training', 'webdesign', 'appdev', 'writing'], 
        size: 0.8, 
        label: 'S.STUDIO',
        href: '/',
        color: '#e5e5e5'
      },
      { 
        id: 'training', 
        position: new THREE.Vector3(3, 1, 0), 
        velocity: new THREE.Vector3(0, 0, 0), 
        connections: ['training-price', 'training-access', 'training-program'], 
        size: 0.6, 
        label: 'TRAINING',
        href: '/services/personal-training',
        color: '#d4d4d8'
      },
      { 
        id: 'webdesign', 
        position: new THREE.Vector3(-3, 1, 0), 
        velocity: new THREE.Vector3(0, 0, 0), 
        connections: ['web-portfolio', 'web-process', 'web-price'], 
        size: 0.6, 
        label: 'WEBDESIGN',
        href: '/services/web-design',
        color: '#d4d4d8'
      },
      { 
        id: 'appdev', 
        position: new THREE.Vector3(0, -3, 0), 
        velocity: new THREE.Vector3(0, 0, 0), 
        connections: ['app-mobile', 'app-web', 'app-cloud'], 
        size: 0.6, 
        label: 'APP DEV',
        href: '/services/app-development',
        color: '#d4d4d8'
      },
      { 
        id: 'writing', 
        position: new THREE.Vector3(0, 3, 0), 
        velocity: new THREE.Vector3(0, 0, 0), 
        connections: ['writing-seo', 'writing-content', 'writing-blog'], 
        size: 0.6, 
        label: 'WRITING',
        href: '/services/seo-writing',
        color: '#d4d4d8'
      },
      
      // Training sub-nodes
      { id: 'training-price', position: new THREE.Vector3(5, 2, 0), velocity: new THREE.Vector3(0, 0, 0), connections: [], size: 0.4, label: 'PRICE', color: '#e5e7eb' },
      { id: 'training-access', position: new THREE.Vector3(4.5, 0, 0), velocity: new THREE.Vector3(0, 0, 0), connections: [], size: 0.4, label: 'ACCESS', color: '#e5e7eb' },
      { id: 'training-program', position: new THREE.Vector3(5, -1, 0), velocity: new THREE.Vector3(0, 0, 0), connections: [], size: 0.4, label: 'PROGRAM', color: '#e5e7eb' },
      
      // Web Design sub-nodes
      { id: 'web-portfolio', position: new THREE.Vector3(-5, 2, 0), velocity: new THREE.Vector3(0, 0, 0), connections: [], size: 0.4, label: 'PORTFOLIO', color: '#e5e7eb' },
      { id: 'web-process', position: new THREE.Vector3(-4.5, 0, 0), velocity: new THREE.Vector3(0, 0, 0), connections: [], size: 0.4, label: 'PROCESS', color: '#e5e7eb' },
      { id: 'web-price', position: new THREE.Vector3(-5, -1, 0), velocity: new THREE.Vector3(0, 0, 0), connections: [], size: 0.4, label: 'PRICE', color: '#e5e7eb' },
      
      // App Dev sub-nodes
      { id: 'app-mobile', position: new THREE.Vector3(-1.5, -4.5, 0), velocity: new THREE.Vector3(0, 0, 0), connections: [], size: 0.4, label: 'MOBILE', color: '#e5e7eb' },
      { id: 'app-web', position: new THREE.Vector3(0, -5, 0), velocity: new THREE.Vector3(0, 0, 0), connections: [], size: 0.4, label: 'WEB APP', color: '#e5e7eb' },
      { id: 'app-cloud', position: new THREE.Vector3(1.5, -4.5, 0), velocity: new THREE.Vector3(0, 0, 0), connections: [], size: 0.4, label: 'CLOUD', color: '#e5e7eb' },
      
      // Writing sub-nodes
      { id: 'writing-seo', position: new THREE.Vector3(-1.5, 4.5, 0), velocity: new THREE.Vector3(0, 0, 0), connections: [], size: 0.4, label: 'SEO', color: '#e5e7eb' },
      { id: 'writing-content', position: new THREE.Vector3(0, 5, 0), velocity: new THREE.Vector3(0, 0, 0), connections: [], size: 0.4, label: 'CONTENT', color: '#e5e7eb' },
      { id: 'writing-blog', position: new THREE.Vector3(1.5, 4.5, 0), velocity: new THREE.Vector3(0, 0, 0), connections: [], size: 0.4, label: 'BLOG', color: '#e5e7eb' },
    ]
    
    const nodeMap = new Map(nodeData.map(n => [n.id, n]))
    const connectionLines: [THREE.Vector3, THREE.Vector3][] = []
    
    nodeData.forEach(node => {
      node.connections.forEach(targetId => {
        const target = nodeMap.get(targetId)
        if (target) {
          connectionLines.push([node.position, target.position])
        }
      })
    })
    
    return { nodes: nodeData, connections: connectionLines }
  }, [])
  
  const handleNodeClick = (href?: string) => {
    if (href) {
      router.push(href)
    }
  }
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const scrollValue = scrollYProgress.get()
    
    if (groupRef.current) {
      // Gentle rotation
      groupRef.current.rotation.y = time * 0.05 + scrollValue * Math.PI * 0.5
      
      // Zoom based on scroll
      const scale = 1 + scrollValue * 0.3
      groupRef.current.scale.set(scale, scale, scale)
    }
    
    // Camera orbit
    const cameraRadius = 8
    state.camera.position.x = Math.sin(time * 0.03) * cameraRadius
    state.camera.position.z = Math.cos(time * 0.03) * cameraRadius
    state.camera.position.y = 2
    state.camera.lookAt(0, 0, 0)
  })
  
  return (
    <group ref={groupRef}>
      {/* Render connections */}
      {connections.map((connection, i) => {
        const points = [connection[0], connection[1]]
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
        
        return (
          <line key={i}>
            <bufferGeometry attach="geometry">
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
                itemSize={3}
                args={[new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial 
              color="#e5e7eb" 
              transparent 
              opacity={0.2}
            />
          </line>
        )
      })}
      
      {/* Render nodes */}
      {nodes.map((node) => (
        <InteractiveNode
          key={node.id}
          node={node}
          isHovered={hoveredNode === node.id}
          onHover={setHoveredNode}
          onClick={handleNodeClick}
        />
      ))}
    </group>
  )
}

export function InteractiveGraphBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} />
        <GraphNetwork />
        <fog attach="fog" args={['#fafafa', 15, 30]} />
      </Canvas>
    </div>
  )
}