import { useState, useEffect } from "react";

interface Intern {
  id: number;
  name: string;
  score: number;
  role: string;
}

function InternLoader() {
  const [interns, setInterns] = useState<Intern[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);

    // Simulating an API call with a delay
    setTimeout(() => {
      setInterns([
        {
          id: 1,
          name: "Rahul",
          score: 92,
          role: "Frontend",
        },
        {
          id: 2,
          name: "Priya",
          score: 78,
          role: "Backend",
        },
        {
          id: 3,
          name: "Amit",
          score: 45,
          role: "Frontend",
        },
        {
          id: 4,
          name: "Sneha",
          score: 95,
          role: "Fullstack",
        },
      ]);

      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return (
      <div className="card">
        <h2>Intern Loader</h2>
        <p>Loading interns...</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Intern Loader</h2>

      <ul>
        {interns.map((intern) => (
          <li key={intern.id}>
            <strong>{intern.name}</strong> — {intern.role} — Score:{" "}
            {intern.score}
          </li>
        ))}
      </ul>

      {/*
        The data fetching logic is placed inside useEffect
        so it runs only after the component is rendered.

        If it were placed directly inside the component body,
        it would execute on every render, causing repeated
        API calls and unnecessary re-renders.
      */}
    </div>
  );
}

export default InternLoader;