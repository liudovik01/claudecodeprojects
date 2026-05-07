import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function About() {
  return (
    <section id="about" className="py-24" style={{ background: '#050b1a' }}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Text */}
        <div>
          <motion.span {...fadeUp(0)} className="font-mono-custom text-[11px] tracking-[.25em] uppercase text-amber-400 block mb-4">
            (02) — Since 1993
          </motion.span>
          <motion.h2 {...fadeUp(0.08)} className="font-display font-bold text-white leading-tight mb-6" style={{ fontSize: 'clamp(1.75rem,3vw,2.75rem)' }}>
            Over three decades of independent expertise.
          </motion.h2>
          <div className="space-y-4">
            {[
              'NETAS Surveys is the trading name of Klaipėdos NETAS UAB, an independent marine and cargo surveying company operating from Lithuania since 1993.',
              'Our primary coverage spans Lithuania, Latvia, and Estonia — extended worldwide through a trusted network of partner organisations including DPS Surveys, TMN Surveys, WK Webster, CESAM, and AIMU.',
              'Our approach is structured around the needs of underwriters, claims professionals, and cargo interests who require prompt, accurate, and actionable survey reports — without allegiance to any carrier or trading party.',
            ].map((p, i) => (
              <motion.p key={i} {...fadeUp(0.1 + i * 0.08)} className="text-[#8fa4c4] leading-relaxed">
                {p}
              </motion.p>
            ))}
          </div>

          <motion.blockquote
            {...fadeUp(0.35)}
            className="mt-8 pl-5 italic text-[#e8eef7] text-sm leading-relaxed"
            style={{ borderLeft: '2px solid #d4a437', background: 'rgba(244,201,93,.04)', padding: '1rem 1.25rem', borderRadius: '0 8px 8px 0' }}
          >
            "Independent attendance and factual reporting — delivered with speed, clarity, and around-the-clock availability."
          </motion.blockquote>

          <motion.div {...fadeUp(0.4)} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            {[['1993','Year est.'],['3','Baltic states'],['5','Partners'],['24/7','Available']].map(([n, l]) => (
              <div key={l} className="p-4 rounded-xl" style={{ background: 'rgba(20,42,74,.5)', border: '1px solid rgba(255,255,255,.06)' }}>
                <div className="font-display font-bold text-2xl text-amber-300 leading-none">{n}</div>
                <div className="text-[11px] text-[#8fa4c4] mt-1 tracking-wide">{l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stacked 3D report cards (21st.dev glass card pattern) */}
        <motion.div
          className="relative hidden lg:block"
          style={{ height: 340, perspective: 1200 }}
          initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
        >
          {[
            { z: 0, y: 0, rot: '-3deg', opacity: 1 },
            { z: -40, y: 28, rot: '-3deg', opacity: 0.65 },
            { z: -80, y: 56, rot: '-3deg', opacity: 0.35 },
          ].map((s, i) => (
            <div
              key={i}
              className="absolute inset-0 glass rounded-2xl p-7"
              style={{
                transform: `translateZ(${s.z}px) translateY(${s.y}px) rotateY(${s.rot})`,
                opacity: s.opacity,
                transformStyle: 'preserve-3d',
                boxShadow: '0 30px 60px -20px rgba(0,0,0,.6)',
              }}
            >
              {i === 0 && (
                <>
                  <div className="flex items-center justify-between mb-6 pb-4" style={{ borderBottom: '1px solid rgba(244,201,93,.15)' }}>
                    <span className="font-display font-bold text-white text-base">NETAS Surveys</span>
                    <span className="font-mono-custom text-[10px] text-[#8fa4c4] tracking-wide">REF. NS-2024-1147</span>
                  </div>
                  {[['Survey Type','Cargo Damage Survey'],['Port','Klaipėda, Lithuania'],['Surveyor','NETAS Surveys — Independent'],['Date','12 November 2024']].map(([label, val]) => (
                    <div key={label} className="mb-4">
                      <span className="font-mono-custom text-[10px] tracking-[.2em] uppercase text-amber-400 block mb-1">{label}</span>
                      <span className="text-sm text-[#e8eef7]">{val}</span>
                    </div>
                  ))}
                  <span className="inline-block font-mono-custom text-[10px] tracking-[.12em] uppercase px-3 py-1 rounded-full mt-2" style={{ background: 'rgba(74,222,128,.1)', color: '#4ade80', border: '1px solid rgba(74,222,128,.25)' }}>
                    Report Issued
                  </span>
                </>
              )}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
