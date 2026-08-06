import { beforeEach, describe, expect, it } from "vitest";
import { SessionLogger } from "../session-logger";

describe("SessionLogger", () => {
  let logger: SessionLogger;

  beforeEach(() => {
    logger = new SessionLogger();
  });

  it("returns false for an intern who has not been recorded", () => {
    expect(logger.hasAttended(1)).toBe(false);
  });

  it("returns true after an intern is recorded", () => {
    logger.recordAttendance(1);

    expect(logger.hasAttended(1)).toBe(true);
  });

  it("counts attendees correctly", () => {
    logger.recordAttendance(1);
    logger.recordAttendance(2);
    logger.recordAttendance(3);

    expect(logger.getAttendeeCount()).toBe(3);
  });

  it("recording the same intern twice does not change the count", () => {
    logger.recordAttendance(1);
    logger.recordAttendance(1);

    expect(logger.getAttendeeCount()).toBe(1);
  });

  it("returns all attendee IDs", () => {
    logger.recordAttendance(1);
    logger.recordAttendance(2);
    logger.recordAttendance(3);

    expect(logger.getAttendeeIds()).toEqual([1, 2, 3]);
  });

  it("returns a snapshot, not the internal collection", () => {
    logger.recordAttendance(1);
    logger.recordAttendance(2);
    logger.recordAttendance(3);

    const ids = [...logger.getAttendeeIds()];

    ids.push(999);

    expect(ids).toEqual([1, 2, 3, 999]);

    expect(logger.getAttendeeIds()).toEqual([1, 2, 3]);

    expect(logger.getAttendeeCount()).toBe(3);

    expect(logger.hasAttended(999)).toBe(false);
  });

  it("returns an empty list when no interns have been recorded", () => {
    expect(logger.getAttendeeIds()).toEqual([]);
  });
});