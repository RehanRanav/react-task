import ProjectDetail from "./components/ProjectDetail";
import ProjectsList from "./components/ProjectsList";
import { useContext } from "react";
import { getProjectDetails } from "./utils/api";
import { Context } from "./context/Context";

function App() {
  const { projectData, setProjectData } = useContext(Context);

  const FetchProjectDetails = async (projectId: string) => {
    const response = await getProjectDetails(projectId);
    setProjectData(response);
  };

  return (
    <div>
      <div className="h-10 border-b flex items-center px-2">
        <span className="text-muted text-sm font-bold ">PROJECT MANAGER</span>
      </div>
      <div className="grid grid-cols-12 divide-x h-[calc(100vh-40px)]">
        <div className="col-span-3">
          <ProjectsList Click={FetchProjectDetails} />
        </div>
        <div className="col-span-9">
          {projectData && <ProjectDetail projectdata={projectData} />}
        </div>
      </div>
    </div>
  );
}

export default App;
