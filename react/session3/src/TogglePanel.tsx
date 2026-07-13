import { useState } from "react";

function TogglePanel() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="card">
      <h2>Toggle Panel</h2>

      <button onClick={() => setIsOpen(prev => !prev)}>
        {isOpen ? "Hide Details" : "Show Details"}
      </button>

      {isOpen && (
        <div style={{ marginTop: "15px" }}>
          <p><strong>Name:</strong> Rahul</p>
          <p><strong>Score:</strong> 92</p>
          <p><strong>Role:</strong> Frontend</p>
        </div>
      )}

      {/*
        Explore Findings:

        Both of these work:

        setIsOpen(!isOpen)
        setIsOpen(prev => !prev)

        However, the functional update
        (prev => !prev) is the safer approach.

        React may batch multiple state updates together.
        Using the previous state guarantees that the latest
        state value is used, avoiding stale state issues,
        especially in asynchronous operations.
      */}
    </div>
  );
}

export default TogglePanel;