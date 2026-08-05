## Task 1.2
# Refactoring Priority List

1. **Multiple responsibilities** in `src/contexts/intern-context.tsx` — because the file mixes context wiring, state management, data loading, and business logic, making it difficult to maintain and increasing the risk of bugs when changes are made.

2. **Long function** in `src/hooks/useInternForm.ts` — because the `submit()` function performs validation, creates the intern object, submits it, and resets the form. A change in one responsibility can unintentionally affect the others.

3. **Magic numbers** in `src/utils/intern-validation.ts` — because the hardcoded values `0` and `100` make validation rules harder to understand and more difficult to update if the business requirements change.

