import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Package, ClipboardCheck, Ship, FileText, Thermometer, BarChart2, Users, Radio, ArrowRight } from 'lucide-react'

const services = [
  { num: '01', icon: Package, name: 'Cargo Damage Surveys', desc: 'Survey attendance for visible damage, transport damage, handling incidents and cargo loss situations requiring independent inspection.' },
  { num: '02', icon: ClipboardCheck, name: 'Cargo Condition Surveys', desc: 'Independent condition verification for cargo at a particular stage of handling or transport — a factual record of cargo state.' },
  { num: '03', icon: Ship, name: 'Vessel Surveys', desc: 'Vessel-related attendance across the Baltic region — loading, discharge, condition, damage and other marine matters.' },
  { num: '04', icon: FileText, name: 'Claims Adjusting', desc: 'Claims adjusting support for cargo, marine, and transport matters — factual review, documentation and structured reporting.' },
  { num: '05', icon: Thermometer, name: 'Reefer & Temperature', desc: 'Survey attendance for reefer cargo, temperature-sensitive shipments, and cold-chain transport matters across the Baltics.' },
  { num: '06', icon: BarChart2, name: 'Draft, Bunker & Quantity', desc: 'Quantity-related survey support covering draft surveys, bunker matters and other quantity-related assignments.' },
  { num: '07', icon: Users, name: 'Joint Surveys & Expert Attendance', desc: 'Attendance for joint surveys and coordinated inspections where multiple parties require independent representation.' },
  { num: '08', icon: Radio, name: 'Hatch Cover Ultrasonic Testing', desc: 'Specialised attendance for hatch cover ultrasonic testing to verify watertight integrity.' },
]

function ServiceCard({ svc, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [shine, setShine] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)
  const Icon = svc.icon

  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    setTilt({ x: (y - 0.5) * -10, y: (x - 0.5) * 10 })
    setShine({ x: x * 100, y: y * 100 })
  }

  return (
    <motion.div
      className="relative p-7 cursor-default overflow-hidden"
      style={{
        background: hovered ? '#0f2038' : '#0a1628',
        transition: 'background 0.2s',
        transform: hovered ? `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(4px)` : 'none',
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }) }}
    >
      {/* Gold top line */}
      <motion.div
        className="absolute top-0 left-7 right-7 h-[2px]"
        style={{ background: 'linear-gradient(90deg,transparent,#d4a437,transparent)', transformOrigin: 'left' }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Specular shine (21st.dev glass card pattern) */}
      <div
        className="absolute inset-0 pointer-events-none rounded-none"
        style={{
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,.06), transparent 60%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.2s',
        }}
      />

      <span className="font-mono-custom text-[10px] tracking-[.2em] text-amber-400 block mb-4">{svc.num}</span>
      <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ background: hovered ? 'rgba(244,201,93,.15)' : 'rgba(244,201,93,.07)', transition: 'background .2s' }}>
        <Icon size={20} strokeWidth={1.5} color="#d4a437" />
      </div>
      <div className="font-semibold text-white text-[0.9375rem] leading-snug mb-2">{svc.name}</div>
      <div className="text-[#8fa4c4] text-sm leading-relaxed">{svc.desc}</div>
      <motion.div
        className="flex items-center gap-1 mt-4 text-amber-400 text-xs font-semibold cursor-pointer"
        animate={{ gap: hovered ? '8px' : '4px' }}
      >
        Instruct survey <ArrowRight size={12} />
      </motion.div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" className="py-24" style={{ background: '#0f2038' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <motion.span
              className="font-mono-custom text-[11px] tracking-[.25em] uppercase text-amber-400 block mb-4"
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            >
              (01) — Services
            </motion.span>
            <motion.h2
              className="font-display font-bold text-white leading-tight"
              style={{ fontSize: 'clamp(1.75rem,3vw,2.75rem)' }}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}
            >
              What we survey.
            </motion.h2>
          </div>
          <motion.p
            className="text-[#8fa4c4] text-base leading-relaxed max-w-sm"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
          >
            Eight specialist service areas covering the full scope of marine, cargo, and transport survey requirements.
          </motion.p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ gap: '1px', background: 'rgba(244,201,93,.08)', border: '1px solid rgba(244,201,93,.08)', borderRadius: '16px', overflow: 'hidden' }}
        >
          {services.map((svc, i) => (
            <ServiceCard key={svc.num} svc={svc} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
