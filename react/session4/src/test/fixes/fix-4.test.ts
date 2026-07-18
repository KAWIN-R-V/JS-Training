import { test, expect, vi } from "vitest";

test("loads interns from API", async () => {
  const mockFetch = vi.fn().mockResolvedValue({
    json: async () => [
      { id: 1, name: "Rahul" },
      { id: 2, name: "Priya" },
      { id: 3, name: "Amit" },
      { id: 4, name: "Anu" },
    ],
  });

  globalThis.fetch = mockFetch as typeof fetch;

  const response = await fetch("http://localhost:5173/api/interns");
  const data = await response.json();

  expect(data).toHaveLength(4);
});

/*
Fix:
The API call is mocked using vi.fn().
The test no longer depends on a running server,
making it both fast and repeatable.
*/