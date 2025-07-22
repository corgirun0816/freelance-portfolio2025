"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  radius: number
  opacity: number
}

export function DynamicParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()

    // Initialize particles
    const particleCount = 150
    const particles: Particle[] = []
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 2,
        radius: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }
    particlesRef.current = particles

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.z += particle.vz

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
        if (particle.z < 1) particle.z = 1000
        if (particle.z > 1000) particle.z = 1

        // 3D projection
        const scale = 1000 / (1000 + particle.z)
        const x2d = (particle.x - canvas.width / 2) * scale + canvas.width / 2
        const y2d = (particle.y - canvas.height / 2) * scale + canvas.height / 2
        const radius = particle.radius * scale

        // Mouse interaction
        const dx = mouseRef.current.x - x2d
        const dy = mouseRef.current.y - y2d
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 150) {
          const force = (150 - distance) / 150
          particle.vx += (dx / distance) * force * 0.5
          particle.vy += (dy / distance) * force * 0.5
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(x2d, y2d, radius, 0, Math.PI * 2)
        
        // Create gradient for depth
        const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, radius)
        const grayValue = Math.floor(180 + scale * 50)
        gradient.addColorStop(0, `rgba(${grayValue}, ${grayValue}, ${grayValue}, ${particle.opacity * scale})`)
        gradient.addColorStop(1, `rgba(${grayValue}, ${grayValue}, ${grayValue}, 0)`)
        
        ctx.fillStyle = gradient
        ctx.fill()

        // Connect nearby particles
        particlesRef.current.slice(index + 1).forEach((particle2) => {
          const dx = x2d - ((particle2.x - canvas.width / 2) * (1000 / (1000 + particle2.z)) + canvas.width / 2)
          const dy = y2d - ((particle2.y - canvas.height / 2) * (1000 / (1000 + particle2.z)) + canvas.height / 2)
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(x2d, y2d)
            ctx.lineTo(
              (particle2.x - canvas.width / 2) * (1000 / (1000 + particle2.z)) + canvas.width / 2,
              (particle2.y - canvas.height / 2) * (1000 / (1000 + particle2.z)) + canvas.height / 2
            )
            ctx.strokeStyle = `rgba(200, 200, 200, ${(1 - distance / 100) * 0.2 * scale})`
            ctx.stroke()
          }
        })

        // Apply friction
        particle.vx *= 0.99
        particle.vy *= 0.99
        particle.vz *= 0.99
      })

      requestAnimationFrame(animate)
    }

    animate()

    // Resize handler
    const handleResize = () => {
      setCanvasSize()
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10"
        style={{ background: "linear-gradient(to bottom, #fafafa, #f5f5f5)" }}
      />
      <motion.div
        className="fixed inset-0 -z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.05),transparent_50%)]" />
      </motion.div>
    </>
  )
}