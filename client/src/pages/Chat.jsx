import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function Chat() {
    const [input, setInput] = useState("");
const [sending, setSending] = useState(false);


    const [messages, setMessages] = useState([]);

  const { agentId } = useParams();
  const [chatSession, setChatSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const startChat = async () => {
      try {
        const res = await api.post(`/chat/start/${agentId}`);
        setChatSession(res.data);
        const history = await api.get(
  `/chat/${res.data._id}/messages`
);
setMessages(history.data);


      } catch (err) {
        console.error("Failed to start chat");
      } finally {
        setLoading(false);
      }
    };

    startChat();
  }, [agentId]);

  const handleSend = async () => {
  if (!input.trim() || !chatSession) return;

  const userMessage = {
    _id: Date.now(),
    role: "user",
    content: input,
  };

  // Optimistic UI update
  setMessages((prev) => [...prev, userMessage]);
  setInput("");
  setSending(true);

  try {
    const res = await api.post(
      `/chat/${chatSession._id}/message`,
      { content: userMessage.content }
    );

    setMessages((prev) => [...prev, res.data]);
  } catch (err) {
    console.error("Failed to send message");
  } finally {
    setSending(false);
  }
};


  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-zinc-950 text-zinc-100">
        Starting chat...
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-zinc-950 text-zinc-100 flex flex-col">
      <header className="p-4 border-b border-zinc-800">
        <h2 className="text-lg">Chat Session</h2>
      </header>

      <main className="flex-1 p-6 overflow-y-auto space-y-4">
  {messages.map((msg) => (
    <div
      key={msg._id}
      className={`max-w-xl p-3 rounded ${
        msg.role === "user"
          ? "bg-emerald-500 text-black self-end ml-auto"
          : "bg-zinc-800 text-zinc-100"
      }`}
    >
      {msg.content}
    </div>
  ))}

  {messages.length === 0 && (
    <p className="text-zinc-400">
      Start the conversation…
    </p>
  )}
</main>
<footer className="p-4 border-t border-zinc-800 flex gap-2">
  <input
    className="flex-1 bg-zinc-900 border border-zinc-800 rounded px-3 py-2"
    placeholder="Type a message..."
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && handleSend()}
    disabled={sending}
  />

  <button
    onClick={handleSend}
    disabled={sending}
    className="bg-emerald-500 text-black px-4 rounded disabled:opacity-50"
  >
    Send
  </button>
</footer>


    </div>
  );
}

export default Chat;
