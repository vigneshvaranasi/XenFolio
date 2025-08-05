import NumberCounter from '../ui/NumberCounter'
import InputBox from '../ui/InputBox';
import { useCraftBenchContext } from '../../hooks/useCraftBenchContext';
import { WorkExperience } from '../../types/folioConfig';

function WorkExperienceBench() {
  const { folioConfig, setFolioConfig } = useCraftBenchContext();
  const experiencesCount = folioConfig?.workExperience?.length || 0;
  
  const addExperience = () => {
    setFolioConfig(prevConfig => {
      if (!prevConfig) return prevConfig;
      return {
        ...prevConfig,
        workExperience: [
          ...prevConfig.workExperience,
          {
            role: "",
            company: "",
            techStack: [],
            description: "",
          }
        ]
      };
    });
  };

  const removeExperience = () => {
    if (experiencesCount > 0) {
      setFolioConfig(prevConfig => {
        if (!prevConfig || prevConfig.workExperience.length === 0) return prevConfig;
        return {
          ...prevConfig,
          workExperience: prevConfig.workExperience.slice(0, -1)
        };
      });
    }
  };

  const updateExperience = (index: number, field: keyof WorkExperience[0], value: string | string[]) => {
    setFolioConfig(prevConfig => {
      if (!prevConfig) return prevConfig;
      const updatedExperiences = [...prevConfig.workExperience];
      updatedExperiences[index] = {
        ...updatedExperiences[index],
        [field]: value,
      };
      return {
        ...prevConfig,
        workExperience: updatedExperiences,
      };
    });
  };

  const setExperiencesCount = (count: number) => {
    if (count < 0) return;
    
    setFolioConfig(prevConfig => {
      if (!prevConfig) return prevConfig;
      
      const currentExperiences = prevConfig.workExperience;
      const currentCount = currentExperiences.length;
      
      if (count > currentCount) {
        const newExperiences = Array.from({ length: count - currentCount }, () => ({
          role: "",
          company: "",
          techStack: [],
          description: "",
        }));
        return {
          ...prevConfig,
          workExperience: [...currentExperiences, ...newExperiences]
        };
      } else if (count < currentCount) {
        return {
          ...prevConfig,
          workExperience: currentExperiences.slice(0, count)
        };
      }
      
      return prevConfig;
    });
  };
  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className={`flex items-center justify-between gap-2`}>
        <div className={`flex items-center justify-content-start gap-2`}>
          <h2 className="text-4xl">Work Experience</h2>
          <div className="flex items-center gap-2">
            <NumberCounter
              count={experiencesCount}
              onIncrement={addExperience}
              onDecrement={removeExperience}
              variant="primary"
              setCounter={setExperiencesCount}
            />
          </div>
        </div>
        <div className={`border border-gray-300 opacity-0`}>
          Progress
        </div>
      </div>
      {folioConfig?.workExperience?.map((experience, index) => (
        <div key={index} className="">
          <h3 className="text-2xl">Experience {index + 1}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputBox
              label="Role"
              placeholder="Enter your role"
              type="text"
              className="w-full"
              value={experience.role}
              onChange={(e) => updateExperience(index, 'role', e.target.value)}
            />
            <InputBox
              label="Company"
              placeholder="Enter company name"
              type="text"
              className="w-full"
              value={experience.company}
              onChange={(e) => updateExperience(index, 'company', e.target.value)}
            />
            <InputBox
              label="Tech Stack"
              placeholder="Enter tech stack (comma separated)"
              type="text"
              className="w-full"
              value={experience.techStack.join(', ')}
              onChange={(e) => updateExperience(index, 'techStack', e.target.value.split(',').map(s => s.trim()))}
            />
            <InputBox
              label="Description"
              placeholder="Enter job description"
              type="text"
              className="w-full"
              value={experience.description}
              onChange={(e) => updateExperience(index, 'description', e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default WorkExperienceBench