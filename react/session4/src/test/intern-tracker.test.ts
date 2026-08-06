import { describe, expect, it } from "vitest";
import { InternTracker } from "../services";
import type { Intern } from "../services";

describe("InternTracker.updateScore", () => {
  function createTracker(): InternTracker {
    const tracker = new InternTracker();

    // Test data loaded through the public API
    const interns: Intern[] = [
      {
        id: 1,
        name: "Rahul",
        score: 80,
        role: "Frontend",
        isPresent: true,
      },
      {
        id: 2,
        name: "Priya",
        score: 70,
        role: "Backend",
        isPresent: true,
      },
    ];

    // Mock fetch response
    globalThis.fetch = async () =>
      ({
        ok: true,
        json: async () => interns,
      } as Response);

    return tracker;
  }

  it("throws RangeError if score is out of 0–100 range", async () => {
    const tracker = createTracker();

    await tracker.loadAll();

    expect(() => tracker.updateScore(1, 120)).toThrow(
      "updateScore: score must be between 0 and 100"
    );
  });

  it("throws if the intern does not exist", async () => {
    const tracker = createTracker();

    await tracker.loadAll();

    expect(() => tracker.updateScore(999, 90)).toThrow(
      "Intern not found"
    );
  });

  it("updates the score without exposing internal state", async () => {
    const tracker = createTracker();

    await tracker.loadAll();

    tracker.updateScore(1, 95);

    expect(tracker.getById(1)?.score).toBe(95);

    expect(tracker.getAll()[0].score).toBe(95);
  });
});