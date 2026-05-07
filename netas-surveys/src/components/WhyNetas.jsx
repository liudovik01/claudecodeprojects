import { motion } from 'framer-motion'

const pillars = [
  { n: '01', title: 'Independence', desc: 'We operate without allegiance to any carrier, insurer, or trading party. Our attendance and reporting remain strictly impartial — providing all parties with a reliable factual record.' },
  { n: '02', title: 'Insurance-Oriented Reporting', desc: 'Our reports are structured with underwriters and claims professionals in mind — covering the information they need, in a format that supports efficient claims handling.' },
  { n: '03', title: 'Clarity & Practicality', desc: 'We focus on relevant facts. Reports are written to be clear, concise, and actionable — without unnecessary complexity that slows down claims resolution.' },
  { n: '04', title: 'Around-the-Clock Availability', desc: 'Marine incidents do not follow office hours. We remain available 24 hours a day, 7 days a week, to respond to urgent survey assignments throughout the Baltic region.' },
]

export default function WhyNetas() {
  return (
    <section id="why" className="py-24" style={{ background: '#050b1a' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <motion.span className="font-mono-custom text-[11px] tracking-[.25em] uppercase text-amber-400 block mb-4"
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            (06) — Why NETAS
          </motion.span>
          <motion.h2 className="font-display font-bold text-white leading-tight" style={{ fontSize: 'clamp(1.75rem,3vw,2.75rem)' }}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}>
            Built on independence<br />and integrity.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={p.n}
              className="glass rounded-2xl p-8 relative overflow-hidden"
              style={{ transform: i % 2 === 0 ? 'rotateY(-2deg)' : 'rotateY(2deg)' }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ borderColor: 'rgba(244,201,93,.25)' }}
            >
              <div
                className="absolute top-5 right-6 font-display font-bold leading-none select-none pointer-events-none"
                style={{ fontSize: '5rem', color: 'rgba(212,164,55,.08)' }}
              >
                {p.n}
              </div>
              <div className="font-semibold text-white text-lg mb-3 relative z-10">{p.title}</div>
              <div className="text-[#8fa4c4] leading-relaxed relative z-10">{p.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
