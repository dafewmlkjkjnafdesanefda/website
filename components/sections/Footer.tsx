export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-stone-950 py-8 px-6 text-center">
      <p className="font-sans text-xs text-stone-600 tracking-wide">
        © {year} D4VO. Crafted with obsession.
      </p>
    </footer>
  )
}
