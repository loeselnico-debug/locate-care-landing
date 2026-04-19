import { useEffect, useRef } from 'react'

type BadgeType = 'FREE' | 'PREMIUM' | 'ARCHITECTURE'

interface Feature {
  id: string
  badge: BadgeType
  title: string
  description: string
  tech: string
  icon: React.ReactNode
}

const FEATURES: Feature[] = [
  {
    id: 'scanner',
    badge: 'FREE',
    title: 'Scanner IA Médical',
    description: "Photographiez n'importe quel document médical. L'IA extrait automatiquement les informations clés (médicament, dosage, dates) et les classe dans votre dossier après votre validation.",
    tech: 'Gemini 2.5 Flash Vision · Sas de validation humaine · Zéro stockage serveur',
    icon: <ScanIcon />,
  },
  {
    id: 'medsecure',
    badge: 'FREE',
    title: 'MedSecure — Coffre-Fort Médical',
    description: "Six catégories : Ordonnances, Couverture Santé, Imagerie, Analyses Labo, Médecine Générale, Spécialistes. Tout votre historique médical en un seul endroit sécurisé.",
    tech: 'IndexedDB local · Recherche Fuse.js · Export/Import .loc-care chiffré',
    icon: <VaultIcon />,
  },
  {
    id: 'oms',
    badge: 'PREMIUM',
    title: 'Fiche Urgence OMS (IPS-FR)',
    description: "Générez en un clic votre fiche médicale internationale (International Patient Summary). Identité INS, allergies, groupe sanguin, traitements actifs. Prêt pour les urgences, partout dans le monde.",
    tech: 'Norme IPS-FR OMS · PDF généré 100% localement · Standard FHIR compatible',
    icon: <GlobeIcon />,
  },
  {
    id: 'famille',
    badge: 'PREMIUM',
    title: 'Suivi Familial Complet',
    description: "Gérez les profils de vos enfants et proches. Carnet vaccinal dynamique, journal de santé, courbes de croissance. Un dossier médical complet pour chaque membre de votre famille.",
    tech: 'Profils INS stricts · Carnet vaccinal · Journal symptômes',
    icon: <FamilyIcon />,
  },
  {
    id: 'zero-serveur',
    badge: 'ARCHITECTURE',
    title: 'Zéro-Serveur — Souveraineté Absolue',
    description: "Toutes vos données médicales restent sur votre appareil. Aucune base de données distante. Architecture Local-First certifiée avec exemption HDS native. RGPD par conception.",
    tech: 'IndexedDB uniquement · Exemption HDS · RGPD Art.17 natif · Privacy by Design',
    icon: <ShieldOffIcon />,
  },
]

const BADGE_STYLES: Record<BadgeType, React.CSSProperties> = {
  FREE: {
    background: 'rgba(224,224,224,0.08)',
    color: '#E0E0E0',
    border: '1px solid rgba(224,224,224,0.20)',
  },
  PREMIUM: {
    background: 'rgba(245,158,11,0.10)',
    color: '#FBBF24',
    border: '1px solid rgba(245,158,11,0.25)',
  },
  ARCHITECTURE: {
    background: 'rgba(59,130,246,0.10)',
    color: '#60A5FA',
    border: '1px solid rgba(59,130,246,0.25)',
  },
}

export default function Features() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const delay = Number(el.dataset.delay ?? 0)
          setTimeout(() => {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
          }, delay)
          observer.unobserve(el)
        })
      },
      { threshold: 0.12 }
    )

    cardRefs.current.forEach(el => {
      if (!el) return
      el.style.opacity = '0'
      el.style.transform = 'translateY(2.5rem)'
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" style={{ padding: '6rem 1.5rem', background: '#050505' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{
            margin: '0 0 1rem',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
            color: '#fff',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
          }}>
            LOCATE CARE. L'application qui garde tout.{' '}
            <span style={{ color: '#9CA3AF', fontWeight: 700 }}>Sans serveur.</span>
          </h2>
          <p style={{ color: '#6B7280', fontSize: '1rem', maxWidth: '36rem', margin: '0 auto', lineHeight: 1.6 }}>
            Cinq fonctions. Une architecture unique. Votre souveraineté médicale, enfin réelle.
          </p>
        </div>

        {/* Feature rows — alternating left/right on desktop */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {FEATURES.map((feat, i) => (
            <div
              key={feat.id}
              ref={el => { cardRefs.current[i] = el }}
              data-delay={i * 90}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                padding: '2rem',
                background: i % 2 === 0 ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.015)',
                border: '1px solid rgba(224,224,224,0.08)',
                borderRadius: '1rem',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              className={`feature-card ${i % 2 === 1 ? 'feature-card--reverse' : ''}`}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(224,224,224,0.18)'
                e.currentTarget.style.boxShadow = '0 0 36px rgba(224,224,224,0.06)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(224,224,224,0.08)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Icon block */}
              <div className="feature-icon-block" style={{
                flexShrink: 0,
                width: '3.5rem',
                height: '3.5rem',
                borderRadius: '0.75rem',
                background: 'rgba(224,224,224,0.06)',
                border: '1px solid rgba(224,224,224,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#E0E0E0',
              }}>
                {feat.icon}
              </div>

              {/* Text block */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <span style={{
                    ...BADGE_STYLES[feat.badge],
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '9999px',
                  }}>
                    {feat.badge}
                  </span>
                </div>

                <h3 style={{
                  margin: 0,
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
                  color: '#F3F4F6',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.25,
                }}>
                  {feat.title}
                </h3>

                <p style={{
                  margin: 0,
                  color: '#9CA3AF',
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                  maxWidth: '52rem',
                }}>
                  {feat.description}
                </p>

                <p style={{
                  margin: 0,
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.68rem',
                  color: '#4B5563',
                  letterSpacing: '0.02em',
                }}>
                  {feat.tech}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .feature-card {
            flex-direction: row !important;
            align-items: flex-start !important;
          }
          .feature-card--reverse {
            flex-direction: row-reverse !important;
          }
          .feature-icon-block {
            width: 4rem !important;
            height: 4rem !important;
            margin-top: 0.25rem;
          }
        }
      `}</style>
    </section>
  )
}

/* SVG icons */
function ScanIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="5" height="5" rx="1" />
      <rect x="16" y="3" width="5" height="5" rx="1" />
      <rect x="3" y="16" width="5" height="5" rx="1" />
      <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
      <path d="M21 21v.01" />
      <path d="M12 7v3a2 2 0 0 1-2 2H7" />
      <path d="M3 12h.01" />
      <path d="M12 3h.01" />
      <path d="M12 16v.01" />
      <path d="M16 12h1" />
      <path d="M21 12v.01" />
      <path d="M12 21v-1" />
    </svg>
  )
}

function VaultIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="14" rx="2" />
      <circle cx="12" cy="11" r="3" />
      <path d="M12 8v1M12 13v1M9 11H8M15 11h1" />
      <path d="M6 20h12" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20A14.5 14.5 0 0 0 12 2" />
      <path d="M2 12h20" />
      <path d="M12 2v4M12 18v4" />
    </svg>
  )
}

function FamilyIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function ShieldOffIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    </svg>
  )
}
