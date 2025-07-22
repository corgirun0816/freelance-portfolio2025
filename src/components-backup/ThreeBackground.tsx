"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import * as THREE from "three"

function Grid() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1
    }
  })

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(20, 20, 20, 20)
    const positions = geo.attributes.position.array as Float32Array
    
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const y = positions[i + 1]
      positions[i + 2] = Math.sin(x * 0.5) * 0.5 + Math.cos(y * 0.5) * 0.5
    }
    
    geo.computeVertexNormals()
    return geo
  }, [])

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, -2, 0]} rotation={[-Math.PI / 4, 0, 0]}>
      <meshStandardMaterial
        color="#e5e5e5"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  )
}

function FloatingCube({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5
    }
  })

  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#d4d4d4"
          metalness={0.2}
          roughness={0.4}
        />
      </mesh>
    </Float>
  )
}

export function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 5, 10]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <directionalLight position={[-5, 5, 5]} intensity={0.5} />
        
        <Grid />
        
        {[...Array(5)].map((_, i) => (
          <FloatingCube
            key={i}
            position={[
              (Math.random() - 0.5) * 10,
              Math.random() * 3,
              (Math.random() - 0.5) * 5
            ]}
          />
        ))}
        
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
        
        <fog attach="fog" args={["#ffffff", 5, 20]} />
      </Canvas>
    </div>
  )
}