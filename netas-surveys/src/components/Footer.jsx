import { motion } from 'framer-motion'

const cols = [
  { title: 'Services', links: ['Cargo Damage','Cargo Condition','Vessel Surveys','Claims Adjusting','Reefer & Temperature','Draft & Bunker','Hatch Cover Testing'] },
  { title: 'Company', links: ['About','Coverage','Process','Why NETAS','Contact'] },
  { title: 'Coverage', links: ['Lithuania','Latvia','Estonia','Worldwide (partners)'] },
]

export default function Footer() {
  const scroll = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer style={{ background: '#050b1a', borderTop: '1px solid rgba(244,201,93,.1)' }}>
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          <div>
            <div className="font-display font-bold text-white text-xl leading-none mb-1">NETAS Surveys</div>
            <div className="font-mono-custom text-[10px] tracking-[.2em] uppercase text-amber-400 mb-4">Klaipėdos NETAS UAB</div>
            <p className="text-[#8fa4c4] text-sm leading-relaxed max-w-[240px]">
              Independent Marine & Cargo Surveyors serving the Baltic region and beyond since 1993.
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <div className="font-mono-custom text-[10px] tracking-[.2em] uppercase text-[#8fa4c4] mb-4">{col.title}</div>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <button
                      onClick={() => scroll('#' + (l === 'About' ? 'about' : l === 'Contact' ? 'contact' : l === 'Why NETAS' ? 'why' : 'services'))}
                      className="text-sm text-[#8fa4c4] hover:text-amber-300 transition-colors cursor-pointer bg-transparent border-none text-left"
                    >
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Partners strip */}
        <div className="flex flex-wrap gap-3 mb-10 pb-10" style={{ borderBottom: '1px solid rgba(255,255,255,.06)' }}>
          <span className="font-mono-custom text-[10px] tracking-[.2em] uppercase text-[#8fa4c4] mr-2 self-center">Members</span>
          {['DPS Surveys','TMN Surveys','WK Webster','CESAM','AIMU'].map((p) => (
            <span key={p} className="font-mono-custom text-[11px] tracking-[.12em] px-3 py-1 rounded" style={{ border: '1px solid rgba(255,255,255,.07)', color: 'rgba(143,164,196,.6)' }}>
              {p}
            </span>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-3 text-[#8fa4c4] text-xs" style={{ opacity: 0.6 }}>
          <span>&copy; 2026 netassurveys.com — All rights reserved</span>
          <span>Klaipėdos NETAS UAB — Independent Marine Surveyors</span>
        </div>
      </div>
    </footer>
  )
}
