import { Message } from "../models/message.model.js";
import { ChatSession } from "../models/chatSession.model.js";

export const addUserMessage = async (
  chatSessionId,
  content,
  userId
) => {
  const session = await ChatSession.findOne({
    _id: chatSessionId,
    createdBy: userId,
  });

  if (!session) {
    throw new Error("Chat session not found or access denied");
  }

  const message = await Message.create({
    chatSession: chatSessionId,
    role: "user",
    content,
  });

  return message;
};

export const getChatHistory = async (chatSessionId, userId) => {
  const session = await ChatSession.findOne({
    _id: chatSessionId,
    createdBy: userId,
  });

  if (!session) {
    throw new Error("Chat session not found or access denied");
  }

  const messages = await Message.find({
    chatSession: chatSessionId,
  }).sort({ createdAt: 1 });

  return messages;
};

