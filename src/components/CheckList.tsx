import CheckListItem from "../models/CheckListItem.model";

interface CheckListProps {
  items: CheckListItem[];
  onChange: (items: CheckListItem[]) => void;
  title: string;
}

const CheckList: React.FC<CheckListProps> = ({ items, onChange, title }) => {
  const handleCheckboxChange = (itemId: string | number) => {
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );
    onChange(updatedItems);
  };

  return (
    <div className="checklist">
      <div className="checklist-header">
        <h3>{title}</h3>
      </div>
      {items.map((item) => (
        <div key={item.id} className="checklist-item">
          <label>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleCheckboxChange(item.id)}
            />
            <span className="ml-2">{item.label}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckList;
