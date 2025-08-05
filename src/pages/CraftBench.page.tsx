import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useCraftBenchContext } from '../hooks/useCraftBenchContext'
import SkillsBench from '../components/benches/SkillsBench'
import WorkExperience from '../components/benches/WorkExperience'
import PersonalInformationBench from '../components/benches/PersonalInformationBench'
import ProjectsBench from '../components/benches/ProjectsBench'
import Button from '../components/ui/Button'

const CraftBenchPage = () => {
  const { craftBenchName } = useParams<{ craftBenchName: string }>()
  const { meta } = useCraftBenchContext()
  const [currTab, setCurrTab] = useState<number>(0)

  const tabs: { title: string; content: JSX.Element }[] = [
    {
      title: 'Personal Information',
      content: <PersonalInformationBench />
    },
    {
      title: 'Skills',
      content: <SkillsBench />
    },
    {
      title: 'Projects',
      content: <ProjectsBench />
    },
    {
      title: 'Work Experience',
      content: <WorkExperience />
    }
  ]

  return (
    <div
      className={`flex flex-col pt-6 md:pt-10 min-h-screen mb-6`}
    >
      <div className='flex items-center gap-2'>
        <img src={meta?.folioAvatar} className='w-12 rounded-full' alt='' />
        <div className='flex flex-col'>
          <h1 className='text-2xl text-white'>{craftBenchName}</h1>
          <p className='text-gray-300'>{meta?.folioName}</p>
        </div>
      </div>
      {/* <div className='flex space-x-4'>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-lg ${
              currTab === index
                ? 'bg-blue-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => setCurrTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div> */}
      <div>{tabs[currTab].content}</div>

      <div className='mt-6 flex justify-center gap-4 items-center '>
        {currTab > 0 && (
          <Button
            text='Prev'
            variant='warning'
            onClick={() => setCurrTab(currTab - 1)}
          />
        )}
        {currTab < tabs.length - 1 && (
          <Button
            text='Next'
            variant='primary'
            onClick={() => setCurrTab(currTab + 1)}
          />
        )}
        {currTab == tabs.length - 1 && (
          <Button
            text='Finish'
            variant='success'
            onClick={() => {
              console.log('Finish button clicked')
            }}
          />
        )}
      </div>
    </div>
  )
}

export default CraftBenchPage
