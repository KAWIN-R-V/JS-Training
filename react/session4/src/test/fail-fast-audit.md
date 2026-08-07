# Silent Failure Priority List

## Section 1

### 1.
Pattern: Missing validation before adding interns

File:
intern-context.tsx

Risk:
Invalid intern data could be stored in state and produce unexpected behaviour later.

---

### 2.
Pattern: Average score defaults to 0

File:
useInternSearch.ts

Risk:
A failed data load may appear identical to an empty intern list.

---

### 3.
Pattern: Validation returns false instead of throwing

File:
useInternForm.ts

Risk:
Callers may ignore the validation result and continue execution.


## Task 2.1 — Replace a null/undefined return with a throw

During the audit, no function was found that returned `null` or `undefined` to indicate an error. The existing `validateInternForm()` function returns `null` only to indicate successful validation, not a failure.

Therefore, no refactoring was required for this task.

## Comment:

Number of callers with null checks removed: 0.

This indicates that the current project does not rely on null or undefined returns to represent error conditions, so no callers required refactoring.

## Task 2.2 — Fix an empty catch block or swallowed exception

No empty or swallowed catch blocks were found during the audit.

The current intern dashboard does not make any API calls or use try...catch blocks that suppress exceptions, so no code changes were required.

## Comment:

The application never returned `undefined` from a swallowed exception because no such pattern exists. If an exception occurred in the future, rethrowing it with additional context would make debugging much easier than silently continuing execution.

## Task 2.3 — Replace a silent default with a throw

No silent defaults (`||` or `??`) were found that masked missing required values.

The only default value in the project is the injected `generateId` function, which is intentionally provided to support dependency injection and testing. It is not masking invalid application data, so no refactoring was required.

## Comment:

The default was not masking a caller error because it was an intentional fallback used for testability. A silent default should only be replaced when it hides invalid or missing required data.



## Task 3.1 — Guard Clauses

The form submission was refactored so that validation is the first operation performed.

Before:
- The function could continue toward creating an intern before clearly stopping on invalid input.

After:
- The guard clause (`if (!isValid()) return;`) executes first.
- No work is performed when validation fails.

## Comment:

In the original flow, the function could begin processing the submission before confirming that the input was valid. If validation failed later, unnecessary work might already have been performed. In the refactored version, the first thing that runs on every call is the validation guard clause, so invalid input immediately exits the function.

## Task 3.2 - Guard Clause Order — validateInternForm

### Before

1. Check if the name is empty using `name.trim()`
2. Check whether the score is between 0 and 100

### After

1. Null/undefined check for `name` and `score`
2. Type check (`typeof name === "string"` and `typeof score === "number"`)
3. Empty name check (`!name.trim()`)
4. Score range check (`score < 0 || score > 100`)

### Reason for reordering

The cheapest validation checks should run first because they fail immediately without performing unnecessary work. Null and type checks are simple comparisons, while string trimming and range validation are slightly more expensive. Organizing the guard clauses this way follows the fail-fast principle and makes the validation logic easier to understand and maintain.

## Task 3.3 — Guard Clause Tests

One test was written for each guard clause in `validateInternForm`.

## Comment:

Testing each guard clause directly was much easier than testing the same logic through a React hook or component. The validation function is a pure function with no React state or UI dependencies, so each input can be tested independently. This makes the tests simpler, faster, and easier to maintain.


## Task 4.1
## Error Message Audit

| File | Current message | Answers all 3 questions? | Improved message |
|------|-----------------|--------------------------|------------------|
| src/contexts/intern-context.tsx | `useInterns must be used inside InternProvider` | Partially | `useInterns: expected component to be wrapped in InternProvider, got: null context` |
| src/utils/assert.ts | `Assertion failed: ${message}` | Partially | `assert: assertion failed - ${message}` |
| src/config.ts | `config: VITE_API_BASE is required. Add it to your .env file.` | Yes | No change required |
| src/contexts/intern-context.tsx *(Task 2.3 if implemented)* | `addIntern: id is required, got: ${intern.id}` | Yes | No change required |

## Task 4.2 — Improved Error Messages

Three error messages were updated to include:

- The function where the error occurred.
- What value or condition was expected.
- What value was actually received.

## Comment:

Improving the error messages required keeping the actual value available at the point where the error was thrown. In most cases, the required value was already in scope, so the function signatures did not need to be changed.

## Task 4.3

## 2am Test — useInterns

**Error message:**

`useInterns: expected component to be wrapped in InternProvider, got: null context`

### What I know from this message alone

- Which function failed: `useInterns`
- What was expected: The component should be wrapped inside `InternProvider`.
- What was actually received: A `null` context was received.

### What I would do next without reading any code

- Check whether the component is wrapped inside `<InternProvider>`.
- Verify the component hierarchy in `App.tsx` or the parent component.
- Ensure the provider is not accidentally removed or rendered conditionally.

### Would the original message have been enough? Why not?

The original message, **"useInterns must be used inside InternProvider"**, explained what was expected but did not clearly indicate what was actually received. The improved message provides the function name, the expected condition, and the actual value (`null context`), making it much easier to identify and fix the issue quickly during debugging.


## Task 5.2 — Precondition Assertions

The `assert` statements verify that the inputs have the correct type before any validation logic is executed.

## Comment:

The `assert` checks are **preconditions**. They throw an exception immediately when the function receives an invalid type, preventing the function from continuing with invalid input.

The validation logic below checks whether otherwise valid inputs satisfy the application's business rules, such as requiring a non-empty name and a score between 0 and 100. These checks return validation messages instead of throwing because they represent expected user input errors rather than programming errors.

## Task 5.3 — Postcondition Assertion

A postcondition assertion was added to `filterInterns()` to verify that the function always returns an array.

## Comment:

This postcondition is unlikely to fail because JavaScript's `Array.filter()` always returns an array. In this case, the assertion mainly serves as documentation and makes the function's expected output explicit.

A documentation-style assertion becomes valuable if the implementation changes in the future. It helps detect unexpected behavior early and makes debugging easier if another developer accidentally returns an incorrect value.



## Task 6.1 — API Boundary Validation

Validation was added before updating the intern list in `intern-context.tsx`.

## Comment:

Without this validation, malformed API data could be stored in the application state, causing incorrect information, unexpected UI behavior, or runtime errors later in the application.

With fail-fast validation, invalid data is rejected immediately with a clear error message, preventing corrupted state and making the source of the problem much easier to identify.

## Task 6.2 — Configuration Check

A startup configuration check was added in `src/config.ts` to verify that `VITE_API_BASE` is defined before the application starts.

## Comment:

This check runs at **import time**, when `config.ts` is first imported by the application.

Running the check at import time follows the fail-fast principle because configuration errors are detected immediately during startup instead of later when the application first tries to use the configuration. This prevents the application from running in an invalid state and makes configuration problems easier to diagnose.