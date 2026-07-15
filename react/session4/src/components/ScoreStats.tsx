import { useMemo } from "react";
import { useInterns } from "../contexts/intern-context";

function ScoreStats() {
  const { interns } = useInterns();

  const stats = useMemo(() => {
    console.log("Recalculating stats...");

    const scores = interns.map((i) => i.score);

    return {
      highest: scores.length ? Math.max(...scores) : 0,
      lowest: scores.length ? Math.min(...scores) : 0,
      average: scores.length
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0,
      passing: interns.filter((i) => i.score >= 50).length,
    };
  }, [interns]);

  return (
    <div
      style={{
        background: "#f3f3f3",
        padding: "10px",
        marginBottom: "20px",
      }}
    >
      <h2>Score Statistics</h2>

      <p>Highest : {stats.highest}</p>
      <p>Lowest : {stats.lowest}</p>
      <p>Average : {stats.average}</p>
      <p>
        Passing : {stats.passing} / {interns.length}
      </p>
    </div>
  );
}

export default ScoreStats;

/*
Without useMemo, the statistics would be recalculated every time
the component re-renders, even if the intern data hasn't changed.
useMemo prevents unnecessary calculations and improves performance.
*/