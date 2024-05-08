import { FC, useContext, useEffect, useState } from "react";
import { TaskProps } from "../../definition";
import { deleteProjectTask, updateProjectTask } from "../utils/api";
import { Context } from "../context/Context";
import { BiEdit } from "react-icons/bi";
import toast from "react-hot-toast";

const Task: FC<TaskProps> = ({
  projectId,
  title,
  description,
  status,
  taskId,
}) => {
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description);
  const [taskStatus, setTaskStatus] = useState(status);
  const { setAllTasks } = useContext(Context);

  useEffect(() => {
    setTaskTitle(title);
    setTaskDescription(description);
    setTaskStatus(status);
  }, [title, description, status]);

  const updateTaskDetails = async () => {
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
  };

  const deleteTask = async () => {
    const response = await deleteProjectTask(projectId, taskId);
    if (response) {
      setAllTasks(response);
    }
  };
  return (
    <div className="border rounded-sm p-1 flex flex-col gap-2">
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-1 items-center">
          <input
            type="text"
            id={taskId}
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
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
            className="py-1 px-2 text-sm text-white bg-black/85 hover:opacity-85 rounded-sm font-semibold"
            onClick={updateTaskDetails}
          >
            Save Changes
          </button>
          <button
            className="py-1 px-2 text-sm text-red-600 hover:opacity-85 bg-gray-200 rounded-sm"
            onClick={deleteTask}
          >
            Delete Task
          </button>
        </div>
      </div>
      <div>
        <select
          className="border rounded bg-gray-100 py-0.5 px-2"
          value={taskStatus}
          onChange={(e) => setTaskStatus(e.target.value)}
        >
          <option value="In Progress">In Progress</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div>
        <textarea
          className="border rounded w-full outline-none appearance-none p-1"
          rows={2}
          placeholder="task description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export default Task;
