import { createChatSession, getChatContext } from "../services/chat.service.js";
import { addUserMessage, addAssistantMessage } from "../services/message.service.js";
import { generateAssistantReply } from "../services/gemini.service.js";

export const startSession = async (req, res) => {
  try {
    const { agentId } = req.params;
    const session = await createChatSession(agentId, req.user.id);
    res.status(201).json(session);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

export const chat = async (req, res) => {
  try {
    const { chatSessionId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Message content required" });
    }

    // 1. Save user message
    await addUserMessage(chatSessionId, content, req.user.id);

    // 2. Get full chat context
    const { agent, messages } = await getChatContext(
      chatSessionId,
      req.user.id
    );

    // 3. Build prompt (system + history)
    const promptMessages = [
      {
        role: "user",
        content: agent.systemPrompt,
      },
      ...messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    // 4. Call Gemini
    const reply = await generateAssistantReply(promptMessages);

    // 5. Save assistant message
    const assistantMessage = await addAssistantMessage(
      chatSessionId,
      reply
    );

    res.json(assistantMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
