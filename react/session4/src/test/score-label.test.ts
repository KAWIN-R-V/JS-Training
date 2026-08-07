import { describe, expect, test } from "vitest";
import { getScoreLabel } from "../utils/score-label";

describe("getScoreLabel", () => {
  test("returns 'Fail' for score 45", () => {
    expect(getScoreLabel(45)).toBe("Fail");
  });

  test("returns 'Pass' for score 92", () => {
    expect(getScoreLabel(92)).toBe("Pass");
  });
});