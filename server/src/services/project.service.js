import { Project } from "../models/project.model.js";

export const createProject = async (name, ownerId) => {
  const project = await Project.create({
    name,
    owner: ownerId,
  });

  return project;
};

export const getUserProjects = async (ownerId) => {
  return Project.find({ owner: ownerId }).sort({ createdAt: -1 });
};
