import { useMemo } from 'react'
import { useCraftBenchContext } from '../hooks/useCraftBenchContext'
import { defaultFolioConfig } from '../store/CraftBenchStore/CraftBenchContext'

const skills = {
  languages: ['JavaScript', 'TypeScript', 'Python', 'C++', 'Java', 'Rust'],
  frameworks: ['React', 'Express', 'Spring Boot', 'Next.js', 'Flutter', 'Django','Flask', 'React Native'],
  tools: ['Git & GitHub', 'Docker', 'Figma', 'Postman','Turborepo','MongoDB','SQL','PostgreSQL', 'Redis', 'AWS', 'Azure', 'Google Cloud'],
}

function SkillSelect () {
  const { setFolioConfig, folioConfig } = useCraftBenchContext()

  // Shuffle the combined items
  const shuffledItems = useMemo(() => {
    const combined = Object.entries(skills).flatMap(([category, items]) =>
      items.map(item => ({ category, item }))
    )
    return combined.sort(() => Math.random() - 0.5)
  }, [])

  function handleToggle (category: string, item: string) {
    setFolioConfig(prev => {
      if (!prev) {
        return {
          ...defaultFolioConfig,
          skills: {
            ...defaultFolioConfig.skills,
            [category as keyof typeof defaultFolioConfig.skills]: [item]
          }
        }
      }
      const key = category as keyof typeof prev.skills
      const existing = (prev.skills[key] || []) as string[]
      if (existing.includes(item)) {
        return {
          ...prev,
          skills: {
            ...prev.skills,
            [key]: existing.filter(s => s !== item)
          }
        }
      }
      return {
        ...prev,
        skills: {
          ...prev.skills,
          [key]: [...existing, item]
        }
      }
    })
  }

  return (
    <div>
      <p className='text-lg mb-2'>Popular on CraftBench tap to add!</p>
      <div className='flex flex-wrap gap-2'>
        {shuffledItems.map(({ category, item }) => {
          return (
            <SelectedAwareSkill
              key={`${category}:${item}`}
              category={category}
              item={item}
              onToggle={handleToggle}
              selected={
                !!folioConfig?.skills?.[
                  category as keyof typeof folioConfig.skills
                ]?.includes(item)
              }
            />
          )
        })}
      </div>
    </div>
  )
}

const SelectedAwareSkill: React.FC<{
  category: string
  item: string
  onToggle: (c: string, i: string) => void
  selected: boolean
}> = ({ category, item, onToggle, selected }) => {
  return (
    <div
      className={`px-3 py-1 rounded-lg border whitespace-nowrap cursor-pointer transition-colors text-sm ${
        selected
          ? 'bg-teal-600/30 border-teal-500 text-teal-200'
          : 'bg-[#181e24] border-[#363f43] hover:border-teal-500/60'
      }`}
      onClick={() => onToggle(category, item)}
    >
      {item}
    </div>
  )
}

export default SkillSelect
