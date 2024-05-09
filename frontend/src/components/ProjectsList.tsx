import { FC, useContext, useEffect, useRef, useState } from "react";
import { ProjectListProps, ProjectsData } from "../../definition";
import { addNewProject, getAllProjects } from "../utils/api";
import { Context } from "../context/Context";
import toast from "react-hot-toast";
import { ProjectCreateSkeleton, ProjectListSkeleton } from "./skeletons/ProjectListSkeleton";

const ProjectsList: FC<ProjectListProps> = ({ Click }) => {
  const ProjectnameInput = useRef<HTMLInputElement | null>(null);
  const { allProjects, setAllProjects } = useContext(Context);
  const { setProjectData } = useContext(Context);
  const [currentProject, setCurrentProject] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNewProjectCreating, setNewProjectCreating] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      const response = await getAllProjects();
      setAllProjects(await response);
      setIsLoading(false);
    };
    fetchProjects();
  }, [setAllProjects]);

  const CreateNewProject = async () => {
    setNewProjectCreating(true);
    const ProjectName = ProjectnameInput.current?.value.trim();
    if (ProjectName) {
      const data = {
        projectName: ProjectName,
      };
      const response = await addNewProject(data);
      setAllProjects(response);
      if (response) {
        toast.success("Project added successfully");
        if (ProjectnameInput.current) ProjectnameInput.current.value = "";
      }
    } else {
      toast.error("Please Enter Project Name");
      ProjectnameInput.current?.focus();
    }
    setNewProjectCreating(false);
  };

  const handleClick = (projectId: string) => {
    Click(projectId);
    setCurrentProject(projectId);
    setProjectData(undefined);
  };

  return (
    <div className="p-1 h-full relative">
      <div className="flex flex-col gap-1 h-4/5 overflow-y-auto pb-8">
        {isLoading ? (
          <ProjectListSkeleton />
        ) : (
          allProjects.map((project: ProjectsData) => (
            <div
              className={`w-full p-2 text-sm border border-black box-border rounded-md hover:cursor-pointer hover:bg-black hover:text-white font-semibold ${
                currentProject === project.projectId
                  ? "bg-black text-white"
                  : ""
              }`}
              key={project.projectId}
              onClick={() => handleClick(project.projectId)}
            >
              {project.projectName}
            </div>
          ))
        )
        }
        {
          isNewProjectCreating && <ProjectCreateSkeleton/>
        }
      </div>
      <div className="absolute bottom-1 left-1 right-1 bg-white">
        <input
          type="text"
          ref={ProjectnameInput}
          placeholder="Enter Project Name"
          className="border p-2 w-full text-sm"
        />
        <button
          className="mt-2 w-full p-2 text-sm border border-black box-border hover:cursor-pointer bg-black text-white font-semibold"
          onClick={CreateNewProject}
        >
          Add Project
        </button>
      </div>
    </div>
  );
};

export default ProjectsList;
