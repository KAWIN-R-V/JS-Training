import { describe, expect, test } from "vitest";
import { assert } from "../utils/assert";

describe("assert", () => {
  test("does not throw", () => {
    expect(() =>
      assert(true, "error")
    ).not.toThrow();
  });

  test("throws", () => {
    expect(() =>
      assert(false, "failure")
    ).toThrow(
      "Assertion failed: failure"
    );
  });
});