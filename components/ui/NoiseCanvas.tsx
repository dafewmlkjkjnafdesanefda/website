'use client'

import { useEffect, useRef } from 'react'

interface NoiseCanvasProps {
  opacity?: number
}

export default function NoiseCanvas({ opacity = 0.035 }: NoiseCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let lastTime = 0
    const FPS = 12
    const interval = 1000 / FPS

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const draw = (time: number) => {
      animationId = requestAnimationFrame(draw)
      if (time - lastTime < interval) return
      lastTime = time

      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.floor(Math.random() * 255)
        data[i] = data[i + 1] = data[i + 2] = noise
        data[i + 3] = 18
      }
      ctx.putImageData(imageData, 0, 0)
    }

    animationId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
    />
  )
}
