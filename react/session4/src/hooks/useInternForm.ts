// Code Smell Audit — useInternForm.ts
// Smell 1: Long function — submit() validates the form, creates an intern, submits it, and resets the form.
// Smell 2: Multiple responsibilities — manages form state while coordinating business logic.
// Smell 3: Tight coupling — depends on validation logic and addIntern() in the same hook.

import { useState } from "react";
import type { ChangeEvent } from "react";

import { validateInternForm } from "../utils/intern-validation";

export interface Intern {
  id: number;
  name: string;
  score: number;
  isPresent: boolean;
  role: string;
}

interface InternFormState {
  name: string;
  score: number;
  isPresent: boolean;
  role: string;
}

interface UseInternFormReturn {
  form: InternFormState;
  error: string;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleReset: () => void;
  isValid: () => boolean;
  submit: () => void;
}

const initialForm: InternFormState = {
  name: "",
  score: 0,
  isPresent: true,
  role: "Frontend",
};

function useInternForm(
  addIntern: (intern: Intern) => void,
  generateId: () => number = Date.now
): UseInternFormReturn {
  const [form, setForm] = useState<InternFormState>(initialForm);
  const [error, setError] = useState("");

  // Extracted helper function
  function getFieldValue(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): string | number | boolean {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      return (e.target as HTMLInputElement).checked;
    }

    if (name === "score") {
      return Number(value);
    }

    return value;
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void {
    const { name } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: getFieldValue(e),
    }));
  }

  function handleReset(): void {
    setForm(initialForm);
    setError("");
  }

  function isValid(): boolean {
    const validationError = validateInternForm(
      form.name,
      form.score
    );

    if (validationError) {
      setError(validationError);
      return false;
    }

    setError("");
    return true;
  }

  // Guard clause
  function submit(): void {
    const formIsValid = isValid();

    if (!formIsValid) {
      return;
    }

    addIntern({
      id: generateId(),
      ...form,
    });

    handleReset();
  }

  return {
    form,
    error,
    handleChange,
    handleReset,
    isValid,
    submit,
  };
}

export default useInternForm;

// Smell to fix first:
// The long submit() function performs multiple responsibilities
// (validation, object creation, submission, and reset).
// Extracting responsibilities into helper functions improves
// readability, maintainability, and testing.