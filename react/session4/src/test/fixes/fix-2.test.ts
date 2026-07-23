import { test, expect, vi, afterEach } from "vitest";

afterEach(() => {
  vi.useRealTimers();
});

test("score report has today's date", () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2024-11-15"));

  const report = {
    date: new Date().toISOString().slice(0, 10),
  };

  expect(report.date).toBe("2024-11-15");
});