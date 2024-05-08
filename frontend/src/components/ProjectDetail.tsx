import { FC, useContext, useEffect, useState } from "react";
import { ProjectDetailProps } from "../../definition";
import { deleteProject, updateProjectDetails } from "../utils/api";
import { Context } from "../context/Context";
import TasksList from "./TasksList";
import { BiEdit } from "react-icons/bi";
import toast from "react-hot-toast";

const ProjectDetail: FC<ProjectDetailProps> = ({ projectdata }) => {
  const [projectDescription, setProjectDescription] = useState(
    projectdata?.description
  );
  const [projectTitle, setProjectTitle] = useState(projectdata?.projectName);
  const { allProjects, setAllProjects } = useContext(Context);
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
      console.log(response);
      const updatedProjects = allProjects.map((project) => {
        if (project.projectId === projectdata.projectId) {
          return {
            ...project,
            projectName: response.projectName,
          };
        }
        return project;
      });
      setAllProjects(updatedProjects);
      if (response) {
        toast.success("Project updated successfully");
      }
    } else {
      if (!ProjectName) {
        toast.error("Please Enter Project Name");
        setProjectTitle(projectdata?.projectName);
        return;
      }
      toast.error("Something went wrong");
    }
  };

  const projectDelete = async () => {
    if (projectdata?.projectId) {
      const response = await deleteProject(projectdata.projectId);
      if (response !== null) {
        setAllProjects(response);
        setProjectData(undefined);
      }
    }
  };

  return (
    <>
      <div className="w-full px-1.5">
        <div className="flex justify-between w-full py-2 items-center">
          <div className="flex gap-2 item-center">
            <input
              type="text"
              id="ProjectTitle"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="font-bold text-base p-1 h-fit bg-inherit resize-none border-none text-gray-900 rounded w-48"
            />
            <label
              htmlFor="ProjectTitle"
              className="hover:bg-gray-100 p-1 rounded-sm w-fit h-fit"
            >
              <BiEdit size={20} />
            </label>
          </div>
          <div className="flex gap-1">
            <button
              className="py-1 px-2 text-white bg-black/85 hover:opacity-85 rounded-sm font-semibold"
              onClick={updateProject}
            >
              Save Changes
            </button>
            <button
              className="py-1 px-2 text-white bg-red-600 hover:opacity-85  rounded-sm font-semibold"
              onClick={projectDelete}
            >
              Delete Project
            </button>
          </div>
        </div>
        <div>
          <textarea
            className="border rounded w-full outline-none appearance-none p-1"
            rows={3}
            placeholder="project description"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          ></textarea>
        </div>
      </div>
      <TasksList
        projectId={projectdata?.projectId as string}
        tasks={projectdata?.tasks || []}
      />
    </>
  );
};

export default ProjectDetail;
