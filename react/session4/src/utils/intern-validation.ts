import { assert } from "./assert";

// Silent Failure Audit — intern-validation.ts
// Pattern 1: Validation returns an error message instead of throwing an exception.
// Pattern 2: Callers must remember to check the returned value.
// Pattern 3: Invalid input can be ignored if the caller forgets to handle the result.

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

// Most likely silent failure:
// Returning an error string relies on every caller checking the result.
// If a caller ignores it, invalid data can continue through the application unnoticed.