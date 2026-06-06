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

function formatDueDate(dateStr) {
  if (!dateStr) return null;
  const date = new Date(dateStr + "T00:00:00");
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function isOverdue(dateStr) {
  if (!dateStr) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dateStr + "T00:00:00") < today;
}

export default function TaskItem({ task, onToggle, onDelete }) {
  const { id, title, description, priority, completed, createdAt, dueDate } = task;
  const badge = priorityColors[priority];
  const overdue = !completed && isOverdue(dueDate);

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
          <div className="task-item-meta">
            <span className="task-item-date">{formatTaskDate(createdAt)}</span>
            <span className={`task-item-due ${overdue ? "task-item-due--overdue" : ""} ${!dueDate ? "task-item-due--none" : ""}`}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {dueDate ? formatDueDate(dueDate) : "No due date"}
            </span>
          </div>
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
