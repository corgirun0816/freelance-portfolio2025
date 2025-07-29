"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Code2, Palette, PenTool, Dumbbell,
  Mail, Instagram, Twitter, User,
  Activity, Target, Heart, Brain,
  X, ArrowLeft
} from 'lucide-react'

// Node structure
const nodes = {
  main: {
    id: 'main',
    title: 'S.STUDIO',
    description: 'Creative Digital Solutions',
    position: { x: 0, y: 0 },
    icon: User,
    children: ['web-design', 'development', 'seo-writing', 'personal-training'],
    content: {
      roles: ['Web Designer', 'Developer', 'Personal Trainer', 'SEO Writer'],
      social: [
        { icon: Instagram, link: '#', name: 'Instagram' },
        { icon: Twitter, link: '#', name: 'Twitter' },
        { icon: Mail, link: '#', name: 'Email' }
      ]
    }
  },
  'web-design': {
    id: 'web-design',
    title: 'Web Design',
    description: 'UI/UX Design & Prototyping',
    position: { x: -350, y: -150 },
    icon: Palette,
    content: {
      details: 'Creating beautiful and functional web experiences',
      skills: ['User-centered design', 'Modern UI/UX principles', 'Responsive layouts', 'Figma prototyping'],
      projects: ['E-commerce platforms', 'SaaS dashboards', 'Portfolio websites']
    }
  },
  'development': {
    id: 'development',
    title: 'Development',
    description: 'React & Next.js Applications',
    position: { x: 350, y: -150 },
    icon: Code2,
    content: {
      details: 'Building modern web applications with cutting-edge technologies',
      skills: ['React/Next.js', 'TypeScript', 'Node.js', 'Database design'],
      technologies: ['Tailwind CSS', 'Prisma', 'GraphQL', 'REST APIs']
    }
  },
  'seo-writing': {
    id: 'seo-writing',
    title: 'SEO Writing',
    description: 'Content Strategy & Creation',
    position: { x: 0, y: -250 },
    icon: PenTool,
    content: {
      details: 'Crafting content that ranks and engages your audience',
      services: ['Blog posts', 'Product descriptions', 'Landing pages', 'Email campaigns'],
      approach: ['Keyword research', 'Competitor analysis', 'Content optimization']
    }
  },
  'personal-training': {
    id: 'personal-training',
    title: 'Personal Training',
    description: 'Fitness & Wellness Coaching',
    position: { x: 0, y: 250 },
    icon: Dumbbell,
    children: ['fitness-assessment', 'training-program', 'nutrition', 'mental-wellness'],
    content: {
      details: 'At Beefy Tokyo, we provide personalized fitness programs tailored to your individual goals',
      services: ['1-on-1 training', 'Group sessions', 'Online coaching', 'Fitness consultations'],
      specialties: ['Strength training', 'Body composition', 'Functional fitness', 'Rehabilitation']
    }
  },
  'fitness-assessment': {
    id: 'fitness-assessment',
    title: 'Fitness Assessment',
    description: 'Body composition & movement analysis',
    position: { x: -200, y: 400 },
    icon: Activity,
    parent: 'personal-training',
    content: {
      details: 'Comprehensive evaluation to understand your starting point',
      includes: ['Body composition scan', 'Movement screening', 'Strength testing', 'Flexibility assessment']
    }
  },
  'training-program': {
    id: 'training-program',
    title: 'Training Program',
    description: 'Customized workout plans',
    position: { x: -70, y: 420 },
    icon: Target,
    parent: 'personal-training',
    content: {
      details: 'Personalized programs designed for your specific goals',
      types: ['Muscle building', 'Fat loss', 'Athletic performance', 'General fitness']
    }
  },
  'nutrition': {
    id: 'nutrition',
    title: 'Nutrition Guidance',
    description: 'Meal planning & dietary advice',
    position: { x: 70, y: 420 },
    icon: Heart,
    parent: 'personal-training',
    content: {
      details: 'Sustainable nutrition strategies for lasting results',
      services: ['Meal planning', 'Macro tracking', 'Supplement guidance', 'Habit coaching']
    }
  },
  'mental-wellness': {
    id: 'mental-wellness',
    title: 'Mental Wellness',
    description: 'Stress management & mindfulness',
    position: { x: 200, y: 400 },
    icon: Brain,
    parent: 'personal-training',
    content: {
      details: 'Supporting your mental health for complete wellness',
      focus: ['Stress reduction', 'Sleep optimization', 'Mindfulness practices', 'Goal setting']
    }
  }
}

type Node = typeof nodes[keyof typeof nodes]

// Small Card Component
function SmallCard({ 
  node, 
  onSelect,
  isVisible
}: { 
  node: Node
  onSelect: (id: string) => void
  isVisible: boolean
}) {
  const Icon = node.icon

  return (
    <motion.div
      layoutId={node.id}
      className="absolute cursor-pointer"
      style={{
        left: '50%',
        top: '50%',
        x: node.position.x - 120,
        y: node.position.y - 60,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isVisible ? 1 : 0,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      onClick={() => onSelect(node.id)}
      whileHover={{ scale: 1.05 }}
    >
      <div className="bg-white rounded-xl shadow-lg p-4 w-60 h-28 flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-gray-700" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-sm">{node.title}</h3>
          <p className="text-xs text-gray-600 mt-1">{node.description}</p>
        </div>
      </div>
    </motion.div>
  )
}

// Expanded Card Component
function ExpandedCard({ 
  node, 
  onClose 
}: { 
  node: Node
  onClose: () => void 
}) {
  const Icon = node.icon

  return (
    <motion.div
      layoutId={node.id}
      className="fixed inset-4 md:inset-8 lg:inset-16 z-50 bg-white rounded-2xl shadow-2xl overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="h-full overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center">
              <Icon className="w-8 h-8 text-gray-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{node.title}</h2>
              <p className="text-gray-600">{node.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Main Details */}
          {node.content.details && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Overview</h3>
              <p className="text-gray-600">{node.content.details}</p>
            </div>
          )}

          {/* Roles (for main node) */}
          {node.id === 'main' && node.content.roles && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Roles</h3>
              <div className="flex flex-wrap gap-2">
                {node.content.roles.map((role, index) => (
                  <span key={index} className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">
                    {role}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social Links (for main node) */}
          {node.id === 'main' && node.content.social && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Connect</h3>
              <div className="flex gap-3">
                {node.content.social.map((social, index) => {
                  const SocialIcon = social.icon
                  return (
                    <a
                      key={index}
                      href={social.link}
                      className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                      <SocialIcon className="w-6 h-6" />
                    </a>
                  )
                })}
              </div>
            </div>
          )}

          {/* Skills */}
          {node.content.skills && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
              <div className="grid grid-cols-2 gap-3">
                {node.content.skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400" />
                    <span className="text-gray-600">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Services */}
          {node.content.services && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Services</h3>
              <div className="grid grid-cols-2 gap-3">
                {node.content.services.map((service, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Child Nodes */}
          {node.children && node.children.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Related Services</h3>
              <div className="grid grid-cols-2 gap-4">
                {node.children.map(childId => {
                  const child = nodes[childId as keyof typeof nodes]
                  const ChildIcon = child.icon
                  return (
                    <div key={childId} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <ChildIcon className="w-5 h-5 text-gray-600" />
                        <h4 className="font-medium text-gray-900">{child.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600">{child.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Connection Line Component
function Connection({ from, to }: { from: Node; to: Node }) {
  return (
    <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }}>
      <line
        x1={`${50 + from.position.x / 10}%`}
        y1={`${50 + from.position.y / 10}%`}
        x2={`${50 + to.position.x / 10}%`}
        y2={`${50 + to.position.y / 10}%`}
        stroke="#e5e7eb"
        strokeWidth="2"
        strokeDasharray="5,5"
        opacity="0.5"
      />
    </svg>
  )
}

// Main Component
export function CenteredGraphPortfolio() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden relative">
      {/* Background overlay when card is selected */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setSelectedNode(null)}
          />
        )}
      </AnimatePresence>

      {/* Graph Container */}
      <div className="relative w-full h-screen">
        {/* Render connections */}
        {Object.values(nodes).map(node => {
          if ('children' in node && node.children) {
            return node.children.map(childId => {
              const childNode = nodes[childId as keyof typeof nodes]
              return (
                <Connection
                  key={`${node.id}-${childId}`}
                  from={node}
                  to={childNode}
                />
              )
            })
          }
          return null
        })}

        {/* Render small cards */}
        {Object.values(nodes).map(node => (
          <SmallCard
            key={node.id}
            node={node}
            onSelect={setSelectedNode}
            isVisible={!selectedNode}
          />
        ))}
      </div>

      {/* Expanded card */}
      <AnimatePresence>
        {selectedNode && (
          <ExpandedCard
            node={nodes[selectedNode as keyof typeof nodes]}
            onClose={() => setSelectedNode(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}