"use client"

import { useState, useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, OrbitControls, PerspectiveCamera, Float, MeshTransmissionMaterial, Environment, Stars } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import { 
  Code2, Palette, PenTool, Dumbbell,
  Mail, Instagram, Twitter, User,
  X, ChevronRight
} from 'lucide-react'

// Service structure with 3D positioning
const services = {
  main: {
    id: 'main',
    title: 'S.STUDIO',
    subtitle: 'Creative Digital Solutions',
    position: [0, 0, 0] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
    scale: 1.2,
    color: '#ffffff',
    gradient: ['#f3f4f6', '#e5e7eb'],
    description: 'Freelance Creator',
    content: {
      roles: ['Web Designer', 'Developer', 'Personal Trainer', 'SEO Writer'],
      bio: 'デジタルとフィジカルの両面から、あなたのビジネスと健康をサポートします。',
      experience: '10+ years of experience',
      social: [
        { icon: Instagram, link: '#', label: 'Instagram' },
        { icon: Twitter, link: '#', label: 'Twitter' },
        { icon: Mail, link: '#', label: 'Contact' }
      ]
    }
  },
  'web-design': {
    id: 'web-design',
    title: 'Web Design',
    subtitle: 'UI/UX Design',
    position: [-3, 1.5, -2] as [number, number, number],
    rotation: [0, 0.3, 0] as [number, number, number],
    scale: 1,
    color: '#8b5cf6',
    gradient: ['#a78bfa', '#7c3aed'],
    icon: Palette,
    content: {
      services: ['UI Design', 'UX Research', 'Prototyping', 'Design Systems'],
      tools: ['Figma', 'Adobe XD', 'Sketch', 'Framer'],
      projects: ['E-commerce Sites', 'SaaS Dashboards', 'Mobile Apps'],
      pricing: '¥50,000〜 / project'
    }
  },
  'development': {
    id: 'development', 
    title: 'Development',
    subtitle: 'Full Stack',
    position: [3, 1.5, -2] as [number, number, number],
    rotation: [0, -0.3, 0] as [number, number, number],
    scale: 1,
    color: '#3b82f6',
    gradient: ['#60a5fa', '#2563eb'],
    icon: Code2,
    content: {
      stack: ['React', 'Next.js', 'TypeScript', 'Node.js'],
      services: ['Web Apps', 'API Development', 'Database Design', 'Cloud Deployment'],
      features: ['Responsive Design', 'Performance Optimization', 'SEO Ready'],
      pricing: '¥80,000〜 / project'
    }
  },
  'seo-writing': {
    id: 'seo-writing',
    title: 'SEO Writing',
    subtitle: 'Content Creation',
    position: [0, 3, -4] as [number, number, number],
    rotation: [-0.2, 0, 0] as [number, number, number],
    scale: 0.9,
    color: '#10b981',
    gradient: ['#34d399', '#059669'],
    icon: PenTool,
    content: {
      types: ['Blog Articles', 'Product Descriptions', 'Landing Pages', 'Email Copy'],
      approach: ['Keyword Research', 'Competitor Analysis', 'Content Strategy'],
      results: '平均CTR 15%向上',
      pricing: '¥10,000〜 / article'
    }
  },
  'personal-training': {
    id: 'personal-training',
    title: 'Personal Training',
    subtitle: 'Fitness Coaching',
    position: [0, -2.5, -1] as [number, number, number],
    rotation: [0.2, 0, 0] as [number, number, number],
    scale: 1,
    color: '#f59e0b',
    gradient: ['#fbbf24', '#d97706'],
    icon: Dumbbell,
    content: {
      programs: ['筋力トレーニング', 'ダイエット', '姿勢改善', 'リハビリ'],
      location: 'Beefy Tokyo - 渋谷区',
      features: ['個別プログラム作成', '栄養アドバイス', 'オンライン対応'],
      pricing: '¥8,000〜 / session'
    }
  }
}

// Glass card material
function GlassCard({ service, isSelected, onSelect }: { 
  service: any
  isSelected: boolean
  onSelect: () => void 
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const { camera } = useThree()
  
  // Floating animation
  useFrame(({ clock }) => {
    if (meshRef.current && !isSelected) {
      meshRef.current.position.y = service.position[1] + Math.sin(clock.getElapsedTime() + service.position[0]) * 0.1
      meshRef.current.rotation.y = service.rotation[1] + Math.sin(clock.getElapsedTime() * 0.5) * 0.02
    }
  })

  // Camera focus animation
  useEffect(() => {
    if (isSelected && groupRef.current) {
      const targetPosition = new THREE.Vector3(
        service.position[0],
        service.position[1],
        service.position[2] + 4
      )
      
      // Animate camera to focus on selected card
      const startPosition = camera.position.clone()
      const startTime = Date.now()
      const duration = 1000

      const animateCamera = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3) // Ease out cubic

        camera.position.lerpVectors(startPosition, targetPosition, eased)
        camera.lookAt(service.position[0], service.position[1], service.position[2])

        if (progress < 1) {
          requestAnimationFrame(animateCamera)
        }
      }
      
      animateCamera()
    }
  }, [isSelected, camera, service])

  const isMain = service.id === 'main'

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh
          ref={meshRef}
          position={service.position}
          rotation={service.rotation}
          scale={isSelected ? service.scale * 1.2 : service.scale}
          onClick={onSelect}
        >
          <boxGeometry args={isMain ? [3, 4, 0.3] : [3.2, 2.2, 0.3]} />
          <MeshTransmissionMaterial
            backside
            samples={16}
            thickness={0.3}
            chromaticAberration={0.2}
            anisotropicBlur={0.1}
            roughness={0.2}
            distortion={0.1}
            distortionScale={0.1}
            temporalDistortion={0.1}
            iridescence={0.1}
            iridescenceIOR={1}
            iridescenceThicknessRange={[0, 1400]}
            color={service.color}
          />
          
          {/* Card content */}
          <Text
            position={[0, isMain ? 1 : 0.4, 0.16]}
            fontSize={isMain ? 0.5 : 0.35}
            color="#1f2937"
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
          >
            {service.title}
          </Text>
          <Text
            position={[0, isMain ? 0.3 : -0.1, 0.16]}
            fontSize={isMain ? 0.2 : 0.16}
            color="#4b5563"
            anchorX="center"
            anchorY="middle"
          >
            {service.subtitle}
          </Text>
          
          {isMain && (
            <Text
              position={[0, -0.5, 0.16]}
              fontSize={0.15}
              color="#6b7280"
              anchorX="center"
              anchorY="middle"
              maxWidth={2.5}
            >
              {service.description}
            </Text>
          )}
          
          {/* Icon for service cards */}
          {!isMain && service.icon && (
            <mesh position={[0, -0.6, 0.16]}>
              <planeGeometry args={[0.5, 0.5]} />
              <meshBasicMaterial transparent opacity={0.3} color={service.color} />
            </mesh>
          )}
        </mesh>
      </Float>
      
      {/* Glowing effect when selected */}
      {isSelected && (
        <pointLight
          position={[service.position[0], service.position[1], service.position[2] + 1]}
          intensity={2}
          color={service.color}
          distance={5}
        />
      )}
    </group>
  )
}

// 3D Scene
function Scene({ selectedService, onServiceSelect }: { 
  selectedService: string | null
  onServiceSelect: (id: string | null) => void 
}) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />
      <OrbitControls 
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI / 2 + 0.3}
        minPolarAngle={Math.PI / 2 - 0.3}
        enabled={!selectedService}
      />
      
      {/* Environment and lighting */}
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />
      
      {/* Stars background */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Services */}
      {Object.values(services).map((service) => (
        <GlassCard
          key={service.id}
          service={service}
          isSelected={selectedService === service.id}
          onSelect={() => onServiceSelect(selectedService === service.id ? null : service.id)}
        />
      ))}
    </>
  )
}

// Detail panel
function DetailPanel({ service, onClose }: { service: any; onClose: () => void }) {
  const Icon = service.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateY: -90 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      exit={{ opacity: 0, scale: 0.9, rotateY: 90 }}
      transition={{ type: "spring", duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-8"
      onClick={onClose}
    >
      <div 
        className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="flex items-start gap-6 mb-6">
          {service.id === 'main' ? (
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <User className="w-10 h-10 text-gray-600" />
            </div>
          ) : (
            Icon && (
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center"
                style={{ 
                  background: `linear-gradient(135deg, ${service.gradient[0]}, ${service.gradient[1]})`
                }}
              >
                <Icon className="w-8 h-8 text-white" />
              </div>
            )
          )}
          
          <div>
            <h2 className="text-3xl font-bold mb-2">{service.title}</h2>
            <p className="text-gray-600 text-lg">{service.subtitle}</p>
          </div>
        </div>

        <div className="space-y-6">
          {service.content.bio && (
            <p className="text-gray-700">{service.content.bio}</p>
          )}
          
          {service.content.roles && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <ChevronRight className="w-5 h-5" />
                Roles
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.content.roles.map((role: string) => (
                  <span key={role} className="px-4 py-2 bg-gray-100 rounded-full text-sm">
                    {role}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {service.content.services && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <ChevronRight className="w-5 h-5" />
                Services
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {service.content.services.map((item: string) => (
                  <div key={item} className="p-3 bg-gray-50 rounded-lg">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {service.content.stack && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <ChevronRight className="w-5 h-5" />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.content.stack.map((tech: string) => (
                  <span 
                    key={tech} 
                    className="px-3 py-1 text-sm rounded-md text-white"
                    style={{ backgroundColor: service.color }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {service.content.pricing && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Starting from</p>
              <p className="text-2xl font-bold" style={{ color: service.color }}>
                {service.content.pricing}
              </p>
            </div>
          )}
          
          {service.content.social && (
            <div className="flex gap-3 justify-center mt-6">
              {service.content.social.map((social: any, idx: number) => {
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
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Main component
export function Modern3DPortfolio() {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full h-screen">
        <Canvas>
          <Suspense fallback={null}>
            <Scene 
              selectedService={selectedService} 
              onServiceSelect={setSelectedService}
            />
          </Suspense>
        </Canvas>
      </div>
      
      <AnimatePresence>
        {selectedService && (
          <DetailPanel
            service={services[selectedService as keyof typeof services]}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}