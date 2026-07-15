import { useInterns } from "../contexts/intern-context";
import useInternSearch from "../hooks/useInternSearch";

function InternSearch() {
  const { interns } = useInterns();

  const { search, setSearch, filtered, stats } =
    useInternSearch(interns);

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Search Interns</h2>

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p>Total: {stats.total}</p>
      <p>Present: {stats.present}</p>
      <p>Average Score: {stats.avg}</p>

      <hr />

      {filtered.map((intern) => (
        <div key={intern.id}>
          <strong>{intern.name}</strong> - {intern.role} - {intern.score}
        </div>
      ))}
    </div>
  );
}

export default InternSearch;