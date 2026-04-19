import { useEffect, useRef } from 'react'

export default function SolutionBridge() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          const el = ref.current
          if (!el) return
          el.style.opacity = '1'
          el.style.transform = 'scaleX(1)'
          observer.disconnect()
        })
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ background: '#050505', padding: '0 1.5rem' }}>
      <div
        ref={ref}
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          borderTop: '1px solid rgba(224,224,224,0.12)',
          borderBottom: '1px solid rgba(224,224,224,0.12)',
          padding: '1.75rem 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          opacity: 0,
          transform: 'scaleX(0.92)',
          transformOrigin: 'center',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(224,224,224,0.20))' }} />
        <p style={{
          margin: 0,
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(0.95rem, 2vw, 1.25rem)',
          color: '#E0E0E0',
          textAlign: 'center',
          whiteSpace: 'nowrap',
          textShadow: '0 0 28px rgba(224,224,224,0.35)',
          letterSpacing: '-0.01em',
        }}>
          La solution existe. Elle s'appelle{' '}
          <span style={{
            background: 'linear-gradient(90deg, #E0E0E0, #fff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            LOCATE CARE.
          </span>
        </p>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(224,224,224,0.20))' }} />
      </div>
    </div>
  )
}
