import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { ProjectsData } from "../../definition";

interface ContextType {
  allProjects: ProjectsData[];
  setAllProjects: Dispatch<SetStateAction<ProjectsData[]>>;
  projectData: ProjectsData | undefined;
  setProjectData: Dispatch<SetStateAction<ProjectsData | undefined>>;
}

export const Context = createContext<ContextType>({
  allProjects: [],
  setAllProjects: () => {},
  projectData: undefined,
  setProjectData: () => {},
});

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [allProjects, setAllProjects] = useState<ProjectsData[]>([]);
  const [projectData, setProjectData] = useState<ProjectsData>();

  return (
    <Context.Provider
      value={{ allProjects, setAllProjects, projectData, setProjectData }}
    >
      {children}
    </Context.Provider>
  );
};
