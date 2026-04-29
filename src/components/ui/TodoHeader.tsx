
import Checkbox from "./Checkbox";
import MenuButton from "./MenuButton";
import type { ComponentType } from "react";

const MenuButtonComponent: ComponentType<{
  todoTitle: string;
  onEdit: () => void;
  onDelete: () => void;
}> = MenuButton;

interface TodoHeaderProps {
  title: string;
  completed: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const TodoHeader = ({ 
  title, 
  completed, 
  onToggle, 
  onEdit, 
  onDelete 
}: TodoHeaderProps) => {
  const checkboxLabel = `Mark "${title}" as ${completed ? "active" : "completed"}`;

  return (
    <div className="task-header">
      <Checkbox 
        checked={completed} 
        onChange={onToggle} 
        label={checkboxLabel} 
      />
      <p className="task-title">{title}</p>
      <MenuButtonComponent 
        todoTitle={title} 
        onEdit={onEdit} 
        onDelete={onDelete} 
      />
    </div>
  );
};

export default TodoHeader;