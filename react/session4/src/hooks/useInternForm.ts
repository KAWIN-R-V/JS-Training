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

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : name === "score"
          ? Number(value)
          : value,
    }));
  }

  function handleReset(): void {
    setForm(initialForm);
    setError("");
  }

  function isValid(): boolean {
    const validation = validateInternForm(form.name, form.score);

    if (validation) {
      setError(validation);
      return false;
    }

    setError("");
    return true;
  }

  function submit(): void {
    if (!isValid()) return;

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
// The long submit() function should be refactored first because it performs several responsibilities.
// Splitting it into smaller functions will improve readability, maintainability, and testing.