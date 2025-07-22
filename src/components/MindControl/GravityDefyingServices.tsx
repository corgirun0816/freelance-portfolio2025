"use client"

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Box, Sphere, Text, Float } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'
import * as THREE from 'three'

const services = [
  {
    id: "training",
    title: "パーソナルトレーニング",
    description: "重力を無視したトレーニングで、あなたの限界を超える",
    position: [0, 3, 0],
    rotation: [0, 0, 0],
    gravity: -0.98
  },
  {
    id: "web",
    title: "WEBデザイン",
    description: "物理法則に縛られない、流動的なデザイン体験",
    position: [-3, 0, 2],
    rotation: [0.5, 0.3, 0],
    gravity: 0.5
  },
  {
    id: "app",
    title: "アプリ開発",
    description: "次元を超えたアプリケーションの創造",
    position: [3, -2, -1],
    rotation: [-0.3, 0.5, 0.2],
    gravity: -0.3
  },
  {
    id: "seo",
    title: "SEOライティング",
    description: "時空を超えて永遠に残るコンテンツ",
    position: [0, -3, 3],
    rotation: [0.2, -0.4, 0.1],
    gravity: 0.7
  }
]

function FloatingService({ service, index }: any) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [isSelected, setIsSelected] = useState(false)
  const [velocity, setVelocity] = useState(new THREE.Vector3(0, 0, 0))
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      
      // 重力シミュレーション（各サービスで異なる重力）
      velocity.y += service.gravity * 0.001
      
      // 空気抵抗
      velocity.multiplyScalar(0.99)
      
      // マウスとの相互作用
      if (isSelected) {
        const mouseX = state.pointer.x * 5
        const mouseY = state.pointer.y * 5
        velocity.x += (mouseX - meshRef.current.position.x) * 0.01
        velocity.y += (mouseY - meshRef.current.position.y) * 0.01
      }
      
      // 位置更新
      meshRef.current.position.add(velocity)
      
      // 境界チェック（反発）
      if (Math.abs(meshRef.current.position.x) > 5) {
        velocity.x *= -0.8
        meshRef.current.position.x = Math.sign(meshRef.current.position.x) * 5
      }
      if (Math.abs(meshRef.current.position.y) > 5) {
        velocity.y *= -0.8
        meshRef.current.position.y = Math.sign(meshRef.current.position.y) * 5
      }
      
      // 回転
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.005
      
      // 脈動
      const scale = 1 + Math.sin(time * 2 + index) * 0.1
      meshRef.current.scale.setScalar(scale)
    }
  })
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={service.position}
        rotation={service.rotation}
        onPointerOver={() => setIsSelected(true)}
        onPointerOut={() => setIsSelected(false)}
        onClick={() => {
          // クリックで反重力ブースト
          setVelocity(new THREE.Vector3(
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2
          ))
        }}
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color={isSelected ? "#b3b3b3" : "#e5e5e5"}
          transparent
          opacity={0.8}
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>
      
      <Text
        position={[0, 0, 1.1]}
        fontSize={0.3}
        color="#666"
        anchorX="center"
        anchorY="middle"
      >
        {service.title}
      </Text>
    </Float>
  )
}

export function GravityDefyingServices() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedService, setSelectedService] = useState<any>(null)
  const { scrollY } = useScroll()
  const rotationY = useTransform(scrollY, [0, 1000], [0, Math.PI * 2])
  
  return (
    <section ref={containerRef} className="min-h-screen relative bg-white">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          
          <motion.group rotation-y={rotationY}>
            {services.map((service, index) => (
              <FloatingService
                key={service.id}
                service={service}
                index={index}
              />
            ))}
          </motion.group>
          
          {/* 重力場の視覚化 */}
          <mesh>
            <sphereGeometry args={[8, 32, 32]} />
            <meshBasicMaterial
              color="#f5f5f5"
              wireframe
              transparent
              opacity={0.1}
            />
          </mesh>
        </Canvas>
      </div>
      
      <div className="relative z-10 p-10">
        <motion.h2
          className="text-6xl font-thin text-gray-300 tracking-[0.3em] mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          GRAVITY DEFYING
        </motion.h2>
        
        <motion.p
          className="text-gray-500 max-w-2xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          物理法則を超越したサービス体験。
          重力、時間、空間の制約から解放された世界で、
          あなたの可能性は無限大に広がります。
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                rotateX: 5,
                rotateY: 5
              }}
              onClick={() => setSelectedService(service)}
            >
              <h3 className="text-2xl text-gray-700 mb-4">{service.title}</h3>
              <p className="text-gray-500 mb-4">{service.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>重力: {service.gravity > 0 ? '↓' : '↑'} {Math.abs(service.gravity)}</span>
                <span>•</span>
                <span>次元: 4D</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm text-gray-400 tracking-[0.2em]">
            TIP: サービスをクリックして反重力ブーストを体験
          </p>
        </motion.div>
      </div>
    </section>
  )
}