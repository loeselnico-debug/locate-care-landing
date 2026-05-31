import DataStream from './DataStream'
import CircuitNodes from './CircuitNodes'
import CosmicFlow from '../CosmicFlow'

export function BackgroundEffects() {
  return (
    <>
      <CosmicFlow />
      <DataStream />
      <CircuitNodes />
    </>
  )
}

export { DataStream, CircuitNodes, CosmicFlow }