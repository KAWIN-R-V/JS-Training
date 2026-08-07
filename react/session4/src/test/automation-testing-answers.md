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

## Task 2.3 – Enforce a Coverage Threshold

### Answers
### Does it pass?
    No. The project does not meet all of the required thresholds.

### Comment
    The branch coverage is below the required threshold. Adding more tests for SummaryBarContainer and Context components would increase branch coverage.


### Task 3.1 - Observe a failing quality gate

### Which test failed?
    src/test/intern-validation.test.ts

### What did the Expected and Received values show?
Expected:
Name is required

Received:
Wrong message

### How long did it take to catch the bug?
    The bug was detected immediately after running the automated test suite, within a few seconds.

### comment: How long would it have taken to catch this bug manually 
    The automated tests detected the bug immediately. If I had tested the application manually, I would have needed to open the application, navigate to the form, enter invalid input, submit it, and verify the error message, which would have taken much longer.


### Task 3.2 — Break an E2E test

### Which test failed?
    The Playwright test that interacts with the Add Intern form failed because the expected button text was changed.

### Which step in the test failed (what action was Playwright trying to perform)?
    The test failed while trying to locate and click the "Add Intern" button.

### What does the failure screenshot show?
    The screenshot shows the Intern Dashboard with the button labelled "Submit Intern" instead of "Add Intern", so Playwright could not find the expected button.

### comment: What is the difference between the failure message in a unit test vs an E2E test? Which gives more context about what went wrong and where?
    Unit test failures clearly show the expected and received values for a specific function or component. E2E test failures provide more context by showing the browser state, screenshots, and the exact user action that failed, making it easier to understand where the workflow broke.


### Task 3.3 
### If you updated a test
    I updated the InternCard component test because the component now displays a Pass/Fail badge in addition to the score. The test was updated to verify the new expected output.

### Definition of Done
    The feature is considered complete only when it is implemented correctly, all unit, component, and end-to-end tests pass, and the application meets the required quality and coverage standards.

### Task 4.1 — Map the pipeline stages

| Stage                     | What runs                                        | What it checks                                            | Blocks merge if?                     |
| ------------------------- | ------------------------------------------------ | --------------------------------------------------------- | ------------------------------------ |
| **On every push**         | Unit tests, component tests, coverage            | Verifies code correctness and catches regressions quickly | **Yes**, if any required check fails |
| **On every pull request** | Unit tests, component tests, coverage, E2E tests | Verifies the complete application before merging          | **Yes**, if any required check fails |
| **Before merge to main**  | All required CI checks                           | Ensures the code is stable and meets quality standards    | **Yes**, if any required check fails |

### Comment : Why are unit tests run on every push but E2E tests only on PRs? What is the tradeoff?
    Unit tests run on every push because they are fast and provide immediate feedback. E2E tests are slower and consume more resources, so they are usually run on pull requests before merging. This balances quick feedback with thorough testing.

### Task 4.2 — Read a pipeline configuration

### What is the trigger for this pipeline?
    The pipeline runs on every push to any branch and on every pull request targeting the main branch.

### Why does e2e-tests have needs: unit-tests?
    It ensures the E2E tests only run after the unit tests have passed. If the unit tests fail, the E2E tests are skipped.

### What commands run in the unit-tests job? What do they check?
npm ci
→ Installs project dependencies.

npm run test:run
→ Runs the unit and component tests.

npm run test:coverage
→ Generates the coverage report and checks whether the required coverage threshold is met.

### If npm run test:coverage fails the threshold, can the E2E tests still run?
    No. Since the e2e-tests job depends on the unit-tests job, the E2E tests will not run if the coverage step fails.

### What would you add to block a merge if coverage drops below 80%?
    I would configure the coverage thresholds to require at least 80% coverage and make the CI workflow fail when the threshold is not met.


### Task 4.3 — Pipeline health audit

| Risk                                             | Yes/No  | File or test name                                                                                                         |
| ------------------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| Any test that uses `test.skip`?                  | **Yes** | `src/test/violations/violation-2.test.ts`, `src/test/violations/violation-4.test.ts`, `src/test/global-state-bug.test.ts` |
| Any test that uses `console.log` (not asserted)? | **Yes** | `ScoreStats.test.tsx`, `violation-3.test.ts`                                                                              |
| Any test that calls `fetch` without mocking?     | **No**  | None found                                                                                                                |
| Any test that calls `new Date()` inline?         | **No**  | None found                                                                                                                |
| Any test over 500ms?                             | **Yes** | `AddInternForm.test.tsx` (around 1.6 seconds for the file)                                                                |
| Any flaky test (run the suite 3 times)?          | **No**  | No flaky tests observed                                                                                                   |

### comment: For each risk you found — what is the fix? (Skip → write the test or delete the skip; slow test → find the bottleneck; fetch → mock it)
    Skipped tests should either be completed or removed if they are no longer needed. Console.log statements should be removed unless they are required for debugging. Slow tests should be optimized by reducing unnecessary rendering or repeated setup. Network requests should always be mocked to keep tests reliable. Tests that depend on time should use mocked dates instead of new Date(). Flaky tests should be investigated and stabilized before being included in the CI pipeline.


### Task 5.1 — Missing Test Layer

| Feature          | Current Tests        | Missing Layer | Why?                                                                               |
| ---------------- | -------------------- | ------------- | ---------------------------------------------------------------------------------- |
| Intern Form      | Unit, Component, E2E | None          | The feature is covered at all testing levels.                                      |
| Score Validation | Unit                 | Component     | A component test would verify that validation messages appear correctly in the UI. |
| Summary Bar      | Component            | E2E           | An E2E test would verify the summary values during a complete user workflow.       |
| Pass/Fail Badge  | Unit, Component      | E2E           | An E2E test would ensure the badge appears correctly during real user interaction. |


### Write the one test that you identify as the most valuable addition to your suite. Use the layer that gives you the most confidence for the least setup cost.
    The project has good unit and component test coverage. Adding a few more E2E tests for important user workflows would further improve confidence that the application works correctly from the user's perspective.




### Task 6.1 — Before vs After

|                                                     | Before testing sessions                                               | After testing sessions                                                                  |
| --------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **How do you know a change didn't break anything?** | I manually tested the application after making changes.               | I run unit, component, and E2E tests to verify that existing functionality still works. |
| **How long does it take to verify the app works?**  | It took a long time because every feature had to be checked manually. | It takes only a few minutes because automated tests quickly verify the application.     |
| **How confident are you to refactor old code?**     | Low confidence because changes could introduce unnoticed bugs.        | High confidence because the automated test suite detects regressions quickly.           |
| **How do you find out about a regression?**         | Users or manual testing usually revealed regressions.                 | Automated tests immediately identify regressions during development or CI.              |


### comment: Which type of test (unit / component / E2E) has been most useful in catching real bugs during this training? Why?
    During this training, component tests were the most useful for catching real bugs. They verified that the user interface behaved correctly while remaining faster and easier to maintain than end-to-end tests. Unit tests quickly detected logic errors, and E2E tests provided confidence that complete user workflows functioned correctly.