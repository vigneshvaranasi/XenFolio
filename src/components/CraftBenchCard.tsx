import githubLogo from '../assets/githubLogo.svg'
import { CraftBench } from '../types/mySpace'
import menuDots from '../assets/menuDots.svg'
import unpublishImg from '../assets/unpublish.svg'
import trash from '../assets/trash.svg'
import link from '../assets/link.svg'
import { useEffect, useRef, useState } from 'react'
import {
  deleteCraftBench,
  unpublishCraftBench
} from '../handler/mySpaceHandlers'
import toast from 'react-hot-toast'
import { publishFolio } from '../handler/craftBenchHandler'
import { RotatingLines } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { getRepoName } from '../utils/craftBenchUtils'
import { useUserContext } from '../hooks/useUserContext'
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
                  <img src={unpublishImg} className='w-4' alt='' />
                  <p className='hover:bg-[#181818] cursor-pointer'>Unpublish</p>
                </div>
              ) : (
                <div
                  onClick={() => {
                    toast.promise(
                      handlePublish(benchData.bench.craftId),
                      {
                        loading: 'Publishing your Folio...',
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
              <div
                onClick={() => {
                  handleDelete(benchData.bench.craftId)
                  setShowMenu(false)
                }}
                className='flex items-center hover:bg-[#181818] rounded-b-lg p-1'
              >
                <img src={trash} className='w-4' alt='' />
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
              ${benchData.bench.repoLink ? 'opacity-100' : 'opacity-50'} p-1`}
              >
                <a
                  target='_blank'
                  href={`https://${user?.username}.github.io/${getRepoName(
                    benchData.bench.repoLink
                  )}`}
                >
                  <img src={link} className='w-4' alt='' />
                </a>
              </div>
            )}
          </div>
          {/* Status */}
          <div className='flex flex-col items-end'>
            {benchData.bench.status === 'published' ? (
              <h2 className='bg-[#2c583f] rounded-full px-2 text-[#050e05] flex justify-evenly items-center text-sm'>
                <span className='bg-[#289d65] w-3 h-3 rounded-full border border-[#289d659a] mr-1'></span>
                {benchData.bench.status}
              </h2>
            ) : (
              <h2 className='bg-[#8a622d] rounded-full px-2 text-[#0c0801] flex justify-evenly items-center text-sm'>
                <span className='bg-[#cf8e1c] w-3 h-3 rounded-full border border-[#cf8e1c9a] mr-1'></span>
                {benchData.bench.status}
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CraftBenchCard
