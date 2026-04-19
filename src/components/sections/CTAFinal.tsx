import { useEffect, useRef } from 'react'

const SIGNUP_URL = import.meta.env.VITE_SIGNUP_URL ?? '/signup'

export default function CTAFinal() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          const els = sectionRef.current?.querySelectorAll<HTMLElement>('[data-animate]')
          els?.forEach((el, i) => {
            setTimeout(() => {
              el.style.opacity = '1'
              el.style.transform = 'translateY(0)'
            }, i * 100)
          })
          observer.disconnect()
        })
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: '7rem 1.5rem',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(224,224,224,0.05) 0%, #050505 70%)',
      }}
    >
      {/* Decorative glow orb */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40rem',
        height: '20rem',
        background: 'radial-gradient(ellipse, rgba(224,224,224,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{ maxWidth: '42rem', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>

        <h2
          data-animate
          style={{
            margin: '0 0 0.5rem',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: '#fff',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            opacity: 0,
            transform: 'translateY(1.5rem)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          Commencez maintenant.
        </h2>

        <h2
          data-animate
          style={{
            margin: '0 0 1.75rem',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            background: 'linear-gradient(90deg, #E0E0E0 0%, #fff 60%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            opacity: 0,
            transform: 'translateY(1.5rem)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          C'est gratuit. C'est privé.
        </h2>

        <p
          data-animate
          style={{
            margin: '0 0 2.5rem',
            color: '#9CA3AF',
            fontSize: '1.05rem',
            lineHeight: 1.65,
            opacity: 0,
            transform: 'translateY(1.5rem)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          Rejoignez les premiers utilisateurs qui reprennent la main sur leur santé numérique.
        </p>

        {/* Primary CTA */}
        <div
          data-animate
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            opacity: 0,
            transform: 'translateY(1.5rem)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <a
            href={SIGNUP_URL}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              maxWidth: '22rem',
              padding: '1rem 2rem',
              background: 'rgba(224,224,224,0.10)',
              border: '1px solid rgba(224,224,224,0.55)',
              borderRadius: '0.625rem',
              color: '#E0E0E0',
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 800,
              fontSize: '1rem',
              textDecoration: 'none',
              letterSpacing: '0.01em',
              boxShadow: '0 0 32px rgba(224,224,224,0.14), inset 0 1px 0 rgba(255,255,255,0.08)',
              animation: 'ctaPulse 3s ease-in-out infinite',
              transition: 'box-shadow 0.2s, background 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 0 52px rgba(224,224,224,0.28), inset 0 1px 0 rgba(255,255,255,0.12)'
              e.currentTarget.style.background = 'rgba(224,224,224,0.16)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 0 32px rgba(224,224,224,0.14), inset 0 1px 0 rgba(255,255,255,0.08)'
              e.currentTarget.style.background = 'rgba(224,224,224,0.10)'
            }}
          >
            Créer mon dossier médical gratuit
          </a>

          <p style={{
            margin: 0,
            color: '#4B5563',
            fontSize: '0.7rem',
            fontFamily: 'JetBrains Mono, monospace',
          }}>
            * Inscription email requise. Gratuit. Résiliable à tout moment pour le PREMIUM.
          </p>

          {/* Separator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', maxWidth: '22rem', color: '#374151', fontSize: '0.75rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
            <span>ou</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
          </div>

          <a
            href="https://locatesystems.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.75rem 1.5rem',
              border: '1px solid rgba(224,224,224,0.15)',
              borderRadius: '0.5rem',
              color: '#6B7280',
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 600,
              fontSize: '0.875rem',
              textDecoration: 'none',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(224,224,224,0.30)'
              e.currentTarget.style.color = '#E0E0E0'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(224,224,224,0.15)'
              e.currentTarget.style.color = '#6B7280'
            }}
          >
            En savoir plus sur l'écosystème LOCATE SYSTEMS
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes ctaPulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.018); }
        }
      `}</style>
    </section>
  )
}
