import { useCraftBenchContext } from '../../hooks/useCraftBenchContext'
import Button from '../ui/Button'
import InputBox from '../ui/InputBox'

function PersonalInformationBench () {
  const { folioConfig, setFolioConfig } = useCraftBenchContext()
  function loadDefaultData () {
    setFolioConfig({
      personalInformation: {
        name: 'Dev Duo',
        email: 'devduocollab@gmail.com',
        bio: 'Full Stack Developer',
        about:
          'Intern at Xendev | Full Stack Developer | Open Source Contributor',
        githubLink: 'https://github.com/xen-devs',
        linkedinLink: 'https://www.linkedin.com',
        twitterLink: 'https://x.com',
        resumeLink:
          'https://www.depts.ttu.edu/coe/careers/students/documents/Sample-Resume-2022.pdf'
      },
      skills: {
        languages: ['C++', 'Python', 'Java', 'JavaScript', 'TypeScript'],
        tools: ['Turborepo', 'Figma', 'Postman', 'Git', 'Azure','Docker'],
        frameworks: ['React', 'Express', 'Next.js', 'Node.js', 'Tailwind CSS']
      },
      projects: [
        {
          title: 'Mark Me',
          description:
            'Mobile app for hosting events, managing participants, and tracking check-ins with role-based access.',
          techStack: [
            'React Native',
            'Expo',
            'Node.js',
            'Express.js',
            'MongoDB',
            'TypeScript'
          ],
          image: 'https://vigneshvaranasi.in/assets/markme-DtNTkQTw.png',
          repoLink: 'https://github.com/pavancos/markme',
          liveLink: 'https://github.com/pavancos/markme/releases/tag/v1.0.0'
        },
        {
          title: 'AskIt',
          description:
            'Real-time anonymous Q&A platform with upvoting, threaded discussions, and secure OAuth 2.0 login.',
          techStack: [
            'React.js',
            'WebSockets',
            'Node.js',
            'Express.js',
            'MongoDB',
            'TypeScript',
            'Tailwind CSS'
          ],
          image: 'https://vigneshvaranasi.in/assets/askit-B45JEGme.png',
          repoLink: 'https://github.com/skfakruddin/AskIt',
          liveLink: 'https://askitengine.centralindia.cloudapp.azure.com/'
        }
      ],
      workExperience: [
        {
          role: 'Software Developer Intern',
          company: 'One Tech Company',
          techStack: ['Java', 'Spring Boot', 'React', 'MySQL'],
          description:
            'Developed REST APIs, integrated with front-end components, and optimized database queries for better performance.'
        },
        {
          role: 'Web Developmer Intern',
          company: 'Some other Tech Company',
          techStack: ['React.js', 'Node.js', 'MongoDB'],
          description:
            'Collaborated on building web solutions, organized coding events, and contributed to open-source projects.'
        }
      ]
    })
  }
  const defaultClass = 'w-full'
  return (
    <div className='flex flex-col gap-4 mt-4'>
      <div className='flex gap-4 justify-between items-center flex-wrap'>
        <h2 className='text-xl md:text-4xl'>Personal Information</h2>
        <Button
          text='Load Sample Data'
          variant='primary'
          onClick={loadDefaultData}
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <InputBox
          label='Name'
          placeholder='Enter your name'
          value={folioConfig?.personalInformation.name ?? ''}
          type='text'
          className={defaultClass}
          onChange={e =>
            setFolioConfig(prev =>
              prev
                ? {
                    ...prev,
                    personalInformation: {
                      ...prev.personalInformation,
                      name: e.target.value
                    }
                  }
                : prev
            )
          }
        />
        <InputBox
          label='Email'
          placeholder='Enter your email'
          value={folioConfig?.personalInformation.email ?? ''}
          type='email'
          className={defaultClass}
          onChange={e =>
            setFolioConfig(prev =>
              prev
                ? {
                    ...prev,
                    personalInformation: {
                      ...prev.personalInformation,
                      email: e.target.value
                    }
                  }
                : prev
            )
          }
        />

        <InputBox
          label='Bio'
          placeholder='Enter a short bio'
          value={folioConfig?.personalInformation.bio ?? ''}
          type='text'
          className={defaultClass}
          onChange={e =>
            setFolioConfig(prev =>
              prev
                ? {
                    ...prev,
                    personalInformation: {
                      ...prev.personalInformation,
                      bio: e.target.value
                    }
                  }
                : prev
            )
          }
        />
        <InputBox
          label='About'
          placeholder='Enter a detailed about section'
          value={folioConfig?.personalInformation.about ?? ''}
          type='text'
          className={defaultClass}
          onChange={e =>
            setFolioConfig(prev =>
              prev
                ? {
                    ...prev,
                    personalInformation: {
                      ...prev.personalInformation,
                      about: e.target.value
                    }
                  }
                : prev
            )
          }
        />

        <InputBox
          label='GitHub Link'
          placeholder='Enter your GitHub profile link'
          value={folioConfig?.personalInformation.githubLink ?? ''}
          type='url'
          className={defaultClass}
          onChange={e =>
            setFolioConfig(prev =>
              prev
                ? {
                    ...prev,
                    personalInformation: {
                      ...prev.personalInformation,
                      githubLink: e.target.value
                    }
                  }
                : prev
            )
          }
        />
        <InputBox
          label='LinkedIn Link'
          placeholder='Enter your LinkedIn profile link'
          value={folioConfig?.personalInformation.linkedinLink ?? ''}
          type='url'
          className={defaultClass}
          onChange={e =>
            setFolioConfig(prev =>
              prev
                ? {
                    ...prev,
                    personalInformation: {
                      ...prev.personalInformation,
                      linkedinLink: e.target.value
                    }
                  }
                : prev
            )
          }
        />

        <InputBox
          label='Twitter Link'
          placeholder='Enter your Twitter profile link'
          value={folioConfig?.personalInformation.twitterLink ?? ''}
          type='url'
          className={defaultClass}
          onChange={e =>
            setFolioConfig(prev =>
              prev
                ? {
                    ...prev,
                    personalInformation: {
                      ...prev.personalInformation,
                      twitterLink: e.target.value
                    }
                  }
                : prev
            )
          }
        />
        <InputBox
          label='Resume Link'
          placeholder='Enter a link to your resume'
          value={folioConfig?.personalInformation.resumeLink ?? ''}
          type='url'
          className={defaultClass}
          onChange={e =>
            setFolioConfig(prev =>
              prev
                ? {
                    ...prev,
                    personalInformation: {
                      ...prev.personalInformation,
                      resumeLink: e.target.value
                    }
                  }
                : prev
            )
          }
        />
      </div>
    </div>
  )
}

export default PersonalInformationBench
