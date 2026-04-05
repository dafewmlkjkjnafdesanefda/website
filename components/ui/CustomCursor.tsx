'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type CursorVariant = 'default' | 'pointer' | 'text'

const ringVariants = {
  default: { scale: 1, opacity: 0.6 },
  pointer: { scale: 2.4, opacity: 1 },
  text:    { scale: 1, scaleX: 3, scaleY: 0.3, opacity: 0.8 },
}

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(true) // default true → render nothing until confirmed non-touch
  const [variant, setVariant] = useState<CursorVariant>('default')
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useMotionValue(-200)
  const cursorY = useMotionValue(-200)

  const dotX = useSpring(cursorX, { stiffness: 500, damping: 30, mass: 0.3 })
  const dotY = useSpring(cursorY, { stiffness: 500, damping: 30, mass: 0.3 })
  const ringX = useSpring(cursorX, { stiffness: 120, damping: 20, mass: 0.5 })
  const ringY = useSpring(cursorY, { stiffness: 120, damping: 20, mass: 0.5 })

  const variantRef = useRef<CursorVariant>('default')

  useEffect(() => {
    const touch = window.matchMedia('(pointer: coarse)').matches
    if (touch) return
    setIsTouch(false)
    document.documentElement.classList.add('cursor-hidden')

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element
      const cursorEl = target.closest('[data-cursor]') as HTMLElement | null
      if (cursorEl) {
        const v = cursorEl.dataset.cursor as CursorVariant
        variantRef.current = v
        setVariant(v)
        return
      }
      const tag = target.tagName.toLowerCase()
      if (['p', 'span', 'li', 'h1', 'h2', 'h3', 'h4', 'label'].includes(tag)) {
        variantRef.current = 'text'
        setVariant('text')
        return
      }
      variantRef.current = 'default'
      setVariant('default')
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })

    return () => {
      document.documentElement.classList.remove('cursor-hidden')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
    }
  }, [cursorX, cursorY, isVisible])

  if (isTouch) return null

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        className="fixed top-0 left-0 w-2 h-2 bg-gold rounded-full pointer-events-none z-[9999]"
        animate={{ opacity: isVisible ? 1 : 0 }}
      />
      {/* Ring */}
      <motion.div
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        variants={ringVariants}
        animate={variant}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="fixed top-0 left-0 w-8 h-8 border border-gold/60 rounded-full pointer-events-none z-[9998]"
      />
    </>
  )
}
