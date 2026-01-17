import api from "./api";

export const getProjects = async () => {
  const res = await api.get("/projects");
  return res.data;
};

export const createProject = async (name) => {
  const res = await api.post("/projects", { name });
  return res.data;
};
