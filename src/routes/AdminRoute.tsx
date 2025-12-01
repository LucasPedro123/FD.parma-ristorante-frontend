import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function AdminRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;

  if (!user) return <Navigate to="/login" />;

  return user.role === "Admin" ? children : <Navigate to="/" />;
}
