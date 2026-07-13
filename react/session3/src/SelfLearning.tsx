import { useState, useEffect } from "react";

function LiveTimer() {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // Cleanup function
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Live Timer</h3>
      <p>Seconds: {seconds}</p>
    </div>
  );
}

function SelfLearning() {
  return (
    <div className="card">
      <h2>Self Learning Tasks</h2>

      <LiveTimer />

      {/*
      ===========================================================
      Task 1 - React.StrictMode
      ===========================================================

      React.StrictMode is a development tool that helps identify
      potential problems in React applications.

      In development mode, React intentionally renders components
      and runs useEffect twice to detect side effects.

      Observation:
      The useEffect and cleanup function may execute twice during
      development, but this does not happen in production.
      */}

      {/*
      ===========================================================
      Task 2 - useLayoutEffect
      ===========================================================

      useEffect runs after the browser has painted the screen.

      useLayoutEffect runs synchronously after the DOM updates
      but before the browser paints.

      useLayoutEffect is useful when measuring DOM elements,
      scrolling, or preventing visual flickering.

      useEffect is preferred for API calls, timers,
      and event listeners.
      */}

      {/*
      ===========================================================
      Task 3 - Updating state inside useEffect
      ===========================================================

      If useEffect has no dependency array, it runs after every
      render.

      Updating state inside it causes another render, which again
      triggers useEffect, creating an infinite render loop.
      */}

      {/*
      ===========================================================
      Task 4 - useReducer vs useState
      ===========================================================

      useState is suitable for simple state such as numbers,
      strings, booleans, or small objects.

      useReducer is preferred for complex state logic involving
      multiple related values and many state transitions.
      It keeps update logic organized using actions and a reducer
      function.
      */}

      {/*
      ===========================================================
      Task 5 - Cleanup Function
      ===========================================================

      Cleanup functions remove timers, subscriptions, and event
      listeners when a component unmounts.

      Without cleanup, multiple timers or listeners continue
      running, leading to memory leaks and unexpected behavior.

      In the LiveTimer component above, clearInterval() stops the
      timer when the component is removed.
      */}
    </div>
  );
}

export default SelfLearning;