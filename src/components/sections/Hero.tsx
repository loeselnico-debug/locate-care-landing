import { useEffect, useRef } from 'react'

const SIGNUP_URL    = import.meta.env.VITE_SIGNUP_URL    ?? '/signup'
const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL  ?? ''

// Sanity-check at module load (visible in browser console during dev)
if (import.meta.env.DEV) {
  fetch(`${SUPABASE_URL}/auth/v1/health`)
    .then(r => console.info(`[CARE] Supabase Auth → ${r.status} ${r.statusText} (401 = projet actif ✓)`))
    .catch(e => console.error('[CARE] Supabase Auth unreachable:', e))
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>('[data-animate]')
    if (!els) return
    els.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(1.5rem)'
      setTimeout(() => {
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, 120 + i * 110)
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '100dvh',
        padding: 'env(safe-area-inset-top, 0) 1.5rem env(safe-area-inset-bottom, 0)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{
        maxWidth: '72rem',
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '4rem',
        alignItems: 'center',
      }}
        className="hero-inner"
      >
        {/* Left — text content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '38rem' }} className="hero-text">

          {/* Badges */}
          <div data-animate style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {[
              { icon: '🟢', label: 'EN LIGNE — V1.0' },
              { icon: '🔒', label: 'Zéro-Serveur' },
              { icon: '🇫🇷', label: 'RGPD Natif' },
            ].map(b => (
              <span key={b.label} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.3rem 0.75rem',
                borderRadius: '9999px',
                background: 'rgba(224,224,224,0.05)',
                border: '1px solid rgba(224,224,224,0.15)',
                backdropFilter: 'blur(8px)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.7rem',
                color: '#E0E0E0',
                letterSpacing: '0.04em',
                boxShadow: '0 0 20px rgba(224,224,224,0.06)',
              }}>
                {b.icon} {b.label}
              </span>
            ))}
          </div>

          {/* H1 */}
          <div data-animate>
            <h1 style={{
              margin: 0,
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
              fontSize: 'clamp(2.5rem, 5vw, 5rem)',
              color: '#fff',
            }}>
              Votre dossier médical complet.
              <br />
              <span style={{
                background: 'linear-gradient(90deg, #E0E0E0 0%, #fff 60%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Jamais en ligne. Toujours là.
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p data-animate style={{
            margin: 0,
            color: '#9CA3AF',
            fontSize: '1.05rem',
            lineHeight: 1.65,
            maxWidth: '34rem',
          }}>
            Scannez vos ordonnances, archivez vos documents médicaux, générez votre fiche d'urgence OMS.
            Le tout stocké uniquement sur votre téléphone.
          </p>

          {/* CTAs */}
          <div data-animate style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
              <a
                href={SIGNUP_URL}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.85rem 1.75rem',
                  background: 'rgba(224,224,224,0.10)',
                  border: '1px solid rgba(224,224,224,0.50)',
                  borderRadius: '0.5rem',
                  color: '#E0E0E0',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  boxShadow: '0 0 28px rgba(224,224,224,0.12), inset 0 1px 0 rgba(255,255,255,0.08)',
                  transition: 'box-shadow 0.2s, background 0.2s',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 0 44px rgba(224,224,224,0.22), inset 0 1px 0 rgba(255,255,255,0.12)'
                  e.currentTarget.style.background = 'rgba(224,224,224,0.15)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = '0 0 28px rgba(224,224,224,0.12), inset 0 1px 0 rgba(255,255,255,0.08)'
                  e.currentTarget.style.background = 'rgba(224,224,224,0.10)'
                }}
              >
                Créer mon dossier gratuit
              </a>

              <a
                href="#features"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.85rem 1.4rem',
                  border: '1px solid rgba(224,224,224,0.18)',
                  borderRadius: '0.5rem',
                  color: '#9CA3AF',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(224,224,224,0.35)'
                  e.currentTarget.style.color = '#E0E0E0'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(224,224,224,0.18)'
                  e.currentTarget.style.color = '#9CA3AF'
                }}
              >
                Voir comment ça marche
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            {/* Legal micro-note */}
            <p style={{
              margin: 0,
              color: '#4B5563',
              fontSize: '0.72rem',
              fontFamily: 'JetBrains Mono, monospace',
            }}>
              * Inscription requise. Vos données ne quittent jamais votre appareil.
            </p>
          </div>
        </div>

        {/* Right — App mockup */}
        <div data-animate style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="hero-visual">
          <AppMockup />
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .hero-inner {
            flex-direction: row !important;
            align-items: center !important;
          }
          .hero-text {
            max-width: 42rem !important;
          }
        }
      `}</style>
    </section>
  )
}

function AppMockup() {
  return (
    <div style={{
      width: 'clamp(260px, 32vw, 340px)',
      borderRadius: '1.5rem',
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(224,224,224,0.12)',
      backdropFilter: 'blur(20px)',
      padding: '1.5rem',
      boxShadow: '0 0 60px rgba(224,224,224,0.07), 0 24px 48px rgba(0,0,0,0.5)',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.85rem',
    }}>
      {/* Header bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.8rem', color: '#E0E0E0', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          MedSecure
        </span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#22C55E', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', padding: '0.15rem 0.5rem', borderRadius: '9999px' }}>
          LOCAL
        </span>
      </div>

      {/* Category cards */}
      {[
        { icon: '💊', label: 'Ordonnances', count: '12 docs' },
        { icon: '🩺', label: 'Médecine Générale', count: '8 docs' },
        { icon: '🧪', label: 'Analyses Labo', count: '5 docs' },
        { icon: '🦴', label: 'Imagerie', count: '3 docs' },
      ].map(cat => (
        <div key={cat.label} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.65rem 0.85rem',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(224,224,224,0.07)',
          borderRadius: '0.625rem',
        }}>
          <span style={{ fontSize: '1rem' }}>{cat.icon}</span>
          <span style={{ flex: 1, fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.78rem', color: '#D1D5DB' }}>{cat.label}</span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: '#6B7280' }}>{cat.count}</span>
        </div>
      ))}

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(224,224,224,0.07)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#4B5563' }}>IndexedDB · 0 Ko cloud</span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#22C55E' }}>🔒 chiffré</span>
      </div>
    </div>
  )
}
