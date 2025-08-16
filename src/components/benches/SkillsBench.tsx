import { useEffect, useState } from 'react'
import { useCraftBenchContext } from '../../hooks/useCraftBenchContext'
import SkillSelect from '../SkillSelect'
import InputBox from '../ui/InputBox'

function SkillsBench () {
  const { folioConfig, setFolioConfig } = useCraftBenchContext()
  const defaultClass = 'w-full'

  // Local text state
  const [languagesText, setLanguagesText] = useState('')
  const [frameworksText, setFrameworksText] = useState('')
  const [toolsText, setToolsText] = useState('')

  // Sync local text when folioConfig changes externally
  const skills = folioConfig?.skills
  useEffect(() => {
  setLanguagesText((skills?.languages ?? []).filter(Boolean).join(', '))
  setFrameworksText((skills?.frameworks ?? []).filter(Boolean).join(', '))
  setToolsText((skills?.tools ?? []).filter(Boolean).join(', '))
  }, [skills?.languages, skills?.frameworks, skills?.tools])

  const parseList = (text: string) =>
    text
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)

  const commit = (key: 'languages' | 'frameworks' | 'tools', text: string) => {
    const list = parseList(text)
    setFolioConfig(prev =>
      prev
        ? {
            ...prev,
            skills: {
              ...prev.skills,
              [key]: list
            }
          }
        : prev
    )
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    key: 'languages' | 'frameworks' | 'tools',
    text: string
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      commit(key, text);
      (e.target as HTMLInputElement).blur()
    }
  }

  return (
    <div className='flex flex-col gap-4 mt-4'>
      <h2 className='text-xl md:text-4xl'>Skills</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='flex flex-col gap-4'>
          <InputBox
            label='Languages'
            value={languagesText}
            type='text'
            className={defaultClass}
            onChange={e => setLanguagesText(e.target.value)}
            onBlur={e => commit('languages', e.target.value)}
            onKeyDown={e => handleKeyDown(e, 'languages', languagesText)}
          />
          <InputBox
            label='Frameworks'
            value={frameworksText}
            type='text'
            className={defaultClass}
            onChange={e => setFrameworksText(e.target.value)}
            onBlur={e => commit('frameworks', e.target.value)}
            onKeyDown={e => handleKeyDown(e, 'frameworks', frameworksText)}
          />
          <InputBox
            label='Tools'
            value={toolsText}
            type='text'
            className={defaultClass}
            onChange={e => setToolsText(e.target.value)}
            onBlur={e => commit('tools', e.target.value)}
            onKeyDown={e => handleKeyDown(e, 'tools', toolsText)}
          />
        </div>
        <div className='hidden md:block'>
          <SkillSelect />
        </div>
      </div>
    </div>
  )
}

export default SkillsBench
