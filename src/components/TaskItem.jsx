const priorityColors = {
  high: { bg: "#fde8e8", text: "#c0392b", label: "High" },
  medium: { bg: "#fef3d5", text: "#b7950b", label: "Medium" },
  low: { bg: "#e0f7ed", text: "#1b8a5a", label: "Low" },
};

function formatTaskDate(iso) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

export default function TaskItem({ task, onToggle, onDelete }) {
  const { id, title, description, priority, completed, createdAt } = task;
  const badge = priorityColors[priority];

  return (
    <div className={`task-item ${completed ? "task-item--done" : ""}`}>
      <div className="task-item-main">
        <button
          className={`task-check ${completed ? "task-check--checked" : ""}`}
          onClick={() => onToggle(id)}
          aria-label={completed ? "Mark incomplete" : "Mark complete"}
        >
          {completed && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        <div className="task-item-content">
          <div className="task-item-title-row">
            <span className="task-item-title">{title}</span>
            <span
              className="task-priority"
              style={{ backgroundColor: badge.bg, color: badge.text }}
            >
              {badge.label}
            </span>
          </div>
          {description && (
            <p className="task-item-desc">{description}</p>
          )}
          <span className="task-item-date">{formatTaskDate(createdAt)}</span>
        </div>
      </div>
      <button
        className="task-delete"
        onClick={() => onDelete(id)}
        aria-label="Delete task"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18" />
          <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" />
          <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
        </svg>
      </button>
    </div>
  );
}
