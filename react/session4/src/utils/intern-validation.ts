import { assert } from "./assert";

// Code Smell Audit — intern-validation.ts
// Smell 1: Magic numbers — score limits use 0 and 100 directly.
// Smell 2: Hardcoded strings — validation messages are embedded in the function.
// Smell 3: Validation rules rely on literal values instead of named constants.

// Named constants
const MIN_SCORE = 0;
const MAX_SCORE = 100;

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

  // Validation logic
  if (!name.trim()) {
    return "Name is required";
  }

  if (score < MIN_SCORE || score > MAX_SCORE) {
    return `Score must be ${MIN_SCORE}–${MAX_SCORE}`;
  }

  return null;
}

// Smell to fix first:
// Replace the magic numbers with named constants.
// This makes the validation rules easier to understand and maintain.