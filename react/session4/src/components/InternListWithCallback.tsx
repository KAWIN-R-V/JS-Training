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

function InternListWithCallback() {
  const { interns, removeIntern } = useInterns();

  const handleRemove = useCallback(
    (id: number) => {
      removeIntern(id);
    },
    [removeIntern]
  );

  return (
    <div style={{ marginTop: "20px" }}>
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

/*
useCallback returns the same function reference between renders
unless its dependencies change. This helps prevent unnecessary
re-renders of child components that receive callback props.
*/