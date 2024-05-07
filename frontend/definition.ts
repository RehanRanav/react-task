export interface ProjectListProps {
  Click: (projectId: string) => void;
}
export interface ProjectDetailProps {
  projectdata: ProjectsData | undefined;
}
export interface ProjectsData {
  description: string;
  projectId: string;
  projectName: string;
}
export interface CreateApiData{
  projectName: string;
}
