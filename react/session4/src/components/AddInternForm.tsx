import useInternForm from "../hooks/useInternForm";
import { useInterns } from "../contexts/intern-context";

function AddInternForm() {
  const { form, error, handleChange, handleReset, isValid } =
    useInternForm();

  const { addIntern, interns } = useInterns();

  function handleSubmit(): void {
    if (!isValid()) return;

    addIntern({
      id: interns.length + 1,
      ...form,
    });

    handleReset();
  }

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