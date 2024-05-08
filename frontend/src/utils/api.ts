import {
  CreateApiData,
  UpdateTaskApiData,
  createTaskApiData,
} from "../../definition";

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
  return null;
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
  return null;
};

export const getAllProjectTasks = async (projectId: string) => {
  const response = await fetch(`${BASE_URL}/projects/${projectId}/tasks`);
  return await response.json();
};

export const addNewProjectTask = async (
  projectId: string,
  data: createTaskApiData
) => {
  const response = await fetch(`${BASE_URL}/projects/${projectId}/tasks`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const updateProjectTask = async (
  projectId: string,
  taskId: string,
  data: UpdateTaskApiData
) => {
  const res = await fetch(`${BASE_URL}/projects/${projectId}/tasks/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteProjectTask = async (projectId: string, taskId: string) => {
  const res = await fetch(`${BASE_URL}/projects/${projectId}/tasks/${taskId}`, {
    method: "DELETE",
  });
  if (res.status === 200) {
    const updatedResponse = await getAllProjectTasks(projectId);
    return updatedResponse;
  }
  return null;
};
