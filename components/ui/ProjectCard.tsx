interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  gradient: string
  link?: string
}

export default function ProjectCard({ title, description, tags, gradient, link = '#' }: ProjectCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-warm-md cursor-pointer">
      {/* Image / Color placeholder */}
      <div className={`aspect-[4/3] w-full ${gradient}`} />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-stone-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <h3 className="font-serif text-xl font-semibold text-white mb-1">{title}</h3>
        <p className="text-stone-300 text-sm mb-3 line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-sans font-medium px-2 py-0.5 rounded-full bg-gold/20 text-gold border border-gold/30"
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href={link}
          className="inline-flex items-center text-sm text-white font-medium hover:text-gold transition-colors duration-200"
        >
          View Project →
        </a>
      </div>

      {/* Default title bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-stone-950/60 to-transparent group-hover:opacity-0 transition-opacity duration-300">
        <h3 className="font-serif text-lg font-medium text-white">{title}</h3>
      </div>
    </div>
  )
}
