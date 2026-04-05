import FadeInSection from '@/components/ui/FadeInSection'
import ProjectCard from '@/components/ui/ProjectCard'

const projects = [
  {
    title: 'Aurum Finance',
    description: 'A wealth management dashboard with real-time portfolio analytics and premium data visualizations.',
    tags: ['Next.js', 'TypeScript', 'D3.js'],
    gradient: 'bg-gradient-to-br from-amber-100 to-stone-200',
  },
  {
    title: 'Terroir Wine Co.',
    description: 'E-commerce experience for a boutique winery — brand identity, online store, and editorial content.',
    tags: ['Shopify', 'Figma', 'Tailwind'],
    gradient: 'bg-gradient-to-br from-rose-100 to-stone-100',
  },
  {
    title: 'Halcyon Studio',
    description: 'Portfolio and booking platform for an architecture firm with immersive project galleries.',
    tags: ['Next.js', 'Framer Motion', 'Sanity'],
    gradient: 'bg-gradient-to-br from-stone-200 to-slate-200',
  },
  {
    title: 'Ember Recipe App',
    description: 'A minimalist recipe discovery app with curated collections and smart pantry tracking.',
    tags: ['React Native', 'Supabase', 'Expo'],
    gradient: 'bg-gradient-to-br from-orange-100 to-amber-50',
  },
  {
    title: 'Ode Editorial',
    description: 'Digital magazine platform with long-form storytelling, custom typography, and rich media.',
    tags: ['Next.js', 'MDX', 'Contentful'],
    gradient: 'bg-gradient-to-br from-stone-100 to-zinc-200',
  },
  {
    title: 'Petal Design System',
    description: 'A comprehensive design system and React component library used across three product lines.',
    tags: ['React', 'Storybook', 'Radix UI'],
    gradient: 'bg-gradient-to-br from-pink-100 to-stone-100',
  },
]

export default function Work() {
  return (
    <section id="work" className="section-padding bg-stone-100/60">
      <div className="max-w-6xl mx-auto">
        <FadeInSection className="mb-14 text-center">
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-gold mb-3">Selected Work</p>
          <h2 className="section-title">
            <span className="gold-underline">Recent</span> projects
          </h2>
          <p className="font-sans text-stone-500 max-w-xl mx-auto mt-4 leading-relaxed">
            A curated selection of work spanning product design, engineering, and brand.
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <FadeInSection key={project.title} delay={i * 0.07}>
              <ProjectCard {...project} />
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}
