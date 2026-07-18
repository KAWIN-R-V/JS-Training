import { useCallback } from "react";
import { useInterns } from "../contexts/intern-context";
import InternRow from "./InternRow";

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