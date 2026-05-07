import { motion } from 'framer-motion'
import { Shield, Clock, Truck, FileText } from 'lucide-react'

const clients = [
  { icon: Shield, name: 'Cargo Underwriters', desc: 'Marine cargo insurers requiring independent survey attendance and insurer-oriented reporting at time of loss.' },
  { icon: Clock, name: 'P&I Clubs & Correspondents', desc: 'Protection & Indemnity clubs and their Baltic correspondents requiring independent expert attendance.' },
  { icon: Truck, name: 'Carriers & Freight Forwarders', desc: 'Carriers and forwarders with cargo disputes or condition verification needs at Baltic ports.' },
  { icon: FileText, name: 'Lawyers & Claims Handlers', desc: 'Legal counsel and claims professionals requiring factual evidence and expert survey reports for dispute resolution.' },
]

export default function Clientele() {
  return (
    <section id="clientele" className="py-24" style={{ background: '#0f2038' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <motion.span className="font-mono-custom text-[11px] tracking-[.25em] uppercase text-amber-400 block mb-4"
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            (05) — We work with
          </motion.span>
          <motion.h2 className="font-display font-bold text-white leading-tight" style={{ fontSize: 'clamp(1.75rem,3vw,2.75rem)' }}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}>
            Who instructs us.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {clients.map((c, i) => (
            <motion.div
              key={c.name}
              className="p-7 rounded-2xl cursor-default"
              style={{ background: 'rgba(20,42,74,.45)', border: '1px solid rgba(255,255,255,.07)' }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, borderColor: 'rgba(244,201,93,.25)' }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(244,201,93,.08)' }}>
                <c.icon size={22} strokeWidth={1.5} color="#d4a437" />
              </div>
              <div className="font-semibold text-white text-sm mb-2">{c.name}</div>
              <div className="text-[#8fa4c4] text-sm leading-relaxed">{c.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
