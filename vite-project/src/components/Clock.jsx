import { useEffect, useState } from "react";

/**
 * Clock component that displays and updates the current time every second
 */
export default function Clock() {
  // Initialize state with current time
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Create an interval that updates the time every second
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup function to clear the interval when component unmounts
    return () => {
      clearInterval(timer);
    };
  }, []); // Empty dependency array means this effect runs only once on mount

  return (
    <div style={{ fontSize: "4rem", margin: "20px" }}>
      {time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })}
    </div>
  );
}
