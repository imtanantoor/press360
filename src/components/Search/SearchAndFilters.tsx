import SearchInput from "./SearchInput";
import Filters from "./Filters";
import SearchInputProps from "../../models/SearchInputProps.model";

function SearchAndFilters({ searchValue,inputChange }: Readonly<SearchInputProps>) {
  return (
    <div className="search-and-filters">
      <SearchInput
        placeholder="Search Press 360"
        searchValue={searchValue}
        inputChange={inputChange}
      />
      <Filters />
    </div>
  );
}

export default SearchAndFilters;
