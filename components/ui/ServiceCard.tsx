import { LucideIcon } from 'lucide-react'

interface ServiceCardProps {
  Icon: LucideIcon
  title: string
  description: string
}

export default function ServiceCard({ Icon, title, description }: ServiceCardProps) {
  return (
    <div className="group flex flex-col gap-4 p-8 bg-white border border-stone-200 rounded-2xl shadow-warm-sm hover:shadow-warm-md transition-shadow duration-300 cursor-default">
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-stone-50 border border-stone-200 group-hover:bg-gold/10 group-hover:border-gold/30 transition-colors duration-300">
        <Icon className="w-6 h-6 text-stone-600 group-hover:text-gold transition-colors duration-300" strokeWidth={1.5} />
      </div>
      <div>
        <h3 className="font-serif text-xl font-semibold text-stone-900 mb-2">{title}</h3>
        <p className="font-sans text-sm text-stone-500 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
