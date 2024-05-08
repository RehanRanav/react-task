import { FC, useContext, useEffect, useState } from "react";
import { TaskObject, TasksListProps } from "../../definition";
import Task from "./Task";
import { Context } from "../context/Context";
import TaskCreateModal from "./TaskCreateModal";

const TasksList: FC<TasksListProps> = ({ projectId, tasks }) => {
  const { allTasks, setAllTasks } = useContext(Context);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setAllTasks(tasks);
  }, [tasks, setAllTasks]);

  return (
    <>
      <div>
        <div className="w-full px-1.5">
          <div className="w-full py-2">
            <div className="font-bold text-base p-1 h-fit bg-inherit text-gray-900">
              Tasks
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            {allTasks.length > 0 &&
              allTasks.map((task: TaskObject) => (
                <Task
                  taskId={task.taskId}
                  projectId={projectId}
                  title={task.title}
                  description={task.description}
                  status={task.status}
                  key={task.taskId}
                />
              ))}
          </div>
          <div>
            <button
              className="mt-2 w-fit p-2 text-sm border border-black box-border rounded-md hover:cursor-pointer bg-black text-white font-semibold"
              onClick={() => setOpenModal(true)}
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
      <TaskCreateModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        projectId={projectId}
      />
    </>
  );
};

export default TasksList;
