import { useEffect, useRef } from 'react'

const TESTIMONIALS = [
  {
    initials: 'M.L.',
    name: 'Marie L.',
    role: 'Maman de 3 enfants',
    quote: "Enfin un endroit où centraliser les carnets de santé de mes enfants. Le fait que rien ne parte sur un cloud, c'est ce qui m'a convaincue.",
  },
  {
    initials: 'T.R.',
    name: 'Thomas R.',
    role: 'Patient chronique',
    quote: "J'ai plusieurs spécialistes. Avant, je réexpliquais tout à chaque rendez-vous. Maintenant j'exporte ma fiche OMS et c'est réglé en 30 secondes.",
  },
  {
    initials: 'S.K.',
    name: 'Sophia K.',
    role: 'Aidante familiale',
    quote: "Je gère le suivi médical de ma mère à distance. LOCATE CARE m'a permis d'avoir enfin une vue complète sans jongler entre les ordonnances papier.",
  },
]

export default function SocialProof() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          cardRefs.current.forEach((el, i) => {
            if (!el) return
            setTimeout(() => {
              el.style.opacity = '1'
              el.style.transform = 'translateY(0)'
            }, i * 100)
          })
          observer.disconnect()
        })
      },
      { threshold: 0.12 }
    )
    if (cardRefs.current[0]) observer.observe(cardRefs.current[0])
    return () => observer.disconnect()
  }, [])

  return (
    <section style={{ background: '#0A0A0A', padding: '5rem 1.5rem' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.75rem' }}>
          <p style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.7rem',
            color: '#22C55E',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
          }}>
            ✦ Testé par nos PREMIUM_GUEST depuis mars 2026
          </p>
          <h2 style={{
            margin: 0,
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
            color: '#D1D5DB',
            letterSpacing: '-0.01em',
          }}>
            Ils ont repris la main sur leur santé numérique.
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="social-grid">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              ref={el => { cardRefs.current[i] = el }}
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(224,224,224,0.08)',
                borderRadius: '1rem',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                opacity: 0,
                transform: 'translateY(1.5rem)',
                transition: 'opacity 0.55s ease, transform 0.55s ease',
              }}
            >
              {/* Quote */}
              <p style={{
                margin: 0,
                color: '#9CA3AF',
                fontSize: '0.9rem',
                lineHeight: 1.7,
                fontStyle: 'italic',
              }}>
                "{t.quote}"
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: 'auto' }}>
                <div style={{
                  width: '2.25rem',
                  height: '2.25rem',
                  borderRadius: '50%',
                  background: 'rgba(224,224,224,0.08)',
                  border: '1px solid rgba(224,224,224,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.65rem',
                  color: '#E0E0E0',
                  flexShrink: 0,
                }}>
                  {t.initials}
                </div>
                <div>
                  <p style={{ margin: 0, fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.85rem', color: '#F3F4F6' }}>{t.name}</p>
                  <p style={{ margin: 0, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#6B7280' }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* IP badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            background: 'rgba(224,224,224,0.03)',
            border: '1px solid rgba(224,224,224,0.10)',
            borderRadius: '0.375rem',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.65rem',
            color: '#4B5563',
            letterSpacing: '0.04em',
          }}>
            🔒 IP protégée — Dépôt e-Soleau DSO2026012471
          </span>
        </div>
      </div>

      <style>{`
        .social-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 640px) {
          .social-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .social-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </section>
  )
}
