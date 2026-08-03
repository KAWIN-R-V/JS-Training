import { test, expect } from "vitest";

test.skip("score report has today's date", () => {
  const report = {
    date: new Date().toISOString().slice(0, 10),
  };

  expect(report.date).toBe("2024-11-15");
});

/*
FIRST Principle Violated:
Repeatable

Reason:
The expected date is hardcoded.
The test only passes on one specific day.
It will fail on every other day.
*/