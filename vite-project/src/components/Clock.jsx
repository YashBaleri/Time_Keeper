import { useState, useEffect, useRef } from "react";

export default function Clock({ showSeconds, is24Hour, selectedTune }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const audioRef = useRef(null);

  // Cleanup audio when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      // Check if it's time to play the reminder
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const interval = Number(localStorage.getItem("reminderInterval")) || 60;
      const isSoundEnabled = localStorage.getItem("soundEnabled") === "true";

      if (isSoundEnabled && seconds === 0 && minutes % interval === 0) {
        try {
          // Stop any currently playing audio
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
          }

          // Create and play new audio
          audioRef.current = new Audio(`/sounds/${selectedTune}.wav`);
          audioRef.current.play().catch((error) => {
            console.error("Error playing audio:", error);
          });
        } catch (error) {
          console.error("Error creating audio:", error);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedTune]);

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    let ampm = "";

    if (!is24Hour) {
      ampm = hours >= 12 ? " PM" : " AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
    }

    return `${hours.toString().padStart(2, "0")}:${minutes}${
      showSeconds ? `:${seconds}` : ""
    }${ampm}`;
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
        padding: "1rem",
        textAlign: "center",
        backgroundColor: "var(--surface)",
        borderRadius: "8px",
        boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "4rem",
          color: "var(--primary)",
          textShadow: "0 0 10px rgba(var(--primary-rgb), 0.5)",
          marginBottom: "0.5rem",
        }}
      >
        {formatTime(currentTime)}
      </div>
      <div
        style={{
          fontFamily: "var(--font-secondary)",
          fontSize: "1rem",
          color: "var(--text-secondary)",
        }}
      >
        {formatDate(currentTime)}
      </div>
    </div>
  );
}
