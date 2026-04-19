import './index.css'
import { BackgroundEffects } from './components/shared'
import { Navbar, Footer } from './components/layout'
import {
  Hero,
  PainPoints,
  SolutionBridge,
  Features,
  SocialProof,
  Pricing,
  FAQ,
  CTAFinal,
} from './components/sections'

function App() {
  return (
    <div style={{ position: 'relative', minHeight: '100dvh', background: '#050505', color: '#fff', overflowX: 'hidden' }}>
      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
        <main>
          <Hero />
          <PainPoints />
          <SolutionBridge />
          <Features />
          <SocialProof />
          <Pricing />
          <FAQ />
          <CTAFinal />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
