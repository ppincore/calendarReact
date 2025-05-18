import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children: ReactNode;
  authOnly?: boolean;
};

export const ProtectedRoute = ({ children, authOnly }: ProtectedRouteProps) => {
  const isAuth = true
  const location = useLocation();


  if (authOnly && !isAuth) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (!authOnly && isAuth) {
    return <Navigate replace to={'/'} />;
  }

  return children;
};

export default ProtectedRoute;
