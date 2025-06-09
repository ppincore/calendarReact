import "./App.css";
import AppRouter from "./components/AppRouter/AppRouter";
import { Layout } from "antd"; // Правильный импорт Layout
import NavBar from "./components/NavBar/NavBar";
import { useEffect } from "react";
import { useDispatch } from "./store/store";
import { fetchUser } from "./slices/sliceStorage/userSlice";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("userName") && localStorage.getItem("auth")) {
      dispatch(
        fetchUser({
          username: localStorage.getItem("userName")!,
          password: localStorage.getItem("password")!,
        })
      );
    }
  }, []);
  return (
    <Layout>
      <NavBar />
      <Layout.Content>
        <AppRouter />
      </Layout.Content>
    </Layout>
  );
}

export default App;
