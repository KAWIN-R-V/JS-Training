import { useState } from "react";

interface FormState {
  name: string;
  score: number;
  isPresent: boolean;
  role: string;
}

const initialForm: FormState = {
  name: "",
  score: 0,
  isPresent: true,
  role: "Frontend",
};

function InternObjectForm() {
  const [form, setForm] = useState<FormState>(initialForm);

  function handleNameChange(
    e: React.ChangeEvent<HTMLInputElement>
  ): void {
    setForm((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  }

  function handleScoreChange(
    e: React.ChangeEvent<HTMLInputElement>
  ): void {
    setForm((prev) => ({
      ...prev,
      score: Number(e.target.value),
    }));
  }

  function handlePresentChange(
    e: React.ChangeEvent<HTMLInputElement>
  ): void {
    setForm((prev) => ({
      ...prev,
      isPresent: e.target.checked,
    }));
  }

  function handleRoleChange(
    e: React.ChangeEvent<HTMLSelectElement>
  ): void {
    setForm((prev) => ({
      ...prev,
      role: e.target.value,
    }));
  }

  function handleReset(): void {
    setForm(initialForm);
  }

  return (
    <div className="card">
      <h2>Intern Object Form</h2>

      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={handleNameChange}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Score"
        value={form.score}
        onChange={handleScoreChange}
      />

      <br />
      <br />

      <label>
        <input
          type="checkbox"
          checked={form.isPresent}
          onChange={handlePresentChange}
        />
        Present
      </label>

      <br />
      <br />

      <select
        value={form.role}
        onChange={handleRoleChange}
      >
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="Fullstack">Fullstack</option>
      </select>

      <br />
      <br />

      <p><strong>Name:</strong> {form.name}</p>
      <p><strong>Score:</strong> {form.score}</p>
      <p><strong>Present:</strong> {form.isPresent ? "Yes" : "No"}</p>
      <p><strong>Role:</strong> {form.role}</p>

      <button onClick={handleReset}>Reset</button>

      {/*
        We use:
        { ...prev, name: e.target.value }

        because React state should never be modified directly.

        The spread operator copies all existing properties
        and updates only the changed field.

        If we forgot the spread operator, all the other
        properties (score, isPresent, role) would be lost,
        leaving the state object incomplete.
      */}
    </div>
  );
}

export default InternObjectForm;