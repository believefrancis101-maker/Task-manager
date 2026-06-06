const FILTERS = [
  { key: "all", label: "All Tasks" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
];

export default function FilterBar({ current, onChange }) {
  return (
    <div className="filter-bar">
      {FILTERS.map((f) => (
        <button
          key={f.key}
          className={`filter-btn ${current === f.key ? "filter-btn--active" : ""}`}
          onClick={() => onChange(f.key)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
