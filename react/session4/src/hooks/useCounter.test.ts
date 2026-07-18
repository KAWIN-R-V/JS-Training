import { renderHook, act } from "@testing-library/react";
import useCounter from "./useCounter";

describe("useCounter", () => {
  test("initialises with default value of 0", () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
  });

  test("initialises with custom value", () => {
    const { result } = renderHook(() =>
      useCounter({ initial: 10 })
    );

    expect(result.current.count).toBe(10);
  });

  test("increment increases count", () => {
    const { result } = renderHook(() =>
      useCounter({ initial: 5 })
    );

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(6);
  });

  test("decrement decreases count", () => {
    const { result } = renderHook(() =>
      useCounter({ initial: 5 })
    );

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(4);
  });

  test("reset returns to initial value", () => {
    const { result } = renderHook(() =>
      useCounter({ initial: 10 })
    );

    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.reset();
    });

    expect(result.current.count).toBe(10);
  });

  test("does not exceed max", () => {
    const { result } = renderHook(() =>
      useCounter({
        initial: 10,
        max: 10,
      })
    );

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(10);
  });

  test("does not go below min", () => {
    const { result } = renderHook(() =>
      useCounter({
        initial: 0,
        min: 0,
      })
    );

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(0);
  });

  test("uses custom step value", () => {
    const { result } = renderHook(() =>
      useCounter({
        step: 5,
      })
    );

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(5);
  });
});

/*
result.current contains the latest values returned
from the hook. After every act(), React updates the
hook state, so assertions should read result.current
after the act() call.
*/