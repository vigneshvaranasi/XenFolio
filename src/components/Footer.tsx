import { useState, useRef } from 'react'

function Footer () {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const textRef = useRef<HTMLHeadingElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div className='my-36 font-afacad'>
      <div className='lg:hidden'>
        <h1
          ref={textRef}
          className='text-center text-8xl lg:text-[13rem] tracking-wide font-bold relative cursor-none'
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            color: 'transparent',
            WebkitTextStroke: '2px #363f43',
          }}
        >
          XenFolio
        </h1>
      </div>
      <div className='hidden lg:block'>
        <h1
          ref={textRef}
          className='text-center text-8xl lg:text-[12rem] tracking-wide font-bold relative cursor-none'
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            color: 'transparent',
            WebkitTextStroke: '2px #363f43',
            WebkitMaskImage: isHovered
              ? `radial-gradient(circle 250px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, black 40%, transparent 70%)`
              : 'linear-gradient(transparent, transparent)'
          }}
        >
          XenFolio
        </h1>
      </div>
      <div className='h-20'></div>
      <div className='text-center text-lg text-gray-500 flex flex-col md:flex-row items-center md:justify-center gap-1'>
        <span>
        Developed by{' '}
        </span>
        <span>
        <a
          href='https://pavanc.me'
          className='hover:text-red-400 transition-colors duration-300'
        >
          Pavan Kumar Chennupati
        </a>{' '}
        &{' '}
        <a
          href='https://vigneshvaranasi.in'
          className='hover:text-orange-400 transition-colors duration-300'
        >
          Vignesh Varanasi
        </a>
        </span>
      </div>
      <div className='h-4'></div>
    </div>
  )
}

export default Footer
