import { ChatSession } from "../models/chatSession.model.js";
import { Agent } from "../models/agent.model.js";
import { Project } from "../models/project.model.js";

export const createChatSession = async (agentId, userId) => {
  // 1. Find agent
  const agent = await Agent.findById(agentId);
  if (!agent) {
    throw new Error("Agent not found");
  }

  // 2. Verify project ownership
  const project = await Project.findOne({
    _id: agent.project,
    owner: userId,
  });

  if (!project) {
    throw new Error("Access denied");
  }

  // 3. Create chat session
  const session = await ChatSession.create({
    agent: agentId,
    createdBy: userId,
  });

  return session;
};
