'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeInSection from '@/components/ui/FadeInSection'
import ProjectCard from '@/components/ui/ProjectCard'
import FilterChips from '@/components/ui/FilterChips'
import ProjectModal, { type ProjectData } from '@/components/ui/ProjectModal'

const filters = ['All', 'Next.js', 'React', 'Figma', 'Mobile']

const projects: (ProjectData & { tech: string; gradient: string })[] = [
  {
    title: 'Aurum Finance',
    description: 'A wealth management dashboard with real-time portfolio analytics.',
    longDescription:
      'Aurum Finance is a comprehensive wealth management platform featuring real-time portfolio tracking, interactive data visualizations built with D3.js, and AI-powered investment recommendations. The dashboard handles complex financial datasets while maintaining a clean, approachable UI.',
    tags: ['Next.js', 'TypeScript', 'D3.js'],
    tech: 'Next.js',
    gradient: 'bg-gradient-to-br from-amber-100 to-stone-200',
    screenshots: [
      { gradient: 'bg-gradient-to-br from-amber-200 to-amber-100', label: 'Dashboard' },
      { gradient: 'bg-gradient-to-br from-stone-200 to-amber-50', label: 'Portfolio View' },
      { gradient: 'bg-gradient-to-br from-amber-100 to-stone-100', label: 'Analytics' },
    ],
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Terroir Wine Co.',
    description: 'E-commerce experience for a boutique winery — brand identity and online store.',
    longDescription:
      'Complete brand identity and digital commerce solution for a boutique winery. Includes a custom Shopify theme, editorial content pages, a wine pairing guide, and a subscription service. The design system draws from wine label aesthetics with warm, rich tones.',
    tags: ['Shopify', 'Figma', 'Tailwind'],
    tech: 'Figma',
    gradient: 'bg-gradient-to-br from-rose-100 to-stone-100',
    screenshots: [
      { gradient: 'bg-gradient-to-br from-rose-200 to-rose-100', label: 'Homepage' },
      { gradient: 'bg-gradient-to-br from-stone-100 to-rose-50', label: 'Product Page' },
      { gradient: 'bg-gradient-to-br from-rose-100 to-stone-200', label: 'Brand Guide' },
    ],
    demoUrl: '#',
  },
  {
    title: 'Halcyon Studio',
    description: 'Portfolio and booking platform for an architecture firm with immersive project galleries.',
    longDescription:
      'A digital home for an architecture studio, featuring full-screen project galleries, a Sanity CMS-powered editorial section, and an integrated appointment booking system. Built with Next.js and Framer Motion for buttery smooth page transitions.',
    tags: ['Next.js', 'Framer Motion', 'Sanity'],
    tech: 'Next.js',
    gradient: 'bg-gradient-to-br from-stone-200 to-slate-200',
    screenshots: [
      { gradient: 'bg-gradient-to-br from-slate-200 to-stone-100', label: 'Hero' },
      { gradient: 'bg-gradient-to-br from-stone-200 to-slate-300', label: 'Project Gallery' },
      { gradient: 'bg-gradient-to-br from-slate-100 to-stone-200', label: 'Contact' },
    ],
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Ember Recipe App',
    description: 'A minimalist recipe discovery app with curated collections and smart pantry tracking.',
    longDescription:
      'Ember is a mobile-first recipe application with a curated library of 500+ recipes, smart pantry management, and a meal planning calendar. Built with React Native and Expo, it features offline support, push notifications for meal reminders, and social sharing.',
    tags: ['React Native', 'Supabase', 'Expo'],
    tech: 'Mobile',
    gradient: 'bg-gradient-to-br from-orange-100 to-amber-50',
    screenshots: [
      { gradient: 'bg-gradient-to-br from-orange-200 to-orange-100', label: 'Recipe Feed' },
      { gradient: 'bg-gradient-to-br from-amber-100 to-orange-50', label: 'Recipe Detail' },
      { gradient: 'bg-gradient-to-br from-orange-50 to-amber-100', label: 'Pantry' },
    ],
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Ode Editorial',
    description: 'Digital magazine platform with long-form storytelling and rich media.',
    longDescription:
      'Ode is a premium digital magazine built for long-form editorial content. Features include a custom MDX rendering pipeline, interactive article timelines, audio reading mode, and a subscriber-only content gate. Typography and reading experience were the primary design focus.',
    tags: ['Next.js', 'MDX', 'Contentful'],
    tech: 'Next.js',
    gradient: 'bg-gradient-to-br from-stone-100 to-zinc-200',
    screenshots: [
      { gradient: 'bg-gradient-to-br from-zinc-200 to-stone-100', label: 'Cover' },
      { gradient: 'bg-gradient-to-br from-stone-200 to-zinc-100', label: 'Article' },
      { gradient: 'bg-gradient-to-br from-zinc-100 to-stone-200', label: 'Archive' },
    ],
    demoUrl: '#',
  },
  {
    title: 'Petal Design System',
    description: 'A comprehensive React component library used across three product lines.',
    longDescription:
      'Petal is an open-source design system built with React, Radix UI primitives, and Tailwind CSS. It includes 80+ accessible components, a Storybook documentation site, automated visual regression tests, and a Figma component library synced via a custom plugin.',
    tags: ['React', 'Storybook', 'Radix UI'],
    tech: 'React',
    gradient: 'bg-gradient-to-br from-pink-100 to-stone-100',
    screenshots: [
      { gradient: 'bg-gradient-to-br from-pink-200 to-pink-100', label: 'Components' },
      { gradient: 'bg-gradient-to-br from-stone-100 to-pink-50', label: 'Docs' },
      { gradient: 'bg-gradient-to-br from-pink-100 to-stone-200', label: 'Figma Kit' },
    ],
    githubUrl: '#',
  },
]

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.tech === activeFilter)

  return (
    <section id="work" className="section-padding bg-stone-100/60 dark:bg-stone-900/80">
      <div className="max-w-6xl mx-auto">
        <FadeInSection className="mb-10 text-center">
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-gold mb-3">Selected Work</p>
          <h2 className="section-title">
            <span className="gold-underline">Recent</span> projects
          </h2>
          <p className="font-sans text-stone-500 dark:text-stone-400 max-w-xl mx-auto mt-4 leading-relaxed">
            A curated selection of work spanning product design, engineering, and brand.
          </p>
        </FadeInSection>

        <FilterChips filters={filters} active={activeFilter} onChange={setActiveFilter} />

        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectCard
                  {...project}
                  onClick={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center font-sans text-stone-400 py-12"
          >
            No projects match this filter.
          </motion.p>
        )}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
