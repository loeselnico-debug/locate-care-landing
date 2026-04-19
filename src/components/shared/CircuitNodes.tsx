const NODES = [
  { top: '12%',  left: '8%',   delay: '0s',    duration: '3.2s' },
  { top: '34%',  left: '88%',  delay: '0.8s',  duration: '2.7s' },
  { top: '58%',  left: '15%',  delay: '1.4s',  duration: '4.1s' },
  { top: '75%',  left: '72%',  delay: '0.3s',  duration: '3.6s' },
  { top: '20%',  left: '55%',  delay: '2.1s',  duration: '2.9s' },
  { top: '88%',  left: '38%',  delay: '1.7s',  duration: '3.8s' },
  { top: '48%',  left: '92%',  delay: '0.6s',  duration: '4.4s' },
]

export default function CircuitNodes() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      {NODES.map((node, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            top: node.top,
            left: node.left,
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'rgba(224,224,224,0.5)',
            boxShadow: '0 0 8px 2px rgba(224,224,224,0.3)',
            animation: `nodePulse ${node.duration} ${node.delay} ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  )
}
