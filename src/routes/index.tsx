import { Route, Routes } from "react-router";
import HomePage from "../pages/Home";
import MainLayout from "../layout/main";
import ArticlePage from "../pages/ArticlePage";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index path="/" element={<HomePage />} />
        <Route path="/article" element={<ArticlePage />} />
      </Route>
    </Routes>
  );
}
export default AppRoutes;
