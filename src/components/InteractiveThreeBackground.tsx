"use client"

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useScroll } from 'framer-motion'

function ScrollingMesh() {
  const mesh = useRef<THREE.Mesh>(null!)
  const { viewport } = useThree()
  const { scrollYProgress } = useScroll()
  
  const geometries = useMemo(() => [
    new THREE.SphereGeometry(2, 32, 32),
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.ConeGeometry(2, 4, 32),
    new THREE.TorusGeometry(2, 0.8, 16, 100),
    new THREE.DodecahedronGeometry(2.5),
  ], [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const scrollValue = scrollYProgress.get()
    
    // Change geometry based on scroll position
    const geoIndex = Math.floor(scrollValue * 4.99)
    if (mesh.current && geometries[geoIndex] && mesh.current.geometry !== geometries[geoIndex]) {
      mesh.current.geometry = geometries[geoIndex]
    }
    
    // Rotate based on time and scroll
    if (mesh.current) {
      mesh.current.rotation.x = time * 0.2 + scrollValue * Math.PI * 2
      mesh.current.rotation.y = time * 0.1 + scrollValue * Math.PI
      mesh.current.position.y = Math.sin(time * 0.5) * 0.3 - scrollValue * 2
      mesh.current.position.z = -2 - scrollValue * 3
      
      // Scale based on scroll
      const scale = 1 + scrollValue * 0.5
      mesh.current.scale.set(scale, scale, scale)
    }
    
    // Camera movement
    state.camera.position.x = Math.sin(scrollValue * Math.PI * 2) * 2
    state.camera.position.y = scrollValue * 2
    state.camera.lookAt(0, -scrollValue * 2, 0)
  })

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial
        color="#e5e5e5"
        roughness={0.1}
        metalness={0.8}
        transparent
        opacity={0.4}
        wireframe
      />
    </mesh>
  )
}

export function InteractiveThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <ScrollingMesh />
        <fog attach="fog" args={['#fafafa', 5, 20]} />
      </Canvas>
    </div>
  )
}