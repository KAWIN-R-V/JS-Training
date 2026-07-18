import { useTheme } from "../contexts/theme-context";

interface InternRowProps {
  id: number;
  name: string;
  score: number;
  onRemove: (id: number) => void;
}

function InternRow({
  id,
  name,
  score,
  onRemove,
}: InternRowProps) {
  const { theme } = useTheme();

  return (
    <div
      style={{
        background: theme === "light" ? "#fff" : "#2a2a2a",
        color: theme === "light" ? "#000" : "#fff",
        padding: "10px",
        margin: "6px 0",
        border: "1px solid #ccc",
      }}
    >
      <span>
        {name} - {score}
      </span>

      <button
        style={{ marginLeft: "15px" }}
        onClick={() => onRemove(id)}
      >
        Remove
      </button>
    </div>
  );
}

export default InternRow;