import { useState } from "react";
import Dropdown from "../Dropdown";
import { RootState } from "../../redux/store";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { fetchSearchResults, setFilters } from "../../redux/searchSlice";
import useDebounce from "../../hooks/debounce";
import moment from "moment";

function Filters() {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const filters = useAppSelector((state: RootState) => state.search.filters);

  const dispatch = useAppDispatch();
  const debouncedSearch = useDebounce(
    (searchParams: Record<string, string>) =>
      dispatch(fetchSearchResults(searchParams)),
    500
  );

  const categories = [
    "Business",
    "Entertainment",
    "General",
    "Health",
    "Sciences",
    "Sports",
    "Technology",
  ];
  const sources = [
    "Google News",
    "BBC News",
    "CNN News",
    "Reuters",
    "The Guardian",
    "The New York Times",
    "The Washington Post",
  ];

  function onSelect(key: string, value: string) {
    dispatch(setFilters({ ...filters, [key]: value }));
    debouncedSearch({ ...filters, [key]: value });
  }

  function onDateChange(date: string) {
    dispatch(
      setFilters({ ...filters, date: moment(date).format("YYYY-MM-DD") })
    );
    debouncedSearch({ ...filters, date: moment(date).format("YYYY-MM-DD") });
  }

  return (
    <div className="filters">
      <input type="date" onChange={(e) => onDateChange(e.target.value)} />
      <Dropdown
        options={categories}
        onSelect={(category) => onSelect("category", category)}
        isOpen={isOpen1}
        setIsOpen={setIsOpen1}
        selected={!!filters.category ? filters.category : "Select category"}
      />
      <Dropdown
        options={sources}
        onSelect={(source) => onSelect("source", source)}
        isOpen={isOpen2}
        setIsOpen={setIsOpen2}
        selected={!!filters.source ? filters.source : "Select source"}
      />
    </div>
  );
}

export default Filters;
