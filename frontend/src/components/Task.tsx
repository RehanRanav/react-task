import { FC, useContext, useEffect, useState } from "react";
import { TaskProps } from "../../definition";
import { deleteProjectTask, updateProjectTask } from "../utils/api";
import { Context } from "../context/Context";
import { BiEdit } from "react-icons/bi";
import toast from "react-hot-toast";
import { PageLoader } from "./skeletons/PageLoader";
import { CustomFlowbiteTheme, Dropdown } from "flowbite-react";
import DeleteModal from "./DeleteModal";

const customeTheme: CustomFlowbiteTheme["dropdown"] = {
  inlineWrapper:
    "flex items-center w-fit justify-between border rounded-sm border-black p-1",
  floating: {
    item: {
      base: "flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-gray-700",
    },
  },
};

const Task: FC<TaskProps> = ({
  projectId,
  title,
  description,
  status,
  taskId,
}) => {
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskStatus, setTaskStatus] = useState(status);
  const [isLoading, setIsLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const { setAllTasks } = useContext(Context);

  useEffect(() => {
    setTaskTitle(title);
    setTaskStatus(status);
  }, [title, status]);

  const updateTaskDetails = async () => {
    setIsChanged(true);
    setIsLoading(true);
    const TaskName = taskTitle.trim();
    if (TaskName && taskStatus && projectId && taskId) {
      const data = {
        title: taskTitle,
        status: taskStatus,
      };
      const response = await updateProjectTask(projectId, taskId, data);
      if (response) {
        toast.success("Task updated successfully");
      }
    } else {
      if (!TaskName) {
        toast.error("Please Enter Project Name");
        setTaskTitle(title);
        return;
      }
      toast.error("Something went wrong");
    }
    setIsLoading(false);
  };

  const deleteTask = async () => {
    setOpenModal(false);
    setIsLoading(true);
    const response = await deleteProjectTask(projectId, taskId);
    if (response) {
      setAllTasks(response);
      toast.success("Task Deleted successfully");
    } else {
      toast.error("Somthing Went Wrong");
    }
    setIsLoading(false);
  };

  const handleTitleChanges = (value: string) => {
    setTaskTitle(value);
    setIsChanged(false);
  };
  const handleStatusChanges = (value: string) => {
    setTaskStatus(value);
    setIsChanged(false);
  };
  return (
    <div className="border rounded-sm p-1 flex flex-col gap-2">
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-1 items-center">
          <input
            type="text"
            id={taskId}
            value={taskTitle}
            onChange={(e) => handleTitleChanges(e.target.value)}
            className="font-bold text-base p-1 h-fit bg-inherit resize-none border-none text-gray-900 rounded w-48"
          />
          <label
            htmlFor={taskId}
            className="hover:bg-gray-100 p-1 rounded-sm w-fit h-fit"
          >
            <BiEdit size={20} />
          </label>
        </div>
        <div className="flex gap-1">
          <button
            className="py-1 px-2 text-sm text-white bg-black hover:opacity-85 rounded-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={updateTaskDetails}
            disabled={isChanged}
          >
            Save Changes
          </button>
          <button
            className="py-1 px-2 text-sm text-red-600 hover:opacity-85 bg-gray-200 rounded-sm"
            onClick={() => setOpenModal(true)}
          >
            Delete Task
          </button>
          <DeleteModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            Click={deleteTask}
            item="Task"
          />
        </div>
      </div>
      <div>
        <Dropdown
          label={taskStatus}
          className="cursor-pointer"
          inline
          theme={customeTheme}
        >
          <Dropdown.Item
            onClick={() => handleStatusChanges("In Progress")}
            className="p-2 flex gap-1 items-center hover:bg-blue-600 hover:text-white"
          >
            In Progress
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleStatusChanges("Pending")}
            className="p-2 flex gap-1 items-center hover:bg-blue-600 hover:text-white"
          >
            Pending
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleStatusChanges("Completed")}
            className="p-2 flex gap-1 items-center hover:bg-blue-600 hover:text-white"
          >
            Completed
          </Dropdown.Item>
        </Dropdown>
      </div>
      <div>
        <div className="border-none bg-gray-50 h-14 max-h-14 rounded w-full outline-none appearance-none p-1 line-clamp-2">
          {description}
        </div>
      </div>
      {isLoading && <PageLoader />}
    </div>
  );
};

export default Task;
