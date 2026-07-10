import Avatar from "./Avatar";
import Badge from "./Badge";
import ScoreBar from "./ScoreBar";

interface InternCardProps {
  name: string;
  score: number;
  isPresent: boolean;
  role: string;
}

/*
Interfaces define the expected structure of props separately,
making components cleaner, reusable, and easier to maintain.
*/

function InternCard({
  name,
  score,
  isPresent,
  role,
}: InternCardProps) {
  // Props are read-only.
  // We should never modify them directly.
  // Instead, compute a new value.
  const adjustedScore: number =
    score >= 90 ? score : score + 5;

  return (
    <div className="card">
      <Avatar name={name} />

      <h2>{name}</h2>

      <p>Original Score : {score}</p>

      <p>Adjusted Score : {adjustedScore}</p>

      <ScoreBar score={adjustedScore} />

      <div
        style={{
          display: "flex",
          gap: "8px",
          marginTop: "10px",
          flexWrap: "wrap",
        }}
      >
        <Badge label={role} color="#4f46e5" />

        <Badge
          label={isPresent ? "Present" : "Absent"}
          color={isPresent ? "green" : "red"}
        />

        {score >= 90 && (
          <Badge
            label="Top Performer"
            color="#d97706"
          />
        )}
      </div>
    </div>
  );
}

export default InternCard;