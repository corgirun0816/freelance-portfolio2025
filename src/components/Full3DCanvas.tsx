"use client"

import { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, extend, useLoader } from '@react-three/fiber'
import { OrbitControls, Float, Text3D, Center, Environment, MeshTransmissionMaterial } from '@react-three/drei'
import { motion } from 'framer-motion-3d'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'

// Custom shader for liquid glass effect
const liquidGlassShader = {
  uniforms: {
    time: { value: 0 },
    distort: { value: 0.2 },
    color: { value: new THREE.Color('#ffffff') },
    emissive: { value: new THREE.Color('#6366f1') },
    opacity: { value: 0.9 }
  },
  vertexShader: `
    uniform float time;
    uniform float distort;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vNormal = normal;
      vPosition = position;
      
      vec3 pos = position;
      float dist = distance(uv, vec2(0.5));
      pos.z += sin(dist * 10.0 + time) * distort;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec3 color;
    uniform vec3 emissive;
    uniform float opacity;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      vec3 light = normalize(vec3(0.5, 1.0, 0.3));
      float shading = dot(vNormal, light) * 0.5 + 0.5;
      
      vec3 finalColor = mix(color, emissive, 0.3);
      finalColor *= shading;
      
      float rim = 1.0 - max(dot(normalize(vNormal), normalize(cameraPosition - vPosition)), 0.0);
      finalColor += emissive * rim * 0.5;
      
      gl_FragColor = vec4(finalColor, opacity);
    }
  `
}

// 3D Icon Component
function Icon3D({ icon, position = [0, 0, 0], scale = 1, color = '#ffffff' }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  // Simple 3D representation of icons
  const iconGeometry = useMemo(() => {
    switch (icon) {
      case 'code':
        return <boxGeometry args={[0.3, 0.3, 0.1]} />
      case 'palette':
        return <cylinderGeometry args={[0.2, 0.2, 0.1, 6]} />
      case 'pen':
        return <coneGeometry args={[0.15, 0.4, 4]} />
      case 'dumbbell':
        return <capsuleGeometry args={[0.1, 0.3, 4, 8]} />
      default:
        return <sphereGeometry args={[0.2, 16, 16]} />
    }
  }, [icon])

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {iconGeometry}
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
    </mesh>
  )
}

// 3D Glass Card Component
function GlassCard3D({ 
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  width = 3,
  height = 2,
  depth = 0.1,
  color = '#ffffff',
  emissive = '#6366f1',
  title,
  subtitle,
  icon,
  onClick,
  isMain = false
}: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1
      
      // Rotation on hover
      if (hovered) {
        meshRef.current.rotation.y += 0.01
      }
      
      // Click animation
      if (clicked) {
        meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, scale * 1.1, 0.1)
        meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, scale * 1.1, 0.1)
      } else {
        meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, scale, 0.1)
        meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, scale, 0.1)
      }
    }
  })

  return (
    <Float
      speed={2}
      rotationIntensity={0.2}
      floatIntensity={0.3}
    >
      <group position={position} rotation={rotation}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onPointerDown={() => setClicked(true)}
          onPointerUp={() => setClicked(false)}
          onClick={onClick}
          scale={scale}
        >
          <boxGeometry args={[width, height, depth]} />
          <MeshTransmissionMaterial
            backside
            backsideThickness={0.3}
            samples={16}
            resolution={512}
            transmission={0.95}
            clearcoat={0.1}
            clearcoatRoughness={0.0}
            thickness={0.3}
            chromaticAberration={0.5}
            anisotropy={0.3}
            roughness={0.0}
            distortion={0.5}
            distortionScale={0.1}
            temporalDistortion={0.1}
            ior={1.5}
            color={color}
            attenuationDistance={0.5}
            attenuationColor={emissive}
          />
        </mesh>

        {/* Glow effect */}
        {hovered && (
          <mesh scale={[1.05, 1.05, 1]}>
            <boxGeometry args={[width, height, depth * 0.5]} />
            <meshBasicMaterial color={emissive} transparent opacity={0.3} />
          </mesh>
        )}

        {/* 3D Text */}
        {title && (
          <Center position={[0, isMain ? 0.3 : 0, depth / 2 + 0.05]}>
            <Text3D
              font="/fonts/helvetiker_regular.typeface.json"
              size={isMain ? 0.4 : 0.2}
              height={0.05}
              curveSegments={12}
              bevelEnabled
              bevelThickness={0.02}
              bevelSize={0.01}
              bevelOffset={0}
              bevelSegments={5}
            >
              {title}
              <meshStandardMaterial color={isMain ? emissive : '#333333'} metalness={0.8} roughness={0.2} />
            </Text3D>
          </Center>
        )}

        {subtitle && (
          <Center position={[0, -0.3, depth / 2 + 0.05]}>
            <Text3D
              font="/fonts/helvetiker_regular.typeface.json"
              size={0.1}
              height={0.02}
              curveSegments={12}
            >
              {subtitle}
              <meshStandardMaterial color="#666666" />
            </Text3D>
          </Center>
        )}

        {/* 3D Icon */}
        {icon && (
          <Icon3D icon={icon} position={[0, isMain ? -0.5 : 0.5, depth / 2 + 0.1]} color={emissive} />
        )}
      </group>
    </Float>
  )
}

// Connection Component
function Connection3D({ start, end, color = '#e0e7ff' }: any) {
  const curve = useMemo(() => {
    const startVec = new THREE.Vector3(...start)
    const endVec = new THREE.Vector3(...end)
    const midVec = new THREE.Vector3(
      (startVec.x + endVec.x) / 2,
      (startVec.y + endVec.y) / 2 + 1,
      (startVec.z + endVec.z) / 2
    )
    
    return new THREE.QuadraticBezierCurve3(startVec, midVec, endVec)
  }, [start, end])

  const tubeRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (tubeRef.current) {
      tubeRef.current.material.uniforms.time.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh ref={tubeRef}>
      <tubeGeometry args={[curve, 64, 0.02, 8, false]} />
      <shaderMaterial
        uniforms={{
          time: { value: 0 },
          color: { value: new THREE.Color(color) }
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float time;
          uniform vec3 color;
          varying vec2 vUv;
          
          void main() {
            float alpha = sin(vUv.x * 10.0 - time * 2.0) * 0.5 + 0.5;
            gl_FragColor = vec4(color, alpha * 0.6);
          }
        `}
        transparent
      />
    </mesh>
  )
}

// Social Media Orbs
function SocialOrb({ position, color, icon, link }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current && hovered) {
      meshRef.current.rotation.y += 0.05
      meshRef.current.scale.setScalar(1.2)
    } else if (meshRef.current) {
      meshRef.current.scale.setScalar(1)
    }
  })

  return (
    <Float speed={3} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => window.open(link, '_blank')}
      >
        <sphereGeometry args={[0.3, 32, 32]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={256}
          transmission={0.98}
          roughness={0.0}
          thickness={0.5}
          ior={1.5}
          chromaticAberration={1}
          color={color}
          attenuationDistance={0.5}
          attenuationColor={color}
        />
        <Icon3D icon={icon} position={[0, 0, 0]} scale={0.5} color="#ffffff" />
      </mesh>
    </Float>
  )
}

// Main Scene
function Scene() {
  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />

      {/* Main Card */}
      <GlassCard3D
        position={[0, 0, 0]}
        scale={1.2}
        width={4}
        height={3}
        depth={0.2}
        color="#ffffff"
        emissive="#6366f1"
        title="S.STUDIO"
        isMain={true}
      />

      {/* Profile Section Below Main */}
      <group position={[0, -2.5, 0]}>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.15}
          height={0.02}
          letterSpacing={0.02}
        >
          Web Designer • Developer
          <meshStandardMaterial color="#666666" />
        </Text3D>
        <Text3D
          position={[0, -0.3, 0]}
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.15}
          height={0.02}
          letterSpacing={0.02}
        >
          Personal Trainer • SEO Writer
          <meshStandardMaterial color="#666666" />
        </Text3D>
      </group>

      {/* Service Cards */}
      <GlassCard3D
        position={[-5, 2, -2]}
        rotation={[0, 0.3, 0]}
        color="#fef3c7"
        emissive="#f59e0b"
        title="Web Design"
        subtitle="UI/UX Design"
        icon="palette"
      />

      <GlassCard3D
        position={[5, 2, -2]}
        rotation={[0, -0.3, 0]}
        color="#dbeafe"
        emissive="#3b82f6"
        title="Development"
        subtitle="React & Next.js"
        icon="code"
      />

      <GlassCard3D
        position={[-5, -2, -2]}
        rotation={[0, 0.3, 0]}
        color="#fecaca"
        emissive="#ef4444"
        title="Training"
        subtitle="Fitness & Health"
        icon="dumbbell"
      />

      <GlassCard3D
        position={[5, -2, -2]}
        rotation={[0, -0.3, 0]}
        color="#e9d5ff"
        emissive="#9333ea"
        title="SEO Writing"
        subtitle="Content Creation"
        icon="pen"
      />

      {/* Connections */}
      <Connection3D start={[0, 0, 0]} end={[-5, 2, -2]} color="#f59e0b" />
      <Connection3D start={[0, 0, 0]} end={[5, 2, -2]} color="#3b82f6" />
      <Connection3D start={[0, 0, 0]} end={[-5, -2, -2]} color="#ef4444" />
      <Connection3D start={[0, 0, 0]} end={[5, -2, -2]} color="#9333ea" />

      {/* Social Media Orbs */}
      <SocialOrb position={[-1.5, -4, 0]} color="#E4405F" icon="instagram" link="https://instagram.com" />
      <SocialOrb position={[0, -4, 0]} color="#1DA1F2" icon="twitter" link="https://twitter.com" />
      <SocialOrb position={[1.5, -4, 0]} color="#0077B5" icon="mail" link="mailto:contact@example.com" />

      {/* Floating Particles */}
      {[...Array(30)].map((_, i) => (
        <Float key={i} speed={Math.random() * 2 + 1} floatIntensity={Math.random() * 0.5 + 0.5}>
          <mesh
            position={[
              (Math.random() - 0.5) * 15,
              (Math.random() - 0.5) * 15,
              (Math.random() - 0.5) * 15 - 5
            ]}
          >
            <icosahedronGeometry args={[0.1, 0]} />
            <meshStandardMaterial
              color="#e0e7ff"
              emissive="#6366f1"
              emissiveIntensity={0.5}
              metalness={1}
              roughness={0}
            />
          </mesh>
        </Float>
      ))}

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.5}
        maxDistance={15}
        minDistance={5}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </>
  )
}

export function Full3DCanvas() {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <Scene />
      </Canvas>
    </div>
  )
}