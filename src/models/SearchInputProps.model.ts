interface SearchInputProps {
  placeholder: string;
  searchValue: string;
  inputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default SearchInputProps;
