import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useCraftBenchContext } from '../hooks/useCraftBenchContext'

const CraftBenchPage = () => {
  const { craftBenchName } = useParams<{ craftBenchName: string }>()
  const { setMeta, meta } = useCraftBenchContext()

  return (
    <div className={`font-afacad flex flex-col justify-center pt-4 md:pt-6`}>
      <div className='flex flex-col mb-6'>
        <h1 className='text-2xl font-bold text-white mb-2'>
          Craft Bench: {craftBenchName}
        </h1>
        <p className='text-gray-300'>
          {meta?.folioName}
        </p>
      </div>
      <div>
        <div>Personal Information</div>
        <div>Skills</div>
        <div>Projects</div>
        <div>Work Experience</div>
      </div>
    </div>
  )
}

export default CraftBenchPage
