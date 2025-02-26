"use client"

import { useEffect, useRef } from "react"

export function ParticleEffect() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const particles = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      velocity: Math.random() * 1 + 0.5,
    }))

    const animate = () => {
      if (!containerRef.current) return

      particles.forEach((particle) => {
        particle.y = (particle.y + particle.velocity) % 100
      })

      containerRef.current.style.setProperty(
        "--particles",
        particles
          .map(
            (p) => `radial-gradient(circle at ${p.x}% ${p.y}%, rgba(168, 216, 234, 0.3) 0%, transparent ${p.size}px)`,
          )
          .join(","),
      )

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-10 opacity-150"
      style={{
        background: "var(--particles)",
      }}
    />
  )
}

