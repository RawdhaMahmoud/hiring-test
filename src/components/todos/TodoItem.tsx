
import { useState } from "react";
import type { CSSProperties } from "react";
import type { Todo } from "../../types";
import TodoHeader from "../ui/TodoHeader";
import TodoContent from "../ui/TodoContent";
import TodoForm from "./TodoForm";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string, newDesc: string, newTimeRange: string) => void;
  index: number;
}

const TodoItem = ({ todo, onToggle, onDelete, onEdit, index }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const cardStyle = {
    backgroundColor: todo.color,
    ["--card-delay" as string]: `${index * 70}ms`,
  } as CSSProperties;

  const handleEdit = (newTitle: string, newDesc: string, newTimeRange: string) => {
    onEdit(todo.id, newTitle, newDesc, newTimeRange);
    setIsEditing(false);
  };

  return (
    <>
      <div
        className={`task-card ${todo.completed ? "is-done" : ""}`}
        style={cardStyle}
      >
        <TodoHeader
          title={todo.title}
          completed={todo.completed}
          onToggle={() => onToggle(todo.id)}
          onEdit={() => setIsEditing(true)}
          onDelete={() => onDelete(todo.id)}
        />

        <TodoContent
          description={todo.description}
          timeRange={todo.timeRange}
        />
      </div>

      {isEditing && (
        <TodoForm
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          initialTitle={todo.title}
          initialDescription={todo.description}
          initialTimeRange={todo.timeRange}
          onAdd={handleEdit}
        />
      )}
    </>
  );
};

export default TodoItem;