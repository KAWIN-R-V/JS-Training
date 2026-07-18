import { test, expect } from "vitest";

test("loads interns from API", async () => {
  const response = await fetch(
    "http://localhost:5173/api/interns"
  );

  const data = await response.json();

  expect(data).toHaveLength(4);
});

/*
FIRST Principles Violated: Fast and Repeatable

This test depends on a running API server.
It may fail in Continuous Integration (CI) or when the
server is unavailable. Network requests also make tests
slower and less reliable.
*/