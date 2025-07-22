"use client"

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useScroll } from 'framer-motion'

function MorphingMesh() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const { scrollYProgress } = useScroll()
  const [targetGeometry, setTargetGeometry] = useState(0)
  
  // Create geometries
  const geometries = useMemo(() => {
    const sphere = new THREE.SphereGeometry(2, 16, 16)
    const box = new THREE.BoxGeometry(2.5, 2.5, 2.5, 4, 4, 4)
    const cone = new THREE.ConeGeometry(2, 3.5, 16, 4)
    const torus = new THREE.TorusGeometry(2, 0.7, 8, 16)
    const dodecahedron = new THREE.DodecahedronGeometry(2.5, 0)
    
    return [sphere, box, cone, torus, dodecahedron]
  }, [])

  // Store vertex positions for smooth morphing
  const vertexAnimations = useRef<{
    positions: Float32Array
    targetPositions: Float32Array
    velocities: Float32Array
  }>({
    positions: new Float32Array(0),
    targetPositions: new Float32Array(0),
    velocities: new Float32Array(0)
  })

  useEffect(() => {
    if (geometries[0]) {
      const geo = geometries[0]
      const positions = geo.getAttribute('position').array as Float32Array
      vertexAnimations.current = {
        positions: new Float32Array(positions),
        targetPositions: new Float32Array(positions),
        velocities: new Float32Array(positions.length).fill(0)
      }
    }
  }, [geometries])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const scrollValue = scrollYProgress.get()
    
    // Calculate target geometry based on scroll
    const newTargetGeo = Math.min(Math.floor(scrollValue * 5), 4)
    
    if (newTargetGeo !== targetGeometry && meshRef.current) {
      setTargetGeometry(newTargetGeo)
      
      // Update target positions
      const targetGeo = geometries[newTargetGeo]
      const targetPos = targetGeo.getAttribute('position').array as Float32Array
      
      // Match vertex count by repeating or interpolating
      const currentLength = vertexAnimations.current.positions.length
      const targetLength = targetPos.length
      
      if (targetLength !== currentLength) {
        // Resize arrays
        const newPositions = new Float32Array(targetLength)
        const newVelocities = new Float32Array(targetLength)
        
        for (let i = 0; i < targetLength; i += 3) {
          const sourceIndex = (i % currentLength)
          newPositions[i] = vertexAnimations.current.positions[sourceIndex] || 0
          newPositions[i + 1] = vertexAnimations.current.positions[sourceIndex + 1] || 0
          newPositions[i + 2] = vertexAnimations.current.positions[sourceIndex + 2] || 0
        }
        
        vertexAnimations.current.positions = newPositions
        vertexAnimations.current.velocities = newVelocities
      }
      
      vertexAnimations.current.targetPositions = new Float32Array(targetPos)
    }
    
    // Animate vertices with physics-like behavior
    if (meshRef.current && meshRef.current.geometry) {
      const { positions, targetPositions, velocities } = vertexAnimations.current
      const geo = meshRef.current.geometry
      
      // Ensure geometry has the right number of vertices
      if (geo.attributes.position.count * 3 !== positions.length) {
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      }
      
      const posAttr = geo.attributes.position
      const scrollProgress = scrollValue % 0.2 * 5 // Progress within current transition
      
      for (let i = 0; i < positions.length; i += 3) {
        // Calculate explosion/implosion effect
        const vertexDelay = (i / positions.length) * 0.3
        const morphProgress = Math.max(0, Math.min(1, (scrollProgress - vertexDelay) * 2))
        
        // Add explosion effect in the middle of transition
        const explosionAmount = Math.sin(morphProgress * Math.PI) * 0.5
        const randomDirection = new THREE.Vector3(
          (Math.sin(i * 0.1) - 0.5) * explosionAmount,
          (Math.cos(i * 0.2) - 0.5) * explosionAmount,
          (Math.sin(i * 0.3) - 0.5) * explosionAmount
        )
        
        // Spring physics for smooth morphing
        const springStrength = 0.1
        const damping = 0.85
        
        for (let j = 0; j < 3; j++) {
          const targetPos = targetPositions[i + j] + randomDirection.toArray()[j]
          const currentPos = positions[i + j]
          const velocity = velocities[i + j]
          
          // Spring force
          const force = (targetPos - currentPos) * springStrength
          velocities[i + j] = (velocity + force) * damping
          positions[i + j] += velocities[i + j]
          
          posAttr.setXYZ(i / 3, positions[i], positions[i + 1], positions[i + 2])
        }
      }
      
      posAttr.needsUpdate = true
      
      // Rotate mesh
      meshRef.current.rotation.x = time * 0.1 + scrollValue * Math.PI
      meshRef.current.rotation.y = time * 0.15 + scrollValue * Math.PI * 0.5
      
      // Move mesh based on scroll
      meshRef.current.position.y = -scrollValue * 3
      meshRef.current.position.z = -2 - scrollValue * 2
    }
    
    // Dynamic camera movement
    const cameraRadius = 5 + Math.sin(scrollValue * Math.PI * 2) * 2
    state.camera.position.x = Math.sin(time * 0.1) * cameraRadius
    state.camera.position.y = Math.cos(scrollValue * Math.PI) * 2
    state.camera.position.z = Math.cos(time * 0.1) * cameraRadius
    state.camera.lookAt(0, -scrollValue * 3, 0)
  })

  return (
    <mesh ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={geometries[0].getAttribute('position').count}
          array={geometries[0].getAttribute('position').array}
          itemSize={3}
          args={[geometries[0].getAttribute('position').array, 3]}
        />
      </bufferGeometry>
      <meshStandardMaterial
        color="#d4d4d4"
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.5}
        wireframe
      />
    </mesh>
  )
}

export function MorphingThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        <MorphingMesh />
        <fog attach="fog" args={['#fafafa', 8, 25]} />
      </Canvas>
    </div>
  )
}