import { test, expect, vi } from "vitest";

test("loads interns from API", async () => {
  const mockInterns = [
    { id: 1, name: "Rahul" },
    { id: 2, name: "Priya" },
    { id: 3, name: "Amit" },
    { id: 4, name: "Sneha" },
  ];

  globalThis.fetch = vi.fn().mockResolvedValue({
    json: () => Promise.resolve(mockInterns),
  } as Response);

  const response = await fetch("http://localhost:5173/api/interns");
  const data = await response.json();

  expect(data).toHaveLength(4);
});