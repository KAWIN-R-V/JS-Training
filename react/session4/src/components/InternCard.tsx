interface InternCardProps {
  name: string;
  score: number;
  isPresent: boolean;
}

function InternCard({ name, score, isPresent }: InternCardProps) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "12px",
        marginBottom: "10px",
        borderRadius: "4px",
      }}
    >
      <h3>{name}</h3>

      <p>Score: {score}</p>

      <p>{isPresent ? "Present" : "Absent"}</p>
    </div>
  );
}

export default InternCard;