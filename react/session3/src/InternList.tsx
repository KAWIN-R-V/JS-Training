import { useState } from "react";

interface Intern {
  id: number;
  name: string;
}

function InternList() {
  const [interns, setInterns] = useState<Intern[]>([]);
  const [inputName, setInputName] = useState<string>("");
  const [nextId, setNextId] = useState<number>(1);

  function handleAdd(): void {
    if (!inputName.trim()) return;

    setInterns((prev) => [
      ...prev,
      {
        id: nextId,
        name: inputName.trim(),
      },
    ]);

    setNextId((prev) => prev + 1);
    setInputName("");
  }

  function handleRemove(id: number): void {
    setInterns((prev) => prev.filter((intern) => intern.id !== id));
  }

  return (
    <div className="card">
      <h2>Intern List</h2>

      <input
        type="text"
        placeholder="Enter Intern Name"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
      />

      <button onClick={handleAdd}>Add</button>

      <p>
        <strong>Total Interns:</strong> {interns.length}
      </p>

      <ul>
        {interns.map((intern) => (
          <li key={intern.id}>
            {intern.id}. {intern.name}

            <button
              style={{ marginLeft: "10px" }}
              onClick={() => handleRemove(intern.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      {/*
        We use [...prev, newIntern] to create a new array
        instead of modifying the existing array.

        Likewise, filter() returns a new array after removing
        the selected item.

        Methods like push() and splice() modify the original
        array directly. React state should be treated as
        immutable, so creating a new array ensures React
        detects the change and re-renders the component.
      */}
    </div>
  );
}

export default InternList;