// Job: This component renders the Add Intern form and forwards user actions to the form hook.
// Concerns mixed (if any):
// None. It is mainly responsible for rendering the UI and handling user interactions.

import useInternForm from "../hooks/useInternForm";
import { useInterns } from "../contexts/intern-context";

function AddInternForm() {
  const { addIntern } = useInterns();

  const {
    form,
    error,
    handleChange,
    handleReset,
    submit,
  } = useInternForm(addIntern);

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Add Intern</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        name="name"
        type="text"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
      />

      <br />
      <br />

      <input
        name="score"
        type="number"
        value={form.score}
        onChange={handleChange}
        placeholder="Score"
      />

      <br />
      <br />

      <input
        name="isPresent"
        type="checkbox"
        checked={form.isPresent}
        onChange={handleChange}
      />

      <label> Present</label>

      <br />
      <br />

      <select
        name="role"
        value={form.role}
        onChange={handleChange}
      >
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="Fullstack">Fullstack</option>
      </select>

      <br />
      <br />

      <button onClick={submit}>Add Intern</button>

      <button
        onClick={handleReset}
        style={{ marginLeft: "10px" }}
      >
        Reset
      </button>
    </div>
  );
}

export default AddInternForm;