import { motion } from 'framer-motion'

const PHOTO_URL = 'https://images.unsplash.com/photo-1645301792884-2329d48bdcd6?auto=format&fit=crop&w=1920&q=85'

const STATS = [
  { n: '1993', label: 'Est.' },
  { n: '30+', label: 'Years active' },
  { n: '24/7', label: 'Response' },
  { n: 'LT · LV · EE', label: 'Baltic coverage' },
]

const SERVICES = [
  'Cargo Damage Surveys',
  'Vessel Surveys',
  'Claims Adjusting',
  'Reefer & Temperature',
  'Draft & Bunker',
  'Hatch Cover Testing',
]

export default function Hero3D() {
  function scrollTo(id) {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" style={{ position: 'relative', width: '100%', height: '100vh', minHeight: 620, overflow: 'hidden' }}>

      {/* ── Background photo ── */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${PHOTO_URL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 60%',
        animation: 'slowZoom 18s ease-in-out infinite alternate',
      }} />

      {/* ── Overlays ── */}
      {/* Primary dark gradient — left to right */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(105deg, rgba(5,11,26,0.92) 0%, rgba(5,11,26,0.75) 45%, rgba(5,11,26,0.35) 100%)',
      }} />
      {/* Bottom fade for stats legibility */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(5,11,26,0.85) 0%, transparent 40%)',
      }} />
      {/* Top fade for navbar */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(5,11,26,0.5) 0%, transparent 20%)',
      }} />

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes slowZoom {
          from { transform: scale(1.0); }
          to   { transform: scale(1.06); }
        }
      `}</style>

      {/* ── Content ── */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(90px,10vh,120px) clamp(24px,6vw,72px) 48px',
        maxWidth: 1280, margin: '0 auto', left: 0, right: 0,
      }}>

        {/* Top block */}
        <div>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              marginBottom: 20,
            }}
          >
            <span style={{ width: 28, height: 1.5, background: '#d4a437', display: 'block' }} />
            <span style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: 11, letterSpacing: '0.28em',
              textTransform: 'uppercase', color: '#d4a437', fontWeight: 700,
            }}>
              Independent Loss Adjusters & Marine Surveyors
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
              fontWeight: 800, color: '#ffffff',
              lineHeight: 1.08, margin: '0 0 10px',
              letterSpacing: '-0.02em',
              textShadow: '0 2px 32px rgba(0,0,0,0.4)',
            }}
          >
            NETAS Surveys
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)',
              fontWeight: 300, color: 'rgba(232,238,247,0.85)',
              marginBottom: 28, letterSpacing: '0.01em',
            }}
          >
            Baltic specialists since 1993
          </motion.div>

          {/* Service pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36, maxWidth: 560 }}
          >
            {SERVICES.map((s) => (
              <span key={s} style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: 11, fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(212,164,55,0.9)',
                background: 'rgba(212,164,55,0.08)',
                border: '1px solid rgba(212,164,55,0.25)',
                borderRadius: 4,
                padding: '4px 10px',
              }}>{s}</span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.36 }}
            style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}
          >
            <button
              onClick={() => scrollTo('#contact')}
              style={{
                padding: '14px 30px',
                background: 'linear-gradient(135deg, #f4c95d, #d4a437)',
                borderRadius: 6, border: 'none', cursor: 'pointer',
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 700, fontSize: 13,
                letterSpacing: '0.1em', color: '#0a1628',
                textTransform: 'uppercase',
                boxShadow: '0 8px 28px -6px rgba(212,164,55,0.55)',
              }}
            >
              Request a Survey
            </button>
            <button
              onClick={() => scrollTo('#services')}
              style={{
                padding: '14px 28px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 6, cursor: 'pointer',
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 600, fontSize: 13,
                letterSpacing: '0.08em', color: 'rgba(232,238,247,0.9)',
                textTransform: 'uppercase',
                backdropFilter: 'blur(8px)',
              }}
            >
              Our Services
            </button>
          </motion.div>
        </div>

        {/* Bottom: divider + stats */}
        <div>
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              marginBottom: 28,
              background: 'rgba(74,222,128,0.06)',
              border: '1px solid rgba(74,222,128,0.22)',
              borderRadius: 20, padding: '6px 14px',
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80', animation: 'pulse 2s infinite', display: 'block' }} />
            <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: 'rgba(232,238,247,0.8)', letterSpacing: '0.05em' }}>
              Available now — responding to urgent assignments around the clock
            </span>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            style={{
              display: 'flex', gap: 'clamp(20px,5vw,56px)',
              flexWrap: 'wrap',
              paddingTop: 24,
              borderTop: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {STATS.map(({ n, label }) => (
              <div key={label}>
                <div style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(1.2rem, 2.2vw, 1.75rem)',
                  color: '#f4c95d',
                  lineHeight: 1,
                  marginBottom: 5,
                }}>{n}</div>
                <div style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: 11, color: 'rgba(143,164,196,0.8)',
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                }}>{label}</div>
              </div>
            ))}

            {/* Photo credit */}
            <div style={{ marginLeft: 'auto', alignSelf: 'flex-end' }}>
              <span style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: 10, color: 'rgba(143,164,196,0.4)',
                letterSpacing: '0.06em',
              }}>
                Photo: Felix Lemke / Unsplash
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{
          position: 'absolute', bottom: 20, right: 48,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        }}
      >
        <div style={{
          width: 22, height: 36, border: '1.5px solid rgba(143,164,196,0.25)',
          borderRadius: 11, display: 'flex', justifyContent: 'center', paddingTop: 5,
        }}>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            style={{ width: 3, height: 3, borderRadius: '50%', background: '#d4a437' }}
          />
        </div>
      </motion.div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }`}</style>
    </section>
  )
}
