import { renderHook, act } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import useInternForm from "../hooks/useInternForm";

describe("useInternForm", () => {
  test("returns false when name is empty", () => {

    // Arrange
    const { result } = renderHook(() => useInternForm());

    let valid = false;

    // Act
    act(() => {
      valid = result.current.isValid();
    });

    // Assert
    expect(valid).toBe(false);
    expect(result.current.error).toBe("Name is required");
  });

  test("returns true when name is Sneha and score is 88", () => {

    // Arrange
    const { result } = renderHook(() => useInternForm());

    act(() => {
      result.current.handleChange({
        target: {
          name: "name",
          value: "Sneha",
          type: "text",
        },
      } as any);

      result.current.handleChange({
        target: {
          name: "score",
          value: "88",
          type: "number",
        },
      } as any);
    });

    let valid = false;

    // Act
    act(() => {
      valid = result.current.isValid();
    });

    // Assert
    expect(valid).toBe(true);
  });

  test("handleChange updates the name field", () => {

    // Arrange
    const { result } = renderHook(() => useInternForm());

    // Act
    act(() => {
      result.current.handleChange({
        target: {
          name: "name",
          value: "Sneha",
          type: "text",
        },
      } as any);
    });

    // Assert
    expect(result.current.form.name).toBe("Sneha");
  });
});

/*
AAA Review

Arrange:
Creates the hook and prepares the required test data.

Act:
Performs one action on the hook.

Assert:
Verifies only the expected outcome of that action.

The three phases are clearly separated, making the tests
easy to read and maintain.
*/