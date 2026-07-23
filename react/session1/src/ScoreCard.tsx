// Use a ternary operator when you need to choose between two values
// or render one of two UI elements based on a condition.

function ScoreCard() {
  const name: string = "Priya";
  const score: number = 78;

  return (
    <div>
      <h2>{name}</h2>

      {/* Render different text */}
      <p>{score >= 50 ? "Pass" : "Fail"}</p>

      {/* Render different styles */}
      <p style={{ color: score >= 50 ? "green" : "red" }}>
        Score: {score}
      </p>

      {/* Render different elements */}
      {score >= 90 ? (
        <span>Top Performer</span>
      ) : (
        <span>Keep it up!</span>
      )}

      {/* A ternary is useful when both the true and false cases need to be rendered. */}
    </div>
  );
}

export default ScoreCard;