import { useState } from "react";

function Counter() {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="card">
      <h2>Counter</h2>

      <p>Count: {count}</p>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>

      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>

      <button onClick={() => setCount(0)}>
        Reset
      </button>

      {/*
        We cannot update the state by writing:
        count = count + 1

        React does not detect direct variable changes.
        The setCount() function updates the state and tells React
        to re-render the component with the new value.
      */}
    </div>
  );
}

export default Counter;