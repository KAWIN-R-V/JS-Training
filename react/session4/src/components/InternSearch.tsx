import { useInterns } from "../contexts/intern-context";
import useInternSearch from "../hooks/useInternSearch";

function InternSearch() {
  const { interns } = useInterns();

  const { search, setSearch, filtered, stats } =
    useInternSearch(interns);

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Search Interns</h2>

      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={{ marginTop: "10px" }}>
        <p>Total Interns: {stats.total}</p>
        <p>Present: {stats.present}</p>
        <p>Average Score: {stats.avg}</p>
      </div>

      <h3>Search Results</h3>

      {filtered.map((intern) => (
        <div
          key={intern.id}
          style={{
            border: "1px solid gray",
            padding: "8px",
            marginBottom: "8px",
          }}
        >
          <strong>{intern.name}</strong>

          <p>Role: {intern.role}</p>

          <p>Score: {intern.score}</p>

          <p>
            Status:
            {intern.isPresent ? " Present" : " Absent"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default InternSearch;