import React, { createContext } from 'react'
import { useState } from 'react'
import { FolioConfig, Meta } from '../../types/folioConfig'

export type CraftBenchContextType = {
  folioConfig: FolioConfig | null;
  setFolioConfig: React.Dispatch<React.SetStateAction<FolioConfig | null>>;
  clearCraftBench: () => void;
  
}


export const CraftBenchContext = createContext({
  folioConfig: null as FolioConfig | null,
  setFolioConfig: (()=>{}) as React.Dispatch<React.SetStateAction<FolioConfig | null>>,
  clearCraftBench: () => {},
  meta : null as Meta | null,
  setMeta: (()=>{}) as React.Dispatch<React.SetStateAction<Meta | null>>
})

export const CraftBenchProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [folioConfig, setFolioConfig] = useState<FolioConfig | null>(null);
  const [meta, setMeta] = useState<Meta | null>(null);


  const clearCraftBench = () => {
    setFolioConfig(null)
    setMeta(null)
  }
  return (
    <CraftBenchContext.Provider
      value={{ folioConfig, setFolioConfig, clearCraftBench, meta, setMeta }}
    >
      {children}
    </CraftBenchContext.Provider>
  )
}

export default CraftBenchProvider
