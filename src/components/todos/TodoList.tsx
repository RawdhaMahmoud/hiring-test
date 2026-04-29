import { useState, useRef } from "react";
import { BiPlus, BiSearch } from "react-icons/bi";
import useTodos from "../../hooks/useTodos";
import TodoFilters from "./TodoFilters";
import TodoStats from "./TodoStats";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

const TodoList = () => {
  const {
    filteredTodos,
    totalCount,
    completedCount,
    searchQuery,
    activeTab,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    setSearchQuery,
    setActiveTab,
    loading,
  } = useTodos();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const addInputRef = useRef<HTMLInputElement>(null);

  const handleOpenAddForm = () => {
    setIsFormOpen(true);
    setTimeout(() => addInputRef.current?.focus(), 100);
  };

  return (
    <div className="task-board">
      <div className="list-toolbar">
        <div className="toolbar-actions">
          <label className="search-box" aria-label="Search todo list">
            <BiSearch className="search-icon" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search List"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>

          <button className="add-task-btn" onClick={handleOpenAddForm}>
            <BiPlus aria-hidden="true" />
            Add New List
          </button>
        </div>
      </div>

      <TodoFilters activeTab={activeTab} onTabChange={setActiveTab} />

      <TodoStats
        total={totalCount}
        completed={completedCount}
        filteredCount={filteredTodos.length}
        isSearching={searchQuery.trim().length > 0}
      />

      {loading ? (
        <div className="loading-state">
          <div className="spinner" />
          <p>Syncing with database...</p>
        </div>
      ) : filteredTodos.length === 0 ? (
        <div className="empty-state">
          
          <p>
            {searchQuery
              ? "No tasks match your search."
              : activeTab === "active"
                ? "No active tasks right now."
                : "No completed tasks yet."}
          </p>
        </div>
      ) : (
        <div className="task-grid">
          {filteredTodos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
              index={index}
            />
          ))}
        </div>
      )}

      <TodoForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onAdd={addTodo}
        inputRef={addInputRef}
      />
    </div>
  );
};

export default TodoList;