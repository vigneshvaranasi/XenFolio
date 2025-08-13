import { useEffect, useState } from 'react'
import { useUserContext } from '../hooks/useUserContext';
import CraftBenchCard from '../components/CraftBenchCard';
import { Link } from 'react-router-dom';
import { getAllCraftBenches } from '../handler/mySpaceHandlers';
import { CraftBench } from '../types/mySpace';

const MySpacePage = () => {
  let UserContext = useUserContext();
  const { user } = UserContext;
  const [allCraftBenches, setAllCraftBenches] = useState<CraftBench[]>([]);

  async function fetchCraftBenches() {
    const benches = await getAllCraftBenches();
    setAllCraftBenches(benches);
  }
  useEffect(()=>{
    fetchCraftBenches();
  }, [])

  return (
    <div className='flex flex-col justify-center pt-10 md:pt-14 pb-6'>
      <h1 className='text-2xl mb-8'>
        Hey {UserContext.user ? UserContext.user.username : 'Guest'}!
      </h1>
      <div className='flex flex-col'>
        <h1 className='text-lg mb-2' >Your Craft Benches</h1>
        <div className="flex flex-col md:flex-row items-stretch flex-wrap gap-2 w-full">
          {
            allCraftBenches.map((bench:CraftBench, index) => {
              return (
                <CraftBenchCard key={index} bench={bench} username={user?.username ?? 'Guest'} onRefresh={fetchCraftBenches} />
              )
            })
          }
          <Link to='/folios' className='md:w-[49%] flex justify-center items-center                 
               bg-[#68686811]  text-neutral-300                  
                hover:bg-[#68686811] hover:border-[#53535380]
                border border-[#242424] p-2 rounded-lg
                transition-all-ease-in-out duration-300 text-3xl h-[100px]'>
            +
        </Link>

        </div>
      </div>
    </div>
  )
}

export default MySpacePage