import type { TabType } from "../../types";

interface TodoFiltersProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}
const TodoFilters = ({
  activeTab,
  onTabChange,
}: TodoFiltersProps) => {
  return (
    <div className="filter-bar">
      <div className="filter-tabs">
        <button
          className={`filter-tab ${activeTab === "active" ? "is-active" : ""}`}
          onClick={() => onTabChange("active")}
        >
          Active Task
        </button>
        <button
          className={`filter-tab ${activeTab === "completed" ? "is-active" : ""}`}
          onClick={() => onTabChange("completed")}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default TodoFilters;