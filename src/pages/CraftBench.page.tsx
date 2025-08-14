import { useLocation, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useCraftBenchContext } from '../hooks/useCraftBenchContext'
import SkillsBench from '../components/benches/SkillsBench'
import PersonalInformationBench from '../components/benches/PersonalInformationBench'
import ProjectsBench from '../components/benches/ProjectsBench'
import Button from '../components/ui/Button'
import WorkExperienceBench from '../components/benches/WorkExperienceBench'
import {
  createCraftBench,
  downloadCode,
  getCraftBench,
  publishFolio,
  updateCraftBench
} from '../handler/craftBenchHandler'
import Modal from '../components/ui/Modal'
import toast from 'react-hot-toast'
import { unpublishCraftBench } from '../handler/mySpaceHandlers'
import { RotatingLines } from 'react-loader-spinner'
import { defaultFolioConfig } from '../store/CraftBenchStore/CraftBenchContext'

const CraftBenchPage = () => {
  const { craftBenchName } = useParams<{ craftBenchName: string }>()
  const location = useLocation()
  const stateObject = location.state as any
  const [craftId, setCraftId] = useState<string | null>(
    stateObject?.craftId || null
  )

  async function autoFillFolioConfig (craftId: string) {
    const data = await getCraftBench(craftId)
    console.log('data: ', data)
    setFolioConfig(data.craftBench.currentConfig)
    setMeta({
      ...data.craftBench.meta,
      craftId: data.craftBench._id,
      craftName: data.craftBench.craftName,
      folioAvatar: data.craftBench.folioSelected.folioAvatar,
      folioName: data.craftBench.folioSelected.folioName
    })
  }
  useEffect(() => {
    // Only update when navigation state changes to avoid re-render loops
    const nextId = stateObject?.craftId ?? null
    setCraftId(prev => (prev !== nextId ? nextId : prev))
    if (nextId) {
      autoFillFolioConfig(nextId)
    }
  }, [stateObject])

  const { meta, folioConfig, setFolioConfig, setMeta } = useCraftBenchContext()
  const [currTab, setCurrTab] = useState<number>(0)
  const [finishCraftBenchModal, setFinishCraftBenchModal] =
    useState<boolean>(false)

  const [finishLoading, setFinishLoading] = useState<boolean>(false)
  const [downloadLoading, setDownloadLoading] = useState<boolean>(false)
  const [publishLoading, setPublishLoading] = useState<boolean>(false)

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
      setFolioConfig(defaultFolioConfig)
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
    setFinishLoading(true)
    try {
      console.log('Finish button clicked')
      const finishCraftBench = await createCraftBench(meta, folioConfig)
      if (finishCraftBench) {
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
        toast.success('Hurray! Your Craft Bench has been created.')
        setFinishCraftBenchModal(true)
      } else {
        toast.error('Oh-oh! Your Craft Bench could not be created.')
      }
      console.log(finishCraftBench)
    } catch (error) {
      toast.error('Oh-oh! Your Craft Bench could not be created.')
      console.error('Error creating Craft Bench:', error)
    } finally {
      setFinishLoading(false)
    }
  }

  async function handleUnpublish (craftId: string) {
    const data = await unpublishCraftBench(craftId)
    if (data.error) {
      toast.error(data.message || 'Failed to unpublish craft bench')
      return false
    } else {
      toast.success(
        data.message || 'Craft bench unpublished, waiting to update'
      )
      return true
    }
  }

  const handleUpdate = async () => {
    if (!craftId) {
      toast.error('Craft ID is not defined, cannot update.')
      return
    }
    const didUnpublish = await handleUnpublish(craftId)
    if (!didUnpublish) {
      return
    }

    const isUpdated = await updateCraftBench(craftId, folioConfig)
    if (!isUpdated) {
      throw new Error('Craft Bench could not be updated')
    }
    setFinishCraftBenchModal(true);
  }

  const handleDownloadCode = async () => {
    setDownloadLoading(true)
    try {
      if (meta?.craftId) {
        const folioCode = await downloadCode(meta.craftId)
        if (typeof folioCode !== 'string') {
          console.error(
            'folioCode is not a string, received:',
            typeof folioCode
          )
          return
        }
        const blob = new Blob([folioCode], { type: 'text/html' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${craftBenchName}.html`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        toast.success('Code downloaded successfully')
      } else {
        throw new Error('craftId is undefined, cannot download code.')
      }
    } catch (err: any) {
      toast.error('Oh-oh! The Craft Bench could not be downloaded.')
      console.error('Error downloading code:', err)
    } finally {
      setDownloadLoading(false)
    }
  }

  const handlePublishToGitHub = async () => {
    setPublishLoading(true)
    try {
      if (meta?.craftId === undefined) {
        console.error('craftId is undefined, cannot publish to GitHub.')
        throw new Error('No Craft Id, Restart CraftBench')
      }
      const publishStatus = await publishFolio(meta?.craftId)
      if (publishStatus.error) {
        console.error('Error publishing to GitHub:', publishStatus.message)
        throw new Error(publishStatus.message)
      } else {
        toast.success('Your Folio is live at ' + publishStatus.folioURL)
        console.log(publishStatus)
      }
    } catch (err: any) {
      toast.error('Oh-oh! There was an error publishing to GitHub.')
      console.error('Error publishing to GitHub:', err)
    } finally {
      setPublishLoading(false)
      setFinishCraftBenchModal(false)
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
            <Button
              text={`${craftId ? 'Update' : 'Finish'}`}
              variant='success'
              onClick={() => {
                if (craftId) {
                  toast.promise(
                    handleUpdate(),
                    {
                      loading: 'Updating Craft Bench...',
                      success: 'CraftBench Updated Successfully',
                      error: 'CraftBench could not be updated'
                    },
                    {
                      success: {
                        duration: 5000,
                        icon: '🔥'
                      },
                      loading: {
                        icon: <RotatingLines width='15' strokeColor='#ffffff' />
                      }
                    }
                  )
                } else {
                  handleFinish()
                }
              }}
              loading={finishLoading}
            />
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
              loading={downloadLoading}
            />
            <Button
              text='Publish to GitHub'
              variant='warning'
              onClick={() => {
                handlePublishToGitHub()
              }}
              loading={publishLoading}
            />
          </div>
        </Modal>
      )}
    </>
  )
}

export default CraftBenchPage
