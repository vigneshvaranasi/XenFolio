import githubLogo from '../assets/githubLogo.svg'
import { CraftBench } from '../types/mySpace'
import menuDots from '../assets/menuDots.svg'
import link from '../assets/link.svg'
import { useEffect, useRef, useState } from 'react'
import {
  deleteCraftBench,
  unpublishCraftBench
} from '../handler/mySpaceHandlers'
import toast from 'react-hot-toast'
import { downloadCode, publishFolio } from '../handler/craftBenchHandler'
import { RotatingLines } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { getRepoName } from '../utils/craftBenchUtils'
import { useUserContext } from '../hooks/useUserContext'
import Status from './ui/Status'
type CraftBenchCardProps = {
  bench: CraftBench
  username: string
  onRefresh: () => void
}

function CraftBenchCard (benchData: CraftBenchCardProps) {
  // console.log("CraftBenchCard rendered with:", benchData);
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { user } = useUserContext()

  useEffect(() => {
    function handleClickOutside (e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false)
      }
    }
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMenu])

  async function handleDelete (craftId: string) {
    const data = await deleteCraftBench(craftId)
    if (data.error) {
      toast.error(data.message || 'Failed to delete craft bench')
    } else {
      toast.success(data.message || 'Craft bench deleted successfully')
      benchData.onRefresh()
    }
  }
  async function handleUnpublish (craftId: string) {
    const data = await unpublishCraftBench(craftId)
    if (data.error) {
      toast.error(data.message || 'Failed to unpublish craft bench')
    } else {
      toast.success(data.message || 'Craft bench unpublished successfully')
      benchData.onRefresh()
    }
  }

  async function handlePublish (craftId: string) {
    await publishFolio(craftId)
    benchData.onRefresh()
  }

  const handleDownloadCode = async () => {
    try {
      if (benchData.bench.craftId) {
        const folioCode = await downloadCode(benchData.bench.craftId)
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
        a.download = `${benchData.bench.name}.html`
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
    }
  }

  return (
    <div
      className={`craftBenchCard relative
                bg-[#68686815] rounded-lg text-neutral-300                  
                hover:bg-[#68686811] hover:border-[#53535380]
                flex items-start justify-between w-full md:w-[49%]
                border border-[#242424] p-2
                transition-all-ease-in-out duration-300
                h-[100px]
                `}
    >
      <div className='flex flex-col w-full justify-between'>
        <div className='flex items-start justify-between'>
          <div className='flex items-center'>
            {/*Avatar */}
            <img
              src={
                benchData.bench.folioSelectedAvatar ||
                'https://avatars.githubusercontent.com/u/180741475?v=4'
              }
              className='w-8 h-8 rounded-full mr-3'
              alt=''
            />
            <div className='flex flex-col'>
              {/*CraftBench Name */}
              <Link
                to={`/craftbench/${benchData.bench.name}`}
                state={{
                  craftId: benchData.bench.craftId
                }}
                className='text-xl text-[#e6edf3] hover:underline cursor-pointer'
              >
                {benchData.bench.name}
              </Link>

              {/*Folio Selected */}
              <h2 className='text-sm text-[#e6edf3]'>
                {benchData.bench.folioSelectedName}
              </h2>
            </div>
          </div>
          {/*Menu */}
          <img
            src={menuDots}
            onClick={() => setShowMenu(prev => !prev)}
            className='w-8 mt-1 p-1 hover:bg-[#202020] hover:rounded-md'
            alt=''
          />

          {/* Dots Menue */}
          {showMenu && (
            <div
              ref={menuRef}
              className='absolute flex flex-col top-10 right-2 z-50 bg-[#202020] rounded-lg shadow-xl border border-[#222]'
            >
              {benchData.bench.status === 'published' ? (
                <div
                  onClick={() => {
                    handleUnpublish(benchData.bench.craftId)
                    setShowMenu(false)
                  }}
                  className='flex items-center hover:bg-[#181818] rounded-t-lg p-1'
                >
                  <p className='hover:bg-[#181818] cursor-pointer'>Unpublish</p>
                </div>
              ) : (
                <div
                  onClick={() => {
                    toast.promise(
                      handlePublish(benchData.bench.craftId),
                      {
                        loading:
                          'Publishing your Folio. This might take a few seconds.',
                        success: 'Your Folio is now published!',
                        error: 'Failed to publish your Folio. Please try again.'
                      },
                      {
                        style: {},
                        success: {
                          duration: 5000,
                          icon: '🔥'
                        },
                        loading: {
                          icon: (
                            <RotatingLines width='15' strokeColor='#ffffff' />
                          )
                        }
                      }
                    )
                    setShowMenu(false)
                  }}
                  className='flex items-center hover:bg-[#181818] rounded-t-lg p-1'
                >
                  <p className='hover:bg-[#181818] cursor-pointer'>Publish</p>
                </div>
              )}
              <Link
                className='hover:bg-[#181818] p-1'
                to={`/preview/${benchData.bench.craftId}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                Preview
              </Link>
              <div
                onClick={() => {
                  handleDownloadCode()
                  setShowMenu(false)
                }}
                className='flex items-center hover:bg-[#181818] p-1'
              >
                <p className='cursor-pointer'>Download</p>
              </div>
              <div
                onClick={() => {
                  handleDelete(benchData.bench.craftId)
                  setShowMenu(false)
                }}
                className='flex items-center hover:bg-[#181818] rounded-b-lg p-1'
              >
                <p className=' cursor-pointer text-red-500'>Delete</p>
              </div>
            </div>
          )}
        </div>

        <div className={`flex justify-between items-center w-full mt-2`}>
          <div className='flex items-center gap-2'>
            {/*Repo Link */}
            <div
              className={`rounded-full bg-[#1A1A1A] w-fit drop-shadow-[0_0_10px_#1A1A1A12] font-sans font-semibold border border-[#333538]
              ${benchData.bench.repoLink ? 'opacity-100' : 'opacity-50'}`}
            >
              <a target='_blank' href={`${benchData.bench.repoLink}`}>
                <div className='flex items-center p-1'>
                  <img src={githubLogo} className='w-4 h-4' alt='' />
                </div>
              </a>
            </div>
            {benchData.bench.status === 'published' && (
              <div
                className={`rounded-full bg-[#1A1A1A] w-fit drop-shadow-[0_0_10px_#1A1A1A12] font-sans font-semibold border border-[#333538]
              ${benchData.bench.repoLink ? 'opacity-100' : 'opacity-50'} p-1 px-2`}
              >
                <a
                  target='_blank'
                  href={`https://${user?.username}.github.io/${getRepoName(
                    benchData.bench.repoLink
                  )}`}
                  className='flex items-center gap-1'
                >
                  <img src={link} className='w-3' alt='' />
                  <p className='text-xs'>View Site</p>
                </a>
              </div>
            )}
          </div>
          {/* Status */}
          <div className='flex flex-col items-end'>
            <Status
              status={benchData.bench.status as 'inProgress' | 'published'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CraftBenchCard
