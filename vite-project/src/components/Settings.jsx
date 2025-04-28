import { useState, useEffect, useRef } from "react";

export default function Settings({
  showSeconds,
  setShowSeconds,
  showAdvancedSettings,
  setShowAdvancedSettings,
  is24Hour,
  setIs24Hour,
}) {
  const [interval, setIntervalChoice] = useState(60);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [touchStart, setTouchStart] = useState(null);

  useEffect(() => {
    const savedInterval = localStorage.getItem("reminderInterval");
    const savedSoundEnabled = localStorage.getItem("soundEnabled");

    if (savedInterval) {
      setIntervalChoice(Number(savedInterval));
    }
    if (savedSoundEnabled !== null) {
      setIsSoundEnabled(savedSoundEnabled === "true");
    }
  }, []);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;

    const currentTouch = e.touches[0].clientY;
    const diff = touchStart - currentTouch;

    if (diff > 50) {
      setShowAdvancedSettings(false);
    } else if (diff < -50) {
      setShowAdvancedSettings(true);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  function handleIntervalChange(e) {
    const value = Number(e.target.value);
    setIntervalChoice(value);
    localStorage.setItem("reminderInterval", value);
  }

  function handleShowSecondsChange(e) {
    const value = e.target.checked;
    setShowSeconds(value);
    localStorage.setItem("showSeconds", value);
  }

  function handleSoundToggle() {
    const newValue = !isSoundEnabled;
    setIsSoundEnabled(newValue);
    localStorage.setItem("soundEnabled", newValue);
  }

  function handle24HourToggle() {
    const newValue = !is24Hour;
    setIs24Hour(newValue);
  }

  const getStatusMessage = () => {
    if (!isSoundEnabled) {
      return "🔕 Sound is currently OFF - No reminders will play";
    }
    return interval === 15
      ? "🔔 Sound is ON - Reminders will play every 15 minutes"
      : interval === 30
      ? "🔔 Sound is ON - Reminders will play every 30 minutes"
      : "🔔 Sound is ON - Reminders will play every hour";
  };

  return (
    <div
      style={{ marginTop: "2rem", fontFamily: "var(--font-secondary)" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ flex: 1 }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              color: "var(--text-secondary)",
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontSize: "0.8rem",
              fontFamily: "var(--font-secondary)",
            }}
          >
            Frequency
          </label>
          <select
            value={interval}
            onChange={handleIntervalChange}
            style={{
              fontFamily: "var(--font-secondary)",
              width: "100%",
            }}
          >
            <option value={15}>15 minutes</option>
            <option value={30}>30 minutes</option>
            <option value={60}>1 hour</option>
          </select>
        </div>
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              color: "var(--text-secondary)",
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontSize: "0.8rem",
              fontFamily: "var(--font-secondary)",
            }}
          >
            Format
          </label>
          <button
            onClick={handle24HourToggle}
            style={{
              padding: "8px 16px",
              backgroundColor: is24Hour
                ? "var(--primary)"
                : "var(--surface-light)",
              color: is24Hour ? "var(--background)" : "var(--text)",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "1px",
              transition: "all 0.3s ease",
              boxShadow: is24Hour
                ? "0 0 15px rgba(var(--primary-rgb), 0.3)"
                : "none",
              fontFamily: "var(--font-secondary)",
            }}
          >
            {is24Hour ? "24H" : "12H"}
          </button>
        </div>
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              color: "var(--text-secondary)",
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontSize: "0.8rem",
              fontFamily: "var(--font-secondary)",
            }}
          >
            Sound
          </label>
          <button
            onClick={handleSoundToggle}
            style={{
              padding: "8px 16px",
              backgroundColor: isSoundEnabled
                ? "var(--primary)"
                : "var(--surface-light)",
              color: isSoundEnabled ? "var(--background)" : "var(--text)",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "1px",
              transition: "all 0.3s ease",
              boxShadow: isSoundEnabled
                ? "0 0 15px rgba(var(--primary-rgb), 0.3)"
                : "none",
              fontFamily: "var(--font-secondary)",
            }}
          >
            {isSoundEnabled ? "🔔 ON" : "🔕 OFF"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            color: "var(--text-secondary)",
            textTransform: "uppercase",
            letterSpacing: "1px",
            fontSize: "0.8rem",
            fontFamily: "var(--font-secondary)",
          }}
        >
          <input
            type="checkbox"
            checked={showSeconds}
            onChange={handleShowSecondsChange}
          />
          Show seconds
        </label>
      </div>

      <div
        style={{
          color: isSoundEnabled ? "var(--primary)" : "var(--text-secondary)",
          fontSize: "0.8rem",
          marginTop: "0.5rem",
          textAlign: "center",
          fontFamily: "var(--font-secondary)",
        }}
      >
        {getStatusMessage()}
      </div>

      {!showAdvancedSettings ? (
        <div
          style={{
            textAlign: "center",
            color: "var(--text-secondary)",
            fontSize: "0.8rem",
            marginTop: "1rem",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
          onClick={() => setShowAdvancedSettings(true)}
        >
          <div>▼ Show Advanced Settings</div>
          <div
            style={{
              width: "30px",
              height: "2px",
              backgroundColor: "var(--text-secondary)",
              opacity: "0.5",
            }}
          />
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            color: "var(--text-secondary)",
            fontSize: "0.8rem",
            marginTop: "1rem",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
          onClick={() => setShowAdvancedSettings(false)}
        >
          <div>▲ Hide Advanced Settings</div>
          <div
            style={{
              width: "30px",
              height: "2px",
              backgroundColor: "var(--text-secondary)",
              opacity: "0.5",
            }}
          />
        </div>
      )}
    </div>
  );
}
