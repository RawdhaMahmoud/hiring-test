
import { useState, useRef, useEffect } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import DropdownMenu from "./DropdownMenu";

interface MenuButtonProps {
  todoTitle: string;
  onEdit: () => void;
  onDelete: () => void;
}

const MenuButton = ({ todoTitle, onEdit, onDelete }: MenuButtonProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleEdit = () => {
    setIsMenuOpen(false);
    onEdit();
  };

  const handleDelete = () => {
    setIsMenuOpen(false);
    onDelete();
  };

  return (
    <div className="menu-wrap" ref={menuRef}>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`menu-btn ${isMenuOpen ? "is-active" : ""}`}
        aria-label={`Options for "${todoTitle}"`}
      >
        <BiDotsHorizontalRounded />
      </button>

      {isMenuOpen && (
        <DropdownMenu onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default MenuButton;