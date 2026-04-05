'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import MagneticButton from '@/components/ui/MagneticButton'
import NoiseCanvas from '@/components/ui/NoiseCanvas'

const phrases = [
  'crafting elegant digital experiences',
  'building performant web apps',
  'designing with purpose',
  'turning ideas into interfaces',
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
}

const item = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function Hero() {
  const [displayed, setDisplayed]     = useState('')
  const [phraseIdx, setPhraseIdx]     = useState(0)
  const [isErasing, setIsErasing]     = useState(false)
  const [showCursor, setShowCursor]   = useState(true)
  const [isTyping, setIsTyping]       = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => {
      if (!isTyping) setShowCursor((v) => !v)
    }, 500)
    return () => clearInterval(id)
  }, [isTyping])

  // Typewriter
  useEffect(() => {
    const phrase = phrases[phraseIdx]

    const clear = () => { if (timerRef.current) clearTimeout(timerRef.current) }

    if (!isErasing) {
      if (displayed.length < phrase.length) {
        setIsTyping(true)
        setShowCursor(true)
        timerRef.current = setTimeout(() => {
          setDisplayed(phrase.slice(0, displayed.length + 1))
        }, 60)
      } else {
        setIsTyping(false)
        timerRef.current = setTimeout(() => setIsErasing(true), 2200)
      }
    } else {
      if (displayed.length > 0) {
        setIsTyping(true)
        setShowCursor(true)
        timerRef.current = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1))
        }, 35)
      } else {
        setIsTyping(false)
        setIsErasing(false)
        timerRef.current = setTimeout(() => {
          setPhraseIdx((i) => (i + 1) % phrases.length)
        }, 300)
      }
    }

    return clear
  }, [displayed, phraseIdx, isErasing])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center bg-stone-50 dark:bg-stone-900 px-6 text-center overflow-hidden"
    >
      {/* Animated grain */}
      <NoiseCanvas opacity={0.035} />

      {/* Warm radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(202,138,4,0.1) 0%, transparent 70%)',
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl"
      >
        <motion.p variants={item} className="font-sans text-sm tracking-[0.25em] uppercase text-gold mb-6">
          Designer &amp; Developer
        </motion.p>

        <motion.h1
          variants={item}
          className="font-serif text-6xl md:text-8xl font-semibold text-stone-900 dark:text-white leading-[1.05] mb-6"
        >
          Alex Morgan
        </motion.h1>

        {/* Typewriter tagline */}
        <motion.p
          variants={item}
          className="font-sans text-lg md:text-xl text-stone-500 dark:text-stone-400 max-w-xl mx-auto leading-relaxed mb-10 min-h-[2rem]"
        >
          {displayed}
          <span
            className={`inline-block w-[2px] h-5 bg-gold ml-0.5 align-middle transition-opacity duration-100 ${
              showCursor ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticButton>
            <a
              href="#work"
              data-cursor="pointer"
              className="inline-flex items-center px-7 py-3.5 bg-gold hover:bg-gold-dark text-white font-sans text-sm font-medium rounded-full shadow-warm-md transition-colors duration-200 cursor-pointer"
            >
              View My Work
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#contact"
              data-cursor="pointer"
              className="inline-flex items-center px-7 py-3.5 border border-stone-300 dark:border-stone-600 hover:border-gold text-stone-700 dark:text-stone-300 hover:text-gold font-sans text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer"
            >
              Get in Touch
            </a>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-stone-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <span className="font-sans text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  )
}
