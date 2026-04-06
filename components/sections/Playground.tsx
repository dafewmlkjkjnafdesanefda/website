'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import FadeInSection from '@/components/ui/FadeInSection'

// ─── Widget 1: Impossible Cube ───────────────────────────────────────────────

function ImpossibleCube() {
  return (
    <div className="w-full h-full flex items-center justify-center" style={{ perspective: '800px' }}>
      <motion.div
        animate={{ rotateX: 360, rotateY: 360 }}
        transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-28 h-28"
      >
        {/* Front */}
        <div className="absolute inset-0 border-2 border-gold/60 bg-gold/5" style={{ transform: 'translateZ(56px)' }} />
        {/* Back */}
        <div className="absolute inset-0 border-2 border-gold/30 bg-gold/5" style={{ transform: 'rotateY(180deg) translateZ(56px)' }} />
        {/* Left */}
        <div className="absolute inset-0 border-2 border-gold/40 bg-gold/5" style={{ transform: 'rotateY(-90deg) translateZ(56px)' }} />
        {/* Right */}
        <div className="absolute inset-0 border-2 border-gold/40 bg-gold/5" style={{ transform: 'rotateY(90deg) translateZ(56px)' }} />
        {/* Top */}
        <div className="absolute inset-0 border-2 border-gold/50 bg-gold/5" style={{ transform: 'rotateX(90deg) translateZ(56px)' }} />
        {/* Bottom */}
        <div className="absolute inset-0 border-2 border-gold/20 bg-gold/5" style={{ transform: 'rotateX(-90deg) translateZ(56px)' }} />
        {/* Inner cube for Necker illusion */}
        <motion.div
          animate={{ rotateX: -360, rotateZ: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
          style={{ transformStyle: 'preserve-3d' }}
          className="absolute inset-6"
        >
          <div className="absolute inset-0 border border-stone-400/40 bg-stone-400/5" style={{ transform: 'translateZ(25px)' }} />
          <div className="absolute inset-0 border border-stone-400/40 bg-stone-400/5" style={{ transform: 'rotateY(180deg) translateZ(25px)' }} />
          <div className="absolute inset-0 border border-stone-400/30 bg-stone-400/5" style={{ transform: 'rotateY(-90deg) translateZ(25px)' }} />
          <div className="absolute inset-0 border border-stone-400/30 bg-stone-400/5" style={{ transform: 'rotateY(90deg) translateZ(25px)' }} />
        </motion.div>
      </motion.div>
    </div>
  )
}

// ─── Widget 2: Color Illusion Grid ───────────────────────────────────────────

function ColorIllusionGrid() {
  const [revealed, setRevealed] = useState(false)
  const GRID = 6
  const TARGET_COLOR = 'rgb(140,140,140)'
  const targetA = { r: 1, c: 1 }
  const targetB = { r: 4, c: 4 }

  const getCellColor = (r: number, c: number) => {
    if ((r === targetA.r && c === targetA.c) || (r === targetB.r && c === targetB.c)) {
      return TARGET_COLOR
    }
    // Context manipulation: area around A is light, around B is dark
    const distA = Math.abs(r - targetA.r) + Math.abs(c - targetA.c)
    const distB = Math.abs(r - targetB.r) + Math.abs(c - targetB.c)

    if (distA <= 1) return (r + c) % 2 === 0 ? '#d6d3d1' : '#e7e5e4'  // light around A
    if (distB <= 1) return (r + c) % 2 === 0 ? '#292524' : '#1c1917'  // dark around B
    return (r + c) % 2 === 0 ? '#78716c' : '#a8a29e' // neutral checkerboard
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6">
      <div
        className="grid gap-0.5 w-full max-w-[240px] aspect-square"
        style={{ gridTemplateColumns: `repeat(${GRID}, 1fr)` }}
      >
        {Array.from({ length: GRID * GRID }, (_, i) => {
          const r = Math.floor(i / GRID)
          const c = i % GRID
          const isTarget = (r === targetA.r && c === targetA.c) || (r === targetB.r && c === targetB.c)
          return (
            <motion.div
              key={i}
              layout
              onClick={() => isTarget && setRevealed(true)}
              className={`rounded-sm ${isTarget ? 'cursor-pointer ring-1 ring-gold/40 z-10' : ''}`}
              style={{ backgroundColor: revealed && isTarget ? TARGET_COLOR : getCellColor(r, c) }}
              animate={revealed && isTarget ? { scale: 1.3 } : { scale: 1 }}
            />
          )
        })}
      </div>
      {revealed ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <p className="font-sans text-xs text-gold font-medium">Same color!</p>
          <button
            onClick={() => setRevealed(false)}
            className="font-sans text-xs text-stone-400 underline underline-offset-2 mt-1 cursor-pointer"
          >
            Reset
          </button>
        </motion.div>
      ) : (
        <p className="font-sans text-xs text-stone-400">Click the highlighted squares</p>
      )}
    </div>
  )
}

// ─── Widget 3: Spiral Hypnosis ───────────────────────────────────────────────

function SpiralHypnosis() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animationId: number
    let rotation = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const size = canvas.offsetWidth
      canvas.width = size * dpr
      canvas.height = size * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
      mouseRef.current.y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
    }
    canvas.addEventListener('mousemove', onMouse, { passive: true })

    const draw = () => {
      animationId = requestAnimationFrame(draw)
      const size = canvas.offsetWidth
      const cx = size / 2
      const cy = size / 2

      const speedFactor = 1 + mouseRef.current.x * 3
      const zoomFactor = 3 + mouseRef.current.y * 5

      if (!reduced) rotation += 0.02 * speedFactor

      ctx.clearRect(0, 0, size, size)
      ctx.lineWidth = 6
      ctx.lineCap = 'round'

      const maxTheta = 28
      const step = 0.08

      for (let pass = 0; pass < 2; pass++) {
        ctx.beginPath()
        ctx.strokeStyle = pass === 0 ? '#1c1917' : '#CA8A04'

        for (let theta = pass * Math.PI; theta < maxTheta; theta += step) {
          const r = zoomFactor * theta
          const x = cx + r * Math.cos(theta + rotation)
          const y = cy + r * Math.sin(theta + rotation)

          if (theta <= pass * Math.PI + step) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)

          // Skip alternate half-turns for each pass
          if (Math.floor((theta + rotation) / Math.PI) % 2 !== pass) {
            ctx.stroke()
            ctx.beginPath()
            ctx.moveTo(x, y)
          }
        }
        ctx.stroke()
      }
    }

    animationId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full cursor-crosshair"
    />
  )
}

// ─── Widget 4: Parallax Depth Cards ──────────────────────────────────────────

function ParallaxDepthCards() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 100, damping: 20 })
  const springY = useSpring(my, { stiffness: 100, damping: 20 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left - rect.width / 2) / rect.width)
    my.set((e.clientY - rect.top - rect.height / 2) / rect.height)
  }, [mx, my])

  const handleMouseLeave = useCallback(() => {
    mx.set(0)
    my.set(0)
  }, [mx, my])

  const cards = [
    { label: 'Design', emoji: '◆', bg: 'bg-gradient-to-br from-gold/20 to-amber-100/20' },
    { label: 'Code', emoji: '⟨/⟩', bg: 'bg-gradient-to-br from-stone-300/20 to-stone-100/20' },
    { label: 'Create', emoji: '✦', bg: 'bg-gradient-to-br from-gold/10 to-stone-200/20' },
  ]

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full flex items-center justify-center gap-3 p-6"
    >
      {cards.map(({ label, emoji, bg }) => (
        <div key={label} className={`relative w-24 h-32 rounded-xl ${bg} border border-stone-200 dark:border-stone-700 overflow-hidden`}>
          {/* BG layer */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-4xl text-gold/20 select-none"
            style={{ x: springX.get() * 5, y: springY.get() * 5 }}
          >
            {emoji}
          </motion.div>
          {/* Mid layer */}
          <motion.div
            className="absolute inset-0 flex items-end justify-center pb-3"
            style={{ x: springX.get() * 12, y: springY.get() * 12 }}
          >
            <span className="font-serif text-sm font-medium text-stone-700 dark:text-stone-300">{label}</span>
          </motion.div>
          {/* FG layer */}
          <motion.div
            className="absolute top-2 right-2 w-3 h-3 rounded-full bg-gold/40"
            style={{ x: springX.get() * 25, y: springY.get() * 25 }}
          />
        </div>
      ))}
    </div>
  )
}

// ─── Main Playground Section ─────────────────────────────────────────────────

const widgets = [
  { id: 'cube',     title: 'Impossible Cube',    desc: 'A Necker cube within a cube — stare long enough and depth flips.', Component: ImpossibleCube },
  { id: 'color',    title: 'Color Illusion',      desc: 'Two squares are the exact same color. Don\'t believe it? Click them.', Component: ColorIllusionGrid },
  { id: 'spiral',   title: 'Spiral Hypnosis',     desc: 'Move your mouse to control speed and tightness of the spiral.', Component: SpiralHypnosis },
  { id: 'parallax', title: 'Parallax Depth',      desc: 'Hover over the cards — layers shift to create a 3D illusion.', Component: ParallaxDepthCards },
]

export default function Playground() {
  return (
    <section id="playground" className="section-padding dark:bg-stone-900">
      <div className="max-w-6xl mx-auto">
        <FadeInSection className="mb-14 text-center">
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-gold mb-3">Experiments</p>
          <h2 className="section-title">
            <span className="gold-underline">Playground</span>
          </h2>
          <p className="font-sans text-stone-500 dark:text-stone-400 max-w-xl mx-auto mt-4 leading-relaxed">
            Interactive visual experiments. Move your mouse, click around, break things.
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {widgets.map(({ id, title, desc, Component }, i) => (
            <FadeInSection key={id} delay={i * 0.1}>
              <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-warm-md overflow-hidden border border-stone-200 dark:border-stone-700">
                <div className="aspect-square relative bg-stone-50 dark:bg-stone-900">
                  <Component />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold text-stone-900 dark:text-white mb-1">{title}</h3>
                  <p className="font-sans text-sm text-stone-500 dark:text-stone-400">{desc}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}
