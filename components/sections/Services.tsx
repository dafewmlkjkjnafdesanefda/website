'use client'

import { Palette, Code2, LayoutTemplate } from 'lucide-react'
import FadeInSection from '@/components/ui/FadeInSection'
import ServiceCard from '@/components/ui/ServiceCard'

const services = [
  {
    Icon: Palette,
    title: 'Design',
    description:
      'Brand identity, UI/UX design, and design systems crafted with precision. From initial concept to polished, production-ready assets.',
    deliverables: [
      'Brand identity & logo system',
      'UI/UX wireframes & prototypes',
      'High-fidelity mockups',
      'Design system & component library',
      'Figma handoff & developer specs',
    ],
    priceRange: '$2,500',
  },
  {
    Icon: Code2,
    title: 'Development',
    description:
      'Full-stack web development using modern frameworks. Performant, accessible, and maintainable code that scales with your product.',
    deliverables: [
      'Next.js / React web application',
      'Responsive & accessible implementation',
      'API integration & backend setup',
      'Performance optimisation',
      'Deployment & CI/CD pipeline',
    ],
    priceRange: '$4,000',
  },
  {
    Icon: LayoutTemplate,
    title: 'Strategy',
    description:
      'Product strategy and creative direction that aligns design with business goals. Research-led, outcome-focused.',
    deliverables: [
      'User research & interviews',
      'Competitive analysis',
      'Product roadmap',
      'Information architecture',
      'Go-to-market design strategy',
    ],
    priceRange: '$1,800',
  },
]

export default function Services() {
  return (
    <section id="services" className="section-padding dark:bg-stone-900">
      <div className="max-w-6xl mx-auto">
        <FadeInSection className="mb-14 text-center">
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-gold mb-3">What I Do</p>
          <h2 className="section-title">
            <span className="gold-underline">Services</span>
          </h2>
          <p className="font-sans text-stone-500 dark:text-stone-400 max-w-xl mx-auto mt-4 leading-relaxed">
            End-to-end creative and technical capabilities, working solo or alongside your team.
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <FadeInSection key={service.title} delay={i * 0.1}>
              <ServiceCard {...service} />
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}
