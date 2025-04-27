// Import the Clock and Settings components
import Clock from "./components/Clock";
import Settings from "./components/Settings";

/**
 * Main App component that serves as the root component of the application
 * Renders the application layout and includes the Clock and Settings components
 */
function App() {
  return (
    // Main container div with styling for layout and typography
    <div
      style={{
        textAlign: "center", // Center-aligns all content
        padding: "20px", // Adds padding around the content
        fontFamily: "Poppins, sans-serif", // Uses Poppins font with sans-serif fallback
      }}
    >
      {/* Application title with clock emoji */}
      <h1>🕰️ TimeBuddy</h1>

      {/* Clock component that displays and updates current time */}
      <Clock />

      {/* Settings component for application configuration */}
      <Settings />
    </div>
  );
}

export default App;
