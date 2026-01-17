import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Agents from "./pages/Agents.jsx";
import Chat from "./pages/Chat.jsx";






function App() {
  return (
    <BrowserRouter>
      <div className="h-screen w-full font-mono">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/app" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
          <Route
  path="/app/projects/:projectId"
  element={
    <ProtectedRoute>
      <Agents />
    </ProtectedRoute>
  }
/>

            <Route
  path="/app/agents/:agentId"
  element={
    <ProtectedRoute>
      <Chat />
    </ProtectedRoute>
  }
/>



        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
