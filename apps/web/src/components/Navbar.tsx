// import githubLogo from '../assets/githubLogo.svg'
import { Link } from 'react-router-dom'
import { useUserContext } from '../hooks/useUserContext'
import ProfileButton from './ProfileButton'
import {motion} from 'framer-motion'

function Navbar() {

  const UserContext = useUserContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: -40, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className={`
              bg-navBar border border-[#363F43]
              flex flex-row justify-between items-center
              px-4 py-2 sticky top-8 w-11/12 md:w-8/12 mx-auto
              backdrop-blur-lg rounded-lg backdrop-brightness-100 font-afacad
            `}
      style={{ zIndex: 1000 }}
    >
      <Link to='/'>
        <div className={`opacity-100 text-white text-2xl hover:text-neutral-200`}>XenFolio</div>
      </Link>

      <div className='flex flex-row justify-between items-center gap-0'>
        <Link to='folios' className='text-lg mr-4'>
          Folios
        </Link>

        {
          UserContext.isLoggedIn ?
            <>
              <Link to='myspace' className='text-lg mr-4'>
                MySpace
              </Link>

              <ProfileButton
                username={UserContext.user?.username!}
                avatar_url={UserContext.user?.avatar_url!}
              />
            </>
            :
            <button 
              onClick={UserContext.handleLogin} className='text-lg'
            >
              Sign In
            </button>
        }

        {/* This is SignIn Button with the GitHub Icon  refs: Line1 */}
        {/* <div className='flex items-center gap-2'>
                    <p className='text-lg'>Sign In</p>
                    <img src={githubLogo} className=' w-5 sm:w-6' alt="GitHub Logo" />
                </div> */}
        {/* <div className='flex items-center gap-2'> */}
        {/* </div> */}
      </div>

    </motion.div>
  )
}

export default Navbar
