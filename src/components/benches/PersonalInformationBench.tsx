import { useCraftBenchContext } from '../../hooks/useCraftBenchContext'
import InputBox from '../ui/InputBox'

/*
email: string;
  bio: string;
  about: string;
  githubLink: string;
  linkedinLink: string;
  twitterLink: string;
  resumeLink: string;
*/
// Form for Personal Information
function PersonalInformationBench () {
  const { folioConfig, setFolioConfig } = useCraftBenchContext()
  const defaultClass = "w-full"
  return (
    <div className='flex flex-col gap-4 mt-4'>
      <h2 className='text-4xl'>Personal Information</h2>
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
