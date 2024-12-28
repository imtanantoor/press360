import DropdownProps from "../models/DropdownProps.model";

function Dropdown({
  options,
  onSelect,
  isOpen,
  setIsOpen,
  selected = "Please select",
  setSelected,
}: DropdownProps & {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selected: string;
  setSelected: (selected: string) => void;
}) {
  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <button onClick={() => setIsOpen(!isOpen)} className="dropdown">
      <p>{selected}</p>

      {isOpen && (
        <ul className="dropdown-options">
          {options.map((option) => (
            <li key={option} onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </button>
  );
}

export default Dropdown;
