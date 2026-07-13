import { useState, useEffect } from "react";

interface Intern {
  id: number;
  name: string;
  score: number;
  role: string;
}

const allInterns: Intern[] = [
  { id: 1, name: "Rahul", score: 92, role: "Frontend" },
  { id: 2, name: "Priya", score: 78, role: "Backend" },
  { id: 3, name: "Amit", score: 45, role: "Frontend" },
  { id: 4, name: "Sneha", score: 95, role: "Fullstack" },
];

function FilteredInterns() {
  const [role, setRole] = useState<string>("all");
  const [filtered, setFiltered] = useState<Intern[]>(allInterns);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const result =
        role === "all"
          ? allInterns
          : allInterns.filter((intern) => intern.role === role);

      setFiltered(result);
      setIsLoading(false);
    }, 500);
  }, [role]);

  return (
    <div className="card">
      <h2>Filtered Interns</h2>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="all">All</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="Fullstack">Fullstack</option>
      </select>

      <br />
      <br />

      {isLoading ? (
        <p>Updating...</p>
      ) : (
        <ul>
          {filtered.map((intern) => (
            <li key={intern.id}>
              <strong>{intern.name}</strong> — {intern.role}
            </li>
          ))}
        </ul>
      )}

      {/*
        Explore Findings:

        1. No dependency array:
           useEffect runs after every render.
           Changing state inside it causes repeated renders
           and may lead to an infinite loop.

        2. Empty dependency array []:
           useEffect runs only once when the component mounts.
           Changing the dropdown does not update the list.

        3. [role]:
           useEffect runs initially and again whenever
           the role value changes. This is the correct
           dependency for filtering interns.
      */}
    </div>
  );
}

export default FilteredInterns;