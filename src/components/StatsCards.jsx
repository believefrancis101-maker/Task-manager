const cards = [
  {
    key: "total",
    label: "Total Tasks",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
  },
  {
    key: "completed",
    label: "Completed",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12l3 3 5-5" />
      </svg>
    ),
  },
  {
    key: "remaining",
    label: "Remaining",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
];

export default function StatsCards({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const remaining = total - completed;

  const values = { total, completed, remaining };

  return (
    <div className="stats-cards">
      {cards.map((card) => (
        <div key={card.key} className={`stat-card stat-card--${card.key}`}>
          <div className="stat-card-icon">{card.icon}</div>
          <div className="stat-card-body">
            <span className="stat-card-value">{values[card.key]}</span>
            <span className="stat-card-label">{card.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
