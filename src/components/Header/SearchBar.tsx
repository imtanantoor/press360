import { useNavigate } from "react-router";
import searchIcon from '../../assets/icons/searchIcon.svg'
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
    <div className="search-bar-container">
      <input
        type="text"
        placeholder={"Search"}
        className="search-bar"
        onChange={handleChange}
      />
      <img src={searchIcon} alt="search" className="search-icon" />
    </div>
  );
}

export default SearchBar;
