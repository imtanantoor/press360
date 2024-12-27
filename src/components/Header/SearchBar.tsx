import { useState } from "react";
import { useLocation } from "react-router";
import { setQuery } from "../../redux/searchSlice";
import { useAppDispatch } from "../../hooks/reduxHooks";
import useDebounce from "../../hooks/debounce";

function SearchBar() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryParam = searchParams.get("q");
  const [input, setInput] = useState(queryParam || "");
  const dispatch = useAppDispatch();

  const debouncedSearch = useDebounce(() => dispatch(setQuery(input)), 500);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
    searchParams.set("q", e.target.value);
    location.search = searchParams.toString();
    window.history.replaceState(null, "", location.pathname + "?" + searchParams.toString());
    debouncedSearch();
  }

  return (
    <input
      type="text"
      placeholder="Search"
      className="search-bar"
      value={input}
      onChange={handleChange}
    />
  );
}

export default SearchBar;
