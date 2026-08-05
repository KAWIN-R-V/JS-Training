import { describe, expect, test } from "vitest";
import { validateInternForm } from "../utils/intern-validation";

describe("Guard clauses", () => {
  test("throws when name is empty", () => {
    expect(validateInternForm("", 80))
      .toBe("Name is required");
  });

  test("returns score error below zero", () => {
    expect(validateInternForm("Rahul", -1))
      .toBe("Score must be 0–100");
  });

  test("returns score error above 100", () => {
    expect(validateInternForm("Rahul", 101))
      .toBe("Score must be 0–100");
  });
});