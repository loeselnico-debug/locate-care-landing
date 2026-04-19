import { useEffect, useRef } from 'react'

const CHARS = '0123456789ABCDEF'
const COLUMN_COUNT = 20

interface Column {
  x: number
  y: number
  speed: number
  chars: string[]
  opacity: number
}

export default function DataStream() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const colWidth = Math.floor(window.innerWidth / COLUMN_COUNT)

    const columns: Column[] = Array.from({ length: COLUMN_COUNT }, (_, i) => ({
      x:       i * colWidth + Math.random() * colWidth,
      y:       Math.random() * -window.innerHeight,
      speed:   0.3 + Math.random() * 0.7,
      chars:   Array.from({ length: 20 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]),
      opacity: 0.05 + Math.random() * 0.1,
    }))

    let rafId: number
    const fontSize = 13

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`

      columns.forEach(col => {
        col.y += col.speed
        if (col.y > canvas.height + col.chars.length * fontSize) {
          col.y = -col.chars.length * fontSize
          col.chars = col.chars.map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
        }

        col.chars.forEach((ch, i) => {
          const alpha = col.opacity * (1 - i / col.chars.length)
          ctx.fillStyle = `rgba(224,224,224,${alpha.toFixed(3)})`
          ctx.fillText(ch, col.x, col.y + i * fontSize)
        })

        // mutate one char per frame to give flicker
        const idx = Math.floor(Math.random() * col.chars.length)
        col.chars[idx] = CHARS[Math.floor(Math.random() * CHARS.length)]
      })

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        width: '100vw',
        height: '100vh',
      }}
    />
  )
}
