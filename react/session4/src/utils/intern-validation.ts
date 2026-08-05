// Code Smell Audit — intern-validation.ts
// Smell 1: Magic numbers — score limits use 0 and 100 directly.
// Smell 2: Hardcoded strings — validation messages are embedded in the function.
// Smell 3: Validation rules rely on literal values instead of named constants.

import { assert } from "./assert";

export function validateInternForm(
  name: string,
  score: number
): string | null {

  // Preconditions
  assert(
    typeof name === "string",
    `validateInternForm: name must be a string, got: ${typeof name}`
  );

  assert(
    typeof score === "number",
    `validateInternForm: score must be a number, got: ${typeof score}`
  );

  // Existing validation logic
  if (!name.trim()) {
    return "Name is required";
  }

  if (score < 0 || score > 100) {
    return "Score must be 0–100";
  }

  return null;
}

// Smell to fix first:
// The magic numbers should be replaced with named constants.
// This makes the validation rules easier to understand and maintain.