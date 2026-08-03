import { renderHook, act } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import useInternForm from "./useInternForm";

test("starts with empty form", () => {
  const addIntern = vi.fn();

  const { result } = renderHook(() =>
    useInternForm(addIntern)
  );

  expect(result.current.form.name).toBe("");
  expect(result.current.form.score).toBe(0);
});

test("validation fails when name is empty", () => {
  const addIntern = vi.fn();

  const { result } = renderHook(() =>
    useInternForm(addIntern)
  );

  let valid = false;

  act(() => {
    valid = result.current.isValid();
  });

  expect(valid).toBe(false);
  expect(result.current.error).toBe("Name is required");
});

test("reset clears values", () => {
  const addIntern = vi.fn();

  const { result } = renderHook(() =>
    useInternForm(addIntern)
  );

  act(() => {
    result.current.handleReset();
  });

  expect(result.current.form.name).toBe("");
  expect(result.current.form.score).toBe(0);
});

test("submit calls addIntern when form is valid", () => {
  const addIntern = vi.fn();

  const { result } = renderHook(() =>
    useInternForm(addIntern, () => 999)
  );

  act(() => {
    result.current.handleChange({
      target: {
        name: "name",
        value: "Rahul",
        type: "text",
      },
    } as React.ChangeEvent<HTMLInputElement>);

    result.current.handleChange({
      target: {
        name: "score",
        value: "92",
        type: "number",
      },
    } as React.ChangeEvent<HTMLInputElement>);
  });

  act(() => {
    result.current.submit();
  });

  expect(addIntern).toHaveBeenCalledTimes(1);

  expect(addIntern).toHaveBeenCalledWith({
    id: 999,
    name: "Rahul",
    score: 92,
    isPresent: true,
    role: "Frontend",
  });
});

test("submit does not call addIntern when validation fails", () => {
  const addIntern = vi.fn();

  const { result } = renderHook(() =>
    useInternForm(addIntern)
  );

  act(() => {
    result.current.submit();
  });

  expect(addIntern).not.toHaveBeenCalled();
});

// Hook tests focus only on the hook logic.
// Dependencies are injected using vi.fn(),
// making the tests fast, repeatable, and independent.