import { useState } from 'react';
import Footer from '../components/Footer';

import FasterGif from '../assets/home/featVideos/Faster.gif';
import PublishGif from '../assets/home/featVideos/Publish.gif';
import ResumeGif from '../assets/home/featVideos/Resume.gif';
import UpdateGif from '../assets/home/featVideos/Update.gif';
import heroGif from '../assets/home/featVideos/Flow.gif'

const HomePage = () => {
  const [selectedFeature, setSelectedFeature] = useState(0);

  const mainFeatures = [
    {
      title: 'Publish. Instantly.',
      description: 'One click, and your portfolio is live on GitHub Pages.',
      image: PublishGif,
      icon: '🌐'
    },
    {
      title: 'Always up to date.',
      description: 'Edit once. Changes go live everywhere.',
      image: UpdateGif,
      icon: '📅'
    },
    {
      title: 'Resume. Reimagined.',
      description: 'Upload your CV, and XenFolio transforms it into a polished portfolio.',
      image: ResumeGif,
      icon: '📃'
    },
    {
      title: 'Faster than ever.',
      description: 'Jump back in with Recent Config and update in seconds.',
      image: FasterGif,
      icon: '🚀'
    }
  ];

  return (
    <div className="my-36 font-afacad">
      <div className="mb-36">
        <p className="font-afacad text-3xl md:text-5xl text-center italic">
          Portfolios That Speak for You
        </p>
        <div className="relative mt-16 rounded-lg overflow-hidden before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-pink-500 before:to-yellow-500 before:blur-xl before:opacity-70">
          <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-lg p-1 md:p-3">
            <img src={heroGif} className="rounded-lg w-full" alt="Hero" />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-16">
        <div className="md:w-2/5">
          <h3 className="text-5xl font-semibold">Every portfolio. Perfected.</h3>
          <ul className="flex flex-col mt-6">
            {mainFeatures.map((feature, index) => (
              <li
                key={index}
                onClick={() => setSelectedFeature(index)}
                className="my-1 border-b border-[#30363d] py-2 cursor-pointer"
              >
                <div className="flex flex-col gap-2">
                  <h4
                    className={`text-2xl ${
                      selectedFeature === index ? 'text-[#fff]' : 'text-[#8b949e]'
                    } hover:text-[#fff] transition-colors duration-300`}
                  >
                    {feature.title}
                  </h4>
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      selectedFeature === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-lg text-[#8b949e] mt-1">{feature.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1">
          <div className="relative rounded-lg overflow-hidden before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-pink-500 before:to-yellow-500 before:blur-xl before:opacity-70">
            <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-lg p-1 md:p-3">
                <img src={mainFeatures[selectedFeature].image} className="w-full rounded-md sm:rounded-lg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default HomePage;
