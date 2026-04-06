'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github } from 'lucide-react'

export interface ProjectData {
  title: string
  description: string
  longDescription: string
  tags: string[]
  gradient: string
  screenshots: { gradient: string; label: string }[]
  demoUrl?: string
  githubUrl?: string
}

interface ProjectModalProps {
  project: ProjectData | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Escape to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  // Body scroll lock
  useEffect(() => {
    if (project) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [project])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-stone-950/80 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-[101] bg-white dark:bg-stone-900 rounded-3xl overflow-y-auto shadow-warm-lg"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              data-cursor="pointer"
              aria-label="Close modal"
              className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-400 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Hero image */}
            <div className={`w-full h-48 md:h-64 rounded-t-3xl ${project.gradient}`} />

            <div className="p-8 md:p-12">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-900 dark:text-white mb-4">
                {project.title}
              </h2>
              <p className="font-sans text-stone-500 dark:text-stone-400 leading-relaxed mb-8">
                {project.longDescription}
              </p>

              {/* Screenshots row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {project.screenshots.map((s) => (
                  <div key={s.label} className="rounded-xl overflow-hidden">
                    <div className={`aspect-[4/3] ${s.gradient}`} />
                    <p className="font-sans text-xs text-stone-400 dark:text-stone-500 text-center mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm font-sans font-medium px-3 py-1 rounded-full bg-gold/10 text-gold border border-gold/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    data-cursor="pointer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-gold-dark text-white font-sans text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    data-cursor="pointer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 hover:border-gold hover:text-gold font-sans text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer"
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
