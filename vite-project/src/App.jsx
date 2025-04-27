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
  const [font, setFont] = useState("futuristic");

  useEffect(() => {
    const savedShowSeconds = localStorage.getItem("showSeconds");
    const savedTheme = localStorage.getItem("theme");
    const savedFont = localStorage.getItem("font");

    if (savedShowSeconds !== null) {
      setShowSeconds(savedShowSeconds === "true");
    }
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
    if (savedFont) {
      setFont(savedFont);
      document.documentElement.setAttribute("data-font", savedFont);
    }
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleFontChange = (newFont) => {
    setFont(newFont);
    localStorage.setItem("font", newFont);
    document.documentElement.setAttribute("data-font", newFont);
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
        maxWidth: "500px",
        margin: "0 auto",
        fontFamily: "var(--font-secondary)",
      }}
    >
      <header style={{ textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "2rem",
            letterSpacing: "2px",
            color: "var(--primary)",
            textShadow: "0 0 10px rgba(var(--primary-rgb), 0.3)",
            marginBottom: "0.25rem",
          }}
        >
          Time Keeper
        </h1>
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
            <Clock showSeconds={showSeconds} />
          </div>
          <div style={{ marginTop: "1.5rem" }}>
            <Settings
              showSeconds={showSeconds}
              setShowSeconds={setShowSeconds}
              showAdvancedSettings={showAdvancedSettings}
              setShowAdvancedSettings={setShowAdvancedSettings}
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
            <div className="font-selector">
              <div
                className={`font-option ${font === "classic" ? "active" : ""}`}
                onClick={() => handleFontChange("classic")}
                style={{ fontFamily: "Roboto Mono, monospace" }}
              >
                Classic
              </div>
              <div
                className={`font-option ${font === "modern" ? "active" : ""}`}
                onClick={() => handleFontChange("modern")}
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Modern
              </div>
              <div
                className={`font-option ${font === "tech" ? "active" : ""}`}
                onClick={() => handleFontChange("tech")}
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                Tech
              </div>
              <div
                className={`font-option ${
                  font === "futuristic" ? "active" : ""
                }`}
                onClick={() => handleFontChange("futuristic")}
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                Futuristic
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
            <span style={{ color: "var(--primary)" }}>15 minutes:</span> Perfect
            for quick tasks and frequent check-ins
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <span style={{ color: "var(--primary)" }}>30 minutes:</span> Ideal
            for focused work sessions
          </li>
          <li>
            <span style={{ color: "var(--primary)" }}>1 hour:</span> Great for
            longer tasks and meetings
          </li>
        </ul>
      </div>
    </div>
  );
}
