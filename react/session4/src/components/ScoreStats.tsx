import { useMemo } from "react";
import { useInterns } from "../contexts/intern-context";

function ScoreStats() {
  const { interns } = useInterns();

  const stats = useMemo(() => {
    console.log("Recalculating stats...");

    const scores = interns.map((intern) => intern.score);

    return {
      highest: scores.length > 0 ? Math.max(...scores) : 0,
      lowest: scores.length > 0 ? Math.min(...scores) : 0,
      average:
        scores.length > 0
          ? Math.round(
              scores.reduce((total, score) => total + score, 0) /
                scores.length
            )
          : 0,
      passing: interns.filter((intern) => intern.score >= 50).length,
    };
  }, [interns]);

  return (
    <div
      style={{
        padding: "12px",
        background: "#f9f9f9",
        marginBottom: "20px",
      }}
    >
      <h2>Score Statistics</h2>

      <p>
        Highest: {stats.highest} | Lowest: {stats.lowest} | Average:
        {" "}
        {stats.average}
      </p>

      <p>
        Passing: {stats.passing} of {interns.length}
      </p>
    </div>
  );
}

export default ScoreStats;