import { motion } from 'framer-motion'

const steps = [
  { n: '1', name: 'Request', desc: 'Contact us with assignment details — port, cargo type, and nature of the matter. We respond promptly around the clock.' },
  { n: '2', name: 'Attend', desc: 'Our surveyor attends the location, preserving evidence and documenting the situation from the outset.' },
  { n: '3', name: 'Investigate', desc: 'Thorough independent investigation with photographs, measurements, and witness engagement as appropriate.' },
  { n: '4', name: 'Report', desc: 'A clear, factual survey report — structured for insurers and claims professionals — is delivered promptly.' },
]

export default function Process() {
  return (
    <section id="process" className="py-24" style={{ background: '#050b1a' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <motion.span className="font-mono-custom text-[11px] tracking-[.25em] uppercase text-amber-400 block mb-4"
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            (04) — Process
          </motion.span>
          <motion.h2 className="font-display font-bold text-white leading-tight" style={{ fontSize: 'clamp(1.75rem,3vw,2.75rem)' }}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}>
            How an engagement works.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-[27px] left-[calc(12.5%+27px)] right-[calc(12.5%+27px)] h-px" style={{ background: 'linear-gradient(90deg,#d4a437,rgba(244,201,93,.2),#d4a437)', zIndex: 0 }} />

          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              className="flex flex-col items-center text-center px-4"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center font-display font-bold text-xl text-amber-400 mb-6 relative z-10 flex-shrink-0"
                style={{
                  background: '#0f2038',
                  border: '1px solid #d4a437',
                  boxShadow: '0 0 20px rgba(212,164,55,.2)',
                }}
              >
                {s.n}
              </div>
              <div className="font-semibold text-white text-base mb-3">{s.name}</div>
              <div className="text-[#8fa4c4] text-sm leading-relaxed">{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
