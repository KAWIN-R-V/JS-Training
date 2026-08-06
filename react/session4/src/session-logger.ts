// src/session-logger.ts

// Public interface
export interface ISessionLogger {
  // Records an intern's attendance
  recordAttendance(internId: number): void;

  // Checks whether an intern attended
  hasAttended(internId: number): boolean;

  // Returns the total number of attendees
  getAttendeeCount(): number;

  // Returns all attendee IDs
  getAttendeeIds(): readonly number[];
}

// Implementation
export class SessionLogger implements ISessionLogger {
  // Private implementation detail
  #attendees: Set<number> = new Set();

  recordAttendance(internId: number): void {
    this.#attendees.add(internId);
  }

  hasAttended(internId: number): boolean {
    return this.#attendees.has(internId);
  }

  getAttendeeCount(): number {
    return this.#attendees.size;
  }

  getAttendeeIds(): readonly number[] {
    return [...this.#attendees];
  }
}