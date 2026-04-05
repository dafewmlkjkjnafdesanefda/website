'use client'

import { Github, Linkedin, Twitter } from 'lucide-react'
import FadeInSection from '@/components/ui/FadeInSection'

const socials = [
  { Icon: Github,   href: '#', label: 'GitHub'   },
  { Icon: Linkedin, href: '#', label: 'LinkedIn'  },
  { Icon: Twitter,  href: '#', label: 'Twitter'   },
]

export default function Contact() {
  return (
    <section id="contact" className="section-padding bg-stone-900">
      <div className="max-w-2xl mx-auto text-center">
        <FadeInSection>
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-gold mb-3">Get In Touch</p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-4">
            Let&apos;s work together
          </h2>
          <p className="font-sans text-stone-400 leading-relaxed mb-10">
            Have a project in mind? I&apos;d love to hear about it. Send me a message and I&apos;ll get back to you as soon as possible.
          </p>

          <form
            action="mailto:hello@alexmorgan.design"
            method="post"
            encType="text/plain"
            className="flex flex-col gap-4 text-left mb-10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="font-sans text-xs text-stone-400 tracking-wide">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="px-4 py-3 bg-stone-800 border border-stone-700 rounded-xl text-white placeholder-stone-500 font-sans text-sm focus:outline-none focus:border-gold transition-colors duration-200"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="font-sans text-xs text-stone-400 tracking-wide">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="px-4 py-3 bg-stone-800 border border-stone-700 rounded-xl text-white placeholder-stone-500 font-sans text-sm focus:outline-none focus:border-gold transition-colors duration-200"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="font-sans text-xs text-stone-400 tracking-wide">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell me about your project..."
                className="px-4 py-3 bg-stone-800 border border-stone-700 rounded-xl text-white placeholder-stone-500 font-sans text-sm focus:outline-none focus:border-gold transition-colors duration-200 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-gold hover:bg-gold-dark text-white font-sans font-medium text-sm rounded-xl shadow-warm-md transition-colors duration-200 cursor-pointer"
            >
              Send Message
            </button>
          </form>

          {/* Social links */}
          <div className="flex items-center justify-center gap-6">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-stone-500 hover:text-gold transition-colors duration-200 cursor-pointer"
              >
                <Icon className="w-5 h-5" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}
