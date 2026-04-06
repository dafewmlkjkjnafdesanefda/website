'use client'

import { useRef, useState, useEffect } from 'react'
import { useInView } from 'framer-motion'

interface StatCounterProps {
  target: number
  suffix?: string
  label: string
  duration?: number
  delay?: number
}

export default function StatCounter({
  target,
  suffix = '',
  label,
  duration = 2000,
  delay = 0,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let rafId: number
    const startTime = Date.now() + delay * 1000

    const tick = () => {
      const now = Date.now()
      if (now < startTime) { rafId = requestAnimationFrame(tick); return }
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) rafId = requestAnimationFrame(tick)
      else setCount(target)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [isInView, target, duration, delay])

  return (
    <div ref={ref} className="text-center">
      <p className="font-serif text-4xl font-semibold text-stone-900 dark:text-white">
        {count}{suffix}
      </p>
      <p className="font-sans text-sm text-stone-500 dark:text-stone-400 mt-1">{label}</p>
    </div>
  )
}
