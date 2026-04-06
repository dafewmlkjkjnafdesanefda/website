'use client'

import { useEffect, useRef, useState } from 'react'

// 4 blob shapes — each is 8 control points (x, y) distributed around center
const SHAPES: number[][] = [
  [200,80, 280,100, 320,180, 300,260, 220,320, 140,280, 100,200, 120,120],
  [220,70, 310,110, 330,200, 280,290, 200,330, 120,300, 80,210, 130,100],
  [190,90, 270,80,  340,170, 310,270, 230,310, 130,290, 90,190, 110,130],
  [210,60, 300,120, 320,190, 290,280, 210,340, 110,280, 70,200, 140,110],
]

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

function pointsToPath(pts: number[]): string {
  const n = pts.length / 2
  let d = `M ${pts[0]},${pts[1]}`
  for (let i = 0; i < n; i++) {
    const x0 = pts[(i * 2) % pts.length]
    const y0 = pts[(i * 2 + 1) % pts.length]
    const x1 = pts[((i + 1) * 2) % pts.length]
    const y1 = pts[((i + 1) * 2 + 1) % pts.length]
    const cpx1 = x0 + (x1 - x0) * 0.5
    const cpy1 = y0
    const cpx2 = x0 + (x1 - x0) * 0.5
    const cpy2 = y1
    d += ` C ${cpx1},${cpy1} ${cpx2},${cpy2} ${x1},${y1}`
  }
  return d + ' Z'
}

interface MorphBlobProps {
  className?: string
}

export default function MorphBlob({ className = '' }: MorphBlobProps) {
  const [pathD, setPathD] = useState(() => pointsToPath(SHAPES[0]))
  const rafRef = useRef<number>(0)
  const mouseRef = useRef({ x: 200, y: 200 })
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    let shapeA = 0
    let shapeB = 1
    let rawT = 0
    let lastTime = Date.now()

    const onMouse = (e: MouseEvent) => {
      if (!svgRef.current) return
      const rect = svgRef.current.getBoundingClientRect()
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 400
      mouseRef.current.y = ((e.clientY - rect.top) / rect.height) * 400
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    const animate = () => {
      const now = Date.now()
      const dt = now - lastTime
      lastTime = now

      rawT += dt / 3000
      if (rawT >= 1) {
        rawT = 0
        shapeA = shapeB
        shapeB = (shapeB + 1) % SHAPES.length
      }

      const easedT = (1 - Math.cos(Math.PI * rawT)) / 2
      const a = SHAPES[shapeA]
      const b = SHAPES[shapeB]
      const pts = a.map((v, i) => lerp(v, b[i], easedT))

      // Mouse attraction
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      for (let i = 0; i < pts.length; i += 2) {
        const dx = mx - pts[i]
        const dy = my - pts[i + 1]
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200 && dist > 0) {
          const pull = ((200 - dist) / 200) * 30
          pts[i] += (dx / dist) * pull
          pts[i + 1] += (dy / dist) * pull
        }
      }

      setPathD(pointsToPath(pts))
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 400"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="blobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#CA8A04" />
          <stop offset="50%" stopColor="#FEF08A" />
          <stop offset="100%" stopColor="#A16207" />
        </linearGradient>
      </defs>
      <path d={pathD} fill="url(#blobGrad)" opacity={0.15} />
    </svg>
  )
}
