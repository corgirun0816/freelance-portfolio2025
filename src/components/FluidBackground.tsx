"use client"

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useScroll } from 'framer-motion'

function FluidSimulation() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const materialRef = useRef<THREE.ShaderMaterial>(null!)
  const { scrollYProgress } = useScroll()
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) }
  }), [])
  
  const vertexShader = `
    uniform float uTime;
    uniform float uScroll;
    varying vec2 vUv;
    varying float vDistortion;
    
    void main() {
      vUv = uv;
      vec3 pos = position;
      
      float frequency = 2.0;
      float amplitude = 0.5;
      
      float distortion = sin(pos.x * frequency + uTime) * 
                        cos(pos.y * frequency + uTime) * 
                        sin(pos.z * frequency + uTime * 0.5) * amplitude;
      
      pos += normal * distortion * (1.0 + uScroll * 2.0);
      
      vDistortion = distortion;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `
  
  const fragmentShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying float vDistortion;
    
    void main() {
      float distance = length(vUv - uMouse);
      float pulse = sin(distance * 10.0 - uTime * 2.0) * 0.5 + 0.5;
      
      vec3 color1 = vec3(0.95, 0.95, 0.95);
      vec3 color2 = vec3(0.8, 0.8, 0.8);
      
      vec3 color = mix(color1, color2, pulse + vDistortion);
      
      float alpha = 0.3 + vDistortion * 0.3;
      
      gl_FragColor = vec4(color, alpha);
    }
  `
  
  useFrame(({ clock, pointer }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
      materialRef.current.uniforms.uScroll.value = scrollYProgress.get()
      materialRef.current.uniforms.uMouse.value.set(
        (pointer.x + 1) / 2,
        (pointer.y + 1) / 2
      )
    }
    
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.05
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.03
    }
  })
  
  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[3, 8]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

function FluidParticles() {
  const count = 500
  const mesh = useRef<THREE.InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        ),
        scale: Math.random() * 0.5 + 0.1,
        offset: Math.random() * Math.PI * 2
      })
    }
    return temp
  }, [])
  
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    
    particles.forEach((particle, i) => {
      particle.position.add(particle.velocity)
      
      if (particle.position.length() > 5) {
        particle.position.multiplyScalar(0.1)
        particle.velocity.multiplyScalar(-1)
      }
      
      const scale = particle.scale * (1 + Math.sin(time * 2 + particle.offset) * 0.2)
      
      dummy.position.copy(particle.position)
      dummy.scale.setScalar(scale)
      dummy.updateMatrix()
      
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    
    mesh.current.instanceMatrix.needsUpdate = true
  })
  
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#e5e5e5" transparent opacity={0.6} />
    </instancedMesh>
  )
}

export function FluidBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <FluidSimulation />
        <FluidParticles />
        <fog attach="fog" args={['#ffffff', 5, 15]} />
      </Canvas>
    </div>
  )
}