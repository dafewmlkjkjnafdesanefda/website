'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface FadeInSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export default function FadeInSection({ children, className = '', delay = 0, direction = 'up' }: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  const offsets = {
    up:    { x: 0, y: 32 },
    down:  { x: 0, y: -32 },
    left:  { x: 32, y: 0 },
    right: { x: -32, y: 0 },
  }

  const offset = offsets[direction]

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y, filter: 'blur(4px)' }}
      animate={isInView
        ? { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }
        : { opacity: 0, x: offset.x, y: offset.y, filter: 'blur(4px)' }
      }
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
