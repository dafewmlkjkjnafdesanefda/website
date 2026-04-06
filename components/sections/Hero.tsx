'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import MagneticButton from '@/components/ui/MagneticButton'
import WaveGrid from '@/components/ui/WaveGrid'

const phrases = [
  'transmuting ideas into digital experiences',
  'bending pixels to my will',
  'crafting impossible interfaces',
  'making the web feel alive',
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.22 } },
}

const item = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  show:   { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
}

// Animated letter-by-letter title
function AnimatedTitle({ text, highlight }: { text: string; highlight: string }) {
  return (
    <motion.h1
      variants={item}
      className="font-serif text-6xl md:text-8xl font-semibold text-stone-900 dark:text-white leading-[1.05] mb-6"
    >
      {text.split('').map((char, i) => {
        const isHighlight = highlight.includes(char) && text.indexOf(char) === i
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 40, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.5 + i * 0.08, duration: 0.6, ease: 'easeOut' }}
            className={`inline-block ${isHighlight ? 'text-gold' : ''}`}
            style={{ transformOrigin: 'bottom' }}
          >
            {char}
          </motion.span>
        )
      })}
    </motion.h1>
  )
}

export default function Hero() {
  const [displayed, setDisplayed]     = useState('')
  const [phraseIdx, setPhraseIdx]     = useState(0)
  const [isErasing, setIsErasing]     = useState(false)
  const [showCursor, setShowCursor]   = useState(true)
  const [isTyping, setIsTyping]       = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const id = setInterval(() => {
      if (!isTyping) setShowCursor((v) => !v)
    }, 500)
    return () => clearInterval(id)
  }, [isTyping])

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
      {/* 3D wireframe grid */}
      <WaveGrid opacity={0.6} />

      {/* Animated radial glow that pulses */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={{
          opacity: [0.2, 0.35, 0.2],
          scale: [1, 1.05, 1],
        }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(202,138,4,0.15) 0%, transparent 70%)',
        }}
      />

      {/* Floating decorative elements */}
      <motion.div
        aria-hidden
        className="absolute top-1/4 left-[10%] w-2 h-2 rounded-full bg-gold/40"
        animate={{ y: [0, -20, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute top-1/3 right-[15%] w-3 h-3 rounded-full bg-gold/20"
        animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-1/3 left-[20%] w-1.5 h-1.5 rounded-full bg-gold/30"
        animate={{ y: [0, -15, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
      />
      <motion.div
        aria-hidden
        className="absolute top-[60%] right-[8%] w-1 h-1 rounded-full bg-gold/50"
        animate={{ y: [0, -25, 0], x: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 2 }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl"
      >
        <motion.p
          variants={item}
          className="font-sans text-sm tracking-[0.25em] uppercase text-gold mb-6"
        >
          Digital Alchemist
        </motion.p>

        <AnimatedTitle text="D4VO" highlight="4" />

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
            <motion.a
              href="#work"
              data-cursor="pointer"
              className="inline-flex items-center px-7 py-3.5 bg-gold hover:bg-gold-dark text-white font-sans text-sm font-medium rounded-full shadow-warm-md transition-colors duration-200 cursor-pointer"
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(202,138,4,0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
          </MagneticButton>
          <MagneticButton>
            <motion.a
              href="#contact"
              data-cursor="pointer"
              className="inline-flex items-center px-7 py-3.5 border border-stone-300 dark:border-stone-600 hover:border-gold text-stone-700 dark:text-stone-300 hover:text-gold font-sans text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.a>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-stone-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <span className="font-sans text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  )
}
