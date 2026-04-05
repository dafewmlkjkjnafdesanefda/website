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
    <div className="group flex flex-col gap-4 p-8 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl shadow-warm-sm hover:shadow-warm-md transition-shadow duration-300">
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 group-hover:bg-gold/10 group-hover:border-gold/30 transition-colors duration-300">
        <Icon className="w-6 h-6 text-stone-600 dark:text-stone-400 group-hover:text-gold transition-colors duration-300" strokeWidth={1.5} />
      </div>

      <div>
        <h3 className="font-serif text-xl font-semibold text-stone-900 dark:text-white mb-2">{title}</h3>
        <p className="font-sans text-sm text-stone-500 dark:text-stone-400 leading-relaxed">{description}</p>
      </div>

      <button
        onClick={() => setExpanded((v) => !v)}
        data-cursor="pointer"
        className="flex items-center gap-1.5 font-sans text-sm text-gold hover:text-gold-dark font-medium transition-colors cursor-pointer w-fit"
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
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-stone-200 dark:border-stone-700">
              <ul className="space-y-2 mb-4">
                {deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2 font-sans text-sm text-stone-500 dark:text-stone-400">
                    <Check className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
              <p className="font-sans text-xs text-stone-400 mb-3">
                Starting from{' '}
                <span className="text-gold font-semibold">{priceRange}</span>
              </p>
              <a
                href="#contact"
                data-cursor="pointer"
                className="inline-flex items-center px-4 py-2 bg-gold hover:bg-gold-dark text-white text-sm font-sans font-medium rounded-full transition-colors duration-200 cursor-pointer"
              >
                Get a Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
