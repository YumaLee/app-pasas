import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuth = useAuthStore((state) => state.isAuth);

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
