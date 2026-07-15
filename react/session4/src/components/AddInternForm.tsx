import useInternForm from "../hooks/useInternForm";
import { useInterns } from "../contexts/intern-context";

function AddInternForm() {
  const { form, error, handleChange, handleReset, isValid } =
    useInternForm();

  const { interns, addIntern } = useInterns();

  function handleSubmit() {
    if (!isValid()) return;

    addIntern({
      id: interns.length + 1,
      ...form,
    });

    handleReset();
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Add Intern</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        type="number"
        name="score"
        placeholder="Score"
        value={form.score}
        onChange={handleChange}
      />

      <br />
      <br />

      <label>
        <input
          type="checkbox"
          name="isPresent"
          checked={form.isPresent}
          onChange={handleChange}
        />
        Present
      </label>

      <br />
      <br />

      <select
        name="role"
        value={form.role}
        onChange={handleChange}
      >
        <option>Frontend</option>
        <option>Backend</option>
        <option>Fullstack</option>
      </select>

      <br />
      <br />

      <button onClick={handleSubmit}>Add Intern</button>

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