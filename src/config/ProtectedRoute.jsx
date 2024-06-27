import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ErrorPage from "../pages/ErrorPage";

const ProtectedRoute = ({ children, requiredRoles }) => {
  const { user } = useContext(AuthContext);

  if (user?.role && !requiredRoles?.some((r) => user?.role === r)) {
    return <ErrorPage />;
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;