import { useState } from "react";

interface Intern {
  id: number;
  name: string;
  isPresent: boolean;
}

function StateTypes() {
  // TypeScript infers the type from the initial value
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Explicit types
  const [selected, setSelected] = useState<Intern | null>(null);
  const [interns, setInterns] = useState<Intern[]>([]);

  return (
    <div className="card">
      <h2>State Types</h2>

      <p>Name: {name || "(none)"}</p>
      <p>Score: {score}</p>
      <p>Active: {isActive ? "Yes" : "No"}</p>
      <p>Selected: {selected ? selected.name : "(none)"}</p>
      <p>Intern Count: {interns.length}</p>

      <button onClick={() => setName("Rahul")}>
        Set Name
      </button>

      <button onClick={() => setScore(92)}>
        Set Score
      </button>

      <button onClick={() => setIsActive(true)}>
        Activate
      </button>

      <button
        onClick={() =>
          setSelected({
            id: 1,
            name: "Rahul",
            isPresent: true,
          })
        }
      >
        Select Intern
      </button>

      <button
        onClick={() =>
          setInterns([
            { id: 1, name: "Rahul", isPresent: true },
            { id: 2, name: "Priya", isPresent: false },
          ])
        }
      >
        Load Interns
      </button>

      {/*
        Explore Findings:

        1. setScore("92")
           Error:
           Argument of type 'string' is not assignable
           to parameter of type 'number'.

        2. setSelected({ id: 1, name: "Rahul" })
           Error:
           Property 'isPresent' is missing in type
           '{ id: number; name: string; }'
           but required in type 'Intern'.

        TypeScript prevents assigning values that do not
        match the declared state type.
      */}
    </div>
  );
}

export default StateTypes;