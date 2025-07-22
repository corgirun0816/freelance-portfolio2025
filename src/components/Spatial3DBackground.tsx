"use client"

import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

export function Spatial3DBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-white">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: 'white' }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
      </Canvas>
    </div>
  )
}