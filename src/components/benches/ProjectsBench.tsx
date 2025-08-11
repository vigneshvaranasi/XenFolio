import { useCraftBenchContext } from "../../hooks/useCraftBenchContext";
import NumberCounter from "../ui/NumberCounter";
import InputBox from "../ui/InputBox";
import { Project } from "../../types/folioConfig";

function ProjectsBench() {
  const { folioConfig, setFolioConfig } = useCraftBenchContext();
  const projectsCount = folioConfig?.projects?.length || 0;

  const addProject = () => {
    setFolioConfig((prevConfig) => {
      if (!prevConfig) return prevConfig;
      return {
        ...prevConfig,
        projects: [
          ...prevConfig.projects,
          {
            title: "",
            description: "",
            techStack: [],
            image: "",
            repoLink: "",
            liveLink: "",
          },
        ],
      };
    });
  };

  const removeProject = () => {
    if (projectsCount > 0) {
      setFolioConfig((prevConfig) => {
        if (!prevConfig || prevConfig.projects.length === 0) return prevConfig;
        return {
          ...prevConfig,
          projects: prevConfig.projects.slice(0, -1),
        };
      });
    }
  };

  const updateProject = (
    index: number,
    field: keyof Project,
    value: string | string[]
  ) => {
    setFolioConfig((prevConfig) => {
      if (!prevConfig) return prevConfig;
      const updatedProjects = [...prevConfig.projects];
      updatedProjects[index] = {
        ...updatedProjects[index],
        [field]: value,
      };
      return {
        ...prevConfig,
        projects: updatedProjects,
      };
    });
  };


  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center justify-content-start gap-2">
          <h2 className="text-4xl">Projects</h2>
          <div className="flex items-center gap-2">
            <NumberCounter
              count={projectsCount}
              onIncrement={addProject}
              onDecrement={removeProject}
              variant="primary"
            />
          </div>
        </div>
        <div className="border border-gray-300 opacity-0">Progress</div>
      </div>

      {folioConfig?.projects?.map((project, index) => (
        <div key={index} className="">
          <h3 className="text-2xl">Project {index + 1}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputBox
              label="Project Name"
              placeholder="Enter project name"
              type="text"
              className="w-full"
              value={project.title}
              onChange={(e) => updateProject(index, "title", e.target.value)}
            />
            <InputBox
              label="Description"
              placeholder="Enter project description"
              type="text"
              className="w-full"
              value={project.description}
              onChange={(e) =>
                updateProject(index, "description", e.target.value)
              }
            />
            <InputBox
              label="Tech Stack"
              placeholder="Enter tech stack (comma separated)"
              type="text"
              className="w-full"
              value={project.techStack.join(", ")}
              onChange={(e) =>
                updateProject(
                  index,
                  "techStack",
                  e.target.value.split(",").map((s) => s.trim())
                )
              }
            />
            <InputBox
              label="Image URL"
              placeholder="Enter image URL"
              type="text"
              className="w-full"
              value={project.image}
              onChange={(e) => updateProject(index, "image", e.target.value)}
            />
            <InputBox
              label="Repository Link"
              placeholder="Enter repository link"
              type="url"
              className="w-full"
              value={project.repoLink}
              onChange={(e) => updateProject(index, "repoLink", e.target.value)}
            />
            <InputBox
              label="Live Link"
              placeholder="Enter live project link"
              type="url"
              className="w-full"
              value={project.liveLink}
              onChange={(e) => updateProject(index, "liveLink", e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectsBench;
