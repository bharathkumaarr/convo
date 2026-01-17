import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/register", { email, password });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-zinc-950 text-zinc-100">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-6 rounded-xl w-96"
      >
        <h2 className="text-2xl mb-4">Register</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          className="w-full p-2 mb-3 rounded bg-zinc-800"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-4 rounded bg-zinc-800"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full p-2 bg-emerald-500 text-black rounded">
          Register
        </button>
        <p onClick={() => navigate("/login")} className="mt-4 text-sm text-zinc-400 cursor-pointer hover:text-zinc-200">
            Already have an account? Login
        </p>

      </form>
    </div>
  );
}

export default Register;
