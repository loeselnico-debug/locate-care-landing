import { useEffect, useRef } from 'react'

const PAINS = [
  {
    icon: '🗂️',
    title: "L'urgence sans historique",
    desc: "Votre carnet de santé est introuvable. Les urgentistes opèrent à l'aveugle sur vos allergies et traitements en cours.",
  },
  {
    icon: '💊',
    title: 'Ordonnances éparpillées',
    desc: "Médecin généraliste, spécialiste, pharmacien — chacun a une pièce du puzzle. Personne n'a le tableau complet.",
  },
  {
    icon: '📁',
    title: 'Dossiers cloisonnés',
    desc: "Vos bilans sanguins chez un médecin, vos radios chez un autre. La continuité des soins est une fiction administrative.",
  },
  {
    icon: '☁️',
    title: 'Vos données sur des clouds étrangers',
    desc: "La majorité des apps santé stockent vos données sur des serveurs distants. Qui y a accès ? Pour quoi faire ?",
  },
  {
    icon: '👨‍👩‍👧',
    title: 'La famille sans coordination',
    desc: "Suivi des enfants, accompagnement d'un parent âgé — chaque proche est un dossier séparé, géré dans le chaos.",
  },
]

export default function PainPoints() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const delay = Number(el.dataset.delay ?? 0)
            setTimeout(() => {
              el.style.opacity = '1'
              el.style.transform = 'translateY(0)'
            }, delay)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.15 }
    )

    cardRefs.current.forEach(el => {
      if (!el) return
      el.style.opacity = '0'
      el.style.transform = 'translateY(2rem)'
      el.style.transition = 'opacity 0.55s ease, transform 0.55s ease'
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section style={{ background: '#0A0A0A', padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{
            margin: '0 0 1rem',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)',
            color: '#fff',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
          }}>
            Le système de santé a 5 angles morts.<br />
            <span style={{ color: '#9CA3AF', fontWeight: 700 }}>Vous en payez le prix.</span>
          </h2>
          <p style={{ color: '#6B7280', fontSize: '1rem', maxWidth: '36rem', margin: '0 auto', lineHeight: 1.6 }}>
            Des millions de patients subissent chaque jour des ruptures de suivi médical évitables.
          </p>
        </div>

        {/* Grid */}
        <div className="pain-grid">
          {PAINS.map((pain, i) => (
            <div
              key={pain.title}
              ref={el => { cardRefs.current[i] = el }}
              data-delay={i * 80}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(4px)',
                borderRadius: '0.875rem',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                cursor: 'default',
                /* last card centered via grid */
                ...(i === 4 ? { gridColumn: '1 / -1', maxWidth: '22rem', margin: '0 auto', width: '100%' } as React.CSSProperties : {}),
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.borderColor = 'rgba(224,224,224,0.20)'
                el.style.boxShadow = '0 0 28px rgba(224,224,224,0.06)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.borderColor = 'rgba(255,255,255,0.08)'
                el.style.boxShadow = 'none'
              }}
            >
              {/* Icon */}
              <div style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '0.625rem',
                background: 'rgba(224,224,224,0.06)',
                border: '1px solid rgba(224,224,224,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                flexShrink: 0,
              }}>
                {pain.icon}
              </div>

              <h3 style={{
                margin: 0,
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: '1rem',
                color: '#F3F4F6',
                lineHeight: 1.3,
              }}>
                {pain.title}
              </h3>

              <p style={{
                margin: 0,
                color: '#6B7280',
                fontSize: '0.875rem',
                lineHeight: 1.65,
              }}>
                {pain.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .pain-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 640px) {
          .pain-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .pain-grid > *:last-child {
            grid-column: 1 / -1;
            max-width: 22rem !important;
            margin: 0 auto !important;
          }
        }
        @media (min-width: 1024px) {
          .pain-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .pain-grid > *:last-child {
            grid-column: auto !important;
            max-width: none !important;
            margin: 0 !important;
          }
        }
      `}</style>
    </section>
  )
}
