'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { ChevronUp } from 'lucide-react'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    return scrollY.on('change', (y) => setIsVisible(y > 300))
  }, [scrollY])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          data-cursor="pointer"
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gold hover:bg-gold-dark text-white rounded-full shadow-warm-lg flex items-center justify-center transition-colors duration-200 cursor-pointer"
        >
          <ChevronUp className="w-5 h-5" strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
