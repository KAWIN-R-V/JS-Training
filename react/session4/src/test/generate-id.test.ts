import { describe, expect, test } from "vitest";
import { generateInternId } from "../utils/generate-id";

describe("generateInternId", () => {
  test("creates the expected ID using injected values", () => {
    const id = generateInternId(() => 123456, () => 0.5);

    expect(id).toBe("intern-123456-0.5");
  });

  test("returns identical IDs with the same injected values", () => {
    const id1 = generateInternId(() => 999, () => 0.25);
    const id2 = generateInternId(() => 999, () => 0.25);

    expect(id1).toBe(id2);
  });
});