import { CreateApiData } from "../../definition";

const BASE_URL = "http://127.0.0.1:8000";

export const getAllProjects = async () => {
  const response = await fetch(`${BASE_URL}/projects`);
  return await response.json();
};

export const addNewProject = async (data: CreateApiData) => {
  const res = await fetch(`${BASE_URL}/projects`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (res.status === 200) {
    const updatedResponse = await getAllProjects();
    return updatedResponse;
  }
  return await res.json();
};

export const getProjectDetails = async (projectId: string) => {
  const response = await fetch(`${BASE_URL}/projects/${projectId}`);
  return await response.json();
};

export const updateProjectDetails = async (
  projectId: string,
  data: CreateApiData
) => {
  const res = await fetch(`${BASE_URL}/projects/${projectId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (res.status === 200) {
    const updatedResponse = await getAllProjects();
    return updatedResponse;
  }
  return await res.json();
};

export const deleteProject = async (projectId: string) => {
  const res = await fetch(`${BASE_URL}/projects/${projectId}`, {
    method: "DELETE",
  });
  if (res.status === 200) {
    const updatedResponse = await getAllProjects();
    return updatedResponse;
  }
  return await res.json();
};
