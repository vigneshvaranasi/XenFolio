import { useState } from 'react'
import heroImg from '../assets/home/hero.png'
import MobileImg from '../assets/home/mobileHero.jpg'

const HomePage = () => {
  const [selectedFeature, setSelectedFeature] = useState(0)
  const mainFeatures = [
    {
      title: 'Publish. Instantly.',
      description: 'One click, and your portfolio is live on GitHub Pages.',
      image: heroImg,
      icon: '📜'
    },
    {
      title: 'Always up to date.',
      description: 'Edit once. Changes go live everywhere.',
      image: heroImg,
      icon: '📜'
    },
    {
      title: 'Resume. Reimagined.',
      description:
        'Upload your CV, and XenFolio transforms it into a polished portfolio.',
      image: heroImg,
      icon: '📜'
    },
    {
      title: 'Faster than ever.',
      description: 'Jump back in with Recent Config and update in seconds.',
      image: heroImg,
      icon: '📜'
    }
  ]

  return (
    <div className='my-36 font-afacad'>
      <div>
        <div>
          <p className='font-afacad text-xl md:text-5xl text-center italic'>
            Portfolios That Speak for You
          </p>
        </div>

        {/* Outer Glow Container */}
        <div className='relative mt-16 rounded-lg overflow-hidden before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-pink-500 before:to-yellow-500 before:blur-xl before:opacity-70'>
          {/* Glass Effect */}
          <div className='relative z-10 bg-white/10 backdrop-blur-md rounded-lg p-1 md:p-3'>
            {' '}
            <img src={heroImg} className='rounded-lg' alt='Hero' />
          </div>
        </div>
      </div>

      <div className='my-16 flex flex-col md:flex-row justify-between gap-16'>
        <div className='md:w-2/5'>
          <h3 className='text-3xl font-semibold'>
            Your story. Beautifully told.
          </h3>
          <ul className='flex flex-col mt-6'>
            {mainFeatures.map((feature, index) => (
              <li
                key={index}
                onClick={() => setSelectedFeature(index)}
                className='my-3 border-b border-[#30363d] pb-3 cursor-pointer'
              >
                <div className='flex flex-col gap-2'>
                  <h4 className='text-xl'>
                    {feature.icon} {feature.title}
                  </h4>
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      selectedFeature === index
                        ? 'max-h-40 opacity-100'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className='text-md text-[#8b949e] mt-1'>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className='flex-1'>
          <div className='relative rounded-lg overflow-hidden before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-pink-500 before:to-yellow-500 before:blur-xl before:opacity-70'>
            <div className='relative z-10 bg-white/10 backdrop-blur-md rounded-lg p-1 md:p-3'>
              <img
                src={MobileImg}
                className='rounded-lg w-full h-auto'
                alt='Hero'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
