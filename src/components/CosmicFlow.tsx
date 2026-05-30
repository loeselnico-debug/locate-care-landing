// ==========================================
// 📂 FICHIER : \src\components\CosmicFlow.tsx
// ==========================================
// INFORMATION GHOST/MOCK : Aucun mock, aucun ghost. 
// Animation 100% native via Canvas API et requestAnimationFrame.
// ==========================================

import { useEffect, useRef } from 'react'

export default function CosmicFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    // Adaptation dynamique à la taille de l'écran
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    resize()

    // Boucle de rendu
    const draw = () => {
      time += 0.003 // Vitesse d'évolution globale (douceur du mouvement)
      
      // Fond de base
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Fonction utilitaire pour dessiner les nébuleuses (orbs cosmiques)
      const drawNebula = (x: number, y: number, radius: number, colorStart: string) => {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, colorStart)
        gradient.addColorStop(1, 'rgba(5, 5, 5, 0)') // Se fond dans le background #050505
        
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      // Nébuleuse 1 : Rose Gold (Couleur accentuée)
      const x1 = canvas.width / 2 + Math.cos(time) * canvas.width * 0.35
      const y1 = canvas.height / 2 + Math.sin(time * 0.7) * canvas.height * 0.3
      drawNebula(x1, y1, canvas.width * 0.55, 'rgba(230, 199, 194, 0.12)') // #E6C7C2 avec opacité

      // Nébuleuse 2 : Blanc (Luminosité)
      const x2 = canvas.width / 2 + Math.sin(time * 1.1) * canvas.width * 0.4
      const y2 = canvas.height / 2 + Math.cos(time * 0.8) * canvas.height * 0.4
      drawNebula(x2, y2, canvas.width * 0.45, 'rgba(255, 255, 255, 0.06)')

      // Nébuleuse 3 : Rose Gold (Soutien pour la profondeur)
      const x3 = canvas.width / 2 + Math.sin(time * 0.5) * canvas.width * 0.2
      const y3 = canvas.height / 2 + Math.cos(time * 1.3) * canvas.height * 0.5
      drawNebula(x3, y3, canvas.width * 0.6, 'rgba(230, 199, 194, 0.08)')

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    // Nettoyage lors du démontage du composant
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        // Fusion douce avec les éléments en dessous si nécessaire
        mixBlendMode: 'screen', 
        opacity: 0.8
      }}
    />
  )
}