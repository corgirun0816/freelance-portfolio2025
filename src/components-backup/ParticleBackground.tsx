"use client"

import { useEffect, useRef } from "react"

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 100
    const connectionDistance = 150

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      radius: number

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth
        this.y = Math.random() * canvasHeight
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.radius = Math.random() * 2 + 1
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.vx
        this.y += this.vy

        if (this.x < 0 || this.x > canvasWidth) this.vx = -this.vx
        if (this.y < 0 || this.y > canvasHeight) this.vy = -this.vy
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        context.fillStyle = "rgba(148, 163, 184, 0.5)"
        context.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height))
    }

    function animate() {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.update(canvas.width, canvas.height)
        particle.draw(ctx)
      })

      particles.forEach((particleA, indexA) => {
        particles.slice(indexA + 1).forEach((particleB) => {
          const dx = particleA.x - particleB.x
          const dy = particleA.y - particleB.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            ctx.beginPath()
            ctx.moveTo(particleA.x, particleA.y)
            ctx.lineTo(particleB.x, particleB.y)
            ctx.strokeStyle = `rgba(148, 163, 184, ${
              0.2 * (1 - distance / connectionDistance)
            })`
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 opacity-50"
      style={{ pointerEvents: "none" }}
    />
  )
}