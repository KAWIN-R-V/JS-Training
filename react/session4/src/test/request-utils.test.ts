import { describe, expect, test } from "vitest";
import { prepareInternPayload } from "../utils/request-utils";

describe("prepareInternPayload", () => {
  test("returns the same payload", () => {
    const payload = {
      name: "Rahul",
      score: 90,
      role: "Frontend",
      isPresent: true,
    };

    expect(prepareInternPayload(payload)).toEqual(payload);
  });
});