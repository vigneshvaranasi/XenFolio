import { useCraftBenchContext } from '../../hooks/useCraftBenchContext'
import InputBox from '../ui/InputBox'

function SkillsBench () {
  const { folioConfig, setFolioConfig } = useCraftBenchContext()
  const defaultClass = 'w-full'
  return (
    <div className='flex flex-col gap-4 mt-4'>
      <h2 className='text-4xl'>Skills</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='flex flex-col gap-4'>
          <InputBox
            label='Languages'
            value={(folioConfig?.skills.languages ?? []).join(', ')}
            type='text'
            className={defaultClass}
            onChange={e =>
              setFolioConfig(prev =>
                prev
                  ? {
                      ...prev,
                      skills: {
                        ...prev.skills,
                        languages: e.target.value
                          .split(',')
                          .map(lang => lang.trim())
                      }
                    }
                  : prev
              )
            }
          />
          <InputBox
            label='Frameworks'
            value={(folioConfig?.skills.frameworks ?? []).join(', ')}
            type='text'
            className={defaultClass}
            onChange={e =>
              setFolioConfig(prev =>
                prev
                  ? {
                      ...prev,
                      skills: {
                        ...prev.skills,
                        frameworks: e.target.value
                          .split(',')
                          .map(framework => framework.trim())
                      }
                    }
                  : prev
              )
            }
          />
          <InputBox
            label='Tools'
            value={(folioConfig?.skills.tools ?? []).join(', ')}
            type='text'
            className={defaultClass}
            onChange={e =>
              setFolioConfig(prev =>
                prev
                  ? {
                      ...prev,
                      skills: {
                        ...prev.skills,
                        tools: e.target.value
                          .split(',')
                          .map(tool => tool.trim())
                      }
                    }
                  : prev
              )
            }
          />
        </div>
        <div className='hidden md:flex justify-center items-center'>
          <p>
            To Do Select Component
          </p>
        </div>
      </div>
    </div>
  )
}

export default SkillsBench
