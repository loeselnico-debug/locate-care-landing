import { useState, useRef, useEffect } from 'react'

const FAQS = [
  {
    q: 'Mes données médicales sont-elles vraiment sécurisées ?',
    a: "Oui, par conception architecturale. Toutes vos données (ordonnances, documents, profils) sont stockées exclusivement dans IndexedDB — la base de données locale de votre navigateur. Aucun serveur distant ne les reçoit. L'application fonctionne même sans connexion internet pour la consultation de vos données.",
  },
  {
    q: "L'IA analyse-t-elle mes documents de santé ?",
    a: "L'IA (Gemini 2.5 Flash) reçoit temporairement l'image que vous scannez pour en extraire les informations. Ce traitement est éphémère : l'image n'est jamais stockée sur nos serveurs ni sur ceux de Google au-delà de l'analyse. Vous validez ensuite chaque information extraite avant qu'elle entre dans votre dossier.",
  },
  {
    q: 'Pourquoi dois-je créer un compte si tout est local ?',
    a: "Le compte Supabase sert uniquement à deux usages : authentifier votre identité pour la gestion de votre abonnement PREMIUM via Stripe, et vous permettre de récupérer l'accès à votre PIN CARE en cas d'oubli. Aucune donnée médicale ne transite par notre backend.",
  },
  {
    q: "Que se passe-t-il si je perds ou change de téléphone ?",
    a: "LOCATE CARE génère un fichier de sauvegarde chiffré au format .loc-care. Ce fichier contient l'intégralité de votre dossier et peut être importé sur un nouvel appareil. Le chiffrement garantit qu'il est illisible sans votre accès authentifié.",
  },
  {
    q: "L'application fonctionne-t-elle sur iPhone et Android ?",
    a: "LOCATE CARE est une Progressive Web App (PWA) universelle. Elle fonctionne sur tout navigateur moderne : Safari iOS, Chrome Android, Firefox. Aucune installation depuis l'App Store ou Google Play n'est requise. Ajoutez simplement le site à votre écran d'accueil.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          const items = sectionRef.current?.querySelectorAll<HTMLElement>('[data-faq]')
          items?.forEach((el, i) => {
            setTimeout(() => {
              el.style.opacity = '1'
              el.style.transform = 'translateY(0)'
            }, i * 70)
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
    <section ref={sectionRef} style={{ background: '#0A0A0A', padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: '48rem', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{
            margin: '0 0 1rem',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
            color: '#fff',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}>
            Vos questions sur la confidentialité.{' '}
            <span style={{ color: '#9CA3AF', fontWeight: 700 }}>Nos réponses techniques.</span>
          </h2>
        </div>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              index={i}
              question={faq.q}
              answer={faq.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              isLast={i === FAQS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface AccordionItemProps {
  index: number
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  isLast: boolean
}

function AccordionItem({ index, question, answer, isOpen, onToggle, isLast }: AccordionItemProps) {
  const bodyRef = useRef<HTMLDivElement>(null)

  return (
    <div
      data-faq
      style={{
        borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.08)',
        opacity: 0,
        transform: 'translateY(1rem)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          background: isOpen ? 'rgba(255,255,255,0.02)' : 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '1.4rem 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          textAlign: 'left',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
        onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = 'transparent' }}
      >
        <span style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 700,
          fontSize: '0.975rem',
          color: isOpen ? '#F3F4F6' : '#D1D5DB',
          lineHeight: 1.4,
          transition: 'color 0.15s',
        }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.7rem',
            color: '#4B5563',
            marginRight: '0.75rem',
          }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          {question}
        </span>

        <ChevronIcon open={isOpen} />
      </button>

      {/* Animated body */}
      <div
        ref={bodyRef}
        style={{
          overflow: 'hidden',
          maxHeight: isOpen ? '20rem' : '0',
          transition: 'max-height 0.32s ease',
        }}
      >
        <p style={{
          margin: 0,
          padding: '0 0 1.5rem',
          color: '#9CA3AF',
          fontSize: '0.9rem',
          lineHeight: 1.75,
          paddingLeft: '2.1rem',
        }}>
          {answer}
        </p>
      </div>
    </div>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      style={{
        flexShrink: 0,
        color: open ? '#E0E0E0' : '#6B7280',
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.28s ease, color 0.15s',
      }}
    >
      <path d="M4 7l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
