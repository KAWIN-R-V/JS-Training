import { test, expect } from "vitest";

test.skip("loads interns from API", async () => {
  const response = await fetch(
    "http://localhost:5173/api/interns"
  );

  const data = await response.json();

  expect(data).toHaveLength(4);
});

/*
FIRST Principles Violated:
Fast and Repeatable

Reason:
The test depends on a running API server.
It becomes slow and may fail if the server is unavailable
or the API response changes.
*/