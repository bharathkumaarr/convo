import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateAssistantReply = async (messages) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const formattedMessages = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const result = await model.generateContent({
    contents: formattedMessages,
  });

  return result.response.text();
};
