import CategoryPage from "../components/CategoryPage";
import { useAppSelector } from "../hooks/reduxHooks";
function SportsPage() {
  const { query } = useAppSelector((state) => state.search);
  return <CategoryPage category="sports" query={query} />;
}

export default SportsPage;
