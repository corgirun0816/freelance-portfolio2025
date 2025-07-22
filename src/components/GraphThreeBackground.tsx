"use client"

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useMemo, useState } from 'react'
import * as THREE from 'three'
import { useScroll } from 'framer-motion'

interface Node {
  id: string
  position: THREE.Vector3
  velocity: THREE.Vector3
  connections: string[]
  size: number
  label: string
}

function GraphNetwork() {
  const groupRef = useRef<THREE.Group>(null!)
  const { scrollYProgress } = useScroll()
  const { viewport } = useThree()
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  
  // Create nodes and connections
  const { nodes, connections } = useMemo(() => {
    const nodeData: Node[] = [
      { id: 'center', position: new THREE.Vector3(0, 0, 0), velocity: new THREE.Vector3(0, 0, 0), connections: ['training', 'web', 'app', 'writing'], size: 1.2, label: 'S.STUDIO' },
      { id: 'training', position: new THREE.Vector3(3, 2, -1), velocity: new THREE.Vector3(0, 0, 0), connections: ['fitness', 'nutrition', 'mindset'], size: 0.8, label: 'TRAINING' },
      { id: 'web', position: new THREE.Vector3(-3, 1, 2), velocity: new THREE.Vector3(0, 0, 0), connections: ['ui', 'ux', 'responsive'], size: 0.8, label: 'WEB DESIGN' },
      { id: 'app', position: new THREE.Vector3(2, -2, 3), velocity: new THREE.Vector3(0, 0, 0), connections: ['mobile', 'cloud', 'api'], size: 0.8, label: 'APP DEV' },
      { id: 'writing', position: new THREE.Vector3(-2, -1, -2), velocity: new THREE.Vector3(0, 0, 0), connections: ['seo', 'content', 'strategy'], size: 0.8, label: 'WRITING' },
      
      // Sub-nodes
      { id: 'fitness', position: new THREE.Vector3(5, 3, -2), velocity: new THREE.Vector3(0, 0, 0), connections: [], size: 0.5, label: 'FITNESS' },
      { id: 'nutrition', position: new THREE.Vector3(4, 4, 0), velocity: new THREE.Vector3(0, 0, 0), connections: [], size: 0.5, label: 'NUTRITION' },
      { id: 'mindset', position: new THREE.Vector3(6, 1, -1), velocity: new THREE.Vector3(0, 0, 0), connections: [], size: 0.5, label: 'MINDSET' },
      
      { id: 'ui', position: new THREE.Vector3(-5, 2, 3), velocity: new THREE.Vector3(0, 0, 0), connections: [], size: 0.5, label: 'UI' },
      { id: 'ux', position: new THREE.Vector3(-4, 0, 4), velocity: new THREE.Vector3(0, 0, 0), connections: [], size: 0.5, label: 'UX' },
      { id: 'responsive', position: new THREE.Vector3(-6, 1, 1), velocity: new THREE.Vector3(0, 0, 0), connections: [], size: 0.5, label: 'RESPONSIVE' },
      
      { id: 'mobile', position: new THREE.Vector3(3, -3, 5), velocity: new THREE.Vector3(0, 0, 0), connections: [], size: 0.5, label: 'MOBILE' },
      { id: 'cloud', position: new THREE.Vector3(4, -1, 4), velocity: new THREE.Vector3(0, 0, 0), connections: [], size: 0.5, label: 'CLOUD' },
      { id: 'api', position: new THREE.Vector3(1, -4, 3), velocity: new THREE.Vector3(0, 0, 0), connections: [], size: 0.5, label: 'API' },
      
      { id: 'seo', position: new THREE.Vector3(-3, -2, -3), velocity: new THREE.Vector3(0, 0, 0), connections: [], size: 0.5, label: 'SEO' },
      { id: 'content', position: new THREE.Vector3(-4, 0, -4), velocity: new THREE.Vector3(0, 0, 0), connections: [], size: 0.5, label: 'CONTENT' },
      { id: 'strategy', position: new THREE.Vector3(-1, -3, -3), velocity: new THREE.Vector3(0, 0, 0), connections: [], size: 0.5, label: 'STRATEGY' },
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
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const scrollValue = scrollYProgress.get()
    
    if (groupRef.current) {
      // Rotate entire graph
      groupRef.current.rotation.y = time * 0.1 + scrollValue * Math.PI
      groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.1
      
      // Zoom based on scroll
      const scale = 1 + scrollValue * 0.5
      groupRef.current.scale.set(scale, scale, scale)
      
      // Apply physics simulation to nodes
      nodes.forEach((node, i) => {
        // Attraction to original position
        const restoreForce = node.position.clone().multiplyScalar(-0.02)
        node.velocity.add(restoreForce)
        
        // Repulsion between nodes
        nodes.forEach((other, j) => {
          if (i !== j) {
            const diff = node.position.clone().sub(other.position)
            const distance = diff.length()
            if (distance < 3) {
              const force = diff.normalize().multiplyScalar(0.5 / (distance * distance))
              node.velocity.add(force)
            }
          }
        })
        
        // Apply velocity with damping
        node.velocity.multiplyScalar(0.95)
        node.position.add(node.velocity)
        
        // Floating animation
        node.position.y += Math.sin(time * 2 + i) * 0.002
      })
    }
    
    // Camera orbit
    const cameraRadius = 10 - scrollValue * 3
    state.camera.position.x = Math.sin(time * 0.05) * cameraRadius
    state.camera.position.z = Math.cos(time * 0.05) * cameraRadius
    state.camera.position.y = 3 + Math.sin(time * 0.1) * 2
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
              />
            </bufferGeometry>
            <lineBasicMaterial 
              color="#e5e5e5" 
              transparent 
              opacity={0.3}
              linewidth={1}
            />
          </line>
        )
      })}
      
      {/* Render nodes */}
      {nodes.map((node) => (
        <mesh
          key={node.id}
          position={node.position}
          onPointerOver={() => setHoveredNode(node.id)}
          onPointerOut={() => setHoveredNode(null)}
          scale={hoveredNode === node.id ? 1.2 : 1}
        >
          <sphereGeometry args={[node.size * 0.3, 16, 16]} />
          <meshPhongMaterial
            color={hoveredNode === node.id ? "#d4d4d4" : "#e5e5e5"}
            emissive="#e5e5e5"
            emissiveIntensity={0.2}
            wireframe
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

export function GraphThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 3, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        <GraphNetwork />
        <fog attach="fog" args={['#fafafa', 10, 30]} />
      </Canvas>
    </div>
  )
}