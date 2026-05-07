import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const canvasRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 })

  // Wave canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let t = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const h = canvas.height
      const w = canvas.width

      for (let wave = 0; wave < 4; wave++) {
        const amp = 40 + wave * 12
        const freq = 0.003 + wave * 0.001
        const speed = 0.4 + wave * 0.15
        const yBase = h * 0.55 + wave * 40
        const alpha = 0.04 - wave * 0.007

        ctx.beginPath()
        ctx.moveTo(0, yBase)
        for (let x = 0; x <= w; x += 2) {
          const y = yBase + Math.sin(x * freq + t * speed) * amp
                         + Math.cos(x * freq * 1.3 + t * speed * 0.7) * (amp * 0.4)
          ctx.lineTo(x, y)
        }
        ctx.lineTo(w, h)
        ctx.lineTo(0, h)
        ctx.closePath()

        const grad = ctx.createLinearGradient(0, yBase - amp, 0, h)
        grad.addColorStop(0, `rgba(30,111,165,${alpha})`)
        grad.addColorStop(0.5, `rgba(212,164,55,${alpha * 0.5})`)
        grad.addColorStop(1, 'rgba(10,22,40,0)')
        ctx.fillStyle = grad
        ctx.fill()
      }

      t += 0.012
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 12)
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * -8)
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Canvas wave bg */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0.7 }} />

      {/* Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute rounded-full"
          style={{ width: 600, height: 600, top: '-10%', left: '50%', background: 'radial-gradient(circle,rgba(30,111,165,.15),transparent 70%)', filter: 'blur(60px)' }}
          animate={{ x: [0, 30, 0], y: [0, 40, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{ width: 350, height: 350, top: '50%', left: '70%', background: 'radial-gradient(circle,rgba(212,164,55,.1),transparent 70%)', filter: 'blur(60px)' }}
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        />
        {/* Grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(30,111,165,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(30,111,165,.04) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </div>

      {/* Parallax content */}
      <motion.div
        className="relative z-10 w-full"
        style={{ rotateX: springY, rotateY: springX, transformStyle: 'preserve-3d' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left */}
          <motion.div
            className="lg:col-span-7"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.span variants={fadeUp} className="font-mono-custom text-xs tracking-[.25em] uppercase text-amber-400 block mb-6">
              Est. 1993 — Klaipėda, Lithuania
            </motion.span>

            <motion.h1 variants={fadeUp} className="font-display font-bold leading-[1.05] tracking-tight text-white mb-3" style={{ fontSize: 'clamp(2.6rem,5.5vw,5rem)' }}>
              Marine surveys,<br />
              written for{' '}
              <span className="gold-gradient">underwriters.</span>
            </motion.h1>

            <motion.span variants={fadeUp} className="font-mono-custom text-xs text-[#8fa4c4] tracking-[.18em] block mb-5 opacity-70">
              55°42′N 21°07′E · Baltic Sea · 24/7
            </motion.span>

            <motion.p variants={fadeUp} className="text-[#8fa4c4] text-lg leading-relaxed max-w-xl mb-10">
              Independent cargo and vessel survey attendance across Lithuania, Latvia, and Estonia — factual reporting, delivered without allegiance, structured for insurers and claims professionals.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <motion.button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 px-7 py-4 rounded-lg font-semibold text-sm text-[#0a1628] cursor-pointer border-none"
                style={{ background: 'linear-gradient(135deg,#f4c95d,#d4a437)', boxShadow: '0 8px 24px -8px rgba(244,201,93,.55),inset 0 1px 0 rgba(255,255,255,.3)' }}
                whileHover={{ y: -2, boxShadow: '0 14px 32px -8px rgba(244,201,93,.65)' }}
                whileTap={{ y: 1 }}
                transition={{ duration: 0.15 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 12 19.79 19.79 0 011.61 3.41 2 2 0 013.6 1.22h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.91 8.91a16 16 0 006.17 6.17l.91-.91a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                Request a Survey
              </motion.button>
              <motion.button
                onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 px-7 py-4 rounded-lg font-semibold text-sm text-amber-400 cursor-pointer bg-transparent"
                style={{ border: '1px solid rgba(244,201,93,.35)' }}
                whileHover={{ background: 'rgba(244,201,93,.08)', borderColor: 'rgba(244,201,93,.7)', color: '#fff' }}
                transition={{ duration: 0.15 }}
              >
                Our Services <ArrowRight size={15} />
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="flex gap-10 mt-14 pt-10 flex-wrap" style={{ borderTop: '1px solid rgba(244,201,93,.1)' }}>
              {[
                { n: '30+', l: 'Years active' },
                { n: '3', l: 'Baltic states' },
                { n: '8', l: 'Service types' },
                { n: '24/7', l: 'Availability' },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display font-bold text-3xl text-amber-300 leading-none">{s.n}</div>
                  <div className="font-mono-custom text-[11px] text-[#8fa4c4] mt-1 tracking-wide uppercase">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — credential card (21st.dev glass card pattern) */}
          <motion.div
            className="lg:col-span-5 hidden lg:block"
            initial={{ opacity: 0, x: 40, rotateY: -8 }}
            animate={{ opacity: 1, x: 0, rotateY: -8 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
          >
            <div className="glass rounded-2xl p-7 relative overflow-hidden" style={{ transform: 'rotateY(-6deg) rotateX(3deg)', boxShadow: '0 30px 60px -20px rgba(0,0,0,.6),0 12px 24px -12px rgba(0,0,0,.4)' }}>
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg,rgba(255,255,255,.07),transparent 60%)', borderRadius: 'inherit' }} />

              <div className="flex items-center gap-3 mb-6 pb-5" style={{ borderBottom: '1px solid rgba(244,201,93,.15)' }}>
                <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ background: 'rgba(244,201,93,.1)', border: '1px solid rgba(244,201,93,.2)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4a437" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">NETAS Surveys</div>
                  <div className="font-mono-custom text-[10px] text-[#8fa4c4] tracking-wide">Klaipėdos NETAS UAB · Independent</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                {[['30+','Years Active'],['3','Baltic States'],['8','Service Types'],['24/7','Available']].map(([n,l]) => (
                  <div key={l} className="rounded-lg p-4" style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.06)' }}>
                    <div className="font-display font-bold text-2xl text-amber-300 leading-none">{n}</div>
                    <div className="text-[11px] text-[#8fa4c4] mt-1">{l}</div>
                  </div>
                ))}
              </div>

              <div className="font-mono-custom text-[10px] tracking-[.2em] uppercase text-[#8fa4c4] mb-3">Network Members</div>
              <div className="overflow-hidden relative">
                <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none" style={{ background: 'linear-gradient(90deg,rgba(15,32,56,.6),transparent)' }} />
                <div className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none" style={{ background: 'linear-gradient(-90deg,rgba(15,32,56,.6),transparent)' }} />
                <div className="flex gap-3 animate-[marquee_16s_linear_infinite] w-max">
                  {['CESAM','AIMU','WK Webster','DPS Surveys','TMN Surveys','CESAM','AIMU','WK Webster','DPS Surveys','TMN Surveys'].map((p, i) => (
                    <span key={i} className="font-mono-custom text-[10px] tracking-[.15em] uppercase text-[#8fa4c4] px-3 py-1 rounded whitespace-nowrap flex-shrink-0" style={{ border: '1px solid rgba(255,255,255,.08)' }}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Animated report badge */}
              <div className="mt-5 pt-4 flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,.06)' }}>
                <div className="font-mono-custom text-[10px] tracking-wide text-[#8fa4c4]">REF. NS-2024-1147</div>
                <span className="font-mono-custom text-[10px] tracking-[.12em] uppercase px-3 py-1 rounded-full" style={{ background: 'rgba(74,222,128,.1)', color: '#4ade80', border: '1px solid rgba(74,222,128,.25)' }}>
                  Report Issued
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={20} className="text-amber-400" />
        </motion.div>
        <span className="font-mono-custom text-[10px] tracking-[.2em] uppercase text-[#8fa4c4]">Scroll</span>
      </div>

      <style>{`
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
      `}</style>
    </section>
  )
}
