import { FC, useContext, useEffect, useState } from "react";
import { ProjectDetailProps } from "../../definition";
import { deleteProject, updateProjectDetails } from "../utils/api";
import { Context } from "../context/Context";

const ProjectDetail: FC<ProjectDetailProps> = ({ projectdata }) => {
  const [projectDescription, setProjectDescription] = useState(
    projectdata?.description
  );
  const [projectTitle, setProjectTitle] = useState(projectdata?.projectName);
  const { setAllProjects } = useContext(Context);
  const { setProjectData } = useContext(Context);

  useEffect(() => {
    setProjectDescription(projectdata?.description);
    setProjectTitle(projectdata?.projectName);
  }, [projectdata]);

  const updateProject = async () => {
    const ProjectName = projectTitle?.trim();
    if (ProjectName && projectdata?.projectId) {
      const data = {
        projectName: ProjectName,
      };
      const response = await updateProjectDetails(projectdata?.projectId, data);
      setAllProjects(response);
    }
  };

  const projectDelete = async () => {
    if (projectdata?.projectId) {
      const response = await deleteProject(projectdata.projectId);
      setAllProjects(response);
      setProjectData(undefined);
    }
  };

  return (
    <div className="w-full px-1.5">
      <div className="flex justify-between w-full py-2">
        <input
          type="text"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
          className="font-bold text-base p-1 h-fit bg-inherit resize-none border-none text-gray-900 rounded w-44"
        />
        <div className="flex gap-1">
          <button
            className="py-1 px-2 text-white bg-black/85 rounded-sm font-semibold"
            onClick={updateProject}
          >
            Save Changes
          </button>
          <button
            className="py-1 px-2 text-white bg-red-600 rounded-sm font-semibold"
            onClick={projectDelete}
          >
            Delete Project
          </button>
        </div>
      </div>
      <div>
        <textarea
          className="border rounded-md w-full outline-none appearance-none p-1"
          rows={4}
          placeholder="project description"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export default ProjectDetail;
