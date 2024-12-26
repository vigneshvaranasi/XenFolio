// import githubLogo from '../assets/githubLogo.svg'
import { Link } from 'react-router-dom'
import { useUserContext } from '../hooks/useUserContext'
import ProfileButton from './ProfileButton'

function Navbar() {

  const UserContext = useUserContext();

  return (
    <div
      className={`
              bg-navBar border border-[#363F43]
              flex flex-row justify-between items-center
              px-4 py-2 sticky top-4 z-100 w-11/12 md:w-8/12 mx-auto
              backdrop-blur-lg rounded-lg backdrop-brightness-100 font-afacad
            `}
    >
      <Link to='/'>
        <div className={`opacity-100 text-white text-2xl hover:text-neutral-200`}>CreateFolio</div>
      </Link>

      <div className='flex flex-row items-center gap-4'>
        <Link to='folios' className='text-lg'>
          Folios
        </Link>

        {
          UserContext.isLoggedIn ?
            <Link to='myspace' className='text-lg'>
              <ProfileButton username={UserContext.user?.username!} avatar_url={UserContext.user?.avatar_url!} ></ProfileButton>
            </Link>
            :
            <button onClick={UserContext.handleLogin} className='text-lg'>
              Sign In
            </button>
        }
        {/* <div className='flex items-center gap-2'>
                    <p className='text-lg'>Sign In</p>
                    <img src={githubLogo} className=' w-5 sm:w-6' alt="GitHub Logo" />
                </div> */}
        {/* <div className='flex items-center gap-2'> */}
        {/* </div> */}
      </div>
    </div>
  )
}

export default Navbar
