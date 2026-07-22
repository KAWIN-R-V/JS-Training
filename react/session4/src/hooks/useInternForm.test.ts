import { renderHook, act } from "@testing-library/react";
import { test, expect } from "vitest";
import useInternForm from "./useInternForm";

test("starts with empty form", () => {
  const { result } = renderHook(() => useInternForm());

  expect(result.current.form.name).toBe("");
  expect(result.current.form.score).toBe(0);
});

test("validation fails when name is empty", () => {
  const { result } = renderHook(() => useInternForm());

  let valid = false;

  act(() => {
    valid = result.current.isValid();
  });

  expect(valid).toBe(false);
  expect(result.current.error).toBe("Name is required");
});

test("reset clears values", () => {
  const { result } = renderHook(() => useInternForm());

  act(() => {
    result.current.handleReset();
  });

  expect(result.current.form.name).toBe("");
});

// Hook tests focus only on the hook logic.
// They are simpler and faster than testing the
// same behavior through a React component.