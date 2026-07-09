// Use && when something should either appear or not appear.
// Use a ternary when choosing between two different outputs.

function InternCard() {
  const name: string = "Amit";
  const score: number = 45;
  const isPresent: boolean = false;

  return (
    <div className="intern-card">
      <h2>{name}</h2>

      <p style={{ color: score >= 50 ? "green" : "red" }}>
        Score: {score} — {score >= 50 ? "Pass" : "Fail"}
      </p>

      {score >= 90 && <span>Top Performer</span>}

      {isPresent ? (
        <p>Present today</p>
      ) : (
        <p>Absent today</p>
      )}

      {/* && is used when rendering only if a condition is true.
          A ternary is used when choosing between two different UI outputs. */}
    </div>
  );
}

export default InternCard;