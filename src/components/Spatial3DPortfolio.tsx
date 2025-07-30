"use client"

import { useState, useRef, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, OrbitControls, PerspectiveCamera, RoundedBox, Float } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import { 
  Code2, Palette, PenTool, Dumbbell,
  Mail, Instagram, Twitter, User,
  X
} from 'lucide-react'

// Service structure
const services = {
  main: {
    id: 'main',
    title: 'S.STUDIO',
    subtitle: 'Creative Digital Solutions',
    position: [0, 0, 0],
    color: '#ffffff',
    description: 'Web Designer / Developer / Personal Trainer / SEO Writer',
    roles: ['Web Designer', 'Developer', 'Personal Trainer', 'SEO Writer'],
    social: [
      { icon: Instagram, link: '#' },
      { icon: Twitter, link: '#' },
      { icon: Mail, link: '#' }
    ]
  },
  'web-design': {
    id: 'web-design',
    title: 'Web Design',
    subtitle: 'UI/UX Design & Prototyping',
    position: [-4, 2, -2],
    color: '#9333ea',
    icon: Palette,
    nodes: [
      { id: 'wd-portfolio', label: 'ポートフォリオ', position: [-1, 0.5, 0] },
      { id: 'wd-price', label: '料金', position: [-0.5, -0.5, 0.5] },
      { id: 'wd-process', label: '制作プロセス', position: [0.5, 0.5, -0.5] },
      { id: 'wd-tools', label: '使用ツール', position: [1, -0.5, 0] }
    ]
  },
  'development': {
    id: 'development', 
    title: 'Development',
    subtitle: 'React & Next.js Applications',
    position: [4, 2, -2],
    color: '#3b82f6',
    icon: Code2,
    nodes: [
      { id: 'dev-projects', label: 'プロジェクト', position: [-1, 0.5, 0] },
      { id: 'dev-tech', label: '技術スタック', position: [0.5, 0.5, -0.5] },
      { id: 'dev-price', label: '料金', position: [-0.5, -0.5, 0.5] },
      { id: 'dev-support', label: 'サポート', position: [1, -0.5, 0] }
    ]
  },
  'seo-writing': {
    id: 'seo-writing',
    title: 'SEO Writing',
    subtitle: 'Content Strategy & Creation',
    position: [0, 4, -3],
    color: '#10b981',
    icon: PenTool,
    nodes: [
      { id: 'seo-samples', label: '記事サンプル', position: [-1, 0.5, 0] },
      { id: 'seo-price', label: '料金', position: [0.5, -0.5, 0.5] },
      { id: 'seo-process', label: '執筆プロセス', position: [0.5, 0.5, -0.5] },
      { id: 'seo-results', label: '実績', position: [-0.5, -0.5, 0] }
    ]
  },
  'personal-training': {
    id: 'personal-training',
    title: 'Personal Training',
    subtitle: 'Fitness & Wellness Coaching',
    position: [0, -3, -1],
    color: '#f97316',
    icon: Dumbbell,
    nodes: [
      { id: 'pt-programs', label: 'プログラム', position: [-1, 0.5, 0] },
      { id: 'pt-price', label: '料金', position: [0.5, -0.5, 0.5] },
      { id: 'pt-studio', label: 'スタジオ', position: [0.5, 0.5, -0.5] },
      { id: 'pt-results', label: '実績', position: [-0.5, -0.5, 0] }
    ]
  }
}

// Main card component
function MainCard({ service, onClick }: { service: any; onClick: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame(({ clock }) => {
    if (meshRef.current && service.id === 'main') {
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={service.position}>
        {service.id === 'main' ? (
          // Main S.STUDIO card
          <mesh ref={meshRef} onClick={onClick}>
            <RoundedBox args={[3, 4, 0.3]} radius={0.1} smoothness={4}>
              <meshPhongMaterial color={service.color} />
            </RoundedBox>
            <Text
              position={[0, 1.2, 0.16]}
              fontSize={0.5}
              color="#333333"
              anchorX="center"
              anchorY="middle"
            >
              {service.title}
            </Text>
            <Text
              position={[0, 0.6, 0.16]}
              fontSize={0.2}
              color="#666666"
              anchorX="center"
              anchorY="middle"
            >
              {service.subtitle}
            </Text>
            <Text
              position={[0, -0.2, 0.16]}
              fontSize={0.15}
              color="#888888"
              anchorX="center"
              anchorY="middle"
              maxWidth={2.5}
            >
              {service.description}
            </Text>
          </mesh>
        ) : (
          // Service cards
          <mesh onClick={onClick}>
            <RoundedBox args={[3.5, 2, 0.3]} radius={0.1} smoothness={4}>
              <meshPhongMaterial color={service.color} opacity={0.9} transparent />
            </RoundedBox>
            <Text
              position={[0, 0.4, 0.16]}
              fontSize={0.35}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {service.title}
            </Text>
            <Text
              position={[0, -0.2, 0.16]}
              fontSize={0.18}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {service.subtitle}
            </Text>
          </mesh>
        )}
        
        {/* Service nodes (dots) */}
        {service.nodes && service.nodes.map((node: any) => (
          <group key={node.id} position={node.position}>
            <mesh onClick={() => console.log(`Clicked: ${node.label}`)}>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshPhongMaterial color="#ffffff" emissive={service.color} emissiveIntensity={0.3} />
            </mesh>
            <Text
              position={[0.3, 0, 0]}
              fontSize={0.12}
              color="#ffffff"
              anchorX="left"
              anchorY="middle"
            >
              {node.label}
            </Text>
            {/* Connection line to parent */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([0, 0, 0, -node.position[0], -node.position[1], -node.position[2]])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#ffffff" opacity={0.3} transparent />
            </line>
          </group>
        ))}
      </group>
    </Float>
  )
}

// Scene component
function Scene({ onServiceClick }: { onServiceClick: (id: string) => void }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={60} />
      <OrbitControls 
        enablePan={false}
        maxDistance={20}
        minDistance={8}
        maxPolarAngle={Math.PI / 2 + 0.1}
        minPolarAngle={Math.PI / 2 - 0.5}
      />
      
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.4} />
      
      {/* Services */}
      {Object.values(services).map((service) => (
        <MainCard 
          key={service.id} 
          service={service} 
          onClick={() => onServiceClick(service.id)}
        />
      ))}
    </>
  )
}

// Detail panel component
function DetailPanel({ serviceId, onClose }: { serviceId: string; onClose: () => void }) {
  const service = services[serviceId as keyof typeof services]
  if (!service) return null

  const Icon = service.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto"
    >
      <div className="p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        {service.id === 'main' ? (
          <>
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
              <User className="w-10 h-10 text-gray-700" />
            </div>
            <h2 className="text-3xl font-bold mb-2">{service.title}</h2>
            <p className="text-gray-600 mb-6">{service.subtitle}</p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Roles</h3>
                <div className="flex flex-wrap gap-2">
                  {service.roles.map((role: string) => (
                    <span key={role} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Connect</h3>
                <div className="flex gap-3">
                  {service.social.map((social: any, idx: number) => {
                    const SocialIcon = social.icon
                    return (
                      <a
                        key={idx}
                        href={social.link}
                        className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        <SocialIcon className="w-6 h-6" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {Icon && (
              <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center mb-6">
                <Icon className="w-8 h-8 text-gray-700" />
              </div>
            )}
            <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
            <p className="text-gray-600 mb-6">{service.subtitle}</p>
            
            <div className="space-y-6">
              {service.nodes && (
                <div>
                  <h3 className="font-semibold mb-3">詳細情報</h3>
                  <div className="space-y-2">
                    {service.nodes.map((node: any) => (
                      <button
                        key={node.id}
                        className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <span className="font-medium">{node.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}

// Main component
export function Spatial3DPortfolio() {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full h-screen">
        <Canvas>
          <Suspense fallback={null}>
            <Scene onServiceClick={setSelectedService} />
          </Suspense>
        </Canvas>
      </div>
      
      <AnimatePresence>
        {selectedService && (
          <DetailPanel
            serviceId={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}