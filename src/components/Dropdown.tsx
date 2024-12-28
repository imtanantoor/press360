import DropdownProps from "../models/DropdownProps.model";
import dropDownArrow from "../../src/assets/icons/dropdownArrow.png";

function Dropdown({
  options,
  onSelect,
  isOpen,
  setIsOpen,
  selected = "Please select",
}: DropdownProps & {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selected: string;
}) {
  const handleSelect = (option: string) => {
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
      <img
        src={dropDownArrow}
        alt="dropdown arrow"
        className={isOpen ? "dropdown-arrow-open" : "dropdown-arrow-closed"}
      />
    </button>
  );
}

export default Dropdown;
