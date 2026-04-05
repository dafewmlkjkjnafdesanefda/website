'use client'

import FadeInSection from '@/components/ui/FadeInSection'
import SkillBar from '@/components/ui/SkillBar'
import TiltCard from '@/components/ui/TiltCard'
import StatCounter from '@/components/ui/StatCounter'

const skills = [
  { label: 'UI/UX Design',    percentage: 95 },
  { label: 'Next.js',         percentage: 92 },
  { label: 'TypeScript',      percentage: 88 },
  { label: 'React',           percentage: 94 },
  { label: 'Tailwind CSS',    percentage: 90 },
  { label: 'Figma',           percentage: 85 },
  { label: 'Node.js',         percentage: 78 },
  { label: 'Motion Design',   percentage: 80 },
]

export default function About() {
  return (
    <section id="about" className="section-padding max-w-6xl mx-auto dark:bg-stone-900">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* 3D Tilt photo */}
        <FadeInSection>
          <TiltCard className="max-w-sm mx-auto md:mx-0">
            <div className="relative aspect-square w-full">
              <div className="w-full h-full rounded-3xl bg-gradient-to-br from-stone-200 via-stone-100 to-amber-50 dark:from-stone-700 dark:via-stone-800 dark:to-stone-700 shadow-warm-lg flex items-center justify-center">
                <span className="font-serif text-7xl font-semibold text-stone-300 dark:text-stone-500 select-none">AM</span>
              </div>
              {/* Gold accent corner */}
              <div
                aria-hidden
                className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl border-2 border-gold/30 -z-10"
              />
            </div>
          </TiltCard>
        </FadeInSection>

        {/* Bio */}
        <FadeInSection delay={0.1}>
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-gold mb-3">About Me</p>
          <h2 className="section-title mb-6">
            <span className="gold-underline">Passionate</span> about craft
          </h2>
          <p className="font-sans text-stone-500 dark:text-stone-400 leading-relaxed mb-4">
            I&apos;m a designer and developer with over 8 years of experience building digital products
            that balance aesthetic beauty with functional clarity. I believe great design is invisible —
            it simply works, and works beautifully.
          </p>
          <p className="font-sans text-stone-500 dark:text-stone-400 leading-relaxed mb-8">
            My work spans brand identity, interactive interfaces, and full-stack applications. I thrive
            at the intersection of design and engineering, where pixel precision meets performant code.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-6 py-8 border-y border-stone-200 dark:border-stone-700 mb-8">
            <StatCounter target={8}  suffix="+" label="Years Experience"   delay={0}   />
            <StatCounter target={50} suffix="+" label="Projects Delivered" delay={0.2} />
            <StatCounter target={20} suffix="+" label="Happy Clients"      delay={0.4} />
          </div>

          {/* Skill bars */}
          <div>
            {skills.map((skill, i) => (
              <SkillBar
                key={skill.label}
                label={skill.label}
                percentage={skill.percentage}
                delay={i * 0.08}
              />
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}
