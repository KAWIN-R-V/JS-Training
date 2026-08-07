import { describe, test, expect } from "vitest";
import { validateInternForm } from "../utils/intern-validation";

describe("validateInternForm", () => {
  test("returns 'Name is required' when name is empty", () => {
    expect(validateInternForm("", 50)).toBe("Name is required");
  });

  test("returns 'Name is required' when name contains only whitespace", () => {
    expect(validateInternForm("   ", 50)).toBe("Name is required");
  });

  test("returns 'Score must be 0–100' when score is above 100", () => {
    expect(validateInternForm("Rahul", 101)).toBe("Score must be 0–100");
  });

  test("returns 'Score must be 0–100' when score is below 0", () => {
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