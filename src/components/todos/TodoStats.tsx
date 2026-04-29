interface TodoStatsProps {
  total: number;
  completed: number;
  filteredCount: number;
  isSearching: boolean;
}

const TodoStats = ({ total, completed, filteredCount, isSearching }: TodoStatsProps) => {
  return (
    <div className="list-stats">
      {isSearching ? (
        <span className="stats-badge">
          {filteredCount} {filteredCount === 1 ? "result" : "results"} found
        </span>
      ) : (
        <p className="stats-text">
          {total} tasks · {completed} completed
        </p>
      )}
    </div>
  );
};

export default TodoStats;
