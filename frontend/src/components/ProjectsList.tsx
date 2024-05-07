import { FC, useContext, useEffect, useRef } from "react";
import { ProjectListProps, ProjectsData } from "../../definition";
import { addNewProject, getAllProjects } from "../utils/api";
import { Context } from "../context/Context";

const ProjectsList: FC<ProjectListProps> = ({ Click }) => {
  const ProjectnameInput = useRef<HTMLInputElement | null>(null);
  const { allProjects, setAllProjects } = useContext(Context);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await getAllProjects();
      setAllProjects(response);
    };
    fetchProjects();
  }, [setAllProjects]);

  const CreateNewProject = async () => {
    const ProjectName = ProjectnameInput.current?.value.trim();
    if (ProjectName) {
      const data = {
        projectName: ProjectName,
      };
      const response = await addNewProject(data);
      setAllProjects(response);
    }
  };

  return (
    <div className="p-1 h-full relative">
      <div className="flex flex-col gap-1">
        {allProjects.map((project: ProjectsData) => (
          <div
            className="w-full p-2 text-sm border border-black box-border rounded-md hover:cursor-pointer hover:bg-black hover:text-white font-semibold"
            key={project.projectId}
            onClick={() => Click(project.projectId)}
          >
            {project.projectName}
          </div>
        ))}
      </div>
      <div className="absolute bottom-1 left-1 right-1 bg-white">
        <input
          type="text"
          ref={ProjectnameInput}
          placeholder="Enter Project Name"
          className="border p-2 w-full rounded-md text-sm"
        />
        <button
          className="mt-2 w-full p-2 text-sm border border-black box-border rounded-md hover:cursor-pointer bg-black text-white font-semibold"
          onClick={CreateNewProject}
        >
          Add Project
        </button>
      </div>
    </div>
  );
};

export default ProjectsList;
