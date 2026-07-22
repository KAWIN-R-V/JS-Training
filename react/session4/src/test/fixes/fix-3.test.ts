import { test, expect } from "vitest";

test("calculates average score", () => {
  const scores = [92, 78, 45, 95];

  const avg =
    scores.reduce((a, b) => a + b, 0) /
    scores.length;

  expect(avg).toBe(77.5);
});