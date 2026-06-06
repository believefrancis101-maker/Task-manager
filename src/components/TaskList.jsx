import { useState, useMemo } from "react";
import TaskItem from "./TaskItem";
import FilterBar from "./FilterBar";

export default function TaskList({ tasks, onToggle, onDelete }) {
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    if (filter === "active") return tasks.filter((t) => !t.completed);
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  return (
    <section className="task-list-section">
      <div className="task-list-header">
        <h2 className="section-title">Tasks</h2>
        <FilterBar current={filter} onChange={setFilter} />
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <rect x="8" y="12" width="48" height="44" rx="6" stroke="#b2bec3" strokeWidth="2" fill="#fafafa" />
            <line x1="20" y1="28" x2="44" y2="28" stroke="#dfe6e9" strokeWidth="2" strokeLinecap="round" />
            <line x1="20" y1="36" x2="38" y2="36" stroke="#dfe6e9" strokeWidth="2" strokeLinecap="round" />
            <line x1="20" y1="44" x2="32" y2="44" stroke="#dfe6e9" strokeWidth="2" strokeLinecap="round" />
            <circle cx="48" cy="48" r="12" fill="#4a6cf7" opacity="0.15" />
            <path d="M44 48l3 3 5-6" stroke="#4a6cf7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="empty-state-text">
            {filter === "all"
              ? "No tasks yet. Add your first task and get productive."
              : filter === "active"
              ? "No active tasks. You're all caught up!"
              : "No completed tasks yet."}
          </p>
        </div>
      ) : (
        <div className="task-list">
          {filtered.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}
