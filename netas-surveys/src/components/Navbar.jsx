import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Coverage', href: '#process' },
  { label: 'Why NETAS', href: '#why' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(10,22,40,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(244,201,93,0.1)' : 'none',
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a href="#hero" onClick={() => handleNav('#hero')} className="flex items-center gap-3 no-underline">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg,rgba(27,58,102,.8),rgba(10,22,40,.9))',
                border: '1px solid rgba(244,201,93,.25)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,.15)',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4a437" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 17l4-8 4 6 3-4 4 6"/><path d="M2 20h20"/>
              </svg>
            </div>
            <div>
              <div className="font-display font-bold text-white text-lg leading-none tracking-wide">NETAS</div>
              <div className="font-mono-custom text-[10px] tracking-[.22em] uppercase text-amber-400 leading-none mt-0.5">Surveys</div>
            </div>
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className="relative px-4 py-2 text-sm font-medium text-[#8fa4c4] hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5 cursor-pointer border-none bg-transparent"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              onClick={() => handleNav('#contact')}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-amber-400 cursor-pointer"
              style={{ border: '1px solid rgba(244,201,93,.35)', background: 'transparent' }}
              whileHover={{ background: 'rgba(244,201,93,.1)', borderColor: 'rgba(244,201,93,.7)' }}
              transition={{ duration: 0.15 }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              24/7 Emergency
            </motion.button>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 text-[#8fa4c4] hover:text-white transition-colors cursor-pointer bg-transparent border-none"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 top-[72px] z-40 flex flex-col p-6 gap-2"
            style={{ background: 'rgba(5,11,26,.97)', backdropFilter: 'blur(24px)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {links.map((l, i) => (
              <motion.button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className="text-left text-lg font-medium text-[#8fa4c4] hover:text-white py-4 border-b border-white/5 transition-colors cursor-pointer bg-transparent border-none"
                style={{ borderBottom: '1px solid rgba(255,255,255,.05)' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                {l.label}
              </motion.button>
            ))}
            <motion.button
              onClick={() => handleNav('#contact')}
              className="mt-4 flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-amber-400 cursor-pointer bg-transparent"
              style={{ border: '1px solid rgba(244,201,93,.35)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <Phone size={16} /> Request a Survey
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
