import { Route, Routes } from "react-router";
import HomePage from "../pages/Home";
import MainLayout from "../layout/main";
import ArticlePage from "../pages/ArticlePage";
import SportsPage from "../pages/SportsPage";
import EntertainmentPage from "../pages/EntertainmentPage";
import SciencePage from "../pages/SciencePage";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index path="/" element={<HomePage />} />
        <Route path="/article" element={<ArticlePage />} />
        <Route path="/sports" element={<SportsPage />} />
        <Route path="/entertainment" element={<EntertainmentPage />} />
        <Route path="/science" element={<SciencePage />} />
      </Route>
    </Routes>
  );
}
export default AppRoutes;
