// import githubLogo from '../assets/githubLogo.svg'

function Navbar() {
    return (
        <div
            className={`
              bg-navBar border border-[#363F43]
              flex flex-row justify-between items-center
              px-4 py-2 sticky top-4 z-100 w-11/12 md:w-8/12 mx-auto
              backdrop-blur-lg rounded-lg backdrop-brightness-100
            `}>
            <div
                className={`opacity-100 text-white text-2xl`}>
                CreateFolio
            </div>
            <div className='flex flex-row items-center gap-4'>
                <a href="#" className='text-lg'>Folios</a>
                {/* <div className='flex items-center gap-2'>
                    <p className='text-lg'>Sign In</p>
                    <img src={githubLogo} className=' w-5 sm:w-6' alt="GitHub Logo" />
                </div> */}
                <div className='flex items-center gap-2'>
                    <a href="#" className='text-lg '>Sign In</a>
                </div>
            </div>
        </div>
    )
}

export default Navbar