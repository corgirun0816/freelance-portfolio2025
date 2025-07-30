"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Code2, Palette, PenTool, Dumbbell,
  Mail, Instagram, Twitter, User,
  Activity, Target, Heart, Brain,
  X, ArrowLeft, Layout, Brush, Layers,
  Globe, Server, Database, Smartphone,
  Search, FileText, TrendingUp, BarChart
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
    children: ['ui-design', 'ux-research', 'prototyping'],
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
    children: ['frontend', 'backend', 'mobile', 'database'],
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
    children: ['keyword-research', 'content-writing', 'seo-optimization', 'analytics'],
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
    position: { x: -400, y: 450 },
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
    position: { x: -135, y: 480 },
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
    position: { x: 135, y: 480 },
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
    position: { x: 400, y: 450 },
    icon: Brain,
    parent: 'personal-training',
    content: {
      details: 'Supporting your mental health for complete wellness',
      focus: ['Stress reduction', 'Sleep optimization', 'Mindfulness practices', 'Goal setting']
    }
  },
  // Web Design sub-nodes
  'ui-design': {
    id: 'ui-design',
    title: 'UI Design',
    description: 'Visual design & branding',
    position: { x: -500, y: -50 },
    icon: Layout,
    parent: 'web-design',
    content: {
      details: 'Creating visually appealing interfaces',
      services: ['Visual design', 'Brand identity', 'Design systems']
    }
  },
  'ux-research': {
    id: 'ux-research',
    title: 'UX Research',
    description: 'User research & testing',
    position: { x: -350, y: 0 },
    icon: Brush,
    parent: 'web-design',
    content: {
      details: 'Understanding user needs and behaviors',
      services: ['User interviews', 'Usability testing', 'A/B testing']
    }
  },
  'prototyping': {
    id: 'prototyping',
    title: 'Prototyping',
    description: 'Interactive prototypes',
    position: { x: -200, y: -50 },
    icon: Layers,
    parent: 'web-design',
    content: {
      details: 'Building interactive prototypes',
      services: ['Figma prototypes', 'Wireframing', 'Interactive demos']
    }
  },
  // Development sub-nodes
  'frontend': {
    id: 'frontend',
    title: 'Frontend',
    description: 'React & Next.js',
    position: { x: 200, y: -50 },
    icon: Globe,
    parent: 'development',
    content: {
      details: 'Modern frontend development',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS']
    }
  },
  'backend': {
    id: 'backend',
    title: 'Backend',
    description: 'Node.js & APIs',
    position: { x: 350, y: 0 },
    icon: Server,
    parent: 'development',
    content: {
      details: 'Scalable backend systems',
      technologies: ['Node.js', 'Express', 'GraphQL', 'REST']
    }
  },
  'mobile': {
    id: 'mobile',
    title: 'Mobile',
    description: 'React Native',
    position: { x: 500, y: -50 },
    icon: Smartphone,
    parent: 'development',
    content: {
      details: 'Cross-platform mobile apps',
      technologies: ['React Native', 'Expo', 'Mobile optimization']
    }
  },
  'database': {
    id: 'database',
    title: 'Database',
    description: 'Data architecture',
    position: { x: 350, y: -100 },
    icon: Database,
    parent: 'development',
    content: {
      details: 'Database design and optimization',
      technologies: ['PostgreSQL', 'MongoDB', 'Prisma', 'Redis']
    }
  },
  // SEO Writing sub-nodes
  'keyword-research': {
    id: 'keyword-research',
    title: 'Keyword Research',
    description: 'SEO strategy',
    position: { x: -150, y: -350 },
    icon: Search,
    parent: 'seo-writing',
    content: {
      details: 'Finding the right keywords',
      tools: ['Google Keyword Planner', 'Ahrefs', 'SEMrush']
    }
  },
  'content-writing': {
    id: 'content-writing',
    title: 'Content Writing',
    description: 'Engaging content',
    position: { x: 0, y: -400 },
    icon: FileText,
    parent: 'seo-writing',
    content: {
      details: 'Writing content that converts',
      types: ['Blog posts', 'Landing pages', 'Product descriptions']
    }
  },
  'seo-optimization': {
    id: 'seo-optimization',
    title: 'SEO Optimization',
    description: 'On-page SEO',
    position: { x: 150, y: -350 },
    icon: TrendingUp,
    parent: 'seo-writing',
    content: {
      details: 'Optimizing content for search engines',
      techniques: ['Meta tags', 'Schema markup', 'Internal linking']
    }
  },
  'analytics': {
    id: 'analytics',
    title: 'Analytics',
    description: 'Performance tracking',
    position: { x: 0, y: -150 },
    icon: BarChart,
    parent: 'seo-writing',
    content: {
      details: 'Measuring content performance',
      tools: ['Google Analytics', 'Search Console', 'Custom dashboards']
    }
  }
}

// Define Node type with all possible content properties
type NodeContent = {
  details?: string
  roles?: string[]
  social?: Array<{ icon: any; link: string; name: string }>
  skills?: string[]
  services?: string[]
  technologies?: string[]
  projects?: string[]
  approach?: string[]
  specialties?: string[]
  includes?: string[]
  types?: string[]
  focus?: string[]
  tools?: string[]
  techniques?: string[]
}

type Node = {
  id: string
  title: string
  description: string
  position: { x: number; y: number }
  icon: any
  children?: string[]
  parent?: string
  content: NodeContent
}

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
  const [isHovered, setIsHovered] = useState(false)
  
  // Color coding for different service types
  const getServiceColor = (nodeId: string) => {
    if (nodeId.includes('design') || ['ui-design', 'ux-research', 'prototyping'].includes(nodeId)) {
      return 'bg-purple-50 border-purple-200'
    }
    if (nodeId.includes('development') || ['frontend', 'backend', 'mobile', 'database'].includes(nodeId)) {
      return 'bg-blue-50 border-blue-200'
    }
    if (nodeId.includes('seo') || ['keyword-research', 'content-writing', 'seo-optimization', 'analytics'].includes(nodeId)) {
      return 'bg-green-50 border-green-200'
    }
    if (nodeId.includes('training') || ['fitness-assessment', 'training-program', 'nutrition', 'mental-wellness'].includes(nodeId)) {
      return 'bg-orange-50 border-orange-200'
    }
    return 'bg-gray-50 border-gray-200'
  }

  return (
    <motion.div
      layoutId={node.id}
      className="absolute cursor-pointer z-10"
      style={{
        left: '50%',
        top: '50%',
        x: node.position.x - (node.id === 'main' ? 96 : node.children && node.children.length > 0 ? 144 : 112),
        y: node.position.y - (node.id === 'main' ? 128 : node.children && node.children.length > 0 ? 60 : 40),
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isVisible ? 1 : 0,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      onClick={() => onSelect(node.id)}
      whileHover={{ scale: 1.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {node.id === 'main' ? (
        <div className="bg-white rounded-xl shadow-lg p-6 w-48 h-64 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Icon className="w-8 h-8 text-gray-700" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg mb-2">{node.title}</h3>
          <p className="text-xs text-gray-600 mb-4">{node.description}</p>
          <div className="flex flex-wrap gap-1 justify-center">
            {node.content.roles && node.content.roles.map((role, index) => (
              <span key={index} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                {role}
              </span>
            ))}
          </div>
        </div>
      ) : node.children && node.children.length > 0 ? (
        // Main service cards with preview
        <div className="bg-white rounded-xl shadow-lg p-4 w-72 h-auto min-h-[120px] flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
              <Icon className="w-6 h-6 text-gray-700" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm">{node.title}</h3>
              <p className="text-xs text-gray-600">{node.description}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            {node.children.slice(0, 4).map(childId => {
              const child = nodes[childId as keyof typeof nodes]
              return (
                <span key={childId} className="text-xs px-2 py-1 bg-gray-50 rounded-md text-gray-600 border border-gray-200">
                  {child.title}
                </span>
              )
            })}
          </div>
        </div>
      ) : (
        // Sub-service cards
        <div className={`bg-white rounded-xl shadow-md p-3 w-56 h-auto min-h-[80px] border-2 ${getServiceColor(node.id)}`}>
          <div className="flex items-start gap-2">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getServiceColor(node.id)}`}>
              <Icon className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 text-sm">{node.title}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{node.description}</p>
              {node.content.services && (
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {node.content.services.slice(0, 2).map((service, idx) => (
                    <span key={idx} className="text-xs text-gray-500">• {service}</span>
                  ))}
                </div>
              )}
              {node.content.technologies && (
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {node.content.technologies.slice(0, 3).map((tech, idx) => (
                    <span key={idx} className="text-xs px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">{tech}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Hover tooltip for additional info */}
      <AnimatePresence>
        {isHovered && !node.children && node.content.details && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-1/2 -translate-x-1/2 -bottom-2 translate-y-full z-20 w-64 p-3 bg-gray-900 text-white rounded-lg shadow-xl pointer-events-none"
          >
            <p className="text-xs">{node.content.details}</p>
            {node.content.tools && (
              <div className="mt-2 flex flex-wrap gap-1">
                {node.content.tools.map((tool, idx) => (
                  <span key={idx} className="text-xs px-1.5 py-0.5 bg-gray-800 rounded">
                    {tool}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
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

          {/* Technologies */}
          {node.content.technologies && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {node.content.technologies.map((tech, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {node.content.projects && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Projects</h3>
              <div className="space-y-2">
                {node.content.projects.map((project, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{project}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Approach */}
          {node.content.approach && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Our Approach</h3>
              <div className="space-y-2">
                {node.content.approach.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400" />
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Specialties */}
          {node.content.specialties && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Specialties</h3>
              <div className="grid grid-cols-2 gap-3">
                {node.content.specialties.map((specialty, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg">
                    <span className="text-gray-700">{specialty}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Includes */}
          {node.content.includes && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What's Included</h3>
              <div className="space-y-2">
                {node.content.includes.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-gray-600" />
                    </div>
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Types */}
          {node.content.types && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Program Types</h3>
              <div className="grid grid-cols-2 gap-3">
                {node.content.types.map((type, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg text-center">
                    <span className="text-gray-700">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Focus areas */}
          {node.content.focus && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Focus Areas</h3>
              <div className="grid grid-cols-2 gap-3">
                {node.content.focus.map((area, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg">
                    <span className="text-gray-700">{area}</span>
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

// Connection Lines Component
function ConnectionLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        const parent = canvasRef.current.parentElement
        setDimensions({
          width: parent.offsetWidth,
          height: parent.offsetHeight
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height)

    // Set line style
    ctx.strokeStyle = '#9ca3af'
    ctx.lineWidth = 3
    ctx.setLineDash([8, 4])
    ctx.globalAlpha = 0.8

    // Center position
    const centerX = dimensions.width / 2
    const centerY = dimensions.height / 2

    // Draw connections
    Object.values(nodes).forEach(node => {
      if ('children' in node && node.children) {
        node.children.forEach(childId => {
          const childNode = nodes[childId as keyof typeof nodes]
          if (childNode) {
            ctx.beginPath()
            ctx.moveTo(centerX + node.position.x, centerY + node.position.y)
            ctx.lineTo(centerX + childNode.position.x, centerY + childNode.position.y)
            ctx.stroke()
          }
        })
      }
    })
  }, [dimensions])

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
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
        {/* Render connection lines */}
        <ConnectionLines />

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