import { Agent } from "../models/agent.model.js";
import { Project } from "../models/project.model.js";

export const createAgent = async (
  name,
  systemPrompt,
  projectId,
  userId
) => {
  const project = await Project.findOne({
    _id: projectId,
    owner: userId,
  });

  if (!project) {
    throw new Error("Project not found or access denied");
  }

  const agent = await Agent.create({
    name,
    systemPrompt,
    project: projectId,
  });

  return agent;
};

export const getProjectAgents = async (projectId, userId) => {
  const project = await Project.findOne({
    _id: projectId,
    owner: userId,
  });

  if (!project) {
    throw new Error("Project not found or access denied");
  }

  return Agent.find({ project: projectId }).sort({ createdAt: -1 });
};
