// Testability audit — useInternForm.ts
// Q1 Predictable output? PARTIALLY — validation is predictable, but the hook depends on React state.
// Q2 No external deps? YES — no network, database, or browser APIs.
// Q3 Dependencies injectable? YES — addIntern and generateId are injected.
// Verdict: HIGHLY TESTABLE

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