import { useLocation, useSearchParams } from "react-router";
import NewsLayout from "../layout/NewsLayout";
import SearchAndFilters from "../components/Search/SearchAndFilters";
import { useState } from "react";
function SearchPage() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const [searchValue, setSearchValue] = useState(keyword || "");
  const location = useLocation();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
    searchParams.set("q", e.target.value);
    location.search = searchParams.toString();
    window.history.replaceState(null, "", location.pathname + "?" + searchParams.toString());
  }

  return (
    <NewsLayout>
      <SearchAndFilters
        searchValue={searchValue}
        inputChange={handleInputChange}
        placeholder="Search Press 360"
      />
    </NewsLayout>
  );
}

export default SearchPage;
