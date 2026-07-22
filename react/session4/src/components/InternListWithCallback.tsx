import { useCallback } from "react";
import { useInterns } from "../contexts/intern-context";
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

  console.log(`InternRow rendered: ${name}`);

  return (
    <div
      style={{
        background: theme === "light" ? "#fff" : "#2a2a2a",
        color: theme === "light" ? "#000" : "#eee",
        padding: "8px",
        margin: "4px 0",
        border: "1px solid gray",
      }}
    >
      <span>
        {name} - {score}
      </span>

      <button
        onClick={() => onRemove(id)}
        style={{ marginLeft: "10px" }}
      >
        Remove
      </button>
    </div>
  );
}

function InternListWithCallback() {
  const { interns, removeIntern } = useInterns();

  const handleRemove = useCallback(
    (id: number): void => {
      removeIntern(id);
    },
    [removeIntern]
  );

  return (
    <div>
      <h2>Intern List</h2>

      {interns.map((intern) => (
        <InternRow
          key={intern.id}
          id={intern.id}
          name={intern.name}
          score={intern.score}
          onRemove={handleRemove}
        />
      ))}
    </div>
  );
}

export default InternListWithCallback;