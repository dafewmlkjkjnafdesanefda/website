'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'

// ── Theme Context ─────────────────────────────────────────────────────────────

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  toggle: () => void
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggle: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initial = stored ?? preferred
    setTheme(initial)
    document.documentElement.classList.toggle('dark', initial === 'dark')
  }, [])

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', next)
      document.documentElement.classList.toggle('dark', next === 'dark')
      return next
    })
  }, [])

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}

// ── Toast Context ─────────────────────────────────────────────────────────────

type ToastType = 'success' | 'error'

interface ToastMessage {
  id: string
  message: string
  type: ToastType
}

interface ToastContextValue {
  addToast: (message: string, type?: ToastType) => void
}

export const ToastContext = createContext<ToastContextValue>({
  addToast: () => {},
})

export function useToast() {
  return useContext(ToastContext)
}

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const addToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  )
}

// ── Toast Container ───────────────────────────────────────────────────────────

import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle, XCircle } from 'lucide-react'

function ToastContainer({ toasts }: { toasts: ToastMessage[] }) {
  return (
    <div className="fixed bottom-24 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 80, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-warm-lg pointer-events-auto
              ${toast.type === 'success'
                ? 'bg-white dark:bg-stone-800 border-l-4 border-gold'
                : 'bg-white dark:bg-stone-800 border-l-4 border-red-500'
              }`}
          >
            {toast.type === 'success'
              ? <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
              : <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            }
            <p className="font-sans text-sm text-stone-700 dark:text-stone-200">{toast.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// ── Global UI components (lazy — avoid SSR issues) ───────────────────────────

const ScrollProgress = dynamic(() => import('@/components/ui/ScrollProgress'), { ssr: false })
const CustomCursor   = dynamic(() => import('@/components/ui/CustomCursor'),   { ssr: false })
const BackToTop      = dynamic(() => import('@/components/ui/BackToTop'),      { ssr: false })

// ── Root Providers ────────────────────────────────────────────────────────────

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ScrollProgress />
        <CustomCursor />
        {children}
        <BackToTop />
      </ToastProvider>
    </ThemeProvider>
  )
}
