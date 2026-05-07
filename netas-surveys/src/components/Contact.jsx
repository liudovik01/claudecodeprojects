import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, MapPin, CheckCircle } from 'lucide-react'

const inputCls = "w-full bg-[rgba(5,11,26,.7)] border rounded-lg px-4 py-3 text-sm text-[#e8eef7] outline-none transition-all duration-200 placeholder:text-[#8fa4c4]/50 font-['Open_Sans']"
const inputStyle = { border: '1px solid rgba(255,255,255,.1)' }
const inputFocus = { border: '1px solid rgba(244,201,93,.5)', boxShadow: '0 0 0 3px rgba(244,201,93,.12)' }

function Input({ label, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label className="font-mono-custom text-[10px] tracking-[.18em] uppercase text-amber-400 block mb-2">{label}</label>
      <input
        className={inputCls}
        style={focused ? inputFocus : inputStyle}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
    </div>
  )
}

function Select({ label, children, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label className="font-mono-custom text-[10px] tracking-[.18em] uppercase text-amber-400 block mb-2">{label}</label>
      <select
        className={inputCls}
        style={{ ...(focused ? inputFocus : inputStyle), appearance: 'none' }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      >
        {children}
      </select>
    </div>
  )
}

function Textarea({ label, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label className="font-mono-custom text-[10px] tracking-[.18em] uppercase text-amber-400 block mb-2">{label}</label>
      <textarea
        className={inputCls}
        style={{ ...(focused ? inputFocus : inputStyle), resize: 'vertical', minHeight: 100, fontFamily: "'Open Sans',sans-serif" }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
    </div>
  )
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ fname: '', lname: '', company: '', role: '', email: '', service: '', details: '', urgent: false })

  const handleSubmit = () => {
    if (!form.email || !form.service) return
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-24" style={{ background: '#0f2038' }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.span className="font-mono-custom text-[11px] tracking-[.25em] uppercase text-amber-400 block mb-4"
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          (07) — Request a Survey
        </motion.span>
        <motion.h2 className="font-display font-bold text-white leading-tight mb-16" style={{ fontSize: 'clamp(1.75rem,3vw,2.75rem)' }}
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}>
          Get in touch.
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left info */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="italic text-[#e8eef7] text-lg leading-relaxed mb-10">
              "Cargo damaged. Vessel detained. Reefer alarm. Whatever the situation, we attend."
            </p>
            <div className="space-y-6">
              {[
                { icon: MapPin, label: 'Company', val: 'Klaipėdos NETAS UAB', sub: 'trading as NETAS Surveys' },
                { icon: Globe, label: 'Website', val: 'www.netassurveys.com', link: true },
                { icon: Globe, label: 'Region', val: 'Lithuania · Latvia · Estonia', sub: 'Worldwide via partner network' },
              ].map(({ icon: Icon, label, val, sub, link }) => (
                <div key={label} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(244,201,93,.07)', border: '1px solid rgba(244,201,93,.18)' }}>
                    <Icon size={16} color="#d4a437" />
                  </div>
                  <div>
                    <span className="font-mono-custom text-[10px] tracking-[.18em] uppercase text-amber-400 block mb-1">{label}</span>
                    <span className="text-[#e8eef7] text-sm">
                      {link ? <a href="https://www.netassurveys.com" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:underline">{val}</a> : val}
                    </span>
                    {sub && <div className="text-[#8fa4c4] text-xs mt-0.5">{sub}</div>}
                  </div>
                </div>
              ))}
            </div>

            {/* Availability */}
            <div className="flex items-center gap-3 mt-8 p-4 rounded-xl" style={{ background: 'rgba(74,222,128,.06)', border: '1px solid rgba(74,222,128,.2)' }}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              <span className="text-sm text-[#e8eef7]">Available now — we respond to urgent assignments around the clock</span>
            </div>

            {/* Partners */}
            <div className="mt-10">
              <div className="font-mono-custom text-[10px] tracking-[.2em] uppercase text-[#8fa4c4] mb-4">Network Members</div>
              <div className="flex flex-wrap gap-2">
                {['DPS Surveys','TMN Surveys','WK Webster','CESAM','AIMU'].map((p) => (
                  <span key={p} className="font-mono-custom text-[11px] tracking-[.12em] px-3 py-1.5 rounded-lg" style={{ border: '1px solid rgba(255,255,255,.08)', color: 'rgba(143,164,196,.7)', background: 'rgba(255,255,255,.02)' }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="glass rounded-2xl p-8 relative"
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <div className="font-display font-bold text-white text-xl mb-1">Request a Survey</div>
                  <div className="text-[#8fa4c4] text-sm mb-7">We'll respond as soon as possible — urgent matters are prioritised.</div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <Input label="First Name" placeholder="John" value={form.fname} onChange={e => setForm(f => ({ ...f, fname: e.target.value }))} />
                    <Input label="Last Name" placeholder="Smith" value={form.lname} onChange={e => setForm(f => ({ ...f, lname: e.target.value }))} />
                  </div>
                  <div className="mb-4">
                    <Input label="Company" placeholder="Your organisation" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
                  </div>
                  <div className="mb-4">
                    <Select label="Your Role" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
                      <option value="" disabled>Select your role</option>
                      {['Cargo Underwriter','P&I Correspondent / Club','Freight Forwarder','Carrier','Lawyer / Claims Handler','Cargo Owner / Trader','Other'].map(r => <option key={r}>{r}</option>)}
                    </Select>
                  </div>
                  <div className="mb-4">
                    <Input label="Email Address" type="email" placeholder="your@company.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div className="mb-4">
                    <Select label="Service Required" value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}>
                      <option value="" disabled>Select a service</option>
                      {['Cargo Damage Survey','Cargo Condition Survey','Vessel Survey','Claims Adjusting','Reefer / Temperature Survey','Draft, Bunker & Quantity Survey','Joint Survey / Expert Attendance','Hatch Cover Ultrasonic Testing','General Enquiry'].map(s => <option key={s}>{s}</option>)}
                    </Select>
                  </div>
                  <div className="mb-5">
                    <Textarea label="Details" placeholder="Port, cargo type, date of incident, or any relevant details..." value={form.details} onChange={e => setForm(f => ({ ...f, details: e.target.value }))} />
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer mb-6">
                    <input type="checkbox" checked={form.urgent} onChange={e => setForm(f => ({ ...f, urgent: e.target.checked }))} className="w-4 h-4 accent-amber-400" />
                    <span className="text-sm text-[#8fa4c4]">This is an urgent matter requiring immediate response</span>
                  </label>

                  <motion.button
                    onClick={handleSubmit}
                    className="w-full py-4 rounded-lg font-semibold text-sm text-[#0a1628] cursor-pointer border-none"
                    style={{ background: 'linear-gradient(135deg,#f4c95d,#d4a437)', boxShadow: '0 8px 24px -8px rgba(244,201,93,.5),inset 0 1px 0 rgba(255,255,255,.3)' }}
                    whileHover={{ y: -2, boxShadow: '0 12px 32px -8px rgba(244,201,93,.6)' }}
                    whileTap={{ y: 1 }}
                    transition={{ duration: 0.15 }}
                  >
                    Send Enquiry
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  className="flex flex-col items-center justify-center text-center py-12"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                    style={{ background: 'rgba(74,222,128,.1)', border: '1px solid rgba(74,222,128,.3)' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                  >
                    <CheckCircle size={30} color="#4ade80" />
                  </motion.div>
                  <h3 className="font-display font-bold text-white text-xl mb-2">Enquiry Received</h3>
                  <p className="text-[#8fa4c4] text-sm leading-relaxed max-w-xs">
                    Thank you — we'll respond within 30 minutes. Urgent matters are attended to immediately.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
