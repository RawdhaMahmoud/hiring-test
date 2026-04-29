
import { BiPencil, BiTrash } from "react-icons/bi";

interface DropdownMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

const DropdownMenu = ({ onEdit, onDelete }: DropdownMenuProps) => {
  return (
    <div className="menu-panel">
      <button className="menu-item" onClick={onEdit}>
        <BiPencil className="menu-icon" />
        Edit Details
      </button>
      <button 
        className="menu-item is-danger" 
        onClick={onDelete}
      >
        <BiTrash className="menu-icon" />
        Delete Task
      </button>
    </div>
  );
};

export default DropdownMenu;