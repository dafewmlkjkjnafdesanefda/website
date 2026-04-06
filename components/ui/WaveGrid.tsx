'use client'

import { useEffect, useRef } from 'react'

interface WaveGridProps {
  className?: string
  opacity?: number
}

export default function WaveGrid({ className = '', opacity = 0.6 }: WaveGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animationId: number
    let lastTime = 0
    const FPS = 24
    const interval = 1000 / FPS

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.targetX = e.clientX - rect.left - rect.width / 2
      mouseRef.current.targetY = e.clientY - rect.top - rect.height / 2
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    const draw = (timestamp: number) => {
      animationId = requestAnimationFrame(draw)
      if (timestamp - lastTime < interval) return
      lastTime = timestamp

      if (!reduced) timeRef.current += 0.015

      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const isMobile = w < 768
      const cols = isMobile ? 20 : 40
      const rows = isMobile ? 12 : 25
      const spacing = 30
      const amplitude = 40
      const focalLength = 600
      const time = timeRef.current

      // Lerp mouse
      const m = mouseRef.current
      m.x += (m.targetX - m.x) * 0.05
      m.y += (m.targetY - m.y) * 0.05

      const originX = w / 2 + m.x * 0.15
      const originY = h / 2 + m.y * 0.15

      ctx.clearRect(0, 0, w, h)

      // Compute projected points
      const points: { sx: number; sy: number; scale: number }[][] = []

      for (let row = 0; row < rows; row++) {
        points[row] = []
        for (let col = 0; col < cols; col++) {
          const worldX = (col - cols / 2) * spacing
          const worldY = (row - rows / 2) * spacing
          const worldZ =
            amplitude *
            Math.sin(col * 0.3 + time) *
            Math.cos(row * 0.25 + time * 0.7)

          const scale = focalLength / (focalLength + worldZ + 200)
          const sx = originX + worldX * scale
          const sy = originY + worldY * scale

          points[row][col] = { sx, sy, scale }
        }
      }

      // Draw grid lines
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const p = points[row][col]
          const alpha = Math.max(0, Math.min(1, p.scale * 0.5))

          ctx.lineWidth = 0.5 + p.scale * 0.5

          // Horizontal line to right neighbor
          if (col < cols - 1) {
            const pNext = points[row][col + 1]
            ctx.beginPath()
            ctx.strokeStyle = `rgba(202,138,4,${alpha * 0.6})`
            ctx.moveTo(p.sx, p.sy)
            ctx.lineTo(pNext.sx, pNext.sy)
            ctx.stroke()
          }

          // Vertical line to bottom neighbor
          if (row < rows - 1) {
            const pBelow = points[row + 1][col]
            ctx.beginPath()
            ctx.strokeStyle = `rgba(202,138,4,${alpha * 0.4})`
            ctx.moveTo(p.sx, p.sy)
            ctx.lineTo(pBelow.sx, pBelow.sy)
            ctx.stroke()
          }

          // Dot at intersection
          if ((col + row) % 3 === 0) {
            ctx.beginPath()
            ctx.fillStyle = `rgba(202,138,4,${alpha * 0.8})`
            ctx.arc(p.sx, p.sy, 1.5 * p.scale, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }
    }

    if (reduced) {
      // Render one static frame
      draw(0)
    } else {
      animationId = requestAnimationFrame(draw)
    }

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity }}
    />
  )
}
