import NavBar from '@/components/ui/NavBar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Work from '@/components/sections/Work'
import Services from '@/components/sections/Services'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <NavBar />
      <Hero />
      <About />
      <Work />
      <Services />
      <Contact />
      <Footer />
    </main>
  )
}
