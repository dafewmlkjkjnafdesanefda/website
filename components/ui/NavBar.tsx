'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeToggle from '@/components/ui/ThemeToggle'

const links = [
  { label: 'About',    href: '#about',    id: 'about'    },
  { label: 'Work',     href: '#work',     id: 'work'     },
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Contact',  href: '#contact',  id: 'contact'  },
]

export default function NavBar() {
  const [scrolled,       setScrolled]       = useState(false)
  const [menuOpen,       setMenuOpen]       = useState(false)
  const [activeSection,  setActiveSection]  = useState('hero')

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'work', 'services', 'contact']
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0, rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-stone-50/90 dark:bg-stone-900/90 backdrop-blur-sm shadow-warm-sm'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#hero"
            className="font-serif text-xl font-semibold text-stone-900 dark:text-white tracking-tight hover:text-gold transition-colors duration-200 cursor-pointer"
            onClick={() => setMenuOpen(false)}
          >
            AM
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-cursor="pointer"
                  className={`font-sans text-sm tracking-wide transition-colors duration-200 cursor-pointer ${
                    activeSection === link.id
                      ? 'text-gold font-medium'
                      : 'text-stone-600 dark:text-stone-400 hover:text-gold'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* Hamburger — mobile only */}
            <button
              className="flex md:hidden items-center justify-center w-9 h-9 text-stone-700 dark:text-stone-300 hover:text-gold transition-colors cursor-pointer"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              data-cursor="pointer"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
            className="fixed inset-0 z-40 bg-stone-950/98 flex flex-col items-center justify-center gap-10"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setMenuOpen(false)}
                className="font-serif text-4xl text-white hover:text-gold transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
