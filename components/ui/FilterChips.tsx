'use client'

interface FilterChipsProps {
  filters: string[]
  active: string
  onChange: (filter: string) => void
}

export default function FilterChips({ filters, active, onChange }: FilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-10">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          data-cursor="pointer"
          className={`px-4 py-1.5 rounded-full font-sans text-sm font-medium border transition-all duration-200 cursor-pointer ${
            active === filter
              ? 'bg-gold text-white border-gold shadow-warm-sm'
              : 'bg-transparent text-stone-600 dark:text-stone-400 border-stone-300 dark:border-stone-600 hover:border-gold hover:text-gold'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}
