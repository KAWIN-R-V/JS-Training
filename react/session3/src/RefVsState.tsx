import { useState, useRef } from "react";

function RefVsState() {
  const [stateCount, setStateCount] = useState<number>(0);
  const refCount = useRef<number>(0);

  function incrementState(): void {
    setStateCount((prev) => prev + 1);
  }

  function incrementRef(): void {
    refCount.current += 1;
    console.log("Ref value:", refCount.current);
  }

  return (
    <div className="card">
      <h2>Ref vs State</h2>

      <p>
        <strong>State Count (UI):</strong> {stateCount}
      </p>

      <p>
        <strong>Ref Count (UI):</strong> {refCount.current}
      </p>

      <button onClick={incrementState}>
        Increment State
      </button>

      <button
        onClick={incrementRef}
        style={{ marginLeft: "10px" }}
      >
        Increment Ref
      </button>

      {/*
        useState stores data that affects the UI.
        Updating state causes React to re-render the component.

        useRef stores mutable values without causing a re-render.
        Updating ref.current changes the value, but the UI does not
        update automatically.

        Use useState for data displayed in the UI.
        Use useRef for DOM references, timers, previous values,
        or mutable values that should persist across renders
        without triggering a re-render.
      */}
    </div>
  );
}

export default RefVsState;