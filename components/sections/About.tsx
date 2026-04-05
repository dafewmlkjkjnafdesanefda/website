import FadeInSection from '@/components/ui/FadeInSection'
import SkillChip from '@/components/ui/SkillChip'

const skills = [
  'UI/UX Design', 'Next.js', 'TypeScript', 'Tailwind CSS',
  'Figma', 'React', 'Node.js', 'Motion Design',
  'Design Systems', 'Accessibility',
]

export default function About() {
  return (
    <section id="about" className="section-padding max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Photo placeholder */}
        <FadeInSection>
          <div className="relative aspect-square max-w-sm mx-auto md:mx-0">
            <div className="w-full h-full rounded-3xl bg-gradient-to-br from-stone-200 via-stone-100 to-amber-50 shadow-warm-lg flex items-center justify-center">
              <span className="font-serif text-7xl font-semibold text-stone-300 select-none">AM</span>
            </div>
            {/* Gold accent corner */}
            <div
              aria-hidden
              className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl border-2 border-gold/30 -z-10"
            />
          </div>
        </FadeInSection>

        {/* Bio */}
        <FadeInSection delay={0.1}>
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-gold mb-3">About Me</p>
          <h2 className="section-title mb-6">
            <span className="gold-underline">Passionate</span> about craft
          </h2>
          <p className="font-sans text-stone-500 leading-relaxed mb-4">
            I&apos;m a designer and developer with over 8 years of experience building digital products
            that balance aesthetic beauty with functional clarity. I believe great design is invisible —
            it simply works, and works beautifully.
          </p>
          <p className="font-sans text-stone-500 leading-relaxed mb-8">
            My work spans brand identity, interactive interfaces, and full-stack applications. I thrive
            at the intersection of design and engineering, where pixel precision meets performant code.
          </p>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <SkillChip key={skill} label={skill} />
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}
