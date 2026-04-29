import type { Todo } from "../types";
import { CARD_COLORS } from "../constants/todoConstants";

type TodoRow = {
  id: string;
  title: string;
  description?: string | null;
  time_range?: string | null;
  timeRange?: string | null;
  completed: boolean;
  color?: string | null;
};

export function getRandomColor(): string {
  return CARD_COLORS[Math.floor(Math.random() * CARD_COLORS.length)];
}

export function normalizeTodo(todo: TodoRow): Todo {
  return {
    id: todo.id,
    title: todo.title,
    description: todo.description || "",
    timeRange: todo.timeRange || todo.time_range || "All day",
    completed: todo.completed,
    color: todo.color || CARD_COLORS[0],
  };
}