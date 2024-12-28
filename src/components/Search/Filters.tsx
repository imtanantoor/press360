import { useState } from "react";
import Dropdown from "../Dropdown";

function Filters() {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [selected1, setSelected1] = useState("Select category");
  const [selected2, setSelected2] = useState("Select source");

  return (
    <div className="filters">
      <input type="date" />
      <Dropdown
        options={["Option 1", "Option 2", "Option 3"]}
        onSelect={() => {}}
        isOpen={isOpen1}
        setIsOpen={setIsOpen1}
        selected={selected1}
        setSelected={setSelected1}
      />
      <Dropdown
        options={["Option 1", "Option 2", "Option 3"]}
        onSelect={() => {}}
        isOpen={isOpen2}
        setIsOpen={setIsOpen2}
        selected={selected2}
        setSelected={setSelected2}
      />
    </div>
  );
}

export default Filters;
