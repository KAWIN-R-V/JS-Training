## Task 1.2
# Refactoring Priority List

1. **Multiple responsibilities** in `src/contexts/intern-context.tsx` — because the file mixes context wiring, state management, data loading, and business logic, making it difficult to maintain and increasing the risk of bugs when changes are made.

2. **Long function** in `src/hooks/useInternForm.ts` — because the `submit()` function performs validation, creates the intern object, submits it, and resets the form. A change in one responsibility can unintentionally affect the others.

3. **Magic numbers** in `src/utils/intern-validation.ts` — because the hardcoded values `0` and `100` make validation rules harder to understand and more difficult to update if the business requirements change.



## Task 2.1 — Rename for Clarity

Old name:
`validation`

New name:
`validationError`

# Reason:
The old name was ambiguous because it did not indicate what the variable contained. The new name clearly shows that the variable stores a validation error message returned by `validateInternForm`, making the code easier to understand without reading the implementation.

## Task 2.2 — Named Constants

The magic numbers `0` and `100` represented the valid score range for an intern.

They were replaced with the named constants:

- `MIN_SCORE`
- `MAX_SCORE`

Naming these constants makes the business rule explicit: intern scores are only valid between the minimum and maximum allowed values. If the scoring rules change in the future, only the constant values need to be updated instead of searching for every occurrence of the numbers.



## Task 3.1 — Extract Pure Validation Logic

The validation logic had already been extracted into `src/utils/intern-validation.ts` during the Code Testability session.

`useInternForm.ts` now calls the standalone `validateInternForm()` function instead of containing the validation logic itself.

This makes the validation reusable, easier to test independently, and keeps the hook focused on coordinating the form rather than implementing business rules.

## Task 3.2 — Testing the Extracted Function

Each test required very little Arrange code because `validateInternForm()` is a pure function. Most tests only needed a single function call with the required inputs.

Compared with testing the same logic through `useInternForm` using `renderHook`, these tests are much simpler. They do not require React rendering, hook setup, or state management. Testing the pure function directly makes the tests shorter, faster, and easier to understand.

## Task 3.3 — Extract a Second Function

The original `handleChange()` function performed multiple responsibilities:

1. Read values from the input event.
2. Converted checkbox, number, and text values.
3. Updated the form state.

After refactoring:

- `getFieldValue()` is responsible only for converting the input value into the correct type.
- `handleChange()` is responsible only for updating the form state.

Separating these responsibilities makes each function shorter, easier to read, and easier to test independently.



## Task 4.1 — Remove Duplication

The duplicated code was the average score calculation, which appeared in multiple places in the project.

The calculation was extracted into the shared function `calculateAverageScore()` in `intern-service.ts`, and all callers now use this function instead of implementing the calculation themselves.

Leaving the duplication in place would make future changes more difficult because every copy would need to be updated. If one copy were changed and another forgotten, the application could produce inconsistent results.

By removing the duplication, future changes to the average score calculation only need to be made in one location, reducing maintenance effort and the risk of bugs.

## Task 4.2 — Remove Duplicated Test Setup

Several tests used the same intern object with only small differences.

A shared `makeIntern()` factory was introduced to create test data and allow individual properties to be overridden when needed.

This reduced duplicated Arrange code and made the tests easier to read because each test now focuses only on the values that are important for that specific scenario.



## Task 5.1 — Flatten Nested Conditionals

The `submit()` function was reviewed and already followed the guard clause pattern by returning early when validation failed.

Before:
- Validation and submission were handled in the same function with an early return.

After:
- The function explicitly stores the validation result in `formIsValid` and exits immediately if validation fails, leaving the successful path at the bottom.

The function now reads like a sequence of steps: validate → submit → reset. This makes the happy path easier to follow and keeps the control flow simple.

## Task 5.2 — Replace if/else Chain with Lookup

The role labels are now stored in a lookup object instead of using multiple `if/else if` statements.

## comment: What happens when a new role needs to be added? How does the lookup approach compare to adding a new else if?

When a new role needs to be supported, a new entry can simply be added to the `ROLE_LABELS` object without modifying the function logic.

The lookup approach is easier to read, easier to maintain, and scales better than adding more `else if` statements as the number of roles grows.



## Task 6.1 - One complete refactoring with the confidence loop
## Full Refactoring Log — useInternForm

Step 1: Ran `npm run test:run` before making changes → tests green.
Step 2: Renamed the variable `validation` to `validationError` in `isValid()` to better describe its purpose → tests green.
Step 3: Extracted the value conversion logic from `handleChange()` into a new helper function `getFieldValue()` → tests green.
Step 4: Simplified `handleChange()` so it only updates the form state while `getFieldValue()` handles value conversion → tests green.
Step 5: Reviewed `submit()` and kept the guard clause (`if (!isValid()) return;`) so the happy path remains easy to follow → tests green.

Final:
- 4 refactoring changes completed.
- 5 test runs performed (one before refactoring and one after each change).
- All test runs passed successfully.

## Comment - How many separate test runs did you do? Did any step produce a red result? If yes — what did you undo?
I performed 5 separate test runs during the refactoring process. Every test run passed successfully, so no changes needed to be undone. Running the test suite after each small refactoring step gave confidence that the code behavior remained unchanged while improving readability and maintainability.


## Task 6.2 — Coverage Before and After

| Metric | Before Refactoring | After Refactoring |
|--------|-------------------:|------------------:|
| Statement % | Not recorded | 76.05% |
| Branch % | Not recorded | 72.00% |
| Function % | Not recorded | 78.12% |

### Coverage Summary
- Statement Coverage: **76.05%**
- Branch Coverage: **72.00%**
- Function Coverage: **78.12%**

### Comment - Did coverage go up, down, or stay the same? Why? Did extracting pure functions make it easier to cover edge cases that were previously hidden inside larger functions?

The "before" coverage values were not recorded before starting the refactoring tasks, so a direct numerical comparison is not available.

The refactoring focused on improving code structure by extracting pure functions, removing duplication, simplifying functions, and improving readability. The extracted service-layer functions are now much easier to test directly, which makes it easier to add focused unit tests for edge cases in the future.

The current report shows that the service and repository layers have excellent coverage (100%), demonstrating that separating business logic into pure functions makes testing simpler. Lower coverage remains mainly in the React context and UI components, which require additional component and integration tests.
