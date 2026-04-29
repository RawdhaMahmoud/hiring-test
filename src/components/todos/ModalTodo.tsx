import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title: string;
  children: ReactNode;
}

const ModalTodo = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close" 
          onClick={onClose} 
          type="button" 
          aria-label="Close modal"
        >
          &times;
        </button>
        <h2 className="modal-title">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default ModalTodo;