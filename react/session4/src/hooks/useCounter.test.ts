import { renderHook, act } from "@testing-library/react";
import { test, expect } from "vitest";
import useCounter from "./useCounter";

test("starts at default value", () => {
  const { result } = renderHook(() => useCounter());

  expect(result.current.count).toBe(0);
});

test("increments", () => {
  const { result } = renderHook(() => useCounter());

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});

test("decrements", () => {
  const { result } = renderHook(() =>
    useCounter({ initial: 5 })
  );

  act(() => {
    result.current.decrement();
  });

  expect(result.current.count).toBe(4);
});

test("resets", () => {
  const { result } = renderHook(() =>
    useCounter({ initial: 10 })
  );

  act(() => {
    result.current.increment();
    result.current.reset();
  });

  expect(result.current.count).toBe(10);
});

// result.current contains the latest values and functions
// returned by the custom hook. After calling act(),
// React updates the hook state, so assertions should
// read result.current afterwards.