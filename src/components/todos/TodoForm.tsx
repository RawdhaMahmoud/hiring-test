
import { useState } from "react";
import type { FormEvent, RefObject } from "react";
import Modal from "./ModalTodo";
import FormInput from "../ui/FormInput";
import TimeRangeInput from "../ui/TimeRangeInput";

interface TodoFormProps {
  onAdd: (title: string, description: string, timeRange: string) => void;
  inputRef?: RefObject<HTMLInputElement | null>;
  isOpen?: boolean;
  onClose?: () => void;
  initialTitle?: string;
  initialDescription?: string;
  initialTimeRange?: string;
}

const parseTimeRange = (timeRange: string) => {
  if (!timeRange) return { start: "09:00", end: "10:00" };
  const [start, end] = timeRange.split(" - ");
  return { start: start || "09:00", end: end || "10:00" };
};

const TodoForm = ({
  onAdd,
  inputRef,
  isOpen = true,
  onClose,
  initialTitle = "",
  initialDescription = "",
  initialTimeRange = ""
}: TodoFormProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const { start: defaultStart, end: defaultEnd } = parseTimeRange(initialTimeRange);
  const [startTime, setStartTime] = useState(defaultStart);
  const [endTime, setEndTime] = useState(defaultEnd);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStartTime("09:00");
    setEndTime("10:00");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) return;

    const formattedTimeRange = `${startTime} - ${endTime}`;
    onAdd(title, description, formattedTimeRange);

    resetForm();
    if (onClose) onClose();
  };

  const modalTitle = initialTitle ? "Edit Task" : "Add New Task";
  const buttonText = initialTitle ? "Save Changes" : "Add Task";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={modalTitle}>
      <form className="task-form" onSubmit={handleSubmit}>
        <FormInput
          label="Title"
          placeholder="Add a new task title..."
          value={title}
          onChange={setTitle}
          inputRef={inputRef}
          required
        />

        <FormInput
          label="Description"
          placeholder="Add description (optional)..."
          value={description}
          onChange={setDescription}
        />

        <TimeRangeInput
          startTime={startTime}
          endTime={endTime}
          onStartTimeChange={setStartTime}
          onEndTimeChange={setEndTime}
        />

        <button
          disabled={!title.trim()}
          className="form-submit"
          type="submit"
        >
          {buttonText}
        </button>
      </form>
    </Modal>
  );
};

export default TodoForm;