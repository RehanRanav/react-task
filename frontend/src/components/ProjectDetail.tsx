import { FC, useContext, useEffect, useState } from "react";
import { ProjectDetailProps } from "../../definition";
import { deleteProject, updateProjectDetails } from "../utils/api";
import { Context } from "../context/Context";
import TasksList from "./TasksList";
import { BiEdit } from "react-icons/bi";
import toast from "react-hot-toast";
import { PageLoader } from "./skeletons/PageLoader";
import DeleteModal from "./DeleteModal";

const ProjectDetail: FC<ProjectDetailProps> = ({ projectdata }) => {
  const [projectDescription, setProjectDescription] = useState(
    projectdata?.description
  );
  const [projectTitle, setProjectTitle] = useState(projectdata?.projectName);
  const [isLoading, setIsLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const { allProjects, setAllProjects } = useContext(Context);
  const { setProjectData } = useContext(Context);

  useEffect(() => {
    setProjectDescription(projectdata?.description);
    setProjectTitle(projectdata?.projectName);
  }, [projectdata]);

  const updateProject = async () => {
    setIsChanged(true);
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const projectDelete = async () => {
    setOpenModal(false);
    setIsLoading(true);
    if (projectdata?.projectId) {
      const response = await deleteProject(projectdata.projectId);
      if (response !== null) {
        setAllProjects(response);
        setProjectData(undefined);
        toast.success("Project Deleted successfully");
      } else {
        toast.error("Somthing Went Wrong");
      }
    }
    setIsLoading(false);
  };

  const handleChanges = (value: string) => {
    setProjectTitle(value);
    setIsChanged(false);
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
              onChange={(e) => handleChanges(e.target.value)}
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
              className="py-1 px-2 text-white bg-black hover:opacity-85 rounded-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={updateProject}
              disabled={isChanged}
            >
              Save Changes
            </button>
            <button
              className="py-1 px-2 text-white bg-red-600 hover:opacity-85  rounded-sm font-semibold"
              onClick={() => setOpenModal(true)}
            >
              Delete Project
            </button>
            <DeleteModal
              openModal={openModal}
              setOpenModal={setOpenModal}
              Click={projectDelete}
              item="Project"
            />
          </div>
        </div>
        <div>
          <textarea
            className="border rounded w-full outline-none appearance-none p-1"
            rows={3}
            placeholder="project description"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            disabled
          ></textarea>
        </div>
      </div>
      <TasksList
        projectId={projectdata?.projectId as string}
        tasks={projectdata?.tasks || []}
      />
      {isLoading && <PageLoader />}
    </>
  );
};

export default ProjectDetail;
