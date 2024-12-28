import SearchInputProps from "../../models/SearchInputProps.model";

function SearchInput({
  placeholder = "Search",
  searchValue,
  inputChange,
}: SearchInputProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={searchValue}
      onChange={inputChange}
      className="search-input"
    />
  );
}

export default SearchInput;
