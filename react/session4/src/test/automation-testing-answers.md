## Section 1 – Understanding the Test Pyramid

### Task 1.1 – Count your tests

| Layer | Tool | # Tests | Duration |
|-------|------|---------:|---------:|
| Unit / Hook | Vitest | 75 | 8.22 s |
| Component (RTL) | Vitest + RTL | Included in Vitest suite | 8.22 s |
| End-to-end | Playwright | 180 | 1.1 min |
| **Total** | Vitest + Playwright | 255 | - |


### Is your test count close to a pyramid shape (many unit, some RTL, few E2E)? If not, which layer is missing tests?

    -> My test suite is reasonably close to the test pyramid. It contains many unit and component tests along with a smaller set of end-to-end tests. Adding more unit tests for business logic would further strengthen the pyramid by providing faster feedback while keeping E2E tests focused on critical user journeys.


### Task 1.2:

### Could any of your E2E tests be replaced with a unit test or component test? What would you lose, and what would you gain?

    -> Some E2E tests that only verify UI rendering or simple form validation could be replaced with unit or component tests. This would make the test suite faster and easier to maintain. However, E2E tests are still important because they verify complete user workflows and ensure different parts of the application work together correctly.



### Task 2.1 - Read the Coverage Report

-> Overall statement coverage %: 70.78%
-> Overall branch coverage %: 67.39%
-> File with the lowest branch coverage: SummaryBar.tsx (0%)
-> One uncovered branch in that file: The SummaryBarContainer branch that reads data from useInterns() and calculates the summary values (total, presentCount, and averageScore) is not covered by the tests.

Test to add:
describe("SummaryBarContainer", () => {
  test("renders summary values from InternContext");
});

### Task 2.2 – Reflection

Answer:

Branch coverage is lower than statement coverage because not every conditional path (such as if statements or ternary expressions) has been tested. Some branches execute during testing, while others remain uncovered.


## Task 2.3 – Enforce a Coverage Threshold

### Why did you choose these thresholds?
I chose these thresholds based on the project's current coverage levels. They are realistic, help maintain code quality, and encourage adding tests for new code without being overly strict.

### Would you raise them later?
Yes. As the project grows and more tests are added, I would gradually increase the thresholds to improve overall code quality and maintain a higher testing standard.


### Task 3.1 – Define a Quality Gate

The assignment asks:

Choose three automated checks that must pass before merging code. Explain why.

Answer:

| Check                               | Why it should be required                                                  |
| ----------------------------------- | -------------------------------------------------------------------------- |
| **Unit & Component Tests (Vitest)** | Ensures existing functionality continues to work and prevents regressions. |
| **Coverage Threshold**              | Prevents new code from reducing overall test coverage.                     |
| **Linting (ESLint)**                | Maintains consistent code quality and catches common coding errors early.  |


### Task 3.3 – Reflection

### Which check is likely to fail first?
Linting is likely to fail first because it detects syntax errors, formatting issues, and common coding mistakes before tests are executed.

### Should E2E tests block every pull request? Why?
Not always. Unit and component tests should run on every pull request because they are fast. End-to-end tests can be run before merging or on important branches since they take longer to execute.

