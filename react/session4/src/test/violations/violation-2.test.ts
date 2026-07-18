import { test, expect } from "vitest";

test("score report has today's date", () => {
  const report = {
    date: new Date().toISOString().slice(0, 10),
  };

  expect(report.date).toBe("2024-11-15");
});

/*
FIRST Principle Violated: Repeatable

The test depends on the current system date.
It will fail whenever today's date is different from
the hardcoded date (2024-11-15).
*/