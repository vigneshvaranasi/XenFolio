import { useEffect } from 'react'
import { useUserContext } from '../hooks/useUserContext';
import CraftBenchCard from '../components/CraftBenchCard';
import { Link } from 'react-router-dom';

const MySpacePage = () => {
  let UserContext = useUserContext();

  let userData =
  {
    username: 'Vignesh',
    craftBenches: [
      {
        benchName: 'Craft Bench 1',
        folioName: 'Folio 1',
        repoName: 'Repo_1',
        status: 'published',
        folioAvatar: 'https://avatars.githubusercontent.com/u/180741475?v=4',
      },
      // {
      //   benchName: 'Craft Bench 2',
      //   folioName: 'Folio 2',
      //   repoName: 'Repo_2',
      //   status: 'inProgress',
      //   folioAvatar: 'https://avatars.githubusercontent.com/u/180741475?v=4',
      // }
    ]
  };
  useEffect(() => {
    console.log('MySpace: UserContext: ', UserContext);
  }, [UserContext])
  return (
    <div className='flex flex-col justify-center pt-10 md:pt-14'>
      <h1 className='text-3xl md:text-4xl mb-8'>
        Hey {UserContext.user ? UserContext.user.username : 'Guest'}!
      </h1>
      <div className='flex flex-col'>
        <h1 className='text-2xl mb-5' >Your Craft Benches</h1>
        <div className="flex flex-col md:flex-row items-stretch flex-wrap gap-2 w-full">
          {
            userData.craftBenches.map((bench, index) => {
              return (
                <CraftBenchCard key={index} bench={bench} username={userData.username} />
              )
            })
          }

          <Link to='/folios' className='md:w-[48%] flex justify-center items-center                 
               bg-[#68686811]  text-neutral-300                  
                hover:bg-[#68686811] hover:border-[#53535380]
                border border-[#242424] p-2 rounded-lg
                transition-all-ease-in-out duration-300 text-7xl'>

            +
        </Link>

        </div>
      </div>
    </div>
  )
}

export default MySpacePage


// {
//   "_id": "676ebafecac0d4cfec4f4c21",
//   "username": "pavan-rar",
//   "avatar": "https://avatars.githubusercontent.com/u/180741475?v=4",
//   "likes": [],
//   "craftBenches": [],
//   "lastLogin": "2024-12-27T14:51:39.475Z",
//   "createdOn": "2024-12-27T14:34:38.561Z",
//   "lastCreation": "2024-12-27T14:34:38.561Z",
//   "__v": 0
// }