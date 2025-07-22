"use client"

import { Canvas } from "@react-three/fiber"
import { Float, OrbitControls } from "@react-three/drei"
import { useRef } from "react"
import { Mesh } from "three"
import { useFrame } from "@react-three/fiber"

function AnimatedMesh({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#e5e5e5"
          metalness={0.5}
          roughness={0.3}
          wireframe
        />
      </mesh>
    </Float>
  )
}

export function Background3D() {
  return (
    <div className="fixed inset-0 -z-10 opacity-30">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        
        <AnimatedMesh position={[-4, 2, 0]} scale={1.5} />
        <AnimatedMesh position={[4, -2, 0]} scale={1} />
        <AnimatedMesh position={[0, 0, -2]} scale={2} />
        <AnimatedMesh position={[-2, -3, 1]} scale={0.8} />
        <AnimatedMesh position={[3, 3, -1]} scale={1.2} />
        
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}