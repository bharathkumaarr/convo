import { createChatSession } from "../services/chat.service.js";

export const startSession = async (req, res) => {
  try {
    const { agentId } = req.params;

    const session = await createChatSession(agentId, req.user.id);

    res.status(201).json(session);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
