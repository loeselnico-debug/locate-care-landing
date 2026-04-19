import { useEffect, useRef } from 'react'

const SIGNUP_URL         = import.meta.env.VITE_SIGNUP_URL         ?? '/signup'
const SIGNUP_URL_PREMIUM = import.meta.env.VITE_SIGNUP_URL_PREMIUM ?? '/signup?plan=premium'

const FREE_FEATURES = [
  { ok: true,  label: 'Inscription Supabase requise' },
  { ok: true,  label: 'Scanner IA médical (ordonnances, documents)' },
  { ok: true,  label: 'Dossier MedSecure (stockage local)' },
  { ok: true,  label: 'Profil médical INS personnel' },
  { ok: true,  label: 'Architecture Zéro-Serveur' },
  { ok: false, label: 'Export Fiche OMS d\'urgence' },
  { ok: false, label: 'Suivi multi-profils (famille)' },
  { ok: false, label: 'PIN CARE (verrou sécurisé)' },
  { ok: false, label: 'Only For Women' },
]

const PREMIUM_FEATURES = [
  { ok: true, label: 'Tout le FREE inclus' },
  { ok: true, label: 'Export Fiche OMS d\'urgence (IPS-FR)' },
  { ok: true, label: 'Suivi Multi-Profils (enfants, famille)' },
  { ok: true, label: 'PIN CARE (sanctuaire sécurisé)' },
  { ok: true, label: 'Only For Women (espace intime privé)' },
  { ok: true, label: 'Backup .loc-care chiffré' },
  { ok: true, label: 'Support prioritaire' },
]

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          const cards = sectionRef.current?.querySelectorAll<HTMLElement>('[data-card]')
          cards?.forEach((el, i) => {
            setTimeout(() => {
              el.style.opacity = '1'
              el.style.transform = 'translateY(0)'
            }, i * 120)
          })
          observer.disconnect()
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="tarifs" style={{ background: '#0A0A0A', padding: '6rem 1.5rem' }}>
      <div ref={sectionRef} style={{ maxWidth: '72rem', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
          <h2 style={{
            margin: '0 0 0.75rem',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
            color: '#fff',
            letterSpacing: '-0.02em',
          }}>
            Simple. Transparent.{' '}
            <span style={{ background: 'linear-gradient(90deg, #E0E0E0, #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Au prix d'un café.
            </span>
          </h2>
          <p style={{ color: '#6B7280', fontSize: '0.875rem', fontFamily: 'JetBrains Mono, monospace', marginBottom: '3rem' }}>
            Inscription requise pour accéder à l'application. Vos données restent sur votre appareil.
          </p>
        </div>

        {/* Cards grid */}
        <div className="pricing-grid">

          {/* FREE card */}
          <div
            data-card
            style={{
              position: 'relative',
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: '1.25rem',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              opacity: 0,
              transform: 'translateY(2rem)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <div>
              <span style={labelStyle('#9CA3AF')}>GRATUIT</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', margin: '0.75rem 0 0.25rem' }}>
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, fontSize: '3rem', color: '#E0E0E0', lineHeight: 1 }}>0 €</span>
              </div>
              <p style={{ color: '#6B7280', fontSize: '0.875rem', margin: 0 }}>Pour découvrir LOCATE CARE</p>
            </div>

            <FeatureList items={FREE_FEATURES} />

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href={SIGNUP_URL} style={ctaGhost}>
                Créer mon compte gratuit
              </a>
              <p style={noteStyle}>Aucune carte bancaire requise</p>
            </div>
          </div>

          {/* PREMIUM card */}
          <div
            data-card
            style={{
              position: 'relative',
              background: 'rgba(224,224,224,0.04)',
              border: '1px solid rgba(224,224,224,0.40)',
              borderRadius: '1.25rem',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              boxShadow: '0 0 40px rgba(224,224,224,0.08), 0 0 80px rgba(224,224,224,0.04)',
              opacity: 0,
              transform: 'translateY(2rem)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            {/* Recommended badge */}
            <span style={{
              position: 'absolute',
              top: '-0.875rem',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#E0E0E0',
              color: '#050505',
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 900,
              fontSize: '0.7rem',
              letterSpacing: '0.08em',
              padding: '0.25rem 0.9rem',
              borderRadius: '9999px',
              whiteSpace: 'nowrap',
            }}>
              RECOMMANDÉ
            </span>

            <div>
              <span style={labelStyle('#FBBF24')}>PREMIUM</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', margin: '0.75rem 0 0.25rem' }}>
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, fontSize: '3rem', color: '#E0E0E0', lineHeight: 1 }}>2,99 €</span>
                <span style={{ color: '#6B7280', fontSize: '0.875rem' }}>/mois</span>
              </div>
              <p style={{ color: '#6B7280', fontSize: '0.875rem', margin: 0 }}>Le suivi santé complet</p>
            </div>

            <FeatureList items={PREMIUM_FEATURES} allOk />

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a
                href={SIGNUP_URL_PREMIUM}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '0.85rem 1.5rem',
                  background: 'rgba(224,224,224,0.12)',
                  border: '1px solid rgba(224,224,224,0.50)',
                  borderRadius: '0.5rem',
                  color: '#E0E0E0',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  boxShadow: '0 0 20px rgba(224,224,224,0.10)',
                  transition: 'box-shadow 0.2s, background 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 0 36px rgba(224,224,224,0.20)'
                  e.currentTarget.style.background = 'rgba(224,224,224,0.18)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(224,224,224,0.10)'
                  e.currentTarget.style.background = 'rgba(224,224,224,0.12)'
                }}
              >
                Commencer l'essai
              </a>
              <p style={noteStyle}>Résiliable à tout moment. Paiement via Stripe.</p>
            </div>
          </div>
        </div>

        {/* Anchor psychologique */}
        <div style={{
          marginTop: '3rem',
          padding: '1.25rem 2rem',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(224,224,224,0.10)',
          borderRadius: '0.75rem',
          backdropFilter: 'blur(8px)',
          textAlign: 'center',
          color: '#9CA3AF',
          fontSize: '1rem',
          fontFamily: 'Space Grotesk, sans-serif',
        }}>
          ☕ Au prix d'un café par mois, votre santé vous appartient vraiment.
        </div>
      </div>

      <style>{`
        .pricing-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .pricing-grid {
            grid-template-columns: repeat(2, 1fr);
            align-items: start;
          }
        }
      `}</style>
    </section>
  )
}

function FeatureList({ items, allOk }: { items: { ok: boolean; label: string }[]; allOk?: boolean }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      {items.map(item => (
        <li key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ flexShrink: 0, fontSize: '0.85rem' }}>
            {item.ok || allOk ? '✅' : '❌'}
          </span>
          <span style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '0.855rem',
            color: item.ok || allOk ? '#D1D5DB' : '#4B5563',
            textDecoration: item.ok || allOk ? 'none' : 'line-through',
          }}>
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  )
}

const labelStyle = (color: string): React.CSSProperties => ({
  fontFamily: 'JetBrains Mono, monospace',
  fontSize: '0.65rem',
  fontWeight: 600,
  letterSpacing: '0.12em',
  color,
  textTransform: 'uppercase',
})

const ctaGhost: React.CSSProperties = {
  display: 'block',
  textAlign: 'center',
  padding: '0.85rem 1.5rem',
  border: '1px solid rgba(224,224,224,0.20)',
  borderRadius: '0.5rem',
  color: '#9CA3AF',
  fontFamily: 'Space Grotesk, sans-serif',
  fontWeight: 600,
  fontSize: '0.9rem',
  textDecoration: 'none',
  transition: 'border-color 0.2s, color 0.2s',
}

const noteStyle: React.CSSProperties = {
  margin: 0,
  textAlign: 'center',
  color: '#4B5563',
  fontSize: '0.7rem',
  fontFamily: 'JetBrains Mono, monospace',
}
