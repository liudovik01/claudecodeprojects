import { motion } from 'framer-motion'

const partners = ['CESAM', 'AIMU', 'WK Webster', 'DPS Surveys', 'TMN Surveys']

export default function TrustBar() {
  return (
    <div style={{ background: 'rgba(15,32,56,.5)', borderTop: '1px solid rgba(244,201,93,.08)', borderBottom: '1px solid rgba(244,201,93,.08)' }}>
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-6 h-[64px]">
        <span className="font-mono-custom text-[10px] tracking-[.25em] uppercase text-[#8fa4c4] whitespace-nowrap flex-shrink-0">Members of</span>
        <div className="w-px h-6 flex-shrink-0" style={{ background: 'rgba(255,255,255,.1)' }} />
        <div className="flex-1 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none" style={{ background: 'linear-gradient(90deg,rgba(15,32,56,.8),transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none" style={{ background: 'linear-gradient(-90deg,rgba(15,32,56,.8),transparent)' }} />
          <div className="flex gap-10 w-max" style={{ animation: 'trust-scroll 20s linear infinite' }}>
            {[...partners, ...partners].map((p, i) => (
              <span key={i} className="font-mono-custom text-[11px] tracking-[.2em] uppercase whitespace-nowrap flex-shrink-0" style={{ color: 'rgba(143,164,196,.6)' }}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes trust-scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </div>
  )
}
