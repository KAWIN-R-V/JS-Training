import { describe, expect, test } from "vitest";

describe("InternProvider", () => {
  test("uses injected generateId", () => {
    const id = (() => 999)();

    expect(id).toBe(999);
  });
});