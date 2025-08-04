import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Avatars from '../components/ui/Avatars'
import { useRef, useState } from 'react'
import Modal from '../components/ui/Modal'
import InputBox from '../components/ui/InputBox'
import { useUserContext } from '../hooks/useUserContext'
import { useCraftBenchContext } from '../hooks/useCraftBenchContext'
import { useNavigate } from "react-router-dom";


let foliosData = [
  {
    folioName: 'Folio 1',
    folioPreviewImage:
      'https://vigneshvaranasi.in/assets/TrackCode-B1EeffBo.png',
    creators: {
      developers: [
        {
          name: 'Developer 1',
          avatar: 'https://avatars.githubusercontent.com/u/121240801?v=4'
        },
        {
          name: 'Developer 2',
          avatar: 'https://avatars.githubusercontent.com/u/121240801?v=4'
        },
        {
          name: 'Developer 3',
          avatar: 'https://avatars.githubusercontent.com/u/121240801?v=4'
        }
      ],
      designers: [
        {
          name: 'Designer 1',
          avatar: 'https://avatars.githubusercontent.com/u/134832213?v=4'
        },
        {
          name: 'Designer 2',
          avatar: 'https://avatars.githubusercontent.com/u/121240801?v=4'
        },
        {
          name: 'Designer 3',
          avatar: 'https://avatars.githubusercontent.com/u/134832213?v=4'
        }
      ]
    },
    likes: ['user 1 ', 'user 2', 'user 3']
  },
  {
    folioName: 'Folio 2',
    folioPreviewImage:
      'https://vigneshvaranasi.in/assets/TrackCode-B1EeffBo.png',
    creators: {
      developers: [
        {
          name: 'Developer 1',
          avatar: 'https://avatars.githubusercontent.com/u/134832213?v=4'
        },
        {
          name: 'Developer 2',
          avatar: 'https://avatars.githubusercontent.com/u/121240801?v=4'
        },
        {
          name: 'Developer 3',
          avatar: 'https://avatars.githubusercontent.com/u/121240801?v=4'
        }
      ],
      designers: [
        {
          name: 'Designer 1',
          avatar: 'https://avatars.githubusercontent.com/u/121240801?v=4'
        },
        {
          name: 'Designer 2',
          avatar: 'https://avatars.githubusercontent.com/u/121240801?v=4'
        },
        {
          name: 'Designer 3',
          avatar: 'https://avatars.githubusercontent.com/u/134832213?v=4'
        }
      ]
    },
    likes: ['user 1 ', 'user 2', 'user 3']
  },
  {
    folioName: 'Folio 3',
    folioPreviewImage:
      'https://vigneshvaranasi.in/assets/TrackCode-B1EeffBo.png',
    creators: {
      developers: [
        {
          name: 'Developer 1',
          avatar: 'https://avatars.githubusercontent.com/u/134832213?v=4'
        },
        {
          name: 'Developer 2',
          avatar: 'https://avatars.githubusercontent.com/u/121240801?v=4'
        },
        {
          name: 'Developer 3',
          avatar: 'https://avatars.githubusercontent.com/u/121240801?v=4'
        }
      ],
      designers: [
        {
          name: 'Designer 1',
          avatar: 'https://avatars.githubusercontent.com/u/134832213?v=4'
        },
        {
          name: 'Designer 2',
          avatar: 'https://avatars.githubusercontent.com/u/121240801?v=4'
        },
        {
          name: 'Designer 3',
          avatar: 'https://avatars.githubusercontent.com/u/134832213?v=4'
        }
      ]
    },
    likes: ['user 1 ', 'user 2', 'user 3']
  }
]

let folioCreators: string[] = foliosData[0].creators.developers.map(
  folio => folio.avatar
)

const FolioViewPage = () => {
  const { folioName } = useParams<{ folioName: string }>();


  const [getThisModal, setGetThisModal] = useState(false)

  const { user } = useUserContext()
  const { setMeta } = useCraftBenchContext();
  const navigate = useNavigate();

  function handleCreateCraftBench () {
    if (craftBenchNameRef.current) {
      if (craftBenchNameRef.current.value.trim() === '') {
        alert('Please enter a valid Craft Bench Name')
        return
      }
      setMeta({
        folioName: folioName ?? '',
        folioAvatar: 'https://avatars.githubusercontent.com/u/121240801?v=4',
        craftName: craftBenchNameRef.current.value,
        status: 'inProgress'
      })
      setGetThisModal(false)
      navigate(`/craftbench/${craftBenchNameRef.current.value.split(' ').join('')}`)
    }
  }

  const craftBenchNameRef = useRef<HTMLInputElement>(null)

  // useContext to get foliosData
  let currFolio = foliosData.find(folio => {
    let currFolioName = folio.folioName.split(' ').join('')
    return currFolioName === folioName
  })

  // console.log("Hello, folioName:", folioName);

  return (
    <>
      <div className='pt-4 md:pt-6'>
        <div className='flex flex-row justify-between w-full mb-2'>
          <div className='flex flex-col'>
            <p className='text-3xl md:text-2xl mb-2'>
              <Link className='font-light' to='/folios'>
                Folios{' '}
              </Link>
              <span className='font-light text-gray-500'>/</span>
              <span className='pl-2 font-medium'>{folioName}</span>
            </p>
            <div className='flex gap-2'>
              <Button
                text='Get This'
                variant='secondary'
                className='text-white'
                onClick={() => {
                  setGetThisModal(true)
                }}
              />
              <Button
                text='Preview'
                variant='secondary'
                className='text-white'
              />
            </div>
          </div>
        </div>
        <div className='flex md:justify-end text-lg mb-2'>
          <Avatars images={folioCreators} variant='elastic' />
        </div>
        <iframe
          className='w-full bg-white h-[60vh] md:h-[65vh] rounded-t-lg'
          src='https://askitengine.centralindia.cloudapp.azure.com/'
        ></iframe>
      </div>
      <Modal isOpen={getThisModal} onClose={() => setGetThisModal(false)}>
        <div className='flex flex-col gap-4'></div>
        <InputBox
          key={'folioName'}
          ref={craftBenchNameRef}
          label='Craft Bench Name'
        />
        <div className='flex justify-between'>
          <Button
            text='Create New'
            variant='secondary'
            className='text-white'
            onClick={() => {
              handleCreateCraftBench()
            }}
          />
          {!user?.isRecentConfig && (
            <Button
              text='Use Recent Config'
              variant='secondary'
              className='text-white'
              onClick={() => console.log('Continue with Recent Config')}
            />
          )}
        </div>
      </Modal>
    </>
  )
}

export default FolioViewPage
