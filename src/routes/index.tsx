import { Route, Routes } from "react-router";
import HomePage from "../pages/Home";
import MainLayout from "../layout/main";
import ArticlePage from "../pages/ArticlePage";
import SportsPage from "../pages/SportsPage";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index path="/" element={<HomePage />} />
        <Route path="/article" element={<ArticlePage />} />
        <Route path="/sports" element={<SportsPage />} />
      </Route>
    </Routes>
  );
}
export default AppRoutes;
