import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { publicRoutes, privateRoutes, staticRoute } from "../../routes";
import { useSelector } from "../../store/store.ts";
import { selectIsAuth } from "../../slices/sliceStorage/userSlice.ts";

const AppRouter = () => {
  const isAuth = useSelector(selectIsAuth);
  return (
    <Routes>
      <Route path={staticRoute.path} element={staticRoute.component} />
      {publicRoutes.map((route) => (
        <Route
          path={route.path}
          element={<ProtectedRoute children={route.component} isAuth={isAuth} />}
        />
      ))}
      {privateRoutes.map((route) => (
        <Route
          path={route.path}
          element={<ProtectedRoute authOnly children={route.component} isAuth={isAuth} />}
        />
      ))}
    </Routes>
  );
};

export default AppRouter;
