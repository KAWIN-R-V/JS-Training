import { useTheme } from "../contexts/theme-context";

interface ThemedCardProps {
  name: string;
  score: number;
}

function ThemedCard({ name, score }: ThemedCardProps) {
  const { theme } = useTheme();

  return (
    <div
      style={{
        background: theme === "light" ? "#ffffff" : "#2a2a2a",
        color: theme === "light" ? "#000" : "#eeeeee",
        border: `1px solid ${theme === "light" ? "#dddddd" : "#444444"}`,
        padding: "12px",
        margin: "10px 0",
        borderRadius: "6px",
      }}
    >
      <h3>{name}</h3>

      <p>Score: {score}</p>

      <p style={{ color: score >= 50 ? "green" : "red" }}>
        {score >= 50 ? "Pass" : "Fail"}
      </p>
    </div>
  );
}

export default ThemedCard;