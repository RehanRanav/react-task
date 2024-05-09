import ProjectDetail from "./components/ProjectDetail";
import ProjectsList from "./components/ProjectsList";
import { useContext, useState } from "react";
import { getProjectDetails } from "./utils/api";
import { Context } from "./context/Context";
import { Toaster } from "react-hot-toast";
import { ProjectDetailSkeleton } from "./components/skeletons/ProjectDetailSkeleton";

function App() {
  const { projectData, setProjectData } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);

  const FetchProjectDetails = async (projectId: string) => {
    setIsLoading(true);
    const response = await getProjectDetails(projectId);
    setProjectData(response);
    setIsLoading(false);
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
          {isLoading ? (
            <ProjectDetailSkeleton />
          ) : projectData ? (
            <ProjectDetail projectdata={projectData} />
          ) : (
            <div className="w-full h-full flex justify-center items-center text-4xl text-gray-200">
              Please Select The Project
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
