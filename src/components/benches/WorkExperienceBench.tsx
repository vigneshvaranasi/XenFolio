import { useEffect, useState } from 'react'
import NumberCounter from '../ui/NumberCounter'
import InputBox from '../ui/InputBox';
import { useCraftBenchContext } from '../../hooks/useCraftBenchContext';
import { WorkExperience } from '../../types/folioConfig';

function WorkExperienceBench() {
  const { folioConfig, setFolioConfig } = useCraftBenchContext();
  const experiencesCount = folioConfig?.workExperience?.length || 0;
  const [techStackTexts, setTechStackTexts] = useState<string[]>([])

  // Sync local text with config changes
  useEffect(() => {
  const texts = (folioConfig?.workExperience ?? []).map((w) => (w.techStack ?? []).filter(Boolean).join(', '))
    setTechStackTexts(texts)
  }, [folioConfig?.workExperience])

  const parseList = (text: string) =>
    text
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
  
  const addExperience = () => {
    setFolioConfig(prevConfig => {
      if (!prevConfig) return prevConfig;
      return {
        ...prevConfig,
        workExperience: [
          ...(prevConfig.workExperience || []),
          {
            role: "",
            company: "",
            techStack: [],
            description: "",
          }
        ]
      };
    });
    setTechStackTexts(prev => [...prev, ''])
  };

  const removeExperience = () => {
    if (experiencesCount > 0) {
      setFolioConfig(prevConfig => {
        if (!prevConfig || prevConfig.workExperience.length === 0) return prevConfig;
        return {
          ...prevConfig,
          workExperience: prevConfig.workExperience.slice(0, -1)
        };
      });
      setTechStackTexts(prev => prev.slice(0, -1))
    }
  };

  const updateExperience = (index: number, field: keyof WorkExperience[0], value: string | string[]) => {
    setFolioConfig(prevConfig => {
      if (!prevConfig) return prevConfig;
      const updatedExperiences = [...prevConfig.workExperience];
      updatedExperiences[index] = {
        ...updatedExperiences[index],
        [field]: value,
      };
      return {
        ...prevConfig,
        workExperience: updatedExperiences,
      };
    });
  };

  const commitTechStack = (index: number, text: string) => {
    const list = parseList(text)
    updateExperience(index, 'techStack' as keyof WorkExperience[0], list)
  }

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className={`flex items-center justify-between gap-2`}>
        <div className={`flex items-center justify-content-start gap-2`}>
          <h2 className='text-xl md:text-4xl'>Work Experience</h2>
          <div className="flex items-center gap-2">
            <NumberCounter
              count={experiencesCount}
              onIncrement={addExperience}
              onDecrement={removeExperience}
              variant="primary"
            />
          </div>
        </div>
        <div className={`border border-gray-300 opacity-0`}>
          Progress
        </div>
      </div>
      {folioConfig?.workExperience?.map((experience, index) => (
        <div key={index} className="">
          <h3 className="text-2xl">Experience {index + 1}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputBox
              label="Role"
              placeholder="Enter your role"
              type="text"
              className="w-full"
              value={experience.role}
              onChange={(e) => updateExperience(index, 'role', e.target.value)}
            />
            <InputBox
              label="Company"
              placeholder="Enter company name"
              type="text"
              className="w-full"
              value={experience.company}
              onChange={(e) => updateExperience(index, 'company', e.target.value)}
            />
            <InputBox
              label="Tech Stack"
              placeholder="Enter tech stack (comma separated)"
              type="text"
              className="w-full"
              value={techStackTexts[index] ?? experience.techStack.filter(Boolean).join(', ')}
              onChange={(e) => {
                const value = e.target.value
                setTechStackTexts(prev => {
                  const next = [...prev]
                  next[index] = value
                  return next
                })
              }}
              onBlur={(e) => commitTechStack(index, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  commitTechStack(index, techStackTexts[index] ?? '')
                  ;(e.target as HTMLInputElement).blur()
                }
              }}
            />
            <InputBox
              label="Description"
              placeholder="Enter job description"
              type="text"
              className="w-full"
              value={experience.description}
              onChange={(e) => updateExperience(index, 'description', e.target.value)}
            />
          </div>
        </div>
      ))}
      {
        experiencesCount === 0 && (
        <div
          className='flex flex-col items-center justify-center 
            border border-dashed border-white/20 
            bg-white/5 text-white/60 
            rounded-xl p-3 md:p-10 text-center 
            transition hover:bg-white/10 hover:text-white cursor-pointer'
            onClick={addExperience}
        >
            <div className="text-lg">💼 No experiences yet, Click to add</div>
        </div>
        )
      }
    </div>
  )
}

export default WorkExperienceBench