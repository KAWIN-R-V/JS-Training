import { useState, useRef } from "react";

function StopwatchRef() {
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function handleStart(): void {
    if (isRunning) return;

    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  }

  function handleStop(): void {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setIsRunning(false);
  }

  function handleReset(): void {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setIsRunning(false);
    setSeconds(0);
  }

  return (
    <div className="card">
      <h2>Stopwatch using useRef</h2>

      <h3>Time: {seconds}s</h3>

      <button
        onClick={handleStart}
        disabled={isRunning}
      >
        Start
      </button>

      <button
        onClick={handleStop}
        disabled={!isRunning}
        style={{ marginLeft: "10px" }}
      >
        Stop
      </button>

      <button
        onClick={handleReset}
        style={{ marginLeft: "10px" }}
      >
        Reset
      </button>

      {/*
        The interval ID is stored in useRef because it is a
        mutable value that does not need to be displayed in
        the UI.

        Updating a ref does not cause a component re-render,
        making it ideal for storing timer IDs.

        If useState were used instead, every interval ID update
        would trigger an unnecessary re-render, reducing
        performance without any benefit.
      */}
    </div>
  );
}

export default StopwatchRef;