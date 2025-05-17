import { type ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface IProtectedRouteProps {
  children: ReactElement;
  unAuth?: boolean;
}

const ProtectedRoute = (props: IProtectedRouteProps) => {
  const { children, unAuth } = props;
  const location = useLocation();
  const isAuth = false;

  if (unAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  console.log(!isAuth && !unAuth)
  if (!isAuth && !unAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
