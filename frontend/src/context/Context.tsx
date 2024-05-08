import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { ProjectsData, TaskObject } from "../../definition";

interface ContextType {
  allProjects: ProjectsData[];
  setAllProjects: Dispatch<SetStateAction<ProjectsData[]>>;
  projectData: ProjectsData | undefined;
  setProjectData: Dispatch<SetStateAction<ProjectsData | undefined>>;
  allTasks: TaskObject[];
  setAllTasks: Dispatch<SetStateAction<TaskObject[]>>;
}

export const Context = createContext<ContextType>({
  allProjects: [],
  setAllProjects: () => {},
  projectData: undefined,
  setProjectData: () => {},
  allTasks: [],
  setAllTasks: () => {},
});

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [allProjects, setAllProjects] = useState<ProjectsData[]>([]);
  const [projectData, setProjectData] = useState<ProjectsData>();
  const [allTasks, setAllTasks] = useState<TaskObject[]>([]);

  return (
    <Context.Provider
      value={{
        allProjects,
        setAllProjects,
        projectData,
        setProjectData,
        allTasks,
        setAllTasks,
      }}
    >
      {children}
    </Context.Provider>
  );
};
