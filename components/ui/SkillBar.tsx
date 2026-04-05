'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface SkillBarProps {
  label: string
  percentage: number
  delay?: number
}

export default function SkillBar({ label, percentage, delay = 0 }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="font-sans text-sm text-stone-700 dark:text-stone-300">{label}</span>
        <span className="font-sans text-sm text-gold font-medium">{percentage}%</span>
      </div>
      <div className="h-1.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gold rounded-full origin-left"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay }}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
