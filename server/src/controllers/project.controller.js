import {
  createProject,
  getUserProjects,
} from "../services/project.service.js";

export const create = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Project name is required" });
    }

    const project = await createProject(name, req.user.id);

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Failed to create project" });
  }
};

export const list = async (req, res) => {
  try {
    const projects = await getUserProjects(req.user.id);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};
