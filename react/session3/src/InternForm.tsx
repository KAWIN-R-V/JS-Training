import { useState } from "react";

function InternForm() {
  const [name, setName] = useState<string>("");
  const [score, setScore] = useState<number>(0);

  function handleNameChange(
    e: React.ChangeEvent<HTMLInputElement>
  ): void {
    setName(e.target.value);
  }

  function handleScoreChange(
    e: React.ChangeEvent<HTMLInputElement>
  ): void {
    setScore(Number(e.target.value));
  }

  function handleReset(): void {
    setName("");
    setScore(0);
  }

  return (
    <div className="card">
      <h2>Intern Form</h2>

      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Intern Name"
      />

      <br />
      <br />

      <input
        type="number"
        value={score}
        onChange={handleScoreChange}
        placeholder="Score"
      />

      <br />
      <br />

      <p>
        Name: <strong>{name || "(none)"}</strong>
      </p>

      <p>
        Score: <strong>{score}</strong>
      </p>

      <button onClick={handleReset}>Reset</button>

      {/*
        Even though the input type is "number",
        e.target.value is always returned as a string.
        Number() converts the string into a numeric value
        before storing it in state.
      */}

      {/*
        Controlled Input:
        A controlled input is an input whose value is managed
        by React state. The displayed value always comes from
        the component state, and every change updates the state
        using the onChange event handler.
      */}
    </div>
  );
}

export default InternForm;