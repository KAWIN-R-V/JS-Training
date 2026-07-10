interface ScoreBarProps {
  score: number;
}

/*
Single Responsibility:
This component visually represents
an intern's score using a progress bar.
*/

function ScoreBar({ score }: ScoreBarProps) {
  return (
    <div
      style={{
        background: "#eee",
        borderRadius: "5px",
        height: "8px",
        marginTop: "10px",
      }}
    >
      <div
        style={{
          width: `${score}%`,
          background: score >= 50 ? "green" : "red",
          height: "8px",
          borderRadius: "5px",
        }}
      />
    </div>
  );
}

export default ScoreBar;