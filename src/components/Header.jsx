import { useEffect, useState } from "react";

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export default function Header() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <div className="header-logo">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect width="36" height="36" rx="10" fill="#4a6cf7" />
            <path
              d="M10 19l5 5 11-12"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div>
            <h1 className="header-title">TaskFlow</h1>
            <p className="header-subtitle">Personal Productivity Dashboard</p>
          </div>
        </div>
      </div>
      <div className="header-right">
        <p className="header-date">{formatDate(now)}</p>
        <p className="header-motivation">
          Stay focused. One task at a time.
        </p>
      </div>
    </header>
  );
}
