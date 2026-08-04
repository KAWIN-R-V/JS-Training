import { describe, expect, test } from "vitest";
import { validateInternForm } from "../utils/intern-validation";

describe("validateInternForm", () => {
  test("returns 'Name is required' when name is empty", () => {
    expect(validateInternForm("", 50)).toBe("Name is required");
  });

  test("returns 'Name is required' when name is whitespace", () => {
    expect(validateInternForm("   ", 50)).toBe("Name is required");
  });

  test("returns 'Score must be 0–100' when score is 101", () => {
    expect(validateInternForm("Rahul", 101)).toBe("Score must be 0–100");
  });

  test("returns 'Score must be 0–100' when score is -1", () => {
    expect(validateInternForm("Rahul", -1)).toBe("Score must be 0–100");
  });

  test("returns null for a valid name and score", () => {
    expect(validateInternForm("Rahul", 92)).toBeNull();
  });

  test("returns null when score is exactly 0", () => {
    expect(validateInternForm("Rahul", 0)).toBeNull();
  });

  test("returns null when score is exactly 100", () => {
    expect(validateInternForm("Rahul", 100)).toBeNull();
  });
});

// The assignment asks how much setup these tests required.

// Each test required very little Arrange code because validateInternForm is a pure function. Compared to testing the same logic through the hook with renderHook, these tests are shorter, simpler, and require no React-specific setup.