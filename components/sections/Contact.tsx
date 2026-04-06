'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Twitter, Check } from 'lucide-react'
import FadeInSection from '@/components/ui/FadeInSection'
import ParticleField from '@/components/ui/ParticleField'
import { useToast } from '@/app/providers'

const socials = [
  { Icon: Github,   href: '#', label: 'GitHub'   },
  { Icon: Linkedin, href: '#', label: 'LinkedIn'  },
  { Icon: Twitter,  href: '#', label: 'Twitter'   },
]

interface FormData { name: string; email: string; message: string }
interface FormErrors { name?: string; email?: string; message?: string }

function validate(data: FormData): FormErrors {
  const errs: FormErrors = {}
  if (!data.name.trim()) errs.name = 'Name is required'
  if (!data.email.trim()) errs.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = 'Enter a valid email'
  if (!data.message.trim()) errs.message = 'Message is required'
  else if (data.message.trim().length < 10) errs.message = 'Message must be at least 10 characters'
  return errs
}

export default function Contact() {
  const { addToast } = useToast()
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' })
  const [errors, setErrors]     = useState<FormErrors>({})
  const [status, setStatus]     = useState<'idle' | 'submitting' | 'success'>('idle')

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(formData)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStatus('submitting')
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setStatus('success')
    addToast("Message sent! I'll be in touch soon.", 'success')
  }

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3 bg-stone-800 border rounded-xl text-white placeholder-stone-500 font-sans text-sm focus:outline-none transition-colors duration-200 ${
      errors[field] ? 'border-red-500' : 'border-stone-700 focus:border-gold'
    }`

  return (
    <section id="contact" className="section-padding bg-stone-900 relative overflow-hidden">
      <ParticleField className="absolute inset-0" />
      <div className="max-w-2xl mx-auto text-center">
        <FadeInSection>
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-gold mb-3">Get In Touch</p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-4">
            Let&apos;s work together
          </h2>
          <p className="font-sans text-stone-400 leading-relaxed mb-10">
            Have a project in mind? I&apos;d love to hear about it. Send me a message and I&apos;ll get back to you as soon as possible.
          </p>

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
                  className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center"
                >
                  <Check className="w-8 h-8 text-gold" />
                </motion.div>
                <h3 className="font-serif text-2xl text-white">Message Sent!</h3>
                <p className="font-sans text-stone-400 text-center max-w-sm">
                  Thank you for reaching out. I&apos;ll respond within 1–2 business days.
                </p>
                <button
                  onClick={() => { setStatus('idle'); setFormData({ name: '', email: '', message: '' }) }}
                  className="font-sans text-sm text-gold underline underline-offset-2 cursor-pointer"
                  data-cursor="pointer"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 text-left mb-10"
                noValidate
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="font-sans text-xs text-stone-400 tracking-wide">Name</label>
                    <input
                      id="name" name="name" type="text" required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange('name')}
                      className={inputClass('name')}
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                          className="font-sans text-xs text-red-400">{errors.name}</motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="font-sans text-xs text-stone-400 tracking-wide">Email</label>
                    <input
                      id="email" name="email" type="email" required
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange('email')}
                      className={inputClass('email')}
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                          className="font-sans text-xs text-red-400">{errors.email}</motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="font-sans text-xs text-stone-400 tracking-wide">Message</label>
                  <textarea
                    id="message" name="message" required rows={5}
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={handleChange('message')}
                    className={`${inputClass('message')} resize-none`}
                  />
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="font-sans text-xs text-red-400">{errors.message}</motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  data-cursor="pointer"
                  className="w-full py-3.5 bg-gold hover:bg-gold-dark disabled:opacity-60 text-white font-sans font-medium text-sm rounded-xl shadow-warm-md transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block"
                      />
                      Sending…
                    </>
                  ) : 'Send Message'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Social links */}
          <div className="flex items-center justify-center gap-6">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                data-cursor="pointer"
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
