import { useState } from "react";
import { useLocation } from "react-router";

function SearchBar() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryParam = searchParams.get("q");
  const [query, setQuery] = useState(queryParam || "");

  return (
    <input
      type="text"
      placeholder="Search"
      className="search-bar"
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        searchParams.set("q", e.target.value);
        location.search = searchParams.toString();
        window.history.replaceState(null, "", location.pathname + "?" + searchParams.toString());
      }}
    />
  );
}

export default SearchBar;
