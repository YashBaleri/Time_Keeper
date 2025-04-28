import { useState, useEffect } from "react";
import Clock from "./components/Clock";
import Settings from "./components/Settings";

/**
 * Main App component that serves as the root component of the application
 * Renders the application layout and includes the Clock and Settings components
 */
export default function App() {
  const [showSeconds, setShowSeconds] = useState(false);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [theme, setTheme] = useState("white");
  const [font, setFont] = useState("modern");
  const [is24Hour, setIs24Hour] = useState(false);
  const [selectedTune, setSelectedTune] = useState("sci_fi");

  useEffect(() => {
    const savedShowSeconds = localStorage.getItem("showSeconds");
    const savedTheme = localStorage.getItem("theme");
    const savedFont = localStorage.getItem("font");
    const saved24Hour = localStorage.getItem("is24Hour");

    if (savedShowSeconds !== null) {
      setShowSeconds(savedShowSeconds === "true");
    }
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      setTheme("white");
      document.documentElement.setAttribute("data-theme", "white");
      localStorage.setItem("theme", "white");
    }
    if (savedFont) {
      setFont(savedFont);
      document.documentElement.setAttribute("data-font", savedFont);
    } else {
      setFont("modern");
      document.documentElement.setAttribute("data-font", "modern");
      localStorage.setItem("font", "modern");
    }
    if (saved24Hour !== null) {
      setIs24Hour(saved24Hour === "true");
    }
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleFontChange = (event) => {
    const newFont = event.target.value;
    setFont(newFont);
    localStorage.setItem("font", newFont);
    document.documentElement.setAttribute("data-font", newFont);
  };

  const handle24HourChange = (newValue) => {
    setIs24Hour(newValue);
    localStorage.setItem("is24Hour", newValue);
  };

  const handleTuneChange = (event) => {
    setSelectedTune(event.target.value);
  };

  const playTrialTune = () => {
    const audio = new Audio(`/sounds/${selectedTune}.wav`);
    audio.play().catch((error) => {
      console.error("Error playing sound:", error);
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
        background: "var(--background)",
        color: "var(--text)",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "var(--font-secondary)",
      }}
    >
      <header
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          position: "relative",
          padding: "1rem 0",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "3rem",
            letterSpacing: "4px",
            color: "var(--primary)",
            textShadow: "0 0 20px rgba(var(--primary-rgb), 0.7)",
            marginBottom: "0.5rem",
            fontWeight: "800",
            textTransform: "uppercase",
          }}
        >
          TIME KEEPER
        </h1>
        <div
          style={{
            width: "80px",
            height: "3px",
            background: "var(--primary)",
            margin: "0 auto",
            opacity: 0.8,
            borderRadius: "2px",
          }}
        />
      </header>

      <main
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div
          style={{
            width: "100%",
            padding: "1.5rem",
            backgroundColor: "var(--surface)",
            borderRadius: "12px",
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
            border: "1px solid rgba(var(--primary-rgb), 0.1)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="tech-border glow">
            <Clock
              showSeconds={showSeconds}
              is24Hour={is24Hour}
              selectedTune={selectedTune}
            />
          </div>
          <div style={{ marginTop: "1.5rem" }}>
            <Settings
              showSeconds={showSeconds}
              setShowSeconds={setShowSeconds}
              showAdvancedSettings={showAdvancedSettings}
              setShowAdvancedSettings={setShowAdvancedSettings}
              is24Hour={is24Hour}
              setIs24Hour={handle24HourChange}
            />
          </div>
        </div>

        {showAdvancedSettings && (
          <div
            style={{
              width: "100%",
              padding: "1.5rem",
              backgroundColor: "var(--surface)",
              borderRadius: "12px",
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
              border: "1px solid rgba(var(--primary-rgb), 0.1)",
              position: "relative",
              overflow: "hidden",
              animation: "slideDown 0.3s ease-out",
            }}
          >
            <div
              style={{
                color: "var(--text-secondary)",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontSize: "0.8rem",
                marginBottom: "1rem",
                fontFamily: "var(--font-secondary)",
              }}
            >
              Advanced Settings
            </div>
            <div className="theme-selector" style={{ marginBottom: "1.5rem" }}>
              <div
                className={`theme-option ${theme === "white" ? "active" : ""}`}
                style={{ backgroundColor: "#ffffff" }}
                onClick={() => handleThemeChange("white")}
                title="White Theme"
              />
              <div
                className={`theme-option ${theme === "cyan" ? "active" : ""}`}
                style={{ backgroundColor: "#00fff2" }}
                onClick={() => handleThemeChange("cyan")}
                title="Cyan Theme"
              />
              <div
                className={`theme-option ${theme === "red" ? "active" : ""}`}
                style={{ backgroundColor: "#ff3b3b" }}
                onClick={() => handleThemeChange("red")}
                title="Red Theme"
              />
              <div
                className={`theme-option ${theme === "orange" ? "active" : ""}`}
                style={{ backgroundColor: "#ff7b00" }}
                onClick={() => handleThemeChange("orange")}
                title="Orange Theme"
              />
              <div
                className={`theme-option ${theme === "green" ? "active" : ""}`}
                style={{ backgroundColor: "#00ff88" }}
                onClick={() => handleThemeChange("green")}
                title="Green Theme"
              />
              <div
                className={`theme-option ${theme === "purple" ? "active" : ""}`}
                style={{ backgroundColor: "#b388ff" }}
                onClick={() => handleThemeChange("purple")}
                title="Purple Theme"
              />
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
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
                Font
              </label>
              <select
                value={font}
                onChange={handleFontChange}
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                <option value="modern">Modern</option>
                <option value="classic">Classic</option>
                <option value="tech">Tech</option>
                <option value="futuristic">Futuristic</option>
              </select>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
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
                Reminder Tone
              </label>
              <div
                style={{ display: "flex", gap: "1rem", alignItems: "center" }}
              >
                <select
                  value={selectedTune}
                  onChange={handleTuneChange}
                  style={{
                    fontFamily: "var(--font-secondary)",
                    flex: 1,
                  }}
                >
                  <option value="sci_fi">Sci-Fi</option>
                  <option value="happy_bells">Happy Bells</option>
                  <option value="urgent_simple">Urgent Simple</option>
                </select>
                <button
                  onClick={playTrialTune}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "var(--primary)",
                    color: "var(--background)",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    transition: "all 0.3s ease",
                    boxShadow: "0 0 15px rgba(var(--primary-rgb), 0.3)",
                    fontFamily: "var(--font-secondary)",
                  }}
                >
                  Play
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <div
        style={{
          width: "100%",
          padding: "1.5rem",
          backgroundColor: "var(--surface)",
          borderRadius: "12px",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(var(--primary-rgb), 0.1)",
          marginTop: "1rem",
        }}
      >
        <h3
          style={{
            color: "var(--text-secondary)",
            textTransform: "uppercase",
            letterSpacing: "1px",
            fontSize: "0.9rem",
            marginBottom: "1rem",
            fontFamily: "var(--font-secondary)",
          }}
        >
          Reminder Frequencies
        </h3>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            color: "var(--text-secondary)",
            fontSize: "0.85rem",
            lineHeight: "1.6",
          }}
        >
          <li style={{ marginBottom: "0.5rem" }}>
            <span style={{ color: "var(--primary)" }}>15 minutes:</span>{" "}
            Reminders will play at quarter-hour intervals (e.g., 1:00, 1:15,
            1:30, 1:45)
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <span style={{ color: "var(--primary)" }}>30 minutes:</span>{" "}
            Reminders will play at half-hour intervals (e.g., 1:00, 1:30, 2:00)
          </li>
          <li>
            <span style={{ color: "var(--primary)" }}>1 hour:</span> Reminders
            will play at the top of each hour (e.g., 1:00, 2:00, 3:00)
          </li>
        </ul>
      </div>

      <div
        style={{
          width: "100%",
          padding: "1.5rem",
          backgroundColor: "var(--surface)",
          borderRadius: "12px",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(var(--primary-rgb), 0.1)",
          marginTop: "1rem",
        }}
      >
        <h3
          style={{
            color: "var(--text-secondary)",
            textTransform: "uppercase",
            letterSpacing: "1px",
            fontSize: "0.9rem",
            marginBottom: "1rem",
            fontFamily: "var(--font-secondary)",
          }}
        >
          About Time Keeper
        </h3>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "0.85rem",
            lineHeight: "1.6",
            marginBottom: "0.5rem",
          }}
        >
          Time Keeper is a minimalist time management tool designed to help you
          stay aware of time passing. It provides gentle reminders at regular
          intervals to help you maintain focus and manage your time effectively.
        </p>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "0.85rem",
            lineHeight: "1.6",
          }}
        >
          Customize your experience with different themes, fonts, and reminder
          tones. Choose your preferred reminder frequency and enable/disable
          sound notifications as needed.
        </p>
      </div>
    </div>
  );
}
