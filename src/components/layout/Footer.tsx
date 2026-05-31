export default function Footer() {
  return (
    <footer style={{
      background: '#050505',
      borderTop: '1px solid rgba(224,224,224,0.08)',
      padding: '3rem 1.5rem 2rem',
    }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>

        {/* Top row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', justifyContent: 'space-between', marginBottom: '2.5rem' }}>

          {/* Brand */}
          <div style={{ maxWidth: '22rem' }}>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, fontSize: '1.1rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              <span style={{ color: '#E0E0E0' }}>LOCATE</span>
              <span style={{ color: '#fff' }}> CARE</span>
            </div>
            <p style={{ color: '#6B7280', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
              Vos données médicales ne quittent jamais votre téléphone.
            </p>
            <p style={{ marginTop: '0.75rem', color: '#4B5563', fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace' }}>
              Front-end uniquement. Aucune base de données client sur le cloud.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
            <div>
              <p style={{ color: '#E0E0E0', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Légal</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a href="/cgu" style={footerLinkStyle}>CGU</a>
                <a href="/confidentialite" style={footerLinkStyle}>Politique de confidentialité</a>
                <a href="https://locate-systems.com" target="_blank" rel="noopener noreferrer" style={footerLinkStyle}>locate-systems.com</a>
              </div>
            </div>

            <div>
              <p style={{ color: '#E0E0E0', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Réseaux</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a href="https://linkedin.com/company/locate-systems" target="_blank" rel="noopener noreferrer" style={footerLinkStyle}>LinkedIn — Locate Systems</a>
                <a href="https://instagram.com/nicolas_loesel" target="_blank" rel="noopener noreferrer" style={footerLinkStyle}>Instagram — @nicolas_loesel</a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(224,224,224,0.06)', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <p style={{ color: '#4B5563', fontSize: '0.75rem', margin: 0 }}>
              © 2026 Nicolas Loesel EI — SIRET 101 891 190 00015 — APE 6201Z
            </p>
            <p style={{ color: '#374151', fontSize: '0.7rem', margin: 0 }}>
              209 rue Jacques Brel, 30730 FONS, France
            </p>
          </div>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.25rem 0.7rem',
            background: 'rgba(224,224,224,0.04)',
            border: '1px solid rgba(224,224,224,0.10)',
            borderRadius: '0.25rem',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.65rem',
            color: '#6B7280',
          }}>
            🔒 IP protégée — Dépôt e-Soleau DSO2026012471
          </span>
        </div>

      </div>
    </footer>
  )
}

const footerLinkStyle: React.CSSProperties = {
  color: '#6B7280',
  fontSize: '0.85rem',
  textDecoration: 'none',
  transition: 'color 0.15s',
}
