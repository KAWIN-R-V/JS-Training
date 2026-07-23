import { useState, useEffect, useRef } from "react";

interface Intern {
  id: number;
  name: string;
  score: number;
  role: string;
  isPresent: boolean;
}

function Dashboard() {
  const [interns, setInterns] = useState<Intern[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Load data after component mounts
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setInterns([
        {
          id: 1,
          name: "Rahul",
          score: 92,
          role: "Frontend",
          isPresent: true,
        },
        {
          id: 2,
          name: "Priya",
          score: 78,
          role: "Backend",
          isPresent: true,
        },
        {
          id: 3,
          name: "Amit",
          score: 45,
          role: "Frontend",
          isPresent: false,
        },
        {
          id: 4,
          name: "Sneha",
          score: 95,
          role: "Fullstack",
          isPresent: true,
        },
        {
          id: 5,
          name: "Karan",
          score: 60,
          role: "Backend",
          isPresent: false,
        },
      ]);

      setLoading(false);
    }, 1500);
  }, []);

  // Auto focus search input
  useEffect(() => {
    if (isOpen) {
      searchInputRef.current?.focus();
    }
  }, [isOpen]);

  // Derived filtered list
  const filteredInterns = interns.filter((intern) =>
    intern.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card">
      <h2>Intern Dashboard</h2>

      <button onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? "Hide Search" : "Show Search"}
      </button>

      {isOpen && (
        <>
          <br />
          <br />

          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search Intern..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </>
      )}

      <br />
      <br />

      {loading ? (
        <p>Loading interns...</p>
      ) : (
        <>
          <h3>
            Showing {filteredInterns.length} of {interns.length} interns
          </h3>

          {filteredInterns.map((intern) => (
            <div
              key={intern.id}
              style={{
                border: "1px solid gray",
                padding: "15px",
                margin: "15px 0",
                borderRadius: "8px",
              }}
            >
              <h3>{intern.name}</h3>

              <p>
                <strong>Role:</strong> {intern.role}
              </p>

              <p>
                <strong>Score:</strong> {intern.score}
              </p>

              <p>
                <strong>Present:</strong>{" "}
                {intern.isPresent ? "Yes" : "No"}
              </p>

              <span
                style={{
                  backgroundColor:
                    intern.score >= 50 ? "green" : "red",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "5px",
                }}
              >
                {intern.score >= 50 ? "PASS" : "FAIL"}
              </span>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Dashboard;