import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import { publicRoutes, privateRoutes } from "../../routes";
const AppRouter = () => {
  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route path={route.path} element={route.component} />
      ))}
      {privateRoutes.map((route) => (
        <Route
          path={route.path}
          element={<ProtectedRoute children={route.component} />}
        />
      ))}
    </Routes>
  );
};

export default AppRouter;
