import { CraftBenchContext } from "../store/CraftBenchStore/CraftBenchContext" 
import { useContext } from 'react'

export const useCraftBenchContext = () => {
  const context = useContext(CraftBenchContext)
  if (!context) {
    throw new Error('useCraftBench must be used within a CraftBenchProvider')
  }
  return context
}