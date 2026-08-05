## Task 1.1
## Comment - Which file mixes the most concerns? List each concern you can identify in it.
The file that mixes the most concerns is `intern-context.tsx`.

It currently combines several responsibilities:

- React Context creation
- State management
- Initial data loading
- API response validation
- Loading state management

Because it performs multiple responsibilities, it has the greatest opportunity for refactoring into separate service and repository layers, improving maintainability and testability.

# Task 1.2 — Label the Violations
## Snippet A

```ts
function addIntern(form: InternFormState) {
  if (!form.name.trim()) return
  const id = Date.now()
  const score = Math.round(form.score)
  setInterns(prev => [...prev, { id, ...form, score }])
}
```

| Code | Current Layer | Should Be | Why |
|------|---------------|-----------|-----|
| `if (!form.name.trim())` | Context | Service | Validation is business logic and should be handled by the service layer. |
| `const id = Date.now()` | Context | Service | ID generation is business logic and should not be in the context. |
| `const score = Math.round(form.score)` | Context | Service | Score calculation belongs to business logic. |
| `setInterns(...)` | Context | Repository | Updating application state is the repository's responsibility. |

---

## Snippet B

```ts
function InternCard(...) {
  useEffect(() => {
    fetch(...)
  })
}
```

**Current Layer:** UI Component

**Should Be:** Repository (or data access layer)

**Reason:** A UI component should only display data. Fetching data from an API is a data access responsibility and should be handled outside the component.

---

## Snippet C

```ts
export function getScoreBadge(score: number): JSX.Element
```

**Current Layer:** Utility

**Should Be:** UI Component

**Reason:** Returning JSX is a presentation concern. Utility or service functions should return plain values such as `"Pass"` or `"Fail"` instead of React elements.

---

## Snippet D

```ts
const filteredInterns = searchTerm
  ? interns.filter(...)
  : interns
```

**Current Layer:** Context

**Should Be:** Service

**Reason:** Filtering is business logic. The service layer should perform filtering, while the context should only coordinate between the service and repository.

## comment: For Snippet A — how many distinct concerns are in those four lines? Which concern requires the most setup when writing a test?
Snippet A contains **four distinct concerns**:

1. Input validation
2. ID generation
3. Score calculation
4. State management

The concern that requires the most setup when writing a test is **state management**, because it depends on React state (`setInterns`) and the context environment. The other concerns are pure business logic and can be tested independently with simple unit tests.



## Task 2.1 — Observation
## comment: Observe: How many lines of Arrange does each test need? Do any of them need vi.mock, renderHook, or render?
The service layer tests require very little setup, usually only a few lines to create the input data.

None of the tests require `vi.mock`, `renderHook`, or `render` because the service functions are pure functions with no React dependencies. This makes the tests simple, fast, and easy to maintain.

## Task 2.2 — Service Layer Purity
The `intern-service.ts` file has **no React imports**.

## Comment: - Why is it important that the service layer has no React imports? What would happen to your tests if it did?
Keeping the service layer independent of React makes the business logic reusable and easy to test. Since the functions are pure and do not depend on React hooks or components, they can be tested with simple unit tests.

If the service layer imported React, the tests would require additional setup such as `render`, `renderHook`, or React providers. This would make the tests slower, more complex, and tightly coupled to the UI framework.



## Task 3.1 — Repository Tests
## comment: Does any test in `intern-repository.test.ts` use `vi.mock`? Why not?
No test in `intern-repository.test.ts` uses `vi.mock`.

The repository only manages React state and has no external dependencies such as network requests, timers, or APIs. Therefore, mocking is unnecessary and the hook can be tested directly using `renderHook()`.

## Task 3.1 — Service vs Repository Testing
## comment:** What is the difference between testing the repository and testing the service? Which is simpler to set up?

The service layer tests focus on pure business logic such as validation, score calculation, and filtering. These tests are the simplest because they only require function calls and assertions.

The repository tests focus on state management. They require `renderHook()` and `act()` to interact with React state, making them slightly more complex than service tests. However, they still do not require mocking external dependencies.

## Task 3.2 — Verify the Separation

### 1. Does `useInternRepository` validate anything?
**Answer:** No.

The repository accepts a complete `Intern` object and stores it without checking whether the data is valid. Validation is handled by the service layer.

---

### 2. Does `useInternRepository` generate any IDs?
**Answer:** No.

The repository stores the `Intern` object exactly as it is received. ID generation is performed by the service layer before the object reaches the repository.

---

### 3. Does `useInternRepository` calculate any averages?
**Answer:** No.

The repository only manages the collection of interns. Calculations such as average score belong to the service layer.

---

### Conclusion
The repository has a single responsibility: **managing application state**. It does not perform validation, generate IDs, calculate values, or contain business rules. Those responsibilities are handled by the service layer, maintaining a clear separation of concerns.



## Task 4.1
## comment: How many lines is the new `InternProvider`? How many lines was it before the refactor?
After the refactor, `InternProvider` became much smaller because it now delegates business logic to the service layer and state management to the repository layer.

The provider mainly wires the layers together instead of implementing application logic.

The new `InternProvider` is approximately 20–30 lines long, whereas the original implementation was around 70–90 lines long because it handled data loading, validation, state updates, and business logic.

Moving those responsibilities into dedicated layers made the provider significantly simpler and easier to maintain.

## comment: Can you now change how intern IDs are generated without touching `intern-context.tsx`? Which file would you change?
Yes. Intern ID generation can now be changed without modifying `intern-context.tsx`.

The change only needs to be made in `src/services/intern-service.ts`, where the `createIntern()` function is responsible for generating IDs. The context remains unchanged because it simply calls the service.

## Task 4.2 — Dependency Direction
The presentational `SummaryBar` does **not** import anything from the service layer.

Instead, the container component performs any required calculations and passes the results to the presentational component through props.

### Comment - Should a presentational component import from the service layer directly? Or should the container component call the service and pass the result as a prop?
A presentational component should **not** import the service layer directly.

The container component should call the service, prepare the required data, and pass the results as props. This keeps the presentational component focused only on rendering the UI.

### Comment - What is the test consequence of each choice? Which is easier to test?
When the presentational component receives data through props, testing is much easier because the component can be rendered with simple input values.

If the presentational component imported the service layer directly, tests would need to verify both the business logic and the UI together, increasing complexity and coupling. Keeping the service and presentation separate makes both layers easier to test independently.



# Task 5.1 — Audit the Whole Codebase

| File | Expected Layer | Actual Concerns | Correct? |
|------|----------------|-----------------|----------|
| `src/components/SummaryBar.tsx` | UI | Displays summary information, container retrieves data from context, delegates average calculation to service | ✅ Yes |
| `src/components/AddInternForm.tsx` | UI | Renders the form, forwards user actions to the form hook | ✅ Yes |
| `src/components/InternCard.tsx` | UI | Displays intern details and score label | ✅ Yes |
| `src/hooks/useInternForm.ts` | Service + UI (Hook) | Form state management, coordinates validation and submission | ✅ Yes |
| `src/hooks/useInternSearch.ts` | Service + UI (Hook) | Search state, filtering, statistics calculation | ✅ Yes |
| `src/contexts/intern-context.tsx` | Wiring (Context) | Connects the service layer, repository layer, and UI | ✅ Yes |
| `src/services/intern-service.ts` | Service | Business logic, validation, filtering, score calculation, intern creation | ✅ Yes |
| `src/repositories/intern-repository.ts` | Repository | Manages intern state (add, remove, update) | ✅ Yes |


## Comment - After the refactor, does `useInternForm.ts` belong in the service layer, the UI layer, or is it wiring? It uses both `validateInternForm` (service) and `addIntern` (context). What would you name this layer?
After the refactor, `useInternForm.ts` does not belong entirely to the service layer or the UI layer. Instead, it acts as a **wiring (or orchestration) layer**.

The hook manages the form state, calls the service layer to validate and create intern data, and invokes the context to store the new intern. It coordinates communication between the UI, the service layer, and the context without containing the core business logic itself.

A suitable name for this layer is **Application (or Wiring) Layer**, because its responsibility is to orchestrate interactions between the presentation layer and the domain logic.

## Task 5.2
### Verification
✔ `useInternForm` calls `validateInternForm` from `intern-service.ts`.

✔ `useInternForm` receives `addIntern` through dependency injection instead of importing the context directly.

✔ `useInternForm` performs no network requests.

✔ `useInternForm` does not directly modify the interns list.

### Comment - Which layer does `useInternForm` now belong to? Is it a service, a repository, or is it a "coordination hook" that sits between the UI and the service?

`useInternForm` is **not** a service layer and it is **not** a repository.

Instead, it is a **coordination hook** (also called an application or orchestration layer).

Its responsibility is to coordinate interactions between:

- the UI (form inputs),
- the service layer (validation and business rules),
- and the context/repository (storing the intern).

This separation keeps business logic independent of React while keeping the hook focused on coordinating application flow.



# Task 6.1 — Dependency Diagram

```
AddInternForm.tsx
    └── calls useInternForm (hook)
            ├── calls validateInternForm (intern-service)
            ├── calls createIntern (intern-service)
            └── calls injected addIntern()
                    └── InternProvider
                            └── repo.add()
                                    └── React state

--------------------------------------------------------

SummaryBarContainer
    ├── calls useInterns()
    ├── calls calculateAverageScore (intern-service)
    └── passes props to
            └── SummaryBar
                    └── renders UI only

--------------------------------------------------------

InternProvider
    ├── uses useInternRepository()
    │       ├── add()
    │       ├── remove()
    │       ├── update()
    │       └── manages React state
    │
    ├── calls createIntern (intern-service)
    ├── calls calculateAverageScore (intern-service)
    └── provides values through InternContext

--------------------------------------------------------

useInternSearch
    ├── calls filterInterns (intern-service)
    └── returns filtered interns and search state
```

## Comment - Does any arrow point upward (from a lower layer to a higher layer)? If yes — you have a circular dependency to fix.
All dependencies flow **downward**:

```
UI Components
      │
      ▼
Hooks / Context (Coordination Layer)
      │
      ├──────────────┐
      ▼              ▼
 Service Layer   Repository Layer
                      │
                      ▼
                 React State
```

There are **no upward dependencies**.

- The service layer does **not** import the repository.
- The repository does **not** import the service.
- UI components do **not** contain business logic.
- The context coordinates the interaction between the service and repository.

Because every dependency flows in one direction, there are **no circular dependencies** to fix.

# Task 6.2 — One-Sentence Test (After Refactoring)
## src/contexts/intern-context.tsx
**Before:**
> This file manages intern state, validates data, generates IDs, and calculates averages.

**After:**
> This file wires the service and repository layers together and provides the Intern Context to the application.

---

## src/hooks/useInternForm.ts
**Before:**
> This hook managed form state and contained validation and submission logic.

**After:**
> This hook coordinates the form UI by calling the service layer for validation and the context for storing interns.

---

## src/hooks/useInternSearch.ts
**Before:**
> This hook managed searching and filtering interns.

**After:**
> This hook coordinates search state and delegates filtering logic to the service layer.

---

## src/components/SummaryBar.tsx
**Before:**
> This file displayed summary information while also calculating the average score.

**After:**
> This file renders summary information, while the container retrieves data and delegates calculations to the service layer.

---

## src/components/AddInternForm.tsx
**Before:**
> This component rendered the intern form and handled form logic.

**After:**
> This component renders the Add Intern form and forwards user interactions to the coordination hook.

---

## src/services/intern-service.ts
> This file contains all business logic related to interns, including validation, intern creation, filtering, score calculation, and score labels.

---

## src/repositories/intern-repository.ts
> This file manages the intern state by adding, removing, and updating interns without containing business logic.

## Comment - Did every file improve its one-sentence description? Which file is still hardest to describe in one sentence?
Yes. Every file has a clearer and more focused one-sentence description after the refactor because each file now has a single primary responsibility.

The file that is still the hardest to describe in one sentence is `useInternForm.ts`. It is not purely a UI component, service, or repository. Instead, it acts as a **coordination (or orchestration) hook**, connecting the UI, service layer, and context while avoiding business logic itself. Although it coordinates multiple layers, it still maintains a single responsibility: managing the interaction between them.