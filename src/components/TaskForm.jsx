import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    onAdd({
      id: crypto.randomUUID(),
      title: trimmed,
      description: description.trim(),
      priority,
      dueDate: dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
    });

    setTitle("");
    setDescription("");
    setPriority("medium");
    setDueDate("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2 className="section-title">New Task</h2>
      <div className="task-form-fields">
        <input
          className="task-form-input"
          type="text"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="task-form-textarea"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
        <input
          className="task-form-input task-form-date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <div className="task-form-row">
          <select
            className="task-form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button className="btn btn--primary" type="submit">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
}
