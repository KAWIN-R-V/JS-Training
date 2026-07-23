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
  return (
    <div>
      <span>
        {name} - {score}
      </span>

      <button onClick={() => onRemove(id)}>
        Remove
      </button>
    </div>
  );
}

export default InternRow;