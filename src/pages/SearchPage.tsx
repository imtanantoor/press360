import { useLocation, useSearchParams } from "react-router";
import NewsLayout from "../layout/NewsLayout";
import SearchAndFilters from "../components/Search/SearchAndFilters";
import { useEffect, useState } from "react";
import ArticleList from "../components/Article/ArticleList";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchSearchResults } from "../redux/searchSlice";
import useDebounce from "../hooks/debounce";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const [searchValue, setSearchValue] = useState(keyword || "");
  const location = useLocation();
  const { articles, loading } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();
  const debouncedSearch = useDebounce(
    (searchParams: Record<string, string>) =>
      dispatch(fetchSearchResults(searchParams)),
    500
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
    searchParams.set("keyword", e.target.value);
    location.search = searchParams.toString();
    window.history.replaceState(
      null,
      "",
      location.pathname + "?" + searchParams.toString()
    );
    debouncedSearch({ q: e.target.value });
  }

  useEffect(() => {
    dispatch(fetchSearchResults({ q: searchValue }));
  }, []);


  return (
    <NewsLayout>
      <SearchAndFilters
        searchValue={searchValue}
        inputChange={handleInputChange}
        placeholder="Search Press 360"
      />
      {loading ? (
        <p>Fetching results...</p>
      ) : (
        <ArticleList articles={articles} title="Search Results" />
      )}
    </NewsLayout>
  );
}

export default SearchPage;
