import { useState, useEffect } from "react";

function EscapeHandler() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="card">
      <h2>Escape Handler</h2>

      <button onClick={() => setIsOpen(true)}>
        Open Panel
      </button>

      {isOpen && (
        <div
          style={{
            marginTop: "15px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <p>Panel is open.</p>
          <p>Press the <strong>Escape</strong> key to close it.</p>

          <button onClick={() => setIsOpen(false)}>
            Close
          </button>
        </div>
      )}

      {/* 
        Cleanup removes the event listener when the component
        unmounts or when isOpen changes, preventing memory leaks.
      */}
    </div>
  );
}

export default EscapeHandler;