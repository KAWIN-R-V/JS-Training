import { useState } from "react";
import type { ChangeEvent } from "react";

interface InternFormState {
  name: string;
  score: number;
  role: string;
  isPresent: boolean;
}

interface UseInternFormReturn {
  form: InternFormState;
  error: string;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleReset: () => void;
  isValid: () => boolean;
}

const initialForm: InternFormState = {
  name: "",
  score: 0,
  role: "Frontend",
  isPresent: true,
};

function useInternForm(): UseInternFormReturn {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
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

  function handleReset() {
    setForm(initialForm);
    setError("");
  }

  function isValid() {
    if (!form.name.trim()) {
      setError("Name is required");
      return false;
    }

    if (form.score < 0 || form.score > 100) {
      setError("Score must be between 0 and 100");
      return false;
    }

    setError("");
    return true;
  }

  return {
    form,
    error,
    handleChange,
    handleReset,
    isValid,
  };
}

export default useInternForm;

/*
The UseInternFormReturn interface ensures the hook always returns
the expected properties with correct types, improving readability,
type safety, and IDE autocomplete support.
*/