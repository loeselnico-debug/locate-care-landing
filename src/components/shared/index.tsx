import DataStream from './DataStream'
import CircuitNodes from './CircuitNodes'

export function BackgroundEffects() {
  return (
    <>
      <DataStream />
      <CircuitNodes />
    </>
  )
}

export { DataStream, CircuitNodes }
