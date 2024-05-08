import { Dispatch, SetStateAction } from "react";

export interface ProjectListProps {
  Click: (projectId: string) => void;
}
export interface ProjectDetailProps {
  projectdata: ProjectsData | undefined;
}
export interface TasksListProps {
  projectId: string;
  tasks: TaskObject[];
}
export interface TaskProps {
  description: string;
  title: string;
  status: string;
  projectId: string;
  taskId: string;
}
export interface ProjectsData {
  description: string;
  projectId: string;
  projectName: string;
  tasks: TaskObject[];
}
export interface TaskObject {
  assignees: string[];
  description: string;
  dueDate: string; // Consider using a Date object if appropriate
  status: string;
  taskId: string;
  title: string;
}
export interface TaskModalProps{
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}
export interface CreateApiData {
  projectName: string;
}
export interface UpdateTaskApiData {
  title: string;
  status: string;
}
