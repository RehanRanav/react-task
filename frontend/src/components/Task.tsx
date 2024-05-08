import { FC, useEffect, useState } from "react";
import { TaskProps } from "../../definition";
import { updateProjectTask } from "../utils/api";

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

  useEffect(() => {
    setTaskTitle(title);
    setTaskDescription(description);
    setTaskStatus(status);
  }, [title, description, status]);

  const updateTaskDetails = async () => {
    const data = {
      title: taskTitle,
      status: taskStatus,
    };
   await updateProjectTask(projectId, taskId, data);
  };

  return (
    <div className="border rounded-sm p-1 flex flex-col gap-2">
      <div className="flex justify-between w-full">
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="font-bold text-base p-1 h-fit bg-inherit resize-none border-none text-gray-900 rounded w-48"
        />
        <div className="flex gap-1">
          <button
            className="py-1 px-2 text-sm text-white bg-black/85 rounded-sm font-semibold"
            onClick={updateTaskDetails}
          >
            Save Changes
          </button>
          <button className="py-1 px-2 text-sm text-red-600 bg-gray-200 rounded-sm">
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
