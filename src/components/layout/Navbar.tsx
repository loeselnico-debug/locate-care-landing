import { useState } from 'react'

const SIGNUP_URL = import.meta.env.VITE_SIGNUP_URL ?? 'https://locate-home.vercel.app'

interface NavbarProps {
  accentColor?: string
}

export default function Navbar({ accentColor = '#E0E0E0' }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(5,5,5,0.80)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(224,224,224,0.08)',
      }}>
        <div style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '3.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, fontSize: '1.1rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              <span style={{ color: accentColor }}>LOCATE</span>
              <span style={{ color: '#fff' }}> CARE</span>
            </span>

            {/* Status badge */}
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              background: 'rgba(34,197,94,0.10)',
              border: '1px solid rgba(34,197,94,0.25)',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.65rem',
              color: '#22C55E',
              letterSpacing: '0.05em',
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#22C55E',
                boxShadow: '0 0 6px #22C55E',
                animation: 'nodePulse 2s ease-in-out infinite',
                display: 'inline-block',
              }} />
              EN LIGNE V1.0
            </span>
          </div>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
            <button onClick={() => scrollTo('features')} style={linkStyle}>Fonctionnalités</button>
            <button onClick={() => scrollTo('tarifs')} style={linkStyle}>Tarifs</button>
            <a href={SIGNUP_URL} style={{
              padding: '0.45rem 1.1rem',
              border: `1px solid ${accentColor}`,
              borderRadius: '0.375rem',
              color: accentColor,
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 600,
              fontSize: '0.85rem',
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(224,224,224,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              Créer mon compte
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="hamburger-btn"
            aria-label="Menu"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.25rem',
              color: '#E0E0E0',
            }}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: '3.5rem',
          left: 0,
          right: 0,
          zIndex: 49,
          background: 'rgba(5,5,5,0.97)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(224,224,224,0.1)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}>
          <button onClick={() => scrollTo('features')} style={{ ...linkStyle, textAlign: 'left', fontSize: '1rem' }}>Fonctionnalités</button>
          <button onClick={() => scrollTo('tarifs')} style={{ ...linkStyle, textAlign: 'left', fontSize: '1rem' }}>Tarifs</button>
          <a href={SIGNUP_URL} style={{
            padding: '0.75rem 1.25rem',
            border: `1px solid ${accentColor}`,
            borderRadius: '0.375rem',
            color: accentColor,
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 600,
            fontSize: '0.95rem',
            textDecoration: 'none',
            textAlign: 'center',
          }}>
            Créer mon compte
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: block !important; }
        }
      `}</style>
    </>
  )
}

const linkStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'Space Grotesk, sans-serif',
  fontSize: '0.875rem',
  color: '#9CA3AF',
  transition: 'color 0.15s',
  textDecoration: 'none',
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      {open ? (
        <>
          <line x1="4" y1="4" x2="18" y2="18" stroke="#E0E0E0" strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="4" x2="4" y2="18" stroke="#E0E0E0" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <line x1="3" y1="6"  x2="19" y2="6"  stroke="#E0E0E0" strokeWidth="2" strokeLinecap="round" />
          <line x1="3" y1="11" x2="19" y2="11" stroke="#E0E0E0" strokeWidth="2" strokeLinecap="round" />
          <line x1="3" y1="16" x2="19" y2="16" stroke="#E0E0E0" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}
