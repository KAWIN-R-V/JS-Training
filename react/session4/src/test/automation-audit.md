# Automation Audit

## 1. Coverage

**Branch Coverage:** 67.39%

**File with the worst branch coverage:** `SummaryBar.tsx` (0% branch coverage)

**Comment:**
The SummaryBar container logic is not fully tested. Adding tests for the `SummaryBarContainer` component would improve branch coverage.

---

## 2. Speed

**Slowest test:**
`src/components/AddInternForm.test.tsx`

**Reason:**
This test renders the full component, simulates multiple user interactions, validates form input, updates state, and checks several UI behaviors. These operations make it slower than simple unit tests.

---

## 3. Pyramid Shape

**Current test distribution:**

- Unit Tests: Many
- Component Tests: Several
- E2E Tests: Fewer than unit/component tests

**Comment:**
The project generally follows the Test Pyramid. There are more unit tests than component tests, and fewer end-to-end tests. This provides fast feedback while still validating important user workflows.

---

## 4. Critical Paths

The three most important user journeys are:

1. Add a new intern.
2. View the intern list and scores.
3. Validate intern form inputs before submission.

**E2E Coverage:**

Yes. These critical user journeys are covered by at least one Playwright end-to-end test.

---

## 5. What Breaks Silently

If `intern-context.tsx` returned interns in a different order:

**Tests that would catch it:**

- E2E tests that verify the displayed order of interns.
- Component tests that expect interns to appear in a specific order.

**Tests that would NOT catch it:**

- Utility tests.
- Validation tests.
- Hook tests that do not depend on the displayed order.

**Comment:**
Ordering changes may not affect isolated unit tests but can affect the user interface. Component and E2E tests provide better protection against these kinds of regressions.