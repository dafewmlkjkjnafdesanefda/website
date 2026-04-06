'use client'

import { motion } from 'framer-motion'

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  gradient: string
  link?: string
  onClick?: () => void
}

export default function ProjectCard({ title, description, tags, gradient, onClick }: ProjectCardProps) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl shadow-warm-md cursor-pointer"
      onClick={onClick}
      data-cursor="pointer"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Image / Color placeholder */}
      <div className={`aspect-[4/3] w-full ${gradient} transition-transform duration-700 group-hover:scale-110`} />

      {/* Animated shine on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-stone-950/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
        <motion.h3
          initial={false}
          className="font-serif text-xl font-semibold text-white mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
        >
          {title}
        </motion.h3>
        <p className="text-stone-300 text-sm mb-3 line-clamp-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-sans font-medium px-2 py-0.5 rounded-full bg-gold/20 text-gold border border-gold/30"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="inline-flex items-center text-sm text-white font-medium hover:text-gold transition-colors duration-200 translate-y-4 group-hover:translate-y-0 delay-150">
          View Project →
        </span>
      </div>

      {/* Default title bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-stone-950/60 to-transparent group-hover:opacity-0 transition-opacity duration-300">
        <h3 className="font-serif text-lg font-medium text-white">{title}</h3>
      </div>
    </motion.div>
  )
}
