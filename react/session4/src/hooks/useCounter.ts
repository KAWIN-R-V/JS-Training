import { useState } from "react";

interface UseCounterOptions {
  initial?: number;
  min?: number;
  max?: number;
  step?: number;
}

interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

function useCounter({
  initial = 0,
  min = -Infinity,
  max = Infinity,
  step = 1,
}: UseCounterOptions = {}): UseCounterReturn {
  const [count, setCount] = useState(initial);

  function increment() {
    setCount((prev) => Math.min(prev + step, max));
  }

  function decrement() {
    setCount((prev) => Math.max(prev - step, min));
  }

  function reset() {
    setCount(initial);
  }

  return {
    count,
    increment,
    decrement,
    reset,
  };
}

export default useCounter;

/*
A custom hook is a reusable function that uses React hooks internally.
It must:
1. Start with the word "use".
2. Only call hooks at the top level.
3. Be called only inside React components or other custom hooks.
*/