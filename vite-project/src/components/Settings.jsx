import { useState, useEffect } from "react";

export default function Settings() {
  const [interval, setIntervalChoice] = useState(60);

  useEffect(() => {
    const savedInterval = localStorage.getItem("reminderInterval");
    if (savedInterval) {
      setIntervalChoice(Number(savedInterval));
    }
  }, []);

  function handleChange(e) {
    const value = Number(e.target.value);
    setIntervalChoice(value);
    localStorage.setItem("reminderInterval", value);
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      <label style={{ marginRight: "10px" }}>Reminder every:</label>
      <select value={interval} onChange={handleChange}>
        <option value={30}>30 Minutes</option>
        <option value={60}>60 Minutes</option>
      </select>
    </div>
  );
}
