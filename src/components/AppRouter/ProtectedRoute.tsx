import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface IProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = (props: IProtectedRouteProps) => {
  const { children } = props;
  const location = useLocation();
  const isAuth = false; // Здесь должна быть ваша логика проверки аутентификации

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
