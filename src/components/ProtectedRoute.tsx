import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@contexts/authContext";
import Loader from "./ui-componets/load/Loader";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
