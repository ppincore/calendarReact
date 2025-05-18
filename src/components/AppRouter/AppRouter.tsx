import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import { publicRoutes, privateRoutes, staticRoute } from "../../routes";
const AppRouter = () => {
  return (
    <Routes>
      <Route path={staticRoute.path} element={staticRoute.component} />
      {publicRoutes.map((route) => (
        <Route
          path={route.path}
          element={<ProtectedRoute children={route.component} />}
        />
      ))}
      {privateRoutes.map((route) => (
        <Route
          path={route.path}
          element={<ProtectedRoute authOnly children={route.component} />}
        />
      ))}
    </Routes>
  );
};

export default AppRouter;
