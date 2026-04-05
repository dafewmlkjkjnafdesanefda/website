'use client'

import { useState, useEffect } from 'react'

const links = [
  { label: 'About',    href: '#about'    },
  { label: 'Work',     href: '#work'     },
  { label: 'Services', href: '#services' },
  { label: 'Contact',  href: '#contact'  },
]

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-stone-50/90 backdrop-blur-sm shadow-warm-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
        <a
          href="#hero"
          className="font-serif text-xl font-semibold text-stone-900 tracking-tight hover:text-gold transition-colors duration-200 cursor-pointer"
        >
          AM
        </a>
        <ul className="flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-sm text-stone-600 hover:text-gold transition-colors duration-200 cursor-pointer tracking-wide"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
