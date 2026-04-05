'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
}

export default function TiltCard({ children, className = '' }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const sheenX  = useMotionValue(50)
  const sheenY  = useMotionValue(50)

  const springRotX = useSpring(rotateX, { stiffness: 150, damping: 20 })
  const springRotY = useSpring(rotateY, { stiffness: 150, damping: 20 })

  const sheenBg = useTransform(
    [sheenX, sheenY] as const,
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`
  )

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    rotateY.set((x - 0.5) * 20)
    rotateX.set((0.5 - y) * 20)
    sheenX.set(x * 100)
    sheenY.set(y * 100)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    sheenX.set(50)
    sheenY.set(50)
  }

  return (
    <div style={{ perspective: '800px' }} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX: springRotX, rotateY: springRotY, transformStyle: 'preserve-3d' }}
        className="relative"
        data-cursor="pointer"
      >
        {children}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{ background: sheenBg }}
        />
      </motion.div>
    </div>
  )
}
