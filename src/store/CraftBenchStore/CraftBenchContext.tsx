import React, { createContext } from 'react'
import { useState } from 'react'
import { FolioConfig, Meta } from '../../types/folioConfig'

export type CraftBenchContextType = {
  folioConfig: FolioConfig | null;
  setFolioConfig: React.Dispatch<React.SetStateAction<FolioConfig | null>>;
  clearCraftBench: () => void;
}


export const defaultFolioConfig: FolioConfig = {
  personalInformation: {
    name: '',
    email: '',
    bio: '',
    about: '',
    githubLink: '',
    linkedinLink: '',
    twitterLink: '',
    resumeLink: ''
  },
  skills: {
    languages: [],
    tools: [],
    frameworks: []
  },
  projects: [],
  workExperience: []
}

export const CraftBenchContext = createContext<{
  folioConfig: FolioConfig | null;
  setFolioConfig: React.Dispatch<React.SetStateAction<FolioConfig | null>>;
  clearCraftBench: () => void;
  meta: Meta | null;
  setMeta: React.Dispatch<React.SetStateAction<Meta | null>>;
}>({
  folioConfig: defaultFolioConfig,
  setFolioConfig: (()=>{}) as React.Dispatch<React.SetStateAction<FolioConfig | null>>,
  clearCraftBench: () => {},
  meta : null,
  setMeta: (()=>{}) as React.Dispatch<React.SetStateAction<Meta | null>>
})

export const CraftBenchProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [folioConfig, setFolioConfig] = useState<FolioConfig | null>(
    defaultFolioConfig
  );
  const [meta, setMeta] = useState<Meta | null>(null);


  const clearCraftBench = () => {
    setFolioConfig(defaultFolioConfig)
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
