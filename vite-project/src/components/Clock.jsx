import { useState, useEffect } from "react";

export default function Clock({ showSeconds }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return showSeconds
      ? `${hours}:${minutes}:${seconds}`
      : `${hours}:${minutes}`;
  };

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
        backgroundColor: "var(--surface)",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          fontSize: "4rem",
          fontWeight: "700",
          color: "var(--primary)",
          textShadow: "0 0 10px rgba(var(--primary-rgb), 0.3)",
          fontFamily: "var(--font-primary)",
          letterSpacing: "2px",
        }}
      >
        {formatTime(currentTime)}
      </div>
      <div
        style={{
          marginTop: "1rem",
          fontSize: "1rem",
          color: "var(--text-secondary)",
          fontFamily: "var(--font-secondary)",
        }}
      >
        {formatDate(currentTime)}
      </div>
    </div>
  );
}
