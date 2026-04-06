'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeToggle from '@/components/ui/ThemeToggle'

const links = [
  { label: 'About',      href: '#about',      id: 'about'      },
  { label: 'Work',       href: '#work',       id: 'work'       },
  { label: 'Services',   href: '#services',   id: 'services'   },
  { label: 'Playground', href: '#playground', id: 'playground' },
  { label: 'Contact',    href: '#contact',    id: 'contact'    },
]

const menuVariants = {
  hidden: { opacity: 0, scale: 0.92, y: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 400, damping: 30, staggerChildren: 0.05 },
  },
  exit: { opacity: 0, scale: 0.92, y: -10, transition: { duration: 0.2 } },
}

const linkVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
}

export default function NavBar() {
  const [scrolled,      setScrolled]      = useState(false)
  const [menuOpen,      setMenuOpen]      = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sectionIds = ['hero', 'about', 'work', 'services', 'playground', 'contact']
    const observers: IntersectionObserver[] = []
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0, rootMargin: '-40% 0px -55% 0px' },
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  // Close menu on scroll
  useEffect(() => {
    const close = () => setMenuOpen(false)
    window.addEventListener('scroll', close, { passive: true })
    return () => window.removeEventListener('scroll', close)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-stone-50/90 dark:bg-stone-900/90 backdrop-blur-md shadow-warm-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
        {/* Logo */}
        <motion.a
          href="#hero"
          className="font-serif text-xl font-semibold text-stone-900 dark:text-white tracking-tight hover:text-gold transition-colors duration-200 cursor-pointer"
          onClick={() => setMenuOpen(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          D<span className="text-gold">4</span>VO
        </motion.a>

        {/* Desktop links — hidden on mobile */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-cursor="pointer"
                className={`relative font-sans text-sm tracking-wide transition-colors duration-200 cursor-pointer ${
                  activeSection === link.id
                    ? 'text-gold font-medium'
                    : 'text-stone-600 dark:text-stone-400 hover:text-gold'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-2 relative">
          <ThemeToggle />

          {/* Hamburger button — always visible */}
          <motion.button
            className="flex items-center justify-center w-9 h-9 text-stone-700 dark:text-stone-300 hover:text-gold transition-colors cursor-pointer relative z-[60]"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            data-cursor="pointer"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Popup dropdown menu */}
          <AnimatePresence>
            {menuOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[45]"
                  onClick={() => setMenuOpen(false)}
                />

                {/* Menu box */}
                <motion.div
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-full right-0 mt-3 w-64 z-[55] rounded-2xl bg-white/95 dark:bg-stone-800/95 backdrop-blur-xl border border-stone-200 dark:border-stone-700 shadow-warm-lg overflow-hidden"
                >
                  {/* Animated gold top bar */}
                  <motion.div
                    className="h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                  />

                  <div className="p-4 flex flex-col gap-1">
                    {links.map((link) => (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        variants={linkVariants}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-sm tracking-wide transition-all duration-200 cursor-pointer ${
                          activeSection === link.id
                            ? 'text-gold bg-gold/10 font-medium'
                            : 'text-stone-600 dark:text-stone-300 hover:text-gold hover:bg-gold/5'
                        }`}
                        whileHover={{ x: 4 }}
                      >
                        {activeSection === link.id && (
                          <motion.span
                            layoutId="menu-dot"
                            className="w-1.5 h-1.5 rounded-full bg-gold"
                          />
                        )}
                        {link.label}
                      </motion.a>
                    ))}
                  </div>

                  {/* Bottom accent */}
                  <div className="px-4 pb-4">
                    <motion.a
                      href="#contact"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-center w-full py-2.5 bg-gold hover:bg-gold-dark text-white text-sm font-medium rounded-xl transition-colors duration-200 cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Let&apos;s Talk
                    </motion.a>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  )
}
