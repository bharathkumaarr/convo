import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

import { useNavigate } from "react-router-dom";


function Agents() {

    const navigate = useNavigate();

  const { projectId } = useParams();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
const [systemPrompt, setSystemPrompt] = useState("");
const [creating, setCreating] = useState(false);


  useEffect(() => {
    const loadAgents = async () => {
      try {
        const res = await api.get(`/projects/${projectId}/agents`);
        setAgents(res.data);
      } catch (err) {
        console.error("Failed to load agents");
      } finally {
        setLoading(false);
      }
    };

    loadAgents();
  }, [projectId]);

  const handleCreateAgent = async () => {
  if (!name.trim() || !systemPrompt.trim()) return;

  try {
    setCreating(true);
    const res = await api.post(
      `/projects/${projectId}/agents`,
      {
        name,
        systemPrompt,
      }
    );

    setAgents((prev) => [res.data, ...prev]);
    setName("");
    setSystemPrompt("");
  } catch (err) {
    console.error("Failed to create agent");
  } finally {
    setCreating(false);
  }
};


  return (
    <div className="h-screen w-full bg-zinc-950 text-zinc-100 p-6">
      <h1 className="text-2xl mb-4">Agents</h1>

      {loading && <p className="text-zinc-400">Loading agents...</p>}

      {!loading && agents.length === 0 && (
        <p className="text-zinc-400">No agents yet.</p>
      )}
<div className="mb-6 bg-zinc-900 p-4 rounded border border-zinc-800">
  <h2 className="text-lg mb-3">Create Agent</h2>

  <input
    className="w-full mb-3 p-2 rounded bg-zinc-800"
    placeholder="Agent name"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />

  <textarea
    className="w-full mb-3 p-2 rounded bg-zinc-800 h-24 resize-none"
    placeholder="System prompt (instructions for the agent)"
    value={systemPrompt}
    onChange={(e) => setSystemPrompt(e.target.value)}
  />

  <button
    onClick={handleCreateAgent}
    disabled={creating}
    className="bg-emerald-500 text-black px-4 py-2 rounded disabled:opacity-50"
  >
    {creating ? "Creating..." : "Create Agent"}
  </button>
</div>

      <div className="grid grid-cols-3 gap-4">
        {agents.map((agent) => (
          <div
  key={agent._id}
  onClick={() => navigate(`/app/agents/${agent._id}`)}
  className="bg-zinc-900 p-4 rounded border border-zinc-800 cursor-pointer hover:border-emerald-500 transition"
>
  <h3 className="font-semibold">{agent.name}</h3>
  <p className="text-sm text-zinc-400 mt-1 line-clamp-2">
    {agent.systemPrompt}
  </p>
</div>

        ))}
      </div>
    </div>
  );
}

export default Agents;
