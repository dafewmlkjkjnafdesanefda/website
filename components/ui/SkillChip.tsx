interface SkillChipProps {
  label: string
}

export default function SkillChip({ label }: SkillChipProps) {
  return (
    <span className="inline-block px-3 py-1 text-xs font-sans font-medium tracking-wide text-stone-700 bg-stone-100 border border-stone-200 rounded-full">
      {label}
    </span>
  )
}
