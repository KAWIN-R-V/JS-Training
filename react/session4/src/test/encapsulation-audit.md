# Section 1 — Spot the Violations

```ts
// intern-tracker.ts (current — violates encapsulation)

export class InternTracker {

  // ❌ Violation:
  // Public list allows callers to modify internal state.
  // Should be private (#interns).
  interns: Intern[] = [];

  // ❌ Violation:
  // API URL is an implementation detail.
  // Should be private (#apiUrl).
  apiUrl: string = "/api/interns";

  // ❌ Violation:
  // Internal state should not be publicly writable.
  // Should be private (#lastFetchedAt).
  lastFetchedAt: Date = new Date(0);

  // ❌ Violation:
  // Internal cache should never be exposed.
  // Should be private (#localCache).
  _localCache: Map<number, Intern> = new Map();

  async loadAll(): Promise<void> {
    const res = await fetch(this.apiUrl);
    this.interns = await res.json();
    this.lastFetchedAt = new Date();
  }

  // ❌ Violation:
  // Internal helper method.
  // Should be private (#buildUrl).
  _buildUrl(id: number): string {
    return `${this.apiUrl}/${id}`;
  }

  // ❌ Violation:
  // Internal helper method.
  // Should be private (#updateCache).
  _updateCache(intern: Intern): void {
    this._localCache.set(intern.id, intern);
  }
}

// ❌ Violation:
// Internal configuration should not be exported.
export const API_KEY = "intern-tracker-v1";

// ❌ Violation:
// Internal configuration should not be exported.
export const DEFAULT_LIMIT = 50;
```

## Answers

### 1. Which fields would a caller legitimately need to read?

Callers should not access the fields directly. Public methods such as `getAll()` or `getById()` should expose the required data.

### 2. Which methods are internal helpers?

- `_buildUrl()`
- `_updateCache()`

### 3. Which exports should not be exported?

- `API_KEY`
- `DEFAULT_LIMIT`

### 4. If the implementation changed from REST to a local JSON file?

Only the internal implementation (`apiUrl`, `fetch()`, and `_buildUrl()`) would change. The public API would remain the same, so callers would not need to change.



## Section 3 – Validated Setter

The tests use only the public interface (`loadAll`, `updateScore`, `getById`, and `getAll`) to verify behavior.

The private `#interns` field is never accessed directly, preserving encapsulation. This means callers can update and read intern information without depending on the internal implementation or storage of the class.


## Section 4 — Module Encapsulation

A barrel file provides a single public entry point for the services layer.

External modules now import from `../services` instead of individual service files.

Internal helper functions in `utils.ts` remain private to the services layer and are not re-exported, preserving encapsulation and reducing coupling.

## Task 4.1 — utils.ts Audit

| Symbol | Needed outside services? | Action |
|---------|--------------------------|--------|
| roundScore | No | Removed export |
| normalizeName | No | Removed export |
| isValidScore | No | Removed export |

These helper functions are implementation details of the service layer and should not be part of the public API.



## Section 5 – Public Interface Design

### Question 1

Yes.

The implementation can be changed from `Set<number>` to `Map<number, Date>` without changing the public interface because callers interact only through the methods defined in `ISessionLogger`. They do not know or depend on how attendance is stored internally.

### Question 2

If the raw `Set` were exposed, callers could bypass the class interface by calling methods such as:

- `add()`
- `delete()`
- `clear()`

They could also modify the attendance data directly without using `recordAttendance()`, breaking encapsulation and making it difficult to enforce validation or business rules.



## Section 6 — Boundary Tests

The tests interact only with the public interface of `SessionLogger`:

- `recordAttendance()`
- `hasAttended()`
- `getAttendeeCount()`
- `getAttendeeIds()`

No test accesses the private `#attendees` field directly.

The tests verify observable behavior rather than the internal implementation. This means the internal storage could change from `Set<number>` to `Map<number, Date>` without requiring changes to the tests, demonstrating proper encapsulation.

The snapshot test confirms that `getAttendeeIds()` returns a copy instead of exposing the internal collection, preventing callers from accidentally modifying the logger's internal state.