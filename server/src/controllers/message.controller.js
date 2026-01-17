import { addUserMessage } from "../services/message.service.js";

export const sendUserMessage = async (req, res) => {
  try {
    const { chatSessionId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Message content required" });
    }

    const message = await addUserMessage(
      chatSessionId,
      content,
      req.user.id
    );

    res.status(201).json(message);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
