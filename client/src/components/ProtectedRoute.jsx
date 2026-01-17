import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../services/auth";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const ok = await checkAuth();
      setAuthenticated(ok);
      setLoading(false);
    };
    verify();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center from-[#0b1f2a] from-0% via-[#132f3d] via-25% to-[#eef2f5] to-100% text-zinc-100">
        Checking authentication...
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
