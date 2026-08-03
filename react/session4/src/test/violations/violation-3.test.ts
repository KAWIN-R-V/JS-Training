import { test } from "vitest";

test("calculates average score", () => {
  const scores = [92, 78, 45, 95];

  const avg =
    scores.reduce((a, b) => a + b, 0) /
    scores.length;

  console.log("Average:", avg);
});

/*
FIRST Principle Violated:
Self-validating

Reason:
There is no assertion.
The test always passes even if the average is wrong.
*/