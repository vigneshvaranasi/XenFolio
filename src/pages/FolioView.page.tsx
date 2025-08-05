import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Avatars from '../components/ui/Avatars'
import { useEffect, useRef, useState } from 'react'
import Modal from '../components/ui/Modal'
import InputBox from '../components/ui/InputBox'
import { useUserContext } from '../hooks/useUserContext'
import { useCraftBenchContext } from '../hooks/useCraftBenchContext'
import { useNavigate } from "react-router-dom";
import { getAvatarByUsername, getFolioByName } from '../handler/folioHandlers'
import { Folio } from '../types/folioConfig'

const FolioViewPage = () => {
  const { folioName } = useParams<{ folioName: string }>();
  const [currFolio,setCurrFolio] = useState<Folio|null>(null);
  const [creators, setCreators] = useState<{
    githubUsername: string;
    avatarUrl: string;
  }[]>([]);

  useEffect(()=>{
    if(!folioName) {
      console.error('Folio name is not provided');
      return;
    }else{
      getFolioByName(folioName).then(folio => {
        setCurrFolio(folio);
        let creatorAvatars = folio.creator.developedBy.map((user:any) => getAvatarByUsername(user.githubUsername));
        Promise.all(creatorAvatars).then(avatars => {
          
          setCreators(avatars.map((avatar, index) => ({
            githubUsername: folio.creator.developedBy[index].githubUsername,
            avatarUrl: avatar
          })));
        });
      });
    }
  },[folioName])


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
        folioName: currFolio?.folioName || folioName || "",
        folioAvatar: currFolio?.folioAvatar || '',
        craftName: craftBenchNameRef.current.value,
        status: 'inProgress',
        folioId: currFolio?._id || '',
      })
      setGetThisModal(false)
      navigate(`/craftbench/${craftBenchNameRef.current.value.split(' ').join('')}`)
    }
  }

  const craftBenchNameRef = useRef<HTMLInputElement>(null)

  // useContext to get foliosData
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
          <Avatars creators={creators} variant='elastic' />
        </div>
        <iframe
          className='w-full bg-white h-[60vh] md:h-[65vh] rounded-t-lg'
          src={currFolio?.previewLink}
        ></iframe>
      </div>
      <Modal isOpen={getThisModal} onClose={() => setGetThisModal(false)}>
        <InputBox
          key={'folioName'}
          ref={craftBenchNameRef}
          label='Craft Bench Name'
        />
        <div className='flex justify-between mt-2'>
          <Button
            text='Create New'
            variant='secondary'
            className='text-white'
            onClick={() => {
              handleCreateCraftBench()
            }}
          />
          {user?.isRecentConfig && (
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
