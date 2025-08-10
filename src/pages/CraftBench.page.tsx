import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useCraftBenchContext } from '../hooks/useCraftBenchContext'
import SkillsBench from '../components/benches/SkillsBench'
import PersonalInformationBench from '../components/benches/PersonalInformationBench'
import ProjectsBench from '../components/benches/ProjectsBench'
import Button from '../components/ui/Button'
import WorkExperienceBench from '../components/benches/WorkExperienceBench'
import { createCraftBench, downloadCode } from '../handler/craftBenchHandler'
import Modal from '../components/ui/Modal'

const CraftBenchPage = () => {
  const { craftBenchName } = useParams<{ craftBenchName: string }>()
  const { meta, folioConfig, setFolioConfig, setMeta } = useCraftBenchContext()
  const [currTab, setCurrTab] = useState<number>(0)
  const [finishCraftBenchModal, setFinishCraftBenchModal] =
    useState<boolean>(false)

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const message =
        'Are you sure you want to leave? Your changes may not be saved.'
      e.preventDefault()
      e.returnValue = message
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      setFolioConfig(null)
      setMeta(null)
    }
  }, [])

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
      content: <WorkExperienceBench />
    }
  ]

  const handleFinish = async () => {
    try {
      console.log('Finish button clicked')
      setFinishCraftBenchModal(true)
      const finishCraftBench = await createCraftBench(folioConfig, meta)
      console.log('finishCraftBench: ', finishCraftBench)
      if (finishCraftBench) {
        console.log('Craft Bench created successfully')
        setMeta({
          craftId: finishCraftBench.craftId,
          folioId: meta?.folioId ?? '',
          folioName: meta?.folioName ?? '',
          folioAvatar: meta?.folioAvatar ?? '',
          craftName: meta?.craftName ?? '',
          repoLink: meta?.repoLink ?? '',
          status: meta?.status ?? 'inProgress',
          createdAt: meta?.createdAt ?? '',
          lastUpdated: meta?.lastUpdated ?? ''
        })
      } else {
        console.log('Craft Bench creation failed')
      }
      console.log(finishCraftBench)
    } catch (error) {
      console.error('Error creating Craft Bench:', error)
    }
  }

  const handleDownloadCode = async () => {
    if (meta?.craftId) {
      const folioCode = await downloadCode(meta.craftId);
      if (typeof folioCode !== 'string') {
        console.error('folioCode is not a string, received:', typeof folioCode);
        return;
      }
      const blob = new Blob([folioCode], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${craftBenchName}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      console.log('Code downloaded successfully');
      setFinishCraftBenchModal(false);
    } else {
      console.error('craftId is undefined, cannot download code.')
    }
  }

  return (
    <>
      <div className={`flex flex-col pt-6 md:pt-10 min-h-screen mb-6`}>
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
            <Button text='Finish' variant='success' onClick={handleFinish} />
          )}
        </div>
      </div>
      {finishCraftBenchModal && (
        <Modal
          isOpen={finishCraftBenchModal}
          onClose={() => setFinishCraftBenchModal(false)}
          title='Craft Bench Created'
        >
          <div className='flex gap-4'>
            <Button
              text='Download Code'
              variant='primary'
              onClick={() => {
                handleDownloadCode()
              }}
            />
            <Button
              text='Publish to GitHub'
              variant='warning'
              onClick={() => {
                // Logic to publish to GitHub
                console.log('Publish to GitHub clicked')
                setFinishCraftBenchModal(false)
              }}
            />
          </div>
        </Modal>
      )}
    </>
  )
}

export default CraftBenchPage
