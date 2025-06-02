import "./App.css";
import AppRouter from "./components/AppRouter/AppRouter";
import { Layout } from "antd"; // Правильный импорт Layout
import NavBar from "./components/NavBar/NavBar";

function App() {
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
