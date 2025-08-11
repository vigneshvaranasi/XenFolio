import { useCraftBenchContext } from '../../hooks/useCraftBenchContext'
import Button from '../ui/Button'
import InputBox from '../ui/InputBox'

function PersonalInformationBench () {
  const { folioConfig, setFolioConfig } = useCraftBenchContext()
  function loadDefaultData () {
    setFolioConfig({
      personalInformation: {
        name: 'Dev Duo',
        email: 'devduocollab@example.com',
        bio: 'Full Stack Developer',
        about: 'ex-Intern at [Company] | Full Stack Developer | Web Designer',
        githubLink: 'https://github.com/username',
        linkedinLink: 'https://www.linkedin.com/in/username/',
        twitterLink: 'https://x.com/username',
        resumeLink: 'https://example.com/resume'
      },
      skills: {
        languages: ['cpp', 'python', 'java', 'javascript', 'typescript'],
        tools: ['turborepo', 'figma'],
        frameworks: ['reactjs', 'express']
      },
      projects: [
        {
          title: 'Trackcode',
          description: 'Track Code tracks competitive programming performance across platforms, offering insights, rankings, and interactive visualizations with easy filtering and reports.',
          techStack: ['React', 'Express'],
          image: 'https://example.com/image.png',
          repoLink: 'https://github.com/username/project',
          liveLink: 'https://username.dev'
        }
      ],
      workExperience: [
        {
          role: 'Software Developer',
          company: 'Company Name',
          techStack: ['Java', 'SpringBoot'],
          description: 'Spring MVC and Full Stack'
        }
      ]
    })
  }
  const defaultClass = 'w-full'
  return (
    <div className='flex flex-col gap-4 mt-4'>
      <div className="flex gap-4 justify-between items-center flex-wrap">
        <h2 className='text-4xl'>Personal Information</h2>
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
