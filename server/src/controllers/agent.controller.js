import {
  createAgent,
  getProjectAgents,
} from "../services/agent.service.js";

export const create = async (req, res) => {
  try {
    const { name, systemPrompt } = req.body;
    const { projectId } = req.params;

    if (!name || !systemPrompt) {
      return res
        .status(400)
        .json({ message: "Name and systemPrompt are required" });
    }

    const agent = await createAgent(
      name,
      systemPrompt,
      projectId,
      req.user.id
    );

    res.status(201).json(agent);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

export const list = async (req, res) => {
  try {
    const { projectId } = req.params;

    const agents = await getProjectAgents(projectId, req.user.id);

    res.json(agents);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
