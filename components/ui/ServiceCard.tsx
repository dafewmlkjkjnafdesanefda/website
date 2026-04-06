'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LucideIcon, ChevronDown, Check } from 'lucide-react'

interface ServiceCardProps {
  Icon: LucideIcon
  title: string
  description: string
  deliverables: string[]
  priceRange: string
}

export default function ServiceCard({ Icon, title, description, deliverables, priceRange }: ServiceCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      className="group relative flex flex-col gap-4 p-8 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl shadow-warm-sm hover:shadow-warm-lg transition-shadow duration-300 overflow-hidden"
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Animated gradient border on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(202,138,4,0.3) 0%, transparent 50%, rgba(202,138,4,0.1) 100%)',
        }}
      />

      {/* Top glow line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/60 transition-all duration-700"
      />

      <motion.div
        className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 group-hover:bg-gold/10 group-hover:border-gold/30 transition-colors duration-300"
        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
        transition={{ duration: 0.5 }}
      >
        <Icon className="w-6 h-6 text-stone-600 dark:text-stone-400 group-hover:text-gold transition-colors duration-300" strokeWidth={1.5} />
      </motion.div>

      <div className="relative">
        <h3 className="font-serif text-xl font-semibold text-stone-900 dark:text-white mb-2">{title}</h3>
        <p className="font-sans text-sm text-stone-500 dark:text-stone-400 leading-relaxed">{description}</p>
      </div>

      <button
        onClick={() => setExpanded((v) => !v)}
        data-cursor="pointer"
        className="flex items-center gap-1.5 font-sans text-sm text-gold hover:text-gold-dark font-medium transition-colors cursor-pointer w-fit relative"
      >
        {expanded ? 'Show Less' : 'Learn More'}
        <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden relative"
          >
            <div className="pt-4 border-t border-stone-200 dark:border-stone-700">
              <ul className="space-y-2 mb-4">
                {deliverables.map((d, i) => (
                  <motion.li
                    key={d}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-2 font-sans text-sm text-stone-500 dark:text-stone-400"
                  >
                    <Check className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                    {d}
                  </motion.li>
                ))}
              </ul>
              <p className="font-sans text-xs text-stone-400 mb-3">
                Starting from{' '}
                <span className="text-gold font-semibold">{priceRange}</span>
              </p>
              <motion.a
                href="#contact"
                data-cursor="pointer"
                className="inline-flex items-center px-4 py-2 bg-gold hover:bg-gold-dark text-white text-sm font-sans font-medium rounded-full transition-colors duration-200 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get a Quote
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
