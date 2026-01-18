import { useEffect, useState } from "react";
import { getProjects } from "../services/projects";
import { createProject } from "../services/projects";
import { useNavigate } from "react-router-dom";



function Dashboard() {
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const [newProjectName, setNewProjectName] = useState("");
    const [creating, setCreating] = useState(false);


  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

    const handleCreateProject = async () => {
  if (!newProjectName.trim()) return;

  try {
    setCreating(true);
    const project = await createProject(newProjectName);
    setProjects((prev) => [project, ...prev]);
    setNewProjectName("");
  } catch (err) {
    console.error("Failed to create project");
  } finally {
    setCreating(false);
  }
};


  return (
    <div className="h-screen w-full bg-zinc-950 text-zinc-100 flex">
        <h2 className="text-xl font-bold">Convo</h2>
      {/* <aside className="w-64 bg-zinc-900 p-4">
      </aside> */}

      <main className="flex-1 p-6">
        <h1 className="text-2xl mb-4">Projects</h1>

        {loading && <p className="text-zinc-400">Loading projects...</p>}

        {!loading && projects.length === 0 && (
          <p className="text-zinc-400">No projects yet.</p>
        )}


        <div className="mb-6 flex gap-2">
  <input
    className="bg-zinc-900 border border-zinc-800 rounded px-3 py-2 w-64"
    placeholder="New project name"
    value={newProjectName}
    onChange={(e) => setNewProjectName(e.target.value)}
  />

  <button
    onClick={handleCreateProject}
    disabled={creating}
    className="bg-emerald-500 text-black px-4 rounded disabled:opacity-50"
  >
    {creating ? "Creating..." : "Create"}
  </button>
</div>


        <div className="grid grid-cols-3 gap-4">
          {projects.map((project) => (
            <div
  key={project._id}
  onClick={() => navigate(`/app/projects/${project._id}`)}
  className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 cursor-pointer hover:border-emerald-500 transition"
>
  <h3 className="text-lg font-semibold">
    {project.name}
  </h3>
</div>

          ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
