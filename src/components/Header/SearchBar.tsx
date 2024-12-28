import { useNavigate } from "react-router";
import useDebounce from "../../hooks/debounce";

function SearchBar() {
  const navigate = useNavigate();
  const debouncedSearch = useDebounce(
    (input: string) => navigate(`/search?keyword=${input}`),
    500
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    debouncedSearch(e.target.value);
  }

  return (
    <input
      type="text"
      placeholder={"Search"}
      className="search-bar"
      onChange={handleChange}
    />
  );
}

export default SearchBar;
